# Floral accents from the user's references

Current status after the October 31 image cleanup: only artwork referenced by the invitation remains locally. Prenup and story photos load from R2. Unused exports were backed up outside the repository; the descriptions and measurements below retain their historical provenance. See `docs/media/unused-image-cleanup.json` in the invitation folder for removed paths and recovery details.

The user supplied three floral images on October 28, 2026 and asked to use them in other invitation sections. Transparent floral adaptations were prepared with the built-in image-generation tool. Original supplied files remain untouched. Exact prompts are in the matching `.prompt.md` files.

| Artwork | Export | Size | Source reference |
| --- | --- | --- | --- |
| Rose hibiscus cascade (archived) | 640 × 1119 WebP | 201,010 bytes | `codex-clipboard-b4860982-cad6-45fe-b60f-7c332060a06c.png` |
| [Pressed burgundy cosmos](pressed-burgundy-cosmos.webp) | 640 × 629 WebP | 112,686 bytes | `codex-clipboard-90d30e87-5b00-4385-b9b7-79a99339fa75.png` |
| Wine and gold hibiscus (archived) | 640 × 751 WebP | 123,174 bytes | `codex-clipboard-561c41bb-4071-45da-83d3-04a874b67c07.png` |

Alpha channels were verified and preserved. Transparent outer padding was trimmed, maximum width reduced to 640px, no enlargement, WebP quality 85. Static imports and lazy responsive `next/image` instances use the default optimizer quality. Artwork is decorative, hidden from assistive technology and non-interactive.

Exact built-in image-generation prompts: [rose hibiscus cascade](rose-hibiscus-cascade.prompt.md), [pressed burgundy cosmos](pressed-burgundy-cosmos.prompt.md), and [wine and gold hibiscus](wine-and-gold-hibiscus.prompt.md).

`FloralAccent` retains a small cosmos finish in the guest notes. The other prepared variants remain available in this client library. Most repeated floral placements were replaced with the user's newer vintage embellishments in `../ephemera/` to vary the design. Photographs, text and form fields stay clear of decorative artwork.

