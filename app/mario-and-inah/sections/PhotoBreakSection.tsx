import PhotoFrame from "../components/PhotoFrame";
import ParallaxLayer from "../components/ParallaxLayer";
import type { InvitationPhoto } from "../data/photos";
import styles from "../styles/invitation.module.css";

type PhotoBreakProps = { photo: InvitationPhoto; title: string; id: string; cinematic?: boolean };
export default function PhotoBreakSection({ photo, title, id, cinematic = false }: PhotoBreakProps) {
  const imageSizes = photo.src && typeof photo.src !== "string"
    ? `max(100vw, calc(${(100 * photo.src.width / photo.src.height).toFixed(1)}dvh + ${(96 * photo.src.width / photo.src.height).toFixed(1)}px))`
    : "max(100vw, calc(150dvh + 144px))";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative isolate min-h-dvh overflow-hidden">
      <ParallaxLayer background><PhotoFrame photo={photo} sizes={imageSizes} fullBleed reveal /></ParallaxLayer>
      {!cinematic && <div aria-hidden="true" className={`${styles.photoCaptionShade} pointer-events-none absolute inset-0 z-10`} />}
      <h2 data-reveal={cinematic ? undefined : "heading"} id={`${id}-title`} className={cinematic ? "sr-only" : `${styles.photoCaption} absolute inset-x-6 bottom-10 z-20 text-center sm:bottom-16`}>{title}</h2>
    </section>
  );
}
