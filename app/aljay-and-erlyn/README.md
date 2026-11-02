# Aljay and Erlyn

Draft route: `/aljay-and-erlyn`. Wedding: **18 December 2026**. Arrival: **2:30 PM**; ceremony: **3:00 PM** at Holy Family Parish Church, Parang, Marikina. Reception follows at Teodore Events Place. RSVP deadline: **8 November 2026**.

## Design

At the owner's request, this invitation copies Leslie and Serj's stationery design: Anastasia headings, Noto Serif body text, textured ivory pages, woodland backdrops, framed olive entourage pages, formal names, and transparent previous/next pagination. The same existing font files and woodland artwork are reused without duplicating assets. The owner-supplied `assets/design/wedding-log.png` is used over the generated whimsical garden background on the opening cover, while `wedding-logo-green.png` is used on the ivory invitation page. The cover crossfades the two supplied variants inside one moving wrapper before handing off to the stationary green logo. Direct chapter links use a fade when that destination is absent.

The exact diagonal page-fold geometry and 1.25-second timing remain. Keyboard navigation, mobile chapter links, swipe navigation, focus transfer, scroll fallback and reduced-motion branches are retained. The duplicate closing RSVP button, chapter dropdown, gift copy buttons, decorative captions and redundant code comments were removed. Essential opening, page, map, slideshow and form controls remain.

Refreshing restarts at the opening cover and first invitation page, clearing the previous chapter hash while preserving the route and query string. Fresh direct chapter links still open their requested chapter after the cover.

## Content

`data/wedding.ts` and `data/entourage.ts` hold confirmed content. The original brief and later chat confirmations take precedence over conflicting PDF details:

- Bride: **Erlyn Joy E. Sablay**. Groom: **Alfred John Gorgonio**.
- Dress code: **Casual, Semi-Formal, and Formal**.
- Color request: **Please avoid: All yellow, All Green, White, Black, and Red**.
- RSVP deadline: **8 November 2026**.

The confirmed timeline is 2:30 PM Guest Arrival, 3:00 PM Ceremony, 5:00 PM Cocktail Hour, 6:00 PM Reception Dinner and 9:00 PM After Party. The schedule may change accordingly. The hashtag remains pending. The couple's 10 real photographs are uploaded to R2 and publicly verified. The supplied Spring Snow by 10CM MP3 is served from `/aljay-and-erlyn/music/spring-snow.mp3`. It starts from the guest's opening gesture, loops at 40% volume, and has a floating play/pause control. The audio uses `preload="none"`; playback errors can be retried.

## Files and assets

- `page.tsx`: metadata and locally loaded fonts.
- `components/Invitation.tsx`: opening state, chapter composition and navigation.
- `components/OpeningCover.tsx`, `BookLeaf.tsx`, `utils/page-fold.ts`: opening and page transitions.
- `components/Stationery.tsx`, `WoodlandBackdrop.tsx`: stationery artwork.
- `sections/`: invitation content, entourage, attire, FAQs and countdown.
- `components/PhotoSlideshow.tsx`, `usePhotoSlideshow.ts`, `data/photos.ts`: incremental, decoded CSS crossfades using the couple's 10 supplied photographs. R2 filenames, dimensions, descriptions and focal points are centralized in `data/photos.ts`.
- `styles/`: scoped visual styling; simple layout uses JSX Tailwind utilities.

Us uses a portrait frame with names on opposite corners. Together fills the page. Quality 85, measured responsive image sizing, outgoing-layer retention, manual photo selection, keyboard controls and failure recovery are preserved. Images mount incrementally rather than fetching the entire gallery initially. Each gallery contains five real photos. The galleries use `https://assets.moderninvites.com/aljay-and-erlyn/images/prenups/`. All 10 public files returned HTTP 200 with the expected dimensions and matching SHA-256 checksums. See `docs/media/r2-photo-upload.md`, `prenup-optimization.json` and `r2-prenup-verification.json`.

The source PDF provides attire illustrations, entourage, original QR images and guest policies. The supplied `laced-church.png` and `laced-reception.png` are used on the venue pages with their complete lace frames and flowers. The gifts page and payment details have been removed at the owner's request. Original QR images and the earlier generated garden artwork remain unused source assets.

## Countdown

The book has 16 chapters. `#countdown` is page 14, followed by RSVP on page 15 and the closing page on page 16. The mobile chapter menu and previous/next controls use the same chapter list.

`wedding.ceremonyISO` is `2026-12-18T15:00:00+08:00`: the confirmed 3 PM ceremony in Philippine time. `sections/CountdownPage.tsx` composes the artwork, date and timer; `components/WeddingCountdown.tsx` owns the one-second clock, and `utils/countdown.ts` contains pure time calculations. The clock uses absolute timestamps, pauses interval updates when hidden or inactive, resyncs on visibility changes, stops at zero, and shows “Our forever has begun.” after the target. Timer updates are not announced every second to screen readers.

Timezone, unit rollover, subsecond, exact-deadline and past-deadline assertions passed. The live clock, 16-entry menu, adjacent closing page, responsive layouts at 320/390/768/1280px, and a synthetic expired-date preview were checked. The synthetic date was confined to the isolated preview; the shipping ceremony date remains December 18, 2026. Scoped ESLint, repository TypeScript and the isolated production build passed. The built countdown page was also reviewed with the actual ceremony date and no console errors.

## RSVP

The RSVP follows Leslie and Serj’s compact name-entry card and separate native reply dialog. The local preview validates attendance and optional email, shows a reply summary, and supports editing, Escape, close, and focus restoration. Nothing is matched against a guest list, sent, or persisted; notices and button wording disclose that limitation. The existing optional email, dietary needs, and message fields are preserved. Do not enable `wedding.rsvp.enabled` or fill `eventSlug` until the owner creates the approved admin record. The gated live branch reuses shared SmartRsvpFlow with name search and unlisted replies disabled. No database IDs or endpoints were invented.

Do not read or load real environment files or access Supabase. Preview/build checks must use an isolated copy without environment files, API routes or middleware. Live RSVP and admin configuration remain for the owner.

## Revision verification

The design-copy revision passed targeted ESLint, repository TypeScript checking and an isolated production build. All 15 chapters were reviewed at 1280 x 720 and 390 x 844; 768 x 1024 and 320 x 568 layouts were also checked. No horizontal overflow or console warnings/errors were observed. Longer RSVP and gift pages retain a scroll fallback. The production opening kept the underlying book hidden until handoff; local RSVP preview and native FAQ controls were exercised with synthetic data. Live RSVP, payments, audio, iOS Safari and OS reduced-motion settings were not tested.

The love story chapter uses olive green `#5a6946`, one larger bridge portrait, an ivory flower-and-ribbon accent, and the supplied ornamental `story-title-frame.png` overlapping the photo’s lower-right edge. The title reads “Our Love” above “Story” in olive Anastasia, matching the owner’s latest reference. The three confirmed paragraphs remain centered in Noto Serif, without a separate name signature below. `sections/StoryPage.tsx` owns the layout and reuses `storyPhoto` from `data/photos.ts`. The original bow remains an unused source asset.

The ceremony and reception now occupy consecutive chapters, bringing the book to 16 pages. Each uses `sections/VenuePage.tsx` with its own supplied lace artwork, venue details and map link. The outer double border remains removed, and each page has larger responsive artwork up to 300 px tall. Existing `#venues` links resolve to `#ceremony`; both new chapters appear in the mobile menu, and the desktop venue link stays active on either. Compact screens retain vertical scrolling.

Timeline times and event titles share the same grid row with vertical center alignment. Descriptions occupy the row beneath their corresponding title.

The split-venue/schedule revision passed scoped lint/type checks and an isolated production build. Ceremony, reception and timeline were inspected on desktop, tablet, standard mobile and compact-phone layouts. The legacy venues hash resolves to ceremony, the mobile menu contains 16 chapters, previous/next and Home/End navigation use the new page count, and refresh returns to page 1. All five timeline time/title pairs have matching row centers; the short-screen schedule retains keyboard scrolling. No browser console warnings/errors or horizontal overflow were observed.


The music integration passed scoped ESLint, repository TypeScript and an isolated production build. Local browser verification confirmed silence before Open, playback from keyboard activation of Open, pause/resume, looping configuration and continuous playback across chapter changes with one audio element and no media error. The control was checked on mobile and desktop. Physical speaker output, end-of-track loop timing and iOS Safari were not tested.

The RSVP name-entry/dialog revision was checked at 1280 × 720, 768 × 1024, 390 × 844, and 320 × 568. Required attendance, both reply choices, optional fields, summary/editing, Escape/close, focus restoration, and keyboard isolation from chapter navigation were exercised with synthetic data. The dialog scrolls independently; mobile music controls sit beside the footer controls to avoid covering the form. Targeted ESLint, repository TypeScript, and the isolated production build passed. Browser console had no errors; Next reported an existing woodland-background LCP priority warning. No guest-list requests or submissions were made.

Both venue pages now use the owner-supplied `assets/design/venues-bg.png` olive damask at its natural repeating size, without woodland shading or paper grain. Ceremony and reception details, artwork alignment, and pagination are preserved. Checked both pages on mobile and desktop, plus tablet and compact-phone sizing; no horizontal overflow or browser console errors were observed. Targeted ESLint and repository TypeScript passed.

The owner requested removal of “A Note on Gifts.” Its component, payment data, chapter entry, and unused account styling are removed. The book now has 15 chapters; the dress-code page leads directly to FAQs. Mobile chapter links, sequential navigation, and displayed totals derive from the same chapter list. Targeted ESLint, repository TypeScript, and isolated chapter-data assertions passed.

The opening screen uses `assets/design/whimsical-garden-background.png`; its exact generation prompt is saved alongside it. The prompt uses dark olive for contrast against the lighter artwork. Mobile, tablet, desktop, keyboard opening, opaque cover handoff, and refresh restart were checked in an environment-free local preview. Targeted ESLint and repository TypeScript passed.

The stacked-photo story revision was checked at 390 × 844, 360 × 800, 320 × 568, 768 × 1024, and 1280 × 720. The title label stays inside the viewport; standard phone, tablet, and desktop layouts fit without scrolling, while compact screens retain vertical scrolling. Crop/layout checks used exact local optimized exports after a transient optimizer timeout; the added public R2 photo subsequently returned HTTP 200 and matched the prepared SHA-256. Source URLs remain on R2. Targeted ESLint, repository TypeScript, and the isolated production build passed.

The story page now uses one larger suspension-bridge portrait instead of two small square photos. The floral accent and title label remain, with responsive sizing and compact-screen scroll fallback. Scoped lint, repository TypeScript, and mobile/desktop layout checks passed.

Venue artwork now fades, rises, and gently scales into place after its image is decoded and the page turn finishes. The entrance lasts one second and uses zero duration with reduced motion; it adds no navigation lock. VenuePage owns the image and detail reveals: its artwork entrance completes before the details fade in over 0.55 seconds. The generic page text reveal no longer targets venue details. Hidden details are inert and excluded from the accessibility tree, while reception centering stays on the inner image. Cold/cached entrances, forward/back navigation, final opacity/transform persistence, reception alignment, and mobile/tablet/desktop layouts were checked without console errors. OS reduced-motion settings were not exercised. Scoped ESLint and repository TypeScript passed.

The RSVP title now uses the supplied ornamental frame through shared `FramedHeading`, replacing the earlier CSS plaque and ornament. “Kindly Reply” stays on one line. Checked mobile, tablet, desktop, compact-phone scrolling, local name-entry/dialog opening, and the existing two-line story title. Scoped ESLint and repository TypeScript passed.

The four entourage chapters use the supplied `assets/design/entourage-floral-bg.png` with hanging ivory flowers. The artwork is top-aligned at 40% opacity over deep olive #30391f, with fully opaque ivory text and the existing decorative frames. The source PNG is unchanged; the earlier texture remains unused source artwork. All four pages were reviewed on mobile, plus desktop godparents and tablet/compact layouts; no horizontal overflow or console errors were observed. Scoped ESLint and repository TypeScript passed.

The image-first venue sequence was verified on mobile and desktop, including a deep-linked opening and forward/back page turns. Intermediate painted frames showed the image visible with details still hidden; final artwork/details reached full opacity, with no horizontal overflow or console errors. Navigation remains available during the entrance. Scoped ESLint and repository TypeScript passed. OS reduced-motion settings were not exercised.

The story now uses a downward ease-in entrance after opening/page-turn completion: photo and title first, then individual paragraphs in reading order, with 0.65-second entrances and a 0.18-second stagger. Reduced motion skips animation and stagger. Mobile intermediate painted frames confirmed the ordered fade and downward movement; mobile and desktop final states retained full opacity and no transforms, without horizontal overflow or console errors. Scoped ESLint, repository TypeScript, and diff whitespace checks passed. OS reduced-motion settings were not exercised.

The floral entourage background and deeper olive treatment were reviewed on mobile and desktop. Text remains fully opaque while the artwork renders at 40%; no horizontal overflow or console errors were observed. Scoped ESLint and repository TypeScript passed.

The countdown header now uses `olive-oval-aljay-erlyn-seaside.png`, the zoomed seaside couple composite, in place of the small ribbon flower. Responsive 140–220px image height, tighter gaps and a 34–44px heading keep the composition balanced. Checked 390 × 844 mobile, 1280 × 800 desktop and 320 × 568 compact-phone layouts: the image loaded, timer continued updating, no horizontal overflow or console errors occurred, and the compact page retained vertical scrolling. Scoped ESLint and repository TypeScript passed.

The countdown title now reads “Counting down to forever” on one line, with a 24–44px responsive font size. Verified at 320px, 390px and 1280px widths with no clipping, horizontal overflow or console errors. Scoped ESLint and diff whitespace checks passed.
