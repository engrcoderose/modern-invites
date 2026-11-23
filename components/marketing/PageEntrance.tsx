"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import useMarketingReducedMotion from "@/components/landing/useMarketingReducedMotion";

export default function PageEntrance({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useMarketingReducedMotion();
  return (
    <motion.main initial={false} animate={reducedMotion ? { opacity: 1 } : { opacity: [0.94, 1] }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.main>
  );
}
