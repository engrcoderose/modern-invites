import Image from "next/image";
import flowers from "../assets/designs/flowers-one.png";

const FLOWER_SIZES = "(min-width: 819px) 360px, 44vw";

export default function GalleryCornerFlowers() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none opacity-[.65] sm:opacity-75">
      <Image src={flowers} alt="" sizes={FLOWER_SIZES} loading="lazy" draggable={false}
        className="absolute -right-6 -top-8 h-auto w-[44vw] max-w-[360px] rotate-180" />
      <Image src={flowers} alt="" sizes={FLOWER_SIZES} loading="lazy" draggable={false}
        className="absolute -bottom-8 -left-6 h-auto w-[44vw] max-w-[360px]" />
    </div>
  );
}
