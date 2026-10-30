import Image, { type StaticImageData } from "next/image";

type PhotoBreakProps = {
  id: string;
  label: string;
  src: StaticImageData;
  alt: string;
  position: string;
};

export default function PhotoBreakSection({ id, label, src, alt, position }: PhotoBreakProps) {
  // Cover can be constrained by the viewport height, so include the source aspect ratio.
  const sizes = `max(100vw, ${src.width / src.height * 100}svh)`;

  return <section id={id} aria-label={label} className="relative h-svh w-full overflow-hidden bg-[#401522]">
    <Image src={src} alt={alt} fill placeholder="blur" loading="lazy"
      sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
  </section>;
}
