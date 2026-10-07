"use client";

import { useEffect, useLayoutEffect } from "react";
import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { wedding } from "../data/wedding-data";
import CoupleNames from "./CoupleNames";

const INTRO_EASE = [0.16, 1, 0.3, 1] as const;
const NAME_EASE = [0.22, 0.35, 0.3, 1] as const;
const NAME_DURATION = 3;
const NAME_STAGGER = 0.3;
// At 250% size, the transparent edge at 60% starts at the mask box's left edge.
// This avoids an invisible lead-in before the ink sweep reaches the name.
const NAME_MASK = "linear-gradient(90deg, #000 45%, transparent 60%)";

function resetIntroduction(root: HTMLDivElement | null) {
  root?.querySelectorAll<HTMLElement>("[data-hero-kicker], [data-hero-name], [data-hero-detail]").forEach((element) => {
    ["opacity", "transform", "mask-image", "mask-size", "mask-repeat", "mask-position"].forEach((property) => element.style.removeProperty(property));
  });
}

export default function HeroIntroduction() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || reducedMotion !== false) return;
    const names = root.querySelectorAll<HTMLElement>("[data-hero-name]");
    const details = root.querySelectorAll<HTMLElement>("[data-hero-kicker], [data-hero-detail]");
    names.forEach((element) => {
      element.style.opacity = "0";
      element.style.maskImage = NAME_MASK;
      element.style.maskSize = "250% 100%";
      element.style.maskRepeat = "no-repeat";
      element.style.maskPosition = "100% 0%";
    });
    details.forEach((element) => { element.style.opacity = "0"; });

    return () => resetIntroduction(root);
  }, [reducedMotion, scope]);

  useEffect(() => {
    if (reducedMotion !== false || !inView) return;
    let cancelled = false;
    let controls: ReturnType<typeof animate> | undefined;

    async function introduce() {
      controls = animate("[data-hero-kicker]", { opacity: [0, 1], y: [6, 0] }, {
        duration: 0.45, ease: INTRO_EASE,
      });
      await controls;
      if (cancelled) return;

      controls = animate("[data-hero-name]", {
        maskPosition: ["100% 0%", "0% 0%"], opacity: [0, 1], y: [8, 0],
      }, { duration: NAME_DURATION, delay: stagger(NAME_STAGGER), ease: NAME_EASE });
      await controls;
      if (cancelled) return;

      scope.current?.querySelectorAll<HTMLElement>("[data-hero-name]").forEach((element) => {
        ["mask-image", "mask-size", "mask-repeat", "mask-position"].forEach((property) => element.style.removeProperty(property));
      });
      // Supporting information waits for every name line to finish its sweep.
      controls = animate("[data-hero-detail]", { opacity: [0, 1], y: [10, 0] }, {
        duration: 0.8, delay: stagger(0.12), ease: INTRO_EASE,
      });
      await controls;
      if (!cancelled) resetIntroduction(scope.current);
    }

    void introduce();
    const root = scope.current;
    return () => { cancelled = true; controls?.stop(); resetIntroduction(root); };
  }, [animate, inView, reducedMotion, scope]);

  return (
    <div ref={scope}>
      <p data-hero-kicker className="jb-eyebrow">The wedding of</p>
      <CoupleNames />
      <time data-hero-detail dateTime={wedding.date.iso} className="jb-serif block text-xl tracking-[0.1em] sm:text-2xl">{wedding.date.display}</time>
      <p data-hero-detail className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#526445]">{wedding.date.weekday} · Malolos, Bulacan</p>
    </div>
  );
}
