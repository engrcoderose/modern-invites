# Love story photographs

Current status after the October 31 image cleanup: only artwork referenced by the invitation remains locally. Prenup and story photos load from R2. Unused exports were backed up outside the repository; the descriptions and measurements below retain their historical provenance. See `docs/media/unused-image-cleanup.json` in the invitation folder for removed paths and recovery details.

All five supplied photographs are used in five chapters, in source order. Originals in `C:/Users/Spades/Downloads/Invitation/Love story photos (if applicable)` remain untouched.

| Source | Optimized asset | Placement |
| --- | --- | --- |
| `First photo.jpg` | `first-hello.webp` | Chapter I |
| `Second.JPG` | `shared-adventures.webp` | Chapter II |
| `Third.jpeg` | `next-chapter.webp` | Chapter III, pink studio photo |
| `Fourth.jpg` | `a-beautiful-yes.webp` | Chapter IV, beach photo |
| `Last photo_.jpg` | `save-the-date.webp` | Chapter V, save-the-date photo |

Sharp applied the recorded EXIF orientation, constrained both dimensions to a maximum of 1800px without enlarging smaller sources, and encoded WebP at quality 85. Original crops and aspect ratios are retained; embedded capture metadata is not copied. In particular, the rotated studio image is now correctly oriented.

Combined source size: 15,983,364 bytes. Combined optimized size: 774,056 bytes — a measured 95.2% reduction for these five source files. Per-file measurements and dimensions are in `optimization.json`; this is not an account-wide bandwidth estimate.

Photos are statically imported and rendered with responsive `next/image` sizing, default optimizer quality, blur placeholders and lazy loading. Chapter III uses a centered 3:2 landscape display frame at the user's request, removing excess pink space above and below while retaining both faces, the bouquet and joined hands. Its original portrait asset is preserved; the other four photos retain their native display proportions. No full-HD minimum, custom loader, extra backdrop variant or gallery preload is used. Text and chapter/photo configuration live in `data/story.ts`.

