# Marian & Dee Jay

Invitation route: `/marian-and-deejay`.

`data/wedding-details.json` owns the confirmed invitation content and the six supplied palette colors. Names use title case; the supplied social hashtag retains its original case. The original questionnaire is in `docs/e-invites.xlsx`.

## Design

Butter-yellow stationery, warm cream surfaces, brown ink, fine botanical linework, and an arched invitation frame. Uses the existing Imperial Script and Instrument Serif font resources. Opening the envelope reveals the invitation through a coordinated fade; main content stays hidden and inert until handoff. Reduced motion bypasses the sequence. Refresh intentionally returns to the cover.

## Pending assets and integration

- Photos and the requested music recording have not been supplied to this folder. No placeholder couple photos, unlicensed track, gallery, or nonfunctional music button is included.
- RSVP currently prepares a local reply and opens the guest’s email composer. It never calls an API or claims to persist a response. Only sending the email delivers the reply.
- After the user creates the admin record, replace the email draft in `sections/RsvpSection.tsx` with the established shared `SmartRsvpFlow`, using the actual approved event slug and settings. No backend records or identifiers have been invented.
- Reception spelling follows the questionnaire: “Lafaayette Luxury Suites Baguio.” Confirm before publication.
- Map links search the supplied address; confirm the exact venue pins before publication.

## Checks

Use an isolated local Next.js workspace containing only this invitation and sanitized configuration. Do not run the root dev/build scripts where they automatically load private environment files. Do not access Supabase. The calendar route downloads a UTC-encoded ceremony event (2 PM Asia/Manila).

Verified October 31, 2026: scoped ESLint, isolated TypeScript and production build, calendar HTTP response and UTC start time, browser cover opening with pointer and keyboard, focus handoff, mobile/tablet/desktop layouts, FAQ expansion, RSVP required fields and email draft. No browser console errors observed. Isolated preview uses existing local font copies equivalent to the production root font families; production root font fetching itself was not tested. System reduced-motion and iOS Safari were not available for live verification; reduced-motion bypass and CSS are implemented. No backend calls or credential access were performed.
