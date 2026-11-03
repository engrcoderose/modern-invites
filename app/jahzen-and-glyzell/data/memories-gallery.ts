import { photos } from "./photos";
import { storyPhoto } from "./story-photos";

// Include the source width needed to cover each frame at its intrinsic ratio.
const portraitSizes = "(min-width: 1280px) 384px, (min-width: 1024px) calc(33.33vw - 42.67px), (min-width: 768px) calc(33.33vw - 26.67px), (min-width: 640px) calc(50vw - 36.67px), calc(50vw - 22px)";
const landscapeSizes = "(min-width: 1280px) 417px, (min-width: 1024px) calc(37.5vw - 63px), (min-width: 768px) calc(37.5vw - 45px), (min-width: 640px) calc(56.25vw - 56.25px), calc(56.25vw - 33.75px)";
const closingSizes = "(min-width: 1280px) 417px, (min-width: 1024px) calc(37.5vw - 63px), (min-width: 768px) calc(37.5vw - 45px), (min-width: 640px) calc(112.5vw - 90px), calc(112.5vw - 54px)";

export const memoriesGallery = [
  { id: "quiet-portrait", src: photos.portrait, alt: "A couple sharing a quiet moment", position: "center 35%", sizes: portraitSizes },
  { id: "walking", src: photos.invitation, alt: "A couple walking together outdoors", position: "46% center", sizes: landscapeSizes },
  { id: "bouquet", src: photos.hashtagBreak, alt: "A couple sitting together with a bouquet", position: "69% center", sizes: landscapeSizes },
  { id: "together", src: photos.hero, alt: "A couple relaxing together beneath a tree", position: "center", sizes: landscapeSizes },
  { id: "laughter", src: photos.cinematic, alt: "A couple sharing a laugh", position: "center", sizes: landscapeSizes },
  { id: "embrace", src: photos.story, alt: "A couple embracing outdoors", position: "62% center", sizes: landscapeSizes },
  { id: "under-the-trees", src: photos.cover, alt: "A couple together beneath overhanging branches", position: "center", sizes: landscapeSizes },
  { id: "golden-wall", src: storyPhoto.src, alt: "A couple walking hand in hand beside a golden wall", position: storyPhoto.position, sizes: closingSizes },
];
