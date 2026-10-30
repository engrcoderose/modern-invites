# Edcel & Apreal prenup photos

Current status after the October 31 image cleanup: only artwork referenced by the invitation remains locally. Prenup and story photos load from R2. Unused exports were backed up outside the repository; the descriptions and measurements below retain their historical provenance. See `docs/media/unused-image-cleanup.json` in the invitation folder for removed paths and recovery details.

51 retained optimized images from 52 source files. The original collection is in `C:/Users/Spades/Downloads/Invitation/Prenup Photos/`; the nine new replacements are in `C:/Users/Spades/Downloads/`. Original files were left untouched.

Each filename describes the visible outfit, setting, or pose. See [rename-map.csv](rename-map.csv) for the original-to-descriptive filename mapping and [optimization.json](optimization.json) for dimensions, hashes, and per-image measurements.

Exports use WebP quality 85, a maximum 2400-pixel long edge, automatic orientation, and no enlargement or cropping. Capture metadata is removed. Every output was fully decoded and checked for its format, dimensions, and aspect ratio.

`Pre wedding-133(1).jpeg` is byte-for-byte identical to `Pre wedding-133.jpeg`; both map to `sequin-dress-spiral-staircase-seated.webp`. Only one optimized copy is stored.

Retained source size: 489,528,119 bytes (477,457,492 bytes excluding the duplicate). Retained optimized image size: 21,417,618 bytes. These measurements describe the current retained export only.

The hero now uses the rooftop terrace, ivory window-seat and window-embrace photos through static imports. Existing story photos remain unchanged. When adding them to the invitation, use static imports with the existing Next.js image optimizer, accurate responsive sizes, and lazy loading for later content.

The eight owner-selected photos and the separately exported crop were removed. Their history remains in `removed-photos.json`. Nine newly supplied JPGs were optimized to descriptive, versioned WebP filenames, with source-to-replacement mapping and placements in `replacement-photos.json`. These new exports total 3,138,440 bytes, down from 11,517,566 bytes (72.8% smaller). They preserve proportions, use no enlargement or cropping, and have no capture metadata. The main gallery's sixth photo and the sofa photo break before attire are restored using the new files. Other replacement photos remain in the client asset library, matching the earlier inactive assets. The active mapping and optimization manifest describe only files still present; all original Downloads files are untouched.

