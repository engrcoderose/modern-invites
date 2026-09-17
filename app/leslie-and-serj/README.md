# Leslie and Serj

Route: `/leslie-and-serj`. Signature package plus FAQ add-on.
The previous `/leslie-and-john` route and its asset URLs permanently redirect
to the new route. Formal invitation copy retains the couple's full legal names.

## Code and styling conventions

- `invitation.tsx` owns swipe navigation, keyboard/focus behavior, the header,
  page controls and RSVP dialog.
- `pages.tsx` contains the invitation content and reusable presentation components.
- `book-page.tsx` handles the 3D page turn and staggered text/artwork entrances.
  Forward navigation lifts the current leaf to reveal the next; backward
  navigation folds the previous leaf back into place. Outgoing pages are inert
  and hidden from assistive technology, with media paused as they leave.
  Navigation is locked for the 850ms turn to avoid overlapping page changes.
  Reduced-motion preferences disable both the turn and content movement.
- `data.ts` holds the confirmed client content; `artwork.tsx` holds decorative art.
- Use Tailwind classes for simple layout, spacing, alignment and sizing. The
  `lj-mobile` variant preserves this invitation's 700px breakpoint.
- Keep font definitions, decorative frames/backgrounds, complex viewport layouts,
  short-screen tuning and motion/accessibility rules in `wedding.css`.
- Add styling to its existing home instead of creating another override stylesheet.

The repository's `AGENTS.md` records the same Tailwind-first preference for
future invitation projects. This cleanup preserves all 23 pages and their copy.
Validation: TypeScript passed, all pages retained their text and fit at
1280 × 720, 390 × 844 and 320 × 667, and swipe, keyboard navigation, the mobile
menu and RSVP dialog were checked in the browser.

## Content and design

Design direction: **Moody, romantic, vintage, with a touch of whimsy.**

- Moody: deep olive gradients, shaded woodland photography, and ivory text.
- Romantic: Anastasia script, couple portraits, and restrained soft transitions.
- Vintage: warm ivory paper grain, antique-gold rules, lace, and engraved artwork.
- Subtle whimsy: the existing dancing teacup couple, swans, and book-page turns.
  Keep decorative motion gentle and honor reduced-motion preferences.

The style pass preserves the approved photos, wording, page order, and layout;
color swatches and outfit references retain their actual colors.

The dress-code page retains its original outfit reference, formal/black-tie
optional dress code, and no-white guidance, with an added “Dressed to celebrate”
heading and color swatches. The user confirmed that guests should wear green,
orange, or yellow, superseding the earlier instruction to avoid those colors.
The FAQ shares the updated wording.

Ceremony and reception share the woodland `#the-day` page, side by side on
desktop and stacked on mobile. The invitation now has 18 pages. Existing
`#reception` links resolve to this combined page. Reception time remains
“Time to follow” until supplied.

The `#entourage` page combines both sets of parents, the best man, and maid of
honor under “Beside us.” Former `#honor-attendants` links resolve to this page.
All principal sponsors share `#principal-sponsors`; both former numbered links
resolve there. Secondary sponsors, groomsmen, and bridesmaids share
`#wedding-party`, which also receives former `#secondary-sponsors` links.
Bearers and flower attendants share `#bearers`; former `#flowers` links resolve
to the combined page.
The full-page `#together` slideshow follows the complete entourage section,
after bearers and flowers. It uses three other local images (garden, grass,
and woodland path), distinct from the earlier slideshow, without text overlays.
Both slideshows share crossfades, photo dots, keyboard controls, and a
play/pause control that is hidden until keyboard focus.
Every page background extends behind the bottom pagination, without a separate
footer bar or divider. Navigation uses olive text on ivory and ivory text over a
soft dark gradient on woodland, olive, and photo pages. Content keeps its own
space above the controls; the Together photo fills the available page height,
with slideshow dots above the navigation. The desktop cover keeps pagination
within its ivory panel for contrast.

After the timeline, `#photo-break` shows a woodland-backed portrait slideshow
using the existing prenup images, with overlapping Anastasia names. Photos
crossfade every 5.5 seconds; guests can pause or select a photo. Keyboard focus
pauses autoplay, arrow keys change photos within the carousel, and reduced
motion disables autoplay and crossfades. The timer stops when the page exits.

The opening retains its original woodland-image/oval-monogram layout, with
the reference's wording in its ivory text panel: family invitation wording,
Leslie & Serj in olive Anastasia script, full legal names, and the ceremony
venue/date/time.
The supplied `laced-wedding-log0.png` sits between the family message and the
names in the text panel, sized responsively to preserve the swipe layout.
The confirmed Thursday, January 28, 2027 at 1:00 PM is retained instead of the
sample reference date. The image sits beside the text on desktop and above
it on mobile; basic spacing and alignment use Tailwind utilities.

The confirmed brief supplies Leslie Marie S. Zaldua, John Rey F. Sergio,
January 28, 2027, a 1:00 PM ceremony at Chapel on the Hill, and reception at
Azienda Verde Alfonso. The supplied olive/ivory stationery informs the paper
texture, fine borders, script, wax-seal motif, and original garden line art.
Decorative architecture is symbolic, not a representation of the venues.

Anastasia Script is used for all headers and script accents. The supplied
`fonts/anastasia-script.ttf.ttf` is preserved as the source; its WOFF2 version
`fonts/anastasia-script.woff2` is bundled and preloaded with `next/font/local`.
The WOFF2 conversion fixes fallback rendering of the legacy TrueType file.
Noto Serif is self-hosted in `public/leslie-and-serj/fonts`, with its SIL Open
Font License. These route-scoped faces require no Google Fonts build fetch.
Noto Serif uses Google's official variable regular and italic files, with
weights 100–900, normal width (`"wdth" 100`), automatic optical sizing and a
default weight of 400. It is applied to body text, names, labels and controls.

All client content lives in `data.ts`. The supplied LESLIE AND SERJ JSON now
confirms both addresses, all entourage names, dress code, adults-only and
plus-one policies, and gift preferences. Citation markers are removed.
Sponsor pairings retain the existing invitation column order. The former
image-transcription review flags are cleared against this source.

`wedding.design` records the updated moody/romantic/vintage theme, exact olive
and ivory codes, Anastasia/Noto Serif font preferences, whitespace guidance,
swipe direction, and Etsy reference. The current design uses the exact palette
and Noto Serif body text, with Anastasia Script headers and accents.
The source's title
LESLIE AND SERJ is retained without changing the couple's legal names.

`wedding.assets` holds the Drive folder and Foreverlove photo credit.
`wedding.music` records The One by Kodaline, with a null source until a playable
asset is supplied. `wedding.saveTheDateVideo` records the requested Foreverlove
video and “The countdown begins” text. Its `src` points to the supplied
`public/videos/prenup.mp4`, served directly through a native video player with
playback controls, inline mobile playback, and no autoplay. The save-the-date
page uses `assets/prenups/video.jpg` as its poster, with a fine gold frame
and a live days/hours/minutes/
seconds countdown. The timer targets January 28, 2027 at 1:00 PM Philippine
time, updates every second, and stops at zero. The former date, calendar and
link block is removed from this section. The 16:9 frame scales with
the viewport to keep this section within the horizontal invitation.
`wedding.rsvpQuestions` stores the song-request textbox; it is not a FAQ answer
and does not activate an RSVP submission form.

## Pending client details

- Reception time and verified map pins/embed links.
- Approved story and two sets of couple photographs (30 total maximum).
- Hashtag, playable music file, and any additional FAQ answers.
- Gift registry URL; gift copy does not claim an absent link is shown below.
- RSVP deadline, contact, guest list, and event-specific RSVP provisioning.

Null FAQ answers and unprovided story/photos/attire/hashtag/music are hidden.
Answered FAQs are grouped three per page; the current nine answers fill three
pages. Old fourth/fifth FAQ page links resolve to the third FAQ page.
Their components are implemented and enabled by supplying the relevant data.
Map links and embedded Google Maps similarly require confirmed URLs. No
placeholder map pins, borrowed couple photos, or invented logistics are used.
The optional music control is hidden until a source is supplied and starts
only after a guest presses play. The blank RSVP deadline in the source remains
null; the FAQ explains that the date will be shared once available.

RSVP currently opens an accessible information dialog; it does not accept,
store, or pretend to submit guest responses. Before opening RSVP, provision
this event through the existing RSVP infrastructure and implement the
event-scoped guest lookup/restricted response flow. Do not enable a public
unrestricted fallback form. No other client's event or guest list is reused.

The route is noindex while client details are under review. Remove this only
if the client requests search indexing. No existing invitation or landing
page is changed by this addition.

## Review

- `npx tsc --noEmit --noUncheckedSideEffectImports`
- `npm run build`
- Desktop/mobile browser review of navigation, invitation opening, day
  countdown, calendar download, FAQ disclosure, RSVP dialog, and overflow.

The September 16 woodland restyle preserves the horizontal page navigation.
It uses the supplied L&S monogram, wedding illustration and guest outfit peg,
plus an original decorative woodland painting. Optional couple photographs
remain empty until supplied by Foreverlove. Gifts have a dedicated page using
the existing confirmed copy. RSVP remains an information dialog.

Validation for this restyle: TypeScript including side-effect CSS imports;
desktop/mobile visual review; swipe page turning; the page selector; RSVP
dialog and Escape dismissal; and the served all-day calendar download.
All 23 pages were checked at 1280 × 720, 390 × 844 and 320 × 667;
short-screen RSVP and closing-page spacing were adjusted during review.
The calendar returns HTTP 200 with a text/calendar content type.
Production build results from the earlier version do not verify this restyle.

## Invitation photograph

The “With full hearts” page uses the supplied `assets/prenups/bg-invite.jpg`
as its full background and `assets/prenups/1.jpg` as its centered portrait.
Its existing invitation message, names, date and venue details are preserved,
with the L&S monogram overlapping the photo in the supplied reference style.
This page was checked at 1280 × 720, 390 × 844 and 320 × 667 without overflow.

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
