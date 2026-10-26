import type { PhotoAlbum } from "../domain/photo-sharing";

// Illustrative names and submissions. These are existing marketing sample photos,
// not photographs of the fictional couple or real guest contributions.
export const demoAlbumDetails = {
  slug: "demo",
  names: "Alex & Jamie",
  title: "Our day, through your eyes",
  guestPath: "/memories/demo",
  previewPath: "/photo-sharing-preview",
};

export const demoAlbumArtwork = [
  { source: "/images/hero-scroll-romantic-couple.jpg", alt: "Sample album photograph of a couple sitting beneath a tree", caption: "the little moments" },
  { source: "/images/hero-scroll-cinematic.jpg", alt: "Sample album photograph of a couple sharing a quiet moment", caption: "the memories we keep" },
];

export function createDemoAlbum(): PhotoAlbum {
  return {
    version: 1,
    settings: { uploadsOpen: true, galleryVisible: true, moderationRequired: true },
    photos: [
      { id: "sample-1", guestName: "Taylor", caption: "A little moment, a lovely memory.", fileName: "sample-couple.jpg", size: 1240000, createdAt: "2026-10-20T09:30:00.000Z", status: "approved", source: "/images/hero-scroll-romantic-couple.jpg" },
      { id: "sample-2", guestName: "Morgan", caption: "Here’s to your next chapter.", fileName: "sample-celebration.jpg", size: 980000, createdAt: "2026-10-20T10:00:00.000Z", status: "approved", source: "/images/hero-scroll-cinematic.jpg" },
      { id: "sample-3", guestName: "Sam", caption: "The happiest kind of day.", fileName: "sample-memory.jpg", size: 1100000, createdAt: "2026-10-20T10:30:00.000Z", status: "pending", source: "/images/hero-scroll-romantic-couple.jpg" },
      { id: "sample-4", guestName: "Riley", caption: "One for the album.", fileName: "sample-evening.jpg", size: 850000, createdAt: "2026-10-20T11:00:00.000Z", status: "hidden", source: "/images/hero-scroll-cinematic.jpg" },
    ],
  };
}
