# Aljay and Erlyn

Draft route: `/aljay-and-erlyn`. No hosting, DNS, admin record, database, or shared invitation configuration has been changed. This route stays `noindex` while awaiting client review.

## Content and references

The experience follows Leslie and Serj's full-screen invitation book: a separate opening cover, page turns, previous/next controls, a chapter selector, keyboard navigation and a mobile menu. Aljay and Erlyn have their own scoped artwork, components, content and CSS module. The existing root Imperial Script, Libre Baskerville and Instrument Serif font resources are reused.

The original brief supplies the formal names, love story, contact address, olive/ivory romantic and whimsical theme, music selection and **8 November 2026** reply deadline. The owner's `Wedding-Details.pdf` supplies the entourage, venue details, attire illustrations, gift QR images and guest policies. Later chat confirmation overrides conflicting PDF copy:

- Dress code: **Casual, Semi-Formal, and Formal**.
- Exact color note: **Please avoid: All yellow, All Green, White, Black, and Red**.
- RSVP deadline: **8 November 2026**, superseding the PDF's older 31 October date.
- Bride's formal name retains the middle initial from the original brief: **Erlyn Joy E. Sablay**.
- Wedding date: **18 December 2026**, confirmed in chat.

Confirmed arrival is 2:30 PM, with a 3:00 PM ceremony at Holy Family Parish Church, Parang, Marikina. Reception follows at Teodore Events Place. Map links search each supplied venue name and address; they are not independently verified map pins.

## File responsibilities

- `page.tsx`: route composition and draft metadata.
- `data/wedding.ts`, `data/entourage.ts`: client details and ordered chapters.
- `data/photos.ts`: owner-requested placeholder collections from Vincent and Gabrielle's existing R2 gallery sources, with dimensions, descriptions and focal points.
- `components/Invitation.tsx`: entry state, navigation, gestures, focus and optional music.
- `components/OpeningCover.tsx`, `BookLeaf.tsx`: guarded opening handoff and page transitions. Main content is visually hidden and inert until the cover completes. Asset/font failures have a bounded fallback; refresh replays the cover, including when loading a chapter hash.
- `utils/page-fold.ts`: exact copy of Leslie and Serj's diagonal fold geometry, as requested. `BookLeaf.tsx` uses the same 1.25-second easing, reverse sheet, crease gradient, shadow and forward/backward layer order; the scrollable content stays inside the clipped sheet.
- `components/RsvpSection.tsx`: a local form preview, plus a disabled integration point for the established shared RSVP flow.
- `sections/`: focused invitation, story, venue, timeline, entourage, attire, gift and FAQ content.
- `styles/wedding.module.css`: scoped palette, expressive typography, stationery details and motion. Basic layout uses JSX Tailwind utilities.
- `assets/README.md`: origins and generation prompt for supplied and generated artwork.

## Items to finalize

1. **Reception schedule**: only arrival and ceremony times are confirmed. Additional timeline entries must be approved before being presented as scheduled events.
2. **Music file**: “Spring Snow” by 10CM is selected. Supply an authorized audio file and set `wedding.music.src` to its stable client-scoped URL. Until then, no player or network request is rendered. Playback starts from the guest's Open gesture, with a pause/resume control and playback-error recovery once a source exists.
3. **Couple photos** and **hashtag**: Aljay and Erlyn's photographs and hashtag are not supplied. At the owner's request, the Us and Together galleries use Vincent and Gabrielle's existing photo collections as visibly labeled placeholders. Replace them with the couple's approved photographs before launch; no hashtag is invented.
4. **Gift details**: the account numbers and original embedded QR images are from the PDF. The owner should check both before publication; no payment was attempted or remotely verified.

## Photo galleries

The book now has 15 chapters, including **Us · photos** after the venues and **Together · photos** before the dress code. Us presents four photos in a portrait frame; Together presents five in a full-stage frame with a 3:5 height cap on mobile. `Main1-4.webp` is omitted because the source invitation documents visible distortion in that image. The same public R2 WebP URLs are reused; no photo files or client code are duplicated and shared image configuration is unchanged.

`PhotoSlideshow.tsx` measures each frame for accurate Next Image `sizes`, including `object-cover` cropping, and uses quality 85. `usePhotoSlideshow.ts` loads only the first requested photo initially, then mounts additional photos on selection or autoplay. Visited layers stay mounted in a stable order. Incoming images are decoded before revealing; CSS retains final opacity while the outgoing image stays opaque beneath the new one until its own 900ms opacity transition completes. Pending selections wait for the running fade and retain the last requested target.

Controls include photo dots, a visible pause/resume button, and left/right photo navigation when focus is within the gallery. Those arrow keys do not turn the book page. Manual selection or keyboard focus pauses autoplay; page departure, document visibility and reduced-motion preferences also govern playback. An image/decode failure retains the current photo and offers Retry. The four-second interval starts after a photo is ready and the previous fade has completed. All captions and image alternatives identify the photographs as placeholders.

## RSVP integration

The draft collects a name, attendance, optional email, dietary needs and a message. Native field validation and whitespace-name validation are active. “Preview reply” shows a review summary with an explicit statement that nothing was sent or saved. Editing preserves entered fields during that visit. There are no mock success receipts, localStorage writes, API requests or database writes in preview mode.

After design approval, the owner creates the event record and imports the approved guest list through the existing admin workflow. Only then set `wedding.rsvp.eventSlug` to the actual approved slug and enable `wedding.rsvp.enabled`. The live branch uses shared `SmartRsvpFlow` with name search and unlisted replies disabled, matching the invitation-only guest policy. The server remains authoritative for access, response mode, attendance limits, deadline and locking. Confirm that the shared flow's final fields fit the approved admin configuration; do not invent event IDs or reuse another couple's guest data.

No real environment files may be read or loaded and no Supabase queries or remote checks may be run by the agent. Live RSVP verification is reserved for the owner.

## Validation

Use direct installed CLIs for checks that do not load environment files. A root Next dev/build command loads `.env.local` automatically and is unsuitable under this repository's private-credential boundary. The implementation was previewed in an ignored isolated Next project containing only selected source, local font copies and assets, without environment files, middleware or API routes.

Completed checks:

- Targeted ESLint: passed using the installed ESLint CLI and repository legacy configuration; only the tool's existing configuration-deprecation notice appeared.
- Repository TypeScript check with `--noEmit --noUncheckedSideEffectImports`: passed; the temporary isolated-preview copy was excluded from the repository check to avoid duplicate generated project types.
- Isolated Next production build, including its lint/type checks and static prerender: passed. Only this new invitation and its imported dependencies were built; the full credential-dependent application build was not run.
- Desktop 1280 × 720 and mobile 390 × 844: all 13 chapters inspected; tablet 768 × 1024 and compact phone 320 × 568 checked with a readable scrolling fallback. No horizontal overflow or browser console errors/warnings were observed.
- Pointer and keyboard opening, focus transfer, refresh, forward/backward chapter selection, repeated activation guard, Home/End shortcuts, native FAQ disclosure behavior, RSVP missing/whitespace-name and email validation, preview summary and preserved fields on edit: checked with synthetic guest data. Nothing was sent or persisted.
- Gallery addition: both photo pages checked at desktop 1280 × 720, tablet 768 × 1024, mobile 390 × 844 and compact phone 320 × 568. All nine source photos loaded. Autoplay loops, last-to-first changes, pause/resume, rapid selections, dot controls and keyboard photo navigation were checked. Cached wraparound was inspected in painted frames during and after the fade. The active gallery kept one settled visible layer, and photo keyboard controls retained the book chapter. No horizontal overflow or console errors were observed. The scoped gallery design detector reported no findings.
- All five shipping raster assets have generation/source provenance. Image responsive selection and loading were observed locally; original gift images remain available through their links.

Reduced-motion branches and asset/font failure fallback were reviewed in source. A real reduced-motion browser run, forced failure scenarios, iOS Safari, live map-pin accuracy, actual audio playback, payment/QR transactions, live RSVP and Supabase were not tested. The wedding date is confirmed as 18 December 2026; no countdown or calendar feature has been added.
