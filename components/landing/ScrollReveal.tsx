"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import useMarketingReducedMotion from "./useMarketingReducedMotion";

type RevealDirection = "up" | "left" | "right" | "scale" | "fade";

type ScrollRevealProps = {
  children: ReactNode;
  as?: keyof typeof revealElements;
  id?: string;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  amount?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;
const revealElements = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  li: motion.li,
};
const visible = { opacity: 1, x: 0, y: 0, scale: 1 };

export default function ScrollReveal({
  children,
  as = "div",
  id,
  className,
  delay = 0,
  direction = "up",
  distance = 16,
  amount = 0.18,
}: ScrollRevealProps) {
  const prefersReducedMotion = useMarketingReducedMotion();
  const element = useRef<HTMLElement | null>(null);
  const entered = useRef(false);
  const prepared = useRef(false);
  const controls = useAnimationControls();
  const inView = useInView(element, { once: true, amount, margin: "0px 0px -24px 0px" });
  const setElement = useCallback((node: HTMLElement | null) => { element.current = node; }, []);
  const Component = revealElements[as];

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.stop();
      controls.set(visible);
      prepared.current = false;
      return;
    }
    if (entered.current) return;

    const start = {
      opacity: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : 0,
      scale: direction === "scale" ? 0.97 : 1,
    };

    if (inView) {
      entered.current = true;
      // Already-visible content must never flash back to opacity zero during
      // hydration. Only elements prepared below the viewport fade in.
      void controls.start(prepared.current ? visible : {
        opacity: 1,
        x: [start.x, 0],
        y: [direction === "fade" ? 8 : start.y, 0],
        scale: [start.scale, 1],
      });
    } else if (!prepared.current && element.current && element.current.getBoundingClientRect().top >= window.innerHeight) {
      controls.set(start);
      prepared.current = true;
    }
  }, [controls, direction, distance, inView, prefersReducedMotion]);

  function showFocusedContent() {
    entered.current = true;
    controls.stop();
    controls.set(visible);
  }

  return (
    <Component
      ref={setElement}
      id={id}
      className={className}
      data-marketing-reveal=""
      // Framer owns these values, including immediate reduced-motion resets.
      style={{ transition: "none" }}
      onFocusCapture={showFocusedContent}
      initial={false}
      animate={controls}
      transition={
        prefersReducedMotion
          ? { duration: 0, delay: 0 }
          : { duration: 0.55, delay: Math.min(delay, 0.24), ease: revealEase }
      }
    >
      {children}
    </Component>
  );
}
