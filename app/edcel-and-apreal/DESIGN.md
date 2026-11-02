---
name: Edcel & Apreal
description: Romantic vintage wedding stationery in wine, old rose, and warm ivory.
colors:
  wine: "#722F37"
  burgundy: "#4B0F1F"
  rose: "#B76E79"
  mauve: "#9F759A"
  dusty-rose: "#A6747B"
  deep-berry: "#6B1F2D"
  rose-taupe: "#8D6E72"
  blush-pink: "#E7C9CD"
  dusty-mauve: "#8A5A6B"
  paper: "#F8F0E5"
  ink: "#4B0F1F"
  muted: "#4B0F1F"
  line: "#8D6E7280"
  blush-surface: "#E7C9CD"
  field-surface: "#F8F0E5"
  field-border: "#B76E79"
  light-rose: "#E7C9CD"
  envelope-table: "#E7C9CD"
  envelope-interior: "#4B0F1F"
  envelope-underside: "#722F37"
  story-photo-paper: "#F8F0E5"
typography:
  display:
    fontFamily: "New Icon Script, cursive"
    fontSize: "clamp(4.4rem, 22vw, 8.5rem); desktop: clamp(7.5rem, 11vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.98
  headline:
    fontFamily: "New Icon Script, cursive"
    fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)"
    fontWeight: 400
    lineHeight: 1.3
  title:
    fontFamily: "New Icon Script, cursive"
    fontSize: "1.5rem"
    fontWeight: 400
  body:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "0.9375rem"
    lineHeight: 1.95
  formal:
    fontFamily: "Playfair Display, Georgia, serif"
    fontWeight: 400
rounded:
  field: "0"
  cover: "2px"
  swatch: "9999px"
spacing:
  page-mobile: "1.5rem"
  page-wide: "2.5rem"
  section-mobile: "5rem"
  section-wide: "7rem"
  heading-gap-mobile: "3rem"
  heading-gap-wide: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
    padding: "1rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.paper}"
  field:
    backgroundColor: "{colors.field-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.875rem 1rem"
  attendance-selected:
    backgroundColor: "#E7C9CD"
    textColor: "{colors.ink}"
    padding: "0.75rem 1rem"
  nav-reply:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
    padding: "0.625rem 1rem"
---

# Design System: Edcel & Apreal

## Overview

**Creative North Star: "Vintage wedding correspondence"**

Warm ivory stationery, burgundy ink, old-rose botanicals, fine arch rules, and expressive names create a personal romantic invitation. The continuous page alternates light paper passages with dark wine ceremony and closing passages; the guest first opens the burgundy lace envelope copied from Ryan & Anne’s implementation.

**Key Characteristics:**
- Calligraphic names paired with editorial serif headings and readable prose.
- Generated raster roses and a textured wax seal, paired with the couple’s supplied monogram artwork.
- Spacious centered compositions, fine rules, and restrained one-time reveals.
- Five alternating photo-and-text story chapters, with one supplied photograph per chapter.

## Colors

The owner's [palette reference](docs/color-palette-reference.png) defines the interface theme. The scoped variables at the top of `styles/invitation.module.css` are the source of truth.

| Color | Hex | Token |
| --- | --- | --- |
| Wine red | `#722F37` | `--ea-wine` |
| Burgundy | `#4B0F1F` | `--ea-burgundy` |
| Old rose | `#B76E79` | `--ea-old-rose` |
| Mauve | `#9F759A` | `--ea-mauve` |
| Dusty rose | `#A6747B` | `--ea-dusty-rose` |
| Deep berry | `#6B1F2D` | `--ea-deep-berry` |
| Rose taupe | `#8D6E72` | `--ea-rose-taupe` |
| Blush pink | `#E7C9CD` | `--ea-blush` |
| Dusty mauve | `#8A5A6B` | `--ea-dusty-mauve` |

Wine red supplies primary controls; burgundy anchors ink, overlays, the last gallery and footer. Old rose and dusty rose supply accent surfaces; blush pink supplies the Love Story and Gentle Reminders backgrounds. White and warm ivory remain readability neutrals. Shadows and dividers use translucent palette colors; existing paper and lace artwork retains its natural cream tones.

**Dress-code exception:** The owner explicitly requested that dress-code details, original clothing swatch names and hex colors, illustrations, typography, and text colors stay unchanged. `data/attire.ts` retains the previously confirmed palette, independently of the interface theme. The attire section keeps its ivory, champagne and blush text treatment; its fabric background now uses the separately requested `#4B0F1F` recoloring. Event photographs and floral artwork also retain their original colors.

## Typography

Imperial Script carries the couple's names. Instrument Serif carries section headings, role titles, venue names, numbers, and italic accents. Libre Baskerville carries formal dates and entourage names. Inter carries prose, navigation, labels, and controls. These families reuse the root font resources.

The frontmatter records the hero display and section headline scales. The hero display uses a more open line height (1) below the small breakpoint. The closing uses the supplied full monogram lockup, including its original names and date lettering, at 208px on mobile and 256px from the small breakpoint. The opening retains Ryan & Anne’s small tracked seal instruction and uses Edcel & Apreal’s supplied initials on the seal. Supporting serif titles commonly use (1.5rem) or (1.875rem). Prose remains airy and readable; decorative script is reserved for short expressions and names.

**The Type Roles Rule.** Keep script for names and brief personal expressions; keep essential details and form instructions in the readable serif or sans-serif roles.

## Layout

Simple layout uses Tailwind utilities in JSX. Scoped CSS owns typography, artwork geometry, surfaces, rules, and motion. Most sections use the page and section spacing tokens; the schedule and guest notes have slightly shorter wide-screen spacing (6rem). Containers range from focused forms (36rem) and reading sections (42rem) to venue/entourage layouts (64rem) and the story/navigation (72rem).

Mobile sections stack. At (640px), formal lists, attendance choices, and selected groups split into columns; navigation exposes story and entourage links. At (768px), story and venues split, the schedule becomes a five-column horizontal timeline, and the broad section spacing applies. Botanical margins adjust at (1024px) and (1280px). Attire artwork appears only from the large breakpoint. The full-screen opening centers a 3:2 envelope capped at `min(680px, 60svh)`; short screens use `65svh`, exactly as in the source component.

## Elevation & Depth

Depth comes primarily from tonal paper layers, the arched hero frame, corner botanicals, and the raster seal. The envelope retains the source scene shadows (`0 35px 55px #2e211a45, 0 5px 12px #201b1840`), 1600px perspective, textured lace, and separate pocket/flap shading. Story photographs sit in warm paper mounts with fine rose borders and alternating 1.5-degree rotations; ordinary sections and fields remain flat.

## Shapes

The opening copies Ryan & Anne’s exact curved flap and complementary pocket clip paths; its outer scene has 2px corners. The main hero keeps its tall arch geometry. Ordinary controls and reply surfaces use square corners. Fine one-pixel rules divide information. Circular attire swatches and small outlined timeline dots are limited accents; floral artwork remains organic.

## Components

### Buttons and links

The primary invitation-search button is a full-width wine rectangle with white text, a search icon, and a four-rem minimum height. Attendance confirmation uses the shared RSVP controls. Hover deepens to burgundy. Navigation uses a compact filled reply link; supplementary actions are underlined text links. Focus-visible uses a current-color outline (2px) offset (5px).

### Opening envelope

A burgundy lace envelope sits on Ryan & Anne’s unchanged parchment backdrop. Its three image layers share one unchanged source raster and one SVG color matrix; the recoloring preserves the lace and paper detail. The back, pocket, hinged flap, perspective, easing, dimensions and timing copy the source implementation. Edcel & Apreal’s seal and supplied initials replace the source couple’s seal. The flap rotates 170 degrees over 2.8 seconds; the overlay fades over .55 seconds after a 2.25-second delay. Repeated activation is guarded. Main content stays hidden and inert through the handoff, then focus moves to its title. Refresh returns to the envelope; reduced motion skips the sequence. A noscript fallback exposes the invitation without the overlay.

### Navigation

A sticky paper bar uses a fine lower rule, the supplied burgundy compact monogram, concise anchor links, and the filled reply action. Small screens retain the event-day and reply links. A keyboard-visible skip link reaches event details. White grounds in the supplied artwork blend into paper; black variants invert and screen-blend on the seal and dark closing surface.

### Fields and attendance

The RSVP follows Anjo & Jasmin’s portrait-left/form-right layout on desktop and stacks on mobile. The shared SmartRsvpFlow searches the confirmed edcel-and-apreal event, loads the invited household, and submits per-guest attendance with optional email, phone and message. Name search uses a transparent field and rose underline. Attendance choices retain shared accessible buttons, labels, validation, loading, error, closed and confirmation states. New Icon Script titles and Playfair Display form text preserve this client’s typography. Live persistence is not verified; local checks use synthetic endpoints in an isolated preview.

### Disclosures and stationery

Guest questions use native details/summary with horizontal rules and a thin plus icon that rotates when open. The story is an ordered five-chapter sequence: a first hello, choosing each other, growing in love, a beautiful yes, and their next chapter. One supplied photograph accompanies each chapter, retaining its natural aspect ratio and full framing. The original file order is preserved, including the pink studio photo in Chapter III. Desktop rows alternate photo and text; mobile rows stack with the photo first. Dates or period labels sit below expressive chapter headings. Each paper photo mount is at most 448px wide. Photo reveals animate a parent figure so they do not overwrite the mount’s rotation. Reveals run once when observed, using a small upward movement and opacity transition; text is visible by default. Reduced motion skips the cover animation and disables CSS transitions and scroll reveals.

## Do's and Don'ts

### Do:
- **Do** keep client styling and artwork scoped to this invitation.
- **Do** preserve the four distinct typography roles.
- **Do** keep the main content visually hidden and inert until the cover handoff completes.
- **Do** use responsive static-import artwork with decorative empty alternatives and unobstructed text.
- **Do** retain focus visibility, native form semantics, and reduced-motion handling.

### Don't:
- **Don't** replace the real rose and wax-seal artwork with emoji or CSS approximations.
- **Don't** use script for paragraphs, fields, or essential logistics.
- **Don't** present synthetic preview tests as verified live RSVP persistence.
- **Don't** copy this client's palette or ornament into shared styles.
