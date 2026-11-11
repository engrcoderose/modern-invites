import type { StaticImageData } from "next/image";

const prenupBaseUrl =
  "https://assets.moderninvites.com/placeholder-images/prenups";

// Reuse the uploaded WebP photos with their dimensions for responsive crops.
function prenupImage(
  filename: string,
  width: number,
  height: number,
): StaticImageData {
  return { src: `${prenupBaseUrl}/${filename}`, width, height };
}

export const photo1 = prenupImage("Main1-1.webp", 2560, 1708);
export const photo2 = prenupImage("Main1-2.webp", 1708, 2560);
export const photo3 = prenupImage("Main1-3.webp", 1708, 2560);
export const photo4 = prenupImage("Main1-4.webp", 1708, 2560);
export const photo5 = prenupImage("Main1-5.webp", 2560, 1708);
export const together1 = prenupImage("Group1-1.webp", 2560, 1708);
export const together2 = prenupImage("Group1-2.webp", 2560, 1708);
export const together3 = prenupImage("Group1-3.webp", 2560, 1708);
export const together4 = prenupImage("Group1-4.webp", 2560, 1708);
export const together5 = prenupImage("Group1-5.webp", 2560, 1708);
