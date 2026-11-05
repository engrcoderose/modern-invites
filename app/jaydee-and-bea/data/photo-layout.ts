import { prenupPhotos as photos } from "./prenup-media";
import { storyPhotoSources } from "./story-photos";
import type { GalleryPhoto } from "../types/wedding";

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

export const rsvpPhoto = photos.ljd4660;

const photoSource = (photo: GalleryPhoto) => typeof photo.src === "string" ? photo.src : photo.src.src;

const usedPhotoSources = new Set([
  ...photoBreaks.timelineSlides,
  photoBreaks.afterStory,
  photoBreaks.afterEntourage,
  rsvpPhoto,
  ...Object.values(storyPhotoSources),
].map(photoSource));

// Reserve each source as it is assigned, including duplicates within one gallery.
function takeUnusedPhotos(candidates: readonly GalleryPhoto[]) {
  return candidates.filter((photo) => {
    const source = photoSource(photo);
    if (usedPhotoSources.has(source)) return false;
    usedPhotoSources.add(source);
    return true;
  });
}

const carouselPhotos = takeUnusedPhotos([
  photos.dscf1541, photos.dscf1089RevA, photos.dscf1793RevB, photos.ljd4746,
  photos.dscf1588, photos.dscf1678RevA, photos.dscf1768,
]);

export const galleries: readonly (readonly GalleryPhoto[])[] = [
  carouselPhotos,
  // Lead with the unused portrait for the tall featured tile, then exclude used photos.
  takeUnusedPhotos([photos.ljd4631, ...Object.values(photos)]),
];
