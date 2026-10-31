# Joy and Rolly

Invitation route: `/joy-and-rolly`.

Built from the supplied Ms. Joy P Classic Bundle wedding questionnaire. Confirmed names, date, venue addresses, timeline, entourage, RSVP deadline, and attire are in `data/`. The embedded bouquet reference supplies plum `#5B1962`, lavender `#8288BE`, and powder blue `#A4CFFA`. No couple photographs, hashtag, music, or personal story were supplied; none are invented.

## Pending content

- The seat-finder button is deliberately disabled and has no URL or action; the user will connect it. The section currently precedes RSVP because this invitation has no FAQ section yet.
- Principal sponsor #6 is incomplete (only “Mr and Mrs”); omitted from the page.
- Bridesmaid #6 is blank; omitted from the page.
- Confirm the draft and the spelling of all names before publishing.

## RSVP integration

`components/RsvpForm.tsx` reuses the shared minimal `SearchStep` and `OpenRsvpForm` in a centered, name-first layout, matching the other invitations. A single “Kindly reply” heading replaces the separate introduction, with the deadline below the form and one brief preview notice per stage. Name entry is validated locally and opens a sample response form; it does not look up a guest list. Sample replies explicitly remain unsent and unsaved.

The draft adapter sends no network requests and creates no event/guest records. It uses individual replies with name, attendance, optional contact number, and optional email; the final access mode and fields must follow the user's eventual admin configuration.

After the user creates the admin-side event, confirm its slug and access mode, then replace the local draft adapter with the established shared `SmartRsvpFlow` using that configuration. Do not remove `preview` while retaining `previewReply`. No credentials or Supabase access are needed to develop this draft.

## Implementation

Text throughout the invitation uses the client-local `InvitationReveal` wrapper for once-only 8px upward fades. Countdown text, section introductions, venue details, entourage roles/names, attire guidance, seat-finder copy, the RSVP panel, and footer are covered. The hero keeps its existing opening reveal. Related text uses short delays; repeated form/countdown updates stay still, and reduced motion or keyboard focus shows content immediately.

`sections/SeatFinderSection.tsx` adds a lavender section with an ivory bordered panel, script heading, existing floral corners, and an unlinked “Find My Seat” button. Its navigation entry uses the local `#seat-finder` anchor; no seating data, endpoints, or configuration are created.

Hero flowers sway slowly through a client-local `HeroFlorals` layer. Scoped CSS uses 9–11 second alternating cycles with 0.8–1.1 degree rotation and 2–5px travel; names and event text remain still. Motion starts after the envelope handoff, pauses offscreen or when the document is hidden, and is removed for reduced-motion preferences. The sunset hero retains both colored bouquets and its lower-right botanical drawing.

The RSVP flowers anchor to the full-width section's outer edges around the unchanged centered form. At 1280px and wider, the upper-right spray grows to 480px and the lower-left spray to 520px, with responsive image sizing and clipped edges. The timeline retains its existing decoration sizes.

The Wedding Entourage now uses the user's blue floral pattern at 6% opacity on a separate background layer. Text remains fully opaque, with the existing names, grouping, and content width preserved. Phone, tablet, and desktop layouts were reviewed with no horizontal overflow; conservative text contrast exceeds 8:1. The source pattern and provenance are client-local.

The attire color legend remains in one three-column row on mobile. Compact 36px phone swatches and smaller group labels fit Team Bride, Team Groom, and Neutral side by side; larger screens retain 64px swatches. Text and paired swatches can wrap under enlargement without horizontal overflow. Phone widths from 320px to 430px, desktop, and 200% text were reviewed.

The venues background uses the supplied embossed-floral image through scoped CSS and an optimized local WebP. It spans the section width while the existing content width, framed photos, and floral corners remain aligned. The background was reviewed at 320px, 390px, 768px, and 1440px, with successful loading and no horizontal overflow. Source provenance is in `assets/PROVENANCE.md`.

The ceremony and reception Google Maps buttons have been removed at the user's request. Venue names, times, addresses, photos, and decorative frames are still displayed.

Both venue photos use double-line plum/lavender framing, a light paper mat, and a small watercolor accent on the lower-right rim. Photo windows keep their 4:3 crops, with responsive `sizes` adjusted for padding and border width. Layouts were reviewed at 320px, 390px, 768px, and 1440px with no horizontal overflow; scoped lint passes.

The venues section uses the user's supplied lavender artwork at upper-left and bottom-right through `assets/venue-lavender-corner.webp`. The decorations anchor to the full section's outer edges, with the upper flower lifted 32px and the lower flower raised 32px on phones / 48px on desktop. The clipped decorative layer preserves transparency without horizontal overflow. Phone and desktop layouts were reviewed; venue content and photo frames are preserved.

New watercolor floral sprays decorate the timeline and RSVP corners. One client-local transparent WebP is reused with responsive sizing and lazy loading through `SectionFlorals`; decorative layers are isolated, clipped, behind content, and pointer-transparent. Chromium checks at 320px, 390px, 768px, 1440px, and 200% text confirm all eight new decorations load with no horizontal overflow or page errors, and RSVP inputs remain focusable. Scoped lint and isolated type checks pass. Prompt and provenance are in `assets/PROVENANCE.md`.

The timeline follows the supplied layout reference with the user's later adjustment: a compact centered group with each time below its icon on the left, a vertical rail and markers on the page axis, and event titles on the right. The configured wedding date appears below the script heading. The five entries show only the confirmed times and concise labels: Guest Arrival, Ceremony, Cocktail Hour, Reception Dinner, and After Party. Extra descriptions are removed; each data entry retains its decorative Lucide icon.

Main section titles use the existing Imperial Script face, with responsive 48–72px sizing and a 1.2 line height. Event information, names, subheadings, and form labels retain their readable serif/sans-serif roles.

The ceremony and reception details now include the user's supplied church and The Club at Northtown photographs. Each image is a client-local, optimized WebP static import with meaningful alt text, lazy loading, accurate responsive widths, and a 4:3 frame. The church cross and reception sign remain visible. Addresses, times, and map links are unchanged.

The page composes focused sections with Tailwind layout and scoped artwork styles. The opening now uses the supplied closed/open envelope PNGs and the complete Save the Date PNG. `envelopeMotion.ts` defines the layered flap and 2.8s card reveal; `useEnvelopeOpening.ts` waits for completion, starts a three-second hold after the final card paint, and then fades into the shared `HeroBackdrop`. The card is 96% of envelope width and rests over the opening with its seal clear of the pocket, matching the later position reference. A height-aware scene fits phones and desktop screens. Main content stays hidden and inert until the handoff, repeated activation is guarded, and focus/scroll restoration is preserved. Reduced motion uses the same composition and three-second hold with a short fade. Critical artwork has a bounded decode wait, and failed card imagery has a text fallback.

`assets/floral-corner.webp` is original generated transparent watercolor artwork, optimized for reuse through a static Next Image import. Its exact prompt and provenance are in `assets/PROVENANCE.md`.

The hero follows the November 1 sunset reference using the supplied `designs/hero-bg.jpg` directly. A white monogram, date and time, large white “Joy & Rolly” script, and compact sentence-case invitation prose sit over the swan-lake scene. A scoped plum gradient supports white-text contrast, while smaller desktop bouquets and the lower-right `designs/flower-2.png` leave the landscape visible. The upper-left botanical drawing was removed so the image's wisteria frames that corner. The monogram uses the existing PNG with a CSS white filter; its source and the envelope seal's original colors are unchanged. Responsive background sizing accounts for the tall mobile cover crop, and the lower-left bouquet scales down on short phones. The 13px phone message, larger phone names, opening insert, and countdown are preserved.

The countdown section follows the user's satin-and-lilies reference. It uses original ivory satin and lavender lily artwork, the script heading “Counting down to forever,” and four plum numeric fields with colon separators. Days are unbounded; the clock fields use two digits and refresh each second against the configured March 12, 2027, 3 PM Philippine-time timestamp. Updates pause in hidden tabs and resynchronize on return. Screen readers are not interrupted every second. After the wedding, the timer becomes “Our forever has begun.” The separate full-name caption below the artwork was removed at the user's request.

## Validation

The page-wide text reveals pass the isolated production build/type checks and lint. Chromium checks at 390px and 1440px observed the fade and upward movement, confirmed no replay on return, and found all 91 reveal targets visible after scrolling. Tablet reduced motion and 200% text on a 320px phone also pass. All 36 entourage entries remain present; RSVP name entry stays fully visible through focus and form changes, and the seat-finder button remains unlinked/disabled. No horizontal overflow, API requests, or page errors were observed.

The image-based envelope opening passes the isolated production build, lint, and type checks. Chromium checks cover 320×568, 390×844, 768×1024, 844×390, 1440×900, 200% phone text, cold/cached loads, keyboard and repeated activation, reduced motion at load and during opening, and failed artwork/fonts. Painted closed/flap/rising/hold/exit frames were reviewed on phone and desktop. The card matches the overlapping reference position, its seal clears the pocket, and its complete bounds stay onscreen. Frame sampling confirms a still hold of at least three seconds, no premature main-content reveal or horizontal overflow, and restored focus/scroll after handoff. No API requests or page errors were observed. These are Chromium emulation checks, not physical-device or Safari verification.

The sunset hero passes the isolated production build, type checks, and lint. Chromium checks at 320×568, 390×844, 768×1024, 844×390, 1440×900, and 200% phone text confirm loaded imagery and no horizontal overflow or page errors. Background-only samples under the rendered text fragments meet 4.5:1 for ordinary text and 3:1 for large lettering. Phone and desktop screenshots were reviewed. No private environment files or backend services were accessed.

Hero floral motion passes the isolated production build/type checks and lint. Chromium checks at 320px, 390px, and 1440px confirm motion, preserved artwork rotation, fully loaded images, and no horizontal overflow or page errors. Offscreen pause, reduced-motion changes, hydrated envelope handoff, and synthetic document-visibility pause/resume were checked with API requests blocked. Phone and desktop screenshots at both ends of the sway were reviewed to confirm corner placement and clear text.

The simplified RSVP passes isolated production build/type checks and scoped lint. Chromium checks cover 320px, 390px, 768px, and 1440px, with enlarged text on the smallest phone. Local sample replies were checked for required attendance, invalid email feedback, the unsent/unsaved confirmation, and returning to name entry with focus restored. API requests were blocked throughout; none were attempted. No private environment files or Supabase access were used.

The dress-code section includes a regenerated transparent four-outfit illustration as a responsive, lazy-loaded static import. Its full-size PNG opens from the illustration link; color labels and swatches remain live HTML for mobile readability. Generation details and the exact prompt are in `assets/PROVENANCE.md` and `assets/attire-guide.prompt.txt`.

The added illustration passes isolated production build/type checks and scoped lint. Chromium checks at 320px, 390px, and 1440px, plus 200% text at 320px, confirm loading and no horizontal overflow, page errors, or API requests. The source PNG has a verified transparent alpha channel; mobile and desktop section screenshots were visually reviewed.

Mobile adaptation: compact opening-cover spacing; a touch-friendly Menu below 1024px with Escape support and automatic closing after a section choice; larger phone reading text; a stacked mobile timeline; hero names that can wrap under text enlargement; a countdown that reflows to two or one columns using container queries; and wrapping for long RSVP confirmation names. Desktop presentation and confirmed event content are preserved. Forms retain 16px input text and controls have at least 44px touch targets. Short landscape covers remain vertically scrollable.

Mobile verification uses Chromium viewport and touch emulation, not a physical iPhone/Android or Safari. The isolated preview reuses matching local display fonts with Arial/Georgia body fallbacks; production retains the root font configuration. Actual device keyboards and OS browser chrome are outside these emulated checks.

- Scoped Next/TypeScript ESLint checks pass.
- Full mobile review passes at 320×568, 360×740, 390×844, 430×932, 844×390 landscape, 768×1024 tablet, and 1440×900 desktop. At 320px with 200% text, document width remains 320px, with no detected content overflow, undersized visible controls, or overlapping countdown numbers. The portrait opening action remains visible. Synthesized touch scrolling, Menu section selection and Escape/focus return, reduced-motion opening, long-name preview replies, and malformed-fragment refresh were checked. Form inputs compute to 16px at ordinary text size; test submissions made no API requests.
- Countdown screenshots were checked at 320px, 390px, 755px, 768px, and 1440px. Synthetic browser-clock checks verify the one-day rollover, final two seconds, and elapsed message. No layout overflow, missing background, console errors, or API requests were observed.
- An isolated production build and type check pass using only this invitation and its shared dependencies. The preview uses local matching display fonts and an Arial body fallback; the repository page reuses the root Inter resource.
- Chromium checks cover 320px, 390px, 768px, and 1440px layouts, repeated keyboard opening, focus handoff, refresh, direct section links, reduced motion, no-JavaScript event details, required RSVP fields, invalid email, and the explicit unsaved sample confirmation. No broken assets, broken section anchors, horizontal overflow, console errors, or API requests were observed.
- The repository-wide type check encountered pre-existing generated references to missing `memories/[slug]` and `photo-sharing-preview` pages. Final validation uses the isolated build; no private credentials or Supabase access are required for that build.
