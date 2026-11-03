import type { StaticImageData } from "next/image";

const baseUrl = "https://assets.moderninvites.com/placeholder-images/prenups";

// Reuse the same shared placeholder URLs as Vincent & Gabrielle; these are
// sample photographs, not photographs of Jahzen & Glyzell.
function samplePhoto(filename: string): StaticImageData {
  return { src: `${baseUrl}/${filename}`, width: 2560, height: 1708 };
}

export const storyPhoto = {
  src: samplePhoto("Group1-1.webp"),
  alt: "Placeholder photograph of a couple walking hand in hand beside a golden wall",
  position: "24% bottom",
};

// Landscape source covering a 4:5 mobile or 3:4 desktop frame, capped at 448px.
export const storyPhotoSizes = "(max-width: 495px) calc(187.5vw - 90px), (max-width: 1023px) 840px, (max-width: 1279px) min(calc(90vw - 172.8px), 896px), 896px";
