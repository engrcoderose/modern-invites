import { prenupMedia } from "./photo-media";
const terrace = prenupMedia["burgundy-gown-rooftop-terrace-wide.webp"];
const windowSeat = prenupMedia["ivory-dress-window-seat-wide.webp"];
const windowEmbrace = prenupMedia["sequin-dress-window-framed-embrace.webp"];

export const heroPhotos = [
  { src: terrace, alt: "Edcel and Apreal in a black suit and burgundy gown on a vintage rooftop terrace", position: "42% 40%" },
  { src: windowSeat, alt: "Edcel and Apreal seated together in ivory and black beside a vintage window", position: "39% 60%" },
  { src: windowEmbrace, alt: "Edcel and Apreal embracing beside a window and ornate balcony", position: "28% 40%" },
] as const;
