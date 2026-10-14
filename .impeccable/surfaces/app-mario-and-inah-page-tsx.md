---
version: 1
slug: "app-mario-and-inah-page-tsx"
primary_target: "app/mario-and-inah/page.tsx"
related_targets: []
---

# Mario & Inah

Scope: the isolated invitation at /mario-and-inah. Current authority: the user-pinned reference C:/Users/Spades/Downloads/4.png and first-screen photo-first choice. Confirmed event information and email RSVP are preserved. The current client contract is app/mario-and-inah/docs/direction.md.

## Direction contract

THESIS: A continuous floral wedding scroll with an immediately readable photographic opening and the reference's painted botanical composition.

OWN-WORLD: Cream floral paper, pale sage botanical pattern, woodland photography, lilac venue field and blush stationery. Imperial Script names/headings, Libre Baskerville formal details and dark olive ink. Use the supplied client-local flowers and actual uploaded venue photograph.

STORY: Names over a photograph → floral countdown → full-width photograph → entourage → woodland triptych → venue. Schedule, attire, closing photograph, email RSVP and footer retain confirmed guest information.

FIRST VIEWPORT: Full-bleed landscape sample photograph, centered warm ivory script names, February 20, 2027, Tagaytay and lower-corner butterfly florals positioned with -bottom-2 and -left-2/-right-2. The countdown follows directly; there is no entry overlay or opening action.

FORM: User-pinned reference; code-led. No navigation row is rendered. The footer greeting and under-form email-app/direct-contact note are removed. Content stays readable without JavaScript, and reduced motion disables the scroll indicator.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content and persistence

User-selected stable shared photographs remain samples in data/provenance while Mario & Inah's own photographs are pending. Per-image Sample photo watermarks are removed at the user's request; one gallery disclosure remains. The gallery renders the first three configured samples. The uploaded Panaad Garden image is displayed in the venue card. Story data and StorySection remain available but unrendered while client story text is null; usable audio is pending. No inactive music control is displayed.

The invitation-details section and its Save our date/calendar action are removed at the user's request. RSVP prepares a mailto draft and clears stale drafts after edits; guests review/send in their email app. Preparation requires JavaScript and its explanation appears only after preparation. No private environment-file or Supabase access is authorized.

Current tokens are in app/mario-and-inah/DESIGN.md, with extension metadata and component previews in app/mario-and-inah/.impeccable/design.json. Eleven current captures, checks.json and finish-review.md are in .impeccable/review/mario-reference/. These records supersede the earlier opening-cover, hero-arch and Polaroid directions.




Countdown flower refinement: both corner sprays shift outward by 25% of their width and use bottom-5 (20px above the bottom edge), with no vertical translation. Keep the heading and four units centered.

Entourage corner flowers shift outward by one quarter of their width and use bottom-3 (12px above the bottom edge), with no vertical translation.

Both photo breaks fill at least one dynamic viewport height, edge to edge, with cover cropping and responsive image sizes accounting for the landscape source aspect ratio.

The hero cycles through four configured sample photographs with a 900ms fade and 6.5-second reading interval. Names, date and corner flowers remain fixed. Only the first photo loads initially; each next photo is mounted when requested and decoded before replacing the current image. Controls support pause/play, direct selection and left/right arrow keys. Focused selection pauses autoplay. Offscreen and hidden-tab playback stops; reduced motion disables autoplay and uses instant manual changes. With JavaScript disabled the first photo remains visible and controls are omitted.
