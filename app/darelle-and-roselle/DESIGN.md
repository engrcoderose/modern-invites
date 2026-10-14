---
name: Roselle and Darell invitation
description: Olive-and-ivory woodland stationery inherited from Vincent and Gabrielle.
colors:
  paper: "#f2ede0"
  olive: "#5a6946"
  ink: "#414636"
  muted: "#646650"
  line: "#bfb59a"
  gold: "#ac9b76"
  light-gold: "#d2c5a0"
  olive-text: "#f2efdb"
  olive-deep: "#36432e"
  olive-dark: "#293727"
  woodland: "#263420"
  button-text: "#fbf7e8"
  button-hover: "#4b502a"
typography:
  section-title:
    fontFamily: "Anastasia Script, cursive"
    fontSize: "clamp(40px, 6vw, 64px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0"
  entourage-title:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "clamp(22px, 3vw, 30px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: ".02em"
  formal-names:
    fontFamily: "Anastasia Script, cursive"
    fontSize: "clamp(34px, 5vw, 46px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "13px"
    lineHeight: 1.9
  role:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: ".06em"
  names:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "14px"
    lineHeight: 1.65
  action:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "11px"
    letterSpacing: ".1em"
rounded:
  reply-card: "6px"
spacing:
  small: "16px"
  medium: "24px"
  large: "40px"
  title-gap: "20px"
  section-mobile: "80px"
  section-desktop: "96px"
components:
  section-heading:
    typography: "{typography.section-title}"
  entourage-heading:
    typography: "{typography.entourage-title}"
  button-primary:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.button-text}"
    typography: "{typography.action}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  reply-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.reply-card}"
    padding: "40px 24px"
---

# Design System: Roselle and Darell

## Overview

**Creative North Star: "Woodland stationery"**

This client inherits Vincent and Gabrielle's confirmed invitation world: warm ivory paper, olive ink, Anastasia handwriting, woodland photography, and fine ornaments. The system belongs to this invitation folder; the repository's marketing design is separate.

The page reads vertically, retaining the proportions and ceremonial quiet of the reference stationery. Decorative photographs support the paper and lettering. The user-supplied sage framed DR PNG appears on the formal invitation and receives a paper tint on the cover. Navigation uses only the central black initials cropped from the user's black framed PNG.

**Key Characteristics:**
- Ivory, olive, and muted gold.
- Anastasia names, sentimental copy, and section titles; only The Entourage title uses Noto Serif.
- Thin double frames, symmetrical flourishes, and monogram artwork.
- Centered reading surfaces with responsive paired lists.

## Colors

Warm paper and muted botanical colors carry the reference identity.

### Primary
- **Olive:** Script names and the email action. The formal monogram preserves its supplied sage pixels rather than receiving this CSS tint.
- **Deep Olive / Dark Olive:** Graduated backgrounds for the entourage and dress code.

### Secondary
- **Gold:** Fine ornaments, plaque borders, and link hover.
- **Light Gold:** Ornaments and cover-link hover on dark surfaces.

### Neutral
- **Paper:** Main stationery, navigation, and reply card.
- **Ink / Muted:** Primary lettering and supporting prose on paper.
- **Line:** Navigation, timetable, and FAQ separators.
- **Olive Text:** Pale lettering over the entourage and dress code, including body copy on these surfaces.
- **Woodland:** Background fallback beneath landscape images.
- **Button Text / Button Hover:** The existing primary action's foreground and hover treatment.

**The Paper and Woodland Rule.** Keep the reference's alternation of paper, olive, and woodland surfaces; maintain readable lettering over photographs with the existing dark overlays.

## Typography

**Display Font:** Anastasia Script, with cursive fallback.  
**Body Font and The Entourage Title:** Noto Serif, with Georgia and serif fallbacks.

Script gives section titles, couple and venue names, sentimental copy, and timeline event labels their invitation character. Noto Serif carries venue details, role labels, guest names, and practical instructions. Only the main “The Entourage” heading uses the serif title exception. Both families load from client-local files.

### Hierarchy
- **Section title:** The fluid Anastasia section-title token serves the main headings except The Entourage and also the Our Wedding Party h3. Balanced wrapping keeps longer titles readable.
- **Entourage title:** The smaller Noto Serif entourage-title token serves only the main “The Entourage” heading.
- **RSVP title:** Anastasia script at (36px), weight (400), line height (1.15), kept on one line within the plaque.
- **Formal names:** The smaller fluid script token serves full names and venue names; the cover uses a related (32–46px) fluid size.
- **Body:** Supporting prose uses the body token.
- **Role:** Uppercase serif role labels use the role token; small screens reduce them to (11px).
- **Names:** Italic serif lists use the names token; small screens reduce them to (12px).
- **Action:** Uppercase serif email action; navigation and underlined text links use (10px) lettering with spaced capitals.

**The Two Voices Rule.** Keep Anastasia for section titles, names, sentimental supporting copy, and timeline event labels; use Noto Serif for information. The only main-heading serif exception is “The Entourage”; do not extend it to other headings, Our Wedding Party, or RSVP.

**The Title Then Ornament Rule.** Place each section title above its top ornamental divider. The shared heading pairs a title with the flourish below it using the title-gap spacing token.

## Layout

Sections share centered content up to (950px), with horizontal padding (24px) and vertical padding from the section-mobile spacing token. At the (640px) Tailwind breakpoint, horizontal padding becomes (40px) and vertical padding uses section-desktop. Entourage content narrows to (660px), the schedule to (540px), and reply content to (560px).

The cover fills at least one small viewport height. The formal invitation accounts for the sticky navigation's (70px) height. Navigation has a (1400px) maximum width; desktop links appear at (1024px), with an accessible menu below it. Venue columns appear at (768px); paired names and sponsor lists retain their intentional symmetrical relationships.

The timeline, dress code, and FAQ remain separate full-width sections. An olive dress-code surface with inset double frame separates the ivory timeline from the ivory FAQ, making the three content boundaries visible.

Simple layout stays in JSX Tailwind utilities. Scoped CSS owns fonts, artwork crops, photographic overlays, frames, and surface treatments.

## Elevation & Depth

Paper uses subtle radial light and gold tint. Olive uses a dark gradient; woodland images use dark radial and linear overlays. Thin borders and offset outlines provide most separation. Only the RSVP plaque and reply card use soft shadows; preserve these as local exceptions rather than adding elevation to every section.

Motion preserves the reference's monogram handoff and woodland dissolve. After images and fonts are ready, the cover background and content fade in over (700ms). Opening moves the framed DR monogram toward the stationary formal monogram over (1.4s), using `cubic-bezier(.42, 0, .22, 1)`, while the woodland cover dissolves over (1.6s) with ease-in-out. The paper-tinted and original sage versions of the supplied framed mark crossfade over (1.1s) after a (500ms) delay; the prompt fades over (400ms).

Formal invitation text fades over (500ms), with an (80ms) stagger capped at (480ms); navigation fades over (650ms). Later content groups reveal once on entering the viewport, fading and rising (10px) over (850ms) with `cubic-bezier(.22, 1, .36, 1)`. Their delay is (400ms) plus a (70ms) stagger capped at (420ms). Grouped lists and disclosures avoid nested duplicate motion. Color and FAQ icon transitions retain (200ms) timing.

The animated opening enhances the static cover, which remains usable without JavaScript. While the opening is active, invitation content is inert and scrolling is locked; completion restores scrolling and focuses the formal invitation. Direct section links and existing scroll positions bypass the opening. Keyboard focus reveals its content immediately. Reduced motion removes spatial movement, section reveals, and stagger, uses a brief (200ms) cover dissolve and prompt fade with (150ms) content/artwork fades, and disables relevant state transitions. Keep the invitation vertically scrollable without page folds or slides.

## Shapes

Stationery frames are thin, rectangular, and inset. Woodland venue frames use a second offset outline. The supplied framed monogram retains its ornamental oval silhouette and transparent interior; navigation crops to the initials alone. The “RSVP” plaque uses an asymmetric elliptical contour; the reply card alone has the reply-card corner token. Preserve the pixels and proportions of the user's complete PNG artwork.

## Components

### Buttons and links
The email action is an olive rectangle with pale uppercase serif lettering, a (48px) minimum height, and the primary button padding token. It darkens on hover. Cover and map links use underlined spaced capitals. Interactive controls expose a current-color (2px) focus outline offset by (5px); icons are SVG.

### Navigation
The sticky paper bar uses the original black DR initials without their oval at (48px) width, a fine bottom rule, and small uppercase anchor links. RSVP has an outline treatment. The mobile disclosure uses a labeled button, reports its open state, closes after choosing a link, and returns focus to its toggle on Escape.

### Reply card and plaque
An ivory card centers deadline, email action, and supporting copy. Its padding grows horizontally to (40px) on larger screens. The separate plaque above it carries the Anastasia “RSVP” title, gold border, pale outline, and a centered flourish below the title. Its flourish uses (8px) top spacing and a (20px) height.

### Section headings
The formal invitation is identified by the couple-name h1 beneath its monogram, with no separate title above it. The Wedding Venues, The Wedding Day, The Dress Code, Frequently Asked Questions, and Save the Date use the Anastasia section-title token. Only the main The Entourage heading uses the Noto Serif entourage-title token. The shared heading defaults to calligraphy and explicitly opts into serif for that one heading; it puts the title first, then a (130px)-wide, (28px)-high flourish below it. RSVP retains its compact (36px) Anastasia title. “With Love and Gratitude” and the closing celebration line remain supporting script copy; “Our Wedding Party” is a calligraphy h3 followed by its ornament within The Entourage.

### Information rows
Timeline rows and native FAQ disclosures separate entries with fine rules. FAQ answers retain the serif body treatment; their SVG chevron rotates when open, respecting reduced motion.

### Ornament and monograms
The recurring flourish is a thin, symmetrical SVG in gold or light gold. The shared monogram component uses the exact user-supplied `assets/artwork/new-green-monogram.png` for framed placements and `assets/artwork/new-black-monogram.png` for navigation. Both original files contain an oval. A local SVG SourceAlpha filter supplies paper tint on the cover only; the formal invitation preserves the supplied sage and navigation preserves black.

CSS crops the (2000px)-square framed canvas to x (360–1640), y (176–1828), retaining the (320/413) frame aspect ratio. Navigation isolates x (735–1285), y (690–1247), with a (550/557) initials aspect ratio. This displays supplied pixels without redrawing or separately assembling the artwork. Formal artwork height is `clamp(140px, 28svh, 240px)`; opening artwork height is `clamp(180px, 49svh, 390px)`. Image sizing accounts for the oversized cropped source: (290px) for the formal image, (475px) for opening, and (175px) for the (48px)-wide navigation initials. Earlier composed assets and generated concepts remain deliverables but do not supply runtime identity artwork.

## Do's and Don'ts

### Do:
- **Do** preserve the confirmed olive-and-ivory reference palette, local fonts, fine frames, and exact supplied DR PNG artwork.
- **Do** place titles above their ornaments, using Noto Serif only for The Entourage main title and Anastasia for the other headings, RSVP, names, sentimental copy, and timeline labels.
- **Do** maintain readable dark overlays, keyboard focus, and reduced-motion behavior.
- **Do** use client-local assets and scoped decorative CSS with Tailwind layout utilities.

### Don't:
- **Don't** replace this inherited invitation world with the repository's marketing theme.
- **Don't** add couple-photo slides or horizontal page turns to this scrolling invitation.
- **Don't** redraw, distort, or rebuild the supplied monogram from separate assets, or substitute earlier generated concepts for the approved PNGs.
- **Don't** spread the reply card's shadow or rounded corners across the stationery sections.


