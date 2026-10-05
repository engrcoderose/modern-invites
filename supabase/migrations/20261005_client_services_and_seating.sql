-- Run manually after reviewing docs/seat-finder-setup.md. No existing event
-- is opted into Seat Finder and no guest/RSVP records are replaced.
begin;

alter table public.events add column if not exists client_services text not null default 'rsvp';
alter table public.events drop constraint if exists events_client_services_check;
alter table public.events add constraint events_client_services_check
  check (client_services in ('rsvp', 'seat_finder', 'rsvp_and_seat_finder'));

-- Existing installations may grant event reads column by column. Adding a
-- column does not extend those grants. RLS still limits visible event rows.
grant select (client_services) on table public.events to authenticated;

create table if not exists public.event_seating_plans (
  event_id bigint primary key references public.events(id) on delete cascade,
  document jsonb not null,
  published_document jsonb,
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);
alter table public.event_seating_plans enable row level security;
revoke all on public.event_seating_plans from anon, authenticated;
grant select on public.event_seating_plans to authenticated;
drop policy if exists "Assigned clients read seating" on public.event_seating_plans;
create policy "Assigned clients read seating" on public.event_seating_plans for select to authenticated using (
  exists (select 1 from public.event_members m
    join public.client_profiles p on p.user_id = m.user_id
    join public.events e on e.id = m.event_id
    where m.event_id = event_seating_plans.event_id and m.user_id = auth.uid()
    and p.status = 'active' and e.is_active
    and e.client_services in ('seat_finder', 'rsvp_and_seat_finder'))
);

-- Never allow clients to grant themselves a service through an events update.
create or replace function public.protect_client_services() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.client_services is distinct from old.client_services
     and current_user in ('anon', 'authenticated') then
    raise exception 'Client services require administrator access' using errcode = '42501';
  end if;
  return new;
end $$;
drop trigger if exists protect_client_services on public.events;
create trigger protect_client_services before update on public.events
  for each row execute function public.protect_client_services();

create or replace function public.save_event_seating_plan(
  p_event_id bigint, p_revision bigint, p_document jsonb, p_publish boolean default null
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  current_revision bigint;
  next_publication jsonb;
  stored_document jsonb;
  item jsonb;
  table_ids text[] := '{}';
  object_ids text[] := '{}';
  guest_ids bigint[] := '{}';
  guest_id bigint;
  occupied_seats text[] := '{}';
  seat_key text;
  table_capacity integer;
begin
  -- Lock the event as well as the plan: two first saves cannot race. Service
  -- changes/archival are serialized against saves under the same event lock.
  perform 1 from public.events e where e.id = p_event_id for update;
  if not exists (select 1 from public.event_members m
    join public.client_profiles p on p.user_id = m.user_id
    join public.events e on e.id = m.event_id
    where m.event_id = p_event_id and m.user_id = auth.uid()
      and m.role in ('owner', 'editor') and p.status = 'active' and e.is_active
      and e.client_services in ('seat_finder', 'rsvp_and_seat_finder')) then
    raise exception 'Seating access is not permitted' using errcode = '42501';
  end if;
  select revision, published_document into current_revision, next_publication
    from public.event_seating_plans where event_id = p_event_id for update;
  if p_revision is null or p_revision <> coalesce(current_revision, 0) then
    raise exception 'Seating plan changed' using errcode = '40001';
  end if;
  -- Unpublish never rewrites the draft. It must be possible even if a guest
  -- has since declined or been deleted from the shared guest list.
  if p_publish is false then
    if current_revision is null then
      raise exception 'No seating plan to unpublish' using errcode = '22023';
    end if;
    update public.event_seating_plans set published_document = null,
      revision = revision + 1, updated_at = now() where event_id = p_event_id
      returning document into stored_document;
    return jsonb_build_object('plan', stored_document, 'revision', current_revision + 1, 'published', false);
  end if;
  if p_document is null or octet_length(p_document::text) > 524288
    or jsonb_typeof(p_document) <> 'object'
    or p_document->'version' <> '1'::jsonb
    or not (p_document ?& array['version','tables','landmarks','assignments'])
    or (p_document - array['version','tables','landmarks','assignments']) <> '{}'::jsonb
    or jsonb_typeof(p_document->'tables') <> 'array'
    or jsonb_typeof(p_document->'landmarks') <> 'array'
    or jsonb_typeof(p_document->'assignments') <> 'array' then
    raise exception 'Invalid seating document' using errcode = '22023';
  end if;
  if jsonb_array_length(p_document->'tables') > 100
    or jsonb_array_length(p_document->'landmarks') > 20
    or jsonb_array_length(p_document->'assignments') > 3000 then
    raise exception 'Seating limit exceeded' using errcode = '22023';
  end if;
  for item in select value from jsonb_array_elements(p_document->'tables') loop
    if jsonb_typeof(item) <> 'object'
      or not (item ?& array['id','name','shape','capacity','x','y','rotation','color'])
      or (item - array['id','name','shape','capacity','x','y','rotation','color','width','height']) <> '{}'::jsonb
      or (item->>'id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      or jsonb_typeof(item->'id') <> 'string' or (item->>'id') = any(object_ids)
      or jsonb_typeof(item->'name') <> 'string' or length(btrim(item->>'name')) not between 1 and 60
      or coalesce(item->>'shape','') not in ('round','square','long','oval')
      or jsonb_typeof(item->'capacity') <> 'number' or (item->>'capacity') !~ '^\d+$'
      or (item->>'capacity')::numeric not between 1 and 30
      or jsonb_typeof(item->'x') <> 'number' or (item->>'x')::numeric not between 8 and 92
      or jsonb_typeof(item->'y') <> 'number' or (item->>'y')::numeric not between 8 and 92
      or jsonb_typeof(item->'rotation') <> 'number' or (item->>'rotation')::numeric not between 0 and 359
      or jsonb_typeof(item->'color') <> 'string' or (item->>'color') !~ '^#[0-9a-fA-F]{6}$'
      or (item ? 'width' and (jsonb_typeof(item->'width') <> 'number' or (item->>'width')::numeric not between 60 and 240))
      or (item ? 'height' and (jsonb_typeof(item->'height') <> 'number' or (item->>'height')::numeric not between 40 and 200)) then
      raise exception 'Invalid table' using errcode = '22023';
    end if;
    table_ids := array_append(table_ids, item->>'id');
    object_ids := array_append(object_ids, item->>'id');
  end loop;
  for item in select value from jsonb_array_elements(p_document->'landmarks') loop
    if jsonb_typeof(item) <> 'object'
      or not (item ?& array['id','name','kind','x','y'])
      or (item - array['id','name','kind','x','y','width','height','rotation']) <> '{}'::jsonb
      or jsonb_typeof(item->'id') <> 'string'
      or (item->>'id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      or (item->>'id') = any(object_ids)
      or jsonb_typeof(item->'name') <> 'string' or length(btrim(item->>'name')) not between 1 and 60
      or coalesce(item->>'kind','') not in ('entrance','dance_floor','couple','stage','bar','door','wall','label','area')
      or jsonb_typeof(item->'x') <> 'number' or (item->>'x')::numeric not between 8 and 92
      or jsonb_typeof(item->'y') <> 'number' or (item->>'y')::numeric not between 8 and 92
      or (item ? 'width' and (jsonb_typeof(item->'width') <> 'number' or (item->>'width')::numeric not between 20 and 180))
      or (item ? 'height' and (jsonb_typeof(item->'height') <> 'number' or (item->>'height')::numeric not between 8 and 100))
      or (item ? 'rotation' and (jsonb_typeof(item->'rotation') <> 'number' or (item->>'rotation')::numeric not between 0 and 359)) then
      raise exception 'Invalid venue object' using errcode = '22023';
    end if;
    object_ids := array_append(object_ids, item->>'id');
  end loop;
  for item in select value from jsonb_array_elements(p_document->'assignments') loop
    if jsonb_typeof(item) <> 'object'
      or not (item ?& array['guestId','tableId'])
      or (item - array['guestId','tableId','seatNumber']) <> '{}'::jsonb
      or jsonb_typeof(item->'guestId') <> 'number' or (item->>'guestId') !~ '^\d+$'
      or (item->>'guestId')::numeric not between 1 and 9007199254740991
      or jsonb_typeof(item->'tableId') <> 'string'
      or not ((item->>'tableId') = any(table_ids)) then
      raise exception 'Invalid assignment' using errcode = '22023';
    end if;
    if item ? 'seatNumber' then
      select (t->>'capacity')::int into table_capacity
        from jsonb_array_elements(p_document->'tables') t where t->>'id' = item->>'tableId';
      if jsonb_typeof(item->'seatNumber') <> 'number' or (item->>'seatNumber') !~ '^\d+$'
        or (item->>'seatNumber')::numeric not between 1 and table_capacity then
        raise exception 'Invalid seat number' using errcode = '22023';
      end if;
      seat_key := (item->>'tableId') || ':' || (item->>'seatNumber');
      if seat_key = any(occupied_seats) then
        raise exception 'Seat is already assigned' using errcode = '22023';
      end if;
      occupied_seats := array_append(occupied_seats, seat_key);
    end if;
    guest_id := (item->>'guestId')::bigint;
    if guest_id = any(guest_ids) or not exists (
      select 1 from public.guests g join public.invitations i on i.id = g.invitation_id
      where g.id = guest_id and i.event_id = p_event_id and g.attendance_status <> 'declined'
    ) then
      raise exception 'Invalid event guest' using errcode = '22023';
    end if;
    guest_ids := array_append(guest_ids, guest_id);
  end loop;
  if exists (select 1 from jsonb_array_elements(p_document->'tables') t
    where (select count(*) from jsonb_array_elements(p_document->'assignments') a
      where a->>'tableId' = t->>'id') > (t->>'capacity')::int) then
    raise exception 'Table capacity exceeded' using errcode = '22023';
  end if;
  if p_publish is true then next_publication := p_document;
  end if;
  insert into public.event_seating_plans(event_id, document, published_document, revision)
    values(p_event_id, p_document, next_publication, coalesce(current_revision,0) + 1)
    on conflict(event_id) do update set document = excluded.document,
      published_document = excluded.published_document, revision = excluded.revision, updated_at = now();
  return jsonb_build_object('plan', p_document, 'revision', coalesce(current_revision,0) + 1, 'published', next_publication is not null);
exception when invalid_text_representation or numeric_value_out_of_range then
  raise exception 'Invalid seating document' using errcode = '22023';
end $$;
revoke all on function public.save_event_seating_plan(bigint,bigint,jsonb,boolean) from public, anon;
grant execute on function public.save_event_seating_plan(bigint,bigint,jsonb,boolean) to authenticated;

-- Public-facing server endpoints receive only a layout and one exact-name
-- lookup. Anonymous/authenticated database roles cannot enumerate this data.
create or replace function public.get_published_seating_layout(p_slug text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('name', e.name, 'plan', jsonb_build_object('version',1,
    'tables', s.published_document->'tables', 'landmarks', s.published_document->'landmarks', 'assignments','[]'::jsonb))
  from public.events e join public.event_seating_plans s on s.event_id=e.id
  where e.slug=p_slug and e.is_active and e.client_services in ('seat_finder','rsvp_and_seat_finder')
    and s.published_document is not null;
$$;
create or replace function public.find_published_seat(p_slug text, p_name text) returns jsonb
language sql stable security definer set search_path = '' as $$
  with matches as (
    select a->>'tableId' as table_id, (a->>'seatNumber')::int as seat_number from public.events e
    join public.event_seating_plans s on s.event_id=e.id
    join public.invitations i on i.event_id=e.id
    join public.guests g on g.invitation_id=i.id
    join lateral jsonb_array_elements(s.published_document->'assignments') a on (a->>'guestId')::bigint=g.id
    where e.slug=p_slug and e.is_active and e.client_services in ('seat_finder','rsvp_and_seat_finder')
      and s.published_document is not null and g.attendance_status <> 'declined'
      and length(btrim(p_name)) between 2 and 150
      and lower(regexp_replace(btrim(g.full_name),'\s+',' ','g')) = lower(regexp_replace(btrim(p_name),'\s+',' ','g'))
  ) select case when count(*)=1 then jsonb_strip_nulls(jsonb_build_object('status','found','tableId',min(table_id),'seatNumber',min(seat_number)))
    when count(*)>1 then jsonb_build_object('status','ambiguous')
    else jsonb_build_object('status','not_found') end from matches;
$$;
revoke all on function public.get_published_seating_layout(text), public.find_published_seat(text,text) from public, anon, authenticated;
grant execute on function public.get_published_seating_layout(text), public.find_published_seat(text,text) to service_role;

-- RSVP submission RPCs run with elevated privileges. Enforce the service at
-- their write boundary as well, while keeping manual guest planning available.
create or replace function public.require_rsvp_service() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_table_name = 'guests' then
    if (to_jsonb(new)->'responded_at') is not distinct from (to_jsonb(old)->'responded_at')
      and (to_jsonb(new)->'rsvp_email') is not distinct from (to_jsonb(old)->'rsvp_email')
      and (to_jsonb(new)->'rsvp_phone') is not distinct from (to_jsonb(old)->'rsvp_phone')
      and (to_jsonb(new)->'rsvp_message') is not distinct from (to_jsonb(old)->'rsvp_message') then
      return new;
    end if;
  end if;
  if exists(select 1 from public.invitations i join public.events e on e.id=i.event_id
    where i.id=new.invitation_id and e.client_services='seat_finder') then
    raise exception 'RSVP is not included in this event' using errcode='42501';
  end if;
  return new;
end $$;
drop trigger if exists require_rsvp_service on public.rsvps;
create trigger require_rsvp_service before insert or update on public.rsvps
  for each row execute function public.require_rsvp_service();
drop trigger if exists require_rsvp_service on public.guests;
create trigger require_rsvp_service before update on public.guests
  for each row execute function public.require_rsvp_service();

commit;
