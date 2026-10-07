import main1 from "../assets/prenups/Main1-1.jpg";
import main2 from "../assets/prenups/Main1-2.jpg";
import main3 from "../assets/prenups/Main1-3.jpg";
import main4 from "../assets/prenups/Main1-4.jpg";
import main5 from "../assets/prenups/Main1-5.jpg";
import group1 from "../assets/prenups/Group1-1.jpg";
import group2 from "../assets/prenups/Group1-2.jpg";
import group3 from "../assets/prenups/Group1-3.jpg";
import group4 from "../assets/prenups/Group1-4.jpg";
import group5 from "../assets/prenups/Group1-5.jpg";
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
