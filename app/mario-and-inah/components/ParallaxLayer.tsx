"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  background?: boolean;
  inline?: boolean;
  reverse?: boolean;
  overscan?: boolean;
};

// Gentle depth, without inertia on the page itself or movement of reading content.
export default function ParallaxLayer({ children, className = "", background = false, inline = false, reverse = false, overscan = false }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame);
  const [preferences, setPreferences] = useState({ reduced: true, desktop: false });
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const distance = preferences.reduced ? 0 : background
    ? (preferences.desktop ? 36 : 18)
    : inline ? (preferences.desktop ? 18 : 12) : (preferences.desktop ? 32 : 18);
  const drift = useTransform(scrollYProgress, [0, 1], reverse ? [distance, -distance] : [-distance, distance]);
  const y = useSpring(drift, { stiffness: 80, damping: 30, mass: 0.6, restDelta: 0.01 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const update = () => setPreferences({ reduced: reduced.matches, desktop: desktop.matches });
    update();
    reduced.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={frame} data-parallax={background ? "photo" : "floral"} className={`pointer-events-none ${inline ? "relative" : "absolute inset-0"} ${className}`}>
      <motion.div className={inline ? "relative" : `absolute inset-x-0 ${background ? "-inset-y-12" : overscan ? "-inset-y-8" : "inset-y-0"}`}
        style={{ y: preferences.reduced ? 0 : y, willChange: inView && !preferences.reduced ? "transform" : "auto" }}>
        {children}
      </motion.div>
    </div>
  );
}
