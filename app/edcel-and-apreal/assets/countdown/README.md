# Countdown artwork

Current status after the October 31 image cleanup: only artwork referenced by the invitation remains locally. Prenup and story photos load from R2. Unused exports were backed up outside the repository; the descriptions and measurements below retain their historical provenance. See `docs/media/unused-image-cleanup.json` in the invitation folder for removed paths and recovery details.

Generated using the built-in image-generation tool for the user's wine-red satin and floral countdown reference. These are decorative backgrounds, not event photos. Exact prompts are in the adjacent `.prompt.md` files.

## Current animated layers

- [wine-satin-background.webp](wine-satin-background.webp): 1920 × 1080 satin-only backdrop, 151,950 bytes. [Prompt](satin-motion.prompt.md).
- [floral-top-right.webp](floral-top-right.webp): 960 × 960 transparent corner, 293,806 bytes. [Prompt](flowers-top-right-motion.prompt.md).
- [floral-bottom-left.webp](floral-bottom-left.webp): 960 × 960 transparent corner, 336,810 bytes. [Prompt](flowers-bottom-left-motion.prompt.md).

The layers were generated from the approved smaller-flower artwork using the built-in image tool. Both floral sources have verified alpha channels, preserved in their WebP exports. Satin was resized from 1672 × 941 to the HD export; floral sources were reduced from 1254 × 1254. WebP quality 92, served responsively at quality 90. `CountdownArtwork` positions the flowers at the same corners and moves them independently with scroll progress, keeping the satin and text still. Reduced-motion users receive stationary flowers.

## Previous reference composites

These retain the approved composition and generation history; the page now imports the three independent layers above.

- `burgundy-satin-florals.webp` (archived): 1920 × 1080 HD landscape export, 268,016 bytes. [Original prompt](burgundy-satin-florals.prompt.md), [HD refinement notes](burgundy-satin-florals-hd.prompt.md), and [current smaller-flower edit prompt](burgundy-satin-florals-smaller.prompt.md).
- `burgundy-satin-florals-mobile.webp` (archived): full-source 1086 × 1448 portrait companion, 187,266 bytes, preserving both corner arrangements on narrow screens. [Original prompt](burgundy-satin-florals-mobile.prompt.md) and [current smaller-flower edit prompt](burgundy-satin-florals-mobile-smaller.prompt.md).

Both arrangements were reduced in scale using the built-in image tool following the user's request for slightly smaller flowers. The edit targeted a 25% reduction in linear size, anchored to the same corners, with satin filling the freed space.

WebP source quality 92, served at Next.js quality 90 following the user's HD request. The landscape edit returned 1672 × 941 and was upscaled to the HD export; the mobile edit retained 1086 × 1448 and is not enlarged. Static imports and `getImageProps` provide content-hashed, responsive Next.js image URLs. An art-directed picture loads only the matching composition. The title and timer remain native HTML. Existing shared quality allowlists and the 31-day cache policy are preserved.

