import Image from "next/image";
import type { PhotoBreakPhoto } from "../data/media";
import styles from "../styles/invitation.module.css";

export default function PhotoBreakSlide({ photo, title, showWholePhoto = false }: { photo: PhotoBreakPhoto; title: string; showWholePhoto?: boolean }) {
  const ratio = photo.src.width / photo.src.height;
  // Cover crops need enough pixels for the stage height, including on phones.
  const coverSizes = `(max-height: 600px) max(100vw, calc((100dvh - 110px) * ${ratio})), (max-width: 640px) max(100vw, calc((100dvh - 130px) * ${ratio})), max(100vw, calc((100dvh - 152px) * ${ratio}))`;
  const containSizes = `(max-height: 600px) min(100vw, calc((100dvh - 110px) * ${ratio})), (max-width: 640px) min(100vw, calc((100dvh - 130px) * ${ratio})), min(100vw, calc((100dvh - 152px) * ${ratio}))`;
  const sizes = showWholePhoto ? containSizes : `(max-aspect-ratio: 4/3) 100vw, ${coverSizes}`;
  return <div className={`${styles.slideshow} relative h-full w-full overflow-hidden`}>
    <h2 className="sr-only">{title}</h2>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Image src={photo.src} alt="" fill sizes={sizes} quality={85} placeholder="blur"
        className={`${styles.slideshowFill} object-cover`} style={{ objectPosition: photo.position }} />
    </div>
    <figure data-cr-reveal className="absolute inset-0">
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} quality={85} placeholder="blur"
        className={showWholePhoto ? "object-contain" : styles.slideshowFullPhoto} style={{ objectPosition: showWholePhoto ? "center" : photo.position }} />
    </figure>
  </div>;
}
