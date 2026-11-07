import mistyStairs from "../assets/images/Prenup/optimized/nhut6973.webp";
import staircaseCouple from "../assets/images/Prenup/optimized/nhut6991.webp";
import balconyCouple from "../assets/images/Prenup/optimized/nhut7032.webp";
import groom from "../assets/images/memories/groom-in-the-mist-v1.webp";
import sunglassesCouple from "../assets/images/Prenup/optimized/nhut7111.webp";

// All five distinct black-outfit photographs from the supplied prenup collection.
export const memoryPhotos = [
  { src: mistyStairs, alt: "Marian and Dee Jay in black formalwear beside a stone arch on misty steps", position: "50% 50%" },
  { src: staircaseCouple, alt: "Dee Jay and Marian in black outfits looking in opposite directions on a stone staircase", position: "50% 42%" },
  { src: groom, alt: "Dee Jay in a black suit and sunglasses on a misty stone terrace", position: "50% 34%" },
  { src: balconyCouple, alt: "Marian and Dee Jay embracing in black outfits beside red balcony flowers", position: "50% 40%" },
  { src: sunglassesCouple, alt: "Marian and Dee Jay in black formalwear and sunglasses on a stone terrace", position: "50% 38%" },
] as const;
