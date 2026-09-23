import Image from "next/image";
import monogram from "../assets/images/designs/aj-monogram.png";

export default function Monogram({ className, light = false, sizes }: { className: string; light?: boolean; sizes: string }) {
  return <Image src={monogram} alt="Anjo and Jasmin monogram" sizes={sizes}
    className={`object-contain ${light ? "brightness-0 invert" : ""} ${className}`} />;
}
