begin;

-- Access mode answers "how is the invitation verified?"
-- Response mode answers "who may be answered for after verification?"
alter table public.events
add column if not exists rsvp_response_mode text
not null
default 'household';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_rsvp_response_mode_check'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
    add constraint events_rsvp_response_mode_check
    check (
      rsvp_response_mode in ('household', 'individual')
    );
  end if;
end
$$;

update public.events
set rsvp_response_mode = 'household'
where slug = 'nylgen-and-kersee';

grant select (rsvp_response_mode)
on table public.events
to authenticated;

create or replace function public.submit_locked_household_rsvp(
  p_event_id bigint,
  p_invitation_id bigint,
  p_matched_full_name text,
  p_email text,
  p_phone text,
  p_message text,
  p_guest_responses jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Serialize this household so simultaneous submissions cannot both pass.
  perform pg_advisory_xact_lock(p_invitation_id);

  if exists (
    select 1
    from public.rsvps as rsvp
    where rsvp.invitation_id = p_invitation_id
  ) then
    raise exception
      'Your household RSVP has already been received. Please contact the couple to request a change.';
  end if;

  return public.submit_invitation_rsvp(
    p_event_id => p_event_id,
    p_invitation_id => p_invitation_id,
    p_matched_full_name => p_matched_full_name,
    p_email => p_email,
    p_phone => p_phone,
    p_message => p_message,
    p_guest_responses => p_guest_responses
  );
end;
$$;

revoke all on function public.submit_locked_household_rsvp(
  bigint,
  bigint,
  text,
  text,
  text,
  text,
  jsonb
) from public, anon, authenticated;

grant execute on function public.submit_locked_household_rsvp(
  bigint,
  bigint,
  text,
  text,
  text,
  text,
  jsonb
) to service_role;

commit;
