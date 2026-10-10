"use client";

import { useEffect, useLayoutEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const TARGETS = "[data-welcome-photo], [data-welcome-flower], [data-welcome-name], [data-welcome-date], [data-welcome-action]";

function clearEntrance(root: HTMLElement | null) {
  root?.querySelectorAll<HTMLElement>(TARGETS).forEach((element) => {
    ["opacity", "transform", "filter", "mask-image", "mask-size", "mask-repeat", "mask-position"].forEach((property) => element.style.removeProperty(property));
  });
}

/** A single floral welcome; the opening action remains available throughout. */
export default function useWelcomeEntrance(active: boolean) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = scope.current;
    if (!active || !root || reducedMotion !== false) return;
    root.querySelectorAll<HTMLElement>("[data-welcome-flower], [data-welcome-name], [data-welcome-date]").forEach((element) => {
      element.style.opacity = "0";
    });
    const action = root.querySelector<HTMLElement>("[data-welcome-action]");
    if (action) action.style.opacity = "0.6";
    root.querySelectorAll<HTMLElement>("[data-welcome-flower]").forEach((element) => {
      element.style.maskImage = "linear-gradient(to bottom, #000 45%, transparent 65%)";
      element.style.maskSize = "100% 250%";
      element.style.maskRepeat = "no-repeat";
      element.style.maskPosition = "0% 100%";
    });
    return () => clearEntrance(root);
  }, [active, reducedMotion, scope]);

  useEffect(() => {
    if (!active || reducedMotion !== false || !scope.current) return;
    const root = scope.current;
    let cancelled = false;
    const controls = animate([
      ["[data-welcome-photo]", { scale: [1.035, 1] }, { duration: 2, ease: EASE }],
      ["[data-welcome-flower]", { opacity: [0, 1], scale: [0.98, 1], maskPosition: ["0% 100%", "0% 0%"] }, { at: 0.1, duration: 1.6, ease: EASE }],
      ["[data-welcome-name]", { opacity: [0, 1], y: [4, 0], filter: ["blur(2px)", "blur(0px)"] }, { at: 0.25, duration: 1.25, ease: EASE }],
      ["[data-welcome-date]", { opacity: [0, 1], y: [3, 0] }, { at: 0.5, duration: 0.9, ease: EASE }],
      ["[data-welcome-action]", { opacity: [0.6, 1] }, { at: 0.65, duration: 0.75, ease: EASE }],
    ]);
    void controls.then(() => { if (!cancelled) clearEntrance(root); });
    return () => {
      cancelled = true;
      controls.stop();
      clearEntrance(root);
    };
  }, [active, animate, reducedMotion, scope]);

  return scope;
}
