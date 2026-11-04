"use client";

import { useContext, useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import styles from "../styles/hero-birds.module.css";
import { InvitationEntryContext } from "./InvitationEntryContext";

export default function HeroBirdFlight({ side, children }: { side: "left" | "right"; children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const inView = useInView(scope);
  const pageVisible = usePageVisibility();
  const reducedMotion = useReducedMotion();
  const entered = useContext(InvitationEntryContext);

  return (
    <div ref={scope} className={styles.flight} data-side={side} data-flying={entered && reducedMotion === false && inView && pageVisible}>
      {children}
    </div>
  );
}
