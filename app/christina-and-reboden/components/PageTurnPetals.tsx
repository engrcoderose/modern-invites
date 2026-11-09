import type { CSSProperties } from "react";
import Image from "next/image";
import petal from "../assets/designs/page-turn-blush-petal.webp";
import styles from "../styles/page-turn-petals.module.css";

// A brief diagonal breeze follows the page fold, rather than an ongoing shower.
const paths = [
  [94, 78, -54, -23, 28, 0, -25, 150],
  [86, 58, -46, -32, 22, 35, 30, -155],
  [98, 35, -38, 15, 25, 80, 95, 220],
  [76, 90, -48, -26, 30, 10, 40, -170],
  [89, 15, -42, 28, 19, 70, -40, 145],
  [70, 48, -39, -19, 24, 125, 65, 240],
  [62, 76, -34, -30, 20, 90, -65, -205],
  [96, 92, -35, -14, 26, 50, 20, 175],
  [81, 31, -48, 16, 21, 110, -15, -160],
  [55, 61, -33, -18, 18, 25, 80, 210],
  [72, 10, -35, 25, 23, 60, 45, -190],
  [99, 63, -62, -13, 20, 130, -55, 190],
] as const;

type PetalStyle = CSSProperties & Record<
  "--petal-x" | "--petal-y" | "--petal-size" | "--petal-delay" | "--petal-start" | "--petal-end", string
>;

export default function PageTurnPetals() {
  return <div aria-hidden="true" className={`${styles.field} pointer-events-none absolute inset-0 z-10 overflow-hidden select-none`}>
    {paths.map(([left, top, x, y, size, delay, start, end], index) => <span key={index}
      className={`${styles.petal} absolute`} style={{
        left: `${left}%`, top: `${top}%`,
        "--petal-x": `${x}cqw`, "--petal-y": `${y}cqh`,
        "--petal-size": `${size}px`, "--petal-delay": `${delay}ms`,
        "--petal-start": `${start}deg`, "--petal-end": `${end}deg`,
      } as PetalStyle}>
      <Image src={petal} alt="" fill sizes="32px" unoptimized loading="eager" />
    </span>)}
  </div>;
}
