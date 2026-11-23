---
name: Modern Invites Marketing
description: Lavender stationery identity for a single scrolling homepage and separate portfolio; client invitations keep their own themes.
colors:
  brand-50: "#f6f3ff"
  brand-100: "#e1dcf9"
  brand-200: "#d3cbf9"
  brand-300: "#b3b0f8"
  brand-400: "#a18bea"
  brand-500: "#9268dd"
  brand-600: "#8040e5"
  brand-700: "#6b2ac9"
  brand-800: "#6023b4"
  brand-900: "#43236b"
  brand-950: "#2c1948"
  marketing-ink: "#21172f"
  marketing-muted: "#412c4b"
  marketing-muted-inverse: "#e1dcf9"
  marketing-cta: "#d3cbf9"
  marketing-paper: "#faf8ff"
  marketing-romance: "#c80083"
  white: "#ffffff"
typography:
  hero-display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.9vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  hero-action-primary:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: "1.25rem"
  hero-action-secondary:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: "1.25rem"
  section-title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.2vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.65rem, 5.2vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Playfair Display, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  portfolio-title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
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
  card-invitation: "22.4px"
  field: "12px"
  card-compact: "16px"
  card-featured: "32px"
  pill: "9999px"
spacing:
  control-gap: "8px"
  gutter-mobile: "16px"
  marketing-gutter-mobile: "20px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  home-section-compact: "64px"
  home-section-standard: "80px"
  section-tablet: "112px"
  section-mobile: "96px"
  section-desktop: "128px"
components:
  button-home-hero-primary:
    backgroundColor: "{colors.brand-700}"
    textColor: "{colors.white}"
    typography: "{typography.hero-action-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-home-hero-primary-hover:
    backgroundColor: "{colors.brand-800}"
  button-home-hero-secondary:
    backgroundColor: "{colors.marketing-paper}"
    textColor: "{colors.brand-800}"
    typography: "{typography.hero-action-secondary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-home-hero-secondary-hover:
    backgroundColor: "{colors.brand-100}"
  card-invitation:
    rounded: "{rounded.card-invitation}"
  button-primary:
    backgroundColor: "{colors.brand-700}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.brand-800}"
  button-closing:
    backgroundColor: "{colors.brand-700}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-secondary:
    textColor: "{colors.brand-700}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card-package:
    backgroundColor: "{colors.white}"
    textColor: "{colors.marketing-ink}"
    rounded: "{rounded.card-featured}"
    padding: "28px"
  input-inquiry:
    backgroundColor: "{colors.brand-50}"
    textColor: "{colors.marketing-ink}"
    rounded: "{rounded.field}"
    padding: "20px"
  chip-portfolio:
    backgroundColor: "{colors.brand-700}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  navigation:
    textColor: "{colors.brand-700}"
    height: "72px"
---

# Design System: Modern Invites Marketing

## Overview

**Creative North Star: "Lavender Stationery"**

The supplied Modern Invites gradient and lavender colors anchor a romantic digital stationery studio. Fuller Playfair Display headings, soft layered lavender surfaces, white edge highlights, generous rounded frames, and downward shadows carry the remaining marketing sections. The approved homepage hero keeps Instrument Serif and its original composition.

Scope: the single scrolling homepage, separate portfolio, and shared marketing components. Pricing, About, FAQ, and inquiries are homepage sections. Client invitation folders, sample artwork, dashboards, and admin tools remain outside this palette's authority. The shared scope is implemented through marketing page wrappers and the stylesheet at components/marketing/theme.css; legacy green and warm-neutral Tailwind tokens remain available for existing independent themes.

The homepage retains its approved romantic hero: purple wax seal, near-black serif copy, magenta emphasis, four invitation phones, and keepsake ornaments. Remaining sections draw more directly from Love & Crafts' romantic softness, fuller serif typography, delicate edging, and surface depth. Compositions, client artwork, palette, content, and interactions remain original to Modern Invites. No reference assets or code are reused.

**Key Characteristics:**
- Spacious sections with expressive serif headlines and readable Inter body and action text.
- Alternating paper, lavender mist, and lilac section grounds, tonal panels, violet controls, white edge highlights, and a deeper lavender footer.
- Solid pale supporting text on dark or violet surfaces; deep plum supporting text on light surfaces.
- Invitation samples retain their own artwork and accent colors.
- Homepage and portfolio share square sample stages with matching opening-screen and hero-screen phone mockups. Features sit on a layered sheet; process steps form a descending three-panel sequence; package previews use three pastel panels.
- Visible server-rendered content, one-time reveals, gentle media movement, and immediate reduced-motion alternatives.
- The hero retains its wax seal, keepsake ornaments, and four linked phones; only immediately visible imagery receives priority.

## Colors

The frontmatter records the shipped shared colors from tailwind.config.ts. The three exact user colors are brand-300, brand-100, and brand-200. The supplied Modern Invites.png is represented by components/marketing/assets/lavender-atmosphere.webp, used by the shared marketing-atmosphere treatment; it is not approximated with a new CSS gradient.

### Primary

- **Violet / Deep Violet (brand-700 / brand-800):** primary actions and hover, marketing headings, links, borders, focus, and portfolio navigation.
- **Lavender family (brand-50 through brand-600):** pale gallery/add-on grounds, section bands, package highlights, badges, decorative accents, and progress. The exact supplied lavender tones anchor the scale.
- **Plum / Deep Plum (brand-900 / brand-950):** darker accents and readable small text, including footer link hover states on the deeper lavender ground.

### Secondary

- **Romance:** the existing magenta heading emphasis in the homepage hero. It remains a restrained text accent, separate from violet controls.

### Neutral

- **Marketing Paper / White:** primary light reading surfaces and invitation/package cards.
- **Marketing Ink:** deep near-black purple for primary reading copy.
- **Marketing Muted:** solid deep plum supporting text on pale backgrounds.
- **Marketing Muted Inverse:** solid pale lavender supporting text on dark plum and featured violet cards.
- **Marketing CTA:** the lavender closing-panel tone where used.

**The Single Palette Rule.** Use brand and marketing Tailwind tokens for the homepage and portfolio. Custom CSS resolves them with Tailwind's theme() function. Reserve the supplied marketing-atmosphere gradient for the approved hero; keep hero artwork and phone geometry scoped to the hero module. Legacy forest, sage, gold, ivory, and ink tokens are compatibility resources for independent themes, not the current marketing identity.

**The Sample Identity Rule.** Colors in portfolio item data and sample preview frames describe those invitations, not Modern Invites branding. Preserve their local values; do not promote them into shared brand tokens merely because they appear in a marketing card.

The supplied gradient hero leads into an alternating section rhythm. Marketing Paper (#faf8ff) gives work, features, pricing, and booking guidance quiet reading surfaces. Lavender mist (brand-100, #e1dcf9) distinguishes services, the benefits ribbon, add-ons, About, and the closing invitation. The process, package finder, and FAQ use a subtle brand-200 to brand-100 lilac gradient. The footer deepens to a brand-300 to brand-200 gradient. Consecutive sections have distinct grounds while inset panels retain their existing styling.

Portfolio follows the same language: lavender introduction, paper wedding collection, lilac other-invitation collection, paper seat finder, lavender closing action, and the shared deeper footer. Collection backgrounds span the viewport while their original content widths and gutters remain intact. Solid grounds use Tailwind utilities; the two layered gradients are scoped in marketing/theme.css. Primary and supporting copy exceed 8.5:1 and 6.2:1 respectively on the darkest new ground. Small footer hover text and featured-package labels use brand-900 for readable contrast.

## Typography

Playfair Display gives remaining marketing headings and card names a fuller, romantic serif voice. Italic phrases use violet; Inter carries supporting copy and controls. The approved hero and navigation retain Instrument Serif and their existing type treatment.

The hero retains its approved fluid scale. Shared section/page titles use the Playfair tokens above. Invitation names use 24px/32px Playfair; process titles use 24px/30px; homepage package names use 30px. Body copy remains 16px/32px or 14px/28px. Descriptive tags use 12px.

Below the hero actions, a compact definition list presents four service highlights in Instrument Serif with fine lavender rules and a soft white wash. Sample count derives from the visible portfolio collection and the starting website price derives from published packages. The other highlights state typical 3–7 business-day creation and one-time payment; a note explains that turnaround starts after complete content. The strip uses four columns from 640px and two on mobile, with the existing reduced-motion-aware reveal. It sits outside the phone artwork wrapper so the ornaments retain their original positions.

## Layout

Homepage sections, About, inquiry, and pricing containers reach 1280px; the centered homepage hero and portfolio content reach 1152px. Redesigned sections use 20px mobile gutters, 24px from 640px, and 32px from 1024px; the approved hero and incumbent pricing internals retain their established gutters. Most homepage sections use 80px vertical padding and 112px from 640px. The hero retains 112px top padding, reducing to 96px at 1024px, and 48px bottom padding. Its heading reaches 1024px and paragraph 768px; seal-to-heading gap is 12px, increasing to 16px at 640px, copy-to-phones spacing is 32px, and phone-to-action spacing is 32px, increasing to 40px. Pricing retains its 96px/128px section rhythm.

Marketing layouts stack on mobile. Homepage work has a 1152px maximum width and uses two columns at a 40rem container and three at 64rem, with 28px horizontal and 32px vertical gaps. Portfolio uses two columns from 640px and three from 1024px. Sample rows align without alternating top offsets. Services and features use split desktop compositions, process uses three descending panels from 1024px, and package previews use three columns from 768px. FAQ is centered at 896px. Navigation collapses below 1024px.

Pricing columns retain a minimum readable width of 18rem on desktop and collapse to fewer columns when enlarged text needs more room. Package labels and the featured badge share a wrapping header row, so the badge never covers the label. Plain marketing links and controls receive a current-color focus outline; controls with an explicit focus ring retain that treatment.

The `#about` section contains the introduction and the Mission/Vision panel on one continuous lavender ground. Mission and Vision use H3 subheadings below the About H2, sit beneath the introduction with a 48px/64px gap, and stack on mobile.

## Elevation & Depth

Depth combines tonal surfaces, overlapping invitation previews, and soft shadows with a downward offset. Branded shadows resolve their color from Violet, separately from their component-specific geometry. For example, the primary button uses `0 14px 32px -16px` geometry with Violet at 70% opacity; the scrolled navigation uses `0 8px 28px -22px` with Violet at 50%.

Shared invitation samples use unboxed text below square, matte lavender stages. Matching graphite phone frames with metallic edges, cameras, side controls, and soft shadows provide depth within each stage. Service artwork sits directly on a soft lavender light, without outline frames or outer cards. The shared navigation retains its existing depth.

The hero's four phone frames overlap by 14px in a stable front-to-back order and use a restrained violet-tinted shadow (`0 8px 18px #48356526`). Their metallic bezels, inset screens, and decorative keepsakes supply depth; the ground stays static and the actions stay flat.

**The Shadow Color Rule.** Keep geometry and opacity when replacing a color literal. Pair a geometry utility with the named shadow color; do not substitute a generic shadow if that changes the established depth.

## Shapes

Homepage hero actions, shared pricing/inquiry actions, closing actions, and navigation chips use pills. Invitation media frames, service stages, closing panels, and compact containers use restrained 16px corners. Inset 3:4 invitation stationery uses 8px corners, a 5px white bezel, and a slight rotation at rest; the media frame is 5:4. Existing pricing package cards retain 32px corners and inquiry fields retain 12px corners. Preserve the hero phone silhouettes. The closing panel has an inner white rule inset by 14px; service artwork uses a soft lavender light without outline frames.

## Components

### Buttons

Primary buttons use Violet with white text, 24px horizontal and 12px vertical padding, and at least 48px height. Secondary buttons use Violet text, a translucent white surface, and a Violet border at 25% opacity. Hover changes color; upward movement runs only when motion is allowed. Focus uses a visible ring and offset. Standalone touch controls are at least 44px in both dimensions; compact inline text links retain native text behavior.

Homepage hero actions retain the pill token, 24px horizontal and 12px vertical padding, and a 44px minimum height; horizontal padding becomes 28px from 640px. The primary moves from Violet to Deep Violet, and the secondary moves from Marketing Paper to Brand 100 with Deep Violet text. Both use a 2px Deep Violet outline with a 5px offset. Elsewhere on the homepage, text actions use direct arrow cues, at least 44px height, and fine Violet underlines where appropriate. Package choices stay open text links; the shared closing action is a Violet/White pill with 32px horizontal and 16px vertical padding and a 56px minimum height. Focus remains visible; links and controls without an explicit ring inherit the marketing focus outline.

### Cards / Containers

Bundle deals appear immediately below the modular panels in one full-width Brand 50 panel with a Violet border at 15% opacity and 16px corners. A centered serif title and gift outline lead a ruled definition list. Show each package/add-on combination, its bundle price, the separate total, and explicit savings. Bundles save ₱100 by default; the Classic gallery, limited RSVP and seat finder bundle saves ₱146; the Classic gallery and limited RSVP bundle and the Signature prenup video and seat finder bundle each save ₱147; the Signature FAQ, registry, prenup video and guest guide bundle saves the user-confirmed ₱145. Keep calculations in `lib/pricing-bundles.ts`, derived from canonical package and add-on prices. Flexible rows place the price block below long combinations on small screens and enlarged text; preserve the shared contact path.

The pricing hero is followed by a white benefits row with Violet labels, Violet Lucide icons and subtle Violet rules. Its semantic four-item list stacks on mobile, uses two columns at the small breakpoint and four at the extra-large breakpoint. Icons and text can wrap with enlarged text. The delivery note belongs in this row rather than appearing twice in the introduction.

Modular pricing presents add-ons for Classic in two pale Brand 50 panels with Violet borders at 15% opacity and 16px corners. Centered serif category headings lead ruled definition lists; feature names use Marketing Muted and prices use Violet with tabular numerals. Dashed row dividers separate names and prices. The auto-fit grid uses a 28rem preferred panel width bounded by the container, stacking at narrow widths and enlarged text; individual rows wrap the price below when necessary. The module catalog contains only extras beyond Classic, using their confirmed prices. It excludes event details, countdown, dress code, entourage, hashtag, and unrestricted RSVP. Classic excludes a gallery and guest portal; Photo Gallery Section is an extra at ₱199, and RSVP with Person Limit is an extra at the user-confirmed ₱399 rate. Luxury includes exactly 5 Revision Rounds. Additional revision rounds remain extras beyond Classic's included round.

Package cards use pale lavender and white tonal gradients; the featured package uses the supplied richer lavender tones with dark plum copy. Shared invitation samples retain actual client art within square matte stages; captions remain outside the artwork without an outer card border.

Invitation sample stages are square with 22.4px corners. Two matching 31%-wide, 9:19 phones align at 22% from the top, positioned at 12% and 57% from the left. This leaves room for the corner badges even in narrow columns and during hover. The shared PhonePreview component puts the actual opening and hero captures inside the same physical frame, with captions below each device. Truthful category labels and an arrow sit in the top corners. Compact Playfair names, unchanged descriptions/tags, and text actions sit below. Complete samples remain single new-tab links with visible focus rings. Process uses a semantic numbered list; features retain a definition list.

**The Actual Screen Rule.** Preserve each invitation's artwork, text, and typography in local captures of its actual presentation components. Do not substitute a generic card or add simulated hero lettering. `lib/portfolio-screens.ts` maps all 17 visible samples to optimized static WebP assets. Ashley and Stephanie have no separate opener; both frames show their real initial hero and their cards explain the direct-entry behavior. Screens request responsive widths appropriate to their frames, and later samples remain lazy. The approved homepage hero retains its separate original artwork composition.

Historical catalog snapshot, retained without reconciling pre-existing visibility/count drift in this visual pass (lib/portfolio.ts is the current rendering source): both galleries render the shared typed collection in `lib/portfolio.ts`; the homepage shows its first six visible entries and portfolio shows all six visible entries, grouped by invitation category. Ryan & Anne, Jaydee & Bea, and Anjo & Jasmin retain their catalog entries with `hidden: true` while unfinished; filter them before rendering, counting, or preloading. Leslie & Serj is excluded at the user's request. These counts describe the current surfaces, not limits on future additions. The redesigned hero prioritizes its seal and four visible phone background images and keeps gallery cards lazy. Portfolio prioritizes the first card on mobile and preloads the second card from 640px and the third from 1024px, matching the visible first row. Later cards stay lazy, and previews request a small optimized width appropriate to their frame. No original client raster artwork is modified.

The homepage hero centers the supplied purple wax seal, a near-black Instrument Serif headline with magenta regular/italic emphasis, service copy, four linked invitation phone previews, and paired package/portfolio actions. Butterfly, bouquet, locket, and champagne-glass ornaments are decorative, pointer-inert, and hidden from accessibility navigation. Phone frames use a 9:19 aspect ratio, 4px bezel padding, elliptical outer corners (12% / 5.7%), and inset screen corners (10% / 4.8%). Width is clamp(5.4rem, 12.5vw, 9rem), changing below 640px to min(24vw, 5.4rem); screens retain cover cropping and responsive image sizes. Focus raises the active phone above its neighbors. The seal is 64px on mobile and 76px from 640px. The exact approved copy and first-viewport sequence remain surface-specific in the homepage implementation and brief.

### Contact destination

The separate inquiry composer, package selector, message field, and copy controls have been removed. The existing closing invitation now owns #inquire, keeping navigation, package links, and legacy redirects usable. Its conversation button opens the existing Facebook destination in a new tab with an accessible label. Saved package and add-on query URLs still reach this contact panel; they no longer populate a form.

### Navigation

The fixed navigation has a 72px main row, a translucent Brand 100 surface at rest, near-opaque Marketing Paper after scrolling, and a visible scrolled border/shadow. The closed mobile menu is inert and hidden from accessibility navigation. Escape closes it and returns focus when necessary. The decorative progress bar runs only when motion is allowed.

### Chips

Portfolio section links use Violet with white text or white with a Brand 200 border. Sample tags are plain small text below the description. Section links retain the 44px minimum target.

### Closing invitation

Homepage and shared final calls to action reuse a centered inset gradient panel with a 64px seal, a two-line serif title, supporting copy, and a Violet conversation action. The panel uses 24px/48px horizontal and 64px/96px vertical padding. Optional labels and delivery notes preserve existing content. The footer forms a deeper lavender anchor with dark plum text, wrapping links, and its working social destination.

### Motion

Content is visible in server-rendered and no-JavaScript output. Both marketing main surfaces use a 600ms opacity-only page entrance from 0.94 to 1, with no hidden initial state. Scroll reveals run once using the shared soft easing over 550ms, with a maximum 240ms delay; only prepared below-viewport content starts transparent, and focus immediately restores visible content. Reveals vary between rise, side, scale, and fade. HeadingReveal staggers lines by 80ms with 18px travel; ordinary rises retain 16px travel.

Service artwork moves from +12px to -12px while scrolling. On sample hover/focus, both phones rise together by 6px over 550ms. A CSS sheen crosses the artwork on hover/focus. Buttons rise subtly, step panels lift, and arrows translate. These effects run only when motion is allowed.

The FAQ uses separate rounded tonal rows with Playfair questions and a Plus icon that rotates 45deg. Disclosure height/opacity transitions last 250ms; closed content is inert and hidden from accessibility navigation. Reduced motion disables spatial effects and skips page/accordion durations.

## Do's and Don'ts

- **Do** use shared named colors for marketing identity and keep documented values aligned with Tailwind.
- **Do** reuse the supplied gradient and shared lavender/violet tokens throughout marketing; keep the hero keepsake art and phone geometry scoped to its CSS module.
- **Do** preserve client and sample palettes in their own folders or presentation data.
- **Do** preserve established shadow geometry and alpha when replacing literals.
- **Do** check mobile and desktop appearance, contrast, keyboard behavior, enlarged text, and reduced motion after styling changes.
- **Do** reuse the shared invitation card and collection for homepage and portfolio, preserving each surface's scale, grid, and loading behavior.
- **Do** preserve the romantic lavender ground, soft surface depth, readable text, original artwork, and accessible interactions.
- **Don't** impose the marketing theme on client invitations or operational tools.
- **Don't** copy brand color literals into new shared marketing components or revive the superseded green marketing motif.
- **Don't** treat decorative sample colors as new shared brand colors.
- **Don't** hide readable content behind JavaScript-dependent entrances.

## Marketing navigation

The only marketing pages are `/` and `/portfolio`. Homepage navigation targets `#featured-work`, `#services`, `#process`, `#packages`, `#about`, and `#inquire`; footer FAQ targets `#faq`. Full package cards and inclusions are at `#pricing-packages`, with add-ons, bundles, digital invitation services, and booking guidance below. The hero remains the only H1 on the homepage. `lib/marketing-routes.ts` provides permanent legacy redirects: `/about` to `/#about`, `/pricing` to `/#packages`, `/gallery` to `/portfolio`, and `/inquire` to `/#inquire` while preserving package query parameters. Client invitation, RSVP, seating, authentication, dashboard, and admin routes are outside this consolidation.

## Interactive package finder

The former static “Find the package that fits your story” comparison is now a three-question calculator at `#package-finder`. It uses native package radios and grouped add-on checkboxes, with 13px labels, 12px prices, 12px padding, 10px gaps, and a 64px minimum choice height. Fieldset legends use 18px/20px Playfair text. The options panel keeps the lavender surface language and compact rounded controls; the full label remains clickable.

At desktop widths, the options and sticky estimate form a 1.45:1 grid. On smaller screens, the estimate precedes the options, and a compact live total with a “View estimate” link appears while the options are visible and the summary is offscreen. The total has a polite live announcement. Native focus, checked/disabled states, and reduced-motion color transitions are preserved.

`lib/package-estimate.ts` derives prices from canonical packages, modular options, and listed bundles. Directly corresponding package inclusions are checked and disabled at no extra charge. Additional music/revisions and separately named specialized options remain extras; broad design/RSVP wording does not automatically waive them. Only one best matching listed bundle applies, including when other extras are selected. Unknown and duplicate options never alter totals.

The calculator still calculates totals, inclusions, and bundle savings locally. Its inquiry link reaches the closing contact panel after removal of the separate inquiry form. No payment, booking, or message is submitted automatically.

## Paired service showcase

The homepage now introduces its services immediately after the hero with a “What we create” overview at `#what-we-create`. A centered Playfair heading and existing champagne-glass ornament sit above six numbered, linked cards. The cards cover wedding invitations, celebration websites, Smart RSVP, guest seat finding, Ninong/Ninang video invitations, and print-ready designs using existing service claims. They link to relevant portfolio groups or homepage details. The grid moves from one column to two at 640px and three at 1024px. A scoped pale lavender wash, white-edged surfaces, restrained hover depth, and shared reduced-motion-aware reveals complement the existing marketing identity.

At `#services`, website invitations and print-ready designs form two open, equal columns from 768px, separated by a fine vertical rule. Each article puts the supplied artwork above its existing heading, description, and action. Below 768px, the services stack with a horizontal divider. Typography uses scoped Playfair at clamp(2rem, 3.5vw, 3rem), with violet italic emphasis. Artwork is capped at 448px with accurate responsive image sizes, existing lazy loading, and the shared subtle/reduced-motion-aware media reveal. Both existing destinations remain unchanged: `/portfolio` and `/#inquire`.

The superseded stacked panels, print-only surface selector, and rotated service-stage borders were removed. Shared `studio-service-panel` styling remains for inquiry, About, and the calculator. No new assets, dependencies, commercial copy, or routes were introduced.
