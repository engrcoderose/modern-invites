"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import useMarketingReducedMotion from "./useMarketingReducedMotion";

type RevealDirection = "up" | "left" | "right" | "scale";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  amount?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

function getRevealKeyframes(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "left":
      return { x: [-distance, 0] };
    case "right":
      return { x: [distance, 0] };
    case "scale":
      return { scale: [0.96, 1] };
    default:
      return { y: [distance, 0] };
  }
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 34,
  amount = 0.18,
}: ScrollRevealProps) {
  const prefersReducedMotion = useMarketingReducedMotion();

  return (
    <motion.div
      className={className}
      // Keep server-rendered content readable if hydration or viewport observation fails.
      initial={false}
      animate={prefersReducedMotion ? { x: 0, y: 0, scale: 1 } : undefined}
      whileInView={
        prefersReducedMotion ? undefined : getRevealKeyframes(direction, distance)
      }
      viewport={{ once: true, amount, margin: "0px 0px -7% 0px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0, delay: 0 }
          : { duration: 0.72, delay, ease: revealEase }
      }
    >
      {children}
    </motion.div>
  );
}
