"use client";

import { useEffect, useRef, useState, type CSSProperties, type PropsWithChildren } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}

export default function Reveal({ children, className, delay = 0, y = 36, scale = 1 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const reduceMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  useEffect(() => setInteractive(true), []);

  const visible = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
  const hidden = { opacity: 0, y, scale, filter: "blur(9px)" };

  return (
    <motion.div
      ref={ref}
      className={`scroll-reveal ${className ?? ""}`}
      initial={false}
      animate={!interactive || reduceMotion || inView ? visible : hidden}
      transition={{ duration: 1.05, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{
        "--reveal-y": `${y}px`,
        "--reveal-scale": scale,
        willChange: interactive && !inView ? "opacity, transform" : "auto",
      } as CSSProperties}
    >
      {children}
    </motion.div>
  );
}
