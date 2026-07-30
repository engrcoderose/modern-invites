begin;

-- Individual name-search RSVPs need contact details at guest level.
-- Household-level RSVP contact fields remain in place for shared-code events.
alter table public.guests
  add column if not exists rsvp_email text,
  add column if not exists rsvp_phone text,
  add column if not exists rsvp_message text,
  add column if not exists responded_at timestamp with time zone;

create or replace function public.submit_individual_guest_rsvp(
  p_event_id bigint,
  p_invitation_id bigint,
  p_matched_full_name text,
  p_guest_id bigint,
  p_status text,
  p_dietary_restrictions text default '',
  p_email text default '',
  p_phone text default '',
  p_message text default ''
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_event_active boolean;
  v_rsvp_deadline date;
  v_guest_name text;
  v_max_attendees integer;
  v_total_guests integer;
  v_attending_count integer;
  v_declined_count integer;
  v_now timestamp with time zone := clock_timestamp();
begin
  if p_status not in ('attending', 'declined') then
    raise exception 'Every guest must have a valid attendance response.';
  end if;

  if char_length(coalesce(p_dietary_restrictions, '')) > 500 then
    raise exception 'A dietary restriction response is too long.';
  end if;

  if char_length(coalesce(p_email, '')) > 254 then
    raise exception 'The email address is too long.';
  end if;

  if char_length(coalesce(p_phone, '')) > 40 then
    raise exception 'The phone number is too long.';
  end if;

  if char_length(coalesce(p_message, '')) > 2000 then
    raise exception 'The message is too long.';
  end if;

  select event.is_active, event.rsvp_deadline
  into v_event_active, v_rsvp_deadline
  from public.events as event
  where event.id = p_event_id;

  if not found or not v_event_active then
    raise exception 'RSVPs are currently closed.';
  end if;

  if v_rsvp_deadline is not null and current_date > v_rsvp_deadline then
    raise exception 'The RSVP deadline has passed.';
  end if;

  select invitation.max_attendees
  into v_max_attendees
  from public.invitations as invitation
  where invitation.id = p_invitation_id
    and invitation.event_id = p_event_id;

  if not found then
    raise exception 'The selected invitation does not belong to this event.';
  end if;

  -- Serialize responses within one household so simultaneous submissions
  -- cannot overwrite or miscount another guest's answer.
  perform pg_advisory_xact_lock(p_invitation_id);

  select guest.full_name
  into v_guest_name
  from public.guests as guest
  where guest.id = p_guest_id
    and guest.invitation_id = p_invitation_id;

  if not found then
    raise exception 'One or more guests do not belong to this invitation.';
  end if;

  if lower(
    regexp_replace(
      btrim(v_guest_name),
      '[[:space:]]+',
      ' ',
      'g'
    )
  ) <> lower(
    regexp_replace(
      btrim(coalesce(p_matched_full_name, '')),
      '[[:space:]]+',
      ' ',
      'g'
    )
  ) then
    raise exception 'You may only respond for your own invited name.';
  end if;

  update public.guests
  set
    attendance_status = p_status,
    dietary_restrictions = case
      when p_status = 'attending'
        then nullif(btrim(coalesce(p_dietary_restrictions, '')), '')
      else null
    end,
    rsvp_email = nullif(btrim(coalesce(p_email, '')), ''),
    rsvp_phone = nullif(btrim(coalesce(p_phone, '')), ''),
    rsvp_message = nullif(btrim(coalesce(p_message, '')), ''),
    responded_at = v_now,
    updated_at = v_now
  where id = p_guest_id;

  select
    count(*)::integer,
    count(*) filter (
      where guest.attendance_status = 'attending'
    )::integer,
    count(*) filter (
      where guest.attendance_status = 'declined'
    )::integer
  into
    v_total_guests,
    v_attending_count,
    v_declined_count
  from public.guests as guest
  where guest.invitation_id = p_invitation_id;

  if v_attending_count > v_max_attendees then
    raise exception
      'This invitation allows a maximum of % attendee(s).',
      v_max_attendees;
  end if;

  -- Keep the household RSVP record for compatibility with existing reports.
  -- Guest-level contact fields above remain authoritative for individual RSVPs.
  update public.rsvps
  set
    submitted_by = v_guest_name,
    email = nullif(btrim(coalesce(p_email, '')), ''),
    phone = nullif(btrim(coalesce(p_phone, '')), ''),
    message = nullif(btrim(coalesce(p_message, '')), ''),
    submitted_at = v_now,
    updated_at = v_now
  where invitation_id = p_invitation_id;

  if not found then
    insert into public.rsvps (
      invitation_id,
      submitted_by,
      email,
      phone,
      message,
      submitted_at,
      updated_at
    )
    values (
      p_invitation_id,
      v_guest_name,
      nullif(btrim(coalesce(p_email, '')), ''),
      nullif(btrim(coalesce(p_phone, '')), ''),
      nullif(btrim(coalesce(p_message, '')), ''),
      v_now,
      v_now
    );
  end if;

  return jsonb_build_object(
    'success', true,
    'invitation_id', p_invitation_id,
    'total_guests', v_total_guests,
    'attending_count', v_attending_count,
    'declined_count', v_declined_count,
    'max_attendees', v_max_attendees
  );
end;
$$;

revoke all on function public.submit_individual_guest_rsvp(
  bigint,
  bigint,
  text,
  bigint,
  text,
  text,
  text,
  text,
  text
) from public, anon, authenticated;

grant execute on function public.submit_individual_guest_rsvp(
  bigint,
  bigint,
  text,
  bigint,
  text,
  text,
  text,
  text,
  text
) to service_role;

commit;
