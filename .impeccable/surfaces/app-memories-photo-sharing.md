# Photo sharing frontend

Guest album: Experience / Operate. Dashboard: Operate. This is a mock feature extension, using the supplied blush album reference and the existing forest/ivory client dashboard. No backend or event configuration changes.

## Direction contract

THESIS: A wedding album guests can contribute to in seconds, paired with a practical moderation workspace. Photos and the upload action lead, rather than decorative statistics.

OWN-WORLD: The guest reference supplies pale blush, berry actions, white paper, expressive serif names, and upload/gallery navigation. Management inherits existing forest, ivory, Inter, and serif dashboard headings. Existing UI buttons and icons remain recognizable.

STORY: Guests select and preview photos, add a name, and make a clearly simulated contribution. Couples review the same browser-local album, moderate photos, adjust visibility and uploads, and share a QR link.

FIRST VIEWPORT: Centered script couple names between two gently angled sample photo prints; on mobile the prints sit beneath the names. Compact pill navigation leads to a white upload paper with a blush message panel and a clear photo chooser. Gallery contributions sit in white print frames. The forest management header carries the page title and preview action, with ruled counts and a compact photo workspace beside white album controls. Mobile keeps photo actions first and stacks settings beneath the collection.

FORM: Brief-pinned reference and existing dashboard extension; code-led. No concept seed is needed for the supplied reference and established component system.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implemented extension

This is a scoped feature extension, not a replacement identity. Root `DESIGN.md` remains the marketing system and explicitly excludes dashboards and client invitations. Preserve it and `.impeccable/design.json`; the guest album's local palette does not become a global token set.

- Guest appearance: pale blush ground, berry actions and names, white upload paper, muted rose supporting text, and fine pink rules. Values live in `features/photo-sharing/presentation/photo-sharing.module.css`. Existing Imperial Script carries the names (72px, increasing to 96px from 640px). Instrument Serif carries the italic introduction (24px, increasing to 30px), upload heading (36px, increasing to 48px), gallery heading (36px), and print captions. Inter carries form text and actions. No fonts or dependencies were added.
- Management appearance: existing Forest, Ivory, Ink, Sage and White utilities; existing Playfair Display headings and Inter body text. A forest header groups the page title and ivory pill preview action. The page title grows from 30px to 36px from 640px; section titles are 24px. Ruled counts, pill filters, bordered white photo cards, quiet status badges, and a white controls panel make the workspace easier to scan. Shared Button variants remain intact, with feature actions at least 44px high.
- Layout: guest content is centered within 1024px with 16px mobile and 24px larger gutters. Names sit between two angled introductory prints from 768px; on smaller screens the prints sit together below the names. Compact pill navigation precedes the upload paper, whose blush message panel and white form become side-by-side from 768px. The gallery uses two columns, increasing to three from 640px, with portrait photos and centered contributor captions. Management preserves a photo-first reading order, two photo columns until 1280px, then three; a 304px controls column joins from 1024px with a 40px gap. On smaller screens settings follow the collection.
- Shape and depth: square-cornered white print mats distinguish guest photos from the rounded upload paper, fields, and pill actions. Introductory prints rotate gently (-6 and 5 degrees); soft local shadows lift these prints, gallery frames, and the upload paper from the blush ground. A subtle blush gradient supports the upload message panel. These are scoped album treatments, not global elevation tokens. The upload drop target uses a dashed border; thin rules and tonal separation keep management compact.
- Motion and interaction: the guest header's 650ms, 12px entrance is disabled for reduced motion; text remains opaque. Focus uses a visible 2px palette-colored outline with a 4px offset. Upload feedback explicitly describes local demo storage. Approval, visibility, search, selection, deletion confirmation, lightbox controls, and QR sharing remain operational mock interactions, not evidence of backend integration.

## Documentation and finish evidence

This refinement documentation checked the feature stylesheet; guest album, introduction, gallery, upload, management, management photo card, and demo notice components; the artwork/seed data; root font registration; root `DESIGN.md`; the marketing sidecar; and `features/photo-sharing/README.md`. It records the shipped feature appearance without changing the marketing system or backend scope.

The finish reviewer inspected eight captures in `.impeccable/review/`: `guest-desktop.png`, `guest-390.png`, `guest-768.png`, `dashboard-desktop.png`, `dashboard-390.png`, `dashboard-768.png`, `gallery-desktop.png`, and `gallery-mobile.png`. The refinement's final disposition is **ship**, with no material fixes requested. The implementation pass reports responsive and mock-interaction browser checks at 390, 768, and 1440px, plus passing type, lint, unit, and sanitized feature-build checks. Documentation independently inspected the guest 390px and management desktop captures against the source; it did not rerun those checks or review every capture.

No raster assets were created or duplicated. The introductory prints and seeded album reuse two existing marketing photographs; their existing origin and illustrative use are recorded in `features/photo-sharing/README.md`, and the two artwork references and seed submissions remain in `infrastructure/demo-album.ts`. They are not approved event photographs of the fictional demo couple.

Pre-existing drift: root `DESIGN.md` is newer than `.impeccable/design.json`. This extension does not authorize repairing the marketing sidecar or canonizing guest blush/berry values into the marketing system. Both files are preserved. No private environment files or Supabase project access are needed for this documentation pass.
