import { prenupMedia } from "./photo-media";
const chaise = prenupMedia["burgundy-gown-chaise-seated-edcel-facing.webp"];
const embrace = prenupMedia["sequin-dress-balcony-embrace-closeup.webp"];
const garden = prenupMedia["ivory-dress-garden-hand-in-hand-walk.webp"];
const doorway = prenupMedia["burgundy-gown-painted-doorway-full-length.webp"];
const staircase = prenupMedia["sequin-dress-spiral-staircase-standing.webp"];
const terrace = prenupMedia["burgundy-gown-terrace-linked-arms-closeup-revised.webp"];
const silhouette = prenupMedia["couple-window-silhouette.webp"];
const doorwayClose = prenupMedia["burgundy-gown-doorway-close-portrait.webp"];
const paintedBalcony = prenupMedia["burgundy-gown-painted-balcony-wide.webp"];
const balconyStanding = prenupMedia["sequin-dress-balcony-standing-portrait.webp"];

export const timelineGalleryPhotos = [
  { src: chaise, alt: "Apreal in her burgundy gown seated on a vintage chaise, with Edcel standing beside her." },
  { src: embrace, alt: "Edcel embracing Apreal in her sequin dress beside an ornate balcony." },
  { src: garden, alt: "Edcel and Apreal smiling at each other as they walk hand in hand through a garden." },
  { src: doorway, alt: "Edcel and Apreal in a black suit and burgundy gown together in a painted vintage doorway." },
  { src: staircase, alt: "Edcel and Apreal standing together at a wooden spiral staircase." },
  { src: terrace, alt: "Edcel and Apreal standing arm in arm on a rooftop terrace at dusk." },
  { src: silhouette, alt: "Edcel and Apreal facing each other in silhouette against a golden window." },
  { src: doorwayClose, alt: "Edcel standing beside Apreal in her burgundy gown at a painted doorway." },
  { src: paintedBalcony, alt: "Edcel and Apreal standing apart on an ornate balcony against a painted wall." },
  { src: balconyStanding, alt: "Edcel and Apreal standing together at a vintage balcony railing." },
] as const;
