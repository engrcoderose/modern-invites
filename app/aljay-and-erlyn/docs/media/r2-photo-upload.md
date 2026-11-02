# Aljay and Erlyn photo upload

The 10 original HEIC photographs were converted to WebP at quality 85, with a maximum edge of 2560 px. Original files were not changed. Color profiles were converted to sRGB and orientation baked into the image pixels. Exports omit EXIF/XMP metadata.

Upload the 10 WebP files to the existing assets.moderninvites.com R2 bucket under:

    aljay-and-erlyn/images/prenups/

The ZIP contains these complete object paths. Extract it first; upload image files rather than the ZIP itself. Preserve lowercase filenames. Content-Type: image/webp.

The invitation is configured for:

    https://assets.moderninvites.com/aljay-and-erlyn/images/prenups/<filename>

The owner uploaded all 10 files under this path. Each public URL returned HTTP 200 with image/webp content, matching dimensions and a matching SHA-256 checksum. Verification used public GET requests only, with no R2 credentials or bucket changes. See `r2-prenup-verification.json` for the results.

Us: img-2541.webp, img-2632.webp, img-2911.webp, img-4008.webp, img-3833.webp.
Together: img-3876.webp, img-2927.webp, img-2949.webp, img-2961.webp, img-3707.webp.

See prenup-optimization.json in the client docs for source mappings, dimensions, object keys, sizes and SHA-256 checksums. Replacing an image later requires a new filename and matching configuration update; do not append a fresh timestamp on every request.

Local verification: all 10 exports decoded and loaded in the isolated Next preview at desktop (1280 x 720) and mobile (390 x 844) sizes. Tablet (768 x 1024) and compact-phone (320 x 568) gallery layouts were checked. Both five-photo slideshows completed repeated autoplay wraparounds; pause/resume, rapid selections and cropped focal points were reviewed. Targeted ESLint, repository TypeScript and an isolated production build passed. The preview served local copies of the exact WebP exports; Public R2 availability has now been verified separately against the exact prepared exports.
