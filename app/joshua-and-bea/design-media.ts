import type { StaticImageData } from "next/image";

const designBaseUrl =
  "https://assets.moderninvites.com/placeholder-images/joshua-and-bea/designs";

// Verified uploaded PNGs retain the original dimensions and transparency.
// See docs/media/r2-design-verification.json for source hashes and dimensions.
function designImage(filename: string, width: number, height: number): StaticImageData {
  return { src: `${designBaseUrl}/${filename}`, width, height };
}

export const BlueFlower = designImage("blue-fower-water-color.png", 250, 246);
export const Flowers = designImage("down-flowers.png", 1935, 454);
export const InspirationOne = designImage("dress-code-ispo-1.png", 390, 137);
export const InspirationTwo = designImage("dress-code-ispo-2.png", 397, 150);
export const FloralBorder = designImage("floral-designs.png", 387, 807);
export const PinkFlower = designImage("pink-flower.png", 346, 307);
export const PinkPetals = designImage("pink-petals.png", 416, 417);
export const Daisies = designImage("small-daisy.png", 214, 232);
export const Petals = designImage("white-petals.png", 951, 1070);
export const YellowFlower = designImage("yellow-flower.png", 194, 328);
