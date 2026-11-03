import Reveal from "../components/Reveal";
import SamplePhoto from "../components/SamplePhoto";
import type { StaticImageData } from "next/image";
import { photoSizes } from "../data/photos";
import styles from "../styles/invitation.module.css";

type Props = { id: string; label: string; src: StaticImageData; alt: string; position: string };

export default function PhotoBreakSection({ id, label, src, alt, position }: Props) {
  return <section id={id} tabIndex={-1} aria-label={label} className={`${styles.cinematic} relative h-svh overflow-hidden`}>
    <Reveal stagger={false} className="h-full">
      <SamplePhoto src={src} alt={alt} sizes={photoSizes.photoBreak} position={position} />
    </Reveal>
  </section>;
}
