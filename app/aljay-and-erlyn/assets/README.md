# Invitation artwork

- `garden.webp`: original decorative painting generated with the built-in image-generation tool, optimized to a 1024 × 1536 WebP. Exact prompt: `garden-prompt.txt`. It does not depict either actual venue. The full generated original remains in the generation tool's output folder.
- `attire-gentlemen.webp`, `attire-ladies.webp`: supplied illustrations extracted from pages 3 and 4 of the owner's `Wedding-Details.pdf`; optimized to WebP at quality 85, original dimensions retained.
- `security-bank-qr.jpg`, `gcash-qr.jpg`: original embedded images extracted unchanged from page 4 of that PDF. Retained as unused source assets after the owner requested removal of the gifts page; neither is rendered or linked by the invitation.

Each shipping raster has embedded or adjacent generation/source provenance; the provenance tool uses JSON sidecars for WebP and JPEG comments for the original QR images. The couple's 10 real HEIC photos have been prepared as external R2 upload assets; see `../docs/media/r2-photo-upload.md`. The supplied Spring Snow MP3 is now served from the client-scoped public music folder.

Current reference-design assets:
- `design/venues-bg.png`: owner-supplied olive damask background for both venue pages. Scoped CSS repeats the original 615 × 333 pattern at its natural size and 35% opacity over solid olive to preserve detail on tall screens; the bundler generates a content-hashed asset URL. The original PNG is unchanged.
- Existing `public/leslie-and-serj/images/woodland-lake.png` is statically imported for the owner-requested matching design.
- Existing Anastasia and Noto Serif font files are reused through route-local Next font variables.
- `design/wedding-log.png` and `design/wedding-logo-green.png` are the owner-supplied ivory and green logos. Both are statically imported unchanged with transparency preserved. The ivory variant appears on the cover and crossfades to the green variant used on the invitation page.
- `design/laced-church.png` and `design/laced-reception.png` are the owner-supplied lace-framed venue artwork used on the separate ceremony and reception pages. Their transparency, full frames and flowers are preserved. The earlier `church-image.jpg` and `design/reception-image.jpg` remain as unused source illustrations.
- `garden.webp` and its prompt/provenance remain as unused source artwork after the design-copy revision.
- `design/story-lace-bow.webp`: unused source artwork after the latest story redesign; decorative ivory lace bow with a pearl heart, generated with built-in imagegen from the owner's love-story design reference. Exact prompt and source output are recorded in `design/story-lace-bow-prompt.txt`. Optimized to 480 x 360 WebP with transparency preserved; the couple's photograph is unchanged.

- Music: the owner-supplied `10cm – Spring Snow (봄눈) [Lovely Runner OST Part 8] [Rom Eng Lyric].mp3` was moved unchanged to `public/aljay-and-erlyn/music/spring-snow.mp3` for static serving. No transcoding or audio edits were made.

- `design/ivory-flower.png`: owner-supplied transparent flower, statically imported unchanged above the timeline title. Rendered decoratively through Next Image at 64px, or 48px on shorter screens.

- `design/whimsical-garden-background.png`: generated willow-and-water-lily garden artwork used on the opening cover through responsive Next Image. Source and exact built-in generation prompt: `design/whimsical-garden-background-prompt.txt`. The garden image is unchanged.

- `design/flower-with-whiteribbon.png`: existing project artwork used unchanged as the floral accent over the story photo. The ornamental story title uses the supplied `design/story-title-frame.png`; its words remain accessible HTML text.

- `design/ribbon-deco.png`: owner-supplied ivory ribbon, statically imported unchanged above the dress-code heading. Responsive height is 48–72px, with decorative empty alt text.

- `design/flower-with-green-ribbon.png`: owner-supplied flower, used unchanged below the FAQ list. The FAQ ornament stays below expanded answers and shrinks to 48px on short screens.

- `design/story-title-frame.png`: owner-supplied transparent ornamental frame copied unchanged from `codex-clipboard-afc23d1a-4df2-436a-a896-aeef0ed684fc.png`. It replaces the earlier drawn frame; the story and RSVP titles remain editable HTML through `FramedHeading` in `components/Stationery.tsx`. The original frame asset is reused without duplication.

- `design/entourage-floral-bg.png`: owner-supplied 1152 × 2048 green background with hanging ivory flowers (clipboard-4ba1e2a0), copied unchanged; now unused after the owner supplied entourage-bg-2.png. Next Image provides responsive, top-aligned cover sizing and optimization. Render the artwork at 40% opacity over deep olive #30391f; the source remains unchanged. The earlier `design/entourage-bg.png` is retained as unused source artwork.

- `design/olive-oval-aljay-erlyn-seaside.png`: image-tool composite using the couple’s IMG_2911 seaside photo, zoomed inside an olive frame with ivory flowers. Used above the countdown heading with responsive 140–220px height on mobile, 160–250px on desktop, and default Next Image optimization. Its generation/edit prompt is saved alongside it; earlier oval concepts remain unused.

- `design/slideshow-ivory-flowers.png`: transparent cutout prepared with the built-in image tool from the supplied clipboard-27c5cdc5 floral image. Earlier lower-left overlap, now unused after the owner supplied red.png. The prompt is saved alongside the PNG.

- `design/red.png`: owner-supplied transparent 169 × 253 floral arrangement with pink/red trailing accents, used unchanged on the first (Us) slideshow’s lower-left corner.

- `design/entourage-bg-2.png`: latest owner-supplied 1824 × 2879 olive damask background, statically imported unchanged for all four entourage chapters. Keep the established 40% opacity over deep olive #30391f; Next Image uses responsive cover sizing for this asset’s aspect ratio.
