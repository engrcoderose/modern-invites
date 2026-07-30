begin;

create or replace function public.delete_event_household(
  p_event_id bigint,
  p_invitation_id bigint
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_household_name text;
  v_guest_count integer;
begin
  if auth.uid() is null then
    raise exception 'Authentication is required.';
  end if;

  if not exists (
    select 1
    from public.event_members as membership
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where membership.user_id = auth.uid()
      and membership.event_id = p_event_id
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  ) then
    raise exception 'Household deletion is not permitted.';
  end if;

  select invitation.household_name
  into v_household_name
  from public.invitations as invitation
  where invitation.id = p_invitation_id
    and invitation.event_id = p_event_id
  for update;

  if not found then
    raise exception 'The household was not found for this event.';
  end if;

  select count(*)::integer
  into v_guest_count
  from public.guests as guest
  where guest.invitation_id = p_invitation_id;

  delete from public.rsvps
  where invitation_id = p_invitation_id;

  delete from public.guests
  where invitation_id = p_invitation_id;

  delete from public.invitations
  where id = p_invitation_id
    and event_id = p_event_id;

  return jsonb_build_object(
    'success', true,
    'household_name', v_household_name,
    'deleted_guests', v_guest_count
  );
end;
$$;

revoke all on function public.delete_event_household(
  bigint,
  bigint
) from public, anon;

grant execute on function public.delete_event_household(
  bigint,
  bigint
) to authenticated;

commit;
