# Roselle and Darell


## R2 image hosting

All seven active artwork and background images load from `https://assets.moderninvites.com/darell-and-roselle/images/designs/`. The R2 prefix is intentionally `darell-and-roselle`; the website route remains `/darelle-and-roselle`. `data/media.ts` preserves verified intrinsic dimensions and existing responsive image behavior. The normal Next Image optimizer, quality settings and 31-day image cache remain enabled.

Each public R2 file matched its local SHA-256 hash before the local copy was removed. `assets/provenance.json` retains URLs, dimensions, hashes and historical source records. Earlier asset-folder references below describe the original source files. Fonts and their license files remain local. When replacing an R2 image, use a new filename and update its entry to avoid stale cached artwork.

Route: `/darelle-and-roselle`. The original folder slug is preserved; the
questionnaire requests **Roselle Buenavista & Darell John Salazar** on the site.

This invitation follows Vincent and Gabrielle's olive-and-ivory woodland design,
Anastasia titles, names and sentimental copy, Noto Serif body lettering, and
thin ornamental frames. The
user-supplied sage framed DR PNG appears on the formal invitation and in paper
tint on the opening. Navigation uses the central black initials, cropped from
the supplied black framed PNG without its oval. It uses continuous vertical
scrolling and anchor navigation, with no
photo slides, page turns, autoplay media, or borrowed client photographs.

The opening matches the reference's 1.4-second monogram handoff and 1.6-second
woodland dissolve, including the paper-to-original-sage monogram crossfade. The navigation and
formal text then fade in; later content uses the reference's capped stagger and
small upward reveals as it enters the viewport once. Reduced motion removes
spatial movement and uses a brief opening fade. Keyboard focus moves into the
invitation when it opens. Both the base route and `#invitation` show the opening
cover, starting at the top even after scroll restoration. Direct links to later
sections bypass the cover; without JavaScript, the original scrolling cover
remains usable.

## Structure

- `assets/` — client photos, artwork, and other media.
- `components/` — invitation UI components.
- `sections/` — page sections.
- `data/` — confirmed event content and client configuration.
- `styles/` — scoped styles for typography, artwork, and animations.
- `utils/` — client-specific helpers when needed.

## Content

The formal invitation is identified by the couple-name h1 beneath the monogram,
without a separate title above it. The remaining major sections have visible
titles: **The Wedding Venues**, **The Entourage**, **The Wedding Day**, **The Dress Code**, **Frequently
Asked Questions**, **Kindly Reply**, and **Save the Date**. “With Love and Gratitude”
supports The Entourage; “Our Wedding Party” is its subheading. The closing
celebration line supports Save the Date.

The main **The Entourage** title uses Noto Serif at `clamp(22px, 3vw, 30px)`,
weight 500, line height 1.4, and `.02em` tracking. Other main section titles and
**Our Wedding Party** retain Anastasia at `clamp(40px, 6vw, 64px)`, weight 400,
line height 1.15. `SectionHeading`
defaults to calligraphy and explicitly opts into serif only for The Entourage.
Titles come before their top ornamental dividers with a shared 20px gap.
Names, gratitude and celebration lines, and timeline event labels remain
Anastasia. The timeline, dress code, and FAQ are separate sections: ivory
timeline, dark olive dress code with its inset double frame and pale text,
then ivory FAQ.

The RSVP section follows the reference's calligraphy **Kindly Reply** plaque,
top ornament, and wider paper name-search card. Its lookup fields are disabled
until this client's guest lookup is connected, matching the reference's draft
state. An email RSVP fallback and confirmed deadline remain below the card.

Source: the supplied Wedding Invitation Questionnaire PDF. The wedding is
16 December 2026; guest arrival is 1:30 PM, the church ceremony is 2:00 PM,
pica-pica hour is 3:30 PM, and reception dinner is 5:30 PM. The countdown uses
the ceremony's Philippine time (`2026-12-16T14:00:00+08:00`). RSVP deadline:
16 October 2026. Venue links search Google Maps for the supplied venue names and
addresses; they are not manually verified map pins.

All entourage names retain the questionnaire's spelling. The candle sponsor is
listed as **Bherose**, exactly as entered in that field. Do not infer a surname
from the bridesmaid list. The 9 PM after-party text is in the questionnaire's
example column, so it is not a confirmed timeline item.

The dress code is semi-formal, with no shorts, sando, or T-shirts. The
questionnaire provides no color restrictions, gift preferences, hashtag, story,
photos, soundtrack, or guest policies; these are omitted.

The RSVP fallback opens a prefilled email to the supplied contact. Guests still need to send
their email. It does not save responses to a database. No Supabase event or guest
list has been provisioned or accessed. Keep the route `noindex` during review.

## Assets

All runtime assets and styles are client-local. The opening uses the user's
`opening-swan-lake-hd.webp`; later woodland sections reuse the reference background.
`new-green-monogram.png` is the exact supplied sage framed
artwork; `new-black-monogram.png` is the supplied black framed artwork. The shared
`Monogram` component displays these PNGs without redrawing or separately
assembling their shapes. A local SVG alpha filter applies paper tint on the
cover; the formal invitation retains original sage and navigation retains black.
Both files include the oval. The framed crop isolates x 360–1640 and y 176–1828
of the 2000px canvas (320/413 aspect ratio); the navigation crop isolates the
central initials at x 735–1285 and y 690–1247 (550/557 aspect ratio). Responsive
image sizes account for the enlarged source behind each crop: 290px formal,
425px opening, and 175px for the 48px-wide navigation mark. Earlier composed
assets and generated monogram concepts remain as design deliverables and are
not used by the invitation. Raster provenance is embedded or saved in
`assets/provenance.json`. The lake background is a compressed WebP asset. Use
static imports and accurate `sizes`, default image quality, and lazy loading
below the cover. The shared 31-day image cache is unchanged.

Anastasia Script is copied from the reference invitation. Noto Serif Latin
WOFF2 files reuse the repository's licensed copies from Ryan and Anne, retaining
the accompanying OFL license. No fonts or assets are loaded from another client
at runtime.

`assets/artwork/semi-formal-attire-outline-v3.png` is the active generated
transparent outline-only dress-and-suit illustration, created with built-in imagegen from
the user's garment drawing reference. Its exact prompt is preserved in
`assets/provenance.json`. Warm ivory outlines with transparent garment interiors
match the olive section, with no filled garments or shading; confirmed dress-code rules
remain in `data/wedding.ts`. The image appears after the semi-formal request
and the restrictions in the dress-code section, using a responsive, lazy-loaded
Next Image on the olive surface. Below 640px, it occupies 85% of the content
width to leave more breathing room; larger screens cap the illustration at 480px.
The previous photographic outfit lineup remains an unused design deliverable.

Follow the root `AGENTS.md`, including Tailwind-first layout and private-credential
boundaries. Never run a normal root Next dev/build command for verification;
it automatically loads private environment files. Use an isolated preview with
an explicit source allowlist and no server APIs or middleware instead.


