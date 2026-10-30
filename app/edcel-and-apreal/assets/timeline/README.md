# Timeline artwork

Current status after the October 31 image cleanup: only artwork referenced by the invitation remains locally. Prenup and story photos load from R2. Unused exports were backed up outside the repository; the descriptions and measurements below retain their historical provenance. See `docs/media/unused-image-cleanup.json` in the invitation folder for removed paths and recovery details.

The supplied transparent PNGs provide guest arrival, ceremony, program starts, program ends and the mirrored lace corners. The event illustrations use their original alpha silhouettes as burgundy CSS masks over the cream timeline card. Static imports and `getImageProps` provide optimized, content-hashed source URLs; originals remain unchanged. Corners retain their responsive `next/image` rendering.

Cocktail glasses remain a small native SVG line drawing because no cocktail PNG was present. The latest reference replaces the header flower heart with the existing `ephemera/oval-rose-wax-seal.webp`, over a generated lace card and ribbed velvet backdrop. The former `timeline-flower-heart.png` remains in the asset library. All artwork is decorative; event labels and confirmed times remain accessible native text sourced from `data/wedding.ts`. See `lace-timeline-design.md` for the new asset dimensions, optimization and exact generation prompts.

