import { prenupMedia } from "./photo-media";
import type { StaticImageData } from "next/image";
const suitcase = prenupMedia["burgundy-gown-vintage-suitcase-sunglasses-revised.webp"];
const balconySeated = prenupMedia["sequin-dress-balcony-seated-edcel-revised.webp"];
const leaning = prenupMedia["sequin-dress-balcony-leaning-closeup.webp"];
const hallwayTilted = prenupMedia["burgundy-gown-arched-hallway-tilted-revised.webp"];
const garden = prenupMedia["ivory-dress-garden-sunglasses-standing.webp"];
const paintedWall = prenupMedia["ivory-dress-hand-in-hand-painted-wall.webp"];
const windowPortrait = prenupMedia["ivory-dress-wood-paneled-window-portrait.webp"];
const balconyForeground = prenupMedia["sequin-dress-balcony-apreal-foreground.webp"];
const aprealTerrace = prenupMedia["apreal-burgundy-gown-terrace-leaning.webp"];
const aprealGloves = prenupMedia["apreal-sequin-dress-red-gloves-portrait.webp"];
const aprealOverhead = prenupMedia["apreal-sequin-dress-staircase-overhead.webp"];
const aprealStaircase = prenupMedia["apreal-sequin-dress-wooden-staircase-revised.webp"];
const chandelier = prenupMedia["burgundy-gown-arched-hallway-chandelier.webp"];
const chaise = prenupMedia["burgundy-gown-chaise-seated-edcel-profile.webp"];
const edcelOverhead = prenupMedia["edcel-black-shirt-window-overhead.webp"];
const edcelWindow = prenupMedia["edcel-black-shirt-window-profile.webp"];
const edcelHallway = prenupMedia["edcel-black-suit-arched-hallway.webp"];
const edcelTerrace = prenupMedia["edcel-black-suit-terrace-profile.webp"];
const newspapersCloseup = prenupMedia["save-the-date-newspapers-closeup.webp"];
const newspapersPortrait = prenupMedia["save-the-date-newspapers-portrait.webp"];
const mirror = prenupMedia["sequin-dress-balcony-mirror-reflection.webp"];
const balconyTilted = prenupMedia["sequin-dress-balcony-tilted-portrait.webp"];
const staircaseWide = prenupMedia["sequin-dress-staircase-wide-overhead.webp"];

export type MemoryPhoto = { src: StaticImageData; alt: string; position: string };

export const memoryPhotos = [
  { src: suitcase, alt: "Edcel in sunglasses beside Apreal in her burgundy gown, with a vintage suitcase beneath the arched window.", position: "50% 42%" },
  { src: balconySeated, alt: "Apreal in her sequin gown standing beside Edcel seated on an ornate balcony.", position: "58% 12%" },
  { src: leaning, alt: "Edcel leaning close to Apreal beside the vintage balcony railing.", position: "50% 45%" },
  { src: hallwayTilted, alt: "An angled portrait of Edcel and Apreal beneath the teal arched window.", position: "50% 48%" },
  { src: garden, alt: "Edcel and Apreal in sunglasses and ivory outfits standing together in a leafy garden.", position: "50% 35%" },
  { src: paintedWall, alt: "Edcel and Apreal holding hands beneath a chandelier in front of a painted wall.", position: "50% 65%" },
  { src: windowPortrait, alt: "Edcel standing beside Apreal seated at a wood-paneled window in her ivory dress.", position: "55% 12%" },
  { src: balconyForeground, alt: "Apreal at the balcony railing with Edcel standing behind her near a window.", position: "45% 35%" },
  { src: aprealTerrace, alt: "Apreal in her burgundy gown leaning against a stone terrace railing.", position: "50% 35%" },
  { src: aprealGloves, alt: "Apreal in a sequin gown and red gloves beside an ornate balcony chair.", position: "50% 35%" },
  { src: aprealOverhead, alt: "An overhead portrait of Apreal in her sequin gown on a wooden staircase.", position: "55% 40%" },
  { src: aprealStaircase, alt: "Apreal in her sequin gown and red gloves beside a wooden spiral staircase.", position: "50% 40%" },
  { src: chandelier, alt: "Edcel and Apreal standing beneath a chandelier in a tall arched hallway.", position: "50% 55%" },
  { src: chaise, alt: "Apreal seated on a vintage chaise with Edcel standing beside her in profile.", position: "50% 45%" },
  { src: edcelOverhead, alt: "An overhead portrait of Edcel in a black shirt beside a vintage chair and window.", position: "50% 40%" },
  { src: edcelWindow, alt: "Edcel in profile beside a window and a vintage upholstered chair.", position: "50% 40%" },
  { src: edcelHallway, alt: "Edcel in a black suit beneath the teal arched window.", position: "50% 40%" },
  { src: edcelTerrace, alt: "Edcel looking back from a stone rooftop terrace railing.", position: "50% 35%" },
  { src: newspapersCloseup, alt: "A close view of Edcel and Apreal holding their save-the-date newspapers.", position: "50% 50%" },
  { src: newspapersPortrait, alt: "Edcel and Apreal holding save-the-date newspapers in front of a painted wall.", position: "50% 50%" },
  { src: mirror, alt: "Apreal at the balcony railing with Edcel reflected in a framed mirror.", position: "50% 40%" },
  { src: balconyTilted, alt: "An angled balcony portrait with Apreal in the foreground and Edcel behind her.", position: "50% 40%" },
  { src: staircaseWide, alt: "A wide overhead view of Edcel and Apreal across the ornate wooden staircase.", position: "50% 50%" },
] satisfies MemoryPhoto[];
