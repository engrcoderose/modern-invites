import steps from "../assets/images/Prenup/optimized/nhut6991.webp";
import garden from "../assets/images/Prenup/optimized/nhut8169.webp";
import arch from "../assets/images/Prenup/optimized/nhut8348.webp";
import staircase from "../assets/images/Prenup/optimized/nhut7696.webp";

export const photoBreak = {
  main: { src: steps, alt: "Dee Jay and Marian in black formal attire on a stone staircase", position: "50% 50%" },
  left: { src: arch, alt: "Dee Jay kissing Marian beneath a stone arch in the misty garden", position: "50% 68%" },
  right: { src: garden, alt: "Marian and Dee Jay facing one another beside a garden railing", position: "50% 68%" },
} as const;

export const entouragePhotoBreak = {
  src: staircase,
  alt: "Marian and Dee Jay embracing on the grand staircase in their wedding attire",
  position: "50% 28%",
} as const;
