# Ashley at 18 RSVP

Route: `/ashley-at-18-rsvp`. Client content is isolated here; event details are in `data/event.ts`.

The reference-led design uses pink rose wallpaper and an ornate lavender-and-white oval with a blush center, with pink, purple and white. Exactly four sections: HERO (including its white introduction), COUNTDOWN, VENUE, OPEN RSVP. Confirmed arrival: 3 PM, December 5, 2026, Philippine time, at Casa Dominguez. No program start or RSVP deadline is invented.

## RSVP integration

The sticky navigation uses centered Home, Details and RSVP anchors. Details covers the countdown and venue; a small purple dot and `aria-current` track the current section. Sections reserve 72px scroll clearance. Desktop/mobile link destinations, active state, sticky placement and keyboard Home activation were checked; targeted lint and repository type checks passed for this navigation revision.

The optional email field is disabled for Ashley through the existing form field configuration. Full name, attendance, optional phone, conditional dietary needs and optional message remain.

The shared minimal `OpenRsvpForm` uses a single step: full name, attendance, optional phone, conditional dietary needs and optional message. Email remains hidden. There is no separate name-search or name-check screen. Its default production submitter posts directly to `/api/rsvp/open` using the owner-supplied slug `ashley-at-18-rsvp` in `data/rsvp.ts`. Preview mode and the local no-op callback are removed. Validation, loading protection, errors and successful-save confirmation remain.

Local event metadata supplies display content only. The submission API enforces the real access mode, deadline, event availability and duplicate-response rules. The matching admin event must be active with Open RSVP enabled; removing the name-check screen does not change this requirement. No admin record or schema was changed. Private environment files and live Supabase were not accessed. Live persistence remains unverified; the owner should confirm the deployed event configuration and submit a test reply through the website.

## Artwork and design

The countdown now has a solid pink base (#f8d8e4) and a transparent landscape floral frame edited from the latest supplied image. `assets/countdown-florals.webp` is 1600 × 900, approximately 357 KB, with preserved alpha. The exact built-in image-editing prompt and source are in its adjacent JSON. The former repeating pattern was removed. Desktop/mobile loading and readability were visually checked; targeted lint passed.

The five user-supplied accents in `assets/decorations/` are background-extracted with the built-in image tool, trimmed and compressed as transparent WebP. Adjacent JSON files preserve each exact extraction prompt. The bow and pink lilies accompany the hero introduction, purple florals form mirrored, rotated top corners in the venue, and quill stationery plus mirrored butterfly flowers on both sides frame RSVP. `DecorativeArtwork` supplies empty alternatives and disables pointer interaction. Decorations load lazily; mobile flow reserves space around the form instead of overlaying controls.

Decoration checks: targeted ESLint and repository TypeScript passed. All five images loaded in the browser. Desktop (1440px) and mobile (390px) checks found no horizontal overflow or decoration overlap with RSVP inputs, textarea or buttons. Viewport captures are under `.impeccable/review/ashley/decorations-rsvp-*.png`; full-page capture was unreliable during this revision. No form submission behavior was changed.


Built-in image generation produced `assets/hero-floral-wallpaper.webp` (1536 × 1024, approximately 250 KB) and `assets/hero-ornate-frame.webp` (1024 × 1536, approximately 230 KB, transparent outside the frame). Both follow the latest supplied reference with pink roses, lavender foliage/frame, pearl-white trim and a pink center. Exact prompts and provenance are adjacent JSON files. Both use responsive static next/image imports and are prioritized only in the immediately visible hero. The superseded satin and lace assets were removed.

The current design system is recorded in client `DESIGN.md` and `.impeccable/design.json`. Shared/global design records are unchanged.

`assets/venue-watercolor.webp` is a built-in image-generation watercolor edit of the user-supplied Casa Dominguez photograph. The 1400 × 933 WebP preserves transparent painted edges; its exact prompt and source provenance are in `assets/venue-watercolor.webp.json`. It appears in the venue section, lazy loaded through responsive `next/image` with a 672px maximum frame.

Watercolor addition verified at 1440px and 390px: the optimized image loads, its edges blend into lavender, and no horizontal overflow was found. Targeted ESLint and repository TypeScript checks passed. The previously recorded full production build predates this asset-only addition.

## Validation

RSVP connection: targeted ESLint, repository TypeScript and 27 existing local open-RSVP/field tests passed. Database tests used an isolated in-memory PGlite instance with synthetic records, not Supabase. The sandbox blocked the default test runner child processes; rerunning with `--test-isolation=none` passed. No live API request or deployment verification was performed.

Latest floral-hero revision: targeted lint, repository TypeScript and an isolated production build passed. Both new optimized images loaded at 390px and 1440px; screenshots `ornate-hero-mobile.png` and `ornate-hero-desktop.png` show clear name/date placement and no horizontal overflow. Older satin/lace screenshot and review records below refer to the superseded hero.

Animation revision: consistent 24px upward fades, 0-to-original opacity, 850ms ease-in-out and 120ms stagger across all four sections, including form groups and buttons. Backwards fill holds opacity zero during delay; final styles remain ordinary CSS. No-JavaScript and reduced-motion states remain visible, and keyboard focus reveals a group immediately. Controller checks passed for timing, stagger, pending visibility, keyboard recovery, once-only reveals and cleanup. Lint, repository types and the isolated production build passed. Browser checks confirmed pending-to-settled transitions, keyboard navigation, and the absence of the email field. Reduced motion was tested using synthetic media-query events.

Final targeted ESLint, repository TypeScript checks and an isolated production build passed. Current full-page screenshots at repository-root `.impeccable/review/ashley/desktop.png` and `mobile.png` were inspected at 1440px and 390px: all four sections are present, no horizontal overflow was found, and lace and satin loaded. The shorter “Kindly RSVP” heading uses 48px mobile/72px wide script to prevent clipping. Fresh finish review: ship as a frontend draft, with no material findings in the final desktop/mobile captures and client code. The reviewer did not independently exercise live interactions or assistive technology. No private environment files were read and no Supabase calls were made. That historical review predates the API integration described above.
