import { getPhoto } from "./prenup-media";

export const heroSlideInterval = 5000;

// Focal points preserve the couple when landscape photos fill a portrait screen.
export const heroSlides = [
  { id: "cafe-doorway-facing-portrait", position: "61% 38%" },
  { id: "cafe-overhead-portrait", position: "61% 38%" },
  { id: "outdoor-road-holding-hands", position: "53% 65%" },
  { id: "red-sofa-portrait", position: "76% 38%" },
  { id: "staircase-looking-up-smiles", position: "47% 38%" },
  { id: "red-sofa-newspaper-laughter", position: "58% 35%" },
].map(({ id, position }) => ({ ...getPhoto(id), position }));

// Each source is 3:2. Cover sizing includes the hero's minimum height and navbar.
export const heroImageSizes = "max(100vw, 780px, calc(150svh - 114px))";
