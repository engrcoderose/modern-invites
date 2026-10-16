# Darell & Roselle RSVP connection

The invitation uses the existing public slug `darell-and-roselle` for the shared
RSVP endpoints. It requests open access through `/api/rsvp/access` and submits
individual replies through `/api/rsvp/open`. Guests first enter their name;
`/api/rsvp/open/check-name` checks for a previous response before showing questions.
There is no household lookup or household selection. Unanswered listed names use
their existing guest record; unlisted names can reply directly. Completed names
show **RSVP already submitted** and cannot send another reply.

In the existing admin event, manually confirm:

1. The event slug matches `darell-and-roselle`.
2. The event is active, RSVP is enabled, and RSVP access is **Open RSVP — anyone
   can reply**.
3. The RSVP deadline permits the intended replies. The invitation's confirmed
   display deadline remains **16 October 2026**; this revision does not change
   the admin deadline.
4. The shared open-RSVP migrations, including
   `supabase/migrations/20261016_open_rsvp_name_first.sql`, are installed. See
   [the existing setup instructions](../../../docs/open-rsvp-setup.md) if needed;
   any database setup must be run manually by the user.
5. After deployment, submit an authorized reply and confirm it appears in the
   dashboard. Check attending and declined responses, optional details, duplicate
   names with changed capitalization/spacing, and a retry after a network failure.
   Repeat attempts must be blocked before the questions appear. This update
   requires the new migration and matching application deployment together.

Local checks use synthetic names and intercepted API responses. They do not
query Supabase, use credentials, change settings, or save real RSVP responses.
