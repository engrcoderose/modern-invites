---
version: 1
slug: "app-christina-and-reboden-page-tsx"
primary_target: "app/christina-and-reboden/page.tsx"
related_targets: ["app/christina-and-reboden/components/Invitation.tsx"]
---

# Christina & Reboden

Mode: Experience. Guests browse a fixed-viewport invitation using Previous/Next, a counter, keyboard arrows, or chapter selection. The supplied PNG and artwork pin the visual direction; no alternative concept or new comp is needed.

## Direction contract

THESIS: An enchanted floral invitation presented as individual stationery pages. Principal sponsors and secondary sponsors each occupy one page; Bridesmaids and Groomsmen have separate centered pages. The full love story is one internally scrolling page, following Aljay & Erlyn.

OWN-WORLD: Champagne damask, dusty-blue chapter surfaces, blush envelopes, supplied gold floral frames and classical columns. Fleur De Leah script paired with readable Noto Serif; controls use the existing body sans.

STORY: Open a personal envelope, save January 23, 2027, read their full story, locate both venues, meet their entourage, understand attire, and preview RSVP.

FIRST VIEWPORT: A garden fills the cover. A single centered pink envelope carries a cream monogram seal; names and a clear Open invitation action sit below it. The cover exits before the first framed date slide is exposed.

FORM: User-pinned reference; seed key user-reference-christina-reboden. Fixed presentation with bottom corner navigation and chapter menu. The story, principal sponsors, secondary sponsors, dress code, and FAQ chapters have internal scrolling where required. Reduced motion reaches the same usable states.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Pending: licensed Thinking Out Loud audio, admin record and confirmed RSVP integration. All supplied venue and selected couple images are connected. No remote or credential access.

## Finish evidence

Implemented 33 non-scrolling slides with the supplied Save the Date photo collage.
Scoped ESLint, repository TypeScript, and an isolated production build passed.
Phone, tablet, and desktop layouts and core navigation/RSVP preview were checked.
The finish reviewer scored the desktop parchment integration and date lettering
fixes resolved, disposition `ship` for those scored fixes. Client design tokens
are recorded in `app/christina-and-reboden/DESIGN.md` and its local sidecar.
Original artwork has source sidecars; generated parchment variants retain exact
prompts. Native Safari, physical swipes, real music, and live RSVP remain untested.

## Requested refinement

The user requested more elegant alignment and Leslie & Serj's page-turn motion.
The focal interaction now uses their unchanged fold geometry and 1.25-second
easing, with directional paper reverse and shade. Both sheets remain present;
navigation locks during a turn and reduced motion changes pages immediately.
Date text and collage use proportional positions inside one undistorted frame.
The venue arch preserves its proportions; readable serif details sit between
the columns, beneath centered flowers. The gold ornament now crops its unused
transparent margins, and the damask is quieter. All 33 compact-phone pages were
checked without clipped text; intermediate forward/backward frames, rapid
keyboard turns, and persistent RSVP state were verified. No new artwork or
event content was introduced. The shared helper matches Leslie & Serj's
original outputs in 404 sampled responsive frames.

## Single story chapter

The user requested one love-story page following Aljay & Erlyn. There are now
24 presentation pages: the complete seven-paragraph story occupies one chapter
with a portrait placeholder, floral accent, overlapping parchment title, and
internally scrolling text. Navigation stays fixed, reading position persists,
and keyboard focus enters the scrollable region. The story data is unchanged.

## Timeline reference

The user supplied a timeline reference and requested that layout. The full
eight-row timeline is now one page, replacing the two-part timeline. A textured
ivory paper sheet sits over a floral garden edge, with blush wax seal, script
heading and descriptions, serif times, and thin rules. Confirmed times and
wording are unchanged. The invitation now has 23 pages.

Timeline verification: all eight rows fit at 320×568 and 390×844 without
overlapping dividers or document scrolling; desktop layout and forward/backward
page turns were checked. The 5:00 PM entry uses the reference's two-line wrap.
Scoped lint and the isolated production build passed; no browser errors appeared.

## Enchanted venue arch and prenup masters

The user supplied 23 prenup images and requested optimization without quality
loss, then requested a generated enchanted arch and its use on both venues.
The transparent generated ivory/gold floral arch replaces the plain arch and
separate crown. Ceremony spacing is compacted to keep its heading below the
floral crown at phone sizes. The optimized JPEG masters retain every decoded
pixel, dimension, orientation, and ICC profile; total size fell from 221,268,572
to 210,024,218 bytes (5.08%). Source hashes confirm the originals were unchanged.
Per-file verification is in `docs/prenup-optimization.json` within the client.

The replacement arch was checked on both venue pages at desktop and phone
sizes, including 320×568. The ceremony heading clears the crown, the content
stays in the viewport without document scrolling, and no browser errors were
observed. Scoped lint and the final isolated production build passed.

The user subsequently requested the supplied opening garden image across the
whole timeline page. The garden now fills the page behind the paper schedule,
replacing the limited garden border and extra flower overlays. Desktop and
390px-phone previews confirmed full-stage coverage, all eight rows, and no
document scrolling. Scoped lint passed.

## Single principal sponsors page

The user requested all principal sponsors on one page. The original 15 pairs
(30 names) now occupy one chapter, replacing three sponsor pages and reducing
the invitation to 21 pages. The cream damask, ornament, script heading, and paired
columns remain. Compact spacing fits the full list where space permits;
an internal scroll region preserves readable type on smaller screens. Keyboard
focus enters the active reading region while the invitation rails remain fixed.

Verified all 15 paired rows at 1280×720, 768×1024, and 390×844 without scrolling.
At 320×568, native Home/End reaches the full list within the page, without
document scrolling. Next proceeds directly to secondary sponsors, and returning
after visiting the story focuses the visible sponsor region. Scoped lint and
the isolated production build passed; no browser errors appeared.

## Optimized prenup photo placements

The user requested using the optimized photos in the design. The story now
uses the beach portrait `dsc06605.jpg`, RSVP has a blush-washed `dsc06601.jpg`
background, and the closing page uses the shoreline photograph `dsc06623.jpg`.
The supplied Save the Date collage remains. The selected optimized masters
are static imports with hashed URLs and responsive Next Image variants at
quality 85; no masters are resized or overwritten. Later images load lazily.
The RSVP phone background is limited to the top 42% to retain both faces.
RSVP remains immediately before See you there, as previously requested.

Photo placements were checked at 390×844, 320×568, 768×1024, and 1440×900.
Story and closing crops retain both faces; the RSVP wash keeps live fields
readable, and the local preview advances to its second step and persists across
page turns. Responsive image requests selected 256px for the 250px story frame
and 640px for the phone RSVP background, rather than forcing desktop widths.
Selected master hashes still match the optimization report. Scoped lint and
the isolated production build passed, with no browser errors observed.

## Wider venue arch opening

The user requested a more spacious interior like their second arch reference.
Both venue pages now use `enchanted-venue-arch-wide.webp`, generated with
ImageGen from the earlier arch and the supplied layout reference. It retains
the ivory/gold floral world with slim columns near the outer edges and a wider
clear opening. The 2:3 asset is displayed without stretching. Content occupies
the middle 78% and photos are centered at up to 220px; compact placeholders
keep their icon and label visible at the smallest phone size. The original
event copy, blue surface, maps, and page navigation are preserved. The exact
prompt, references, and WebP settings accompany the asset in its JSON sidecar.

Both venue layouts were checked at 390×844, 320×568, and 1440×900, plus the
reception at 768×1024. Content clears the columns and crown, the complete arch
fits the stage, and no document scrolling or browser errors were observed.
Scoped lint and the final isolated production build passed.

## Supplied venue art and taller timeline paper

The user pointed out that both venue images were already supplied and asked
for taller timeline paper with more room between the entries. The existing
cathedral and Placida Pavilion watercolors are now connected as static imports.
They were moved into `assets/photos/` with descriptive JPEG filenames, without
re-encoding; source names and hashes accompany them. Both use contain sizing
to show the complete illustration, and the cathedral frame uses its natural
1264:842 aspect ratio rather than the former panoramic placeholder crop.

Timeline paper now fills the stage height up to 800px, while retaining its
560px width limit. All eight rows share the extra height. At 390×844 the paper
is 672px tall with approximately 69px rows. At 320×568 all descriptions still
fit within their rows, including the two-line entries. The garden backdrop,
schedule text, wax seal, and fixed navigation are preserved.

Venue images and the timeline were checked on 390×844 and 320×568 phones and
1440×900 desktop; the timeline was also checked at 768×1024. Both illustrations
loaded, the complete buildings remain visible, all eight rows fit, and no
document overflow or browser errors were observed. Scoped lint and the isolated
production build passed without private configuration or backend access.

## Cream floral venue redesign

The user supplied a flower urn/pedestal image and a new venue layout reference.
Both venue pages now replace the arch and blue surface with cream portrait
damask, the supplied floral bow, a centered venue watercolor with gold scroll
trim, script venue details, serif times/addresses, and a blush map button.
Matching flower pedestals sit at the lower corners. The pedestal cutout was
created with built-in ImageGen from the supplied image and optimized to WebP;
the exact prompt and settings are in its adjacent JSON sidecar. The crown is
an optimized copy of the supplied `venue-design.png`. Earlier arches remain
as historical assets and are no longer referenced by the live artwork config.

`sections/VenueSlide.tsx` now owns the focused venue composition. It uses
container-relative artwork and type sizes, with larger compact-phone artwork
after the first visual review. Both supplied venue illustrations, all confirmed
names, notes, times, addresses, map destinations, and page navigation remain.
The presentation still has 15 pages.

Both venue pages were confirmed at 390×844 and 320×568 mobile, 1440×900 desktop,
and 768×1024 tablet. Venue content and 44px map links remain inside the stage
without document or horizontal scrolling. All observed artwork loaded, both
pedestals reuse the same optimized image URL, and no browser errors appeared.
Scoped lint and the final isolated production build passed without private
configuration or backend access.

## Balanced, centered full entourage

The user requested centered details beneath the role titles across the full
entourage, with balanced left and right spacing. This supersedes the earlier
left-alignment preference. Role headings and names are now centered; paired
groups use equal-width columns with shared heading rows so wrapped titles do
not offset the first names. Single-column Flower Girls and Furbabies lists
center beneath Our Little Loves. Principal sponsors retain their paired order.

The shared NameColumns renderer covers families, bearers, honor attendants,
and bridesmaids/groomsmen. Sponsor reading regions reserve matching gutters
at both edges, keeping their content centered even with a visible scrollbar.
All 81 names remain across the five entourage pages, with no data edits.

All five pages were checked at 390×844 mobile and 1440×900 desktop; Bearers and
Little Loves also fit at 320×568, with tablet layouts reviewed at 768×1024.
Measured heading/list centers coincide, paired lists start at the same height,
and page content centers match the stage. No horizontal overflow or browser
errors were observed. Scoped lint and the final isolated production build
passed without private configuration or backend access.

## Removed FAQ RSVP shortcut

The user requested removal of the Go to RSVP link below the FAQ accordion.
The button, arrow import, and unused navigation callback are removed. All seven
FAQ entries remain, and the standard Next control still leads to RSVP.
Scoped lint and the repository TypeScript check passed; this text/control
removal did not require another production build or browser review.

## Combined secondary sponsors and wedding party

The user requested one page following the supplied paired-role layout. Maid
of Honor/Best Man, Candle, Veil, Cord, and Bridesmaids/Groomsmen now share the
Secondary Sponsors chapter. All 32 names and their original order are retained.
Honor attendants move from the family page into this chapter; the two former
bridesmaid pages and groomsman page are removed, reducing the invitation to
18 pages. The cream floral theme remains, with uppercase serif role headings
and italic names matching the reference's typography arrangement.

An internal reading region keeps the shell fixed. All 32 names were counted
in the rendered page; the final bridesmaid and groomsman remain accessible with
native End, and Home returns to the header. Reading position and focus persist
when returning from the Bearers page, which now immediately follows this page.
Verified at 390×844, 320×568, 1440×900, and 768×1024; the tablet view fits all
names without scrolling, and smaller views scroll internally without horizontal
overflow. Scoped lint and the isolated production build passed, with no browser
errors observed.

## Left-aligned entourage text

The user requested left-aligned text while keeping the entourage content
centered. Shared name groups now left-align role headings and names, and the
principal-sponsor list left-aligns both columns with top-aligned pairs for
wrapped names. Existing centered content widths, script page titles, names,
pairing, scrolling, and navigation remain intact.

Family, principal-sponsor, and secondary-sponsor layouts were reviewed on
390×844 mobile, with the combined page also checked at 1440×900 desktop and
768×1024 tablet. Computed role/name alignment is left, the content midpoint
matches the available reading region midpoint, and all 32 wedding-party names
remain present. No horizontal overflow or browser errors were observed. Scoped
lint and the isolated production build passed.

## One combined dress-code chapter

The user clarified that the Ninong/Ninang requirements belong to the Dress
Code. Principal-sponsor attire now sits above guest attire on that page:
Barong Tagalog and black pants for Ninong, gray floor-length gown for Ninang.
Guest descriptions, illustrations, motif colors, restrictions, and the closing
attire message are preserved. The separate sponsor-attire slide and chapter
shortcut are removed, reducing the presentation to 17 pages.

The reading region fits all content at 390×844, 1440×900, and 768×1024; compact
320×568 screens scroll internally to the closing message without document or
horizontal overflow. Illustration sizes match their responsive frames. Next
proceeds directly to Questions, and native Home/End remains available inside
the dress-code region. Scoped lint and the isolated production build passed;
no browser errors were observed.

## Single FAQ accordion page

The user requested Leslie & Serj's FAQ pattern on one page. All seven original
questions and answers now share the FAQs chapter, replacing three FAQ slides
and reducing the invitation to 15 pages. The implementation follows their
native named-details accordion: divider lines, rotating chevrons, one open
answer at a time, and a 250ms answer reveal disabled for reduced motion. It
retains this client's cream floral stationery and A Few Little Details title.
The Go to RSVP action remains below the questions.

Verified collapsed and expanded layouts at 390×844, 320×568, 1440×900, and
768×1024. Pointer and keyboard activation work, opening another question closes
the previous one, and compact screens scroll internally to the RSVP action.
The RSVP link reaches page 14 of 15; returning preserves the open answer and
focus enters the visible FAQ region. All seven questions remain present with
no horizontal overflow or browser errors. Scoped lint and the isolated
production build passed without private configuration or backend access.

## Wider Save the Date frame and separate wedding-party pages

The latest user requests widen the Save the Date artwork and give Bridesmaids
and Groomsmen their own pages after Secondary Sponsors. All 14 bridesmaids,
10 groomsmen, and eight honor attendants/secondary sponsors retain their exact
names and original order. The invitation now has 17 pages; RSVP still directly
precedes the closing page. The new pages use centered script titles and centered
italic names, with balanced scrollbar gutters and internal scrolling only when
necessary on compact screens.

The built-in ImageGen tool edited the original floral frame into a wider 2:3
composition, keeping antique gold, pale sage, and pastel blossoms. Its central
opening now leaves comfortable space around the live heading. The transparent
WebP is 1024 by 1536 pixels, 354,550 bytes; the exact prompt and reference are in
its asset sidecar. The earlier supplied frame remains available as provenance.
The collage and all confirmed date content remain unchanged. Responsive frame
sizing caps width at 490px and respects the available stage height.

Verified at 320x568, 390x844, 768x1024, and 1440x900. The new pages center the
names under their headings without horizontal overflow. All 14 bridesmaids are
visible on standard phones; keyboard End reaches the last name on compact
phones (70px internal overflow). The wider frame, date, and photo collage fit
all four sizes. Browser console contains no errors. Scoped ESLint, TypeScript,
and the isolated production build passed without private environment access.
Screenshots: `.impeccable/review/christina-date-party/`.
## Our Moments slideshow after the venues

The user's Leslie & Serj reference adds a new Our Moments page immediately
after Reception and before Wedding Timeline. The invitation now has 18 pages;
RSVP still precedes the closing page. A centered 3:4 frame carries complete
prenup photographs, Christina and Reboden in script at opposite corners, a
fixed dimmed beach backdrop, five photo dots, and a visible pause/play control.
Five existing optimized masters are static imports, with a separate existing
beach photograph behind the composition. No new generated artwork is required.
Each foreground photo and its blurred frame fill share the same optimized URL,
quality 85, and responsive sizes. The blurred copy fills spare frame space
without cropping the foreground image or requesting a second image variant.

Client-local `data/slideshow.ts` holds images and timing. The playback hook in
`utilities/usePhotoSlideshow.ts` follows Mario & Inah's stable CSS crossfade:
visited layers stay mounted, new images decode while hidden, outgoing content
stays opaque, and the incoming opacity remains at 1 after transition completion.
Photo requests queue behind an in-progress fade; the latest rapid selection
wins. Manual selection pauses playback. Autoplay also stops outside the active
page, during page folds, behind the contents menu, when the browser tab is
hidden, and for reduced-motion users. Arrow/Home/End keys select photographs
inside the carousel; fixed invitation controls still turn pages. Failed loads
retain the current photograph and offer a retry.

Verification includes standard phone, compact phone, tablet, and desktop layouts;
44px photo controls; keyboard photo selection; rapid selections; pause/resume;
returning to visited photos; and off-page autoplay stopping. A controlled missing
asset in the isolated preview confirmed that the current image remained visible
and retry successfully restored photo 4. The temporarily held preview asset was
restored; shipped source assets were never changed. Two autoplay loops were
captured in 68 painted frames, including two last-to-first transitions. Incoming
opacity did not reverse, and painted-image progress through both wrap transitions
was monotonic. Foreground and blurred-fill URLs match. Reduced-motion behavior
was checked in the code paths and scoped CSS; OS motion preferences were not
changed. The final menu visibility guard is also compiled and checked.

Scoped ESLint, repository TypeScript, and the isolated production build pass.
Checks use no private environment files or Supabase access. Visual evidence and
painted-frame measurements are under `.impeccable/review/christina-slideshow/`.
## Together slideshow after the entourage

The user requested a second slideshow break using Leslie & Serj's full-page
reference. Together is page 15 of 19, immediately after Our Little Loves (the
last entourage page) and before Dress Code. Five additional existing optimized
prenup photographs fill the stage on landscape screens. Portrait phones and
tablets retain the complete photograph over a matching blurred fill so both
people remain visible. Selectors and pause/play sit over a dark translucent
capsule. The original framed slideshow remains after Reception, including its
script corner names, fixed beach backdrop, and responsive frame.

`PhotoSlideshow.tsx` now supports a fullBleed variant and reuses the existing
playback hook. Photos remain data-driven in `data/slideshow.ts`. The two pages
keep independent selection and playback state and only autoplay while active.
Both foreground and blur use the same optimized quality-85 URL and sizes;
new photos mount and decode incrementally. No artwork generation or extra
image masters were needed. Global invitation navigation and event content
remain unchanged; RSVP still directly precedes the closing page.

Verified 320x568, 390x844, 768x1024, and 1440x900. A portrait-tablet crop found in
the initial visual review was corrected to contain mode on portrait screens.
The final check shows both people, accessible 44px controls, and no horizontal
overflow or browser console errors. Confirmed entourage -> Together -> Dress
Code page order, keyboard photo controls, rapid selections, pause/resume,
independent state, off-page autoplay stopping, and the original framed slideshow.
Two autoplay loops were sampled in 65 painted frames. Both last-to-first
transitions had monotonic painted-image progress, no opacity reversals, and no
uncovered frame. Reduced motion and failure handling use the previously checked
shared hook without new changes. Scoped lint, repository TypeScript, and the
final isolated production build pass without private environment or Supabase
access. Visual evidence is in `.impeccable/review/christina-together/`.
## Thinking Out Loud music

The supplied `assets/music/Ed Sheeran - Thinking out Loud (Lyrics).mp3` is now
connected as a content-versioned file under this client's public audio folder.
The source remains unchanged; the public copy matches its SHA-256 and has no
re-encoding. Open invitation starts playback directly within the guest's click,
following Leslie & Serj's browser-activation pattern. The track loops across
pages. Header play/pause has the track title and pressed state; actual media
play/pause events synchronize its icon. A failed/blocked play request leaves
manual playback available. Audio has preload=none and is stopped before opening.

Music playback was verified in the isolated browser: the initial audio had
currentTime 0, readyState 0, and paused=true; after Open it played at readyState 4
with advancing time and no media error. Pausing held its position, and resuming
continued from that position through a page turn. The loop flag is true. The
full track was not played to its end as part of this check. The music control
fits 320x568, 390x844, and 1440x900 layouts without overflow; compact header name
sizing now scales from 22px to 27px. Browser console, scoped ESLint, repository
TypeScript, and the isolated production build pass. No private environment or
Supabase access was used. Screenshot: `.impeccable/review/christina-music/desktop.png`.
## Dedicated hashtag page

The user requested a hashtag page. Share the Love is page 18 of 20, after FAQs
and before RSVP. The exact confirmed hashtag `#DENfoundhisEveryTINg` comes from
`data/wedding.ts`; it is not duplicated in presentation logic. The page reuses
Stationery's ornament and script title, cream damask, the existing rose action
button, and responsive italic serif type for the selectable hashtag. Copy
hashtag uses the Clipboard API with a copied confirmation and a manual-copy
fallback. Contents now has an Our hashtag chapter. RSVP remains page 19,
immediately before the closing page 20.

Verified 320x568, 390x844, 768x1024, and 1440x900: the full hashtag stays readable
without overflow, and the compact Contents menu fits. Clicking Copy hashtag
returned the successful Copied / Hashtag copied UI state; independent clipboard
payload verification through the browser adapter was inconclusive. Confirmed
hashtag -> RSVP -> closing navigation and retained copied feedback on return.
Browser console has no errors. Scoped lint, repository TypeScript, and the
isolated production build pass without private environment files or Supabase
access. Screenshot: `.impeccable/review/christina-hashtag/desktop.png`.
## Save the Date countdown

The user's screenshot requests a countdown on the Save the Date page. A live
four-column days/hours/minutes/seconds timer now sits beneath the floral frame,
using tabular serif numbers and small uppercase labels. The target is the
confirmed ceremony time, January 23, 2027 at 3 PM Philippine time, explicitly
stored as `2027-01-23T15:00:00+08:00` in `wedding.ceremonyISO`. The title, date,
photo collage, and artwork retain their internal positions and proportions.
The frame's viewport-height limit reserves a 44px timer and 12px gap so the
entire composition stays within the fixed page. The page count remains 20.

The client-local countdown follows Aljay & Erlyn's implementation pattern:
a stable server placeholder, non-negative time calculation, updates only on
an active visible page, resynchronization on return, and cleanup at completion.
It replaces the units with Our forever has begun after the target. The timer
has aria-live=off to avoid announcing every second, with a separate completion
status. Date math checks cover the UTC+08 conversion, unit rollover, the last
millisecond before the target, the exact target, and past dates.

Verified ticking seconds, paused updates off-page, and resynchronization on
return within one second of the browser clock. Inspected 320x568, 390x844,
768x1024, and 1440x900. Frame and timer stay inside the stage, separated by 12px,
with no horizontal overflow, overlapping photos, or browser console errors.
Scoped lint, repository TypeScript, and the isolated production build pass.
No private environment files or Supabase access were used. Evidence is under
`.impeccable/review/christina-countdown/`.
## Thin transparent entourage borders

The user supplied `assets/designs/download.jpg` and requested a thinner border
for the entourage, with its white background removed. Built-in ImageGen created
a single slender watercolor vine matching the reference's olive-gold filigree,
sage leaves, tiny pink/lavender-blue flowers, and pink butterflies. It has real
alpha transparency. Excess transparent side canvas was cropped for web delivery;
the optimized 172x2172 WebP is 190,716 bytes. The exact prompt, reference, crop,
and tool provenance are in `entourage-vine-border.webp.json`. The original
reference and generated source remain preserved.

EntourageBorder reuses one content-hashed image at natural proportions, tiled
vertically and mirrored on the right. Side widths scale from 12px to 44px with
8px insets to clear native scrollbar gutters. The border is decorative,
aria-hidden, and pointer-events:none. It replaces the old bottom-corner flowers
only on the seven entourage pages: families, principal sponsors, secondary
sponsors, bridesmaids, groomsmen, bearers, and flowers/furbabies. Names, ordering,
centered columns, internal scroll regions, keyboard access, page turns, and the
20-page count are preserved. No shared/global invitation styling was changed.

Inspected 320x568, 390x844, 768x1024, and 1440x900. Initial compact review found
the right scrollbar masking the outer vine; the final 8px inset fixes this.
All seven pages preserve their 81 names. Measured text-to-border clearance is
positive on both sides, including compact paired bearer groups and the dense
principal-sponsor list. No horizontal overflow or browser console errors.
Desktop and mobile show the cream/damask through the transparent artwork, with
no white rectangle. Scoped lint, repository TypeScript, and the final isolated
production build pass without private environment or Supabase access. Evidence:
`.impeccable/review/christina-entourage-border/`.
## Enchanted blush love-story header

The user's screenshot requests enchanted wedding decoration around the story
portrait and parchment, using the client's blush motif. Built-in ImageGen made
a transparent 3:4 gold portrait surround with blush roses, ivory orchids, sage
leaves and pale pink butterflies, plus a matching blush-ended gold parchment.
The new frame replaces the prior single flower cluster, and the blush parchment
replaces the blue-ended story title scroll only on this page. Original artwork
is preserved. The original optimized couple portrait, live two-line heading,
all seven story paragraphs, #f5e9d8 background, and the 20-page flow remain.

`story-blush-photo-frame.webp` is 900x1200, 276,178 bytes;
`story-parchment-blush.webp` is 900x600, 110,972 bytes. Both preserve generated
alpha and have exact prompts, reference paths, and built-in tool provenance in
their JSON sidecars. Static imports use responsive Next Image selection. The
frame is 125% of the portrait with equal 12.5% outsets; explicit max-w-none keeps
the gold edge outside both faces. Increased top padding prevents clipping, and
the existing parchment position keeps its live heading in the blank center.

Inspected 320x568, 390x844, 768x1024 and 1440x900. The first review caught the
browser's default image max-width constraining the oversized frame; the final
utility corrects this. The final frame and title stay within horizontal bounds
and below the header, with both faces unobstructed. There is at least 14px
between decoration and story copy. All images load, all seven paragraphs remain,
and keyboard End reaches the final paragraph in the compact reading region.
No horizontal overflow or browser console errors. Scoped lint, repository
TypeScript, and the final isolated production build pass without private
environment or Supabase access. Evidence: `.impeccable/review/christina-blush-story/`.
## Removed recurring lower-right flower

The user requested removal of the repeated lower-right `flower-design.webp`
decoration from each page. Its render is removed from the shared client page
composition, along with both obsolete cornerFlowers selectors and the unused
media import/export. The source file remains as provenance for earlier generated
artwork. The venue decorations, entourage side borders and blush story frame
are individual artwork and remain in place. The page count stays 20.

Verified the cleaned hashtag page on 390x844 and 1440x900 and the desktop RSVP
page. The original flower image is absent from rendered DOM and code references;
there is no horizontal overflow or browser console error. Scoped lint and the
isolated production build including type checks pass. No private environment
files or Supabase access were used. Evidence:
`.impeccable/review/christina-no-corner-flower/desktop.png`.
## Borderless slideshow and 3-second cycle

The user requested removal of the photo border and play/pause button and a
3-second duration. Our Moments now has no opaque photo-box background, shadow,
or blurred side-fill. Its photographs remain fully visible over the beach
backdrop. Each fading layer includes an aligned crop of the same page backdrop,
using the same optimized image URL; this makes empty photo margins invisible
while keeping the incoming crossfade fully opaque over the outgoing image.
The alignment accounts for the 40px photo/control gap and 44px control height.

Both slideshows now have exactly five photo dots with no separate playback icon.
The active dot toggles pause/resume using an accessible name and keyboard action.
Manual selection still pauses, and hidden pages, menus, hidden tabs and reduced
motion continue to stop autoplay. The interval is 3000ms, measured from the
incoming slide change rather than after its 900ms fade. Loading/decoding failure
still retains the current photo; slow decoding may defer a reveal until ready.

The first timing review exposed a rapid-selection stall when a queued selection
returned to a just-retired opaque layer before its hidden style was flushed.
The hook now retains layer refs and flushes the hidden style before promotion.
The final rapid 5 -> 1 -> 5 selection resumed successfully through 1 and 2.

Verified 320x568, 390x844, 768x1024 and 1440x900. Backdrop slices align to the
page at each size; the photo slot has no shadow, and each carousel contains
five dot buttons with zero button icons. No horizontal overflow or console
errors. Sampled 65 painted frames across two wrap transitions: no opacity
reversals or uncovered frames; painted-image progress was monotonic. Cached
slide-onset intervals measured 2960-3055ms. Together also advances using the
same 3-second timer; one cold decode deferred its next reveal. Scoped lint,
TypeScript, and the final isolated production build pass without private
environment files or Supabase access. Evidence and timing/paint measurements:
`.impeccable/review/christina-borderless-slideshow/`.
## Portrait-only Our Moments

The user requested no landscape images in the portrait slideshow. Removed
shorelineSmile and seasideEmbrace from slideshowPhotos and deleted their unused
imports. Our Moments now contains only dsc06605, dsc06116 and dsc06236: all three
supplied photos have portrait source dimensions. The separate Together collection
and the fixed beach backdrop are outside this foreground-photo change. The
borderless presentation and 3-second timing remain, with three matching dots.

Verified a complete 1 -> 2 -> 3 -> 1 autoplay loop on 390x844. All three loaded
foreground images report natural width smaller than height. Checked desktop at
1440x900, three dot controls, no overflow, and no browser console errors. Scoped
lint and the isolated production build including type checks pass without private
environment files or Supabase access. Evidence:
`.impeccable/review/christina-portrait-only/desktop.png`.
## Tap the envelope to open

The user requested removing the separate opening button and opening directly
from an envelope tap. The envelope artwork is now the only opening target,
without button chrome or an initial automatic focus outline. It retains an
accessible Open invitation name and native keyboard activation. A small italic
Tap the envelope to open hint replaces the rose CTA and arrow below the date;
it changes to Opening your invitation during the transition. Repeated activation
is guarded and disabled, and the direct user gesture still starts the music.
The existing cover handoff, artwork, monogram, and 20-page invitation remain.

Verified 320x568, 390x844, and 1440x900 layouts: envelope and hint stay visible,
with no border/background rectangle or horizontal overflow. Pointer activation
opens the invitation and starts music; Enter activation does the same on desktop.
The opening target is disabled during animation and removed after the handoff.
No browser console errors. Scoped lint and the isolated production build with
type checks pass without private environment files or Supabase access. Evidence:
`.impeccable/review/christina-envelope-open/`.
### Soundtrack card refinement
Replaced the header playback icon with the supplied floating soundtrack-card
pattern: ivory card, song and artist, status, double-ring play/pause, and a
circular music-note disclosure. Thinking Out Loud by Ed Sheeran continues using
the supplied MP3 and envelope gesture. Outside click and Escape dismiss the
card; Escape returns focus. Short phones place the note in the header and open
the card downward so the countdown and forms remain clear.

Verified 320x568, 390x844, 768x1024, and 1440x900 placement; actual audio
play/pause/resume, dismissal, focus return, and preserved playback state across
page navigation. No console errors. Scoped ESLint, TypeScript, isolated production
build, and diff whitespace checks pass. No private environment files or Supabase
access. Evidence: `.impeccable/review/christina-soundtrack-card/`.

### Forward page-turn petal breeze
Added a sparse blush-rose petal sweep to the existing forward fold. The effect
uses a generated transparent 96px lossless WebP, twelve deterministic paths on
desktop and eight smaller paths on mobile. CSS transform/opacity animations run
once for 1100ms with up to 130ms stagger, ending before the 1250ms fold. The
forward transition owns mounting and cleanup; no extra timer or state is needed.
The decorative field ignores input and is hidden from assistive technology.
Reduced motion skips mounting and has a CSS fallback; backward turns stay plain.

Verified actual painted frames on 390x844 and 1440x900: image loaded during the
cold first turn, 8/12 visible petals, visible rotation/drift and fade, no input
interception or overflow, and complete cleanup. A backward turn has no petals;
two rapid ArrowRight presses advance only one page and restart one effect.
No console errors. Scoped lint, TypeScript, isolated production build, and diff
whitespace checks pass. Reduced-motion behavior was checked in code; the browser
adapter does not expose media-preference emulation. Proof:
`.impeccable/review/christina-page-petals/`.

### Minimal copy hashtag action
Removed the filled rose button treatment from the hashtag copy action. A fine
14px copy icon and subtly underlined text sit directly on the cream page. The
44px tap target, focus treatment, clipboard behavior, success feedback, and
manual-copy fallback are preserved. Styling uses JSX utilities only.

Verified mobile 390x844 and desktop 1440x900, transparent background, no border,
44px control height, and successful Copied feedback. No console errors. Scoped
lint, isolated production build with type checks, and whitespace checks pass.
Evidence: `.impeccable/review/christina-minimal-copy/`.

### Leslie & Serj RSVP stationery treatment
Applied their separate ornamental script plaque and ivory form panel, adapted
to Christina & Reboden's existing blush photo wash, antique gold, and rose action.
The panel stays within 560px; a small gold ornament interrupts the plaque's top
border. Typography, card padding, and uppercase submit styling follow the
reference. Existing deadline, two preview steps, conditional dietary field,
validation, editing, and explicit no-save notice remain. A focused internal RSVP
reading region keeps short-phone controls reachable. No shared components,
backend integrations, admin records, or private credentials were changed.

Verified 390x844, 320x568, 768x1024, and 1440x900 layouts, name validation, both
preview steps, attending and declined paths, preview completion, and editing.
Short-phone overflow stays inside the RSVP region; wider screens fit without
scrolling. No horizontal overflow or console errors. Scoped lint, TypeScript,
isolated production build, and diff whitespace checks pass. Evidence:
`.impeccable/review/christina-rsvp-stationery/`.

### Clean entourage side margins
Removed the floral-and-butterfly side vines from all seven entourage pages.
Deleted the unused EntourageBorder component, removed its render condition and
media import/export, and removed the three decorative pseudo-element rules.
The original artwork and prompt sidecar remain as source material only. Names,
headings, columns, background, scrolling regions, and navigation are unchanged.

Visited all seven entourage chapters: no side-decoration nodes or horizontal
overflow. Confirmed painted layouts on mobile 390x844 and desktop 1440x900.
No console errors. Scoped lint and isolated production build with type checks
pass. Evidence: `.impeccable/review/christina-clean-entourage/`.

### Elegant entrances and five-image Our Moments
Added an explicit reveal marker to content across the opening and all twenty
pages. A scoped observer prepares each atomic composition before activation,
then reveals it once at 12% visibility inside the active page. Internal scroll
regions also trigger reveals. CSS uses 850ms ease-in-out opacity, an independent
24px translate, and 120ms staggers capped at 600ms. Fold geometry, child
transforms, backgrounds, and existing slideshow crossfades retain ownership of
their properties. Persistent visible states prevent cleanup flashes. Keyboard
focus settles content immediately, while pointer focus avoids moving a button
between pointerdown and click. Reduced motion and missing IntersectionObserver
fall back to visible content; hidden documents settle running effects.

Our Moments now has five portrait-format images, adding the supplied dsc06519
and dsc06519-1 three-photo collages. Five dots follow the data collection; the
3-second timing, decode-before-reveal, 900ms crossfade, borderless composition,
and separate Together collection remain.

Verified actual painted mobile entrance frames and computed progression from
24px/opacity 0 to no translation/opacity 1, including 120ms stagger intervals.
Visited all twenty pages on desktop: every chapter had prepared groups, zero
visible-but-pending groups, and no horizontal overflow. Story paragraphs stayed
pending below view, entered when scrolling, settled at the end, and stayed
visible when returning. Checked compact RSVP step changes, keyboard-focus
visibility, preview completion, and a direct fifth-photo tap during entrance.
All five images loaded, retained portrait dimensions, and autoplay wrapped to
the first image. Reduced-motion and observer-fallback branches were checked in
code; the browser adapter lacks media-preference emulation. Scoped lint,
TypeScript, and the isolated production build pass without private credentials
or backend access. Evidence: `.impeccable/review/christina-entrances/`.

### Restrained petal refinement
Replaced the twelve/eight-petal wide sweep with six desktop and four mobile
petals following short curved arcs. Horizontal drift caps at 160px and vertical
fall at 44px. Varied low-angle tilts replace 145–240-degree spins and the broad
3D flip; opacity peaks at .45–.64. Each glide lasts 1030ms with up to 150ms
stagger, so the final fade completes before the unchanged 1250ms fold. The
existing transparent sprite is reused. Pointer and reduced-motion behavior stay
intact; no new assets, dependencies, or animation state were added.

Inspected painted mobile and desktop frames: four/six petals, curved movement,
soft fades, minimal tilts, and an opaque page fold. Confirmed capped desktop
travel, zero remaining petals after the turn, no backward-page effect, no
horizontal overflow, and no console errors. Scoped lint and isolated production
build with type checks pass. Reduced-motion fallback checked in code. Evidence:
`.impeccable/review/christina-elegant-petals/`.

### Single-line monogram and fuller petals
Changed the envelope's stacked C, ampersand, and R into a single centered flex
baseline. Typography now follows the envelope's inline-size container at 28cqw,
with a smaller ampersand and no compact-screen font override. Centered the line
within the ivory label. Expanded the existing curved petal sweep to fourteen
paths on desktop and ten on mobile, retaining low opacity, small tilts, and the
160px/44px travel caps. Stagger reaches 170ms and fades finish within 1200ms,
before the unchanged 1250ms fold. No new assets or state were introduced.

Verified 390x844 and 320x568: monogram text stays within the envelope on one line
with no horizontal overflow. Reviewed desktop opening, keyboard activation, and
painted fourteen/ten-petal turns. Confirmed all petals fade and are removed after
the turn; no console errors. Scoped lint and isolated production build with type
checks pass. Evidence: `.impeccable/review/christina-monogram-fuller-petals/`.

### Still photo after the love story
Added Our love as page 4 of 21, directly between Our love story and The ceremony.
PhotoBreakSlide uses the existing optimized dsc06556 beach image, the established
full-page photo styling, and the shared entrance/fold behavior. Portrait screens
show the whole photograph over a blurred fill; landscape screens fill the page.
Both layers use the same responsive quality-85 URL. No photo controls, timers,
new artwork, or dependencies were added. The chapter menu still groups the
story/photo pair under Our love story, and the page counter derives 21 from data.
RSVP remains immediately before the closing page.

Verified story 3/21 -> photo 4/21 -> ceremony 5/21 and backward navigation.
Inspected mobile and desktop layouts, loaded foreground/backdrop images with an
identical optimized URL, contain/cover behavior, and no horizontal overflow or
console errors. Scoped lint and isolated production build with type checks pass.
Evidence: `.impeccable/review/christina-story-photo/`.

### Full photo after FAQs
Added Hand in hand as page 19 of 22, immediately after FAQs and before the
hashtag page. The optimized dsc06542 hand-holding photo uses a centered full-cover
crop on mobile and desktop. PhotoBreakSlide now accepts typed photo/title data
and a fullBleed option; the existing story break retains its adaptive treatment.
The new cover page uses one responsive quality-85 image with crop-aware sizes,
no background duplicate, no photo controls, and the established entrance/fold.
Navigation counters derive 22 from data; RSVP remains the penultimate page.

Verified FAQs 18/22 -> photo 19/22 -> hashtag 20/22 and backward navigation.
Inspected portrait and landscape framing with the hands and ring in view, full
page-height image coverage, one loaded image, no horizontal overflow, and no
console errors. Scoped lint and isolated production build with type checks pass.
Evidence: `.impeccable/review/christina-faq-photo/`.

### Household search and one-form RSVP
Replaced the two-step preview with full-name search, explicit matching-household
selection, and one inline reply form containing every invited guest's attendance,
conditional dietary notes, and one optional household message. The blush photo,
ivory panel, and ornamental heading remain. Components under components/rsvp
separate presentation and local flow; data/rsvp-preview.ts contains explicitly
fictional household fixtures. The pure search helper reuses the repository's
normalizer and shared RSVP types. No database IDs, network calls, credentials,
admin records, or persistence were introduced.

Verified exact-name and empty searches, first/last-name validation, household
selection, required guest answers, attendee dietary fields, local completion,
editing, same-household draft retention, and different-household reset. Mobile
390x844 and 320x568 preserve internal scrolling and fixed navigation with no
horizontal overflow; desktop reviewed at 1280x720. Five pure local tests, scoped
ESLint, TypeScript, and isolated production build pass. Console has no errors.
Evidence: `.impeccable/review/christina-household-rsvp/`.

### Different photo after FAQs
Replaced dsc06542 (already represented in Save the Date) with the previously
unused optimized dsc06549. The page label is now You & me; its existing internal
id remains stable. The full-cover frame, responsive quality-85 sizing, lazy
loading, entrance, and fold are retained. An 18% horizontal focal point keeps
Reboden's face visible in portrait phone crops. The original photo remains in
the asset collection; no new source assets were added.

### Seven images in both slideshows
Added the two remaining collages to Our Moments and dsc06057/dsc06069 to Together,
excluding the four unused files with Save the Date similarities. Each collection
now contains seven images and seven selectors. Mobile selectors use 40px targets
so all seven fit at 320px; desktop retains 44px. Both pages share the unchanged
3000ms interval and 900ms fade, with decoding before reveal and an opaque outgoing
layer. Static imports reuse existing optimized source assets; no dependencies,
custom image loaders, or playback changes were introduced.

Verified all four new images, seven selectors, phone and desktop compositions,
no horizontal overflow at 320x568, manual selection, resume, and seven-to-one
autoplay wraps. Observed first-gallery advances about 3 seconds apart; both use
the same timer. Console error log is empty. Scoped ESLint and the isolated Next
production build/type check pass. Evidence: `.impeccable/review/christina-seven-slides/`.

### Complete photo break and closing photo exchange
You & me now opts into showWholePhoto on PhotoBreakSlide: object-contain on
every viewport, a centered complete photograph, and a matching dimmed blurred
fill. Foreground and background share one quality-85 responsive URL; contain
sizes follow the smaller of stage width and ratio-adjusted stage height. The
earlier story break retains its adaptive fit and navigation is unchanged.

Moved the former closing photograph dsc06623 into Together as its eighth image.
The closing page now displays collage-and-corrections, keeping its entire
composition with object-contain and a source-ratio frame. Our Moments remains
at six images after the requested collage removal. Together uses 36px phone
selectors so eight fit at 320px; desktop targets remain 44px. Both galleries
retain the shared 3000ms interval and 900ms crossfade.

Verified complete You & me framing on phone and desktop, a 640px responsive
phone image versus 1080px desktop image, the full closing collage at 390x844
and 320x568, the eighth Together photograph, and all eight selectors within
320px without horizontal overflow. No console errors. Scoped ESLint, repository
TypeScript, and isolated production build pass. Evidence:
`.impeccable/review/christina-photo-swap/`.

### Client revision document November 11
Applied Wedding_Website_Revisions.docx by section name, preserving the current
22-page order despite the document's older page-count description. Corrected
Jaykay in the story, Hazel Jane Paña, Joe Mari Mendoza, Ray Marko Delen, Caily
Vianna San Juan, and Bride’s flower girls. Existing unrelated names and event
details remain unchanged.

Replaced timeline heading and event calligraphy with Noto Serif. Container width
and height now govern type size, seal size, and header padding, retaining the
eight equal rows while avoiding crowding in short laptop windows. The 1280x600
confirmation measured every event paragraph shorter than its row, including
all multiline entries. Confirmed the same at 320x568.

Added full-length Ninong and Ninang attire examples. Reused the existing barong
illustration, generated transparent gray and dusty-blue gown edits with built-in
ImageGen, and optimized each to 451x640 WebP at quality 85 (38KB/40KB). Exact
prompts and source paths are in adjacent .webp.json sidecars. The guest ladies'
gown now uses dusty blue; all palette swatches, restrictions, and the closing
attire note remain in the existing keyboard-scrollable reading region.

Verified corrected copy in rendered story/entourage pages, timeline at laptop
and compact mobile sizes, loaded attire illustrations at 1440x900 and 390x844,
and keyboard access to the entire dress-code reading region. No horizontal
overflow or console errors. Scoped ESLint, repository TypeScript, and the
isolated production build pass without private environment files or backend
access. Evidence: `.impeccable/review/christina-client-revisions/`.

The dress-code reading region reserves 48px below its closing note so the note
can enter the reveal observer's viewport before the scroll limit. Confirmed at
390x844 after End: opacity 1, no residual translation, and the full note visible
above the fixed footer. No shared animation behavior was changed.
