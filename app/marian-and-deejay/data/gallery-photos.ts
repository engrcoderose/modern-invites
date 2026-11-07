import type { StaticImageData } from "next/image";
import corridor from "../assets/images/Prenup/optimized/nhut7427.webp";
import windows from "../assets/images/Prenup/optimized/nhut7940.webp";
import lobby from "../assets/images/Prenup/optimized/nhut7304.webp";
import staircase from "../assets/images/Prenup/optimized/nhut7696.webp";
import lobbyKiss from "../assets/images/Prenup/optimized/nhut7763.webp";
import beach from "../assets/images/Prenup/optimized/nhut6536.webp";
import beachPortrait from "../assets/images/Prenup/optimized/nhut6748.webp";
import beachWalk from "../assets/images/Prenup/optimized/nhut6822.webp";
import beachCloseUp from "../assets/images/Prenup/optimized/nhut6383.webp";
import beachDance from "../assets/images/memories/beach-dance-v1.webp";
import beachLift from "../assets/images/memories/beach-lift-v1.webp";
import brideStanding from "../assets/images/memories/bride-on-the-staircase-v1.webp";
import brideSeated from "../assets/images/memories/bridal-staircase-portrait-v1.webp";

interface GalleryPhoto {
  src: StaticImageData;
  alt: string;
  position: string;
}

// All thirteen distinct white-outfit photos, reusing existing optimized assets.
// The corridor portrait remains the opening photo.
export const galleryPhotos: readonly GalleryPhoto[] = [
  { src: corridor, alt: "Marian and Dee Jay walking together through a golden corridor in their wedding attire", position: "50% 50%" },
  { src: staircase, alt: "Marian and Dee Jay embracing on the grand staircase in their wedding attire", position: "50% 28%" },
  { src: lobbyKiss, alt: "Marian and Dee Jay kissing in a sunlit lobby in their wedding attire", position: "50% 38%" },
  { src: brideStanding, alt: "Marian looking back in her white wedding gown on a grand marble staircase", position: "50% 41%" },
  { src: brideSeated, alt: "Marian seated on the staircase in her white wedding gown holding her bridal bouquet", position: "50% 29%" },
  { src: beachCloseUp, alt: "Marian holding her bouquet beside Dee Jay on the beach in their white wedding outfits", position: "50% 50%" },
  { src: beachLift, alt: "Dee Jay lifting Marian into his arms beside the sea in their white wedding outfits", position: "50% 48%" },
  { src: beachDance, alt: "Marian and Dee Jay holding hands and dancing on the beach in their white wedding outfits", position: "50% 57%" },
  { src: beach, alt: "Marian and Dee Jay embracing by the sea in their white wedding outfits", position: "49% 48%" },
  { src: beachPortrait, alt: "Marian and Dee Jay celebrating on the beach with her bouquet in their white wedding outfits", position: "50% 50%" },
  { src: beachWalk, alt: "Marian and Dee Jay laughing as they walk along the beach in their white wedding outfits", position: "50% 50%" },
  { src: windows, alt: "Marian and Dee Jay looking back beside tall glass windows in their wedding attire", position: "50% 50%" },
  { src: lobby, alt: "Marian and Dee Jay beneath the glass dome in a grand golden lobby in their wedding attire", position: "54% 64%" },
];
