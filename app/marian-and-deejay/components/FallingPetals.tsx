"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "../styles/falling-petals.module.css";

// Left %, size px, duration s, offset s, drift px. Fixed paths avoid synchronized falls.
const paths = [
  [7, 16, 22, -4, 32],
  [25, 14, 26, -18, -24],
  [43, 17, 24, -9, 38],
  [61, 15, 28, -23, -32],
  [79, 18, 23, -14, 26],
  [93, 14, 27, -6, -38],
  [16, 15, 25, -20, -28],
  [35, 17, 21, -12, 34],
  [53, 14, 29, -26, -26],
  [70, 16, 24, -3, 30],
  [86, 15, 26, -16, -34],
  [3, 17, 28, -11, 24],
  [12, 14, 23, -17, 36],
  [29, 18, 27, -7, -30],
  [47, 15, 25, -22, 28],
  [65, 17, 29, -13, -36],
  [82, 16, 22, -19, 32],
  [96, 13, 26, -2, -26],
  [21, 16, 28, -24, 34],
  [57, 15, 24, -10, -30],
] as const;

const petalColors = ["#e4bf60", "var(--mj-palette-2)", "var(--mj-palette-4)"] as const;

export default function FallingPetals() {
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div aria-hidden="true" data-mj-petals data-falling={pageVisible} className={`${styles.field} pointer-events-none fixed inset-0 z-20 select-none overflow-hidden`}>
      {paths.map(([left, size, duration, delay, drift], index) => (
        <span key={index} className={styles.petal} style={{
          left: `${left}%`,
          "--petal-size": `${size}px`,
          "--petal-color": petalColors[index % petalColors.length],
          "--petal-duration": `${duration}s`,
          "--petal-delay": `${delay}s`,
          "--petal-drift": `${drift}px`,
        } as CSSProperties} />
      ))}
    </div>
  );
}
