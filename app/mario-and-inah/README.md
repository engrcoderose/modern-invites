# Mario & Inah wedding invitation

Route: `/mario-and-inah`.

A continuous photo-first floral invitation matching the user-pinned reference at `C:/Users/Spades/Downloads/4.png`, with supplied floral artwork and confirmed questionnaire content. The first screen is immediately readable. No navigation row is rendered, and the footer greeting is removed. The user requested removal of per-image Sample photo watermarks and the Save our date section; the separate invitation-details section and its calendar action are no longer rendered. Client-specific files and documentation stay in this folder.

## Current sequence

Full-screen photo welcome → slideshow hero → floral countdown → full-width photograph → sage botanical entourage → rose-backed photo triptych → lilac venue with blush card → schedule → attire → gift registry → closing photograph → Frequently Asked Questions → second gallery → RSVP → footer.

Imperial Script supplies names and main headings; Libre Baskerville supplies formal details, with Inter for prose and controls. Instrument Serif remains in the attire subtitle. The first gallery retains its rose-backed triptych. `ClosingGallerySection` presents seven configured photos on sage with ivory frames: a central portrait surrounded by four smaller moments and two wide images underneath. On mobile the centerpiece comes first, followed by paired photos. Both galleries retain distinct section and heading IDs. The venue card uses the uploaded `wedding-venue.jpg` from the client R2 designs folder.

## Files and content

- `data/wedding.ts`: confirmed names, date, venue, directions, schedule, RSVP contact/deadline, attire palette, and pending music configuration.
- `data/photos.ts` and `data/sample-photos.ts`: client-local photo placement, dimensions, focal positions and sample provenance. Stable shared URLs under `https://assets.moderninvites.com/placeholder-images/prenups/` reuse the user-selected collection also used by Vincent & Gabrielle.
- `data/entourage.ts`: confirmed names and separately recorded pending roles.
- `data/guest-information.ts`: the supplied monetary-gift note and eight FAQs. The RSVP deadline comes from `data/wedding.ts`. `GiftRegistrySection` and `FaqSection` reuse the floral artwork, theme and content reveals; FAQs use the shared accessible accordion. Navigation links include both sections, with the mobile menu retained through tablet widths.
- `data/artwork.ts` and `components/FloralArtwork.tsx`: R2-hosted floral cutouts, pattern, attire illustration, gallery painting and venue photograph. `assets/provenance.json` consolidates source records, sidecar metadata and exact generation prompts; embedded origins are retained.
- `sections/` and `components/`: focused sections, photo frames, countdown and backend-connected RSVP.
- `styles/invitation.module.css`: scoped typography, colors and decoration; simple layouts use Tailwind in JSX.
- `DESIGN.md`, `.impeccable/design.json` and `docs/direction.md`: current client-only system and reference contract.

The earlier OpeningScreen, PolaroidSection, FloralSpray and Navigation components are removed from this implementation. Earlier artwork sources may remain for provenance; runtime reference florals are supplied through `data/artwork.ts`.

## RSVP

`components/RsvpForm.tsx` uses the shared `SmartRsvpFlow` initialized for guest-list search for the confirmed `mario-and-inah` event slug in `data/wedding.ts`. Guests search their full name, select their household, and respond through the existing guest-list flow. This invitation sets allowUnlistedReplies to false, so unlisted replies remain hidden even if an older event configuration reports Open RSVP. Server access must still be configured as Guestlist search. Search and household details use the minimal shared presentation with the invitation's existing pastel sage, paper and ink theme. The shared flow handles event availability, validation, saving, errors and confirmation; JavaScript is required. This replaces the direct open-only form; the earlier email-draft form is also superseded.

Admin prerequisite: the existing `mario-and-inah` event must be active with **RSVP access → Guestlist search**, RSVP service enabled, and a deadline that still accepts replies. The user must apply the existing open-RSVP migration if it has not already been applied; see [open RSVP setup](../../docs/open-rsvp-setup.md) for setup and manual verification queries. No event records, settings, credentials or remote database were accessed or changed during this integration. Deployment must include the existing shared open-RSVP API and migration support, not only the invitation folder.

The isolated preview on port 3151 contains no real RSVP backend and cannot save replies. Verify a real submission and its dashboard entry manually in the configured application after deployment. Historical browser checks below describe earlier invitation iterations, including the former email form; they are not evidence of live storage verification.

## Pending client details

- Couple photographs: current photo placements use samples. Per-image Sample photo watermarks have been removed at the user's request; one gallery caption and client data/provenance retain the sample status. Replace sources, alt text and focal positions in client data, then remove `sample: true` only for approved client images.
- Story: actual narrative remains unprovided. Stored headings are structural placeholders; no story section is displayed.
- Veil, candle and cord sponsors: names remain unprovided.
- Ring bearer: described as one of the groomsmen; the individual remains unconfirmed.
- Wedding hashtag: marked N/A and omitted.

The venue photograph has been supplied and is displayed; it is not pending.

The venue's lower floral border uses the R2 `venue-lower-flowers-hd.webp`, a transparent 1800 × 874 watercolor recreation generated with the built-in image_gen tool from the supplied artwork. The exact prompt and source provenance are retained in `assets/provenance.json`. Unused PNG originals were removed during the requested cleanup. Desktop and mobile checks confirmed the new border loads with responsive image widths and no page overflow.

## Verification

ESLint and strict TypeScript passed for this client. A final production Next build passed in an isolated copy containing this invitation, safe configuration and the already-cached repository fonts. Private environment files were excluded and never read or loaded; no Supabase calls were made. A full repository build was not run because it automatically loads private environment files.

Current browser verification at 1440px desktop, 768px tablet and 390px phone passed: loaded fonts and images, no horizontal overflow, no console errors, working anchors and no zero-height photo frames. No-JavaScript content readability and synthetic RSVP draft creation/clearing were also checked; fields remain visible without JavaScript, but email-draft preparation requires it. External email delivery and live guest storage were not tested or configured.

Eleven current screenshots, `checks.json` and `finish-review.md` are in repository-root `.impeccable/review/mario-reference/`. The session's isolated preview is `http://127.0.0.1:3140/mario-and-inah`; this temporary local address is not a deployment. Earlier review captures and preview ports describe superseded versions.




## Image welcome screen

The refined welcome stacks Mario and Inah in ivory Imperial calligraphy, separated by a smaller Libre Baskerville ampersand. A fine hairline and diamond divider sits beneath the confirmed date, and a transparent outlined Open invitation action completes the composition. The names enter in a restrained stagger; short-height screens scale the lettering down while keeping the action visible. The existing photo drift, floral exit and cover dissolve remain intact.

`components/InvitationWelcome.tsx` now follows the photo-cover pattern in the earlier Jaydee & Bea and Nylgen & Kersee invitations. It enhances `sections/WelcomeSection.tsx` into a fixed welcome cover, with the configured `photos.welcome` image, ivory calligraphy, a fine frame, confirmed date/location and supplied butterfly florals. `hooks/useWelcomeEntrance.ts` gives lettering and flowers a short staggered entrance; the photograph drifts inward 3.5% over eight seconds. Open invitation prepares the hero, then the photo moves forward, lettering and flowers recede, and the cover dissolves over 750ms. The underlying content enters after 240ms to avoid overlapping title lettering. Keyboard focus transfers to the hero after opening.

The invitation stays inert until the cover finishes, and the temporary scroll lock is restored afterward. A 2.2-second image-readiness fallback prevents a failed image from trapping guests. Reduced motion skips spatial effects and opens immediately once ready; hidden tabs pause the photo drift. Explicit section links bypass the cover. Without JavaScript, the welcome remains inline, the actual anchor reaches the invitation, and all content remains accessible. Short screens keep the opening action visible. Only the welcome photograph and its corner artwork are prioritized.

Opening checks cover desktop and phone portrait/landscape layouts, keyboard entry, busy/inert state, focus transfer, restored scrolling, RSVP, initial/live reduced motion, quick clicks, explicit section links, no-JavaScript access and a stalled hero image. Client ESLint, strict TypeScript and the isolated production build passed; temporary captures are removed after visual review.

## Hero slideshow

The hero cycles through four configured sample photographs with a 900ms fade and 3-second reading interval. Each photo slowly zooms from 1 to 1.03 over 3.9 seconds, continuing gently through its crossfade; zoom pauses with playback and offscreen/hidden-page state and is removed for reduced motion. Hero copy remains independent of slideshow changes; first-entry text reveals and gentle floral parallax run separately. Only the first photo loads initially; each next photo is mounted when requested and decoded before replacing the current image. Four plain circular dots provide direct selection and left/right arrow-key navigation, without a pill background or playback icons. Selecting another dot pauses autoplay; the current dot toggles pause/resume with an accessible label and tooltip. Offscreen and hidden-tab playback stops; reduced motion disables autoplay and uses instant manual changes. With JavaScript disabled the first photo remains visible and controls are omitted. Photo selection is stored in data/photos.ts as heroPhotos; HeroSlideshow.tsx handles playback.

Slideshow verification passed at 1440px and 390px for all four photos, pause/play, keyboard selection, offscreen pause, live reduced-motion changes, and the no-JavaScript fallback. A held-image check verified that focus cancels a pending change; a synthetic visibility event verified hidden-tab pause. Isolated build, strict TypeScript, and targeted ESLint passed.

## Entourage typography

The entourage keeps its script heading, supplied florals and sage paper. Names use Libre Baskerville at 16–18px with 1.75 leading; formal role labels use 12px with restrained tracking. A fine geometric ornament separates the parents from the wedding party, and hairline rules frame the principal sponsors. Paired groups and sponsor names use two columns, stacking below 360px. Checks at 1440, 768, 390 and 320px preserved all 23 confirmed names with no clipped text or runtime errors; enlarged text at 200% also remained within the page. TypeScript, targeted ESLint and the typography scan passed. Temporary captures were removed after review.

## Scroll depth

`components/ParallaxLayer.tsx` provides gentle scroll-linked depth using the existing Motion library. Hero and full-screen photo backgrounds drift within ±36px on tablet/desktop and ±18px on phones; floral layers drift within ±10px and ±5px respectively. A damped spring softens scroll changes. Backgrounds have 48px of vertical overscan on both edges, accounted for in responsive image sizes. Reading content, slideshow controls, and RSVP fields remain outside the moving layers. The venue border has a 12px lower-edge allowance to keep its baseline covered. Live reduced-motion preferences remove spatial movement immediately; without JavaScript all content remains visible. No custom scrolling or new dependencies are introduced.

Parallax verification passed at 1440px, 768px and 390px: scroll response stayed within its bounds, photographs covered their frames, live reduced motion reset every layer, RSVP keyboard focus worked, and no horizontal overflow or runtime errors appeared. The no-JavaScript fallback, strict TypeScript, client ESLint and isolated production build passed. Temporary screenshots were removed after review.

## Content reveals

`hooks/useContentReveals.ts` observes explicitly marked content using one IntersectionObserver and the existing Motion library. Headings resolve from a faint 2px blur with an 8px rise over 750ms; text groups rise 10px over 700ms; photographs settle from a 1.025 scale over 900ms; the entourage ornament gently opens horizontally. List stagger is capped at 200ms. Each element runs once per visit and remains visible before JavaScript runs. Background parallax and slideshow playback use separate layers. RSVP fields and navigation controls do not move. Focus, hidden-page and reduced-motion interruptions cancel active reveals and restore authored styles after Motion's queued render; live reduced motion also prevents new reveals.

Desktop and mobile checks verified actual transitions, settled sharp text, one-time playback, live and initial reduced motion, the no-JavaScript fallback, usable RSVP draft preparation, and no overflow or runtime errors. Client ESLint, strict TypeScript and the isolated production build passed. Temporary screenshots were removed after inspection.


Text entrances emphasize the wedding names: the welcome lettering softly resolves from 2px blur with an 18px rise and 220ms name stagger, followed by its date and location. Section calligraphy resolves over 900ms from 25% opacity and a 14px rise; supporting text uses a quieter 700ms fade and 10px rise. Entourage names animate individually with a short row stagger capped at 200ms, while role labels stay separate. The hero title animates its inner lettering without moving keyboard focus. Content remains visible by default and animations run once, settle on interruption, and honor live reduced-motion preferences.


Text-motion verification passed at 1440px desktop and 390px phone: hero lettering animates while heading focus is preserved, section headings settle sharp, reveals run once, live reduced motion settles active effects, RSVP remains usable, and no overflow or runtime errors occurred. Initial reduced-motion and no-JavaScript content remain visible. Targeted ESLint and strict TypeScript passed. Temporary captures were removed after review.





## Falling petals

`components/FallingPetals.tsx` and `styles/petals.module.css` add a decorative pastel shower after the opening handoff: ten petals from 640px and five on smaller screens. It reuses the invitation's blush, lilac and sage tokens. The layer ignores pointer input and is hidden from assistive technology. Its lower-left control pauses or resumes motion; hidden tabs and focused inputs, textareas or selects pause it automatically. Reduced motion hides the petals and control.

Targeted ESLint and TypeScript checks passed for this addition. Browser CDP was unavailable, so desktop/mobile visual checks and rendered interaction verification remain pending; earlier browser results above do not verify the petals.

## R2 decoration hosting

All 16 design images now load from https://assets.moderninvites.com/mario-and-inah/images/designs/ through the existing Next Image optimizer. Verified dimensions, responsive sizes, image qualities and the shared 31-day cache remain intact. Public R2 downloads matched local SHA-256 hashes before local copies were removed. URLs, dimensions and hashes are recorded in assets/provenance.json. Change filenames when replacing artwork to avoid stale cached images. Music and RSVP are unchanged.

