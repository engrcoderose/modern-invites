import { entouragePhotoBreak } from "./entourage-photo-break";
import { hashtagBreakBackground, hashtagBreakPhotos } from "./hashtag-photo-break";
import { heroSlides } from "./hero-slides";
import { getPhoto, photos } from "./prenup-media";
import { sectionPhotos } from "./section-photos";
import { storySlides } from "./story-slides";

const usedSources = new Set([
  ...heroSlides,
  ...storySlides,
  ...Object.values(sectionPhotos),
  entouragePhotoBreak.photo,
  ...hashtagBreakPhotos,
  hashtagBreakBackground,
].map((photo) => photo.src));

const unusedPhotos = photos
  .filter((photo) => !usedSources.has(photo.src))
  .sort((a, b) => Number(b.height > b.width) - Number(a.height > a.width));

export const galleryPhotos = [
  ...unusedPhotos,
  getPhoto("cafe-doorway-embrace"),
];
