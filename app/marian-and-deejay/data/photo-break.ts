import garden from "../assets/images/Prenup/optimized/nhut8169.webp";
import arch from "../assets/images/Prenup/optimized/nhut8348.webp";
import flowerGarden from "../assets/images/Prenup/optimized/nhut8615.webp";
import doorway from "../assets/images/Prenup/optimized/nhut8301.webp";
import staircase from "../assets/images/Prenup/optimized/nhut7696.webp";

export const photoBreak = {
  main: { src: garden, alt: "Marian and Dee Jay in brown outfits facing one another beside a garden railing", position: "50% 50%" },
  right: { src: flowerGarden, alt: "Marian and Dee Jay taking a selfie beside red flowers in their brown outfits", position: "52% 56%" },
  left: { src: arch, alt: "Dee Jay kissing Marian beneath a stone arch in their brown outfits", position: "50% 85%" },
  bottom: { src: doorway, alt: "Marian and Dee Jay in brown outfits in a misty garden, viewed through an open doorway", position: "55% 50%" },
} as const;

export const entouragePhotoBreak = {
  src: staircase,
  alt: "Marian and Dee Jay embracing on the grand staircase in their wedding attire",
  position: "50% 28%",
} as const;
