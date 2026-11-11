# Ashley at 18 RSVP

Route: `/ashley-at-18-rsvp`. Client content is isolated here; event details are in `data/event.ts`.

The reference-led design uses dusty rose satin and an ornate ivory lace oval, with pink, purple and white. Exactly four sections: HERO (including its white introduction), COUNTDOWN, VENUE, OPEN RSVP. Confirmed arrival: 3 PM, December 5, 2026, Philippine time, at Casa Dominguez. No program start or RSVP deadline is invented.

## Frontend preview

The sticky navigation uses centered Home, Details and RSVP anchors. Details covers the countdown and venue; a small purple dot and `aria-current` track the current section. Sections reserve 72px scroll clearance. Desktop/mobile link destinations, active state, sticky placement and keyboard Home activation were checked; targeted lint and repository type checks passed for this navigation revision.

The optional email field is disabled for Ashley through the existing form field configuration. Full name, attendance, optional phone, conditional dietary needs and optional message remain.

The shared minimal `OpenRsvpForm` accepts a full name directly, attendance, optional contact details, conditional dietary needs and an optional message. One response is for one person. The local callback sends and saves nothing; the form and confirmation state preview behavior.

After draft approval, the owner creates the event through the established admin workflow and confirms its slug and deadline. Replace `previewEvent` with actual configuration and connect the established open-RSVP flow; remove the local callback and preview prop only after integration is configured and verified. No private environment access or Supabase execution is authorized.

## Artwork and design

The five user-supplied accents in `assets/decorations/` are background-extracted with the built-in image tool, trimmed and compressed as transparent WebP. Adjacent JSON files preserve each exact extraction prompt. The bow and pink lilies accompany the hero introduction, purple florals form mirrored, rotated top corners in the venue, and quill stationery plus mirrored butterfly flowers on both sides frame RSVP. `DecorativeArtwork` supplies empty alternatives and disables pointer interaction. Decorations load lazily; mobile flow reserves space around the form instead of overlaying controls.

Decoration checks: targeted ESLint and repository TypeScript passed. All five images loaded in the browser. Desktop (1440px) and mobile (390px) checks found no horizontal overflow or decoration overlap with RSVP inputs, textarea or buttons. Viewport captures are under `.impeccable/review/ashley/decorations-rsvp-*.png`; full-page capture was unreliable during this revision. No form submission behavior was changed.

`assets/countdown-pattern.webp` is the user-supplied floral pattern rotated 90° clockwise into landscape (2048 × 1152), compressed to approximately 107 KB. It fills the countdown background through a lazy-loaded static `next/image` import. Its adjacent JSON records the source and processing.

Built-in image generation produced `assets/lace-medallion.webp` (960 × 1160, approximately 237 KB, transparency preserved) and `assets/pink-satin.webp` (1536 × 1024, approximately 112 KB). Adjacent `.json` files record their prompts and provenance. Both use static imports. The preoptimized transparent lace selectively uses `unoptimized` to bypass a local optimizer loading issue; satin retains responsive `next/image` sizing and default quality. Both assets were confirmed loaded at desktop and mobile widths.

The current design system is recorded in client `DESIGN.md` and `.impeccable/design.json`. Shared/global design records are unchanged.

`assets/venue-watercolor.webp` is a built-in image-generation watercolor edit of the user-supplied Casa Dominguez photograph. The 1400 × 933 WebP preserves transparent painted edges; its exact prompt and source provenance are in `assets/venue-watercolor.webp.json`. It appears in the venue section, lazy loaded through responsive `next/image` with a 672px maximum frame.

Watercolor addition verified at 1440px and 390px: the optimized image loads, its edges blend into lavender, and no horizontal overflow was found. Targeted ESLint and repository TypeScript checks passed. The previously recorded full production build predates this asset-only addition.

## Validation

Animation revision: consistent 24px upward fades, 0-to-original opacity, 850ms ease-in-out and 120ms stagger across all four sections, including form groups and buttons. Backwards fill holds opacity zero during delay; final styles remain ordinary CSS. No-JavaScript and reduced-motion states remain visible, and keyboard focus reveals a group immediately. Controller checks passed for timing, stagger, pending visibility, keyboard recovery, once-only reveals and cleanup. Lint, repository types and the isolated production build passed. Browser checks confirmed pending-to-settled transitions, keyboard navigation, and the absence of the email field. Reduced motion was tested using synthetic media-query events.

Final targeted ESLint, repository TypeScript checks and an isolated production build passed. Current full-page screenshots at repository-root `.impeccable/review/ashley/desktop.png` and `mobile.png` were inspected at 1440px and 390px: all four sections are present, no horizontal overflow was found, and lace and satin loaded. The shorter “Kindly RSVP” heading uses 48px mobile/72px wide script to prevent clipping. Fresh finish review: ship as a frontend draft, with no material findings in the final desktop/mobile captures and client code. The reviewer did not independently exercise live interactions or assistive technology. No private environment files were read and no Supabase calls were made. Production RSVP integration remains pending.
