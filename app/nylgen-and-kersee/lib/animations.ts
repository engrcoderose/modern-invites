import type { Transition, Variants } from "framer-motion";

export const botanicalEase = [0.22, 1, 0.36, 1] as const;

export const weddingTransition: Transition = {
  duration: 0.76,
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
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
