import Image, { type StaticImageData } from "next/image";
import { media } from "../data/media";

export function WoodlandBackdrop({
  priority = false,
  src = media.woodland,
}: {
  priority?: boolean;
  src?: string | StaticImageData;
}) {
  return (
    <div
      className="vg-woodland absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <Image src={src} alt="" fill priority={priority} sizes="100vw" />
    </div>
  );
}

