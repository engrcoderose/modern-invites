import type { StaticImageData } from "next/image";

// Shared preview photographs also used by Vincent & Gabrielle.
// Stable existing URLs reuse the repository's permitted Next Image optimizer.
const base = "https://assets.moderninvites.com/placeholder-images/prenups";

function sampleImage(filename: string, width: number, height: number): StaticImageData {
  return { src: `${base}/${filename}`, width, height };
}

export const samplePhotos = {
  sunset: { src: sampleImage("Main1-1.webp", 2560, 1708), alt: "A couple silhouetted against a warm sunset", position: "50% 50%" },
  lanterns: { src: sampleImage("Main1-2.webp", 1708, 2560), alt: "A couple holding hands beneath red lanterns", position: "50% 65%" },
  veranda: { src: sampleImage("Main1-3.webp", 1708, 2560), alt: "A couple facing each other across an ornate green veranda", position: "50% 65%" },
  kiss: { src: sampleImage("Main1-5.webp", 2560, 1708), alt: "A couple kissing outside a lantern-lit building", position: "60% 50%" },
  goldenWall: { src: sampleImage("Group1-1.webp", 2560, 1708), alt: "A couple walking hand in hand beside a golden wall", position: "24% 70%" },
  yellowWall: { src: sampleImage("Group1-2.webp", 2560, 1708), alt: "A couple looking at each other against a weathered yellow wall", position: "50% 65%" },
  sunsetVeranda: { src: sampleImage("Group1-3.webp", 2560, 1708), alt: "A couple sharing a sunset kiss beneath a veranda", position: "60% 50%" },
  together: { src: sampleImage("Group1-4.webp", 2560, 1708), alt: "A couple holding hands beside yellow walls and red lanterns", position: "80% 50%" },
  colorfulShop: { src: sampleImage("Group1-5.webp", 2560, 1708), alt: "A couple walking hand in hand past a colorful shop", position: "64% 65%" },
} as const;
