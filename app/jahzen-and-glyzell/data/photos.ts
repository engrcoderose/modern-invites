import hero from "../assets/photos/sample-hero.webp";
import cover from "../assets/photos/sample-cover.webp";
import invitation from "../assets/photos/sample-invitation.webp";
import story from "../assets/photos/sample-story.webp";
import cinematic from "../assets/photos/sample-cinematic.webp";
import flowers from "../assets/photos/sample-flowers.webp";
import portrait from "../assets/photos/sample-portrait.webp";


// User-approved sample photos. Replace these when the couple's own photos arrive.
export const photos = { hero, cover, invitation, story, cinematic, portrait };
// Landscape sources have ratio 3:2. Cover sizing accounts for frame height,
// portrait crops and maximum motion scale; portrait sources stay width-driven.
export const photoSizes = {
  cover: "max(100vw, 150svh)",
  hero: "max(112vw, 168svh)",
  cinematic: "max(110vw, 165svh)",
  invitation: "(max-width: 640px) min(calc(187.5vw - 90px), 960px), (max-width: 1023px) min(calc(187.5vw - 150px), 960px), min(calc(84.375vw - 148.5px), 960px)",
};
const mobileLandscape = "(max-width: 640px) max(calc(100vw - 48px), 480px), (max-width: 767px) max(calc(100vw - 80px), 480px), ";
const mobilePortrait = "(max-width: 640px) calc(100vw - 48px), (max-width: 767px) calc(100vw - 80px), ";
export const gallery = [
  { src: invitation, alt: "Sample photograph of a couple walking together", layout: "md:col-span-7 md:row-span-2", sizes: mobileLandscape + "max(min(calc(58.333vw - 51.667px), 742px), 594px)" },
  { src: portrait, alt: "Sample couple portrait", layout: "md:col-span-5 md:row-span-3", sizes: mobilePortrait + "min(calc(41.667vw - 40.333px), 527px)" },
  { src: cinematic, alt: "Sample photograph of a couple laughing", layout: "md:col-span-4 md:row-span-2", sizes: mobileLandscape + "594px" },
  { src: flowers, alt: "Sample photograph of a couple with flowers", layout: "md:col-span-3 md:row-span-2", sizes: mobileLandscape + "594px" },
  { src: story, alt: "Sample photograph of a couple embracing", layout: "md:col-span-5 md:row-span-1", sizes: mobileLandscape + "max(min(calc(41.667vw - 40.333px), 527px), 288px)" },
];


