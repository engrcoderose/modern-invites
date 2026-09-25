begin;

-- Receipts make a repeated request safe after a timeout. No guest data is stored here.
create table public.rsvp_guest_imports (
  event_id bigint not null references public.events(id) on delete cascade,
  request_id uuid not null,
  payload_hash text not null,
  guest_count integer not null,
  invitation_count integer not null,
  created_at timestamptz not null default now(),
  primary key (event_id, request_id)
);
alter table public.rsvp_guest_imports enable row level security;
revoke all on public.rsvp_guest_imports from anon, authenticated;

create function public.guest_import_name_key(p_value text)
returns text language sql immutable strict set search_path = public, pg_temp
as $$ select lower(btrim(regexp_replace(normalize(p_value, NFC), '\s+', ' ', 'g'))) $$;
revoke all on function public.guest_import_name_key(text) from public, anon, authenticated;

create function public.import_event_guests(
  p_event_id bigint,
  p_request_id uuid,
  p_rows jsonb,
  p_preview boolean default true
)
returns jsonb language plpgsql security definer set search_path = public, pg_temp
as $$
declare
  v_row jsonb;
  v_group record;
  v_invitation_id bigint;
  v_receipt public.rsvp_guest_imports%rowtype;
  v_issues jsonb;
  v_guest_count integer;
  v_invitation_count integer;
begin
  if auth.uid() is null or not exists (
    select 1 from public.event_members m
    join public.client_profiles p on p.user_id = m.user_id
    where m.user_id = auth.uid() and m.event_id = p_event_id
      and m.role in ('owner', 'editor') and p.status = 'active'
  ) then
    raise exception 'Guest import is not permitted.' using errcode = '42501';
  end if;

  -- Serialize imports for this event, including duplicate requests.
  perform 1 from public.events where id = p_event_id and is_active = true for update;
  if not found then raise exception 'This event is not available for importing guests.'; end if;
  if p_request_id is null or p_preview is null or jsonb_typeof(p_rows) is distinct from 'array' then
    raise exception 'Invalid guest import.';
  end if;
  v_guest_count := jsonb_array_length(p_rows);
  if v_guest_count < 1 or v_guest_count > 500 then raise exception 'Import between 1 and 500 guests at a time.'; end if;

  for v_row in select value from jsonb_array_elements(p_rows) loop
    if jsonb_typeof(v_row) is distinct from 'object'
      or jsonb_typeof(v_row->'fullName') is distinct from 'string'
      or jsonb_typeof(v_row->'householdName') is distinct from 'string'
      or jsonb_typeof(v_row->'guestType') is distinct from 'string'
      or jsonb_typeof(v_row->'dietaryRestrictions') is distinct from 'string'
      or char_length(public.guest_import_name_key(v_row->>'fullName')) < 1
      or char_length(v_row->>'fullName') > 120
      or char_length(v_row->>'householdName') > 120
      or char_length(v_row->>'dietaryRestrictions') > 500
      or (v_row->>'guestType') not in ('adult', 'child') then
      raise exception 'Invalid guest row. Check names, guest types, and dietary notes.';
    end if;
  end loop;

  if not p_preview then
    select * into v_receipt from public.rsvp_guest_imports
      where event_id = p_event_id and request_id = p_request_id;
    if found then
      if v_receipt.payload_hash <> md5(p_rows::text) then raise exception 'This import request was already used for a different file.'; end if;
      return jsonb_build_object('guestCount', v_receipt.guest_count, 'invitationCount', v_receipt.invitation_count, 'issues', '[]'::jsonb);
    end if;
  end if;

  if exists (
    select 1 from jsonb_array_elements(p_rows) r
    group by public.guest_import_name_key(r->>'fullName') having count(*) > 1
  ) then raise exception 'The file contains duplicate guest names.'; end if;

  -- A solo guest's invitation name must not collide with a named household.
  if exists (
    select 1 from jsonb_array_elements(p_rows) a, jsonb_array_elements(p_rows) b
    where btrim(a->>'householdName') = '' and btrim(b->>'householdName') <> ''
      and public.guest_import_name_key(a->>'fullName') = public.guest_import_name_key(b->>'householdName')
  ) then raise exception 'A household name conflicts with an individual invitation.'; end if;

  select coalesce(jsonb_agg(jsonb_build_object('rowNumber', issue.row_number, 'message', issue.message)), '[]'::jsonb)
  into v_issues from (
    select coalesce(r.value->'rowNumber', to_jsonb(r.ordinality + 1)) as row_number,
      case when exists (
        select 1 from public.guests g join public.invitations i on i.id = g.invitation_id
        where i.event_id = p_event_id and public.guest_import_name_key(g.full_name) = public.guest_import_name_key(r.value->>'fullName')
      ) then 'This guest name already exists in this event. Existing guests are not imported again.'
      when exists (
        select 1 from public.invitations i where i.event_id = p_event_id
          and public.guest_import_name_key(i.household_name) = public.guest_import_name_key(coalesce(nullif(btrim(r.value->>'householdName'), ''), r.value->>'fullName'))
      ) then 'This household already exists. Use Add guest to add members to it, or use a distinct household name.'
      end as message
    from jsonb_array_elements(p_rows) with ordinality r(value, ordinality)
  ) issue where issue.message is not null;

  select count(distinct case when btrim(r->>'householdName') = ''
    then 'individual:' || public.guest_import_name_key(r->>'fullName')
    else 'household:' || public.guest_import_name_key(r->>'householdName') end)
  into v_invitation_count from jsonb_array_elements(p_rows) r;

  if p_preview or jsonb_array_length(v_issues) > 0 then
    return jsonb_build_object('guestCount', v_guest_count, 'invitationCount', v_invitation_count, 'issues', v_issues);
  end if;

  for v_group in
    select min(coalesce(nullif(btrim(r->>'householdName'), ''), btrim(r->>'fullName'))) as name,
      count(*)::integer as size, jsonb_agg(r) as guests
    from jsonb_array_elements(p_rows) r
    group by case when btrim(r->>'householdName') = ''
      then 'individual:' || public.guest_import_name_key(r->>'fullName')
      else 'household:' || public.guest_import_name_key(r->>'householdName') end
  loop
    insert into public.invitations(event_id, household_name, max_attendees)
    values(p_event_id, v_group.name, v_group.size) returning id into v_invitation_id;
    for v_row in select value from jsonb_array_elements(v_group.guests) loop
      insert into public.guests(invitation_id, full_name, guest_type, attendance_status, dietary_restrictions)
      select v_invitation_id, g.full_name, g.guest_type, g.attendance_status, g.dietary_restrictions
      from jsonb_populate_record(null::public.guests, jsonb_build_object(
        'full_name', btrim(v_row->>'fullName'), 'guest_type', v_row->>'guestType',
        'attendance_status', 'pending', 'dietary_restrictions', nullif(btrim(v_row->>'dietaryRestrictions'), '')
      )) g;
    end loop;
  end loop;

  insert into public.rsvp_guest_imports(event_id, request_id, payload_hash, guest_count, invitation_count)
  values(p_event_id, p_request_id, md5(p_rows::text), v_guest_count, v_invitation_count);
  return jsonb_build_object('guestCount', v_guest_count, 'invitationCount', v_invitation_count, 'issues', '[]'::jsonb);
end;
$$;

revoke all on function public.import_event_guests(bigint, uuid, jsonb, boolean) from public, anon;
grant execute on function public.import_event_guests(bigint, uuid, jsonb, boolean) to authenticated;

commit;
