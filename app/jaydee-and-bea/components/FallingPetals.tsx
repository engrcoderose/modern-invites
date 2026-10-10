"use client";

import { useContext, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { InvitationEntryContext } from "./InvitationEntryContext";
import { wedding } from "../data/wedding-data";
import { usePageVisibility } from "../hooks/usePageVisibility";
import styles from "../styles/falling-petals.module.css";

// Staggered paths keep a few petals in view without a synchronized shower.
const paths = [
  [8, 14, 16, -3, 34],
  [26, 11, 19, -11, -28],
  [44, 12, 18, -6, 42],
  [61, 15, 21, -15, -36],
  [77, 13, 17, -8, 26],
  [92, 12, 20, -17, -42],
  [16, 10, 22, -12, -24],
  [35, 13, 18, -2, 38],
  [53, 11, 20, -16, -32],
  [69, 14, 19, -7, 24],
  [84, 10, 23, -19, -30],
  [3, 12, 21, -10, 40],
] as const;

type PetalStyle = CSSProperties & {
  "--petal-size": string;
  "--petal-color": string;
  "--petal-duration": string;
  "--petal-delay": string;
  "--petal-drift": string;
};

export default function FallingPetals() {
  const opened = useContext(InvitationEntryContext);
  const pageVisible = usePageVisibility();
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={`${styles.field} pointer-events-none fixed inset-0 z-30 overflow-hidden select-none`} data-falling={reducedMotion === false && opened && pageVisible}>
      {paths.map(([left, size, duration, delay, drift], index) => (
        <span key={index} className={styles.petal} style={{
          left: `${left}%`,
          "--petal-size": `${size}px`,
          "--petal-color": wedding.palette[index % wedding.palette.length].hex,
          "--petal-duration": `${duration}s`,
          "--petal-delay": `${delay}s`,
          "--petal-drift": `${drift}px`,
        } as PetalStyle} />
      ))}
    </div>
  );
}
