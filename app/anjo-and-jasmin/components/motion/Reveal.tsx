"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useInvitationMotion } from "./InvitationMotion";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  x?: number;
}

export default function Reveal({ children, className, delay = 0, y = 28, x = 0, scale = 1 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: "some", margin: "0px 0px -32px 0px" });
  const reduceMotion = useReducedMotion();
  const { active } = useInvitationMotion();
  const [interactive, setInteractive] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => setInteractive(true), []);

  const revealed = !interactive || reduceMotion || focused || (active && inView);
  const visible = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
  const hidden = { opacity: 0, x, y, scale, filter: "blur(3px)" };

  return (
    <motion.div
      ref={ref}
      className={`scroll-reveal ${className ?? ""}`}
      initial={false}
      data-revealed={Boolean(revealed)}
      onFocusCapture={() => setFocused(true)}
      animate={revealed ? visible : hidden}
      transition={{
        duration: reduceMotion || focused ? 0 : 0.85,
        delay: active && inView && !reduceMotion && !focused ? Math.min(delay, 0.24) : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
