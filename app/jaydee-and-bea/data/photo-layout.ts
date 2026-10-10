import { main1, main2, main3, main4, main5, group1, group2, group3, group4, group5 } from "./prenup-media";
import type { GalleryPhoto } from "../types/wedding";

// Draft prenup assets only. Replace with the couple's approved photographs.
export const placeholderGalleries: readonly (readonly GalleryPhoto[])[] = [
  [
    { src: main1, alt: "Placeholder prenup portrait of a couple silhouetted against a pink sunset" },
    { src: main2, alt: "Placeholder prenup portrait of a couple seated beside red lanterns" },
    { src: main3, alt: "Placeholder prenup portrait of a couple beneath an ornate green arch" },
    { src: main4, alt: "Placeholder prenup portrait of a couple holding hands beside a yellow wall" },
    { src: main5, alt: "Placeholder prenup portrait of a couple outside a lantern-filled courtyard" },
  ],
  [
    { src: group1, alt: "Placeholder prenup photograph of a couple walking along a yellow wall" },
    { src: group2, alt: "Placeholder prenup photograph of a couple facing a historic yellow wall" },
    { src: group3, alt: "Placeholder prenup photograph of a couple silhouetted beneath a pavilion at sunset" },
    { src: group4, alt: "Placeholder prenup photograph of a couple holding hands below red lanterns" },
    { src: group5, alt: "Placeholder prenup photograph of a couple walking past a tiled-roof courtyard" },
  ],
];

export const photoBreaks = {
  afterStory: placeholderGalleries[1][2],
  timelineSlides: placeholderGalleries[0].slice(1, 4),
  afterEntourage: placeholderGalleries[1][4],
};

// Reuse the yellow-wall photograph selected for the welcome screen.
export const welcomePhoto = placeholderGalleries[1][1];

export const rsvpPhoto = placeholderGalleries[1][3];
