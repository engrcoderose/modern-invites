"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import styles from "../styles/petals.module.css";

// Fixed paths avoid hydration changes and keep the shower sparse.
const petals = Array.from({ length: 10 }, (_, index) => ({
  left: `${5 + (index * 37) % 90}%`,
  width: `${8 + index % 4}px`,
  height: `${12 + index % 5}px`,
  animationDuration: `${18 + index % 7}s`,
  animationDelay: `${-index * 2.7}s`,
  "--petal-drift": `${(index % 2 ? -1 : 1) * (25 + index % 4 * 12)}px`,
  backgroundColor: ["var(--mi-blush)", "var(--mi-lilac)", "var(--mi-sage)"][index % 3],
} as CSSProperties));

export default function FallingPetals() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div className={styles.petals}>
      <div aria-hidden="true" data-paused={paused || !visible}
        className={`${styles.field} pointer-events-none fixed inset-0 z-30 overflow-hidden select-none`}>
        {petals.map((style, index) => <span key={index} style={style} data-mi-petal
          className={`${styles.petal} absolute -top-6 ${index % 2 ? "hidden sm:block" : ""}`} />)}
      </div>
      <button type="button" aria-label={paused ? "Resume falling petals" : "Pause falling petals"}
        title={paused ? "Resume falling petals" : "Pause falling petals"}
        aria-pressed={paused} onClick={() => setPaused(!paused)}
        className={`${styles.control} fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex min-h-11 min-w-11 items-center justify-center rounded-full sm:left-6`}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
