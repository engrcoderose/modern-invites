import Image from "next/image";
import { artwork } from "../data/artwork";

type Props = { name: keyof typeof artwork; className?: string; sizes: string; priority?: boolean; reveal?: boolean };

export default function FloralArtwork({ name, className = "", sizes, priority = false, reveal = false }: Props) {
  return <Image src={artwork[name]} alt="" aria-hidden="true" data-reveal={reveal ? "photo" : undefined} sizes={sizes} priority={priority} className={`pointer-events-none select-none ${className}`} />;
}
