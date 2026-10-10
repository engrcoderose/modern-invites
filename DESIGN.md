---
name: Modern Invites Marketing
description: The existing shared marketing identity; client invitations keep their own themes.
colors:
  forest: "#173d32"
  forest-light: "#204b3e"
  forest-deep: "#102e26"
  forest-hover: "#275547"
  eucalyptus: "#6f927f"
  eucalyptus-dark: "#527362"
  champagne: "#c7a96b"
  champagne-light: "#ead8ae"
  champagne-dark: "#9d7f47"
  ivory: "#f8f5ef"
  white: "#ffffff"
  ink: "#202421"
  ink-muted: "#66706a"
  marketing-muted: "#4b5d53"
  marketing-muted-inverse: "#bcd1c4"
  marketing-cta: "#dce7df"
  marketing-paper: "#fffdf8"
  sage-50: "#f0f7f4"
  sage-100: "#dceee4"
  gold-50: "#fef9f0"
  gold-100: "#fef3e0"
  sage-200: "#bcdcc9"
  sage-600: "#2d6b4e"
  sage-700: "#255640"
  sage-800: "#204536"
typography:
  home-display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2rem, 5.5vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  home-headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.3vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  portfolio-title:
    fontFamily: "Playfair Display, serif"
    fontSize: "2.25rem"
    fontWeight: 700
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  action:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  home-action: "6px"
  card-invitation: "12px"
  field: "12px"
  card-compact: "16px"
  card-featured: "32px"
  pill: "9999px"
spacing:
  control-gap: "8px"
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  home-section-compact: "64px"
  home-section-standard: "80px"
  section-mobile: "96px"
  section-desktop: "128px"
components:
  button-home-hero-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
  button-home-hero-primary-hover:
    backgroundColor: "{colors.forest-light}"
  button-home-hero-secondary:
    backgroundColor: "rgb(248 245 239 / 90%)"
    textColor: "{colors.forest}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
  button-home-hero-secondary-hover:
    backgroundColor: "{colors.white}"
  card-invitation:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card-invitation}"
  button-home-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.home-action}"
    padding: "16px 24px"
  button-home-primary-hover:
    backgroundColor: "{colors.forest-light}"
  button-home-secondary:
    textColor: "{colors.forest}"
    typography: "{typography.action}"
    rounded: "{rounded.home-action}"
    padding: "12px 20px"
  button-home-secondary-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.forest-light}"
  button-secondary:
    textColor: "{colors.forest}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card-package:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card-featured}"
    padding: "28px"
  input-inquiry:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "16px"
  chip-portfolio:
    backgroundColor: "{colors.sage-700}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  navigation:
    textColor: "{colors.forest}"
    height: "72px"
---

# Design System: Modern Invites Marketing

## Overview

**Creative North Star: "Botanical Stationery"**

This is descriptive shorthand for the implemented marketing appearance, not a newly approved brand direction. Warm paper surfaces, forest greens, champagne details, expressive serif headings, invitation photography, and soft shadows give the website the character of printed stationery adapted for a screen.

Scope: the homepage, pricing, portfolio, inquiry, and their shared marketing components. The portfolio retains its existing Playfair Display and sage treatment. Client invitation folders, dashboards, and admin tools are outside this palette's authority. Their confirmed themes remain authoritative, as PRODUCT.md requires.

The approved homepage uses this identity through invitation image cards, restrained dividing rules, spacious serif type, and direct links. Homepage and portfolio reuse the same invitation card and typed collection, with distinct heading treatments; pricing retains its established presentation. The homepage composition and service-first reading order are recorded in `.impeccable/surfaces/app-page-tsx.md`; the portfolio extension is recorded in `.impeccable/surfaces/app-portfolio-page-tsx.md`.

**Key Characteristics:**
- Spacious sections with serif headlines and plain sans-serif action text.
- Forest green for actions and substantial dark surfaces; warm neutrals for reading.
- Invitation samples retain their own artwork and accent colors.
- Homepage and portfolio share invitation image cards; homepage features and packages retain ruled lists.
- The homepage hero centers an italic serif phrase on a full-width atmospheric woodland photograph with a pale Ivory radial wash, paired pill actions. Only the decorative background photo receives homepage image priority; the gallery stays lazy.
- Homepage sections alternate existing cream, sage, champagne, ivory, and forest surfaces. The work gallery uses Sage 50, process Sage 100, print service Champagne Light, packages Gold 100, and closing Forest Light with an inverted Ivory action.

## Colors

The frontmatter records the palette; `tailwind.config.ts` implements these named colors. Keep both aligned when changing an actual brand value.

### Primary

- **Forest:** primary actions, featured packages, and the services section.
- **Forest Light:** primary action hover, the homepage closing panel, and existing service tiles where used.
- **Forest Deep:** existing dark annotations; use opacity modifiers for translucent versions. The footer uses Forest with solid Ivory navigation and Marketing Muted Inverse supporting text; small footer copy starts at 12px.
- **Forest Hover:** existing hovered service tiles, distinct from action hover.

### Secondary

- **Eucalyptus / Eucalyptus Dark:** botanical decoration, italic emphasis, and section labels.
- **Champagne / Champagne Light / Champagne Dark:** gold details, package highlights, and warm shadow color.
- **Sage:** the established portfolio navigation, dividers, and introductory wash. The frontmatter records the steps this surface uses.
- **Gold 50 / Gold 100:** existing pale cream and warm champagne tones; Gold 100 is the homepage package surface.

### Neutral

- **Ivory / White:** primary page backgrounds and readable card surfaces.
- **Ink / Ink Muted:** headlines and ordinary supporting copy. Check contrast on the actual surface before choosing muted text.
- **Marketing Muted:** small supporting text on light marketing surfaces.
- **Marketing Muted Inverse:** supporting text on dark forest surfaces.
- **Marketing CTA:** the shared pale-green closing panel on incumbent pricing surfaces.
- **Marketing Paper:** the warm Luxury package surface.

**The Single Palette Rule.** Use named Tailwind colors and opacity modifiers in JSX. In custom CSS, resolve the same palette with Tailwind's `theme()` function. Do not repeat brand hex or RGB literals in component backgrounds, borders, artwork, or shadows.

**The Sample Identity Rule.** Colors in portfolio item data and sample preview frames describe those invitations, not Modern Invites branding. Preserve their local values; do not promote them into shared brand tokens merely because they appear in a marketing card.

Homepage sections alternate existing tonal surfaces: Ivory photographic hero, Sage 50 work gallery, Forest digital service, Champagne Light print service, Marketing Paper features, Sage 100 process, Gold 100 packages, Ivory FAQ, and Forest Light closing. The hero's radial Ivory wash is centered at 50% 45% in an 80% by 65% ellipse, with 96% opacity at its center, 92% at the 60% stop, and 58% at its periphery; its pale center supports the copy while its edges expose the woodland photograph. Keep body copy Forest-derived on light sections and Marketing Muted Inverse on dark sections. The gallery has 64px vertical padding on mobile and 80px from the small breakpoint to separate its colored surface from the hero.

## Typography

Instrument Serif gives homepage and pricing headings their expressive character; italic phrases use Eucalyptus Dark or Champagne Light according to the surface. Inter carries body copy, navigation, and controls. The portfolio retains Playfair Display headings and Inter body copy.

The homepage display and headline tokens describe its fluid serif scale. The display uses open leading with tight tracking; section headings balance their wrapping and both roles allow long text to break when necessary. The incumbent headline token remains the recurring small-screen pricing heading, which grows at established breakpoints; portfolio titles use their own scale. Preserve the component's existing sizes rather than applying one heading size everywhere. Ordinary body copy uses a 16px size with 28px leading; compact descriptions use 14px with 24px leading. Buttons use readable sentence case.

## Layout

Homepage sections and pricing containers reach 1280px; the centered homepage hero content and portfolio content reach 1152px. Standard horizontal gutters are 16px on mobile, 24px from 640px, and 32px from 1024px. Homepage sections use 64px, 80px, or 96px vertical padding according to density; the hero has its own opening spacing. Pricing retains its established 96px section spacing, increasing to 128px on desktop, and its closing section has its own spacing.

Marketing layouts stack on mobile. The homepage sample gallery follows available container width: two equal columns from 40rem and three equal columns from 68rem, with a 24px gap and no staggered offsets. These rem-based container queries let enlarged text reduce the column count. Homepage package rows progress from one column to two at 640px and four at 1024px. Pricing packages retain their established desktop columns, and portfolio cards become two columns at 640px and three at 1024px. Navigation collapses below 1024px. Keep text and controls flexible, including enlarged text in closing actions.

Pricing columns retain a minimum readable width of 18rem on desktop and collapse to fewer columns when enlarged text needs more room. Package labels and the featured badge share a wrapping header row, so the badge never covers the label. Plain marketing links and controls receive a current-color focus outline; controls with an explicit focus ring retain that treatment.

## Elevation & Depth

Depth combines tonal surfaces, overlapping invitation previews, and soft shadows with a downward offset. Branded shadows resolve their color from Forest or Champagne Dark, separately from their component-specific geometry. For example, the primary button uses `0 14px 32px -16px` geometry with Forest at 70% opacity; the scrolled navigation uses `0 8px 28px -22px` with Forest at 50%.

Homepage features, packages, and actions stay flat: full-width tonal bands and thin Forest dividing rules provide separation. Shared invitation cards add soft depth through a framed preview and a card shadow on hover; the shared navigation retains its existing depth.

**The Shadow Color Rule.** Keep geometry and opacity when replacing a color literal. Pair a geometry utility with the named shadow color; do not substitute a generic shadow if that changes the established depth.

## Shapes

Homepage hero actions use pills; other homepage actions retain small rectangular corners. Shared invitation cards use 12px corners around a rectangular image band and text body; their inset 3:4 preview has 8px corners, a translucent white border, and a slight rotation at rest. Shared pricing/inquiry actions and navigation chips remain pills. Other compact cards retain 16px corners, and package cards retain 32px corners. The inquiry field uses 12px corners. Preserve existing invitation preview silhouettes on the surfaces where they remain in use.

## Components

### Buttons

Primary buttons use Forest with white text, 24px horizontal and 12px vertical padding, and at least 48px height. Secondary buttons use Forest text, a translucent white surface, and a Forest border at 25% opacity. Hover changes color; upward movement runs only when motion is allowed. Focus uses a visible ring and offset. Standalone touch controls are at least 44px in both dimensions; compact inline text links retain native text behavior.

Homepage hero actions use the pill token, 28px horizontal and 16px vertical padding, and a 48px minimum height. The primary has a Forest surface and Ivory text, moving to Forest Light on hover. The secondary has Forest text, an Ivory surface at 90% opacity, and a Forest border at 30% opacity, moving to White on hover. Both wrap as needed and use color-only transitions. Other homepage primary actions retain the homepage corner token, 24px horizontal and 16px vertical padding, and a 48px minimum height. Their surface moves from Forest to Forest Light on hover, without translation or a shadow. The closing action reverses to an Ivory surface with Forest text, Champagne Light on hover, and an Ivory focus outline against its Forest Light panel. Homepage package actions use a Forest border at 30% opacity with 20px horizontal and 12px vertical padding, changing to Forest with Ivory text on hover. Light-surface actions use a Forest focus outline, 2px thick with a 4px offset. Plain homepage links use direct arrow cues and restrained underlines where appropriate.

### Cards / Containers

Bundle deals appear immediately below the modular panels in one full-width Gold 50 panel with a Forest border at 15% opacity and 16px corners. A centered serif title and gift outline lead a ruled definition list. Show each package/add-on combination, its bundle price, the separate total, and explicit savings. Bundles save ₱100 by default; the Classic gallery, limited RSVP and seat finder bundle saves ₱146; the Classic gallery and limited RSVP bundle and the Signature prenup video and seat finder bundle each save ₱147; the Signature FAQ, registry, prenup video and guest guide bundle saves the user-confirmed ₱145. Keep calculations in `lib/pricing-bundles.ts`, derived from canonical package and add-on prices. Flexible rows place the price block below long combinations on small screens and enlarged text; preserve the shared contact path.

The pricing hero is followed by a white benefits row with Forest labels, Eucalyptus Dark Lucide icons and subtle Forest rules. Its semantic four-item list stacks on mobile, uses two columns at the small breakpoint and four at the extra-large breakpoint. Icons and text can wrap with enlarged text. The delivery note belongs in this row rather than appearing twice in the introduction.

Modular pricing presents add-ons for Classic in two pale Sage 50 panels with Forest borders at 15% opacity and 16px corners. Centered serif category headings lead ruled definition lists; feature names use Marketing Muted and prices use Forest with tabular numerals. Dashed row dividers separate names and prices. The auto-fit grid uses a 28rem preferred panel width bounded by the container, stacking at narrow widths and enlarged text; individual rows wrap the price below when necessary. The module catalog contains only extras beyond Classic, using their confirmed prices. It excludes event details, countdown, dress code, entourage, hashtag, and unrestricted RSVP. Classic excludes a gallery and guest portal; Photo Gallery Section is an extra at ₱199, and RSVP with Person Limit is an extra at the user-confirmed ₱399 rate. Luxury includes exactly 5 Revision Rounds. Additional revision rounds remain extras beyond Classic's included round.

Pricing cards use white, Forest for the featured package, and Marketing Paper for Luxury. Their geometry, package-specific borders, and shadows remain distinct. Shared invitation cards present real invitation artwork and local accents inside white cards; all sample colors remain separate from the shared palette.

Homepage and portfolio use the same invitation card: a Forest border at 15% opacity, an image band growing from 192px to 208px to 224px, a framed client preview, compact sample tags, and a 20px-padded text body. Homepage card names use regular Instrument Serif in Forest, growing from 24px to 30px; portfolio names retain bold 24px Playfair Display. Category and invitation-link colors come from each sample. The complete card is one link, opens the invitation in a new tab, and uses a 2px Forest focus ring with a 4px offset. Features use ruled definition lists, the process uses a numbered list, and homepage packages use ruled rows without replacing the pricing page's package cards.

**The Complete Illustration Rule.** Contain complete illustrations inside the preview frame with 8px padding and the sample's pale local ground. Photograph previews retain their intentional cover crop and top alignment. The shared item data selects the fit; Jaydee & Bea uses the illustration treatment.

Both galleries render the shared typed collection in `lib/portfolio.ts`; the homepage shows its first six visible entries and portfolio shows all six visible entries, grouped by invitation category. Ryan & Anne, Jaydee & Bea, and Anjo & Jasmin retain their catalog entries with `hidden: true` while unfinished; filter them before rendering, counting, or preloading. Leslie & Serj is excluded at the user's request. These counts describe the current surfaces, not limits on future additions. The homepage prioritizes only its decorative hero photograph and keeps gallery cards lazy. Portfolio prioritizes the first card on mobile and preloads the second card from 640px and the third from 1024px, matching the visible first row. Later cards stay lazy, and previews request a small optimized width appropriate to their frame. No original raster artwork is modified.

The homepage hero centers its Forest serif headline and italic Eucalyptus Dark second phrase on a full-width decorative woodland photograph under the pale Ivory radial wash. The photograph has a center/42% cover crop, a subtle 2px blur, and a static 1.05 scale; it has no entrance or background motion. The heading uses a 64rem maximum width and the supporting paragraph a 42rem maximum width. The price and package/portfolio pill actions follow the copy. Headline wrapping and flexible action rows preserve the centered composition across sizes. The exact approved copy and service-first reading order remain surface-specific in the homepage implementation and brief.

### Inputs / Fields

The package inquiry uses a read-only, resizable message field with a white background, Ink text, a Forest border at 25%, 16px padding, and a visible Forest focus ring. Preserve manual selection and copying when scripts or clipboard permission fail.

### Navigation

The fixed navigation has a 72px main row, a translucent Ivory surface, and a visible border/shadow after scrolling. The closed mobile menu is inert and hidden from accessibility navigation. Escape closes it and returns focus when necessary. The decorative progress bar runs only when motion is allowed.

### Chips

Portfolio section links use Sage 700 with white text or white with a Sage border. Sample tags use compact neutral pills over artwork. Section links retain the 44px minimum target.

### Motion

Content is visible before hydration. Reduced motion removes spatial reveals, hover movement, accordion height animation, and spring-driven progress. Color, border, shadow, and opacity feedback remains brief (150ms). Changing the preference updates the page without resetting disclosure state or keyboard focus.

Shared invitation card backgrounds scale to 1.05 and inset previews rotate from -4 degrees to 0 on hover over 500ms only when motion is allowed; arrow movement also respects the preference. The homepage FAQ retains the existing accessible accordion and reveal behavior, with the homepage heading scale and no introductory label.

## Do's and Don'ts

- **Do** use shared named colors for marketing identity and keep documented values aligned with Tailwind.
- **Do** preserve client and sample palettes in their own folders or presentation data.
- **Do** preserve established shadow geometry and alpha when replacing literals.
- **Do** check mobile and desktop appearance, contrast, keyboard behavior, enlarged text, and reduced motion after styling changes.
- **Do** reuse the shared invitation card and collection for homepage and portfolio, preserving each surface's heading treatment and responsive grid.
- **Do** keep homepage action and ruled-list variants scoped while preserving pricing patterns.
- **Don't** impose the marketing theme on client invitations or operational tools.
- **Don't** copy brand color literals into new marketing components.
- **Don't** treat decorative sample colors as new shared brand colors.
- **Don't** hide readable content behind JavaScript-dependent entrances.





