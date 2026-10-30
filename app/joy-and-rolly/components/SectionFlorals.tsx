import Image from "next/image";
import spray from "../assets/floral-spray.webp";

export default function SectionFlorals({ mirrored = false, largeScreen = false }: { mirrored?: boolean; largeScreen?: boolean }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${mirrored ? "-scale-x-100" : ""}`}>
    <Image src={spray} alt="" sizes={`${largeScreen ? "(min-width: 1280px) 480px, " : ""}(min-width: 768px) 320px, 200px`}
      className={`absolute -left-12 -top-3 h-auto w-[200px] select-none md:-left-16 md:-top-5 md:w-[320px] ${largeScreen ? "xl:-left-24 xl:-top-8 xl:w-[480px]" : ""}`} />
    <Image src={spray} alt="" sizes={`${largeScreen ? "(min-width: 1280px) 520px, " : ""}(min-width: 768px) 360px, 220px`}
      className={`absolute -bottom-5 -right-14 h-auto w-[220px] rotate-180 select-none md:-bottom-8 md:-right-20 md:w-[360px] ${largeScreen ? "xl:-bottom-12 xl:-right-28 xl:w-[520px]" : ""}`} />
  </div>;
}
