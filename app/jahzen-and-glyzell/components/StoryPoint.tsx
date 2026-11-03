"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import useHydratedReducedMotion from "../hooks/useHydratedReducedMotion";
import styles from "../styles/invitation.module.css";

const pop = { scale: [1, 1.85, 1.2, 1.35] };
const still = { scale: 1 };

export default function StoryPoint() {
  const point = useRef<HTMLSpanElement>(null);
  const reached = useInView(point, { once: true, margin: "-96px 0px -96px 0px" });
  const reducedMotion = useHydratedReducedMotion();

  return <span ref={point} className="absolute left-1/2 top-2 size-1.5 -translate-x-1/2">
    <motion.span className="block size-full" initial={false} animate={reached && !reducedMotion ? pop : still}
      transition={{ duration: reducedMotion ? 0 : .55, times: [0, .3, .65, 1], ease: [.16, 1, .3, 1] }}>
      <span data-reached={reached} className={`${styles.storyDiamond} block size-full rotate-45 border`} />
    </motion.span>
  </span>;
}
