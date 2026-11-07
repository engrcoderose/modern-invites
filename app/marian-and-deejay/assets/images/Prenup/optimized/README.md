# Optimized prenup photos

This folder contains full-resolution optimized WebP prenup photos. Current selections and crop positions are configured in the invitation's `data` folder. The November 6 cleanup retained fifteen WebP photos and removed the 22 original JPEGs plus seven unused WebP photos at the user's request after they confirmed a backup. See `docs/asset-cleanup.json` at the invitation root for that historical inventory.

On November 7, `nhut6383.webp` was promoted from `pending-revisions` for the requested white-outfit carousel, followed by `nhut7032.webp` for the black-outfit memory gallery. Both checksums are unchanged. The dated Downloads audit records the earlier staging state; both staged photographs are now implemented.

The retained photos preserve their original pixel dimensions, framing, orientation, and ICC color profiles. They were encoded with Sharp WebP quality 92, effort 6, and smart chroma subsampling. This is high-quality lossy compression rather than pixel-identical archival compression.

`optimization-report.json` retains historical filenames, dimensions, sizes, checksums, and decoded-image comparisons, including entries for removed files. Its `retainedOptimizedFiles` field records the November 6 retained set.

The invitation imports these photos through `next/image` with responsive sizing and delivery quality 85. Original JPEGs are not required by the website.
