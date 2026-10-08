# RSVP setup

The on-page RSVP uses the same shared production flow as Anjo & Jasmin. The confirmed admin event slug `ryan-and-anne` is configured in `data/wedding.ts` as `rsvpEventSlug`. The November 14 deadline is displayed below the form.

Ryan & Anne opt into the minimal household presentation: a household label and script name, theme-colored attendance controls, subtly squared form fields and confirmation button, and Start Over as the return action. Other invitations retain the shared default presentation.

In the existing admin dashboard:

1. Select Ryan & Anne's wedding event with slug `ryan-and-anne`.
2. Set RSVP access to full-name search (`name_search`) and activate the event.
3. Confirm the November 14, 2026 RSVP deadline in Philippine time.
4. Add actual invitations and invited guests, with the correct household or individual response mode and attendance limits.
5. Submit one authorized RSVP and confirm it appears in the admin dashboard. Check guest-name lookup, attending/declined responses, dietary notes, and the confirmation screen.

Local checks use synthetic guests and mocked API responses. They do not access private credentials, query Supabase, or submit real guest responses.
