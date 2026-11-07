import { remoteImage } from "../utils/remote-image";
import washedRoseUrn from "../assets/designs/rose-urn-washed-watercolor.png";
import hdFormalAttire from "../assets/designs/formal-attire-inspiration-hd.png";
export { default as coupleMonogram } from "../assets/designs/couple-monogram-garden.webp";

const designBasePath = "jaydee-and-bea/images/designs";
const designImage = (filename: string, width: number, height: number) =>
  remoteImage(`${designBasePath}/${filename}`, width, height);

export const floralDivider = designImage("flowers-4.webp", 338, 93);
export const leafyDivider = designImage("vines-1.webp", 315, 82);
export const roseUrn = washedRoseUrn;
export const formalAttire = hdFormalAttire;
export const churchArtwork = designImage("church-image.webp", 1195, 896);
export const receptionArtwork = designImage("reception-image.webp", 1195, 896);
export const afterPartyArtwork = designImage("after-party-image.webp", 1033, 768);
