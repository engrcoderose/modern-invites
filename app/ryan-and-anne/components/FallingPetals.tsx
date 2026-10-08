"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "../styles/wedding.module.css";

const petals = Array.from({ length: 16 }, (_, index) => ({
  left: `${((index * 37) % 100) + 0.5}%`,
  width: `${6 + index % 4}px`,
  height: `${10 + index % 5}px`,
  animationDuration: `${18 + index % 9}s`,
  animationDelay: `${-index * 2.7}s`,
  "--petal-drift": `${(index % 2 ? -1 : 1) * (30 + index % 4 * 14)}px`,
  "--petal-turn": `${index % 2 ? -240 : 280}deg`,
} as CSSProperties));

export default function FallingPetals() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <>
      <div aria-hidden="true" data-paused={paused || !visible}
        className={`${styles.fallingPetals} pointer-events-none fixed inset-0 z-30 overflow-hidden`}>
        {petals.map((style, index) => (
          <span key={index} style={style}
            className={`${styles.fallingPetal} absolute top-0 ${index % 2 ? "hidden sm:block" : ""}`} />
        ))}
      </div>
      <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}
        className={`${styles.petalControl} sr-only focus:not-sr-only focus:fixed focus:bottom-5 focus:left-5 focus:z-50 focus:rounded-full focus:bg-[#171714] focus:px-5 focus:py-3 focus:text-xs focus:text-[#d1b788]`}>
        {paused ? "Resume falling petals" : "Pause falling petals"}
      </button>
    </>
  );
}
