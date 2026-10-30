# Jahzen & Glyzell

Invitation draft at `/jahzen-and-glyzell`, for **May 30, 2027**.

The user selected `app/isabella-and-daniel` as the invitation format and approved clearly labeled sample photography while the couple's own assets are pending. Confirmed event content comes from the supplied `Modern-Luxury-Wedding-Invitation-Questionnaire-Modern-Invites.docx` and its embedded attire/palette references. Blank fields and private contact information are not published.

## Structure and content

`page.tsx` composes the photo cover/hero, invitation message, live countdown, story chapters, cinematic photo break, event details and program, entourage, gallery, attire, guest guide, RSVP and footer. This follows the reference's format while retaining Jahzen & Glyzell's navy, espresso, champagne and ivory palette.

- `data/wedding.ts`: confirmed names, date, venue, program, full story and guest policies.
- `data/photos.ts`: all temporary sample image assignments and gallery arrangement.
- `assets/photos/`: client-local optimized WebP sample assets, per-file provenance sidecars and a source manifest. These are existing repository sample photos, not photos of Jahzen & Glyzell. Images are deduplicated, capped at 1800px wide and displayed through the default Next.js optimizer/quality with responsive sizes.
- `components/`: guarded opening/focus handoff, navigation, shared photo frame and reveals.
- `sections/`: individual invitation passages. `styles/` contains scoped typography, color, decorative treatments and motion.

Only the cover photo is prioritized. Opening decodes the next visible responsive hero image, with a bounded fallback so a failed image cannot trap a guest. Later images remain lazy. The navy root backing prevents a light frame during the cover exit. Reduced motion opens without the exit animation; static content is readable without JavaScript. A refresh restarts the cover, and section hashes are respected after opening.

The calendar route `/jahzen-and-glyzell/calendar` downloads the ceremony start at 4:30 PM Philippine time without an invented end time. Directions use the supplied venue name and address in a Google Maps search.

## RSVP integration pending

`sections/RsvpSection.tsx` uses the established shared `OpenRsvpForm` with its supported preview flag and an injected no-op submitter. Replies are explicitly unsaved; the preview validates input without sending requests, creating records or persisting guest data. It does not verify names or offer extra guests. The shared optional `description` prop preserves existing behavior when omitted and allows reserved-seat copy here.

After the user creates the admin event and guest records, connect the established named-guest `SmartRsvpFlow`. Confirm the actual slug, access mode, response mode, fields and deadline rather than assuming draft values are production configuration. Preserve the reserved-seat and adults-only policies.

## Pending materials

Replace the sample photos in `data/photos.ts` with the couple's approved photography. Licensed audio files, bank details, remaining entourage names and final hosting/share information are still pending. No placeholder music control or invented accounts/roles are published.

## Verification

Use an isolated preview/build containing only selected frontend source and assets. Next.js automatically reads environment files in its project directory, so do not run checks that load real private configuration. Live backend, Supabase and native iOS Safari checks remain outside this draft's verification scope. Review evidence is kept in `.impeccable/review/jahzen-and-glyzell/`.

## Placeholder imagery only

Do not generate images for this invitation. Existing repository stock photos are explicitly labeled placeholders for the couple’s future photos. The story uses three empty photo frames, and the timeline has an empty reception photo frame. Previously generated client assets and their provenance files have been removed.

## Love story reference

The ivory editorial layout follows the user’s supplied love-story reference: centered serif heading, faint monogram and arc, four numbered chapters, alternating text and photo-placeholder rows, fine gold rules and diamonds, and a full-width final chapter. The complete questionnaire wording is preserved; data/love-story.ts derives the four chapters from data/wedding.ts without shortening the narrative.

