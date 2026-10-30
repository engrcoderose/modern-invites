import Image from "next/image";
import { vintageArtwork, type VintageArtworkName } from "../data/vintage-artwork";
import DecorativeParallax from "./DecorativeParallax";

export default function VintageAccent({ variant, className = "", sizes }: {
  variant: VintageArtworkName;
  className?: string;
  sizes: string;
}) {
  return <div aria-hidden="true" data-vintage-accent={variant} className={`pointer-events-none select-none ${className}`}>
    <DecorativeParallax reverse={["butterfly", "pressedFlowers", "laceBow"].includes(variant)}>
      <Image src={vintageArtwork[variant]} alt="" sizes={sizes} className="h-auto w-full" />
    </DecorativeParallax>
  </div>;
}
