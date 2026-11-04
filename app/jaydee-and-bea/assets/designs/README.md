# Formal attire illustration

## HD attire inspiration

`formal-attire-inspiration-hd.png` is a native 2048 × 768 built-in imagegen redraw of the earlier 397 × 150 illustration. It retains the seven figures in four groups and the original olive, ivory, champagne, floral, and beige outfit direction, with clearer garment details and a transparent background. `data/design-media.ts` now uses the local static import; existing responsive Next Image sizing and the default quality remain. The original artwork and generated master are retained. The exact prompt and processing details are in `formal-attire-inspiration-hd.png.json`. Desktop/mobile loading, transparency, layout, lint, repository TypeScript, and the isolated build were verified.

## Washed watercolor rose urns

`rose-urn-washed-watercolor.png` is the built-in imagegen style-transfer version of the original public `whimsi-pink-flower.webp` ornament. Both Dress Code decorations share this transparent 960 × 960 asset through `data/design-media.ts`; the right-hand ornament retains its existing mirror. The generated master remains untouched, and the original artwork remains available. The exact prompt and processing details are recorded in `rose-urn-washed-watercolor.png.json`. Transparency, both optimized image loads, desktop/mobile placement, lint, repository TypeScript, and the isolated production build were verified.

## November 4 entourage artwork

The five user-supplied transparent PNGs are used unchanged: `entourage_flower_top_left.png`, `entourage_flower_top_right.png`, `entourage_fountain.png`, `entourage_lower_left_design.png`, and `entourage_lower_right_design.png`. The entourage imports them statically and lets Next Image select responsive optimized variants at the default quality. Corner flowers and columns retain their original proportions; the fountain replaces the previous pavilion illustration in this section.

## November 1 story artwork

`story-portrait-floral.webp` is the lossless, transparent derivative of the user-supplied extensionless PNG `story-section-image-one` (834 × 1005). It contains the couple's actual portrait and the supplied floral arch composition. `story-flower-border.webp` derives from `line-flowers.png` (2073 × 153). Visible pixel colors and alpha values are preserved exactly. Sources remain intact; derivative sizes are 570,748 and 324,822 bytes respectively. The wide story photo's subtle floral accent reuses `hero-right-upper-flower.webp`.

The countdown uses the generated transparent `countdown-timer-flowers-watercolor.png`; its generation prompt and source reference are saved in the adjacent `.png.json` file.

`formal-attire-inspiration.webp` reuses the repository’s generic fashion artwork from `app/joshua-and-bea/assets/images/designs/dress-code-ispo-2.png`. Its client-specific R2 upload keeps Jaydee and Bea’s invitation independent of another client’s folder. The source artwork is unchanged. This is illustrative attire inspiration, not a photograph of the couple or their guests.

`countdown-petals.webp` reuses the generic white-petal artwork from `app/joshua-and-bea/assets/images/designs/white-petals.png`, matching the requested countdown reference. The source artwork is unchanged and uploaded to this invitation’s R2 folder.

The invitation serves its earlier verified WebP artwork from public R2 under `jaydee-and-bea/images/designs/`. Unused local raster copies were removed after migration. URL/dimension configuration is in `data/design-media.ts`; the upload checks are recorded in `docs/media/r2-design-verification.json`.

The October 10 hero redesign uses local static imports configured in `data/hero-artwork.ts`: `hero-arch-with-trees.webp`, `hero-couples.webp`, `hero-grass-design.webp`, the left/right upper flowers, the two bird flocks, and `hero-watercolor-background.webp`. The transparent layers use lossless WebP derivatives of the supplied PNGs. The gallery and RSVP share `gallery-floral-background.webp`.

The timeline now imports the existing `timeline-border-flowers.jpg` to match the supplied watercolor poster reference. It loads lazily through responsive Next Image widths; two cropped halves retain natural flower proportions for the six-event mobile layout. `timeline-border.webp` is the earlier vine-frame asset, superseded in the displayed timeline.

At the user's request on October 10, unused PNG originals, the old full-design reference JPG, superseded flower extensions, and unused attire background were deleted. The unused `garden-spray.svg` and its obsolete component were removed together. The ten local WebP images used by the current invitation remain.
