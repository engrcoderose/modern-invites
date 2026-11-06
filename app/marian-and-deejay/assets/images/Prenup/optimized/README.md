# Optimized prenup photos

This folder contains the 15 WebP photos used by the current invitation. The 22 original JPEGs and seven unused WebP photos were removed on November 6, 2026, at the user’s request after they confirmed a backup. See `docs/asset-cleanup.json` at the invitation root for the deletion inventory.

The retained photos preserve their original pixel dimensions, framing, orientation, and ICC color profiles. They were encoded with Sharp WebP quality 92, effort 6, and smart chroma subsampling. This is high-quality lossy compression rather than pixel-identical archival compression.

`optimization-report.json` retains historical filenames, dimensions, sizes, checksums, and decoded-image comparisons, including entries for removed files. Its `retainedOptimizedFiles` field identifies the current files.

The invitation imports these photos through `next/image` with responsive sizing and delivery quality 85. Original JPEGs are not required by the website.
