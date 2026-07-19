"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

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

function getInitialTransform(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0, scale: 1 };
    case "right":
      return { x: distance, y: 0, scale: 1 };
    case "scale":
      return { x: 0, y: 0, scale: 0.96 };
    default:
      return { x: 0, y: distance, scale: 1 };
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
  const prefersReducedMotion = useReducedMotion();
  const initialTransform = getInitialTransform(direction, distance);

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              filter: "blur(7px)",
              ...initialTransform,
            }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 1,
              filter: "blur(0px)",
              x: 0,
              y: 0,
              scale: 1,
            }
      }
      viewport={{ once: true, amount, margin: "0px 0px -7% 0px" }}
      transition={{ duration: 0.72, delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}
