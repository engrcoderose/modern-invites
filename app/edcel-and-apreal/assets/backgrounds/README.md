# Invitation background textures

The cream embossed entourage texture and its exact generation prompt are documented in [entourage-background.md](entourage-background.md).

## Gift-section watercolor backgrounds

- `gifts-burgundy-watercolor-mobile.webp`: the user's supplied portrait texture, 941 × 1672, optimized to 40,522 bytes from 2,104,106 bytes. Original file remains untouched at `C:/Users/Spades/AppData/Local/Temp/codex-clipboard-3b4082da-29f6-4bf9-b20b-f498fd2b948e.png`.
- `gifts-burgundy-watercolor-desktop.webp`: matching landscape artwork generated with the built-in image-generation tool, 1672 × 941, optimized to 69,328 bytes from 1,890,526 bytes. Generated source remains at `C:/Users/Spades/.codex/generated_images/01a17e24-f4f5-7951-9e8a-63715425a9ea/exec-b3ef08ed-237e-4b45-a5e9-5f552025f758.png`.

Both project assets use WebP quality 85. `GiftsSection` uses static imports and `getImageProps` inside a native picture element: the desktop source applies from 768px, while mobile uses the supplied portrait. The selected image remains lazy, decorative, and optimized by Next at its default quality. A light darkening layer supports ivory copy. The original QR images, their white quiet zones and download links are unchanged.

## Generation prompt (built-in tool)

Use case: stylized-concept. Asset type: desktop website section background. Input image: the supplied portrait burgundy watercolor texture is the visual reference. Generate a matching wide landscape version, ideally 2048 x 1152 pixels (16:9), extending its organic layered watercolor washes naturally across the full width. Preserve the reference's very dark wine-red and burgundy palette, soft irregular pigment blooms, fine paper-like texture, and subtle near-black shadows. Flat full-bleed abstract texture only, no objects or central subject. Keep tonal variation restrained and the middle calm enough for ivory wedding gift copy placed in HTML. Match the reference closely; do not add decorative flowers, frames, lace, lettering, symbols, QR codes, gradients that look digital, or a watermark. Opaque background.

The tool returned 1672 × 941; it was preserved at native resolution rather than upscaled.
