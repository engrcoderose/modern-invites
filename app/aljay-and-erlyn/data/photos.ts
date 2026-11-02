import type { StaticImageData } from "next/image";

export type SlideshowPhoto = {
  src: StaticImageData;
  alt: string;
  position: string;
};

const base = "https://assets.moderninvites.com/aljay-and-erlyn/images/prenups";
function photo(filename: string, width: number, height: number, alt: string, position = "center"): SlideshowPhoto {
  return { src: { src: `${base}/${filename}`, width, height }, alt, position };
}

export const storyPhoto = photo("img-2541.webp", 1920, 2560, "Aljay and Erlyn embracing on a suspension bridge");

export const usPhotos = [
  storyPhoto,
  photo("img-2632.webp", 1920, 2560, "Aljay and Erlyn smiling together on a railway-lined street"),
  photo("img-2911.webp", 2560, 1920, "Aljay and Erlyn sitting together beside the sea", "50% center"),
  photo("img-4008.webp", 1920, 2560, "Aljay and Erlyn beneath an ornate pavilion beside the water"),
  photo("img-3833.webp", 2560, 1920, "Aljay and Erlyn sharing a quiet moment on a balcony", "32% center"),
];

export const togetherPhotos = [
  photo("img-3876.webp", 1920, 2560, "Aljay and Erlyn walking along a tree-lined path"),
  photo("img-2927.webp", 2560, 1920, "Aljay and Erlyn standing together along the coast", "73% bottom"),
  photo("img-2949.webp", 2560, 1920, "Aljay and Erlyn kissing beside coastal rock formations", "70% bottom"),
  photo("img-2961.webp", 2560, 1920, "Aljay and Erlyn looking out across the rocky coastline", "95% 85%"),
  photo("img-3707.webp", 2560, 1920, "Aljay and Erlyn admiring the city skyline from a riverside railing", "43% bottom"),
];
