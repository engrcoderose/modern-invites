# Invitation screen captures

These are actual mobile captures of the invitation presentation components,
prepared on November 23, 2026. They preserve each design's artwork and rendered
typography; they are not generated invitation concepts.

- Capture the opening cover and the settled hero after opening at 390 × 824.
- For invitations that begin with a film, capture the hero section after the film.
- Ashley and Stephanie open directly to their hero. Reuse that single asset for
  both frames and keep `hasOpening: false` in `lib/portfolio-screens.ts`.
- Use a frontend-only local preview with RSVP and guest-data components omitted.
  Do not load private environment files or connect to the backend for captures.
- Wait for fonts, visible images, and entrance transitions before capturing.
- Compress the captures as WebP at quality 85. Keep the original proportions.
- Update the matching static imports in `lib/portfolio-screens.ts` when a design
  changes. Static imports provide content-hashed image URLs.

`PhonePreview.tsx` supplies both phone frames. Keep device hardware and showcase
captions outside these assets so the opening and hero use identical mockups.
