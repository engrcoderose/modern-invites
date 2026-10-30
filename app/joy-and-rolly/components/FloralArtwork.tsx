import Image from "next/image";
import bouquet from "../assets/floral-corner.webp";

export default function FloralArtwork({ className = "", priority = false, sizes }: { className?: string; priority?: boolean; sizes: string }) {
  return <Image src={bouquet} alt="" aria-hidden="true" priority={priority} sizes={sizes}
    className={`pointer-events-none h-auto select-none ${className}`} />;
}
