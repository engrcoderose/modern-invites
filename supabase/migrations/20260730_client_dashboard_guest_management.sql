begin;

-- Authenticated clients need table privileges before Row Level Security can
-- evaluate the role-aware policies below. Column-level update grants prevent
-- clients from moving a guest into another invitation or changing IDs.
grant insert (
  event_id,
  household_name,
  max_attendees
) on table public.invitations to authenticated;
grant update (
  household_name,
  max_attendees,
  updated_at
) on table public.invitations to authenticated;
grant delete on table public.invitations to authenticated;

grant insert (
  invitation_id,
  full_name,
  guest_type,
  attendance_status,
  dietary_restrictions
) on table public.guests to authenticated;
grant update (
  full_name,
  guest_type,
  attendance_status,
  dietary_restrictions,
  updated_at
) on table public.guests to authenticated;
grant delete on table public.guests to authenticated;

-- Support either serial or identity-backed bigint primary keys without
-- assuming a sequence name.
do $$
declare
  sequence_name text;
begin
  sequence_name := pg_get_serial_sequence(
    'public.invitations',
    'id'
  );

  if sequence_name is not null then
    execute format(
      'grant usage, select on sequence %s to authenticated',
      sequence_name
    );
  end if;

  sequence_name := pg_get_serial_sequence('public.guests', 'id');

  if sequence_name is not null then
    execute format(
      'grant usage, select on sequence %s to authenticated',
      sequence_name
    );
  end if;
end
$$;

drop policy if exists
  "Event managers can insert invitations"
on public.invitations;

create policy
  "Event managers can insert invitations"
on public.invitations
for insert
to authenticated
with check (
  exists (
    select 1
    from public.event_members as membership
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where membership.user_id = auth.uid()
      and membership.event_id = invitations.event_id
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
);

drop policy if exists
  "Event managers can update invitations"
on public.invitations;

create policy
  "Event managers can update invitations"
on public.invitations
for update
to authenticated
using (
  exists (
    select 1
    from public.event_members as membership
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where membership.user_id = auth.uid()
      and membership.event_id = invitations.event_id
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
)
with check (
  exists (
    select 1
    from public.event_members as membership
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where membership.user_id = auth.uid()
      and membership.event_id = invitations.event_id
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
);

drop policy if exists
  "Event managers can delete invitations"
on public.invitations;

create policy
  "Event managers can delete invitations"
on public.invitations
for delete
to authenticated
using (
  exists (
    select 1
    from public.event_members as membership
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where membership.user_id = auth.uid()
      and membership.event_id = invitations.event_id
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
);

drop policy if exists
  "Event managers can insert guests"
on public.guests;

create policy
  "Event managers can insert guests"
on public.guests
for insert
to authenticated
with check (
  exists (
    select 1
    from public.invitations as invitation
    join public.event_members as membership
      on membership.event_id = invitation.event_id
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where invitation.id = guests.invitation_id
      and membership.user_id = auth.uid()
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
);

drop policy if exists
  "Event managers can update guests"
on public.guests;

create policy
  "Event managers can update guests"
on public.guests
for update
to authenticated
using (
  exists (
    select 1
    from public.invitations as invitation
    join public.event_members as membership
      on membership.event_id = invitation.event_id
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where invitation.id = guests.invitation_id
      and membership.user_id = auth.uid()
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
)
with check (
  exists (
    select 1
    from public.invitations as invitation
    join public.event_members as membership
      on membership.event_id = invitation.event_id
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where invitation.id = guests.invitation_id
      and membership.user_id = auth.uid()
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
);

drop policy if exists
  "Event managers can delete guests"
on public.guests;

create policy
  "Event managers can delete guests"
on public.guests
for delete
to authenticated
using (
  exists (
    select 1
    from public.invitations as invitation
    join public.event_members as membership
      on membership.event_id = invitation.event_id
    join public.client_profiles as profile
      on profile.user_id = membership.user_id
    where invitation.id = guests.invitation_id
      and membership.user_id = auth.uid()
      and membership.role in ('owner', 'editor')
      and profile.status = 'active'
  )
);

-- Add tables to Supabase Realtime once. Row Level Security continues to
-- determine which changes an authenticated client may receive.
do $$
declare
  realtime_table text;
begin
  foreach realtime_table in array array[
    'invitations',
    'guests',
    'rsvps'
  ]
  loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = realtime_table
    ) then
      execute format(
        'alter publication supabase_realtime add table public.%I',
        realtime_table
      );
    end if;
  end loop;
end
$$;

commit;
