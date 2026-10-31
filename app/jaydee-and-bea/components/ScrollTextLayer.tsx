"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import useReducedMotionPreference from "@/components/landing/useMarketingReducedMotion";
import { textReveals, type TextRevealProfile } from "../utils/text-reveals";
import type { ScrollLayerProps } from "./ScrollLayer";

type ScrollTextLayerProps = Omit<ScrollLayerProps, "profile"> & { profile: TextRevealProfile };

const REVEAL_VIEWPORT_EDGE = 0.92;
const MAX_STAGGER_SECONDS = 0.24;
const REVEAL_EASE = [0.22, 0.35, 0.3, 1] as const;
const SETTLED = { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" };

export default function ScrollTextLayer({ as = "div", profile, phase = 0, ...props }: ScrollTextLayerProps) {
  const target = useRef<HTMLElement>(null);
  const setTarget = useCallback((element: HTMLElement | null) => { target.current = element; }, []);
  const reducedMotion = useReducedMotionPreference();
  const inView = useInView(target, { once: true, margin: "0px 0px -8% 0px" });
  const [prepared, setPrepared] = useState(false);
  const [focused, setFocused] = useState(false);
  const config = textReveals[profile];

  useLayoutEffect(() => {
    const element = target.current;
    if (!element || reducedMotion !== false) return;
    // Keep server-rendered and already-visible copy readable; prepare only below the fold.
    if (element.getBoundingClientRect().top >= window.innerHeight * REVEAL_VIEWPORT_EDGE) {
      setPrepared(true);
    }
  }, [reducedMotion]);

  const visible = !prepared || inView || reducedMotion !== false || focused;
  const animateReveal = prepared && inView && reducedMotion === false && !focused;
  const Tag = motion[as];

  return (
    <Tag
      {...props}
      ref={setTarget}
      data-scroll-layer={profile}
      initial={false}
      animate={visible ? SETTLED : {
        y: config.y,
        opacity: config.opacity,
        scale: config.scale,
        filter: `blur(${config.blur}px)`,
      }}
      transition={{
        duration: animateReveal ? config.duration : 0,
        delay: animateReveal ? Math.min(Math.max(phase, 0) * 2, MAX_STAGGER_SECONDS) : 0,
        ease: REVEAL_EASE,
      }}
      onFocusCapture={() => setFocused(true)}
    />
  );
}
