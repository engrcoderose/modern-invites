begin;

create or replace function public.submit_locked_individual_guest_rsvp(
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
  v_responded_at timestamp with time zone;
begin
  -- Lock this household for the duration of the transaction. Two
  -- simultaneous requests cannot both pass the response-state check.
  perform pg_advisory_xact_lock(p_invitation_id);

  select guest.responded_at
  into v_responded_at
  from public.guests as guest
  where guest.id = p_guest_id
    and guest.invitation_id = p_invitation_id;

  if not found then
    raise exception
      'One or more guests do not belong to this invitation.';
  end if;

  if v_responded_at is not null then
    raise exception
      'Your RSVP has already been received. Please contact the couple to request a change.';
  end if;

  return public.submit_individual_guest_rsvp(
    p_event_id => p_event_id,
    p_invitation_id => p_invitation_id,
    p_matched_full_name => p_matched_full_name,
    p_guest_id => p_guest_id,
    p_status => p_status,
    p_dietary_restrictions => p_dietary_restrictions,
    p_email => p_email,
    p_phone => p_phone,
    p_message => p_message
  );
end;
$$;

revoke all on function public.submit_locked_individual_guest_rsvp(
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

grant execute on function public.submit_locked_individual_guest_rsvp(
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

revoke execute on function public.submit_individual_guest_rsvp(
  bigint,
  bigint,
  text,
  bigint,
  text,
  text,
  text,
  text,
  text
) from service_role;

commit;
