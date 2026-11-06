import corridor from "../assets/images/Prenup/optimized/nhut7427.webp";
import formal from "../assets/images/Prenup/optimized/nhut7111.webp";
import beachWalk from "../assets/images/Prenup/optimized/nhut6822.webp";
import windows from "../assets/images/Prenup/optimized/nhut7940.webp";
import mist from "../assets/images/Prenup/optimized/nhut6973.webp";

// Five portrait originals, excluding every photo used in the hero and photo break.
// Wraparound order preserves the opening composition from the supplied reference.
export const galleryPhotos = [
  { src: corridor, alt: "Marian and Dee Jay walking together through a golden corridor" },
  { src: formal, alt: "Marian and Dee Jay in black formalwear by a stone church" },
  { src: beachWalk, alt: "Marian and Dee Jay laughing as they walk along the beach" },
  { src: windows, alt: "Marian and Dee Jay looking back beside tall glass windows" },
  { src: mist, alt: "Marian and Dee Jay on a misty stone terrace in black formalwear" },
] as const;
