"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useMarketingReducedMotion from "./useMarketingReducedMotion";

const AnimatedLink = motion.create(Link);

export default function MotionLink(props: ComponentProps<typeof AnimatedLink>) {
  const reducedMotion = useMarketingReducedMotion();

  return (
    <AnimatedLink
      {...props}
      style={{ ...props.style, transition: "none" }}
      initial={false}
      animate={reducedMotion ? { y: 0, scale: 1 } : undefined}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: reducedMotion ? 0 : 0.18 }}
    />
  );
}
