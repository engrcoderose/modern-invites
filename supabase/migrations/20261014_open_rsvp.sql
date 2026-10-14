begin;

-- Fail instead of waiting indefinitely if another transaction holds the events table.
set local lock_timeout = '5s';

-- Keep existing modes and shared-code hashes so enabling open RSVP is reversible.
alter table public.events drop constraint if exists events_rsvp_access_mode_check;
alter table public.events add constraint events_rsvp_access_mode_check
  check (rsvp_access_mode in ('shared_code', 'name_search', 'open'));
alter table public.events drop constraint if exists events_rsvp_access_configuration_check;
alter table public.events add constraint events_rsvp_access_configuration_check
  check (
    (rsvp_access_mode = 'shared_code' and rsvp_code_hash is not null)
    or (rsvp_access_mode = 'name_search' and rsvp_code_hash is null)
    or rsvp_access_mode = 'open'
  );

-- Private receipts prevent a retried HTTP submission from adding another guest.
create table if not exists public.open_rsvp_receipts (
  event_id bigint not null references public.events(id) on delete cascade,
  request_id uuid not null,
  payload jsonb not null,
  result jsonb not null,
  created_at timestamptz not null default now(),
  primary key(event_id, request_id)
);
alter table public.open_rsvp_receipts enable row level security;
revoke all on public.open_rsvp_receipts from public, anon, authenticated;

create or replace function public.submit_open_rsvp(
  p_event_id bigint, p_request_id uuid, p_full_name text, p_status text,
  p_email text default '', p_phone text default '',
  p_dietary_restrictions text default '', p_message text default ''
) returns jsonb
language plpgsql security definer set search_path = public, pg_temp
as $$
declare
  v_event public.events%rowtype;
  v_name text := regexp_replace(btrim(coalesce(p_full_name, '')), '[[:space:]]+', ' ', 'g');
  v_email text := btrim(coalesce(p_email, ''));
  v_phone text := btrim(coalesce(p_phone, ''));
  v_diet text := case when p_status = 'attending' then btrim(coalesce(p_dietary_restrictions, '')) else '' end;
  v_message text := btrim(coalesce(p_message, ''));
  v_payload jsonb;
  v_receipt public.open_rsvp_receipts%rowtype;
  v_invitation_id bigint;
  v_status public.guests.attendance_status%type;
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
  if exists (
    select 1 from public.guests g
    join public.invitations i on i.id = g.invitation_id
    where i.event_id = p_event_id
      and lower(regexp_replace(btrim(g.full_name), '[[:space:]]+', ' ', 'g')) = lower(v_name)
  ) then
    raise exception using errcode = 'P0001', message = 'OPEN_RSVP_NAME_EXISTS';
  end if;
  insert into public.invitations(event_id, household_name, max_attendees)
    values(p_event_id, v_name, 1) returning id into v_invitation_id;
  insert into public.guests(invitation_id, full_name, guest_type, attendance_status,
    dietary_restrictions, rsvp_email, rsvp_phone, rsvp_message, responded_at, updated_at)
    values(v_invitation_id, v_name, 'adult', v_status,
      nullif(v_diet, ''), nullif(v_email, ''), nullif(v_phone, ''), nullif(v_message, ''), v_now, v_now);
  insert into public.rsvps(invitation_id, submitted_by, email, phone, message, submitted_at, updated_at)
    values(v_invitation_id, v_name, nullif(v_email, ''), nullif(v_phone, ''), nullif(v_message, ''), v_now, v_now);
  v_result := jsonb_build_object('success', true, 'total_guests', 1,
    'attending_count', case when p_status = 'attending' then 1 else 0 end,
    'declined_count', case when p_status = 'declined' then 1 else 0 end, 'max_attendees', 1);
  insert into public.open_rsvp_receipts(event_id, request_id, payload, result)
    values(p_event_id, p_request_id, v_payload, v_result);
  return v_result;
end;
$$;
revoke all on function public.submit_open_rsvp(bigint, uuid, text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.submit_open_rsvp(bigint, uuid, text, text, text, text, text, text) to service_role;

commit;
