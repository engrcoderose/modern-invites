# RSVP setup

The invitation uses the shared production RSVP flow for the existing admin event slug `jasmin-and-anjo-wedding`, configured as `rsvpEventSlug` in `data.ts`. The public invitation route remains `/anjo-and-jasmin`. It verifies the event, searches the invited guest list, loads the selected invitation, and submits attendance through the existing `/api/rsvp` endpoints. Sample households and local-only submissions have been removed.

Before inviting guests, check the event in the existing admin dashboard:

1. Confirm its slug is `jasmin-and-anjo-wedding` and it is active.
2. Set RSVP access to full-name search (`name_search`).
3. Confirm the October 30, 2026 RSVP deadline in Philippine time.
4. Add the actual invitations and invited guests, with the correct household or individual response mode and attendance limits.
5. Submit one authorized real RSVP and verify it appears in the admin dashboard.

Local verification uses intercepted API responses and synthetic guests. No credentials were accessed, and no Supabase queries or submissions were executed by the coding agent.
