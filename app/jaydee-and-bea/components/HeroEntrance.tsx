"use client";

import { useContext, useEffect, useLayoutEffect, type ReactNode } from "react";
import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { InvitationEntryContext } from "./InvitationEntryContext";
import { ENTRANCE_DURATION, ENTRANCE_DISTANCE, ENTRANCE_EASE, ENTRANCE_STAGGER } from "../utils/scroll-entrance";

const ENTRANCE_ELEMENTS = "[data-hero-art], [data-hero-kicker], [data-hero-name], [data-hero-detail]";
const NAME_MASK = "linear-gradient(90deg, #000 45%, transparent 60%)";
const GARDEN_MASK = "linear-gradient(to top, #000 45%, transparent 65%)";

function clearEntrance(root: HTMLDivElement | null) {
  root?.querySelectorAll<HTMLElement>(ENTRANCE_ELEMENTS).forEach((element) => {
    ["opacity", "transform", "mask-image", "mask-size", "mask-repeat", "mask-position"].forEach((property) => element.style.removeProperty(property));
  });
}

/** One invitation reveal; bird flight keeps a separate nested transform. */
export default function HeroEntrance({ children, skipEntrance = false }: { children: ReactNode; skipEntrance?: boolean }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const entered = useContext(InvitationEntryContext);

  useLayoutEffect(() => {
    const root = scope.current;
    if (skipEntrance || !root || reducedMotion !== false) return;
    root.querySelectorAll<HTMLElement>(ENTRANCE_ELEMENTS).forEach((element) => {
      element.style.opacity = "0";
    });
    root.querySelectorAll<HTMLElement>("[data-hero-name]").forEach((element) => {
      // Oversizing brings the feathered edge directly to the first ink stroke.
      element.style.maskImage = NAME_MASK;
      element.style.maskSize = "250% 100%";
      element.style.maskRepeat = "no-repeat";
      element.style.maskPosition = "100% 0%";
    });
    const garden = root.querySelector<HTMLElement>("[data-hero-art='arch']");
    if (garden) {
      garden.style.maskImage = GARDEN_MASK;
      garden.style.maskSize = "100% 250%";
      garden.style.maskRepeat = "no-repeat";
      garden.style.maskPosition = "0% 0%";
    }
    return () => clearEntrance(root);
  }, [reducedMotion, scope, skipEntrance]);

  useEffect(() => {
    if (skipEntrance || !entered || !inView || reducedMotion !== false) return;
    const root = scope.current;
    let cancelled = false;
    const controls = animate([
      ["[data-hero-kicker]", { opacity: [0, 1], y: [ENTRANCE_DISTANCE, 0] }, { at: 0, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-art='grass']", { opacity: [0, 1], y: [6, 0] }, { at: 0, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-art='upper-flower']", { opacity: [0, 1], scale: [0.985, 1] }, { at: ENTRANCE_STAGGER, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-art='arch']", { opacity: [0, 1], y: [6, 0], maskPosition: ["0% 0%", "0% 100%"] }, { at: ENTRANCE_STAGGER * 2, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-name]", { opacity: [0, 1], y: [ENTRANCE_DISTANCE, 0], maskPosition: ["100% 0%", "0% 0%"] }, { at: ENTRANCE_STAGGER * 3, duration: ENTRANCE_DURATION, delay: stagger(ENTRANCE_STAGGER), ease: ENTRANCE_EASE }],
      ["[data-hero-art='couple']", { opacity: [0, 1], y: [6, 0], scale: [0.995, 1] }, { at: ENTRANCE_STAGGER * 4, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-art='left-birds']", { opacity: [0, 1], x: [-8, 0], y: [3, 0] }, { at: ENTRANCE_STAGGER * 5, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-art='right-birds']", { opacity: [0, 1], x: [8, 0], y: [3, 0] }, { at: ENTRANCE_STAGGER * 6, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
      ["[data-hero-detail]", { opacity: [0, 1], y: [ENTRANCE_DISTANCE, 0] }, { at: ENTRANCE_STAGGER * 7, duration: ENTRANCE_DURATION, ease: ENTRANCE_EASE }],
    ]);
    void controls.then(() => {
      if (!cancelled) clearEntrance(root);
    });
    return () => {
      cancelled = true;
      controls.stop();
      clearEntrance(root);
    };
  }, [animate, entered, inView, reducedMotion, scope, skipEntrance]);

  return (
    <div ref={scope} className="relative min-h-[inherit]">
      {children}
    </div>
  );
}
