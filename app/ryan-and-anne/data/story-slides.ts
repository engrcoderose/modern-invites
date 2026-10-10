import { getPhoto } from "./prenup-media";

// Landscape photos cover a 2:3 card that is 180–360px wide (55vw in between).
export const storyImageSizes = "(min-width:655px) 810px, (min-width:328px) 123.75vw, 405px";

export const storySlides = [
  { id: "bar-close-embrace", position: "62% 42%" },
  { id: "cafe-doorway-smiles", position: "66% 45%" },
  { id: "staircase-candid-embrace", position: "45% 44%" },
  { id: "cafe-overhead-embrace", position: "49% 43%" },
  { id: "studio-newspaper-seated-smiles", position: "50% 42%" },
].map(({ id, position }) => {
  const photo = getPhoto(id);
  return {
    ...photo,
    position,
    sizes: photo.height > photo.width
      ? "(min-width:655px) 360px, (min-width:328px) 55vw, 180px"
      : storyImageSizes,
  };
});

