import Image from "next/image";
import burgundyMark from "../assets/monograms/ea-mark-burgundy.png";
import blackMark from "../assets/monograms/ea-mark-black.png";
import blackLockup from "../assets/monograms/ea-lockup-black.png";
import styles from "../styles/invitation.module.css";

const artwork = { burgundyMark, blackMark, blackLockup };

interface MonogramProps {
  variant: keyof typeof artwork;
  alt?: string;
  className?: string;
  sizes: string;
  light?: boolean;
  priority?: boolean;
}

export default function Monogram({ variant, alt = "", className = "", sizes, light = false, priority = false }: MonogramProps) {
  return (
    <Image
      src={artwork[variant]}
      alt={alt}
      className={`${styles.monogramArtwork} ${light ? styles.monogramLight : ""} block h-auto ${className}`}
      sizes={sizes}
      priority={priority}
    />
  );
}
