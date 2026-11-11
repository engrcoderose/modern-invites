---
name: Ashley at 18
description: Satin and lace stationery in pink, purple and white.
colors:
  navigation-line: "#eee6f0"
  navigation-dot: "#a85fba"
  rose-script: "#9b3561"
  rose-ink: "#784156"
  satin-base: "#b66c8a"
  blush-countdown: "#f8d8e4"
  lavender-venue: "#e9ddf1"
  plum-accent: "#80508f"
  plum-hover: "#643b73"
  plum-heading: "#553361"
  plum-ink: "#553c60"
  field-border: "#d9a5be"
  selected-pink: "#fce0eb"
  white: "#ffffff"
  selection-lilac: "#e5c9e9"
  selection-ink: "#452456"
typography:
  display:
    fontFamily: "Imperial Script, cursive"
    fontSize: "clamp(3.5rem, 12vw, 4.5rem)"
    lineHeight: 1.1
  headline:
    fontFamily: "Imperial Script, cursive"
    fontWeight: 400
    lineHeight: 1.2
  supporting:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "2rem"
    lineHeight: 1.2
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    lineHeight: "1.75rem"
  form-title:
    fontFamily: "Libre Baskerville, serif"
    fontSize: "1.5rem"
  medallionCaption:
    fontFamily: "Inter, sans-serif"
    fontSize: "10px"
    lineHeight: "1.25rem"
    letterSpacing: "0.18em"
rounded:
  square: "0px"
  pill: "9999px"
spacing:
  gutter: "1.5rem"
  section-mobile: "5rem"
  section-wide: "6rem"
components:
  button-hero:
    textColor: "{colors.rose-script}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.75rem"
  button-hero-hover:
    backgroundColor: "{colors.selected-pink}"
  button-submit:
    backgroundColor: "{colors.plum-heading}"
    textColor: "{colors.white}"
    width: "100%"
    padding: "0.5rem 1.5rem"
  input:
    textColor: "{colors.plum-heading}"
    rounded: "{rounded.square}"
    padding: "0 0.75rem"
  attendance-selected:
    backgroundColor: "{colors.selected-pink}"
    textColor: "{colors.plum-heading}"
    rounded: "{rounded.square}"
    padding: "0.75rem 1rem"
---

# Design System: Ashley at 18

## Overview

**Creative North Star: "Satin and lace stationery"**

Dusty rose draped satin frames an ornate ivory lace oval with a quiet opaque center. Expressive lettering carries Ashley's name and section headings. Pink, purple and white remain the confirmed palette; the supplied stationery screenshot governs this revision.

**Key Characteristics:**
- Satin texture and transparent lace artwork.
- Rose script, lavender venue and white reply surface.
- Four sections with direct personal RSVP.

## Colors

### Primary

Rose script and rose ink carry the stationery headings and countdown. Plum accent supports controls and focus; heading plum anchors the form.

### Secondary

The user-supplied pink floral pattern, rotated clockwise into landscape, fills the countdown background; lavender distinguishes the venue section. Keep the dark rose countdown text readable over the pale pattern. Selected pink marks attendance and the hero link's hover state.

### Neutral

White provides the introduction and form surfaces. The ivory medallion is baked into the generated artwork; do not approximate it with an invented CSS color token.

## Typography

Imperial Script defines the hero name and section titles. Instrument Serif supports the italic age, invitation message, countdown numerals, venue name and arrival time. Inter carries body text, navigation and fields. The shared form retains Libre Baskerville titles.

Section scripts range from 3rem (countdown and RSVP) or 3.75rem (venue) to 4.5rem at 640px. The RSVP heading is “Kindly RSVP”; keep its shorter wording and 48px mobile size to avoid script clipping. The medallion's decorative caption is 10px, growing to 12px at 640px. Countdown numerals grow from 3rem to 4.5rem with tabular numerals. Keep script out of form labels and essential instructions.

## Layout

Exactly four ordered sections: **HERO, COUNTDOWN, VENUE, OPEN RSVP**. The hero includes the satin/medallion composition and the white introduction below it; the introduction is not a fifth section. Navigation is a sticky 72px white bar with centered Home, Details and RSVP anchors, small uppercase letter-spaced labels, a thin lavender bottom rule, and a subtle purple dot identifying the current section. Details covers both countdown and venue. Section scroll margins keep content below the bar; preserve the keyboard skip link.

The hero art frame is 2:3, at `min(90vw, 440px)`, centered over cover-cropped satin. Text stays inside the blank oval (22% horizontal insets, 25% top and 24% bottom). The art region fills at least the viewport minus navigation. Countdown has four equal columns within 42rem and a 56rem section container. Venue and form content stop at 36rem. Standard sections use 5rem mobile vertical padding; countdown/venue grow to 6rem and RSVP to 7rem from 640px. There is no opening overlay.

## Elevation & Depth

Satin folds and lace supply visual depth. No decorative box shadows are added. Minimal inputs remove their shadows; the shared submit Button retains its small default shadow. Borders and section colors separate controls and content.

## Shapes

An ornate oval is the signature shape. Action links are outlined pills; minimal fields and attendance choices are square. Preserve lace transparency and the opaque blank center behind the name. Do not overlay copy on lace edges.

## Components

### Hero and artwork

User-supplied transparent accents now complement the stationery: a pink bow and lily cluster around the white introduction, paired purple floral sprays rotated and mirrored into the venue's top corners, and quill stationery above RSVP with mirrored butterfly flowers on both sides, below the form on mobile. Keep their alpha edges, decorative empty alternatives and lazy loading. On mobile, the lilies and butterfly artwork sit in normal flow to protect copy and form controls. Desktop corner accents stay outside the central content width.

Use `pink-satin.webp` behind `lace-medallion.webp`, both decorative with empty alternatives. Static imports provide hashed URLs. Satin uses responsive `next/image` sizing and default quality. The small preoptimized transparent lace asset selectively uses `unoptimized` to bypass a local optimizer loading issue; retain its 960 × 1160 source and alpha. Both immediately visible assets are prioritized. Prompts and provenance live in their adjacent JSON files. InvitationMotion applies one consistent entrance throughout all four sections: opacity 0 to the element's existing opacity, translateY 24px to zero, 850ms cubic-bezier(0.42, 0, 0.58, 1), with 120ms child stagger capped at 600ms. Headings, copy, images, links, countdown groups and local shared-form groups reveal once upon entering the viewport. No scaling, rotation, blur, bouncing or continuous loops. Pending styling is applied only after JavaScript initializes; defaults remain visible. Backwards fill holds the hidden state only during a stagger delay; final appearance lives in rendered CSS. Reduced motion and hidden tabs cancel active work and reveal pending content. Keyboard focus immediately reveals its field group.

### Countdown and venue

The countdown updates once per second, begins with dashes, clamps to zero after the target, and retains a static date without JavaScript. Do not announce every second to assistive technology. The separate lavender venue section contains a watercolor illustration derived from the owner's venue photograph, followed by the map link, address, date and 3 PM arrival. Preserve the recognizable architecture and transparent painted edges. Use a static image import, descriptive alt text, lazy loading and responsive sizes matching the 672px maximum frame.

### Links and reply

Hero and map links use fine outlined pills with soft hover fills. Focus uses a 2px plum outline offset by 4px. The shared minimal `OpenRsvpForm` accepts the guest's full name directly, one reply per person. Square fields use soft rose borders; checked attendance adds plum borders and pale pink fill. Preserve conditional dietary needs, validation, pending protection and confirmation focus.

The local callback sends and saves nothing. Keep the preview notice and explicit sample confirmation until the owner supplies the event record and established integration is connected.

## Do's and Don'ts

### Do:
- **Do** preserve the four-section order and pink, purple and white palette.
- **Do** keep the name centered inside the blank lace oval on all screen sizes.
- **Do** retain artwork provenance and reduced-motion behavior.
- **Do** identify preview replies as unsaved.

### Don't:
- **Don't** restore the superseded floral cutouts or gradient hero.
- **Don't** invent event identifiers or imply production submission works.
- **Don't** access private environment files or Supabase for verification.

