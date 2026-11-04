"use client";

import { createElement, useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { useInView } from "motion/react";
import useReducedMotionPreference from "@/components/landing/useMarketingReducedMotion";
import { ENTRANCE_DURATION, ENTRANCE_DISTANCE, ENTRANCE_EASE, ENTRANCE_STAGGER, ENTRANCE_MAX_DELAY, type EntranceProfile } from "../utils/scroll-entrance";
import type { ScrollLayerProps } from "./ScrollLayer";
import styles from "../styles/entrance.module.css";

type ScrollEntranceProps = Omit<ScrollLayerProps, "profile"> & { profile: EntranceProfile };

const REVEAL_VIEWPORT_EDGE = 0.92;

export default function ScrollEntrance({ as = "div", profile, staggerIndex = 0, className, ...props }: ScrollEntranceProps) {
  const target = useRef<HTMLElement>(null);
  const setTarget = useCallback((element: HTMLElement | null) => { target.current = element; }, []);
  const reducedMotion = useReducedMotionPreference();
  const inView = useInView(target, { once: true, margin: "0px 0px -8% 0px" });
  const [prepared, setPrepared] = useState(false);
  const [focused, setFocused] = useState(false);

  useLayoutEffect(() => {
    const element = target.current;
    if (!element || reducedMotion !== false) return;
    // Preserve the readable SSR/no-JS fallback; prepare offscreen content before paint.
    if (element.getBoundingClientRect().top >= window.innerHeight * REVEAL_VIEWPORT_EDGE) {
      setPrepared(true);
    }
  }, [reducedMotion]);

  const visible = !prepared || inView || reducedMotion !== false || focused;
  const animateReveal = prepared && inView && reducedMotion === false && !focused;
  const style = {
    "--jb-entrance-properties": animateReveal ? "opacity, transform" : "none",
    "--jb-entrance-duration": `${animateReveal ? ENTRANCE_DURATION : 0}s`,
    "--jb-entrance-delay": `${animateReveal ? Math.min(Math.max(staggerIndex, 0) * ENTRANCE_STAGGER, ENTRANCE_MAX_DELAY) : 0}s`,
    "--jb-entrance-ease": `cubic-bezier(${ENTRANCE_EASE.join(",")})`,
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : `translateY(${ENTRANCE_DISTANCE}px)`,
  } as CSSProperties;

  // Persist both endpoints in rendered styles; animation cleanup cannot reset opacity.
  return createElement(as, {
    ...props,
    ref: setTarget,
    className: `${styles.entrance}${className ? ` ${className}` : ""}`,
    style,
    "data-scroll-layer": profile,
    "data-scroll-entrance": true,
    "data-entrance-state": visible ? "visible" : "waiting",
    onFocusCapture: (event: FocusEvent<HTMLElement>) => {
      // Keyboard focus reveals immediately without moving a pointer target mid-click.
      if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setFocused(true);
    },
    onKeyDownCapture: () => setFocused(true),
  });
}
