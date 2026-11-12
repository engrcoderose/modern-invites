# Christina & Reboden

Route: `/christina-and-reboden`

Live text now uses dusty-blue ink (#385d70), with a darker blue hover (#29495b)
and light dusty-blue text (#c2d8e5) over photography. This covers headings, body
copy, monograms, labels, navigation, links, music details, and RSVP fields.
RSVP buttons use paper fill and blue labels to retain contrast. Pale surface
contrast is 6.09:1 on cream, 6.81:1 on paper, 5.91:1 on the story background,
and 4.55:1 on blush. Existing decorative artwork and image colors are preserved.

An enchanted, non-scrolling wedding invitation based on the supplied design PNG
and Signature Package questionnaire. The invitation currently has 22 slides,
including the full story and full entourage. Previous/Next, horizontal swipes,
arrow keys, Home/End, and a contents menu navigate the presentation. Refreshing
returns to the opening envelope. Visited slides stay mounted to preserve form
details; later artwork loads lazily.

Our Moments follows Reception and precedes Wedding Timeline. Its six-image
slideshow uses optimized prenup masters, centered full photographs, corner script
names, a dimmed beach backdrop, and matching blurred fills inside the frame.
Each photograph and its blurred fill reuse one responsive quality-85 variant.
Only visited photos mount; the next photo loads and decodes before its crossfade.
The outgoing photo stays opaque until the incoming CSS transition completes.
Photo dots, arrow/Home/End keys, and pause/play controls are available. Manual
selection pauses playback. Autoplay stops off-page, behind the contents menu,
in a hidden tab, and with reduced motion. A failed photo retains the current
image and can be retried. `data/slideshow.ts` holds photos and timing;
`utilities/usePhotoSlideshow.ts` owns playback and loading state.

Our Love Story is one chapter, following Aljay & Erlyn's photo/title/paragraph
layout. Its full text scrolls inside the page while the invitation navigation
stays fixed. Keyboard focus enters this reading region; native Page Up/Down and
Home/End scroll the story. Its reading position is retained when returning.

One still-photo break follows the love story and precedes the ceremony. The
Our love page uses the optimized `dsc06556.jpg`, keeping the entire photograph
visible on portrait screens with a soft blurred fill, and filling landscape
screens. Both layers use one responsive quality-85 image variant. The page has
the established entrance and fold transitions, without slideshow controls.

You & me is another still-photo break, immediately after FAQs and before
the hashtag page. It uses the optimized `dsc06549.jpg` photograph of Reboden
smiling at Christina, showing the entire photograph on every screen.
This replaces the hand-holding image already featured in Save the Date.
It reuses `PhotoBreakSlide` with `showWholePhoto`, centering the complete photo
over a matching blurred fill. Both layers reuse one quality-85 responsive image.
There are no slideshow controls. RSVP stays penultimate.

All 30 principal sponsors occupy one page in their original paired columns.
The list scrolls internally when needed on smaller screens, with the same
keyboard reading controls and fixed invitation navigation.

Secondary Sponsors keeps Maid of Honor/Best Man, Candle, Veil, and Cord together.
Bridesmaids and Groomsmen each have their own centered page immediately after
Secondary Sponsors. All 32 names remain in their original order. Internal
scrolling on compact screens retains the same keyboard reading controls.

Entourage role headings and names are centered within equal-width columns.
Shared heading rows keep paired name lists aligned even when a title wraps;
single-column groups center beneath their page title. Sponsor reading regions
reserve matching scrollbar space at both edges to keep side margins balanced.

The Dress Code combines principal-sponsor and guest attire on one page. Ninong
requires Barong Tagalog and black pants; Ninang requires a gray floor-length
gown. Each principal sponsor role now has its own illustrated attire example.
All four illustrations use the principal-sponsor height, clamped from 84px to
112px at 12dvh, with natural aspect ratios. Ninong has a distinct embroidered
ivory Barong Tagalog illustration. The guest ladies' gown is dusty blue.
Guest illustrations, descriptions, motif swatches, restrictions, and the
closing attire message remain together here. The separate Sponsors’ attire
slide and contents-menu entry are removed. Compact screens scroll internally.

FAQs is one page with all seven original questions and answers, following
Leslie & Serj's native accordion pattern: divider lines, chevrons, and one
answer open at a time. Keyboard activation and reduced-motion styling remain
available. The FAQ RSVP shortcut is removed; Next leads to the hashtag page, then RSVP. Expanded content scrolls inside the page
when needed; the former three FAQ slides are consolidated here.

Page turns use the same corner-fold geometry, 1.25-second timing, and easing as
Leslie & Serj. The timeline is a single textured-paper page with a blush wax seal and all eight
confirmed schedule rows, matching the supplied timeline reference.

The generic geometry is shared through
`components/invitation-motion/page-fold.ts`; their original import remains a
compatible re-export. `components/PageLeaf.tsx` supplies this client's paper
colors and persistent page layers. Repeated navigation is locked during a fold;
reduced motion changes pages immediately. Date and venue artwork retain their
original proportions with content positioned relative to each frame.

## Updating content

- `data/wedding.ts`: confirmed date, venues, timeline, FAQs, music configuration.
- `data/entourage.ts`: all names and roles, preserving questionnaire spellings.
- `data/story.ts`: complete supplied story; `sections/StorySlide.tsx` renders all
  seven paragraphs together without shortening them.
- `data/media.ts`: artwork imports and photo sources.
- `sections/`: individual invitation content; `components/`: presentation,
  opening, and shared stationery elements.
- `styles/invitation.module.css`: scoped palette, typography, artwork, and motion.

The November 11 revision document corrects the story's puppy name to “Jaykay”.
The entourage's existing “JayKay” capitalization is retained. The same revision
confirms Hazel Jane Paña, Joe Mari Mendoza, Ray Marko Delen, Caily Vianna San Juan,
and the Bride’s flower girls heading.

The timeline now uses Noto Serif for its heading and descriptions as well as
times. Container width and height both govern type size and seal/header spacing,
keeping multiline entries within their rows on shorter laptop screens.

The built-in ImageGen tool edited the existing dresscode-girls artwork into
`assets/designs/dresscode-gown-dusty-blue.webp` and `dresscode-gown-gray.webp`.
Both retain alpha, are resized to 640px tall, and use WebP quality 85. Their exact
edit prompts and original generated paths are recorded in adjacent `.webp.json`
sidecars. The original pink illustration is retained as a source asset.

Ninong's refined barong is `assets/designs/dresscode-ninong-barong.webp`, a
transparent built-in ImageGen edit of `dresscode-men.webp`, optimized to 240x720
WebP at quality 85. Its exact edit prompt is in the adjacent `.webp.json`.
`AttireIllustration` in `sections/AttireSlide.tsx` gives every figure one height
rule and derives responsive image widths from its aspect ratio. The former
larger guest-figure CSS rules have been removed.

## Photos and audio

All 23 supplied prenup photos are optimized losslessly in
`public/christina-and-reboden/photos/prenup/`. Every decoded pixel, dimension,
orientation, and ICC profile matches its source; the measured total reduction
is 11,244,354 bytes (5.08%). `docs/prenup-optimization.json` contains the per-file
verification. Source originals remain in Downloads. `data/media.ts` statically
imports optimized masters for content-hashed URLs: `dsc06605.jpg` above
the love story, `dsc06601.jpg` behind RSVP, and `collage-and-corrections.jpg` on
the closing page. The former closing image, `dsc06623.jpg`, is in Together.
Responsive Next Image variants use quality 85 and placement-specific
sizes and crops; the full-resolution masters remain unchanged. Later chapter
images load lazily, with a small blur placeholder for the framed photographs.

The supplied venue watercolors are connected through static imports from
`assets/photos/ceremony-cathedral.jpg` and `reception-placida.jpg`. They were
renamed from `assets/designs/church-image` and `event-place.jpg` without
re-encoding. Each illustration is shown in full, with the cathedral frame
matching its original aspect ratio. Next Image selects responsive widths at
the shared default quality. Source filenames and hashes accompany the files.
The Save the Date slide uses the supplied transparent
`save-the-date-images.png` collage, optimized to WebP. Its wider floral frame
was edited with the built-in ImageGen tool to leave more room around the live
heading; the optimized transparent artwork and exact prompt are recorded in
`assets/designs/save-the-date-frame-wide.webp` and its JSON sidecar.

The RSVP photo has a blush wash behind the live form. On phones it occupies
the upper 42% of the page so both faces remain in the crop; on desktop it fills
the stage. RSVP is immediately before the final See you there page.

Supplied decorative assets are optimized WebP files under `assets/designs/`.
The portrait and landscape story parchments were generated using the built-in
ImageGen tool to match the supplied scroll while providing transparent edges.
Their full prompts and source references are in the matching
`assets/designs/story-parchment-*.webp.json` files; other artwork has origin
sidecars. Fonts are local Fleur De Leah and Noto Serif with their OFL licenses.

The timeline's blush wax seal was generated with ImageGen and optimized to
`assets/designs/timeline-wax-seal.webp`. Its exact generation prompt is retained
in the adjacent `.webp.json` sidecar. The paper texture and garden/floral art
come from the supplied design files; schedule text remains live JSX.

Both venue pages follow the latest cream floral reference, replacing the arch.
`sections/VenueSlide.tsx` composes the supplied floral bow, portrait damask,
original venue watercolors, gold scroll trim, flower pedestals, and blush map
button. Each word in both venue names and their supporting notes begins in
Fleur De Leah script, followed by Noto Serif italic. `VenueLettering` preserves
whole words for wrapping and provides an uninterrupted screen-reader label.
The italic font reuses the repository's local Latin WOFF2, is isolated under
`--cr-serif-italic`, and is not preloaded on the opening screen. Times and
addresses keep their existing readable serif styling.
Container-relative artwork sizes keep the entire composition within the stage.
The flower pedestal was cut out from the supplied image with ImageGen and
optimized to `assets/designs/venue-floral-pedestal.webp`; its prompt is in the
adjacent JSON sidecar. The floral bow is an optimized copy of `venue-design.png`.
Earlier arch assets remain for provenance and are no longer rendered.

The timeline paper fills the available stage height, up to 800px, rather than
shrinking to a fixed portrait ratio on phones. All eight rows share the extra
height for more breathing room while navigation stays fixed.

Thinking Out Loud by Ed Sheeran uses the supplied MP3, served from
`public/christina-and-reboden/audio/thinking-out-loud-a263bf85.mp3`. The audio is
unchanged from the supplied source, with a content-versioned filename. It starts
from the envelope tap and loops across pages. A floating music-note button opens
a cream soundtrack card with title, artist, playback status, and a double-ring
play/pause control. On short phones the note moves into the header to keep page
content clear. Outside clicks or Escape close the card; Escape returns focus to
the note. `preload="none"` avoids fetching audio before guests open the invitation.
Media events keep the control state in sync; blocked playback leaves a manual
play option available. The original source remains in `assets/music/`.

## RSVP integration

`sections/RsvpSlide.tsx` connects to the existing RSVP backend through
`components/rsvp/RsvpFlow.tsx`. The event slug is configured once in
`data/wedding.ts` as `christina-and-reboden`; no numeric event or invitation IDs
are embedded in this invitation. The shared `useSmartRsvp` hook calls
`/api/rsvp/access`, `/api/rsvp/search`, and `/api/rsvp/party`; `usePartyResponse`
sends the selected invitation's returned guest IDs to `/api/rsvp/submit`.

Guests search by full name, select a returned household, and answer in one inline
form. Attendance is required for every returned guest; attendees can provide
dietary notes, with one optional message. The server controls household versus
individual scope, guest limits, response locks, access, and closure. Individual
mode renders only the server-returned guest list. Confirmed success appears
only after a successful API response. Failed requests retain an error and retry
path, and closed or already-confirmed responses cannot be submitted again.
The form guards concurrent submissions and disables fields while saving.

All production sample households, preview instructions, fake success state,
and their obsolete local helper/tests have been removed. The FAQ now describes
the live search-and-reply flow. No database records or shared API code changed.

Its styling follows Leslie & Serj's RSVP: a separate ornamental heading plaque
and an ivory form panel, adapted to this client's blush background and dusty-blue
text. The confirmed deadline remains visible above the fields.
`styles/rsvp.module.css` owns the decorative plaque and panel; layout stays in
JSX utilities. On short screens, only the RSVP reading region scrolls, keeping
all form states reachable within the fixed invitation page.

Before live use, confirm in the admin UI that the intended event uses slug
`christina-and-reboden`, name-search access, the intended household/individual
response mode, and its real imported guest list and deadline. If its existing
slug differs, update only `wedding.rsvp.eventSlug`. Event lookup and persistence
were not verified against the live backend under this repository's credential
and Supabase boundaries. No admin record was created or changed.

Integration QA used isolated local synthetic API fixtures, never production
routes or credentials. Verified complete request payloads, one successful
household save, individual scope, missing/ambiguous matches, locked replies,
capacity limits, recoverable search/load/save failures, and closure during
search or submission. The fixture routes were confined to the ignored isolated
preview directory and removed after QA, together with their compiled build.
They are not part of the application. Evidence is under
`.impeccable/review/christina-live-rsvp/`.

## Verification

- Repository TypeScript check and scoped ESLint.
- Isolated Next production build with this invitation and synthetic RSVP routes;
  no private env files or live backend access were included.
- Browser layout checks at 320×568, 390×844, 768×1024, 1280×720, and 1440×900.
- Presentation checked for clipping at 320×568. The full story has an intentional
  internal reading scroll; the invitation itself remains fixed.
- Opening, chapter menu, Previous/Next boundaries, keyboard arrows, Home/End,
  Escape, required RSVP fields, attending/declining, and API-confirmed completion
  using synthetic local fixtures.
- Forward/backward intermediate fold frames, rapid keyboard navigation, and
  RSVP state preserved across page turns. Shared fold output matches the
  original Leslie & Serj function across 404 sampled responsive frames.

Reduced motion is implemented in CSS and the opening animation. Native mobile
Safari, physical-device swipes, and live
RSVP persistence have not been verified. The full repository production build
was not run because it automatically loads private environment files.

Together is a second slideshow immediately after Our Little Loves (the final
entourage page) and before Dress Code. It uses eight additional optimized prenup
photos in an edge-to-edge desktop composition, with photo selectors and playback
controls over a dark translucent capsule. Portrait screens show the complete landscape
photographs over a matching soft background. The foreground and blurred copy
share one responsive quality-85 variant. Both slideshow pages reuse
`sections/PhotoSlideshow.tsx` and the same playback hook; they keep independent
photo selection and pause states. The first framed slideshow remains after
Reception. Each slideshow only autoplays while its own page is active.

Our Hashtag is a dedicated Share the Love stationery page after FAQs and before
RSVP. It reads the confirmed `#DENfoundhisEveryTINg` from `data/wedding.ts` and
provides a Copy hashtag action with accessible success feedback and a selectable
text fallback if clipboard access fails. RSVP remains immediately before the
closing page. The new chapter is available from Contents.
Save the Date includes a live days/hours/minutes/seconds countdown beneath its
floral frame. Its target is `wedding.ceremonyISO` (January 23, 2027 at 3:00 PM,
UTC+08:00). `components/WeddingCountdown.tsx` uses the existing invitation clock
pattern: a stable initial placeholder, updates while this page is active and
visible, resynchronization on return, and a non-negative finished state. Screen
readers are not interrupted every second. The artwork keeps its proportions and
reserves space for the timer within the fixed page on shorter screens.
All seven entourage pages have clean sides, with the floral-and-butterfly side
border removed. The unused border component, media import, and decorative CSS
were removed as well. Names, centered columns, headings, and navigation remain.
The generated `entourage-vine-border.webp` and its prompt sidecar are retained
as source artwork but are no longer imported or rendered.
The love-story portrait now has an enchanted blush-rose-and-orchid surround,
with fine gold filigree, sage leaves, and pale pink butterflies. Its heading uses
a matching blush-and-gold parchment. Both assets were made with built-in ImageGen
and have transparent backgrounds. They replace the former single flower cluster
and blue-ended story parchment only on this page; the original artwork remains
available. Exact prompts and references accompany `story-blush-photo-frame.webp`
and `story-parchment-blush.webp`. The optimized portrait, full seven-paragraph
story, heading, and solid #f5e9d8 story background remain unchanged.
The recurring lower-right `flower-design.webp` overlay has been removed from
all invitation pages, together with its unused CSS and media import. The source
asset is retained as a reference for previously generated artwork. The dedicated
venue decorations and blush love-story surround remain
part of their individual designs.
The slideshow photos now have no box background, edge fill, or shadow on Our
Moments. The photo floats directly over the beach backdrop. Matching backdrop
slices behind each fading photo preserve an opaque crossfade without visible
margins and reuse the same optimized beach image URL. The separate slideshow
play/pause icon is removed on both slideshow pages; the current photo dot toggles
pause/resume, with accessible labels and keyboard activation. Photo changes use
a 3,000ms cycle measured from the incoming transition, including the 900ms fade.
The next photograph still waits for successful loading and decoding before reveal.
Our Moments has six images: dsc06605, dsc06116, dsc06236, dsc06519,
dsc06519-1, and 20261024-225227-collage. The final three entries are supplied
collages, shown in full. The black-outfit collage is on the closing page. Together
has eight images, adding dsc06057, dsc06069, and dsc06623 to its original collection.
The additions exclude the files containing Save the Date photos. Six and eight
selectors follow the respective collections, using 40px touch targets on phones
and 44px from the small breakpoint.
Both pages retain the shared 3,000ms cycle, including the existing fade.
The opening screen now opens by tapping the envelope artwork. The separate rose
Open invitation CTA and arrow are removed, replaced with a quiet Tap the envelope
to open hint. The envelope keeps keyboard activation and an accessible name;
repeated activation is locked during the opening transition. Its direct tap
starts music within the user gesture, and the existing opening animation hands
off to the invitation as before.

Forward page turns now include a brief blush-rose petal breeze, following the
existing 1.25-second fold. `PageTurnPetals.tsx` mounts only during a forward
transition, with fourteen paths on desktop and ten on phones. A generated
96px transparent lossless WebP is shared by all particles; the exact built-in
ImageGen prompt is in `page-turn-blush-petal.webp.json`. The effect fades out
within 1.20 seconds, clears with the page turn, never intercepts input, and is
omitted for reduced motion. Previous-page turns keep their existing fold.

The refined petals use short curved arcs instead of the former wide sweeps.
Travel is capped at 160px horizontally and 44px vertically; small varied tilts
replace the large spins. Individual peak opacity stays between .45 and .64,
with staggered arrivals and soft fades. The existing transparent sprite is
reused, without extra artwork, shadows, or animated filters.

Content entrances use `utilities/usePageEntrances.ts` and
`styles/entrances.module.css`. Explicit `data-cr-reveal` groups keep the existing
DOM and layouts intact. The opening and all twenty-two pages use 850ms ease-in-out
opacity and a 24px rise, with 120ms sibling staggers capped at 600ms. A page waits
for the fold to finish; its internal reading regions reveal unseen content as
it enters view. Groups reveal once, preserve authored transforms, and remain
visible on revisits. Keyboard focus reveals immediately; pointer focus does not
snap moving buttons during a tap. Reduced motion and missing observer support
show content immediately. Dynamic form nodes use the same observer rules.

The envelope monogram reads C & R on one horizontal baseline. It sits at the
center of the ivory label, with a smaller ampersand and a font size tied to the
envelope width (28cqw). The compact-screen font override was removed so the
monogram scales with the same envelope on every screen.
