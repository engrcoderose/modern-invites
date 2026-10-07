import { remoteImage } from "../utils/remote-image";

const designBasePath = "jaydee-and-bea/images/designs";
const designImage = (filename: string, width: number, height: number) =>
  remoteImage(`${designBasePath}/${filename}`, width, height);

export const heroBackground = designImage("gradient-bg.webp", 1093, 1331);
export const floralCorner = designImage("pink-flowers.webp", 397, 399);
export const floralBorder = designImage("pink-flowers-3.webp", 1218, 189);
export const cornerFlowers = designImage("pink-flowers-2.webp", 742, 812);
export const gardenEntrance = designImage("whimsical-entrance-place.webp", 1110, 827);
export const coupleIllustration = designImage("couples.webp", 291, 320);
export const countdownPetals = designImage("countdown-petals.webp", 951, 1070);
export const storyPortrait = designImage("our-story-placeholder-pic.webp", 723, 796);
export const floralDivider = designImage("flowers-4.webp", 338, 93);
export const gardenUrn = designImage("whimsi-yellowish.webp", 370, 355);
export const flowerVine = designImage("flower-vine3.webp", 1396, 357);
export const pavilion = designImage("gardern-arch.webp", 354, 315);
export const leafyDivider = designImage("vines-1.webp", 315, 82);
export const rightVine = designImage("flower-vines.webp", 319, 672);
export const leftVine = designImage("flower-vines-2.webp", 389, 702);
export const roseUrn = designImage("whimsi-pink-flower.webp", 353, 356);
export const formalAttire = designImage("formal-attire-inspiration.webp", 397, 150);
export const churchArtwork = designImage("church-image.webp", 1195, 896);
export const receptionArtwork = designImage("reception-image.webp", 1195, 896);
export const afterPartyArtwork = designImage("after-party-image.webp", 1033, 768);
