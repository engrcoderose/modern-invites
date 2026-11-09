---
name: "Christina & Reboden"
description: "Floral wedding stationery in a full-viewport presentation."
colors:
  cream: "#f5eddf"
  paper: "#fffaf1"
  ink: "#514333"
  gold: "#91703e"
  blue: "#aac5d4"
  story: "#f5e9d8"
  pink: "#ebc7c6"
  line: "#c9b797"
  rose: "#9b5d68"
  rose-deep: "#7e4651"
typography:
  display:
    fontFamily: "Fleur De Leah, cursive"
    fontSize: "clamp(42px, 5.4vw, 70px)"
    fontWeight: 400
    lineHeight: 1.08
  couple:
    fontFamily: "Fleur De Leah, cursive"
    fontSize: "clamp(42px, 6.5vw, 76px)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Fleur De Leah, cursive"
    fontSize: "clamp(28px, 4vw, 42px)"
    lineHeight: 1.15
  reading:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "13px"
    lineHeight: 1.85
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
  group:
    fontFamily: "Noto Serif, Georgia, serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: ".07em"
rounded:
  control: "2px"
spacing:
  control-gap: "12px"
  compact: "16px"
  section: "20px"
  section-wide: "28px"
  desktop-inset: "48px"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.rose-deep}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  text-link:
    textColor: "{colors.ink}"
  preview-notice:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "8px 16px"
---

# Design System: Christina & Reboden

## Overview

**Creative North Star: "Enchanted Floral Stationery"**

This client invitation combines supplied floral frames, classical columns, champagne damask, a blush envelope, and parchment story sheets. Its warmth comes from physical stationery artwork, expressive script, and restrained text controls.

The implementation presents one invitation page at a time inside a fixed viewport. This document records the current client implementation; it does not prescribe a theme for other invitations.

**Key Characteristics:**

- Floral artwork and paper textures frame readable content.
- Script names and headings pair with a steady serif reading face.
- Cream, dusty blue, and blush distinguish chapter surfaces.
- Persistent navigation supports a presentation rather than a scrolling page.

## Colors

### Primary

Rose identifies the opening and RSVP actions; its deeper variant supplies hover feedback. Gold serves focus outlines, ornaments, link underlines, and progress.

### Secondary

Cream damask supports the venue pages, following the latest supplied reference. Dusty blue remains in the palette and timeline base. The love story uses a solid `#f5e9d8` background and matching scrollbar track. Blush supports the envelope and RSVP chapter.

The timeline follows the supplied reference: all eight schedule rows on one
textured ivory sheet, serif times at left, centered script descriptions at
right, fine horizontal rules, and a blush botanical wax seal above the heading.
The supplied opening garden image fills the entire timeline page behind the
paper, using a centered cover crop on mobile and desktop. The paper fills the
available stage height up to 800px, allowing taller rows on phones while all
eight entries stay on one page.

### Neutral

Cream forms the stage and contents surface. Paper separates the header, footer, fields, and preview notice. Warm ink carries text, while the muted line color defines rails and chapter dividers.

**The Paper and Ink Rule.** Preserve warm ink on pale stationery surfaces for essential event information; decorative artwork frames that information.

## Typography

**Display Font:** locally loaded Fleur De Leah with cursive fallback.  
**Body Font:** locally loaded Noto Serif with Georgia and serif fallbacks.  
**Control Font:** the existing Inter/sans stack.

Script supplies the invitation's expressive voice. Serif handles passages, names lists, and event details; sans handles navigation, counters, status, and form controls.

The frontmatter records the main heading, couple-name, small-script, story-reading, control-label, and entourage-group roles. Formal and venue names use expressive script, while venue times and addresses use the reading serif. The single story page uses 13px serif text with 1.85 line height, retaining every paragraph.

**The Reading Face Rule.** Keep long passages and essential field instructions in readable serif or sans text; reserve script for names, short messages, and headings.

## Layout

The shell occupies the dynamic viewport with overflow hidden. The main stage flexes between paper header and footer rails. Desktop rails are (76px); at widths up to (640px), the header becomes (60px) and footer (70px), with safe-area padding below. Short-height rules reduce both rails again below (600px).

Centered stationery uses a maximum width of (48rem), full available height, and responsive side padding. Content groups commonly use (20px) gaps, expanding to (28px). The widened date frame retains a 2:3 aspect ratio with a clear central opening. Venue pages use a centered composition with a floral heading, framed watercolor, gold trim, and flower pedestals in the lower corners. The date frame reaches (490px), bounded by the viewport height. Venue content is constrained to (680px), and container-relative artwork and typography fit the non-scrolling stage across short and tall viewports. The full story uses a (580px) maximum reading column inside its own scroll region.

**The One Page Rule.** Paginate dense entourage material except where the user has requested a single chapter. Our Love Story is one internally scrolling page with photo, framed title, and full paragraphs, following Aljay & Erlyn's layout. All 30 principal sponsors share one page in 15 paired rows; compact spacing keeps the full list visible where space permits, with internal scrolling on smaller screens. Secondary Sponsors keeps honor attendants, Candle, Veil, and Cord together. Bridesmaids and Groomsmen each have a separate centered page immediately afterward, with internal scrolling only when needed on compact screens. Paired columns, uppercase serif role headings, and italic names follow the supplied layout while retaining the cream theme. The shell and navigation remain fixed.

Entourage role headings and names are centered within equal-width columns.
Shared heading rows align the first names beneath both titles when either
title wraps. Single-column groups center beneath their page title. Sponsor
reading regions reserve equal scrollbar gutters to balance both side margins.

The Dress Code combines principal-sponsor requirements and guest attire in one
chapter. Sponsor details sit above the guest illustrations, motif swatches,
and restrictions. The closing attire message remains below. The page uses an
internal reading region when its content exceeds the available stage height.

FAQs uses one page of native disclosure rows, following Leslie & Serj's
accordion pattern. Warm divider lines, readable serif questions, rotating
chevrons, and a short answer reveal stay within this client's cream theme.
Only one answer is open at a time. All seven original answers remain; expanded
content scrolls internally where needed. Next leads to RSVP; the extra FAQ
RSVP shortcut is removed.

## Elevation & Depth

Depth comes primarily from supplied artwork, the translucent damask layer, and a cream gradient over the opening garden. A soft envelope drop shadow suggests lifted paper. Ordinary fields, notices, rails, and navigation remain flat with fine borders.

## Shapes

Controls use restrained (2px) corners. Ornate scroll edges, floral frames, arches, and the envelope silhouette belong to image artwork rather than generic rounded containers. Preserve their transparent edges and their intended inner content areas.

## Components

### Buttons

The rose primary button uses paper text, a small radius, sans labels, and generous tap height. Opening uses a (48px) minimum height; RSVP uses (44px). Hover deepens rose. Disabled opening feedback retains the action label while preventing repeated activation.

### Inputs / Fields

Paper inputs use warm ink, a muted one-pixel border, (2px) corners, and sans text. Inputs and textareas use (16px) entry text. The shared scoped focus treatment is a gold (2px) outline with (5px) offset. RSVP follows Leslie & Serj's separate script heading plaque and ivory stationery panel, adapted to blush and antique gold. The plaque has a fine gold border, an inset-looking outline, and a small ornament across its top edge. The panel is at most 560px wide with a subtle shadow, roomy fields, and an uppercase rose action. The deadline and explicit local-preview notice sit above the form. An optimized beach photograph sits beneath a blush wash; its phone crop occupies the upper 42% of the page to retain both faces. A dedicated internal reading region keeps the household form accessible on short screens. Replies are neither sent nor saved, and RSVP remains the penultimate chapter.

### Navigation

Paper rails contain the script name shortcut, contents toggle, Previous/Next actions, slide counter, and current page label. Directional SVG icons accompany compact sans controls. Boundary actions are disabled. Contents opens as an overlay between the rails with two-column, underlined chapter actions. Escape closes it; keyboard arrows, Home/End, and horizontal swipes navigate the presentation.

### Stationery and Artwork

A recurring ornament, centered script heading, and focused content group establish the page rhythm. The ornament's transparent margins are cropped in a (160px × 52px) viewport so its goldwork reads at the intended size. Save-the-date title, date, and supplied collage have separate proportional positions inside one frame. Both venues use cream damask, the supplied ivory/blush floral bow, the original venue watercolors with gold scroll trim, and matching flower urns on carved pedestals. Script titles and venue names, uppercase serif details, and blush rectangular map buttons follow the supplied reference. The pedestal cutout was created from the user's image with ImageGen; its source prompt accompanies the optimized WebP. The earlier arch is retained as historical artwork and is no longer rendered. The story's beach portrait carries flowers and an overlapping parchment title; all paragraphs follow below in a readable, scrollable column. The complete black-outfit collage anchors the closing page in its original aspect ratio. The three selected prenup masters are static imports with responsive Next Image sizing, quality 85, and lazy loading. The supplied venue watercolors use static imports from assets/photos/ with responsive sizing and lazy loading.

### Opening and Page Motion

The cover fades and slightly enlarges before the main presentation becomes visible. The action locks during this transition. Pages use Leslie & Serj's geometric corner fold: (1.25s), easing `(0.38, 0.05, 0.25, 1)`, with a cream reverse and soft directional shading. Forward turns fold the outgoing page away; backward turns unfold the incoming page. Both pages remain mounted and opaque during the turn, and navigation locks until completion. Visited pages stay mounted to preserve RSVP state. Reduced motion changes pages immediately and retains the brief cover fade without scaling. The shared geometry lives in `components/invitation-motion/page-fold.ts`; Leslie & Serj's existing import path re-exports it unchanged.

The opening and all twenty-two invitation pages share a soft content entrance:
850ms ease-in-out opacity from 0 to 1 and an independent 24px upward translate.
Visible siblings stagger by 120ms, capped at 600ms for dense lists. Each group
reveals once, after its page fold settles and at least 12% enters the page's
viewport. Nested reading regions also trigger these entrances on scroll.
Framed compositions move together, while backgrounds and page geometry stay
stationary. Separate translate preserves authored transforms and slideshow
crossfades. Focus reveals controls immediately; reduced motion displays content
without movement. RSVP fields added during the local flow follow the same rules.

A single still-photo page, Our love, immediately follows the love story and
precedes the ceremony. It features the supplied beach photograph of Christina
smiling at Reboden (`dsc06556.jpg`). The full photograph remains visible on
portrait screens over a softly blurred copy of the same optimized image;
landscape screens use the existing full-page cover treatment. It adds no text
overlay or photo controls. Its entrance, fold, navigation, and counter follow
the surrounding chapters.

A second still photo, You & me, follows FAQs and precedes Share the Love.
The supplied beach portrait (`dsc06549.jpg`) fills the entire page on
both portrait and landscape screens with object-contain, showing both people
and the entire composition. A dimmed, blurred copy fills unused stage space;
both layers reuse one responsive quality-85 image URL.
This photograph is not part of the Save the Date collage.
The page has no text overlay or photo controls and follows
the existing entrance/fold treatment. The invitation now has twenty-two pages.

RSVP begins with a full-name search and an explicit household selection, using
the existing Leslie & Serj interaction pattern. The selected household's guests,
attendance choices, attendee dietary notes, and optional message share one inline
form. There is no reply wizard or second details page. Search, empty results,
required answers, completion, editing, and switching households work locally.
Fictional sample households and the no-save notice clearly identify the preview;
live guest lookup and persistence remain pending confirmed admin configuration.

## Do's and Don'ts

### Do:

- **Do** keep client artwork, fonts, tokens, and styling scoped to this invitation.
- **Do** preserve transparent artwork edges and reserve their inner areas for text.
- **Do** paginate dense material while retaining persistent navigation.
- **Do** keep preview and missing-photo status explicit.
- **Do** retain keyboard, focus, touch, and reduced-motion behavior.

### Don't:

- **Don't** use script for long passages or form instructions.
- **Don't** introduce document scrolling; the story, principal sponsors, secondary sponsors, dress code, and FAQs use internal reading regions within the presentation.
- **Don't** represent preview replies as persisted RSVPs.
- **Don't** treat pending photographs, audio, or backend setup as completed design evidence.


## Our Moments slideshow

The page after Reception uses Leslie & Serj's supplied slideshow composition:
a centered 3:4 photo frame, Christina and Reboden in script at opposite corners,
a dimmed beach photograph filling the stage, and three photo selectors with a
visible pause/play control. The header, footer, and page-turn behavior retain
this invitation's cream stationery style. Foreground photographs use contain
cropping so the complete image stays visible; a blurred copy fills spare frame
space using the same optimized URL. Later photos load incrementally at quality
85, then decode before a 900ms CSS crossfade. The outgoing image remains opaque
until the incoming transition completes. Playback waits four seconds after each
fade; manual selection, page/menu visibility, hidden tabs, and reduced motion
control autoplay. Keyboard photo navigation stays inside the slideshow, while
Previous/Next continues to navigate invitation pages. A loading failure leaves
the current photograph in place and exposes a retry button.
The second slideshow, Together, follows the final entourage page and precedes
Dress Code. It uses the same photo-loading and crossfade behavior in a full-page
variant: edge-to-edge photos on desktop, complete images on portrait screens with soft
matching backgrounds, and a dark translucent capsule for selectors and
pause/play. Script corner names and the fixed separate backdrop belong only to
the first framed slideshow. Each page owns its playback state and pauses when
inactive. The optimized image URL is reused for each foreground/soft-background
pair; no duplicate full-screen variant is generated solely for the blur.
The Share the Love hashtag page follows FAQs and precedes RSVP. It reuses cream
damask, the gold ornament, and centered script heading. The copy action uses
a fine copy icon and subtly underlined text, without a filled background or
button border. The confirmed hashtag is displayed in responsive italic serif type;
selectable text and a clipboard action with live feedback make it easy to reuse.
The page adds no new artwork or dependencies.
The Save the Date page places a restrained four-column countdown below the
floral frame. Serif tabular numerals pair with small uppercase unit labels,
without extra cards or ornament. A 44px timer region and 12px gap are reserved
in the fixed stage; the frame's responsive height limit includes that space.
The title, date, and collage retain their original internal positions. The
ceremony target is explicitly 3 PM Philippine time on January 23, 2027.
All seven entourage pages have clean side margins without floral vines or
butterfly borders. The centered headings, names, balanced columns, gold heading
ornaments, and cream damask background retain their existing layout. The former
transparent side-vine artwork remains available as source material only.
The love-story header uses a transparent enchanted portrait surround in blush
roses, ivory orchids, fine antique-gold filigree, sage leaves, and pale pink
butterflies. A matching blush-ended gold parchment carries the live Our Love
Story heading. The original portrait is retained inside the surround, with
florals concentrated at lower left and upper right to keep faces clear. Extra
top breathing room accommodates the ornament without clipping. Both images
retain their natural proportions and transparent edges; the reading background
stays #f5e9d8 and all story paragraphs stay in the existing reading region.
The recurring lower-right floral overlay is removed throughout the invitation.
Page-specific artwork supplies the decoration: venue pedestals, the Save the
Date frame, and the enchanted blush story surround.
The latest slideshow refinement removes the first slideshow's photo-box backing,
blurred photo margins, and shadow. Photos retain their full crop over the page's
beach background. An aligned copy of that background inside each fading layer
keeps the crossfade opaque while making the photo slot's margins invisible.
Photo dots match each slideshow collection, with no separate playback icon.
Activating the current dot toggles pause/resume; labels and keyboard access
remain. The 3-second photo cycle includes the existing 900ms crossfade rather
than adding a fresh wait after that fade completes.
Our Moments now cycles through six supplied images, including the blue-plaid
portrait collage. The black-outfit collage is on the closing page. Individual landscape photographs
remain in Together, whose eight-photo collection includes the paired tree-side
portraits and the former closing photo of Reboden lifting Christina.
The new images exclude Save the Date repeats. Photo controls follow each page's
collection size; the existing borderless treatment and 3-second cycle apply.
The envelope is the opening interaction. It has no button chrome or separate
Open CTA; a small italic Tap the envelope to open hint sits below the date. The
artwork, monogram, names, garden, and transition remain. Keyboard users can focus
and activate the envelope with a visible focus indicator, while the initial
cover has no automatically focused CTA outline.

Music follows the supplied soundtrack-card reference: a small circular note
opens an ivory card with an antique-gold border, soft shadow, spaced soundtrack
caption, serif title and artist, playback status, and a double-ring circular
play/pause control. The song remains Thinking Out Loud by Ed Sheeran. The note
sits above the lower-right navigation area; short phones move it into the header
and open the card downward to avoid covering the countdown. Escape and outside
clicks dismiss the card, and audio continues across page changes.

Forward folds carry a sparse breeze of natural watercolor blush-rose petals.
Fourteen translucent petals follow short curved arcs beside the turning paper,
with small varied tilts instead of full spins. Travel caps at 160px horizontally
and 44px vertically; peak opacity varies from .45 to .64. Each arc lasts 1030ms
with up to 170ms stagger, fading before the fold finishes. Desktop's fourteen petals
reduce to ten smaller petals on phones. The transparent botanical
sprite matches the client's blush motif. Reduced motion omits the breeze.

The envelope's rose C & R monogram uses a single centered baseline with a small
ampersand. Its 28cqw script size follows the envelope container, keeping the
letters inside the ivory label on compact and large screens. The monogram is
vertically centered at 64% of the envelope artwork; envelope interaction and
opening motion remain unchanged.
