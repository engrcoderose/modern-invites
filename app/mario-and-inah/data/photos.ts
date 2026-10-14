import type { StaticImageData } from "next/image";
import { samplePhotos } from "./sample-photos";

export type InvitationPhoto = {
  id: string;
  src: StaticImageData | string | null;
  alt: string;
  caption: string;
  position?: string;
  sample?: boolean;
};

function previewPhoto(id: string, caption: string, photo: (typeof samplePhotos)[keyof typeof samplePhotos]): InvitationPhoto {
  return { id, caption, ...photo, alt: `Sample photo: ${photo.alt}`, sample: true };
}

// User-selected shared photos fill the layout while the couple's photos are pending.
// Replace sources/alt text and remove sample:true for approved client photographs.
export const photos = {
  welcome: previewPhoto("welcome", "Welcome portrait", samplePhotos.sunset),
  invitation: previewPhoto("invitation", "Wedding portrait", samplePhotos.lanterns),
  story: [previewPhoto("story-first", "A favorite memory", samplePhotos.veranda), previewPhoto("story-second", "Together", samplePhotos.yellowWall)],
  cinematic: previewPhoto("cinematic", "A moment to remember", samplePhotos.goldenWall),
  closing: previewPhoto("closing", "Our next chapter", samplePhotos.colorfulShop),
};

export const heroPhotos = [
  photos.welcome,
  previewPhoto("hero-kiss", "A little romance", samplePhotos.kiss),
  photos.cinematic,
  photos.closing,
];

export const polaroids = [
  previewPhoto("polaroid-together", "Together", samplePhotos.sunset),
  previewPhoto("polaroid-moment", "Little moments", samplePhotos.lanterns),
  previewPhoto("polaroid-next", "Forever begins", samplePhotos.veranda),
];

export const galleryPhotos = [
  previewPhoto("gallery-sunset", "A sunset moment", samplePhotos.sunset),
  previewPhoto("gallery-lanterns", "Under the lanterns", samplePhotos.lanterns),
  previewPhoto("gallery-veranda", "A quiet moment", samplePhotos.veranda),
  previewPhoto("gallery-kiss", "A little romance", samplePhotos.kiss),
  previewPhoto("gallery-sunset-veranda", "Golden hour", samplePhotos.sunsetVeranda),
  previewPhoto("gallery-together", "Hand in hand", samplePhotos.together),
];

// A portrait centerpiece, four surrounding moments, and two wide closing frames.
export const closingGalleryPhotos = [
  galleryPhotos[1],
  galleryPhotos[4],
  photos.story[1],
  galleryPhotos[3],
  galleryPhotos[5],
  photos.cinematic,
  photos.closing,
];
