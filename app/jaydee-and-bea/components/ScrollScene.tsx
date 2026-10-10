"use client";

import { createContext, createElement, useContext, useEffect, useRef, useState, type HTMLAttributes, type FocusEvent } from "react";
import { useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { SCENE_SPRING } from "../utils/scroll-profiles";

const SceneContext = createContext<{ progress: MotionValue<number>; enabled: boolean } | null>(null);

interface ScrollSceneProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "figure" | "div" | "ul";
  reveal?: boolean;
  lockOnFocus?: boolean;
}

export function useScrollScene() {
  const scene = useContext(SceneContext);
  if (!scene) throw new Error("Scroll layers must be inside a ScrollScene.");
  return scene;
}

export default function ScrollScene({ as = "section", reveal = false, lockOnFocus = false, children, ...props }: ScrollSceneProps) {
  const target = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: reveal ? ["start 0.98", "start 0.68"] : ["start end", "end start"] });
  const bounded = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(bounded, SCENE_SPRING);

  // Match the visible server render before enabling preference-dependent motion.
  useEffect(() => { setMounted(true); }, []);

  return (
    <SceneContext.Provider value={{ progress, enabled: mounted && reducedMotion === false && !focused }}>
      {createElement(as, {
        ...props,
        ref: target,
        onFocusCapture: lockOnFocus ? () => setFocused(true) : props.onFocusCapture,
        onBlurCapture: lockOnFocus ? (event: FocusEvent<HTMLElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
        } : props.onBlurCapture,
      }, children)}
    </SceneContext.Provider>
  );
}
