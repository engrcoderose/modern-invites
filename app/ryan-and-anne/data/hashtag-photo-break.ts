import { getPhoto } from "./prenup-media";

export const hashtagBreakBackground = getPhoto(
  "wedding-newspaper-couple-detail",
);

// Cover sizing accounts for each source's orientation in the 3:4 portrait frames.
const landscapeSizes =
  "(min-width: 1428px) 606px, (min-width: 1024px) calc(66.67vw - 213.33px), (min-width: 640px) calc(66.67vw - 117.33px), calc(66.67vw - 42.67px)";
const portraitSizes =
  "(min-width: 1428px) 303px, (min-width: 1024px) calc(33.33vw - 106.67px), (min-width: 640px) calc(33.33vw - 58.67px), calc(33.33vw - 21.33px)";

export const hashtagBreakPhotos = [
  { id: "red-sofa-newspaper-candid", position: "50% 60%" },
  { id: "studio-newspaper-seated-portrait", position: "50% 42%" },
  { id: "staircase-candid-smiles", position: "61% 44%" },
].map(({ id, position }) => {
  const photo = getPhoto(id);
  return {
    ...photo,
    position,
    sizes: photo.width > photo.height ? landscapeSizes : portraitSizes,
  };
});

export const hashtagBreakBackgroundSizes =
  "(min-width: 1024px) max(100vw, 1020px), (min-width: 640px) max(100vw, 750px), max(100vw, 450px, calc(66.67vw + 197.33px))";
