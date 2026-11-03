# Jahzen & Glyzell

Invitation draft at `/jahzen-and-glyzell`, for **May 30, 2027**.

Typography follows the user's modern luxury direction: Instrument Serif for names, headings and accents, Libre Baskerville for narrative and Inter for practical UI. Script fonts are not used anywhere in this invitation.

The user selected `app/isabella-and-daniel` as the invitation format and approved sample photography while the couple's own assets are pending. Confirmed event content comes from the supplied `Modern-Luxury-Wedding-Invitation-Questionnaire-Modern-Invites.docx` and its embedded attire/palette references. Blank fields and private contact information are not published.

The countdown, attire and entourage use dark surfaces, balanced by warm venue and RSVP panels. Supplied venue photos and the dress-code guide retain their original colors. Photo tone changes are scoped CSS; no new imagery or fonts are added.

## Structure and content

`page.tsx` follows Anjo & Jasmin's section order for the available content: photo cover/hero, invitation message, live countdown, gallery, story portrait and timeline, timeline, cinematic photo break, entourage, full-screen photo break, venue details, full-screen photo break, attire, hashtag, full-screen photo break, gifts, guest notes, FAQs, memories gallery, RSVP and footer. The Moody & Romantic direction deepens the navy and espresso, softens champagne accents, warms the ivory reading surfaces and gently tones existing stock photos. Confirmed wording is preserved. There is no seat finder section. Gifts and FAQs have dedicated sections; reserved seating and the adults-only policy remain together in the guest notes.

- `data/wedding.ts`: confirmed names, date, venue, program, full story and guest policies.
- `data/photos.ts`: all temporary sample image assignments and gallery arrangement.
- `assets/photos/`: client-local optimized WebP sample assets, per-file provenance sidecars and a source manifest. These are existing repository sample photos, not photos of Jahzen & Glyzell. Images are deduplicated, capped at 1800px wide and displayed through the default Next.js optimizer/quality with responsive sizes.
- `assets/venue/ceremony.jpg` and `reception.jpg`: supplied exterior and interior photos for the two-column ceremony/reception spread, assigned through `data/venue.ts`. Both panels use the confirmed La Fina address and map. Event times come from the timeline; the shared arrival/cocktail-hour note appears once below the panels. Panels stack below 768px.
- `assets/attire/dress-code-guide.webp`: the supplied `dresscode-g.png`, converted losslessly and shown as a tilted paper guide beside the serif introduction, following the supplied reference. The full guide opens from its link; confirmed attire and reserved-color requirements also remain readable as HTML.
- `assets/artwork/invitation-collage.webp`: explicitly requested AI-generated stone-lane portrait with an overlapping antique gold oval and black-and-white close-up. Transparent WebP (1122×1402, about 236KB), displayed uncropped at quality 85 without the ordinary photo tone filter. This depicts fictional subjects, not the couple.
- `assets/artwork/story-flower.webp`: explicitly requested ivory rose and olive-leaf ornament after the last Our Story paragraph. Transparent 384×480 WebP (about 38KB), rendered at 80px wide on phones and 96px on larger screens; its sidecar stores the full prompt and generation details.
- `assets/photos/gallery-garden.webp`: supplied 500×333 garden image, optimized to about 53KB and used only as the blurred gallery background. The small already-compressed backdrop is served directly, lazily, without additional optimizer variants.
- `assets/artwork/navy-romantic-flowers.webp`: requested navy-blue rose decoration, prepared with transparency at 1122×1402 (about 368KB). It has no assigned section yet; the full generation prompt is in its sidecar.
- `components/`: guarded opening/focus handoff, navigation, shared photo frame and reveals.
- `sections/`: individual invitation passages. `styles/` contains scoped typography, color, decorative treatments and motion.

Only the cover photo is prioritized. Opening decodes the next visible responsive hero image, with a bounded fallback so a failed image cannot trap a guest. Later images remain lazy. The navy root backing prevents a light frame during the cover exit. Reduced motion opens without the exit animation; static content is readable without JavaScript. A refresh restarts the cover, and section hashes are respected after opening.

The calendar links are removed from the invitation UI. The existing direct route `/jahzen-and-glyzell/calendar` still downloads the ceremony start at 4:30 PM Philippine time without an invented end time. Directions use the supplied venue name and address in a Google Maps search.

## RSVP integration pending

`sections/RsvpSection.tsx` now follows the name-first layout used by Anjo & Jasmin and Ryan & Anne: photo beside a centered serif heading, underlined full-name field and Find My Invitation action. `components/RsvpPreviewFlow.tsx` reuses the shared `SearchStep` and then the shared minimal `OpenRsvpForm`. The entered name is used only for the visual preview, with no lookup or fabricated matches. Clear preview notices state that names are not checked and replies are not saved. The injected no-op submitter preserves local validation, attendance choices, optional fields and unsaved confirmation without requests or guest records. Back returns to name entry with keyboard focus restored. There is no extra-guest control.

After the user creates the admin event and guest records, connect the established named-guest `SmartRsvpFlow`. Confirm the actual slug, access mode, response mode, fields and deadline rather than assuming draft values are production configuration. Preserve the reserved-seat and adults-only policies.

## Pending materials

Replace the sample photos in `data/photos.ts` with the couple's approved photography. The three supplied MP3s are connected through data/music.ts. Bank details, remaining entourage names and final hosting/share information are still pending; no invented accounts or roles are published.

## Verification

Use an isolated preview/build containing only selected frontend source and assets. Next.js automatically reads environment files in its project directory, so do not run checks that load real private configuration. Live backend, Supabase and native iOS Safari checks remain outside this draft's verification scope. Review evidence is kept in `.impeccable/review/jahzen-and-glyzell/`.

## Imagery policy

The user explicitly requested the invitation-message collage, the small botanical ornament after the final story paragraph and a prepared navy-blue rose decoration asset. These are limited exceptions to the earlier placeholders-only direction; do not generate other imagery without a new request. Existing repository stock photos are temporary placeholders for the couple’s future photos. The story uses the same shared placeholder photographs as Vincent & Gabrielle, configured in data/story-photos.ts with their origins documented in source. The approved story portrait appears before the milestone timeline on phones. The timeline ends after the final event without calendar actions or an empty photo frame. The new transparent collage is assets/artwork/invitation-collage.webp; its sidecar records the built-in tool, complete prompt, reference, optimization and fictional subjects. Earlier discarded generated assets remain removed.

## Love story reference

The story follows the supplied portrait-and-timeline reference in the invitation's espresso, ivory and champagne palette. Instrument Serif headings and Libre Baskerville paragraphs preserve the no-script typography direction. A sticky portrait sits beside four dated milestones on desktop and comes first on phones. data/love-story.ts groups the complete questionnaire wording into eight paragraphs; a normalized content check confirms no words were removed or rewritten. Only confirmed dates and relative chronology are shown. The earlier tilted collage and its styling have been removed.

The gallery has no visible heading and cycles through all five photos with a five-second hold and 900ms crossfade. It shares usePhotoSlideshow with the hero: decoded incoming images, opaque outgoing layers, incremental loading, pause/play, offscreen suspension, reduced-motion manual browsing and retry. The visible buttons, indicators and counter are removed. Touch swipes and Left/Right/Home/End navigation remain. Focus pauses playback, Space toggles it, and a text pause/resume action appears only with keyboard focus. The responsive 4:5 phone and 3:2 desktop frames remain unchanged.

## Hero slideshow

`components/HeroSlideshow.tsx` cycles through the three existing landscape placeholders in `data/photos.ts`, keeping the names, date and navy shading in place. Photos advance after five seconds, with a 900ms CSS opacity crossfade. Incoming photos decode before being shown; the outgoing photo stays opaque underneath until the incoming opacity transition ends. Visited layers retain their order and only requested photos load. Opening decodes the same responsive first image at quality 85.

The hero has no visible playback bar or slide indicators. Left/Right/Home/End navigation remains available; focus pauses playback and Space toggles it. A pause/resume button appears only when reached with keyboard focus. Offscreen and hidden-tab states suspend playback. Reduced motion disables autoplay and switches selected photos immediately after decoding. Failed loads retain the current photo and offer retry.

### Story-point scroll feedback

Each diamond uses the existing Motion library to enlarge briefly over 550ms when it enters the viewport reading area, then stays filled champagne gold with an ivory edge. A 96px inset avoids the navigation and gives consistent triggers on wide and short screens. Each point runs once; scrolling back does not replay it. The position/diamond rotation and animated scale belong to separate nested elements, preserving alignment with the rail. Reduced motion retains the scroll-triggered gold highlight at a static scale. All text and outlined points remain visible before hydration.

### Elegant scroll entrances

Headings, paragraphs, photo frames and actions share a once-only 850ms ease-in-out entrance, fading from opacity 0 to 1 while rising 24px. Visible siblings enter 120ms apart, with the group delay capped at 360ms. Each element has its own viewport observation, so long sections do not reveal offscreen content prematurely. Images and artwork enter as complete frames, preserving their crops and composition. Prepared animations pause at the initial frame until intersection, without changing layout. Completion and cancellation restore the ordinary visible CSS state. Reduced motion skips or cancels entrances; keyboard focus immediately reveals its target. No-JavaScript and unsupported-animation fallbacks retain visible content. Existing slideshow crossfades, incremental image loading and hero/cinematic scroll behavior remain unchanged.

### Photo break after the entourage

A full-bleed, one-viewport-high photograph separates the entourage from the wedding venue. It reuses the existing embracing-couple placeholder through the dedicated photos.entourageBreak entry, with a 62% horizontal focal point to preserve both faces on phones. The frame has no visible text, borders or padding. Its existing 850ms fade-up entrance respects reduced motion, and SamplePhoto retains approaching-frame loading. Responsive image sizing accounts for the 3:2 source filling a full-screen portrait crop.

### Photo break after the venue

A second full-screen photograph follows the venue and precedes attire, reusing the existing walking-couple photograph at a 46% horizontal focal point. Both photo breaks use the same configurable PhotoBreakSection; source, section IDs, accessible descriptions and focal points live in data/photos.ts. Each retains its one-viewport height, edge-to-edge frame, responsive image sizing, approaching-frame loading and existing scroll entrance. The earlier entourage break is preserved.

### Photo break after the hashtag

The hashtag is followed by a third full-screen photo break before the gift message. It reuses the existing seated-couple photograph with a bouquet, configured in photoBreaks.hashtag at a 69% horizontal focal point for phones. The same PhotoBreakSection provides the edge-to-edge viewport-height frame, responsive image loading and reduced-motion-aware entrance. Earlier photo breaks remain in place.

### Memories gallery after the FAQ

A second gallery sits between FAQs and RSVP, following the supplied reference: an italic Instrument Serif “The lasting memories.” heading and gold collection caption above a three-column photo mosaic. The tall first portrait spans two rows; phones use two columns with a full-width closing photo. Eight existing approved placeholder images are configured in data/memories-gallery.ts, including crop-aware image sizes. Each tile uses the existing approaching-frame loading and once-only fade-up entrance, and links to its full-size image in a new tab with descriptive accessible labeling. The navy-deep surface distinguishes the gallery from the preceding FAQ and warm RSVP panel. The first carousel is preserved.

### Love-story background pattern

Our Story reuses Ryan & Anne’s original ornamental background, adapted to the existing espresso surface with grayscale CSS and its original faint transparency (maximum alpha 14/255). A client-local lossless WebP copy preserves the artwork and transparency while reducing the file from 649,412 to 383,998 bytes. It repeats at a responsive 640–1366px width and starts loading only when the story approaches the viewport. The decorative layer is non-interactive and hidden from assistive technology; it does not clip the section, so the desktop portrait remains sticky. Story content, layout and animations are unchanged. Source and processing provenance accompany the asset.

### Vintage envelope above the entourage

The existing transparent navy floral envelope artwork is centered above the wedding-entourage label and heading, at 96px wide on phones and 112px from 640px. It retains its original colors and participates in the existing once-only heading stagger. The image is decorative, non-interactive and hidden from assistive technology. Responsive Next/Image loading preserves transparency and avoids downloading the full source unnecessarily.

### Paper texture on the entourage

A generated handmade-cotton-paper texture is softly blended over the existing espresso entourage surface. The fine fibers and slight paper-density variation stay behind the envelope, watermark and names, using a static soft-light layer at 85% opacity with grayscale/contrast treatment. The optimized 1024px WebP is about 103KB and repeats at 768px; it loads only as the section approaches. The client-local DecorativeBackground component shares this loading behavior with the unchanged story pattern. Content, layout, entrances and reduced-motion behavior are preserved. The asset sidecar records the complete built-in image_gen prompt and source.

### Navy bow above the gift title

The user-supplied navy bow is centered above “Your presence is our greatest gift.” at 96px wide on phones and 112px from 640px. A lossless WebP preserves its original palette, proportions and transparent background. It joins the existing fade-up stagger and is purely decorative, with an empty alt and an aria-hidden wrapper. Gift wording and the section’s parchment surface remain unchanged.

### Heart-shaped record above Our Story

The user-supplied heart-shaped vinyl record appears centered before the Our Story heading. The built-in image_gen edit removes the white backing and creates a genuine transparent cutout, retaining the record’s brown grooves and cream/gold label. The optimized 512px WebP renders at 128px on phones and 144px from 640px, with natural colors, an empty alt and a decorative wrapper. It joins the existing fade-up stagger; the story pattern, complete narrative and sticky portrait remain in place. The asset sidecar records the edit target, full prompt and generated source.

### Flowers at the bottom-right of the guest notes

The supplied gold and espresso flowers decorate the bottom-right corner of “A few loving notes.” The built-in image_gen edit clears the gray backing, and a 512px-wide transparent WebP retains the floral palette. Responsive contained frames are capped at 112px, 144px and 160px wide, with reserved bottom space protecting both note paragraphs. The ornament is non-interactive, hidden from assistive technology and uses the existing once-only reveal. Notes, policies, heading and colors remain unchanged. The section now has a guest-notes anchor for direct review.

### Floral linework around the venue

The supplied lily branch and three-bloom sketch form subtle upper-right and lower-left venue flourishes, following the countdown’s clipped edge-decoration treatment. Built-in image_gen background extraction creates transparent ink-only assets; CSS alpha masks tint them antique gold at 20–25% opacity over the ivory surface. The layer loads as the venue approaches, is decorative and non-interactive, and stays behind the original content without changing its layout. Responsive dimensions and section clipping prevent horizontal overflow. Photos, addresses, map links, event wording and entrance animations remain unchanged. Both asset sidecars retain the complete prompts and source references.

### Wedding soundtrack

The supplied songs play in order: He Knows (Almira Lat), Dito Muna Tayo (Syd Hartha feat. Toneejay), and I Do (Cherish You), Michael Pangilinan’s cover. A single audio element starts from the Open invitation gesture before the image-decode await, preserving mobile playback permission without delaying the opening transition. Nothing preloads before that action. A compact fixed navy/gold control provides pause/resume, a keyboard-accessible playlist and volume; desktop adds previous/next controls. Songs advance on ended and repeat from the last to the first. Manual pause survives skips, rapid changes invalidate old play requests, and blocked/unavailable playback offers a retry or another selection. Escape and the close action return focus to the playlist control; outside clicks dismiss it. Footer spacing protects the final links from the player.

MP3 imports use a reusable webpack asset/resource rule and a shared type declaration. Files stay in this client’s music folder and build to content-hashed static media, with native byte-range support and no custom backend, duplicate public copies, credentials, external music hosting or dependency. Use the repository’s standard webpack-based dev/build commands for these imports.
