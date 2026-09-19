# Joshua & Bea — Signature wedding sample

Route: `/joshua-and-bea-wedding`. The previous `/jasmin-and-anjo` and `/jasmin-and-anjo-wedding` URLs permanently redirect here. The public route reuses the invitation in `app/joshua-and-bea`.

The guest-facing invitation reads as an upcoming wedding; the details remain invented. RSVP is the requested exception: it is explicitly marked as a demo, following Nylgen and Kersee's name-search and household-response flow. It must not claim responses were sent or saved.

Adapted from the Isabella & Daniel invitation with a floral photo welcome screen, cinematic photo hero, scroll animations, music, editorial sections, gallery, attire, guest guide, and RSVP preview. All components are isolated from the original invitation. The palette combines ivory, blush, sage, powder blue, and botanical accents.

Edit `data.ts` for the sample story, program, entourage names, and palette. The section order is assembled in `page.tsx` and media in `media.ts`; the welcome photo, floral border, and music are configured in their components. Sample content and media remain placeholders.

Fictional details: Joshua Villanueva and Bea Monteverde; Saturday, June 19, 2027, at 4:00 PM Philippine time; The Garden Chapel and Casa Primavera Gardens in Tagaytay. These venues are invented, so the maps intentionally show the sample city rather than claiming to locate a real venue. The countdown targets the ceremony time. RSVP deadline: May 29, 2027. All entourage and guest names are fictional. The existing Pexels/sample photographs and floral artwork are retained; no client video is rendered.

RSVP is an interactive, in-memory demo. No responses are sent or saved. Do not connect this public sample to a client event. Search `Clara del Rosario` or `Enzo Aguilar` for a two-person household, `Lucia Navarro` for a solo guest, or `Tomas Alvarado` for a three-person family. Select the matching household, answer for each named guest, optionally enter dietary requirements, and use made-up contact and email details. Completion shows attendance totals; repeat lookup shows the completed household until “Restart demo” or refresh. Guest management will be added manually on the admin side; there is no public guest portal. Background music starts on opening and has a pause control.

Signature showcase: custom pastel theme, story, complete date/time/venue details, countdown, dress code, entourage, animated timeline, city maps, two photo collections (Polaroids and interactive gallery) within the 30-photo allowance, one music track, premium animations, smooth scrolling, restricted RSVP preview, responsive layouts, and hashtag copy. Guest management is handled separately on the admin side. Per the requested layout, RSVP is immediately followed by the footer. The public package disclosure, guest portal, and sharing/QR section are removed. Luxury video and gift sections are not rendered.

The homepage and portfolio link to this Signature sample. The separate `/anjo-and-jasmin` client invitation now keeps its original wedding details in its own `wedding-details.ts`, so editing this sample cannot overwrite them.


Styling conventions (also recorded in `AGENTS.md`):
- Use Tailwind in components for layout, responsive breakpoints, typography, colors, spacing, borders, shadows, positioning, and ordinary hover/focus states.
- Keep complex keyframes, coordinated animation playback, gallery masks, textures, and document-level browser behavior in `wedding.css`.
- Motion handles runtime scroll progress and springs in the timeline, cinematic section, reveal wrapper, and progress bar. Keep static formatting in Tailwind even on Motion elements.
- Use complete Tailwind class names. Dynamic palette colors, photo positions, and scroll progress are passed as typed runtime values.
- `SectionLabel` and `Botanicals` merge local utility overrides with `cn`.

Code organization:
- `page.tsx` assembles sections in their existing order.
- `data.ts` contains fictional wedding details, the sample hashtag, story/program/entourage, and attire palette. Story/program fields match their component types directly.
- `media.ts` contains the section images and placeholder gallery; `prenup-media.ts` shares the local photos used by the hero and Polaroid strip.
- `GiftSection` renders the gift guide; `HashtagSection` owns the interactive copy button. `GiftAndHashtagSections` composes them.
- `hooks/usePageVisibility.ts` shares hidden-tab handling across the hero, Polaroids, and gallery.
- The guest guide component is available but is not rendered in the invitation.

The hero uses five local couple photos, a 3.5-second interval after the next image loads, and 1.8-second CSS crossfades. Playback pauses offscreen, in hidden tabs, and for reduced-motion preferences. The Polaroid and gallery tracks retain their pause controls and static reduced-motion layouts.

Validation:
- Run `npx tsc --noEmit --noUncheckedSideEffectImports`.
- Check desktop and mobile layouts, especially the opening screen, hero, square Polaroids, gallery columns, and single-card timeline.
- Check pause/resume, gallery open/close, hashtag copy, navigation, and the RSVP preview after interaction changes.

Naming convention: always list the groom first: Joshua & Bea, Joshua Villanueva and Bea Monteverde, and J & B for initials. Apply this to visible text, metadata, and accessibility labels.

Run `node --experimental-strip-types --test tests/signature-sample.test.mts` for exact name matching, complete household responses, seat limits, and response totals.
