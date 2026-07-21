"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.25 });

  if (reduceMotion) return null;

  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#d8bd83]" style={{ scaleX: progress }} />;
}
