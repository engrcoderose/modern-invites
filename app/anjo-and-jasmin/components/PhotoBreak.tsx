import Image from "next/image";
import type { GalleryImage } from "../types";
import PhotoMotion from "./motion/PhotoMotion";

interface PhotoBreakProps {
  photo: GalleryImage;
  label?: string;
  imageClassName?: string;
}

export default function PhotoBreak({ photo, label = photo.alt, imageClassName = "object-center" }: PhotoBreakProps) {
  return (
    <section
      aria-label={label}
      className="relative h-svh overflow-hidden bg-[rgb(var(--aj-ink))]"
    >
      <PhotoMotion className="h-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          quality={85}
          sizes="(max-width: 1023px) 1600px, 100vw"
          className={`object-cover ${imageClassName}`}
        />
      </PhotoMotion>
    </section>
  );
}
