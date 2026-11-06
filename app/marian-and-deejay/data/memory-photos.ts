import beachLift from "../assets/images/memories/beach-lift-v1.webp";
import beachDance from "../assets/images/memories/beach-dance-v1.webp";
import groom from "../assets/images/memories/groom-in-the-mist-v1.webp";
import brideStanding from "../assets/images/memories/bride-on-the-staircase-v1.webp";
import brideSeated from "../assets/images/memories/bridal-staircase-portrait-v1.webp";

// Uploads 4, 10, 8, 11 and 12. The other nine repeat photos already on the page.
export const memoryPhotos = [
  { src: beachLift, alt: "Dee Jay lifting Marian into his arms beside the sea", position: "50% 48%" },
  { src: beachDance, alt: "Marian and Dee Jay holding hands and dancing on the beach", position: "50% 57%" },
  { src: groom, alt: "Dee Jay in a black suit and sunglasses on a misty stone terrace", position: "50% 34%" },
  { src: brideStanding, alt: "Marian looking back in her wedding gown on a grand marble staircase", position: "50% 41%" },
  { src: brideSeated, alt: "Marian seated on the staircase holding her white bridal bouquet", position: "50% 29%" },
] as const;
