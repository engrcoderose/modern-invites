import { getPhoto } from "./prenup-media";

export const storySlides = [
  { id: "bar-close-embrace", position: "62% 42%" },
  { id: "cafe-doorway-smiles", position: "66% 45%" },
  { id: "staircase-candid-embrace", position: "45% 44%" },
  { id: "cafe-overhead-embrace", position: "49% 43%" },
  { id: "studio-back-to-back-portrait", position: "62% 35%" },
].map(({ id, position }) => ({ ...getPhoto(id), position }));

// Landscape photos cover a 2:3 card that is 180–360px wide (55vw in between).
export const storyImageSizes = "(min-width:655px) 810px, (min-width:328px) 123.75vw, 405px";
