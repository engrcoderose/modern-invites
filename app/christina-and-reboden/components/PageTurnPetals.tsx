import type { CSSProperties } from "react";
import Image from "next/image";
import petal from "../assets/designs/page-turn-blush-petal.webp";
import styles from "../styles/page-turn-petals.module.css";

// Short, staggered arcs stay close to the turning paper, with restrained tilts.
const paths = [
  { left: 94, top: 70, drift: -20, fall: 4, size: 23, delay: 0, start: -28, end: 14, opacity: .64 },
  { left: 84, top: 45, drift: -16, fall: 3, size: 18, delay: 60, start: 18, end: -14, opacity: .5 },
  { left: 96, top: 27, drift: -19, fall: 5, size: 20, delay: 140, start: -12, end: 22, opacity: .58 },
  { left: 77, top: 85, drift: -17, fall: 2, size: 24, delay: 90, start: 24, end: -12, opacity: .6 },
  { left: 73, top: 59, drift: -15, fall: 4, size: 16, delay: 150, start: -20, end: 12, opacity: .45 },
  { left: 89, top: 12, drift: -18, fall: 5, size: 19, delay: 40, start: 8, end: -24, opacity: .52 },
  { left: 66, top: 30, drift: -16, fall: 4, size: 18, delay: 30, start: -16, end: 20, opacity: .56 },
  { left: 90, top: 82, drift: -19, fall: 2, size: 22, delay: 110, start: 22, end: -10, opacity: .58 },
  { left: 60, top: 64, drift: -15, fall: 3, size: 17, delay: 170, start: -24, end: 14, opacity: .48 },
  { left: 79, top: 18, drift: -17, fall: 5, size: 20, delay: 70, start: 14, end: -18, opacity: .55 },
  { left: 69, top: 78, drift: -18, fall: 2, size: 21, delay: 50, start: -18, end: 16, opacity: .6 },
  { left: 96, top: 54, drift: -20, fall: 4, size: 19, delay: 120, start: 20, end: -16, opacity: .52 },
  { left: 56, top: 46, drift: -15, fall: 3, size: 16, delay: 160, start: -10, end: 24, opacity: .46 },
  { left: 81, top: 66, drift: -17, fall: 4, size: 20, delay: 20, start: 18, end: -20, opacity: .57 },
] as const;

type PetalStyle = CSSProperties & Record<
  "--petal-x" | "--petal-y" | "--petal-size" | "--petal-delay" | "--petal-start" | "--petal-end" | "--petal-opacity", string
>;

export default function PageTurnPetals() {
  return <div aria-hidden="true" className={`${styles.field} pointer-events-none absolute inset-0 z-10 overflow-hidden select-none`}>
    {paths.map(({ left, top, drift, fall, size, delay, start, end, opacity }, index) => <span key={index}
      className={`${styles.petal} absolute`} style={{
        left: `${left}%`, top: `${top}%`,
        "--petal-x": `max(-160px, ${drift}cqw)`, "--petal-y": `min(44px, ${fall}cqh)`,
        "--petal-size": `${size}px`, "--petal-delay": `${delay}ms`,
        "--petal-start": `${start}deg`, "--petal-end": `${end}deg`,
        "--petal-opacity": String(opacity),
      } as PetalStyle}>
      <Image src={petal} alt="" fill sizes="24px" unoptimized loading="eager" className={styles.flutter} />
    </span>)}
  </div>;
}
