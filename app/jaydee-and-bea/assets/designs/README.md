# Active invitation artwork

Local artwork uses static imports for content-hashed URLs and responsive Next Image optimization. The active files are grouped by purpose:

- Hero and opening: the hero WebP layers and both bird flocks, configured in data/hero-artwork.ts. The hero background and couple illustration are also used by the portfolio.
- Countdown: countdown-timer-flowers-watercolor.png.
- Entourage: the five supplied entourage PNGs for the upper corners, fountain, and lower columns.
- Story: story-portrait-floral.webp, story-flower-border.webp, and flower.png. The framed portrait contains the dscf1558 photograph; its source identity is recorded in data/story-photos.ts.
- Timeline: timeline-border-flowers.jpg.
- Galleries and RSVP: gallery-floral-background.webp and flowers-one.png.
- Attire: formal-attire-inspiration-hd.png (2048 x 768, transparent) and rose-urn-washed-watercolor.png (960 x 960, transparent).

The HD attire illustration and washed rose urn are generated artwork. Their active images remain; image-generation prompt sidecars were removed at the user's request. Superseded countdown/timeline artwork and redundant story source canvases were also removed. The remaining local artwork is referenced by the invitation or portfolio.

Remote venue illustrations and leafy/floral dividers are configured in data/design-media.ts. Remote paper textures remain in the scoped CSS. This cleanup did not delete or modify any remote media. Historical R2 verification reports remain under docs/media.
