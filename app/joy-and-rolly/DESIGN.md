---
name: Joy and Rolly
description: Floral wedding stationery in plum, lavender, powder blue, and ivory.
colors:
  plum: "#5b1962"
  plum-hover: "#74287b"
  paper: "#fbf9f6"
  ink: "#49394f"
  muted: "#6d5a72"
  rule: "#d6c7dc"
  hero-paper: "#eae3ed"
  hero-ink: "#4c2551"
  satin-paper: "#f8f6f7"
  lavender-paper: "#eeebf5"
  blue-paper: "#eaf1f7"
  footer-paper: "#eee8f2"
  field-border: "#a88bb3"
  field-border-soft: "#c7b6d1"
  white: "#fff"
typography:
  display:
    fontFamily: 'Imperial Script, "Brush Script MT", cursive'
    fontSize: "clamp(3.4rem, 15.5vw, 14rem)"
    fontWeight: 400
    lineHeight: 1.08
  cover-display:
    fontFamily: 'Imperial Script, "Brush Script MT", cursive'
    fontSize: "clamp(3rem, 9vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: 'Imperial Script, "Brush Script MT", cursive'
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: "2.25rem"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.75rem"
  form:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    lineHeight: "1.5rem"
rounded:
  button: "2px"
  form-button: "6px"
  field: "0px"
  swatch: "50%"
spacing:
  field-gap: "8px"
  small-gap: "12px"
  copy-gap: "24px"
  group-gap: "48px"
  section-mobile: "80px"
  section-desktop: "112px"
components:
  button-open:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "12px 28px"
  button-open-hover:
    backgroundColor: "{colors.plum-hover}"
  button-rsvp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.form-button}"
    padding: "8px 24px"
    width: "100%"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "4px 12px"
    width: "100%"
  navigation:
    backgroundColor: "#fbf9f6f7"
    textColor: "{colors.ink}"
  timeline:
    backgroundColor: "{colors.lavender-paper}"
    textColor: "{colors.ink}"
---

# Design System: Joy and Rolly

## Overview

**Creative North Star: "Floral Wedding Stationery"**

The invitation uses personal stationery as its visual model: a lavender envelope with a plum seal and Save the Date insert, followed by a floral hero with a cloudy lavender watercolor ground and plum calligraphy. The main hero places the date and time above large one-line “Joy & Rolly” lettering, with sentence-case invitation prose below. Readable serif details and quiet sans-serif copy carry practical information. The hero's separate monogram and Save the Date block were removed at the user's request.

Lavender and powder-blue fields distinguish the schedule and attire. Decoration frames the content rather than becoming a substitute for it. This system applies only to this client invitation; the repository's marketing identity is a separate system.

**Key Characteristics:**

- Plum calligraphic names and section titles with refined serif event information.
- Ivory paper, pale colored section fields, and hairline rules.
- Original transparent watercolor florals reused at opposing corners.
- A separate opening cover with a guarded transition and focus handoff.
- Flat, spacious content with a minimal RSVP preview.

## Colors

Plum supplies the strong accent against ivory and pale lavender or blue fields. The frontmatter records the exact implemented colors; the questionnaire's bouquet colors are source references, not replacements for the lighter section backgrounds.

### Primary

- **Bouquet Plum:** Couple names, headings, links, cover button, timeline markers, focus outlines, and selected RSVP choices.
- **Plum Hover:** The cover button's hover background.

### Secondary

- **Lavender Paper:** Schedule field and selected RSVP choice fill.
- **Powder Blue Paper:** Attire field.

### Neutral

- **Ivory Paper:** Main canvas and opaque cover.
- **Plum Ink:** Body copy and the RSVP submit button.
- **Muted Mauve:** Supporting copy and addresses.
- **Lavender Rule:** Arch frames and section dividers.
- **Hero Paper / Footer Paper:** Tonal chapter boundaries.
- **Field Border / Field Border Soft:** Shared RSVP theming; the minimal form uses the softer stroke.
- **White:** Filled button text.

The attire colors are content rather than interchangeable interface accents: Lilac (`#b7a0c8`), Dusty blue (`#8daac4`), Beige (`#ded0b8`), and Tan (`#bb9574`). Keep these values in `data/wedding.ts`.

**The Bouquet Rule.** Preserve the distinction between the source bouquet palette, the pale interface fields, and the named attire swatches.

## Typography

**Display Font:** Imperial Script, with Brush Script MT and cursive fallbacks.  
**Heading Font:** Imperial Script for section titles; Instrument Serif for subheadings, with their existing fallbacks.  
**Body Font:** Inter, with a sans-serif fallback.

These families reuse the root font resources. Imperial Script carries the couple's names and main section titles. Instrument Serif gives venue details, entourage names, countdown numerals, and subheadings their invitation character. The reference-led hero uses the existing Libre Baskerville resource for compact uppercase details and its italic ampersand. Inter keeps navigation, body copy, and forms direct and readable.

### Hierarchy

- **Display:** The hero keeps “Joy & Rolly” on one line at ordinary phone widths, using `clamp(3.75rem, 17.5vw, 7rem)` on phones and the existing `clamp(3.4rem, 15.5vw, 14rem)` from 640px, with a 0.44em italic serif ampersand. Its flex items can wrap when text is enlarged so names are never clipped. The cover retains stacked names and a 0.4em connector, with height-aware sizing at `clamp(3rem, min(18vw, 13svh), 6rem)`.
- **Headline:** Balanced, plum section headings.
- **Title:** Section subheadings. Venue names use 1.5rem; entourage names use 1.125rem with a relaxed line height.
- **Body:** Main invitation copy uses 16px on phones and 14px from 640px, with generous line height. Hero date details start at 14px; the sentence-case invitation prose uses 13px on phones and its existing 14–16px sizing from 640px. Introductory passages use approximately 34–38ch where constrained. Long confirmation names and enlarged serif headings can wrap safely.
- **Form:** Standard-sized readable controls. The name-entry screen uses the Imperial Script “Kindly reply” heading; the response screen uses Instrument Serif at 2rem for its RSVP title.

Footer names use `clamp(3.25rem, 8vw, 5rem)` with a 1.25 line height. The satin countdown uses Imperial Script for “Counting down to forever” at `clamp(2.5rem, 7.5vw, 6rem)`, with line-height 1.25. Instrument Serif numerals use tabular figures at `clamp(2.6rem, 8.8vw, 6rem)` and line-height 1. Labels use the same serif at `clamp(0.875rem, 1.7vw, 1.25rem)`. Four columns remain at ordinary phone text sizes. Container queries reflow to two columns below 18rem of available width and one below 9rem, including when text is enlarged; decorative colons are hidden in these stacked layouts.

**The Three Voices Rule.** Use script for the couple's names and section titles, serif for invitation information and subheadings, and sans-serif for instructions and controls.

## Layout

The cover fills the viewport and centers a frame with a maximum width of 570px. It remains scrollable on short displays. The main hero is unframed, spans the viewport width, and centers a maximum 72rem composition with the date above the names. Its minimum height is the small viewport height minus the 61px navigation. The functional countdown sits in its own section immediately below the hero.

Ordinary content uses centered maximum widths of 64rem or 72rem, with 24px mobile gutters and 48px desktop gutters. Most content sections use the section spacing tokens; the colored schedule and attire fields use 96px vertical padding on desktop. Navigation uses a 72rem container with tighter gutters and stays at the top after opening.

Single-column mobile content becomes paired venue columns at 768px. Family and wedding-party groups become two columns at 640px; principal sponsors use two columns at 768px, and secondary sponsors use three. The RSVP stays in one centered column, up to 36rem wide, with one heading, name entry, and the deadline below. Avoid fixed content heights.

Use Tailwind utilities for these simple layouts and scoped CSS for arch geometry, type, color, timeline artwork, and decoration.

## Elevation & Depth

The page is predominantly flat. Fine borders and alternating paper colors create depth without raised cards. Watercolor transparency creates a soft decorative layer. The timeline's marker halo is a separation device, not a raised shadow. The shared RSVP submit button retains its subtle base shadow; fields explicitly remove their inherited shadows.

### Shadow Vocabulary

- **Timeline halo** (`0 0 0 5px #eeebf5`): Keeps markers clear of the vertical line.
- **Shared submit shadow** (`0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Inherited by the shared RSVP button.

## Shapes

The cover retains its fine arch frame with elliptical upper corners and nearly square lower corners: `48% 48% 2px 2px / 25% 25% 2px 2px`. The hero has no enclosing frame; colored bouquets and opposite botanical line-art corners frame the watercolor ground.

Controls have restrained corners: the custom cover button is subtly rounded, minimal RSVP fields and attendance tiles are square, and the shared RSVP submit button retains its 6px radius. Attire swatches are 64px circles with a thin translucent ink border. These circles describe color choices rather than interactive chips.

## Components

### Seat finder

The seat finder uses a lavender field, an ivory bordered stationery panel, the existing script heading, and opposing floral sprays. Its plum “Find My Seat” button is disabled with no link or action, ready for the user's setup. The section currently sits after attire and before RSVP; this invitation has no FAQ section yet. Navigation links to the section only. Keep the panel centered, allow text enlargement to wrap, and preserve readable spacing around the decorations.

### Entourage patterned paper

The Wedding Entourage uses the user's blue floral pattern on its own full-width background layer at 6% opacity. The warm paper base and text keep full opacity, and the existing 64rem content container preserves the names and grouping. A 640px-wide repeating tile stays proportional on phone and desktop layouts. The background is decorative and pointer-transparent; the previous floral corner images remain removed. Conservative contrast against the composited pattern exceeds 8:1 for the section's ink and plum text.

### Venue photographs

The venues section uses the user's ivory embossed-floral texture as a full-width, centered cover background. Its existing 72rem content container retains the previous photo and text alignment. The compressed local WebP is referenced through scoped CSS so the build supplies a content-hashed URL. The existing plum text, pale photo mats, and lavender corner decorations sit above the textured paper.

Each venue photograph now has a fine plum outer border, a lavender inset rule, and a pale lavender paper mat with 8px padding on phones and 12px from 640px. The inner photo retains its 4:3 crop. A small existing watercolor floral spray overlaps the lower-right rim, with extra caption spacing to keep lettering clear. The photo `sizes` account for frame padding and borders; the accent is decorative and pointer-transparent.

The user's supplied lavender corner artwork frames the venues section at upper-left (rotated 180 degrees) and bottom-right (original orientation). The layer spans the full section, placing flowers at its outer edges rather than the content column. The upper flower sits 32px above the section and both extend 16px beyond their side; the lower flower sits 32px above the bottom on phones and 48px on desktop. One transparent static WebP is reused at 110px on phones and 200px from 768px, with lazy loading and matching image sizes. The section isolates and clips its decorative, pointer-transparent background layer, keeping photos and text clear.

Venue articles include the user's supplied ceremony and reception photographs above their existing labels and details. Each frame has a 4:3 aspect ratio and a centered cover crop; the ceremony photo preserves the cross and bell tower, and the reception photo preserves The Club at Northtown sign. Photos are optimized client-local WebP static imports, lazy loaded, with meaningful alt text and responsive widths matching the two-column desktop and stacked mobile layout. Times, addresses, and map links retain their existing content.

### Buttons and links

The entire lavender envelope is one large button with a plum seal and a visible “Tap the seal to open” instruction. The seal uses the original `designs/monogram.png` on an ivory inset face so the supplied purple lettering and pale flower remain visible. The small PNG is a priority static import, served directly without an optimizer variant or changes to the source artwork. Repeat activation is guarded while the cover opens; its waiting state uses `aria-disabled`. Keyboard focus outlines the full envelope.

The full-width RSVP submit button uses Plum Ink, a minimum 44px height, and 90% hover opacity. Disabled pending controls prevent duplicate replies. Ordinary links use underlines on hover; venue map links have a persistent fine lower rule.

Interactive elements receive a plum 2px focus outline with a 5px offset. Preserve visible keyboard focus. Reduced motion replaces the envelope's spatial sequence with a short fade.

### Inputs and attendance

The shared form's minimal appearance provides transparent, square fields with a soft lavender border and 12px horizontal padding. Fields are at least 48px tall, increasing to 56px at 640px. Attendance is a two-column Yes / No choice with plum selection borders and Lavender Paper fill.

The RSVP starts with the shared minimal name-entry screen used by the other invitations, followed by the sample attendance form. The local adapter validates name entry without checking a guest list or sending replies. Keep one concise preview notice per stage and the explicit unsaved sample confirmation until the eventual admin configuration is connected.

The preview has a required name and attendance choice, optional contact number and email, validation feedback, and an explicitly non-persisted confirmation. No production event record or backend connection is implied by this visual system.

### Navigation

A sticky, nearly opaque ivory strip has a fine lower border and a serif J & R link. Below 1024px, a Menu button reveals the four section links in a vertically stacked panel with at least 44px targets. The panel is limited to 60svh and scrolls internally on short screens or under text enlargement. A section choice closes it; Escape closes it and returns focus to Menu. Desktop retains the horizontal links. Closed links are hidden from keyboard and accessibility navigation.

### Timeline

The reference-led timeline is a compact, centered three-column composition with a vertical lavender rail on the section axis. Each thin plum icon has its Instrument Serif time centered directly underneath in the left column. Event titles and descriptions sit in the right column, centered vertically beside the icon/time pair. The wedding date sits below the script section title. Rows have 40px gaps and flexible height for wrapping at phone sizes and enlarged text. Icons come from the existing Lucide library and are decorative. Color swatches remain 64px decorative circles and can wrap, so text enlargement does not widen the attire section.

### Satin countdown

The user-provided countdown reference supplies ivory satin, lavender lilies at the lower-left and upper-right edges, dark plum lettering, a centered script heading, and large numerals separated by colons. The section uses a static optimized opaque background with live HTML typography. Its minimum height is `clamp(360px, 56vw, 760px)` with 80px vertical padding. It retains a clear central reading area, four flexible numeric columns, the real wedding timestamp. Hidden tabs pause updates; returning tabs recalculate against the timestamp. The timer has `aria-live="off"` to avoid announcements every second. Elapsed countdowns show a permanent readable message instead of negative numbers.

### Floral frame and opening cover

The timeline and RSVP sections add a new transparent watercolor floral spray in the existing ivory, powder-blue, lavender, plum, and sage palette. `SectionFlorals` reuses one optimized static WebP at opposing corners, mirrored on alternating sections. Upper/lower artwork widths are 200/220px below 768px and 320/360px on larger screens. Cropped edge placement stays within the sections' vertical padding. Each section establishes an isolated stacking context; the hidden-from-assistive-technology, pointer-transparent artwork layer is clipped at the section boundary and sits behind content. Images load lazily with matching responsive `sizes`; there is no added animation or interaction.

The RSVP section spans the viewport so its flowers sit at the outer screen edges, while the form keeps its centered 36rem maximum width. Its `largeScreen` floral variant grows the upper-right artwork to 480px and lower-left artwork to 520px from 1280px, with additional edge cropping and matching responsive image sizes. Mobile and tablet artwork sizes stay compact; the timeline retains its original floral sizing.

The same transparent watercolor asset appears at opposing corners, with one copy rotated 180 degrees. It is decorative, pointer-transparent, and hidden from assistive technology. Cover flowers remain at 90% opacity, hero flowers at full opacity, and footer flowers at 55%. Preserve its transparency and provenance; do not introduce invented couple photography.

Each artwork use supplies explicit responsive image sizes matching its rendered width. Below 768px, the cover flowers are 190px wide, the hero's colored left and right flowers are 145px and 135px, and footer flowers are 240px. At 768px and above, cover flowers are 360px, colored hero flowers use 24vw and 21vw, and footer flowers are 330px. The 100vw opaque hero backdrop contains only watercolor texture. The hero imports the user's original transparent `designs/flower-1.png` and `designs/flower-2.png` separately at top-left and bottom-right, with 45% opacity; their widths are 200px/180px below 768px and 24vw/23vw above it. The original `designs/monogram.png` replaces the constructed letters and embedded flower, at widths 70px, 80px from 640px, and 100px from 1024px. The small monogram uses its original PNG directly. There is no generic default image size, and source PNGs remain unchanged.

The opaque lavender cover and main invitation are separate visual states. `EnvelopeCover` owns the folded paper geometry, ivory card, and plum seal in scoped `envelope.module.css`; Framer Motion owns each animated transform and opacity. The seal lifts 6px and releases over 0.4s. After 0.25s, the flap eases to -176 degrees over 1.8s, moving behind the card at 1.2s. The card rises 56% over 1.2s after 1.45s, then stays fully revealed for 2.4s. Only after that hold does the foreground fade over 0.55s with a subtle scale to 0.99. Its opaque canvas and corner flowers remain steady until the 5.6s completion callback synchronously removes the cover, restores scrolling, and focuses the couple's names. Reduced motion shows the opened envelope and raised card immediately, retains the 2.4s reading hold, then fades over 0.15s without spatial movement. Live preference changes remain supported. Refresh restarts the envelope; valid direct section links bypass it.

The card follows the supplied Save the Date reference: compact uppercase serif “Joy & Rolly / Are getting married” above large Imperial Script lettering, then the numeric date “12.03.27” below. Warm ivory paper and plum ink retain this invitation's palette. Typography and internal padding scale with the envelope's inline-size container so the printed insert fits short landscape and enlarged-text layouts; full event information remains accessible in the main invitation. Names and date are sourced from `data/wedding.ts`.

After opening from the cover, the main hero's details, names, and invitation message arrive over 0.8s with 80/160/240ms delays, an 8px rise, and a brief 2px-to-zero text blur. Scoped CSS retains fully visible base styles; the final message's animation-end event clears the entry state so later preference changes cannot replay the introduction. Direct section entries and reduced motion show the hero immediately. No extra motion is applied to navigation or form controls.

The hero's four floral images sway gently using scoped CSS individual `rotate` and `translate`, preserving the upper bouquet's existing 180-degree transform. Alternating 9–12 second cycles vary by layer, with 0.8–1.1 degree rotation and 2–5px travel. `HeroFlorals` observes viewport intersection and document visibility; motion remains paused behind the envelope and resumes only while the opened hero is visible. Reduced motion removes the decorative animation entirely. Artwork stays behind the stationary text, clipped within the hero, with no opacity pulsing or layout movement.

`InvitationReveal` configures the existing shared visible-by-default reveal component for this client with a gentler fade and 8px movement. It retains once-only 0.55s easing, a 0.24s maximum delay, immediate reduced-motion visibility, and focus-triggered exposure. The shared component itself is unchanged.

**The Separate States Rule.** Never reveal or activate the main invitation while the opening cover still owns the experience.

## Do's and Don'ts

### Do:

- **Do** preserve the plum, pale paper fields, fine arches, and transparent watercolor material.
- **Do** use the three established font roles and reuse their existing root resources.
- **Do** keep layouts flexible, retain keyboard focus, and respect reduced motion.
- **Do** keep the RSVP explicitly local preview until the user's admin configuration is available.

### Don't:

- **Don't** invent missing photographs, stories, or entourage entries.
- **Don't** replace the opening interaction with a scroll to the next section.
- **Don't** let the cover and main invitation become visible and interactive together.
- **Don't** apply the marketing site's visual system to this client invitation.

