---
name: Jahzen & Glyzell
description: A photographic wedding editorial in navy, espresso, champagne and ivory.
colors:
  navy: "#142e43"
  navy-deep: "#102537"
  timeline-navy: "#081f2d"
  timeline-champagne: "#e4c48a"
  timeline-icon: "#dcc38b"
  timeline-time: "#f1e5d2"
  timeline-muted: "#d3dce1"
  timeline-intro: "#e7e6df"
  espresso: "#39271f"
  champagne: "#d0af72"
  champagne-hover: "#e1c794"
  antique-gold: "#816237"
  ivory: "#f8f3e9"
  paper: "#efe7d9"
  muted: "#66574b"
  rule: "#cfc0a8"
  field-border: "#c3b397"
  selected: "#e6dac6"
  placeholder-paper: "#eee5d7"
  placeholder-text: "#6f5c43"
  placeholder-navy: "#112b3a"
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
    fontFamily: "var(--font-imperial), cursive"
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
  photo-placeholder:
    backgroundColor: "{colors.placeholder-paper}"
    textColor: "{colors.placeholder-text}"
    rounded: "{rounded.square}"
  photo-placeholder-dark:
    backgroundColor: "{colors.placeholder-navy}"
    textColor: "{colors.champagne}"
    rounded: "{rounded.square}"
  venue-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.square}"
    padding: "48px"
---

# Design System: Jahzen & Glyzell

## Overview

**Creative North Star: "The Midnight Wedding Editorial"**

A cinematic, photographic invitation carries Jahzen & Glyzell's navy, espresso, champagne and ivory identity. Large editorial serif names and headings, script accents and generous reading space alternate between shaded photographs, midnight passages and warm paper surfaces.

The user-selected format is `app/isabella-and-daniel`; it supersedes the former typography-and-oval folio composition. This is a client-scoped translation of that photographic format, with confirmed questionnaire content and policies preserved. The couple’s photographs are pending. The latest instruction is to use placeholders only and not generate images. Existing repository stock photographs remain explicitly labeled placeholders in the previously approved surfaces; the revised love story and timeline use empty, code-native photo frames. Generated client assets and their sidecars have been removed. The story and timeline follow the user’s newer supplied section references within the established page format.

**Key Characteristics:**

- Full-bleed photography, sticky cinematic passages and asymmetric photo/text compositions.
- Instrument Serif display, Imperial Script accents, Libre Baskerville narrative and Inter controls.
- Flat ivory story and detail passages alternating with navy gallery, timeline and RSVP passages.
- An opaque cover handoff, once-only reveals and reduced-motion alternatives.

## Colors

Warm champagne connects midnight blue photography treatments with espresso text and warm reading surfaces.

### Primary

- **Midnight navy:** root backing, opening cover, hero and RSVP.
- **Deep navy:** gallery, footer, scrolled navigation and photograph shading.
- **Timeline navy:** the dedicated schedule surface, extending the existing dark palette only for this section.
- **Timeline champagne / icon:** warm schedule dots and calendar link, with quieter gold line icons.
- **Champagne:** opening action, script emphasis and accents against dark surfaces.
- **Champagne hover:** lighter fill and border on the opening action.
- **Antique gold:** emphasis, signatures and links on light surfaces.

### Secondary

- **Espresso:** primary reading text on ivory and paper.

### Neutral

- **Ivory:** invitation, story, celebration, entourage and guest-guide surfaces; main text against dark backgrounds.
- **Paper:** countdown, attire, venue panels and the RSVP form.
- **Muted:** supporting light-surface text.
- **Rule / field border:** list separators, panel divisions and form outlines.
- **Selected:** checked attendance background.
- **Placeholder paper / text / navy:** empty photo frames on the light story surface and dark timeline surface; the dark variant reuses champagne text.
- **Timeline time / muted / intro:** distinct readable time, event-description and introductory text tones on the schedule surface.

The attire swatches remain event content in `data/wedding.ts`, rather than replacement interface tokens.

**The Surface Pairing Rule.** Use champagne emphasis on dark surfaces and antique gold emphasis on light surfaces, following the implemented headings, signatures and links.

## Typography

**Display Font:** Instrument Serif, with Georgia and serif fallbacks.
**Body Font:** Libre Baskerville for narrative; Inter for general copy and UI, with Georgia/serif and Arial/sans-serif fallbacks respectively.
**Accent Font:** Imperial Script, with cursive fallback.

Instrument Serif now supplies both names and prominent headings. Imperial Script punctuates conjunctions, signatures, the footer names and monograms; Libre Baskerville gives the story and policy passages a quieter reading voice. Inter keeps forms and practical information legible.

The frontmatter records the fluid hero display. Below the small breakpoint its size changes to (clamp(4.5rem, 18vw, 6rem)). The cover uses a separate serif display (clamp(4rem, 11vw, 7rem), line-height .9), with a smaller script conjunction. The cover introduction is ordinary sentence-case Instrument Serif copy (21px, line-height 1.5), reducing to (18px) on short viewports; it has no uppercase or tracked-eyebrow treatment. On short viewports the cover display also reduces. Section headings use the headline role; subgroup headings use title; longer narrative uses prose. Labels describe dates, roles and practical metadata; they are not a prescription to add decorative kickers above headings. The timeline’s “The order of events” and the story’s “Our love story” labels follow their user-supplied references and remain confined to those components.

**The Editorial Voice Rule.** Keep large names, headings and the sentence-case cover introduction in Instrument Serif, narrative in Libre Baskerville, practical UI in Inter and brief expressive accents in Imperial Script. Do not set long instructions in script.

The shared RSVP confirmation retains its existing Libre Baskerville heading. Its inherited typography is not a separate client display rule.

## Layout

The current page follows the reference sequence: photo cover and sticky hero, invitation message, countdown, four numbered story chapters with empty photo frames, cinematic break, event details, a dedicated vertical timeline, entourage, asymmetric gallery, photo/text attire, guest guide/FAQs, RSVP and footer. This sequence is the selected surface format, not a rule for unrelated invitations.

Main passages use horizontal padding (24px), increasing to (40px) at the small breakpoint, and containers up to (80rem). Common section padding grows from section-mobile to section-desktop at the large breakpoint; countdown, RSVP and footer use their own tighter spacing. Photo/text passages commonly pair a narrower photo column with a wider text column (.9fr / 1.1fr), stacking on mobile and splitting at (1024px). The entourage changes from one to two to three columns. The timeline replaces the former horizontal program: a single vertical schedule remains intact at every breakpoint, with heading and list stacked on mobile and placed in (.9fr / 1.1fr) columns at (1024px). Its container is limited to (72rem), with generous bottom space for the empty reception-photo placeholder.

The gallery uses single-column photo frames on mobile and a twelve-column, variable-row grid at (768px). Attire puts the photo first on mobile and text first on desktop. Guest notes form three ruled columns at desktop. Countdown changes from two to four cells at (640px). Navigation uses a disclosure below (1024px), with a persistent RSVP link.

The hero spans (160svh) around a sticky (100svh) frame. The cinematic break spans (150svh) around its own sticky viewport. Section anchor clearance is (96px). Keep ordinary responsive layout in Tailwind utilities; scoped CSS owns font treatments, photograph shades, decorative marks and complex shapes.

## Elevation & Depth

Depth comes primarily from photographs, tonal surface changes, sticky framing and gradient shading. Venue panels, lists and guest-note grids remain flat and separated by fine rules. The hero display has a localized text shadow for photographic legibility. A diffuse shadow lifts the signature seal and attire caption; this is selective emphasis, not a general card elevation system. The inherited shared form submit shadow is not a new invitation-wide token.

## Shapes

Photos, venue panels, forms and controls use square corners. Circular attire swatches and the signature seal are small accents. The footer retains the fine double-oval script monogram; it does not define the page's layout. The cinematic photograph briefly uses rounded clipping during scroll (12px), opening to square full-bleed framing. Decorative layers ignore pointer input.

## Components

### Buttons and links

The opening action is a square champagne button with deep-navy text, a fine matching border and lighter hover fill. It uses minimum tap height (48px), disables while opening and has a gold focus outline (2px) with offset (5px). Map actions are understated antique-gold text links on light backgrounds. The preserved calendar download now belongs to the timeline and uses its warm champagne accent; it appears below the heading on desktop and below the schedule on mobile. Navigation RSVP is a compact ivory-text outline action with minimum height (40px), translucent deep-navy backing and a solid hover state.

### Navigation

A fixed navigation bar overlays the hero photograph, becoming solid deep navy after scrolling or opening the mobile menu. It combines a serif/script monogram, uppercase text links and persistent RSVP action. Links turn champagne and underline on hover. The mobile disclosure reports expanded state, closes after a selection and is hidden when collapsed.

### Photo frames

Every existing stock-photo frame visibly says “Placeholder photo · to be replaced.” All seven unique local WebPs are capped at (1800px) wide; static imports provide content-hashed URLs. `assets/photos/provenance.json` and per-file `.webp.json` sidecars record their origins. The same source is reused across sections and gallery assignments where appropriate. Hero and cinematic zoom transform only the inner photograph; the sample caption stays stationary and visible within its frame.

Next/Image uses its default quality (75), the default responsive optimizer and crop-aware sizes from `data/photos.ts`. Size the source for the larger of the displayed width or the width required to cover the frame height at its intrinsic ratio, including maximum motion zoom. The landscape full-screen cover, hero and cinematic frames therefore account for viewport height; the invitation portrait crop and individual gallery spans use their own size expressions. Portrait gallery sources remain width-driven. Recalculate these expressions when replacing a source or changing its frame ratio. Only the cover is prioritized. Opening decodes the same responsive hero selection and sizes used by the rendered hero, with a bounded fallback (1800ms). Individual approaching frames activate through an IntersectionObserver margin (200px), so the initially hidden main invitation does not leave lazy frames unrequested; later frames remain lazy until approaching. This does not preload an entire gallery.

### Details, lists and FAQs

Square paper venue panels share fine dividers. Entourage groups and guest notes organize repeated content through grids and rules rather than individual floating cards. FAQs use native details/summary disclosures with serif questions and narrative answers. The countdown uses a ruled two-to-four-cell grid and serif tabular numerals.

### Vertical timeline

A dedicated navy schedule follows the venue details and precedes the entourage. “The timeline of our day.” uses Instrument Serif (clamp(3.5rem, 6.5vw, 5.5rem), line-height .97, tracking -.025em); its introduction uses Libre Baskerville (15px, line-height 1.65). The reference-pinned “The order of events” label uses a short leading rule, warm text (#e8d4ad) and tracked uppercase styling only in this component. It does not establish an invitation-wide eyebrow pattern.

The ordered list aligns times, dots, line icons and event copy in four columns. A continuous fine champagne rule (#d0af7299) connects the circular dots (8px). Line icons (38px, stroke width 1.1) depict guests, rings, drinks, dining and music; they are SVG artwork, not text glyphs. Event titles reuse Instrument Serif (clamp(1.8rem, 3.2vw, 2.5rem), line-height 1.1), with tabular Inter times (10px) and muted descriptions (12px, line-height 1.6). The list still renders the established `wedding.timeline` data; confirmed times, descriptions and calendar behavior are preserved. No font or dependency was added.

The lower schedule area contains a dark, empty “Reception photo” frame with a visible “Photo to follow” note. It uses the shared code-native placeholder component, not an image asset. The frame spans the inset mobile/tablet width and is right-aligned at desktop (560px), reserving space below the schedule and calendar. A faint partial oval arc remains decorative. There are no generated reception images, artwork imports, prompt sidecars, image masks or artwork image-sizing rules.

### Love story and empty photo frames

The story follows the newer user-selected reference on warm ivory. A centered two-line Instrument Serif title, “A Love That / Found Its Way.” (clamp(2.8rem, 7vw, 5rem), line-height .94, tracking -.03em), sits beneath its section-specific label and ornament. A quiet italic Libre Baskerville introduction precedes four chronological chapters. Faint serif/script initials and an oval arc stay behind the content.

`data/love-story.ts` derives four chapters from `wedding.story` without shortening or rewriting the original narrative. The first three rows pair text with empty frames in (.94fr / 1.06fr) columns, alternating placement for the second chapter; the closing chapter spans the full width. Below (360px), paired rows stack into a single column and the empty photo frame is bounded to (192px) high. From (360px), the alternating two-column spreads remain, with tighter gaps (16px), growing to (32px) and then (48px). The container is limited to (72rem), with mobile horizontal padding (20px), growing to (40px). Fine horizontal dividers separate the rows.

Each chapter carries a numbered uppercase heading, a fine gold left rule (#a68b5e) and a small diamond (#94743d). Libre Baskerville narrative uses (12px, line-height 1.65) on mobile, increasing to (14px, line-height 1.8) from (640px). The heading and number identify actual story chapters; these treatments do not establish a general eyebrow pattern.

The reusable placeholder is a square, flat figure with a fine border, a small SVG image outline, a descriptive label and a “Photo to follow” note. Light frames use warm paper and dark brown ink; the timeline variant uses navy with champagne accents. Labels and the “Photo to follow” note retain full text opacity for contrast. The story frames are labeled “A simple beginning,” “Meeting in person” and “The proposal.” Keep them empty until the couple supplies approved photographs. Do not generate replacement imagery for these code-native frames.

### RSVP fields

The shared minimal RSVP form is themed locally with a paper panel, transparent square fields, muted borders and antique-gold focus accents. Inputs use readable text (16px), minimum height (48px), increasing to (56px) at the small breakpoint. Two bordered attendance choices gain a warm selected fill. Errors retain the shared alert treatment; submission is guarded and disabled while pending.

The preview validates name, attendance and optional contact/message fields, revealing dietary needs for attendance. Confirmation explicitly says replies are not sent or saved. There is no guest-count control, invited-name verification or live submission. Event/guest records and eventual named-guest integration remain pending; no backend configuration is implied by this draft.

### Opening and reveals

The main invitation stays hidden until the photographic cover's exit completes, with navy root backing throughout. Repeated clicks cannot overlap opens. The foreground moves upward (14px) and dims over (.9s); the cover fades over (.25s) after a delay (.65s). Main content then enters through an opacity reveal (.85s). There are no decorative cover folds in this revised implementation.

Reduced motion bypasses the exit and content entrance animations and removes hero/cinematic transforms. The motion-preference hook uses a matching server/first-client snapshot, then synchronizes the actual preference after hydration and on changes. Neutral fallbacks explicitly restore image scale (1), cinematic clipping (none) and hero text position (0), keeping state transitions consistent without changing the default appearance. Focus transfers to the requested hash target or main title. Refresh restores the cover; without JavaScript the cover is removed and static main content is readable, with an RSVP preview notice.

Scroll reveals run once over (1000ms), rising from (20px) and partial opacity. Content is readable before animation and remains visible if observation is unavailable; reduced motion skips reveals. Hero zoom and text movement, and cinematic clipping/scale, follow scroll progress rather than autoplay.

## Do's and Don'ts

### Do:

- **Do** preserve the confirmed palette, attire guidance and guest policies while following the user-selected photographic format.
- **Do** keep existing stock-photo placeholder captions and provenance, and leave the story/reception frames empty until approved couple photography arrives.
- **Do** preserve the full questionnaire story wording across the four derived chapters.
- **Do** keep decoration scoped and simple responsive layout in JSX utilities.
- **Do** keep main content hidden until the cover handoff, with navy backing, focus transfer and reduced-motion support.
- **Do** keep the RSVP preview explicitly unsaved until the established guest flow is connected.

### Don't:

- **Don't** generate or use generated images for this invitation; use placeholders only.
- **Don't** present stock placeholders as photographs of Jahzen & Glyzell.
- **Don't** promote attire swatches or inherited shared form exceptions into general interface rules.
- **Don't** use script for long instructions, body text or fields.
- **Don't** copy this client's palette or layout into unrelated invitations or shared marketing.
- **Don't** invent backend records, live RSVP persistence or unavailable licensed audio.
