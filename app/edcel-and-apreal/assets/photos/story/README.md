# Love story photographs

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

Photo URLs and image metadata are supplied by `data/photo-media.json` from R2 and rendered with responsive `next/image` sizing, default optimizer quality, blur placeholders and lazy loading. Chapter III uses the existing centered 3:2 display frame; the other four photos retain their native display proportions. Text and chapter/photo configuration live in `data/story.ts`.

