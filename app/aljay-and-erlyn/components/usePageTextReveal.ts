"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { animate } from "framer-motion";
import { textRevealEase, textRevealTiming } from "../utils/text-reveal";

const revealTargets = "[data-reveal], h1, h2, h3, h4, p, time";
const excluded = "dialog, [data-reveal-managed], .sr-only, [role='status']";

export function usePageTextReveal({ root, ready, present, reduced, id }: {
  root: RefObject<HTMLElement | null>; ready: boolean; present: boolean; reduced: boolean; id: string;
}) {
  const waitingForOpening = useRef(!ready);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !present) return;
    const targets = Array.from(element.querySelectorAll<HTMLElement>(revealTargets))
      .filter(target => !target.closest(excluded));
    const groups = targets.filter(target => !targets.some(parent => parent !== target && parent.contains(target)));
    const opening = waitingForOpening.current;
    const fadeOnly = id === "invitation";
    const offset = reduced || fadeOnly ? 0 : opening ? 16 : 10;

    function paint(target: HTMLElement, value: number) {
      target.style.opacity = String(value);
      target.style.transform = offset && value < 1 ? `translateY(${(1 - value) * offset}px)` : "none";
    }

    groups.forEach(target => paint(target, reduced && ready ? 1 : 0));
    if (!ready) return;
    waitingForOpening.current = false;
    if (reduced) return;

    const controls = groups.map((target, index) => animate(0, 1, {
      ...textRevealTiming(index, opening),
      ease: fadeOnly ? "easeInOut" : textRevealEase,
      onUpdate: value => paint(target, value),
      onComplete: () => paint(target, 1),
    }));

    return () => {
      controls.forEach(control => control.stop());
      groups.forEach(target => paint(target, 1));
    };
  }, [root, ready, present, reduced, id]);
}
