import type { GalleryImage } from "./types";
import { Walking, Together, Garden, Sitting, Embrace, Portrait, PrenupMoment, WelcomePhoto } from "./prenup-media";

export { Sitting as PrenupPoster, ChurchImage, Walking as StoryWalk, Portrait as StoryEmbrace } from "./prenup-media";

export const invitationPreview = {
  url: "/joshua-and-bea-wedding-og.jpg",
  width: 1892,
  height: 932,
  type: "image/jpeg",
  alt: "Joshua & Bea wedding invitation — June 19, 2027 · The Garden Chapel · Tagaytay",
};

export const gallery: GalleryImage[] = [
  Walking,
  Portrait,
  Garden,
  Sitting,
  Embrace,
  PrenupMoment,
  Together,
  WelcomePhoto,
].map((src, index) => ({
  src,
  alt: `A moment from our love story · Photograph ${index + 1}`,
}));
