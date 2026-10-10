import { entouragePhotoBreak } from "./entourage-photo-break";
import { hashtagBreakBackground, hashtagBreakPhotos } from "./hashtag-photo-break";
import { heroSlides } from "./hero-slides";
import { photos } from "./prenup-media";
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

// Keep the requested outdoor photo in the gallery as well as the hero.
const sharedHeroGalleryPhotoId = "outdoor-road-holding-hands";

export const galleryPhotos = photos
  .filter((photo) => !usedSources.has(photo.src) || photo.id === sharedHeroGalleryPhotoId)
  .sort((a, b) => Number(b.height > b.width) - Number(a.height > a.width));

// Swap these two tiles in both the grid and its lightbox sequence.
const legsPhotoIndex = galleryPhotos.findIndex((photo) => photo.id === "studio-shoes-detail-bw");
const overheadCoupleIndex = galleryPhotos.findIndex((photo) => photo.id === "cafe-overhead-wide-portrait");

if (legsPhotoIndex !== -1 && overheadCoupleIndex !== -1) {
  [galleryPhotos[legsPhotoIndex], galleryPhotos[overheadCoupleIndex]] =
    [galleryPhotos[overheadCoupleIndex], galleryPhotos[legsPhotoIndex]];
}

const outdoorPhotoIndex = galleryPhotos.findIndex((photo) => photo.id === sharedHeroGalleryPhotoId);
const cafeCandidIndex = galleryPhotos.findIndex((photo) => photo.id === "cafe-overhead-candid-smiles");

if (outdoorPhotoIndex !== -1 && cafeCandidIndex !== -1) {
  [galleryPhotos[outdoorPhotoIndex], galleryPhotos[cafeCandidIndex]] =
    [galleryPhotos[cafeCandidIndex], galleryPhotos[outdoorPhotoIndex]];
}
