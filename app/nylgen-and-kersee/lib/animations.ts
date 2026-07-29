import type { Transition, Variants } from "framer-motion";

export const botanicalEase = [0.16, 1, 0.3, 1] as const;

export const weddingTransition: Transition = {
  duration: 1.05,
  ease: botanicalEase,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: weddingTransition,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: weddingTransition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: weddingTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;
