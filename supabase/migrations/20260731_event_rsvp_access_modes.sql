begin;

-- Most events retain shared-code access. Selected events may instead use
-- exact guest-name search as their first verification step.
alter table public.events
add column if not exists rsvp_access_mode text
not null
default 'shared_code';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_rsvp_access_mode_check'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
    add constraint events_rsvp_access_mode_check
    check (
      rsvp_access_mode in ('shared_code', 'name_search')
    );
  end if;
end
$$;

alter table public.events
alter column rsvp_code_hash drop not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_rsvp_access_configuration_check'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
    add constraint events_rsvp_access_configuration_check
    check (
      (
        rsvp_access_mode = 'shared_code'
        and rsvp_code_hash is not null
      )
      or
      (
        rsvp_access_mode = 'name_search'
        and rsvp_code_hash is null
      )
    );
  end if;
end
$$;

commit;
