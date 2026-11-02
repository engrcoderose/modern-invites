import { prenupMedia } from "./photo-media";
const terrace = prenupMedia["burgundy-gown-terrace-linked-arms-full-length.webp"];
const windowSeat = prenupMedia["ivory-dress-window-seat-wide.webp"];
const windowEmbrace = prenupMedia["sequin-dress-window-framed-embrace.webp"];
const silhouette = prenupMedia["couple-window-silhouette.webp"];

export const heroPhotos = [
  { src: terrace, alt: "Edcel and Apreal standing arm in arm in a black suit and burgundy gown on a vintage terrace", position: "50% 12%" },
  { src: windowSeat, alt: "Edcel and Apreal seated together in ivory and black beside a vintage window", position: "39% 60%" },
  { src: windowEmbrace, alt: "Edcel and Apreal embracing beside a window and ornate balcony", position: "28% 40%" },
  { src: silhouette, alt: "Edcel and Apreal facing each other in silhouette against a golden window", position: "50% 40%" },
] as const;
