"use client";

import { useEffect, useRef, type RefObject } from "react";
import { animate, frame } from "motion";

export default function useWelcomeEntrance(root: RefObject<HTMLElement | null>, enabled: boolean) {
  const played = useRef(false);
  useEffect(() => {
    if (!enabled || !root.current || played.current) return;
    played.current = true;
    const restores: (() => void)[] = [];
    const controls: ReturnType<typeof animate>[] = [];
    const groups = [
      { selector: "[data-welcome-name]", delay: 0, duration: 1.2, distance: 18, opacity: 0.2, stagger: 0.22 },
      { selector: "[data-welcome-symbol]", delay: 0.12, duration: 0.9, distance: 6, opacity: 0.35, stagger: 0 },
      { selector: "[data-welcome-detail]", delay: 0.38, duration: 0.8, distance: 8, opacity: 0.4, stagger: 0.08 },
    ];
    for (const group of groups) {
      root.current.querySelectorAll<HTMLElement>(group.selector).forEach((element, index) => {
        const original = element.getAttribute("style");
        const restore = () => original === null ? element.removeAttribute("style") : element.setAttribute("style", original);
        restores.push(restore);
        const keyframes = group.selector === "[data-welcome-name]"
          ? { opacity: [group.opacity, 1], y: [group.distance, 0], filter: ["blur(2px)", "blur(0px)"] }
          : { opacity: [group.opacity, 1], y: [group.distance, 0] };
        const control = animate(element, keyframes, { duration: group.duration,
          delay: group.delay + index * group.stagger, ease: [0.16, 1, 0.3, 1] });
        controls.push(control);
        void control.then(() => { control.cancel(); restore(); frame.postRender(restore); });
      });
    }
    return () => {
      for (const control of controls) control.cancel();
      for (const restore of restores) { restore(); frame.postRender(restore); }
    };
  }, [root, enabled]);
}
