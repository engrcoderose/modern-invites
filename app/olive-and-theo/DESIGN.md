---
name: Olive & Theo
description: A parchment garden invitation with an approachable, staged sample RSVP.
colors:
  olive: "#414a32"
  clay: "#a34730"
  paper: "#f6f3e9"
  white: "#fffdf7"
  ink: "#353c2b"
  muted: "#626651"
  line: "#d5d5c4"
  sage: "#e7e9db"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(4.4rem, 10.5vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.8rem, 4vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 2
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.625
rounded:
  field: "8px"
  choice: "12px"
  paper: "16px"
  pill: "9999px"
spacing:
  field-gap: "20px"
  page-mobile: "24px"
  page-tablet: "48px"
  section-mobile: "64px"
  page-desktop: "80px"
  section-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-outline-hover:
    backgroundColor: "{colors.sage}"
  button-cover:
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
  button-cover-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.olive}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  attendance:
    rounded: "{rounded.choice}"
    padding: "16px"
  attendance-selected:
    backgroundColor: "{colors.sage}"
  reply-paper:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.paper}"
    padding: "24px"
  date-seal:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
---

# Design System: Olive & Theo

## Overview

**Creative North Star: "A Place at the Garden Table"**

A warm, spacious garden invitation pairs expressive serif lettering with plainly readable controls. Parchment and olive establish the atmosphere; clay provides a human, sun-warmed accent. One panoramic tablescape supplies photographic richness while hairline rules organize the practical details.

This system belongs only to the fictional Olive & Theo portfolio sample. It records the implemented world rather than prescribing a theme for other invitations. The staged reply feels like a small sheet of correspondence, with a simple one-step reply.

**Key Characteristics:**

- Generous parchment space and olive interludes.
- Expressive serif headings with restrained italic clay accents.
- A rounded photographic canopy and circular date seal.
- Plain tactile form controls and a visible review step.

## Colors

The palette is earthy and quiet, using contrast and large tonal fields rather than saturated decoration. Frontmatter values mirror the scoped invitation variables.

### Primary

- **Garden Olive:** Opening cover, interlude, primary actions, selected attendance borders, and selection highlighting.
- **Warm Clay:** Italic heading accents, circular date seal, itinerary times, focus outlines, caret, and validation feedback.

### Neutral

- **Parchment:** Main page and inverse text on olive.
- **Warm White:** Reply sheet, form fields, and primary action text.
- **Leaf Ink:** Default text and primary action hover.
- **Muted Leaf:** Supporting text, descriptions, and placeholders.
- **Linen Rule:** Thin structural borders and dividers.
- **Pale Sage:** RSVP section, selected attendance surfaces, navigation hover, and demo badge.

### Named Rules

**The Garden Contrast Rule.** Use olive for large dark surfaces and primary actions; use clay for emphasis and focus. Preserve the warm neutral reading surfaces around both.

## Typography

**Display Font:** Instrument Serif, with Georgia and serif fallbacks.
**Body Font:** Inter, with a sans-serif fallback.

**Character:** The existing global font resources supply editorial, gently irregular display lettering and a clear contemporary reading face. Italics distinguish selected words rather than changing the whole paragraph's voice.

### Hierarchy

- **Display:** The fluid names role in frontmatter is reserved for the couple's centerpiece, with balanced wrapping.
- **Headline:** The fluid section role introduces event details and RSVP.
- **Title:** The smaller serif role identifies venue details.
- **Body:** Relaxed small body text carries practical descriptions; inputs use larger text (1rem) with a comfortable line height (1.5).
- **Label:** Compact medium-weight sentence case identifies fields. Small navigation and metadata use regular Inter.
- The opening title uses its own fluid serif scale (`clamp(3.6rem, 8vw, 6rem)`); the olive countdown uses `clamp(2.5rem, 6vw, 4.5rem)`.

### Named Rules

**The Two Voices Rule.** Keep expressive serif lettering in names, headings, and short sentiments; keep instructions, labels, and form values in Inter.

## Layout

Build mobile-first with Tailwind utilities for ordinary sizing, spacing, grids, and alignment. Keep custom typography, color treatments, decorative geometry, and animation in the scoped stylesheet.

The outer hero and header stop at a broad maximum (1440px). Detail sections and footer use a narrower maximum (1280px), and the RSVP grid uses an inner maximum (1184px). Page gutters progress from the mobile to tablet to desktop spacing tokens. Sections use the corresponding mobile and desktop vertical spacing tokens.

Date and venue details stack before switching to equal columns at the medium breakpoint (768px). The RSVP switches at the large breakpoint (1024px). Name and telephone fields remain stacked. Attendance options become two columns at the small breakpoint (640px). Form rows use the field-gap token.

The hero photo has a responsive fixed-height frame (320px, then 410px at small, then 470px at large) with cover cropping centered slightly below the middle (50% 56%). Accurate image sizes follow the actual gutters. The RSVP card increases padding to 36px at small screens and above. Long review values wrap rather than widening their grid.

## Elevation & Depth

Depth comes mainly from contrasting paper, sage, and olive planes. Only the warm white reply sheet carries a soft ambient shadow (`0 16px 48px #353c2b0a`). The date seal overlaps the photograph but uses an inset paper outline rather than a shadow. Hairline rules make hierarchy visible without enclosing every section.

### Named Rules

**The Correspondence Rule.** Reserve the observed soft shadow for the reply sheet; keep the information sections organized by space and rules.

## Shapes

Pill-shaped actions and small circular marks soften otherwise open editorial layouts. The form uses gently rounded fields, more rounded attendance choices, and a slightly larger reply-sheet radius, as recorded in frontmatter.

The date seal is a true circle, rotated slightly (6deg), with an inset outline (1px, offset -7px). Its diameter grows from 96px to 128px at the small breakpoint. The photograph's upper silhouette uses elliptical corners (`42% 18%`), while the lower edge remains straight. These two signature forms coexist; do not replace ordinary content containers with the photographic silhouette.

## Components

### Buttons

Plain tactile controls use sentence case and small Inter text.

- Primary actions use the olive and warm-white pairing, become ink on hover, and span the reply sheet with text and an SVG icon at opposite ends.
- The outlined navigation action uses a thin linen border and sage hover.
- The opening action uses an inverse outlined treatment; its border is a lighter olive-neutral (`#bec3ad`), becoming paper with olive text on hover.
- Shared keyboard focus is a clay outline (2px) offset from the control (5px). Button color transitions last 200ms. Tap targets are at least 44px in the navigation and secondary actions.

### Cards / Containers

The reply sheet is the principal card: warm white, softly elevated, and padded responsively. Other information remains on open surfaces, separated by hairlines.

### Inputs / Fields

Warm-white fields use a linen border, rounded field corners, clear labels, and muted placeholders. Their caret is clay. Attendance options are large label-backed radio controls: hover changes the surface to parchment, selection changes it to sage with an olive border, and keyboard focus outlines the whole choice (2px, offset 4px). Error text uses clay and an alert role.

### Navigation

A small serif monogram sits opposite concise Inter navigation. The RSVP action remains present at every size; the celebration link appears at small screens and above, and the countdown link appears at medium screens and above. Anchors retain clear focus treatment, and a skip link becomes visible on keyboard focus.

### Opening Cover

The opening is a separate opaque olive layer, not a scroll-to-content section. Activation first restores the top of the invitation. Its foreground then lifts and fades over the backing (500ms); only then does the backing fade to reveal the destination (400ms). The destination remains inert until handoff completes, and keyboard focus moves to its first brand link. Repeated activation is guarded. Reduced motion enters immediately, including preference changes during handoff. The destination names receive a brief clipped upward reveal (650ms).

### RSVP Form

The in-memory reply contains full name, optional telephone contact, and accept/decline radios. One submit action proceeds directly to confirmation, with editing and reset afterward. State changes focus the heading. The form allows one person per reply. Capacity, deadline, and a seats-reserved progress indicator appear alongside it. The counter reflects the current in-memory response; no server persistence is introduced.

### Countdown

Four equal columns show days, hours, minutes, and seconds on olive. Values initialize after hydration, update each second, and stop at zero. The timer is not a live announcement region.

## Do's and Don'ts

### Do:

- **Do** retain the scoped garden palette, existing font resources, and clear serif/sans role split.
- **Do** keep primary actions visible and use the established clay focus treatment.
- **Do** retain opaque backing throughout the cover's foreground exit, then reveal the destination underneath it.
- **Do** preserve reduced motion, focus transfer, semantic form controls.
- **Do** use space and hairline rules to organize practical information.

### Don't:

- **Don't** apply this invitation's palette or silhouettes to unrelated clients.
- **Don't** use expressive serif lettering for field values or long instructions.
- **Don't** make all information blocks into elevated cards.
- **Don't** imply that the in-memory demonstration persists a reply.

