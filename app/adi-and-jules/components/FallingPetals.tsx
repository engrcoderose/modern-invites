"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import { useInvitationMotion } from "./motion/InvitationMotion";

// Fixed variations keep the decoration consistent without timers or random renders.
const petals = [
  { left: 7, size: 19, drift: 6, duration: 21, delay: -9, rotation: 32 },
  { left: 23, size: 14, drift: -5, duration: 26, delay: -20, rotation: 145 },
  { left: 42, size: 16, drift: 7, duration: 24, delay: -3, rotation: 72 },
  { left: 63, size: 21, drift: -6, duration: 28, delay: -16, rotation: 210 },
  { left: 79, size: 13, drift: 5, duration: 23, delay: -6, rotation: 118 },
  { left: 92, size: 18, drift: -7, duration: 27, delay: -23, rotation: 285 },
  { left: 15, size: 12, drift: 8, duration: 29, delay: -14, rotation: 190 },
  { left: 34, size: 20, drift: -4, duration: 25, delay: -22, rotation: 15 },
  { left: 53, size: 13, drift: 6, duration: 30, delay: -11, rotation: 245 },
  { left: 72, size: 17, drift: -8, duration: 22, delay: -18, rotation: 95 },
];

export default function FallingPetals() {
  const { active } = useInvitationMotion();
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();

  if (!active || reducedMotion) return null;

  return (
    <div aria-hidden="true" data-playing={pageVisible} className="aj-falling-petals pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {petals.map((petal, index) => (
        <span
          key={petal.left}
          className={`aj-falling-petal absolute top-0 ${index >= 6 ? "hidden sm:block" : "block"}`}
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.65,
            "--petal-drift": `${petal.drift}vw`,
            "--petal-duration": `${petal.duration}s`,
            "--petal-delay": `${petal.delay}s`,
            "--petal-rotation": `${petal.rotation}deg`,
          } as CSSProperties}
        >
          <span className="aj-falling-petal-surface block h-full w-full" />
        </span>
      ))}
    </div>
  );
}
