-- Follow-up for installations that already ran the Seat Finder migration
-- before it included this grant. Run manually; no data or policies are changed.
begin;

grant select (client_services) on table public.events to authenticated;

commit;

-- Optional verification (run manually after the transaction):
-- select has_column_privilege(
--   'authenticated', 'public.events', 'client_services', 'SELECT'
-- ) as can_read_client_services;
