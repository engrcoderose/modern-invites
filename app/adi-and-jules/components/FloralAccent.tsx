import { MeadowFlowers as Meadow, BlueFlowers as Blue, FlowerBorder as Corner } from "../design-media";
import Image from "next/image";

const artwork = { meadow: Meadow, blue: Blue, corner: Corner };

export default function FloralAccent({ kind, className = "", sizes = "(max-width: 640px) 160px, 320px" }: { kind: keyof typeof artwork; className?: string; sizes?: string }) {
  return <Image src={artwork[kind]} alt="" aria-hidden="true" sizes={sizes} className={`aj-botanical pointer-events-none absolute h-auto select-none ${className}`} />;
}
