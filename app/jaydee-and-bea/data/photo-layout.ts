import { prenupPhotos as photos } from "./prenup-media";
import { storyPhotos } from "./story-photos";
import type { GalleryPhoto } from "../types/wedding";

const carouselPhotos: readonly GalleryPhoto[] = [
  photos.dscf1541, photos.dscf0947, photos.dscf1472RevC, photos.dscf1558,
  photos.dscf1588, photos.dscf1678RevA, photos.dscf1768,
];

export const photoBreaks = {
  afterStory: photos.ljd4626,
  // First pictures section: supplied F1–F5 reference, top row then bottom row.
  timelineSlides: [
    photos.dscf1360,
    photos.dscf1232,
    photos.dscf1472RevC,
    photos.ljd4819BluGreen,
    photos.dscf0947,
  ],
  afterEntourage: photos.ljd4794,
};

export const rsvpPhoto = photos.dscf1232;

const usedPhotoSources = new Set<GalleryPhoto["src"]>([
  ...carouselPhotos,
  ...photoBreaks.timelineSlides,
  photoBreaks.afterStory,
  photoBreaks.afterEntourage,
  rsvpPhoto,
  ...Object.values(storyPhotos),
].map((photo) => photo.src));

export const galleries: readonly (readonly GalleryPhoto[])[] = [
  carouselPhotos,
  // Lead with the unused portrait for the tall featured tile, then exclude used photos.
  [photos.ljd4631, ...Object.values(photos).filter((photo) => photo !== photos.ljd4631)]
    .filter((photo) => !usedPhotoSources.has(photo.src)),
];
