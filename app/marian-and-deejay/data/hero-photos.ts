import lobby from "../assets/images/Prenup/optimized/nhut7304.webp";
import beach from "../assets/images/Prenup/optimized/nhut6536.webp";
import forest from "../assets/images/Prenup/optimized/nhut8301.webp";
import garden from "../assets/images/Prenup/optimized/nhut8615.webp";
import type { StaticImageData } from "next/image";

interface HeroPhoto {
  src: StaticImageData;
  alt: string;
  position: string;
  mobilePosition?: string;
}

// The four supplied landscapes. Keep the venue portrait first, as in the reference.
export const heroPhotos: readonly HeroPhoto[] = [
  { src: lobby, alt: "Marian and Dee Jay beneath the glass dome in a grand golden lobby", position: "54% 64%" },
  { src: beach, alt: "Marian and Dee Jay embracing by the sea", position: "49% 48%", mobilePosition: "43% 48%" },
  { src: forest, alt: "Marian and Dee Jay walking through a misty garden", position: "55% 50%" },
  { src: garden, alt: "Marian and Dee Jay sharing a playful moment beside red flowers", position: "52% 56%" },
] as const;

export const heroTiming = { intervalMs: 3000, fadeMs: 750 } as const;
