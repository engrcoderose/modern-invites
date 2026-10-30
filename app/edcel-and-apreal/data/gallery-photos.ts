import { prenupMedia } from "./photo-media";
const sofa = prenupMedia["ivory-dress-sofa-portrait-cropped.webp"];
const kiss = prenupMedia["ivory-dress-forehead-kiss.webp"];
const hallway = prenupMedia["burgundy-gown-arched-hallway-standing.webp"];
const windowSeat = prenupMedia["ivory-dress-window-seat-portrait.webp"];
const doorway = prenupMedia["burgundy-gown-doorway-smiling-portrait.webp"];
const balcony = prenupMedia["sequin-dress-balcony-full-length-revised.webp"];
const staircase = prenupMedia["sequin-dress-spiral-staircase-seated.webp"];
const garden = prenupMedia["ivory-dress-garden-sunglasses-veil.webp"];
const terrace = prenupMedia["burgundy-gown-terrace-linked-arms-full-length.webp"];
const suitcase = prenupMedia["burgundy-gown-vintage-suitcase-holding-hands.webp"];

export const galleryPhotos = [
  { src: hallway, alt: "Edcel and Apreal in a black suit and burgundy gown beneath a vintage arch", position: "50% 40%" },
  { src: kiss, alt: "Edcel kissing Apreal’s forehead as they hold hands", position: "50% 35%" },
  { src: sofa, alt: "Edcel and Apreal posed together beside an ornate sofa", position: "50% 45%" },
  { src: windowSeat, alt: "Edcel and Apreal seated closely together in front of a vintage window", position: "50% 40%" },
  { src: doorway, alt: "Apreal smiling in her burgundy gown with Edcel beside her in a painted doorway", position: "50% 35%" },
  { src: balcony, alt: "Edcel and Apreal holding hands beside an ornate balcony", position: "50% 40%" },
  { src: staircase, alt: "Edcel beside Apreal seated at the foot of a wooden spiral staircase", position: "50% 45%" },
  { src: garden, alt: "Edcel and Apreal wearing sunglasses together in a leafy garden", position: "50% 40%" },
  { src: terrace, alt: "Edcel and Apreal walking arm in arm on a stone terrace", position: "50% 40%" },
  { src: suitcase, alt: "Edcel and Apreal holding hands beside a vintage suitcase in the arched hallway", position: "50% 45%" },
] as const;
