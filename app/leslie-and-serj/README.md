# Leslie and Serj

Route: `/leslie-and-serj`. The former `/leslie-and-john` route and asset URLs
permanently redirect here. The invitation remains noindex during client review.
Sharing metadata includes a canonical URL, Open Graph and Twitter large-image
cards, and a 1200 × 630 preview matching the opening screen at
`/leslie-and-serj/opengraph-image`. URLs inherit the site's production metadata
base (`https://www.moderninvites.com`).
The preview uses the same garden photograph, illustrated logo, opening prompt,
and wedding date as the cover.

## Page sequence

The opening logo is followed by 13 numbered pages (14 screens altogether):

1. Logo / open invitation
2. Invitation
3. The Wedding Venue
4. Us
5. Parents
6. Principal Sponsors
7. Wedding Party: maid of honor, best man, secondary sponsors, bridesmaids and groomsmen
8. Wedding Party: bearers and flowers
9. Together
10. The Dress Code
11. A Note on Gifts
12. FAQs
13. RSVP
14. Wedding Countdown with Save the Date Video

The opening overlay is excluded from the page counter. Removed pages include
With full hearts, Our Timeline, the first two FAQ pages, and the closing thank-you.
Existing aliases for removed pages still resolve to the relevant current page.

The opening cover glides outward with a shallow turn over 2.2 seconds. The logo
fades first and the invitation text enters during the reveal, avoiding a blank
pause. Focus remains in the opening dialog until it clears. Reduced motion uses
a short fade without translation or rotation.

## Presentation

The palette is olive (#5a6946) and ivory (#f2ede0), with Anastasia headings,
Noto Serif details, paper grain, fine borders, and woodland photography.
Anastasia is bundled through next/font/local; regular and italic Noto Serif
are self-hosted under public/leslie-and-serj/fonts with their SIL license.

All displayed dates use `28 January 2027`, sourced from wedding.date.
Formal names are Leslie Marie S. Zaldua and John Rey F. Sergio.
The invitation's full names are stacked, with Leslie above John Rey.
Women appear on the left and men on the right: parents, principal
and secondary sponsor pairs, maid of honor/best man, and bridesmaids/groomsmen.
Confirmed names and sponsor pairings are preserved.

Parents, sponsors, and both wedding party pages share compact italic Noto Serif
names, uppercase serif role labels, and the Anastasia heading With Love and
Gratitude. Centered content has generous surrounding space. The dense party
page uses tighter gaps on short screens to stay clear of the music control.

The opening and Us backgrounds use the supplied Photo background website.png.
The opening uses the supplied Opening Logo.png as-is, including its sage frame
and original colors. The first invitation page retains the non-lace Wedding
Logo.png illustration, cropped with CSS to preserve the original asset. That page
has no woodland header or monogram. Supplied church_logo.png and
reception_logo.png identify the venues. Venue details appear together on one
page, side by side on desktop and stacked on mobile. The ceremony remains
1:00 PM at Chapel on the Hill, followed by reception at Azienda Verde Alfonso.

The Us slideshow uses Main-1.jpg through Main-5.jpg in order. Together uses
Group1 -1.jpg through Group1-5.jpg in order. Both show the real couple's supplied
photographs, delivered at a minimum 1920px width with quality 95 and larger
responsive variants when needed. Image sizing accounts for portrait cropping
so landscape photographs retain detail. Both have five photo dots, crossfades,
keyboard controls, and accessible
play/pause controls. Keyboard
focus pauses autoplay; reduced motion disables autoplay and transitions.

Dress-code guidance preserves Formal or Black-Tie Optional attire, green,
orange or yellow, and the request to avoid white-adjacent shades. Swatches are
removed. The outfit collage places the eight existing women's examples above
the five men's suits, following the client's layout reference. The original
image remains preserved; `assets/designs/Wedding guest peg - rows.png` is the
transparent edited version. The built-in image-editing prompt is recorded in
`assets/designs/dress-code-rows-prompt.md`.
Gift preferences appear only on the gifts page; the FAQ links there.
The QR code blends into the ivory paper and opens its full original image.
Only plus-one, adults-only and gift-registry questions remain in FAQs.

The final Wedding Countdown page has the native save-the-date video player
and live countdown, without redundant headings. The supplied
`assets/prenups/Save the Date Video - Leslie and Serj.mov` is served as a 1080p
H.264/AAC MP4 at `/leslie-and-serj/video/save-the-date.mp4` with fast-start
metadata and a poster taken from the actual film. The original is preserved.
The countdown targets 2027-01-28T13:00:00+08:00, updates each second and stops
at zero. The video autoplays with sound inline when this page is active and the
opening cover has cleared, pauses on departure, and starts again on return.
Starting or resuming the film pauses the background music, including autoplay.
Native controls allow guests to adjust sound or play manually if autoplay is
blocked. Opening the invitation starts The One by Kodaline;
the music control can pause or resume it.

## Code and accessibility

- invitation.tsx owns navigation, keyboard/focus behavior, header and controls.
- pages.tsx contains content and reusable presentation components.
- book-page.tsx handles a 1.25-second corner-led page turn based on the supplied
  video reference. page-fold.ts calculates the diagonal crease and reflects the
  lifted corner to form the sheet's reverse side. A localized soft shadow and
  subtle crease shading preserve contrast without a bright central ridge.
  Geometry follows the viewport size, and backward turns unfold the same sheet.
  Outgoing pages
  are inert and hidden from assistive technology; their media pauses.
  Navigation is locked until the turn finishes. Text and artwork ease into
  place, including Candle, Veil and Cord; paired names animate together.
  Reduced motion disables the turn and content movement.
- data.ts holds confirmed event details, names and copy.
- rsvp-flow.tsx retains the existing name-search and party-response flow.
- Use Tailwind in JSX for basic layout and spacing, and scoped wedding.css
  for fonts, artwork, layered backgrounds and animation styling. Follow AGENTS.md.
- Content scrolls as an accessibility fallback on very short or zoomed screens.

## RSVP and remaining launch details

The RSVP page uses Kindly Reply and a centered Full Name field, without a
placeholder. A unique name match opens the response dialog; multiple matches
require invitation selection. Failed or unmatched searches leave it closed.
The form collects attendance, contact details, dietary needs and an optional
song request (stored in the existing message field). It uses useSmartRsvp and
usePartyResponse with slug leslie-and-serj, and respects server response locks,
party scope and attendee limits. No other event's guest list is reused.

Before launch, provision the event with access mode name_search and response
mode household, import the approved guest list, and activate it. A read-only
check on September 18 found no event with this slug. The RSVP deadline remains
unset until supplied. Reception time, verified map pins, direct registry URL,
and any additional logistics still require client confirmation. Optional
unprovided story, photos, hashtag and FAQ answers remain hidden.

## Validation

Run `node node_modules/typescript/bin/tsc --noEmit --noUncheckedSideEffectImports`
(the global npm/npx launchers on this workstation are broken). Review affected
pages at desktop, mobile and short mobile sizes; check paired name order,
overflow, forward/backward turns, navigation and FAQ-to-gifts linking.

## Generated artwork

Mode: built-in image generation. Selected output:
`public/leslie-and-serj/images/woodland-lake.png` (1536 × 1024).
Decorative artwork, not an image of either real wedding venue.

Final prompt:

> Use case: stylized-concept. Asset type: full-bleed background for a refined vintage wedding invitation website. Create an original romantic European woodland lake oil painting, a quiet shaded pond with dense old trees and soft olive foliage overhead and at both sides. A small ivory swan glides far to the lower right. Moody deep forest green, aged olive (#5a6946), muted moss, tiny antique-gold light accents; dim soft natural daylight, visible fine canvas grain and softly scumbled brushwork. Wide landscape composition, 1536x1024 if possible. Keep the central area calm, dark and low contrast so an ivory oval monogram and text can overlay it. Foliage should feel lush, painterly and timeless, not tropical or photographic. No people, wedding couple, buildings, letters, monograms, text, border, frames, logos, or watermarks. This is atmospheric decorative artwork, not a depiction of a real wedding venue.

On this workstation the global `npx` launcher is broken. Equivalent installed
commands used for validation were `node node_modules/typescript/bin/tsc
--noEmit --noUncheckedSideEffectImports` and
`node node_modules/next/dist/bin/next build`.
