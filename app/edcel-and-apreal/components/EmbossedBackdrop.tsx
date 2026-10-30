import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import pattern from "../assets/backgrounds/entourage-cream-embossed-floral.webp";
import styles from "../styles/invitation.module.css";

const { props: { src: patternUrl } } = getImageProps({ src: pattern, alt: "", width: 480, height: 480 });

export default function EmbossedBackdrop() {
  return <div aria-hidden="true" className={`${styles.embossedPattern} pointer-events-none absolute inset-0`}
    style={{ "--embossed-pattern": `url("${patternUrl}")` } as CSSProperties} />;
}
