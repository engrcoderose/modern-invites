---
name: "Mario & Inah"
description: "Photo-first floral wedding stationery with calligraphy and painted botanicals."
colors:
  paper: "#f5f0e4"
  ink: "#414b36"
  muted: "#535d46"
  sage: "#d0e1d8"
  blush: "#f7d7de"
  lilac: "#dacfdf"
  rule: "#a9b69e"
  ivory: "#fff0d1"
  woodland: "#263c29"
  venue-border: "#c99399"
  button-hover: "#56634b"
  button-active: "#333e2f"
  field-paper: "#fffefa"
  field-rule: "#aab19e"
  reply-surface: "#edf1e8"
  photo-matte: "#e5e6dc"
  scroll-accent: "#7b8061"
  attire-sage: "#c6d5ce"
typography:
  display:
    fontFamily: "var(--font-imperial), cursive"
    fontSize: "clamp(3.8rem, 11vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.25
  headline:
    fontFamily: "var(--font-imperial), cursive"
    fontSize: "clamp(2.8rem, 7vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  welcome-name:
    fontFamily: "var(--font-imperial), cursive"
    fontSize: "clamp(3.6rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
  welcome-ampersand:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: "clamp(1.125rem, 2.1vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.3
  welcome-date:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: ".75rem"
    lineHeight: 1.8
    letterSpacing: ".08em"
  venue-title:
    fontFamily: "var(--font-imperial), cursive"
    fontSize: "clamp(2.25rem, 3vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  photo-caption:
    fontFamily: "var(--font-imperial), cursive"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)"
    lineHeight: 1.2
  date:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: "clamp(.8rem, 1.5vw, 1rem)"
    lineHeight: 1.8
  countdown:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: "clamp(1.4rem, 4vw, 2.6rem)"
    lineHeight: 1.4
  detail:
    fontFamily: "var(--font-inter), sans-serif"
    fontSize: "14px"
    lineHeight: 2
  role:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: ".75rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: ".08em"
  entourage-name:
    fontFamily: "var(--font-libre-baskerville), Georgia, serif"
    fontSize: "clamp(1rem, 1.3vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.75
  entourage-introduction:
    fontFamily: "var(--font-inter), sans-serif"
    fontSize: ".75rem"
    fontWeight: 500
    lineHeight: 1.9
    letterSpacing: ".12em"
rounded:
  control: "3px"
  oval: "50%"
spacing:
  field-x: "16px"
  control-y: "12px"
  gutter-mobile: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "64px"
  section-compact: "64px"
  section-expanded: "80px"
  section-long-mobile: "80px"
  section-long-desktop: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-primary-active:
    backgroundColor: "{colors.button-active}"
  field:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  text-link:
    textColor: "{colors.ink}"
  venue-card:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    padding: "16px"
  attire-swatch:
    backgroundColor: "{colors.attire-sage}"
    rounded: "{rounded.oval}"
    height: "56px"
    width: "40px"
  reply-status:
    backgroundColor: "{colors.reply-surface}"
    textColor: "{colors.ink}"
    padding: "20px"
---

# Design System: Mario & Inah

## Overview

**Creative North Star: "Botanical stationery"**

Painted flowers frame fine calligraphic names and headings, with formal serif event details on cream paper. Pale botanical sage, a photographic woodland field, and a lilac venue field carrying blush stationery express the user-pinned floral reference. Open lists and restrained controls keep guest information readable. This system belongs only to the Mario & Inah invitation.

The full-screen welcome photograph is immediately visible, with warm ivory calligraphy, a fine frame, confirmed date/location, corner florals and an Open invitation action. Following the earlier client photo-cover pattern, JavaScript adds a short staggered entrance and a 750ms opening dissolve: the photograph moves forward while lettering and flowers recede. The hero enters after the welcome lettering clears. Focus and scrolling are restored after opening; reduced motion opens instantly once ready. Explicit section links bypass the cover, and without JavaScript the welcome is inline with a native anchor to all invitation content. Supplied floral cutouts and the botanical pattern remain recognizable artwork; they are not approximated with CSS. Couple photographs remain samples in client data and provenance, with one gallery-level disclosure. There are no per-image watermark overlays. The venue uses the actual uploaded Panaad Garden photograph.

**Key Characteristics:**

- Fine calligraphy, formal serif event details and quiet sans-serif controls.
- Cream paper, botanical sage, woodland photography and lilac with blush stationery.
- Painted floral overlaps and a directly readable photographic opening.

## Colors

The palette pairs muted olive text with warm paper and pastel botanical surfaces.

### Primary

Dark olive ink carries readable text and solid guest actions. Sage is the patterned entourage and footer surface. Woodland supports the photographic gallery with warm ivory foreground text.

### Secondary

Lilac grounds the venue and attire sections. Blush fills the narrow venue card; its warmer border outlines the stationery. Scroll accent is a restrained olive progress line.

### Neutral

Cream paper is the default canvas, countdown. Muted olive supports secondary copy; the rule color draws dividers and underlines. Fields use brighter paper and a dedicated border. Prepared reply status uses pale green. Warm ivory makes calligraphy readable over photos; photo matte is the fallback surface.

The twelve attire colors remain in `data/wedding.ts`. Their labeled outfit suggestions are independent of large section surfaces; the sidecar previews the actual Sage swatch.

**The Surface and Swatch Rule.** Preserve the supplied section grounds independently of attire suggestions.

## Typography

**Display Font:** Imperial Script, with cursive fallback.
**Body Font:** Inter, with sans-serif fallback.
**Formal Detail Font:** Libre Baskerville, with Georgia and serif fallbacks.
**Supporting Title Font:** Instrument Serif, with Georgia and serif fallbacks.

Imperial Script owns names, section headings, venue lettering, photo captions and footer names. Libre Baskerville owns dates, entourage lists, roles, schedule times and countdown numerals. Inter owns prose, labels and form controls. Instrument Serif remains in the supporting attire title. The page uses the repository's loaded font variables.

The frontmatter records the used type roles. Formal entourage lists use 12px text with 24px leading, rising to 14px at 640px; role labels are uppercase. The parents introduction uses Inter at .7rem, weight 600, 1.8 leading and .12em tracking. Schedule times use 18px Libre Baskerville; practical details commonly use 14px with 28px leading. Countdown figures are tabular.

**The Calligraphic Hierarchy Rule.** Keep Imperial Script for names and headings, formal serif for event details, and sans-serif for controls and longer prose.

## Layout

Use Tailwind in JSX for simple layout, sizing and responsive spacing. Scoped CSS owns type, color, layered backgrounds and decorative treatments. Common gutters are 24px on phones, 40px from 640px and 64px for larger sections from 1024px. The countdown and venue introduction use 64px top padding, rising to 80px from 640px. Longer attire and RSVP sections use 80px vertical padding, rising to 112px from 768px.

The hero is full bleed, with minimum heights of 340px, 480px from 640px and 640px from 1024px. Names stay centered and flowers anchor the lower corners with -bottom-2 and -left-2/-right-2 offsets. The requested navigation appears after the opening cover handoff, fixed above the invitation on a pastel sage surface with ink text and a fine rule. Imperial Script names link to the invitation start; Inter section links and the existing RSVP button form a desktop row and a collapsible mobile menu. Existing section anchors retain their scroll margin.

Entourage keeps paired columns even on phones, with principal sponsors spanning both columns; decorative flowers have reserved lower clearance. The gallery keeps three portrait photographs on woodland, with a taller center print and responsive gaps. Its content is capped at 896px. The venue card is centered and capped at 448px, with 16px internal padding rising to 24px at 640px; the meadow has generous lower clearance. Schedule items reflow from two to three to six columns at 640px and 1024px. RSVP content becomes two columns at 768px; the RSVP form is capped at 512px. Attire swatches reflow from four to six columns at 640px.

## Elevation & Depth

Depth comes from botanical overlap, photographic grounds and tonal stationery. Venue cards and controls are flat; the venue card uses a fine border. Photo text has dark ambient text shadows to preserve legibility. The timeline dot's seven-pixel paper ring masks the divider rather than creating elevation. The woodland gallery uses a translucent dark photographic veil and unframed, unrotated portrait images.

**The Botanical Depth Rule.** Let artwork, photographs and tonal surfaces supply depth; keep content cards and controls flat.

## Shapes

Controls have restrained corners; dividers, venue-card borders and field borders are hairline strokes. Photo frames and the venue card are rectangular. Gallery portraits use 3:4 outer frames and a 3:5 center frame. Attire suggestions are vertical ovals (40 × 56px on phones, 48 × 64px from 640px), with a subtle olive border. Floral silhouettes preserve source transparency and natural edges.

## Components

### Buttons

Dark olive with paper text, compact corners, 12px × 24px padding and at least 48px height. The primary RSVP action fills the form width. Hover and active use their frontmatter colors; background transitions take 180ms. Focus uses a two-pixel current-color outline offset by five pixels.

### Inputs / Fields

Visible labels precede 16px entry text, bright paper fill and a fine field border. Input and select controls have at least 48px height and 12px × 16px padding. The optional note resizes vertically. Native required-field behavior remains intact; focus follows the shared outline.

### Cards / Containers

The venue uses a flat blush card, fine warm border, actual uploaded photograph, script venue title, formal address and time, and a map link. RSVP search and household details use the shared minimal presentation with the existing sage, paper and ink palette. Submission feedback comes from the shared RSVP flow.

### Countdown and photographs

The countdown pairs a centered script heading with four unboxed formal numerals on floral cream paper. Its corner flowers shift outward by one quarter of their width and use bottom-5 (20px above the bottom edge), with no vertical translation. No-JavaScript output preserves the ceremony date and time. Responsive Next Image photo frames use quality 85 and source-specific focal positions. Per-image sample watermarks are removed at the user’s request; client data/provenance and one gallery disclosure retain the sample status. The gallery renders the first three configured gallery photographs; the remaining configured samples are not a hidden gallery or preload target.

### Guest actions and motion

The user-requested removal of the invitation-details section also removes its Save our date/calendar action. RSVP uses the shared household-search flow for Guestlist search. This invitation explicitly hides unlisted replies, including when an older event configuration reports Open RSVP. Guests can return from household details to search. The minimal presentation retains the existing pastel palette and requires JavaScript; the earlier email-draft experience is superseded. A two-pixel scroll indicator follows page progress. Reduced motion hides that indicator and disables transitions and animations. The requested welcome cover uses an opening action with JavaScript, and a native inline anchor fallback without JavaScript; decorative artwork is hidden from assistive technology.

### Falling petals

After the welcome handoff, a sparse decorative layer uses the existing blush, lilac and sage tokens: ten petals from 640px and five below. The layer ignores pointer input and is hidden from assistive technology. A paper-and-ink control at the lower left pauses or resumes the petals; hidden tabs and focused inputs, textareas or selects also pause their motion. Reduced motion hides both petals and their control.

## Do's and Don'ts

### Do:

- **Do** keep client-specific styles, artwork, configuration and design records inside this invitation folder.
- **Do** use Tailwind for ordinary layout and scoped CSS for typography and layered decoration.
- **Do** preserve supplied artwork, actual venue photography, the gallery sample disclosure and readable photo text.
- **Do** preserve keyboard focus, direct section links and reduced-motion behavior.
- **Do** keep confirmed content data-driven and pending information explicit.

### Don't:

- **Don't** substitute attire suggestions for the supplied section grounds.
- **Don't** let controls behind the welcome receive focus or let a failed image block opening. Preserve direct section links and the no-JavaScript anchor fallback.
- **Don't** add elevated cards, competing layout declarations or decorative substitutes for supplied artwork.
- **Don't** represent a preview or unacknowledged submission as a saved RSVP.
- **Don't** invent couple photographs, story text, a playable music asset or names for pending entourage roles.

Evidence: current client source, `docs/direction.md`, and repository-root `.impeccable/review/mario-reference/` captures and `checks.json`. The reference-led finish review passes fidelity; the client-local records supersede earlier arch, entry-cover and Polaroid guidance. Story and audio remain pending and are not rendered. Couple photos remain samples with a gallery-level disclosure; unnamed secondary sponsors and the individual ring bearer remain pending.


Entourage corner flowers shift outward by one quarter of their width and use bottom-3 (12px above the bottom edge), with no vertical translation.

Entourage names use 16–18px Libre Baskerville with 1.75 leading and balanced wrapping; uppercase role labels use 12px with 0.08em tracking. Paired roles and principal sponsors form two columns, stacking below 360px. A narrow hairline divider with a geometric diamond ornament separates the parents from the wedding party, and fine horizontal rules frame the principal sponsors. Keep all confirmed names and supplied floral artwork unchanged.

Both photo breaks fill at least one dynamic viewport height, edge to edge, with cover cropping and responsive image sizes accounting for the landscape source aspect ratio.

Scroll-linked depth is confined to photographic backgrounds and floral cutouts. A damped spring moves photographs within ±36px and florals within ±10px; phones use half those distances. Photo layers have 48px of vertical overscan on each edge, and the venue floral baseline extends 12px below its frame. Reading content does not track scroll; text may briefly animate on first entry. Slideshow controls and RSVP fields remain stationary. Live reduced-motion preferences remove parallax immediately; the default HTML remains visible without JavaScript.

First-entry reveals are gently differentiated: calligraphy resolves from a 2px blur and 14px rise over 900ms, text groups rise 10px over 700ms, photographs settle from 1.025 scale over 900ms, and the entourage divider opens horizontally. Delays are capped at 200ms, and each element animates once. All content starts visible, with no animation-gated reading. Focus and reduced-motion changes settle content immediately; hidden pages cancel active reveals. Forms and controls stay outside reveal layers.

The hero cycles through four configured sample photographs with a 900ms fade and 3-second reading interval. Each photo slowly zooms from 1 to 1.03 over 3.9 seconds, continuing gently through its crossfade; zoom pauses with playback and offscreen/hidden-page state and is removed for reduced motion. Hero copy remains independent of slideshow changes; first-entry text reveals and gentle floral parallax run separately. Only the first photo loads initially; each next photo is mounted when requested and decoded before replacing the current image. Four plain circular dots provide direct selection and left/right arrow-key navigation, without a pill background or playback icons. Selecting another dot pauses autoplay; the current dot toggles pause/resume with an accessible label and tooltip. Offscreen and hidden-tab playback stops; reduced motion disables autoplay and uses instant manual changes. With JavaScript disabled the first photo remains visible and controls are omitted.


The refined welcome stacks Mario and Inah in ivory Imperial calligraphy, separated by a smaller Libre Baskerville ampersand. A fine hairline and diamond divider sits beneath the confirmed date, and a transparent outlined Open invitation action completes the composition. The names enter in a restrained stagger; short-height screens scale the lettering down while keeping the action visible. The existing photo drift, floral exit and cover dissolve remain intact.


Text entrances emphasize the wedding names: the welcome lettering softly resolves from 2px blur with an 18px rise and 220ms name stagger, followed by its date and location. Section calligraphy resolves over 900ms from 25% opacity and a 14px rise; supporting text uses a quieter 700ms fade and 10px rise. Entourage names animate individually with a short row stagger capped at 200ms, while role labels stay separate. The hero title animates its inner lettering without moving keyboard focus. Content remains visible by default and animations run once, settle on interruption, and honor live reduced-motion preferences.


