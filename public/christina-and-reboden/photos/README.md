# Christina & Reboden photographs

The optimized couple photos in `prenup/` are connected in
`app/christina-and-reboden/data/media.ts`:

- `dsc06605.jpg` — portrait above the full love story
- `dsc06601.jpg` — tinted RSVP background
- `dsc06623.jpg` — closing photograph

The supplied venue illustrations are statically imported from the client
folder: `app/christina-and-reboden/assets/photos/ceremony-cathedral.jpg` and
`reception-placida.jpg`. Both venue placeholders have been replaced. Update
`data/media.ts` if changing these selections; use static imports for hashed
asset URLs and update the alt text and sizes to match the replacement.

The Save the Date slide already uses the supplied transparent Polaroid collage
from `app/christina-and-reboden/assets/designs/save-the-date-images.webp`.

Prefer optimized JPEG or WebP sources around 1600px on the long edge. Next Image
selects responsive widths; ordinary photo quality uses the shared default.
