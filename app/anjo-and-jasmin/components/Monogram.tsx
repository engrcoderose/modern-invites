import { MonogramArtwork as monogram } from "../design-media";
import Image from "next/image";

export default function Monogram({ className, light = false, sizes }: { className: string; light?: boolean; sizes: string }) {
  return <Image src={monogram} alt="Anjo and Jasmin monogram" sizes={sizes}
    className={`object-contain ${light ? "brightness-0 invert" : ""} ${className}`} />;
}
