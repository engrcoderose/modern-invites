import Image from "next/image";
import backdrop from "../designs/hero-bg.jpg";
import styles from "../styles/invitation.module.css";

export default function HeroBackdrop() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 select-none">
    <Image src={backdrop} alt="" fill sizes="(max-aspect-ratio: 3/2) calc(151svh - 92px), 100vw" className="object-cover" />
    <span className={`${styles.heroShade} absolute inset-0`} />
  </div>;
}
