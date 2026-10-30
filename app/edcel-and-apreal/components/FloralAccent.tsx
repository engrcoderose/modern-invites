import Image from "next/image";
import cosmos from "../assets/florals/pressed-burgundy-cosmos.webp";
import entourage from "../assets/designs/the-entourag-upper-flowers.png";
import DecorativeParallax from "./DecorativeParallax";

const florals = { cosmos, entourage };

export default function FloralAccent({ variant, className = "", sizes }: {
  variant: keyof typeof florals;
  className?: string;
  sizes: string;
}) {
  return <div aria-hidden="true" data-floral-accent={variant} className={`pointer-events-none select-none ${className}`}>
    <DecorativeParallax reverse><Image src={florals[variant]} alt="" sizes={sizes} className="h-auto w-full" /></DecorativeParallax>
  </div>;
}
