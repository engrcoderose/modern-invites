import Image from "next/image";
import background from "../assets/designs/yellow-backgroud-gallery-brown-outfit.png";
import flower from "../assets/designs/yellow-flower-gallery.png";
import daisy from "../assets/designs/yellow-flower-gallery-2.png";
import butterflyLeft from "../assets/designs/yellow-butterfly-gallery.png";
import butterflyRight from "../assets/designs/yellow-butterfly-gallery-1.png";
import { photoBreak } from "../data/photo-break";

const frames = [
  { key: "main", sizes: "(max-width: 639px) min(52vw, calc(42.63svh - 27.28px)), min(30vw, 432px, calc(51.61svh - 41.28px))" },
  { key: "right", sizes: "(max-width: 639px) min(33vw, calc(27.05svh - 17.31px)), min(23vw, 332px, calc(39.56svh - 31.65px))" },
  { key: "left", sizes: "(max-width: 639px) min(36vw, calc(29.51svh - 18.89px)), min(23vw, 332px, calc(39.56svh - 31.65px))" },
  { key: "bottom", sizes: "(max-width: 639px) min(40vw, calc(32.79svh - 20.98px)), min(23vw, 332px, calc(39.56svh - 31.65px))" },
] as const;

const decorations = [
  { src: flower, className: "mj-photo-flower", sizes: "(max-width: 639px) min(14vw, calc(11.48svh - 7.34px)), min(9vw, 130px, calc(15.48svh - 12.39px))" },
  { src: daisy, className: "mj-photo-daisy", sizes: "(max-width: 639px) min(16vw, calc(13.11svh - 8.39px)), min(9vw, 130px, calc(15.48svh - 12.39px))" },
  { src: butterflyLeft, className: "mj-photo-butterfly-left", sizes: "(max-width: 639px) min(14vw, calc(11.48svh - 7.34px)), min(8vw, 116px, calc(13.76svh - 11.01px))" },
  { src: butterflyRight, className: "mj-photo-butterfly-right", sizes: "(max-width: 639px) min(14vw, calc(11.48svh - 7.34px)), min(8vw, 116px, calc(13.76svh - 11.01px))" },
] as const;

export default function PhotoBreakSection() {
  return (
    <section id="photo-break" aria-label="Moments of Marian and Dee Jay" className="mj-photo-break relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden py-8 sm:py-10">
      <Image src={background} alt="" fill sizes="max(100vw, 150svh)" className="pointer-events-none -z-10 object-cover object-[65%_50%]" />
      <div data-mj-stagger className="mj-photo-collage relative mx-auto max-w-[1440px]">
        {frames.map(({ key, sizes }) => {
          const photo = photoBreak[key];
          return (
            <div data-mj-reveal key={key} className={`mj-photo-${key} mj-photo-print absolute overflow-hidden ${key === "main" ? "z-[2]" : "z-[3]"}`}>
              <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: photo.position }} />
            </div>
          );
        })}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4]">
          {decorations.map(decoration => <Image key={decoration.className} src={decoration.src} alt="" sizes={decoration.sizes} className={`${decoration.className} absolute h-auto`} />)}
        </div>
      </div>
    </section>
  );
}
