import { remoteImage } from "../utils/remote-image";
import washedRoseUrn from "../assets/designs/rose-urn-washed-watercolor.png";
import hdFormalAttire from "../assets/designs/formal-attire-inspiration-hd.png";

const designBasePath = "jaydee-and-bea/images/designs";
const designImage = (filename: string, width: number, height: number) =>
  remoteImage(`${designBasePath}/${filename}`, width, height);

export const floralBorder = designImage("pink-flowers-3.webp", 1218, 189);
export const cornerFlowers = designImage("pink-flowers-2.webp", 742, 812);
export const floralDivider = designImage("flowers-4.webp", 338, 93);
export const pavilion = designImage("gardern-arch.webp", 354, 315);
export const leafyDivider = designImage("vines-1.webp", 315, 82);
export const rightVine = designImage("flower-vines.webp", 319, 672);
export const leftVine = designImage("flower-vines-2.webp", 389, 702);
export const roseUrn = washedRoseUrn;
export const formalAttire = hdFormalAttire;
export const churchArtwork = designImage("church-image.webp", 1195, 896);
export const receptionArtwork = designImage("reception-image.webp", 1195, 896);
export const afterPartyArtwork = designImage("after-party-image.webp", 1033, 768);
