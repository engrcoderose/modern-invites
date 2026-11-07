# RSVP connection

The invitation now uses the shared production `SmartRsvpFlow` for the user-confirmed event slug `marian-and-deejay`, configured in `data/rsvp.ts`. The prior preview-only form and synthetic event metadata were removed.

The flow starts after the invitation opens. It uses the existing RSVP access, name-search, party and submission endpoints. The event's access and individual/household response configuration come from the existing backend; no event ID, guest IDs, event record, or database settings are hardcoded or created by this change. The existing optional email, dietary and message fields are preserved, alongside the shared phone field. The theme, photo, December 20, 2026 deadline copy, contact links and guest-only note remain in place.

Local verification uses isolated, synthetic API responses. No private environment files, Supabase queries, live guest lookup or real submissions are used.

To verify the live connection manually:

1. Confirm the existing event uses slug `marian-and-deejay`, is active, and has the intended RSVP access mode and response configuration.
2. Confirm the admin deadline matches the displayed December 20, 2026 deadline, and the invited guest list and attendance limits are correct.
3. Open the invitation and find an authorized test guest. Confirm the correct invitation/household appears.
4. Submit one authorized test reply and confirm it appears in the event's admin dashboard. Check attending/declined choices and optional fields.

The existing shared flow handles loading, missing matches, errors, retries, closed RSVP notices, and server-side response limits. Live verification remains for the user under the repository's credential and Supabase boundaries.
