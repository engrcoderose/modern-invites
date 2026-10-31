# Floral artwork provenance

## Envelope and Save the Date

The user supplied `../designs/close-envelope.png` (684×684), `../designs/open-envelope.png` (492×641), and `../designs/joy-and-rolly-save-the-date.png` (437×567) on November 1, 2026 for the opening sequence. The original transparent PNGs are unchanged. Scoped CSS accounts for source padding and clips layers along the envelope's actual folds; Framer Motion animates those layers and the complete Save the Date image. The small envelope PNGs reuse their already compressed originals, while the card uses responsive Next Image optimization. Each original has an adjacent provenance sidecar. No image generation, redrawing, or retouching was used.

## Entourage background

`entourage-blue-floral-pattern.webp` uses the user's blue floral pattern, attachment `codex-clipboard-5187bc93-78f7-4320-a0d3-0fc90cad7550.png`. It was resized from 1152×2048 to 768px wide and compressed as WebP at quality 85, with no generation, recoloring, or retouching. The Wedding Entourage section repeats it on a separate decorative background layer at 12% opacity, leaving all text fully opaque. The adjacent metadata sidecar records its origin.

## New section floral spray

`floral-spray.webp` was generated with the built-in image generation tool on October 29, 2026. It is an original watercolor spray of ivory and powder-blue roses, lavender lisianthus, small plum buds, pale-blue delphinium, and sage foliage. The generated 1983×793 transparent PNG was resized to 1200px wide and compressed as WebP at quality 85 with transparent alpha preserved. The timeline and RSVP sections reuse it as lazy-loaded decorative corner accents. The exact prompt is saved in `floral-spray.prompt.txt` and the adjacent provenance sidecar. No source artwork or photographs were changed.

`floral-corner.webp` was generated for this invitation using the built-in image generation tool on October 28, 2026. The questionnaire's embedded bouquet image informed the color palette; the artwork is original decorative imagery, not a photograph of the couple or their event. Transparent alpha is preserved. The generated PNG was resized to a maximum width of 1000 pixels and compressed as WebP for the site.

Exact generation prompt:

Use case: illustration-story. Asset type: transparent decorative floral artwork for Joy and Rolly wedding invitation website. Create one exquisite fine art watercolor floral arrangement, isolated on a genuinely transparent background, no lettering, no borders, no paper, no shadow. Loose asymmetric L-shaped corner bouquet, with the flowers concentrated in the bottom left and delicate stems reaching up and toward the right, airy negative space in the top right. English garden roses in ivory and powder blue #A4CFFA, delicate lavender #8288BE lisianthus, a few deep plum #5B1962 lisianthus, muted sage eucalyptus leaves, tiny white flowers, painterly translucent petals and sophisticated natural botanical detail. Overall mostly ivory, lavender and powder blue with small plum accents. Designed for premium printed wedding stationery. Entire bouquet contained within image, unclipped leaf tips. Portrait approximately 4:5 composition.

## Hero background

The active hero background is the user's `../designs/hero-bg.jpg`, a 1170×775 lavender-and-peach sunset painting of a swan lake and wisteria, matching the reference supplied on November 1, 2026. The original JPEG is statically imported without generation or source-file changes. A separate CSS plum gradient supports live white text, and the existing monogram is displayed white via CSS. The adjacent `designs/hero-bg.jpg.json` records the source. The previous wash below is no longer imported by the hero.

`hero-lavender-wash.webp` is an opaque, decoration-free lavender watercolor wash. The earlier generated botanical drawings and small flower were removed with the built-in image editing tool so they do not duplicate the user's supplied artwork. Names and dates remain live HTML; the hero's original monogram and two botanical line-art flowers are direct static imports from `../designs/monogram.png`, `../designs/flower-1.png`, and `../designs/flower-2.png`. Those source PNGs are unchanged. The wash is compressed as WebP at quality 85, with the exact edit prompt in the adjacent metadata sidecar. The superseded decorated backdrop has been removed from the project.

## Countdown background

`countdown-satin-lilies.webp` is original ivory satin and lavender lily background artwork generated with the built-in image generation tool using the user's supplied countdown reference on October 28, 2026. Typography and live countdown digits are rendered in HTML, not baked into the artwork. It is optimized as WebP at quality 85, with the exact generation prompt in the adjacent metadata sidecar.

## Venue photographs

The venues background, `venue-embossed-pattern.webp`, comes directly from the user attachment `codex-clipboard-0b53e810-b01e-44c6-a52e-766bd28ef0e2.png`. Its original 768×1385 dimensions are preserved and compressed at WebP quality 85 (about 61KB). No generation, recoloring, or retouching was applied. Scoped CSS displays it as a centered cover background across the venues section, with a content-hashed asset URL produced by the build. Its source details are saved in the adjacent metadata sidecar.

`venue-lavender-corner.webp` uses the user's supplied lavender decoration, attachment `codex-clipboard-f069874e-8c02-46f3-94c1-05b4ae3d5aba.png`. Its original 532×606 dimensions and transparent alpha are preserved; it is compressed as WebP quality 85 without generation, retouching, or recoloring. The venues section reuses one static import at the upper-left (CSS rotation 180°) and bottom-right (original orientation), with lazy loading and responsive 110px/200px widths. Source details are in its adjacent metadata sidecar.

The user supplied both venue photographs on October 28, 2026. They are resized only as needed and compressed as WebP at quality 85; neither is generated or retouched. `ceremony-san-alfonso-parish.webp` comes from attachment `codex-clipboard-63bd692f-6130-4ceb-8996-8afb6e9c77e4.png`; `reception-the-club-at-northtown.webp` comes from `codex-clipboard-ec691049-6138-4985-9fe0-f17c642558ab.png`. The website uses static imports, lazy loading, and responsive optimized widths in 4:3 frames. Source provenance is retained in the adjacent metadata sidecars.

## Dress-code illustration

`attire-guide.png` was regenerated with the built-in image generation tool on October 28, 2026, using the user's `codex-clipboard-5c88f0ee-2c6c-4e60-a9ec-b148d4843f4a.png` as an outfit reference. The four full-length figures show a lilac gown, dusty blue formal shirt, ivory Barong Tagalog, and tan gown. The 1448×1086 PNG preserves genuine transparent alpha and was losslessly compressed. Text and swatches remain accessible HTML outside the illustration. The exact generation prompt is embedded in the PNG and saved in `attire-guide.prompt.txt`.
