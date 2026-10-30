# Lace envelope

The user requested Ryan & Anne’s opening envelope implementation, changing only the envelope color to deep burgundy from the supplied reference.

`black-lace-envelope.webp` is an unchanged local copy of Ryan & Anne’s existing 1400 × 933 artwork. Its original generation prompt and source are documented in `app/ryan-and-anne/docs/media/envelope-artwork.md`. It is not the supplied screenshot and contains no other couple’s names.

`components/EnvelopeIntro.tsx`, `components/EnvelopeArtwork.tsx`, and `styles/envelope.module.css` retain the source component’s 3:2 scene, clip paths, layer order, perspective, 170-degree hinged flap, 2.8-second opening, seal movement, responsive sizing, and parchment backdrop. IDs and accessible labels are client-specific. `oval-monogram-seal.webp` replaces the former round seal with burgundy oval wax and a gold braided border. The supplied EA mark is overlaid in gold through scoped CSS, preserving its exact lettering. The timeline’s rose seal is unchanged.

The new seal is a transparent 379 × 448 WebP, 58,314 bytes, optimized from the built-in image generation tool. Its generation prompt is recorded in [oval-monogram-seal.prompt.md](oval-monogram-seal.prompt.md).

An SVG color matrix applied in CSS recolors the same image consistently across its back, pocket, and flap. It retains the actual paper/lace texture, geometry and shadows without regenerating or redrawing the artwork. The flap underside and interior base use matching burgundy colors. The main invitation stays visually hidden and inert until the opening completes.
