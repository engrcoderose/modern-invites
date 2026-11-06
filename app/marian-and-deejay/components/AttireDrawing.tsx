import Image from "next/image";
import type { AttireArtwork } from "../data/attire-artwork";

/** A layout crop of the original artwork; source pixels and files stay unchanged. */
export default function AttireDrawing({ artwork, sizes, className = "" }: { artwork: AttireArtwork; sizes: string; className?: string }) {
  const { src, crop } = artwork;
  return (
    <div data-mj-reveal className={`mj-attire-drawing overflow-hidden ${className}`} style={{ aspectRatio: `${crop.width} / ${crop.height}` }}>
      <Image src={src} alt={artwork.alt} sizes={sizes} draggable={false} className="pointer-events-none absolute max-w-none select-none" style={{
        width: `${src.width / crop.width * 100}%`,
        height: "auto",
        left: `${-crop.left / crop.width * 100}%`,
        top: `${-crop.top / crop.height * 100}%`,
      }} />
    </div>
  );
}
