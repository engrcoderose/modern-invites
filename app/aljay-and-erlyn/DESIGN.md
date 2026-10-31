---
name: Aljay and Erlyn
description: A romantic olive-and-ivory garden keepsake, opened and read as an invitation book.
colors:
  paper: "#f8f5e9"
  olive: "#536044"
  ink: "#394331"
  muted: "#647055"
  line: "#b6baa3"
  rose: "#93695f"
  olive-hover: "#3d4933"
  story: "#46543b"
  story-signature: "#e8d7c2"
  preview: "#e8e9da"
  field: "#fffdf54d"
  caution: "#754f45"
  cover-paper: "#f8f5e9f5"
  cover-rule: "#9aa283"
  photo-ground: "#293323"
  photo-dot: "#cbd2bb"
  photo-shade: "#10170c"
typography:
  display:
    fontFamily: "Imperial Script, cursive"
    fontSize: "clamp(62px, 8vw, 98px)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "Imperial Script, cursive"
    fontSize: "clamp(46px, 6vw, 74px)"
    fontWeight: 400
    lineHeight: 1.12
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "31px"
    lineHeight: 1.15
  body:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "13px"
    lineHeight: 1.95
  field:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "16px"
    lineHeight: 1.5
  label:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "10px"
    lineHeight: 1.7
    letterSpacing: "0.1em"
  action:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontSize: "11px"
    letterSpacing: "0.06em"
rounded:
  square: "0"
  artwork: "2px"
  story-arch: "48% 48% 2px 2px"
spacing:
  field-inset: "12px"
  rule-inset: "16px"
  page-gutter-mobile: "24px"
  cover-gutter-mobile: "28px"
  page-block-mobile: "40px"
  page-gutter-wide: "48px"
components:
  button-primary:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.olive-hover}"
  button-text:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
  input-reply:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "12px"
  choice-reply:
    textColor: "{colors.ink}"
    padding: "12px"
  choice-reply-selected:
    backgroundColor: "{colors.preview}"
  cover:
    backgroundColor: "{colors.cover-paper}"
    textColor: "{colors.ink}"
    width: "430px"
  page:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  page-story:
    backgroundColor: "{colors.story}"
    textColor: "{colors.paper}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "64px"
---

# Design System: Aljay and Erlyn

## Overview

**Creative North Star: "The Romantic Garden Keepsake"**

Muted olive ink, warm ivory sheets, expressive calligraphy and fine stationery rules frame an invitation that opens like a keepsake book. The structure inherits Leslie and Serj's full-screen page-turn experience while this couple's generated garden painting, paired swans and twelve-year jeepney story give it an individual identity.

This system belongs only to `app/aljay-and-erlyn`. The repository's marketing design is separate. The source implementation is the authority for this record; this document does not assert client approval or a completed craft-review verdict.

**Key Characteristics:**

- A separate garden cover hands off to a single visible invitation chapter.
- Imperial Script names and headings pair with readable Libre Baskerville and Instrument Serif titles.
- Thin olive stationery rules, square controls and restrained paper shadows establish material depth.
- Warm ivory pages are interrupted by one dark olive story spread.
- Reply controls clearly describe a local preview that sends and saves nothing.

## Colors

The frontmatter records the source palette, including translucent surfaces; these values stay scoped to the client.

### Primary

- **Olive:** primary actions, ornaments, field focus and radio accents.
- **Olive Hover:** the deeper primary-action hover.
- **Story:** the dark story leaf, with Paper copy and a warm Story Signature accent.

### Secondary

- **Rose:** the names' ampersand, page-button hover and invalid-field stroke.
- **Caution:** the confirmed attire color-avoidance note.

### Neutral

- **Paper / Cover Paper:** the book and its slightly translucent cover panel.
- **Ink / Muted:** ordinary text and supporting annotations.
- **Line / Cover Rule:** fine borders, chapter dividers and layered stationery outlines.
- **Preview:** the RSVP notice and selected attendance surface.
- **Field:** a lightly translucent warm field surface.

**The Local Ink Rule.** Keep this palette inside the client folder; it neither replaces nor extends the shared marketing identity.

## Typography

Imperial Script carries the names, monogram, chapter headings and closing signature. Libre Baskerville carries the invitation's prose and controls. Instrument Serif distinguishes venue names, gift titles and the reply-preview title. All three reuse the repository's existing font resources.

The frontmatter captures the recurring hierarchy. The cover names use their own fluid scale, and the formal names use a restrained serif scale. Body copy is generous in leading and bounded by the section's reading width. Uppercase labels identify actual roles such as entourage groups rather than creating promotional headings.

Display names use the display token; chapter headings use the headline token with balanced wrapping. Cover names use `clamp(60px, 12vw, 80px)`. In viewports at most 800px high, chapter headings and formal-invitation names become smaller, with compact section spacing. Story prose uses 13px type with double leading, becoming 12px below the desktop breakpoint. Fields retain the field token for comfortable mobile editing.

**The Script Hierarchy Rule.** Reserve calligraphy for names and short headings; keep essential instructions, form fields and longer prose in the readable serif roles.

## Layout

The invitation occupies the dynamic viewport. Its book is a three-row grid: a 64px header, an internally scrolling chapter stage, and an 80px footer plus the bottom safe-area inset. The header grows to 76px from 768px. Each chapter remains independently scrollable; longer entourage lists and reply fields never require squeezing the whole book into one screen.

Page content is centered with 24px horizontal and 40px vertical mobile padding, increasing to 48px from 640px. Vertical padding contracts to 24px at heights of 800px or less. Section maximum widths follow content: 520px for replies, 650px for questions and the timeline, and up to 1000px for the story spread.

Venue and story layouts become two columns from 768px. Attire, gifts and selected entourage groups use two columns from 640px. The mobile story art is a short arch above the prose; desktop uses a taller arch beside it. Preserve the artwork's deliberate cover crop and responsive image sizes.

The cover panel is at most 430px wide, with mobile gutters and vertically scrollable cover containment. Desktop chapter links give way to a two-column mobile menu below 768px. Previous/next controls and the page selector retain at least 44px target height. The footer reserves safe-area space rather than placing controls against a device edge.

## Elevation & Depth

Depth comes from translucent ivory stationery over the garden painting, double fine rules, a soft cover shadow and a small page-edge shadow. It supports the book metaphor without turning ordinary content into elevated cards.

The cover shadow is `8px 16px 50px #28331b26`; a leaf uses `9px 2px 25px #26361c14`. The mobile chapter menu uses `0 12px 20px #26361c14`. Cover perspective is 1800px. Book turns use a two-dimensional diagonal crease and reflected sheet geometry, with Leslie and Serj's localized fold shadow and gradient.

**The Paper Depth Rule.** Use depth for the cover, page edge and overlaid navigation; retain flat reading and form surfaces within a leaf.

## Shapes

Stationery and form controls are square. The cover's two decorative outlines sit 12px and 17px inside its edge; a page has one inset rule at 16px, reduced to 10px on mobile. The story illustration uses the arch token, while attire artwork has only a minimal corner softening. Thin linework and restrained Lucide strokes complement the typography.

## Components

### Buttons

Primary actions use Olive, Paper text and square corners. The opening action has 28px horizontal and 12px vertical padding with a 48px minimum height; other actions adapt horizontal padding to context. Hover deepens the surface and border over 180ms. Text actions remain underlined, with a 5px underline offset and generous touch padding.

All interactive elements use a visible current-color outline, 2px thick with a 5px offset. Disabled buttons and selectors use 35% opacity and a default cursor. Page buttons change to Rose on enabled hover.

### Cards / Containers

The cover is the signature stationery container, rather than a generic card system. Its garden is decorative, full bleed and prioritized. The reused garden story crop is decorative and lazy. Both use the same content-hashed static image. Gift QRs remain original supplied imagery with selectable account text and a copy fallback.

### Inputs / Fields

Reply fields use square borders, a translucent Field surface, Ink text and 12px padding. Focus changes the border to Olive and retains the visible outline. Native invalid state uses Rose; full-name validation also rejects whitespace-only names. Attendance choices acquire Preview fill and an Olive border when selected.

The RSVP notice and review summary explicitly state that no reply is sent or saved. Preview editing preserves entered fields during that visit. The shared live RSVP integration is disabled pending an approved event record and configuration; the design record does not imply persistence or remote verification.

### Navigation

Top links identify current chapters with an underline and include an outlined RSVP link. Mobile navigation exposes all chapters and supports Escape with focus return. The footer has previous/next controls, an always-available labeled chapter selector and a polite page counter. Arrow keys, Home/End and horizontal swipes provide alternate book navigation while text fields retain normal editing.

Only the active, ready chapter is interactive. The opening cover keeps the entire book visually hidden and inert until its completion; refresh replays the cover even when a chapter hash is present.

### Photo galleries

The Us and Together chapters reuse the owner-requested Vincent and Gabrielle reference photos as clearly labeled placeholders. Us centers a measured 3:4 portrait frame beneath its script heading. Together fills the stage with a photograph, limits the mobile photo frame to a 3:5 crop, and places the script heading above a restrained dark gradient. A solid olive control area carries 44px photo dots, pause/resume and the visible placeholder note. Preserve the supplied per-photo focal positions. These images do not establish Aljay and Erlyn's photographic identity.

Photo changes use a 900ms CSS opacity crossfade; the outgoing layer remains fully opaque under the incoming one until transition completion. Only decoded photos may enter; visited layers keep their order, pending selections queue behind the current fade, and errors offer retry without replacing the working photo. Autoplay advances every four seconds after readiness and the preceding transition. Manual navigation pauses it; reduced motion removes autoplay and crossfade movement. Loading is incremental, using quality 85 and frame-measured responsive sizes rather than a fixed large image width.

### Opening and page motion

The cover waits for garden load/error and font readiness, with a bounded 2200ms fallback. Its opening rotates left while fading; a guarded Open action prevents overlapping activation. The cover card completes before the main book is revealed and focused.

Page turns copy Leslie and Serj's corner-led fold exactly: 1250ms with `cubic-bezier(0.38, 0.05, 0.25, 1)`, the same diagonal clip, reflected reverse sheet, soft shadow and crease gradient. Forward turns fold the outgoing sheet above the incoming chapter; backward turns unfold the incoming sheet above the outgoing chapter. Both stay mounted until the turn ends, overlapping turns remain locked, and focus moves to the settled chapter. The fold is measured from the current viewport with ResizeObserver. Revealed text travels at most 12px over 650ms, staggered by 75ms up to a 300ms delay; numeric animation updates write lasting visible styles and cleanup restores readability. The FAQ rotates its plus and fades the answer.

Reduced motion replaces the cover turn with a short fade, makes page turns and text reveals immediate, removes CSS animation and transition movement, and keeps navigation available. A music control is conditional on a supplied source; it is absent from the current draft.

## Do's and Don'ts

### Do:

- Do preserve the olive-and-ivory stationery book and this couple's own garden artwork.
- Do keep essential prose and form instructions in readable serif type.
- Do preserve internal page scrolling, visible keyboard focus and safe-area-aware navigation.
- Do reveal the book only after the opening cover has fully completed.
- Do keep preview feedback explicit about sending and saving nothing.
- Do preserve the confirmed wedding date, 18 December 2026, and keep unconfirmed reception timing, photographs, hashtag, audio and live RSVP configuration pending.

### Don't:

- Don't copy this client's tokens or artwork into shared marketing styles.
- Don't replace original payment QRs with generated or reconstructed imagery.
- Don't invent photographs, a countdown, a wedding date or successful persisted replies.
- Don't make important content depend on temporary animation fill states.

