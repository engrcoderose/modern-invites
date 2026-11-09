# Optimized prenup photographs

23 full-resolution JPEG masters from the supplied Prenup Photos folder.
Originals in Downloads were not modified. Filenames are normalized for URLs;
`dsc06519.jpg` and `dsc06519-1.jpg` are different supplied compositions and both
are retained.

Lossless coefficient-preserving JPEG optimization selected the smallest of
optimized sequential coding, optimized progressive coding, and the original.
No resizing, cropping, requantization, retouching, or metadata removal was used.
Dimensions, ICC profiles, orientation, and decoded RGB pixels were verified for
every image. Two already efficient collages were retained byte-for-byte.

- Original total: 221,268,572 bytes
- Optimized total: 210,024,218 bytes
- Reduction: 11,244,354 bytes (5.08%)

These are full-quality source masters. Use Next Image with accurate responsive
`sizes` when placing them in the invitation; do not serve the large originals
with `unoptimized` or preload the entire folder. More aggressive source-size
reductions require resizing or lossy encoding and were intentionally avoided.

The per-file sizes, source/output hashes, dimensions, and pixel verification
are in `app/christina-and-reboden/docs/prenup-optimization.json`. The reusable
offline script is `app/christina-and-reboden/scripts/optimize_prenup.py`; it uses
an existing TurboJPEG library and refuses to overwrite destination files.

API reference: [libjpeg-turbo 3.1.4.1 header](https://github.com/libjpeg-turbo/libjpeg-turbo/blob/3.1.4.1/src/turbojpeg.h).
