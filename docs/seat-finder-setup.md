# Client Services and Seat Finder

The client keeps the existing login. Platform administrators select **RSVP only**, **Seat Finder only**, or **RSVP and Seat Finder** when creating an event or editing it under Admin → Events. Seat Finder appears immediately after Dashboard only when the client is assigned to an active event that includes the service.

Dashboard remains the shared guest-list workspace for all packages. RSVP-only events retain their current experience. Seat Finder-only events can add/import guests without collecting online RSVPs. Both services use the same guest IDs and household records; assigning a table never changes an RSVP. Owners and editors can save/publish seating; viewers can inspect it.

## Manual database setup

Review and manually run `supabase/migrations/20261005_client_services_and_seating.sql` in Supabase **before enabling Seat Finder**. Existing RSVP dashboards, event creation, event settings, and RSVP access also support the earlier schema: they retry legacy reads only when the new `events.client_services` column is missing. Seat Finder stays disabled until setup. Administrators see a setup notice in event settings; selecting a seating package during creation fails with a setup message before any event is written. Other database errors are not treated as legacy schema. This project requires its existing events, client profiles, memberships, invitations, guests, and RSVPs schema and previous migrations. No credentials or remote database access are needed for the local tests.

Supabase may show a destructive-operation warning because the script uses `DROP ... IF EXISTS` to replace its named constraint, policy, and triggers. It does not contain `DELETE`, `TRUNCATE`, or `DROP TABLE`, and it retains existing event/guest/RSVP records. It does change database permissions, adds service enforcement, and uses `CREATE OR REPLACE FUNCTION` for the named seating functions. Review the complete script you pasted before running it. The script runs inside a transaction. The seating table references events with `ON DELETE CASCADE`, so a future event deletion also deletes that event's seating plan; the migration itself deletes no events.

The migration:

- Adds `events.client_services`, defaulting existing events to RSVP only.
- Grants signed-in clients `SELECT` on that new column. Existing column-specific event permissions do not automatically extend to newly added columns; event RLS still limits which rows clients can read. No event update privileges are added.
- Adds private seating documents with row-level read policies and a restricted save RPC. Direct client writes are denied. The RPC checks the active service, event membership, role, guest ownership, table capacity, and revision under a transaction lock.
- Adds server-only published-layout and exact-name search RPCs. Public layouts contain no guest names, household names, contact details, or assignment IDs. Duplicate invited names require help from the welcome team.
- Prevents clients from changing their own service entitlement and blocks RSVP submissions for Seat Finder-only events. Existing guests and replies are retained.

Afterward, edit the existing Anjo/Jasmin event in **Admin → Events** and choose **RSVP and Seat Finder**. Confirm its actual identifier before changing it. The invitation currently uses `jasmin-and-anjo-wedding`; this migration does not rename or automatically opt in any event.

If you already ran the earlier version of the migration and the client dashboard still reports `Unable to load assigned events`, review and manually run `supabase/migrations/20261005_client_services_read_permission.sql`. It grants only read access to `events.client_services` and leaves records, memberships, and RLS policies unchanged. Refresh the client dashboard afterward. The application now includes the database error code in its development error message, so another cause can be identified if it persists.

For installations that already ran setup before the expanded venue menu was added, review and manually run `supabase/migrations/20261005_seating_venue_objects.sql`. This replaces the seating save function to accept Bar, Door, Wall, Label, and Area, and bounded optional size/rotation fields. It preserves the function's service, membership, role, revision, ownership and capacity checks and permissions. It does not rewrite existing plans, publications, guests or RSVP records. Existing venue objects without size/rotation fields remain compatible. The updated main setup migration already includes these changes for new installations.

For direct resize handles and table radius/length controls on an existing installation, review and manually run `supabase/migrations/20261005_seating_object_transforms.sql`. It adds bounded optional table dimensions to the secured save function and includes the venue object update above, so there is no need to run both follow-up scripts. Existing layouts retain their original sizes until edited. This script leaves stored plans, publications, guests, RSVP records and access checks intact. The updated main setup also includes this support.

For individual seat numbers on an existing installation, review and manually run `supabase/migrations/20261005_seating_seat_numbers.sql`. This updates the save and exact-name lookup functions, includes earlier venue/sizing support, and preserves all existing data. It accepts optional seat numbers from 1 through the table's capacity and rejects two guests occupying the same numbered seat at the same table. Existing assignments remain table-only until edited. The script includes commented verification queries with expected results; the main setup migration also includes this support for new installations.

Verification queries for you to run manually:

```sql
select has_column_privilege(
  'authenticated', 'public.events', 'client_services', 'SELECT'
) as can_read_client_services;

select id, name, slug, client_services, is_active
from public.events order by id;

select tablename, policyname, roles, cmd
from pg_policies where schemaname = 'public'
  and tablename = 'event_seating_plans';

select event_id, revision, published_document is not null as published
from public.event_seating_plans;

-- This result must not contain guest data or assignments.
select public.get_published_seating_layout('jasmin-and-anjo-wedding');
```

## Client workflow

1. Open Seat Finder and choose a wedding if multiple eligible events are assigned.
2. Add round, square, long, or oval tables. Open Venue for Stage, Dance floor, Bar, Door, Wall, Label, Area, Entrance, Couple’s table, or another Oval table. Select an object to see circular resize handles and a rotation arrow. Drag a corner or edge to resize; round and square tables preserve equal sides. Drag the rotation arrow, holding Shift for 15° snapping. Handles also support arrow keys, Shift for larger steps and Home to reset rotation. Rotation is adjusted directly on the map. The inspector has size sliders (radius for round tables; side length for square tables; length/width for other objects). Sizes use map units, not venue measurements. Chairs follow resized table outlines. Drag the body to move it or use position fields / keyboard arrows. Table seats, name, shape and colour remain editable; Position & custom colour contains additional fields. Changing shape resets dimensions to its defaults. Duplicate creates an empty copy without guest assignments; Close dismisses the inspector.
3. Assign existing guests directly in the selected table's inspector, or under Guests & tables. The inspector lists seated guests with Remove controls and offers Unassigned, Seated, and All filters with name, household, and table search. Full tables and declined guests cannot receive a new assignment. Refresh RSVP status after replies arrive. Declined guests must be unassigned; assignments for deleted guests can be removed. Add/import guests through Dashboard.
4. Save draft to keep the layout private. Save & publish opens the guest page; Publish changes replaces the last published snapshot. Unpublish closes public seating while retaining the stored draft and keeping any unsaved edits in the editor.
5. QR & exports provides the guest link, downloadable SVG QR, and a CSV of the current working assignments. Guest links are generated from the current website origin. The existing Anjo/Jasmin Seat Finder hostname also displays the published event when its configured identifier matches.

In the client floor plan, hover over a table or focus it with the keyboard to see its name, occupied seats, total capacity and seated guest names. The card follows current assignments, explains empty tables, supports scrolling longer guest lists, and can be dismissed with Escape. Starting an on-map edit dismisses it. Guest names are supplied only by the authenticated workspace; the public seat finder does not receive this guest list.

Simultaneous saves use revision checks. A stale save fails with a conflict and leaves local edits intact; reload to review the latest version before saving again. Edits are held in browser memory until saved; closing or reloading an unsaved page prompts the browser's standard warning.

Exact-name guest search is rate limited using the application's existing process-local limiter. It is not a guest authentication mechanism: someone who knows a full invited name can retrieve its assigned table. Use a shared/distributed limiter if deploying multiple independent application instances and requiring a global limit.

## Individual seat numbers

Anjo and Jasmin's guest page uses their invitation's cream stationery, terracotta palette, script/serif fonts, monogram and floral artwork. Its presentation lives under `app/seat-finder/anjo-and-jasmin` and reuses the shared search and floor-plan components. Both the dedicated hostname/route and the event QR route for `jasmin-and-anjo-wedding` use the theme, including the unpublished screen. Other events retain the default presentation. This visual update requires no database migration.

In **Guests & tables**, choose a guest's Table, then their Seat number. Occupied numbers are disabled. Choosing another table clears the old seat number; choose a new number at the destination. **Table only** keeps the table assignment without reserving a particular chair. Unassigned removes both the table and seat.

In the selected table's inspector, choose a seat beside an eligible guest before pressing Seat or Move. Existing seated guests have a seat picker for changes. Full tables and declined guests retain their existing restrictions. Reducing table capacity below an assigned seat number requires correcting that assignment before saving.

Selecting a table reveals chair numbers on the map. Filled chairs represent numbered assignments; table-only guests count toward capacity but do not fill an arbitrary chair. Rotation and resizing retain seat numbers. Hover cards and CSV exports include each assigned number. After publishing, an exact-name guest lookup shows the guest's table and seat, highlighting that chair in gold. The public layout never includes the other guests' assignments.

## Local verification

`npm run test:seating` runs application validation and a synthetic local PostgreSQL/PGlite database test. It does not load private environment files or contact Supabase. TypeScript and scoped ESLint checks also run locally. A live database/deployment smoke check must be done manually after setup.

The local UI was checked on desktop and at a 390px mobile viewport, with synthetic guests in an isolated Next.js app. Table dragging, keyboard movement, editing, capacity checks, draft saving, publishing, service selection, and guest lookup were exercised. That isolated app also passed a production build. The full invitation asset checks currently fail because the existing Anjo/Jasmin flower-frame PNG and music MP3 are missing locally; they are unrelated to this change. The repository's `lint` command uses the unsupported `next lint` command, so the affected files were checked with ESLint directly. The local `npm` launcher also points to a missing CLI file; the test suites were run with Node directly instead.
