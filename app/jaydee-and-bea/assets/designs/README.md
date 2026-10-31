# Formal attire illustration

## November 1 story artwork

`story-portrait-floral.webp` is the lossless, transparent derivative of the user-supplied extensionless PNG `story-section-image-one` (834 × 1005). It contains the couple's actual portrait and the supplied floral arch composition. `story-flower-border.webp` derives from `line-flowers.png` (2073 × 153). Visible pixel colors and alpha values are preserved exactly. Sources remain intact; derivative sizes are 570,748 and 324,822 bytes respectively. The wide story photo's subtle floral accent reuses `hero-right-upper-flower.webp`.

The countdown uses the generated transparent `countdown-timer-flowers-watercolor.png`; its generation prompt and source reference are saved in the adjacent `.png.json` file.

`formal-attire-inspiration.webp` reuses the repository’s generic fashion artwork from `app/joshua-and-bea/assets/images/designs/dress-code-ispo-2.png`. Its client-specific R2 upload keeps Jaydee and Bea’s invitation independent of another client’s folder. The source artwork is unchanged. This is illustrative attire inspiration, not a photograph of the couple or their guests.

`countdown-petals.webp` reuses the generic white-petal artwork from `app/joshua-and-bea/assets/images/designs/white-petals.png`, matching the requested countdown reference. The source artwork is unchanged and uploaded to this invitation’s R2 folder.

The invitation serves its earlier verified WebP artwork from public R2 under `jaydee-and-bea/images/designs/`. Unused local raster copies were removed after migration. URL/dimension configuration is in `data/design-media.ts`; the upload checks are recorded in `docs/media/r2-design-verification.json`.

The October 10 hero redesign uses local static imports configured in `data/hero-artwork.ts`: `hero-arch-with-trees.webp`, `hero-couples.webp`, `hero-grass-design.webp`, the left/right upper flowers, the two bird flocks, and `hero-watercolor-background.webp`. The transparent layers use lossless WebP derivatives of the supplied PNGs. The gallery and RSVP share `gallery-floral-background.webp`.

The timeline imports `timeline-border.webp`. Its lossless WebP preserves the transparent floral frame and reduces source weight from 716,920 to 530,312 bytes (26.0%). The frame loads lazily with responsive Next Image widths.

At the user's request on October 10, unused PNG originals, the old full-design reference JPG, superseded flower extensions, and unused attire background were deleted. The unused `garden-spray.svg` and its obsolete component were removed together. The ten local WebP images used by the current invitation remain.
