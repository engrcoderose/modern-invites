# Countdown artwork

The current countdown uses three independent layers:

- [wine-satin-burgundy-4b0f1f-v2.webp](wine-satin-burgundy-4b0f1f-v2.webp): `#4B0F1F` satin backdrop, 1672 × 941, 128,516 bytes.
- [floral-top-right.webp](floral-top-right.webp): transparent 960 × 960 corner, 293,806 bytes.
- [floral-bottom-left.webp](floral-bottom-left.webp): transparent 960 × 960 corner, 336,810 bytes.

The flowers retain their alpha channels. Source WebP quality is 92; the component requests responsive images at quality 90. `CountdownArtwork` moves the two flower corners independently with scroll progress while leaving the satin and text still. Reduced motion keeps the flowers stationary. Title, timer and confirmed ceremony target remain native HTML/data.
