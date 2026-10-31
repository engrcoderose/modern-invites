import { prenupPhotos } from "./prenup-media";
import portrait from "../assets/designs/story-portrait-floral.webp";

export const storyPhotos = {
  portrait: { src: portrait, alt: prenupPhotos.dscf1768.alt },
  landscape: { ...prenupPhotos.dscf1793RevB, position: "50% 50%" },
};
