# Lace envelope

The user requested Ryan & Anne’s opening envelope implementation, changing only the envelope color to deep burgundy from the supplied reference.

`black-lace-envelope.webp` is an unchanged local copy of Ryan & Anne’s existing 1400 × 933 artwork. Its source is documented in `app/ryan-and-anne/docs/media/envelope-artwork.md`. It contains no other couple’s names.

`components/EnvelopeIntro.tsx`, `components/EnvelopeArtwork.tsx`, and `styles/envelope.module.css` retain the source component’s 3:2 scene, clip paths, layer order, perspective, 170-degree hinged flap, 2.8-second opening, seal movement, responsive sizing, and parchment backdrop. IDs and accessible labels are client-specific. `oval-monogram-seal.webp` replaces the former round seal with burgundy oval wax and a gold braided border. The supplied EA mark is overlaid in gold through scoped CSS, preserving its exact lettering. The timeline’s rose seal is unchanged.


The oval seal is a transparent 379 × 448 WebP, 58,314 bytes. An SVG color matrix applied in CSS recolors the envelope consistently across its back, pocket, and flap. It retains the paper/lace texture, geometry and shadows. The main invitation stays visually hidden and inert until the opening completes.
