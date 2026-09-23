"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import { wedding } from "../data";
import SectionPetals from "./SectionPetals";
import Reveal from "./motion/Reveal";

export default function Countdown() {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.1 });
  const pageVisible = usePageVisibility();
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!inView || !pageVisible) return;
    const target = new Date(wedding.countdownDate).getTime();
    const update = () => setRemaining(Math.max(0, target - Date.now()));
    update();
    if (Date.now() >= target) return;
    const timer = setInterval(() => {
      update();
      if (Date.now() >= target) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [inView, pageVisible]);
  const units = [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor(remaining / 3600000) % 24, "Hours"],
    [Math.floor(remaining / 60000) % 60, "Minutes"],
    [Math.floor(remaining / 1000) % 60, "Seconds"],
  ] as const;
  return <section ref={section} id="countdown" className="relative overflow-hidden bg-[rgb(var(--aj-cream))] px-4 py-20 text-center text-[rgb(var(--aj-ink))]">
    <SectionPetals />
    <div className="relative mx-auto max-w-5xl">
      <Reveal y={24}>
        <h2 className="font-meaCulpa text-4xl sm:text-6xl">Counting down to our wedding day</h2>
      </Reveal>
      <div className="mx-auto mt-12 flex max-w-3xl items-start justify-center gap-3 sm:gap-8">{units.map(([value, label], index) => <Reveal key={label} delay={0.12 + index * 0.1} y={28} className="relative min-w-0 flex-1">
        {index > 0 && <span aria-hidden="true" className="absolute -left-2.5 top-0 font-serif text-3xl text-[rgb(var(--aj-muted))] sm:-left-5 sm:text-6xl">:</span>}
        <span className="block font-serif text-[clamp(2.4rem,8vw,6rem)] leading-none tabular-nums">{String(value).padStart(2, "0")}</span>
        <span className="mt-4 block text-[9px] uppercase tracking-[.12em] sm:text-xs sm:tracking-[.2em]">{label}</span>
      </Reveal>)}</div>
    </div>
  </section>;
}
