---
name: Jahzen & Glyzell
description: A photographic wedding editorial in navy, espresso, champagne and ivory.
colors:
  navy: "#142735"
  navy-deep: "#091823"
  timeline-navy: "#0c1c27"
  timeline-champagne: "#e4c48a"
  timeline-icon: "#dcc38b"
  timeline-time: "#f1e5d2"
  timeline-muted: "#d3dce1"
  timeline-intro: "#e7e6df"
  espresso: "#2e211e"
  champagne: "#c9ad80"
  champagne-hover: "#e1c794"
  antique-gold: "#795a35"
  ivory: "#f3eadc"
  paper: "#e7d9c6"
  muted: "#635245"
  rule: "#baa78d"
  field-border: "#c3b397"
  selected: "#e6dac6"
typography:
  display:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontSize: "clamp(4.5rem, 12vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.78
    letterSpacing: "-.035em"
  headline:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontSize: "clamp(3.25rem, 6.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-.03em"
  title:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontSize: "29px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "var(--font-inter), Arial, sans-serif"
    fontSize: "15px"
    lineHeight: 1.7
  prose:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: "14px"
    lineHeight: 2.05
  signature:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontSize: "36px"
    lineHeight: 1.25
  label:
    fontFamily: "var(--font-inter), Arial, sans-serif"
    fontSize: "10px"
    letterSpacing: ".14em"
  action:
    fontFamily: "var(--font-inter), Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: ".09em"
rounded:
  square: "0"
  oval: "50%"
spacing:
  field: "12px"
  section-mobile: "96px"
  section-desktop: "160px"
  grid-mobile: "64px"
  grid-desktop: "96px"
components:
  button-gold:
    backgroundColor: "{colors.champagne}"
    textColor: "{colors.navy-deep}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "12px 28px"
  button-gold-hover:
    backgroundColor: "{colors.champagne-hover}"
  nav-rsvp:
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
    padding: "8px 16px"
  text-link:
    textColor: "{colors.antique-gold}"
  input:
    textColor: "{colors.espresso}"
    rounded: "{rounded.square}"
    padding: "4px 12px"
  timeline-panel:
    backgroundColor: "{colors.timeline-navy}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.square}"
  venue-spread:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.square}"
    padding: "40px"
---

# Design System: Jahzen & Glyzell

## Overview

**Creative North Star: "Moody & Romantic — The Midnight Wedding Editorial"**

A cinematic, photographic invitation carries Jahzen & Glyzell's navy, espresso, champagne and ivory identity. Large editorial serif names and headings, soft champagne accents and generous reading space alternate between ink-blue and espresso passages, gently warmed photography and quieter ivory reading surfaces.

The user-selected format is `app/isabella-and-daniel`; it supersedes the former typography-and-oval folio composition. This is a client-scoped translation of that photographic format, with confirmed questionnaire content and policies preserved. The couple’s photographs are pending. The user explicitly authorizes the generated invitation-message collage and the small closing story flower; existing stock placeholders remain elsewhere. Existing repository stock photographs remain temporary placeholders in the previously approved surfaces; the story uses the shared placeholder photographs requested from Vincent & Gabrielle, while the timeline contains only the confirmed schedule. Earlier discarded generated assets remain removed; the newly requested collage has its own prompt and provenance sidecar. The story and timeline follow the user’s newer supplied section references within the established page format.

**Key Characteristics:**

- Full-bleed photography, sticky cinematic passages and asymmetric photo/text compositions.
- Instrument Serif display, Instrument Serif accents, Libre Baskerville narrative and Inter controls.
- Dark navy countdown and attire, espresso story and entourage, with warm ivory venue/RSVP and parchment reading passages for contrast.
- An opaque cover handoff, once-only reveals and reduced-motion alternatives.

## Colors

Warm champagne connects midnight blue photography treatments with espresso text and warm reading surfaces.

### Primary

- **Midnight navy:** root backing, opening cover, hero and RSVP actions.
- **Deep navy:** gallery, footer, scrolled navigation and photograph shading.
- **Timeline navy:** the dedicated schedule surface, extending the existing dark palette only for this section.
- **Timeline champagne / icon:** warm schedule dots and quieter gold line icons.
- **Champagne:** opening action, serif emphasis and accents against dark surfaces.
- **Champagne hover:** lighter fill and border on the opening action.
- **Antique gold:** emphasis, signatures and links on light surfaces.

### Secondary

- **Espresso:** primary reading text on ivory and paper, and the guest-notes background.

### Neutral

- **Ivory:** venue and RSVP surfaces, and main text against dark backgrounds.
- **Paper:** invitation message, gifts, FAQ and selected RSVP accents; warm narrative text on dark story and guest-note surfaces.
- **Muted:** supporting light-surface text.
- **Rule / field border:** list separators, panel divisions and form outlines.
- **Selected:** checked attendance background.
- **Timeline time / muted / intro:** distinct readable time, event-description and introductory text tones on the schedule surface.

The attire swatches remain event content in `data/wedding.ts`, rather than replacement interface tokens.

**The Surface Pairing Rule.** Use champagne emphasis on dark surfaces and antique gold emphasis on light surfaces, following the implemented headings, signatures and links.

## Typography

The user now requires modern luxury typography without script fonts throughout this invitation. Instrument Serif supplies every display, heading, name, conjunction and monogram. Libre Baskerville remains the narrative font, with Inter for forms and practical information. This supersedes the calligraphy shown in earlier layout references.

**Display Font:** Instrument Serif, with Georgia and serif fallbacks.
**Body Font:** Libre Baskerville for narrative; Inter for general copy and UI, with Georgia/serif and Arial/sans-serif fallbacks respectively.
**Accent Font:** Instrument Serif, with Georgia and serif fallbacks.

Instrument Serif now supplies both names and prominent headings. Instrument Serif punctuates conjunctions, signatures, the footer names and monograms; Libre Baskerville gives the story and policy passages a quieter reading voice. Inter keeps forms and practical information legible.

The frontmatter records the fluid hero display. Below the small breakpoint its size changes to (clamp(4.5rem, 18vw, 6rem)). The cover uses a separate serif display (clamp(4rem, 11vw, 7rem), line-height .9), with a smaller serif conjunction. The cover introduction is ordinary sentence-case Instrument Serif copy (21px, line-height 1.5), reducing to (18px) on short viewports; it has no uppercase or tracked-eyebrow treatment. On short viewports the cover display also reduces. Section headings use the headline role; subgroup headings use title; longer narrative uses prose. Labels describe dates, roles and practical metadata; they are not a prescription to add decorative kickers above headings. The timeline’s “The order of events” label follows its user-supplied reference and remains confined to that component.

**The Editorial Voice Rule.** Keep large names, headings and the sentence-case cover introduction in Instrument Serif, narrative in Libre Baskerville, practical UI in Inter and brief expressive accents in Instrument Serif. Keep long instructions in the established readable body fonts.

The shared RSVP confirmation retains its existing Libre Baskerville heading. Its inherited typography is not a separate client display rule.

## Layout

The current page follows Anjo & Jasmin's section sequence for the available content: photo cover and sticky hero, invitation message, countdown, photo carousel, a portrait and full love-story timeline, timeline, cinematic break, entourage, full-screen photo break, venue details, photo/text attire, hashtag, full-screen photo break, gifts, guest notes, FAQs, memories gallery, RSVP and footer. This sequence is the selected surface format, not a rule for unrelated invitations.

Main passages use horizontal padding (24px), increasing to (40px) at the small breakpoint, and containers up to (80rem). Common section padding grows from section-mobile to section-desktop at the large breakpoint; countdown, RSVP and footer use their own tighter spacing. Photo/text passages commonly pair a narrower photo column with a wider text column (.9fr / 1.1fr), stacking on mobile and splitting at (1024px). The entourage changes from one to two to three columns. The timeline replaces the former horizontal program: a single vertical schedule remains intact at every breakpoint, with heading and list stacked on mobile and placed in (.9fr / 1.1fr) columns at (1024px). Its container is limited to (72rem), with generous bottom space for the empty reception-photo placeholder.

The gallery has no visible heading. The supplied garden photograph fills the section behind the slideshow with a light 4px blur and soft navy tint. An overscanned, clipped background layer prevents blur-edge seams while foreground photos stay spatially sharp. The 500×333 source is a small, already-compressed 53KB WebP served lazily without extra optimizer variants. It has a static content-hashed URL and recorded provenance. Five photos advance automatically with five-second holds and 900ms CSS crossfades, using the same client-local usePhotoSlideshow hook as the hero. The incoming photo decodes before fading above the fully opaque outgoing photo, which retires after the valid opacity transition. Visited layers stay mounted and images load incrementally at quality 85 with crop-aware responsive sizes. The 4:5 phone and 3:2 desktop frames remain capped at 1024px. The gallery has no visible previous/next buttons, playback bar, indicators or counter. Touch swipes and Left/Right/Home/End navigation remain; focus pauses playback and Space toggles it. A screen-reader-accessible pause/resume action becomes visible only on keyboard focus. Offscreen and hidden-page states suspend playback. Reduced motion disables autoplay and fades. Failed requests preserve the current photo and offer retry. Attire follows the supplied Ryan & Anne reference: an Instrument Serif heading and confirmed formal-attire copy on the left, with the supplied dress-code graphic displayed in full on the right from (1024px). On smaller screens the copy precedes the guide. The guide has a slight (2deg) tilt, ivory paper backing and a soft offset shadow; it replaces the sample portrait, separate swatches and decorative caption. It is capped at (360px), with (8px) paper padding, responsive Next/Image sizing and quality (85) to preserve the graphic lettering. A full-size image link supports reading on phones. Men, women and reserved-color instructions remain as accessible HTML, with the reserved-color wording centralized in data/wedding.ts. The (1024 × 1536) source is saved as a lossless WebP in assets/attire with a provenance sidecar; no artwork was generated or cropped. Guest notes form two ruled columns at desktop; the gift note has its own centered section. Countdown keeps all four time units in a single responsive row. Navigation uses a disclosure below (1024px), with a persistent RSVP link.

The hero spans (160svh) around a sticky (100svh) frame. The cinematic break spans (150svh) around its own sticky viewport. Section anchor clearance is (96px). Keep ordinary responsive layout in Tailwind utilities; scoped CSS owns font treatments, photograph shades, decorative marks and complex shapes.

## Elevation & Depth

Depth comes primarily from photographs, tonal surface changes, sticky framing and gradient shading. Venue panels, lists and guest-note grids remain flat and separated by fine rules. The hero display has a localized text shadow for photographic legibility. A diffuse shadow lifts the supplied dress-code guide; this is selective emphasis, not a general card elevation system. The invitation photo has no circular signature seal. The inherited shared form submit shadow is not a new invitation-wide token.

## Shapes

Photos, venue panels, forms and controls use square corners. Circular attire swatches and the signature seal are small accents. The footer retains the fine double-oval serif monogram; it does not define the page's layout. The cinematic photograph briefly uses rounded clipping during scroll (12px), opening to square full-bleed framing. Decorative layers ignore pointer input.

## Components

### Buttons and links

The opening action is a square champagne button with deep-navy text, a fine matching border and lighter hover fill. It uses minimum tap height (48px), disables while opening and has a gold focus outline (2px) with offset (5px). Map actions are understated antique-gold text links on light backgrounds. The user removed the calendar action and empty image block from the timeline. Navigation RSVP is a compact ivory-text outline action with minimum height (40px), translucent deep-navy backing and a solid hover state.

### Navigation

A fixed navigation bar overlays the hero photograph, becoming solid deep navy after scrolling or opening the mobile menu. It combines a serif monogram, uppercase text links and persistent RSVP action. Links turn champagne and underline on hover. The mobile disclosure reports expanded state, closes after a selection and is hidden when collapsed.

### Photo frames

At the user request, photo frames have no visible placeholder captions or draft commentary. Provenance remains recorded in source. All seven unique local WebPs are capped at (1800px) wide; static imports provide content-hashed URLs. `assets/photos/provenance.json` and per-file `.webp.json` sidecars record their origins. The same source is reused across sections and gallery assignments where appropriate. Hero and cinematic zoom transform only the inner photograph; no caption overlays the photograph.

Ordinary Next/Image photos use default quality (75), while the hero and gallery slideshows use quality (85), the default responsive optimizer and crop-aware sizes from `data/photos.ts`. Size the source for the larger of the displayed width or the width required to cover the frame height at its intrinsic ratio, including maximum motion zoom. The landscape full-screen cover, hero and cinematic frames therefore account for viewport height; the invitation portrait crop and individual gallery spans use their own size expressions. Portrait gallery sources remain width-driven. Recalculate these expressions when replacing a source or changing its frame ratio. Only the cover is prioritized. Opening decodes the same responsive hero selection and sizes used by the rendered hero, with a bounded fallback (1800ms). Individual approaching frames activate through an IntersectionObserver margin (200px), so the initially hidden main invitation does not leave lazy frames unrequested; later frames remain lazy until approaching. This does not preload an entire gallery.

### Details, lists and FAQs

The section order follows Anjo & Jasmin for the content available here: hero and invitation, countdown, gallery, story, timeline, cinematic break, entourage, full-screen photo break, venue, full-screen photo break, attire, hashtag, full-screen photo break, gifts, guest notes, FAQs, memories gallery, RSVP and footer. The existing editorial styling remains authoritative. The user explicitly excludes a seat finder. Gifts and FAQs are standalone sections, with the original monetary-gift wording, reserved-seat policy, adults-only exception and answers preserved. Navigation follows the revised reading order and existing anchor targets remain intact.

The venue now follows the two-column reference using the supplied ceremony.jpg exterior and reception.jpg interior. Ceremony and Reception panels have tracked event labels, gold serif sequence numbers, matching 4:3 photo frames, centered Instrument Serif venue names, confirmed event times/date, address and map links. A fine top/bottom rule and central divider keep the ivory spread minimal. Below 768px the panels stack with a horizontal separator. Both remain at La Fina Grand Hall by Kastelo Verde; photo assignments live in data/venue.ts and times come from wedding.timeline. The arrival and cocktail-hour note appears once below the panels. Static imports retain content-hashed URLs, default Next/Image quality, lazy loading and crop-aware responsive sizes. Original JPGs are already suitable dimensions (1080×720 and 1059×720), with provenance sidecars. Entourage groups and guest notes organize repeated content through grids and rules rather than individual floating cards. FAQs use native details/summary disclosures with serif questions and narrative answers. The countdown follows the supplied reference: a small tracked heading and champagne star/rule flourish, full ivory names stacked in Instrument Serif with a gold ampersand, four ruled time cells in one row on every screen, a full-bleed sunset photo, and a matching lower flourish. The midnight-navy panel uses client-local floral artwork as alpha masks filled with the exact champagne-gold token at 80% opacity, plus a fine oval arc. The original flower shapes and responsive positions are preserved; WebKit mask support is included. Numerals use responsive Instrument Serif with tabular figures; labels stay readable on small phones. The live target remains the confirmed wedding date, with the full date retained accessibly. The source sunset photo is the same shared Main1-1.webp placeholder used by Vincent & Gabrielle, with default Next.js optimization, 100vw sizing and lazy loading. Existing repository floral artwork is copied into assets/artwork with source provenance; no images were generated.

### Vertical timeline

A dedicated navy schedule follows the story and precedes the cinematic break and entourage. “The Wedding Timeline” uses Instrument Serif (clamp(3.5rem, 6.5vw, 5.5rem), line-height .97, tracking -.025em); its introduction uses Libre Baskerville (15px, line-height 1.65). The reference-pinned “The order of events” label uses a short leading rule, warm text (#e8d4ad) and tracked uppercase styling only in this component. It does not establish an invitation-wide eyebrow pattern.

The ordered list aligns times, dots, line icons and event copy in four columns. A continuous fine champagne rule (#c9ad8099) connects the circular dots (8px). Line icons (38px, stroke width 1.1) depict guests, rings, drinks, dining and music; they are SVG artwork, not text glyphs. Event titles reuse Instrument Serif (clamp(1.8rem, 3.2vw, 2.5rem), line-height 1.1), with tabular Inter times (10px) and muted descriptions (12px, line-height 1.6). The list still renders the established `wedding.timeline` data; confirmed times, descriptions and calendar behavior are preserved. No font or dependency was added.

The timeline ends after the final event. The user removed both Add to calendar links and the empty reception-photo frame. Reserved bottom padding, the extra rail extension, obsolete calendar styles and the unused photo-placeholder component are removed. The schedule retains its times, event icons and decorative oval arc.

### Love-story timeline

The latest reference replaces the tilted collage with a portrait photograph beside a dated vertical timeline. The section uses the invitation's espresso surface, ivory Instrument Serif headings, warm-paper Libre Baskerville paragraphs and champagne dates, sequence numbers and diamond markers. This keeps it distinct from the navy gallery and schedule on either side. No script font or burgundy reference color is used.

A centered photograph appears first on phones, with a 4:5 frame capped at 448px. From 1024px it becomes a 3:4 portrait on the left and stays visible with a sticky position while the full story scrolls on the right. The same approved Vincent & Gabrielle Group1-1.webp placeholder and focal point remain; crop-aware responsive sizes account for its landscape source. No photo caption attributes the stock subjects to the couple.

Four milestones group the complete questionnaire text into eight paragraphs: the 2025 beginning, meeting six months later, the proposal before her departure and the wedding on May 30, 2027. Relative labels preserve the known chronology without inventing dates. On phones dates sit above the milestone headings beside a narrow diamond rail; desktop dates occupy a separate column. Each milestone uses the existing once-only reveal and reduced-motion behavior. The obsolete collage component, tilted-title styles and earlier floral separator are removed. A new user-requested ivory botanical ornament with an olive stem and leaf is centered after the final story paragraph. Its transparent WebP preserves the espresso background and natural flower colors; the image is decorative, lazy-loaded, 80px wide on phones and 96px from 640px. The source is optimized to 384×480 (about 38KB), with the built-in tool prompt and reference recorded in its sidecar.

### Section background rhythm

The user explicitly requested an uppercase The wedding entourage label with a short leading gold rule above the existing main heading, following the supplied wedding-party reference. It is centered and uses the invitation's existing small-label styling.

The entourage's decorative J & G watermark uses its own fluid serif size, from 6rem through 34vw to a 32rem cap, with no wrapping. It stays centered on one line on phones, tablets and desktops; it is separate from the invitation-message ampersand treatment.

The Moody & Romantic refinement favors deep navy, espresso, muted champagne and warmer ivory. The countdown and attire now use navy with ivory text and champagne details. Entourage uses a distinct warm espresso shade with readable parchment introductions and gold role labels. The story and guest notes retain their espresso treatment; the gallery and schedule remain deeper blue. Venue and RSVP stay warm ivory, while invitation, gifts and FAQ use parchment. Shared surface variables are overridden only inside dark sections so gold links, rules and secondary text retain appropriate contrast.

Existing stock photography receives a gentle CSS treatment: reduced saturation, a little sepia warmth, restrained brightness and contrast. The hero/cinematic shade combines an ink vignette with a warm shadow gradient. Photo opacity transitions and loading remain unchanged. User-supplied venue photos and the dress-code guide are excluded from this treatment. The hashtag uses a muted warm photograph and espresso panel. No new image assets, fonts or effects libraries are introduced.

### Wedding hashtag

The hashtag follows the supplied Ryan & Anne reference: a full-bleed warm, muted photograph with a dark overlay, framing a centered espresso panel (up to 768px wide). The panel contains the reference-specific gold wedding-hashtag label, an Instrument Serif “Share the love.” heading, the existing gold diamond/rule ornament, a brief sharing invitation and the confirmed wedding hashtag in responsive gold Instrument Serif. The hashtag remains selectable text and wraps safely on small phones. Reuse the existing client-local walking photograph; it is decorative, lazy-loaded and sized for the full-width background and its minimum height. No new photography, music control or particle animation is added.

### Name-first RSVP preview

The section follows Anjo & Jasmin and Ryan & Anne: an ivory surface, portrait on the left and centered name-first form on the right from (1024px), stacking on smaller screens. Instrument Serif “Kindly reply,” a full-name label and hint, an underlined name field and navy Find My Invitation button come from the existing shared SearchStep. The form is transparent rather than boxed in a separate panel. The deadline and named-guest guidance sit beneath it. Photos remain responsive and lazy-loaded, without placeholder captions.

RsvpPreviewFlow keeps the preview boundary explicit: names are not queried or matched, no invitation records or IDs are fabricated, and the name-first action opens a local reply preview. The shared OpenRsvpForm displays the entered name solely for this preview, validates attendance and optional contact/message fields, and reveals dietary needs for attendance. Back returns to the retained name with focus restored. Confirmation explicitly says replies are not sent or saved. No API or Supabase request is made. There is no guest-count control, invited-name verification or live submission. Event/guest records and eventual SmartRsvpFlow integration remain pending.

### Invitation collage

The user explicitly requested a generated image using the supplied two-photo reference. One transparent composite shows a tall moody color portrait in a stone city lane, overlapped at the lower right by an ornate antique-gold oval containing a black-and-white close-up. Subjects are fictional adults, not portraits of Jahzen and Glyzell. The built-in image tool created the asset; the complete prompt and reference are recorded beside the optimized WebP. The canvas is 1122×1402 with genuine alpha, compressed to about 236KB. A static import provides a content-hashed URL. Next/Image uses quality 85, width-driven responsive sizes and natural height at up to 512px wide, keeping the full frame visible. This artwork bypasses the ordinary photo color filter so the gold and monochrome inset retain their intended tones. It replaces only the invitation-message photograph; all other photo assignments remain intact.

### Hero slideshow

Three existing landscape placeholders crossfade beneath the persistent navy shading, names and date. The five-second hold and 900ms CSS opacity transition keep the incoming layer above a fully opaque outgoing layer until the valid opacity transition ends. Photos decode before promotion and load incrementally; visited layers remain mounted in stable order. The opening image decode and slideshow use matching responsive sizing and quality 85.

The user removed the visible hero playback bar and slide indicators. The photograph remains uninterrupted on desktop and phones. Keyboard focus pauses autoplay, Left/Right/Home/End selects photos and Space pauses or resumes. A text pause/resume action is screen-reader accessible and becomes visible only on keyboard focus. Leaving the viewport or hiding the page suspends playback. Reduced motion uses manual, immediate photo changes. A failed incoming photo retains the current frame and displays a retry action.

### Opening and reveals

The main invitation stays hidden until the photographic cover's exit completes, with navy root backing throughout. Repeated clicks cannot overlap opens. The foreground moves upward (14px) and dims over (.9s); the cover fades over (.25s) after a delay (.65s). Main content then enters through an opacity reveal (.85s). There are no decorative cover folds in this revised implementation.

Reduced motion bypasses the exit and content entrance animations and removes hero/cinematic transforms. The motion-preference hook uses a matching server/first-client snapshot, then synchronizes the actual preference after hydration and on changes. Neutral fallbacks explicitly restore image scale (1), cinematic clipping (none) and hero text position (0), keeping state transitions consistent without changing the default appearance. Focus transfers to the requested hash target or main title. Refresh restores the cover; without JavaScript the cover is removed and static main content is readable, with an RSVP preview notice.

Headings, paragraphs, photo frames and actions share a once-only 850ms ease-in-out entrance, fading from opacity 0 to 1 while rising 24px. Visible siblings enter 120ms apart, with the group delay capped at 360ms. Each element has its own viewport observation, so long sections do not reveal offscreen content prematurely. Images and artwork enter as complete frames, preserving their crops and composition. Prepared animations pause at the initial frame until intersection, without changing layout. Completion and cancellation restore the ordinary visible CSS state. Reduced motion skips or cancels entrances; keyboard focus immediately reveals its target. No-JavaScript and unsupported-animation fallbacks retain visible content. Existing slideshow crossfades, incremental image loading and hero/cinematic scroll behavior remain unchanged.

## Do's and Don'ts

### Do:

- **Do** preserve the confirmed palette, attire guidance and guest policies while following the user-selected photographic format.
- **Do** keep stock-photo provenance in source, omit visible placeholder captions, use the requested story sample photos and keep the timeline free of empty photo frames.
- **Do** preserve the full questionnaire story wording throughout the continuous narrative.
- **Do** keep decoration scoped and simple responsive layout in JSX utilities.
- **Do** keep main content hidden until the cover handoff, with navy backing, focus transfer and reduced-motion support.
- **Do** keep the RSVP preview explicitly unsaved until the established guest flow is connected.

### Don't:

- **Don't** add generated imagery beyond the explicitly requested invitation collage and closing story flower; retain approved placeholders elsewhere.
- **Don't** present stock placeholders as photographs of Jahzen & Glyzell.
- **Don't** promote attire swatches or inherited shared form exceptions into general interface rules.
- **Don't** introduce script fonts; keep headings in Instrument Serif, narrative in Libre Baskerville and practical UI in Inter.
- **Don't** copy this client's palette or layout into unrelated invitations or shared marketing.
- **Don't** invent backend records, live RSVP persistence or unavailable licensed audio.

### Story-point scroll feedback

Each diamond uses the existing Motion library to enlarge briefly over 550ms when it enters the viewport reading area, then stays filled champagne gold with an ivory edge. A 96px inset avoids the navigation and gives consistent triggers on wide and short screens. Each point runs once; scrolling back does not replay it. The position/diamond rotation and animated scale belong to separate nested elements, preserving alignment with the rail. Reduced motion retains the scroll-triggered gold highlight at a static scale. All text and outlined points remain visible before hydration.

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
