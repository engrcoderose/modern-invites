-- Apply manually after 20261014_open_rsvp.sql and the guest-contact migrations.
-- Defines functions only: no event settings or existing guest/reply data change
-- when this script is installed. Pending guests are reused only on a later RSVP.
begin;
set local lock_timeout = '5s';

create or replace function public.normalize_open_rsvp_name(p_name text)
returns text language sql immutable set search_path = public, pg_temp
-- The explicit Unicode whitespace set matches JavaScript's /\s/ normalization,
-- including nonbreaking spaces copied from invitations on mobile devices.
as $$ select btrim(regexp_replace(coalesce(p_name, ''),
  U&'[\0009-\000D\0020\00A0\1680\2000-\200A\2028\2029\202F\205F\3000\FEFF]+', ' ', 'g')); $$;
revoke all on function public.normalize_open_rsvp_name(text) from public, anon, authenticated;
grant execute on function public.normalize_open_rsvp_name(text) to service_role;

create or replace function public.check_open_rsvp_name(p_event_id bigint, p_full_name text)
returns jsonb language plpgsql security definer set search_path = public, pg_temp
as $$
declare
  v_event public.events%rowtype;
  v_name text := public.normalize_open_rsvp_name(p_full_name);
  v_count integer;
  v_responded boolean;
  v_canonical text;
begin
  select * into v_event from public.events where id = p_event_id for share;
  if not found or not v_event.is_active or v_event.rsvp_access_mode <> 'open'
    or coalesce(to_jsonb(v_event)->>'client_services', 'rsvp') not in ('rsvp', 'rsvp_and_seat_finder') then
    raise exception 'Open RSVP is unavailable for this event.';
  end if;
  if v_event.rsvp_deadline is not null and v_event.rsvp_deadline::timestamptz < now() then
    raise exception 'The RSVP deadline has passed.';
  end if;
  if char_length(v_name) not between 2 and 150 then raise exception 'Invalid RSVP name.'; end if;

  select count(*)::integer,
    coalesce(bool_or(g.responded_at is not null or g.attendance_status::text <> 'pending'), false),
    min(public.normalize_open_rsvp_name(g.full_name))
    into v_count, v_responded, v_canonical
    from public.guests g join public.invitations i on i.id = g.invitation_id
    where i.event_id = p_event_id
      and lower(public.normalize_open_rsvp_name(g.full_name)) = lower(v_name);
  -- Never return household IDs, contact details, or another person's answers.
  return jsonb_build_object('status', case when v_responded then 'responded'
    when v_count > 1 then 'ambiguous' else 'available' end,
    'full_name', case when v_count = 1 and not v_responded then v_canonical else v_name end);
end;
$$;
revoke all on function public.check_open_rsvp_name(bigint, text) from public, anon, authenticated;
grant execute on function public.check_open_rsvp_name(bigint, text) to service_role;

create or replace function public.submit_open_rsvp(
  p_event_id bigint, p_request_id uuid, p_full_name text, p_status text,
  p_email text default '', p_phone text default '',
  p_dietary_restrictions text default '', p_message text default ''
) returns jsonb
language plpgsql security definer set search_path = public, pg_temp
as $$
declare
  v_event public.events%rowtype;
  v_name text := public.normalize_open_rsvp_name(p_full_name);
  v_email text := btrim(coalesce(p_email, ''));
  v_phone text := btrim(coalesce(p_phone, ''));
  v_diet text := case when p_status = 'attending' then btrim(coalesce(p_dietary_restrictions, '')) else '' end;
  v_message text := btrim(coalesce(p_message, ''));
  v_payload jsonb;
  v_receipt public.open_rsvp_receipts%rowtype;
  v_invitation_id bigint;
  v_status public.guests.attendance_status%type;
  v_guest public.guests%rowtype;
  v_name_result jsonb;
  v_max_attendees integer;
  v_total_guests integer;
  v_attending_count integer;
  v_declined_count integer;
  v_result jsonb;
  v_now timestamptz := now();
begin
  -- Lock against simultaneous event closure or a change of access mode.
  select * into v_event from public.events where id = p_event_id for share;
  if not found or not v_event.is_active or v_event.rsvp_access_mode <> 'open' then
    raise exception 'Open RSVP is unavailable for this event.';
  end if;
  -- Compatible with deployments that have not yet added client_services.
  if coalesce(to_jsonb(v_event)->>'client_services', 'rsvp') not in ('rsvp', 'rsvp_and_seat_finder') then
    raise exception 'Open RSVP is unavailable for this event.';
  end if;
  if v_event.rsvp_deadline is not null and v_event.rsvp_deadline::timestamptz < now() then
    raise exception 'The RSVP deadline has passed.';
  end if;
  if p_request_id is null or char_length(v_name) not between 2 and 150
    or p_status is null or p_status not in ('attending', 'declined')
    or char_length(v_email) > 254 or char_length(v_phone) > 40
    or char_length(coalesce(p_dietary_restrictions, '')) > 500 or char_length(v_message) > 2000
    or (v_email <> '' and v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
    raise exception 'Invalid RSVP details.';
  end if;
  v_payload := jsonb_build_object('name', v_name, 'status', p_status, 'email', v_email,
    'phone', v_phone, 'diet', v_diet, 'message', v_message);
  perform pg_advisory_xact_lock(hashtextextended(p_event_id::text || ':' || p_request_id::text, 0));
  select * into v_receipt from public.open_rsvp_receipts
    where event_id = p_event_id and request_id = p_request_id;
  if found then
    if v_receipt.payload <> v_payload then raise exception 'This request was already used for a different reply.'; end if;
    return v_receipt.result;
  end if;

  v_status := p_status;
  -- Serialize new submissions for the same normalized name within this event.
  perform pg_advisory_xact_lock(hashtextextended(p_event_id::text || ':name:' || lower(v_name), 0));
  v_name_result := public.check_open_rsvp_name(p_event_id, v_name);
  if v_name_result->>'status' = 'responded' then
    raise exception using errcode = 'P0001', message = 'OPEN_RSVP_ALREADY_RESPONDED';
  elsif v_name_result->>'status' = 'ambiguous' then
    raise exception using errcode = 'P0001', message = 'OPEN_RSVP_NAME_AMBIGUOUS';
  end if;

  select g.* into v_guest from public.guests g
    join public.invitations i on i.id = g.invitation_id
    where i.event_id = p_event_id
      and lower(public.normalize_open_rsvp_name(g.full_name)) = lower(v_name);
  if found then
    -- Share the existing guest/household lock used by the individual RSVP flow.
    -- Only this person's pending response changes; no household selection or copy.
    perform pg_advisory_xact_lock(v_guest.invitation_id);
    select g.* into v_guest from public.guests g where g.id = v_guest.id for update;
    if not found then raise exception 'The guest record changed. Please check your name again.'; end if;
    if v_guest.responded_at is not null or v_guest.attendance_status::text <> 'pending' then
      raise exception using errcode = 'P0001', message = 'OPEN_RSVP_ALREADY_RESPONDED';
    end if;
    v_invitation_id := v_guest.invitation_id;
    -- Match the existing individual-response/reporting behavior. A typed value
    -- supports both enum and text attendance columns in existing installations.
    update public.guests set attendance_status = v_status,
      dietary_restrictions = nullif(v_diet, ''), rsvp_email = nullif(v_email, ''),
      rsvp_phone = nullif(v_phone, ''), rsvp_message = nullif(v_message, ''),
      responded_at = v_now, updated_at = v_now
      where id = v_guest.id;
  else
    insert into public.invitations(event_id, household_name, max_attendees)
      values(p_event_id, v_name, 1) returning id into v_invitation_id;
    insert into public.guests(invitation_id, full_name, guest_type, attendance_status,
      dietary_restrictions, rsvp_email, rsvp_phone, rsvp_message, responded_at, updated_at)
      values(v_invitation_id, v_name, 'adult', v_status,
        nullif(v_diet, ''), nullif(v_email, ''), nullif(v_phone, ''), nullif(v_message, ''), v_now, v_now);
  end if;
  select max_attendees into v_max_attendees from public.invitations where id = v_invitation_id;
  select count(*)::integer,
    count(*) filter (where attendance_status = 'attending')::integer,
    count(*) filter (where attendance_status = 'declined')::integer
    into v_total_guests, v_attending_count, v_declined_count
    from public.guests where invitation_id = v_invitation_id;
  if v_attending_count > v_max_attendees then
    raise exception 'This invitation allows a maximum of % attendee(s).', v_max_attendees;
  end if;
  -- Preserve the existing dashboard/export aggregate while guest answers remain
  -- individual. Nobody else in the invitation is marked as having responded.
  update public.rsvps set submitted_by = v_name, email = nullif(v_email, ''),
    phone = nullif(v_phone, ''), message = nullif(v_message, ''),
    submitted_at = v_now, updated_at = v_now where invitation_id = v_invitation_id;
  if not found then
    insert into public.rsvps(invitation_id, submitted_by, email, phone, message, submitted_at, updated_at)
      values(v_invitation_id, v_name, nullif(v_email, ''), nullif(v_phone, ''), nullif(v_message, ''), v_now, v_now);
  end if;
  v_result := jsonb_build_object('success', true, 'total_guests', v_total_guests,
    'attending_count', v_attending_count, 'declined_count', v_declined_count, 'max_attendees', v_max_attendees);
  insert into public.open_rsvp_receipts(event_id, request_id, payload, result)
    values(p_event_id, p_request_id, v_payload, v_result);
  return v_result;
end;
$$;
revoke all on function public.submit_open_rsvp(bigint, uuid, text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.submit_open_rsvp(bigint, uuid, text, text, text, text, text, text) to service_role;


commit;
