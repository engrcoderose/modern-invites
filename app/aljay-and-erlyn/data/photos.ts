import type { StaticImageData } from "next/image";

export type SlideshowPhoto = {
  src: StaticImageData;
  alt: string;
  position: string;
};

// Owner-requested placeholders from Vincent and Gabrielle's existing R2 collections.
// Replace these entries with Aljay and Erlyn's approved photographs before launch.
const base = "https://assets.moderninvites.com/placeholder-images/prenups";
function photo(filename: string, width: number, height: number, alt: string, position = "center"): SlideshowPhoto {
  return { src: { src: `${base}/${filename}`, width, height }, alt: `Placeholder photograph: ${alt}`, position };
}

export const usPhotos = [
  photo("Main1-1.webp", 2560, 1708, "a couple silhouetted against a warm sunset"),
  photo("Main1-2.webp", 1708, 2560, "holding hands beneath glowing red lanterns", "center bottom"),
  photo("Main1-3.webp", 1708, 2560, "looking at each other across an ornate green veranda", "center bottom"),
  // Main1-4 is intentionally omitted: its source has documented lower-image distortion.
  photo("Main1-5.webp", 2560, 1708, "a kiss outside a lantern-lit building", "60% center"),
];

export const togetherPhotos = [
  photo("Group1-1.webp", 2560, 1708, "walking hand in hand beside a golden wall", "24% bottom"),
  photo("Group1-2.webp", 2560, 1708, "looking at each other against a weathered yellow wall", "50% bottom"),
  photo("Group1-3.webp", 2560, 1708, "a sunset kiss beneath an ornate veranda", "60% center"),
  photo("Group1-4.webp", 2560, 1708, "holding hands beside yellow walls and red lanterns", "80% center"),
  photo("Group1-5.webp", 2560, 1708, "walking hand in hand past a colorful shop", "64% bottom"),
];
