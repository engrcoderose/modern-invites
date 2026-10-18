# Household update failures

A maximum of 29 for a household with 28 guests passes the application's validation. The generic error alone does not identify the production failure. Household editing uses the signed-in user's session, column grants, and Row Level Security; it does not use administrative credentials.

## Inspect the affected database manually

Run `household-update-diagnostics.sql` in the Supabase SQL Editor. The script uses a read-only transaction and returns one JSON result containing schema metadata, not guest or household records. Copy that result to identify the failing setup. The coding agent must not run it against Supabase.

Required results:

- `id`, `event_id`, `household_name`, `max_attendees`, and `updated_at` exist and are selectable by `authenticated`.
- `household_name`, `max_attendees`, and `updated_at` can be updated by `authenticated`. Update permission on IDs is not required.
- Row Level Security is enabled. The SELECT and UPDATE policies must permit active owners/editors of the matching event, with appropriate `USING` and `WITH CHECK` conditions.
- Check constraints accept the proposed household details. Increasing capacity does not insert guests or modify existing RSVP responses.

The expected guest-management grants and role-aware policies are defined in `supabase/migrations/20260730_client_dashboard_guest_management.sql`.

If the diagnostics confirm that only the three UPDATE grants are missing, while the required columns and the existing role-aware RLS policies are present, the database owner can manually run:

```sql
begin;
grant update (household_name, max_attendees, updated_at)
on table public.invitations to authenticated;
commit;
```

Then rerun the diagnostic script to verify the grants. This statement grants no ID/event reassignment permission, changes no household records, and leaves RLS in force. Missing columns, rejected constraints, or missing RLS policies require a separate reviewed change based on the diagnostic results.

## Error references after deploying the application change

| Reference | Next check |
| --- | --- |
| `42501` | Column grants and row-level permissions |
| `42703`, `42P01`, `PGRST204`, `PGRST205` | Required schema objects and API schema cache |
| `23514` | Database check constraints |
| `23505` | Conflicting unique values |
| Changed/no longer editable | Refresh the household and confirm edit access; no row matched the guarded update |
| Other reference | Investigate that server/database code before retrying an uncertain save |

These codes are defined in the [PostgreSQL error-code reference](https://www.postgresql.org/docs/current/errcodes-appendix.html) and [PostgREST errors reference](https://docs.postgrest.org/en/stable/references/errors.html). The application shows fixed instructions and a code only; raw database messages can contain private record values and are not displayed.
