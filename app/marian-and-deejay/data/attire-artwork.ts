import type { StaticImageData } from "next/image";
import men from "../assets/images/attire-men-transparent-v1.png";
import women from "../assets/images/attire-women-transparent-v1.png";
import sponsors from "../assets/images/attire-sponsors-transparent-v1.png";

export interface AttireArtwork {
  src: StaticImageData;
  alt: string;
  crop: { left: number; top: number; width: number; height: number };
}

// Genuine alpha cutouts; layout crops only trim their transparent canvas margins.
export const maleGuestArt: AttireArtwork = {
  src: men,
  alt: "Three gentlemen in beige formalwear, cream collared shirts and neutral trousers",
  crop: { left: 155, top: 25, width: 1093, height: 1085 },
};
export const femaleGuestArt: AttireArtwork = {
  src: women,
  alt: "Three ladies in light yellow, pastel yellow and butter yellow floor-length gowns",
  crop: { left: 148, top: 32, width: 1329, height: 967 },
};
export const sponsorArt: AttireArtwork = {
  src: sponsors,
  alt: "Four couples illustrating yellow gowns and cream barong with dark trousers for principal sponsors",
  crop: { left: 9, top: 31, width: 1739, height: 831 },
};
