"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data";
import SectionPetals from "../../jasmin-and-anjo/components/SectionPetals";

export default function Countdown() {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(wedding.countdownDate).getTime() - Date.now()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  const units = [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor(remaining / 3600000) % 24, "Hours"],
    [Math.floor(remaining / 60000) % 60, "Minutes"],
    [Math.floor(remaining / 1000) % 60, "Seconds"],
  ] as const;
  return <section id="countdown" className="relative overflow-hidden bg-[#e5eadd] px-4 py-20 text-center text-[#465a48]">
    <SectionPetals />
    <div className="relative mx-auto max-w-5xl">
      <h2 className="font-meaCulpa text-4xl sm:text-6xl">Counting down to our wedding day</h2>
      <p className="mt-5 font-imperial text-3xl sm:text-4xl">{wedding.groom} &amp; {wedding.bride}</p>
      <p className="mt-4 text-xs leading-6">{wedding.dateDisplay} · {wedding.time} Philippine time</p>
      <div className="mx-auto mt-12 flex max-w-3xl items-start justify-center gap-3 sm:gap-8">{units.map(([value, label], index) => <div key={label} className="relative min-w-0 flex-1">
        {index > 0 && <span aria-hidden="true" className="absolute -left-2.5 top-0 font-serif text-3xl opacity-40 sm:-left-5 sm:text-6xl">:</span>}
        <span className={`block font-serif text-[clamp(2.4rem,8vw,6rem)] leading-none tabular-nums ${index === 3 ? "opacity-55" : ""}`}>{String(value).padStart(2, "0")}</span>
        <span className="mt-4 block text-[9px] uppercase tracking-[.12em] sm:text-xs sm:tracking-[.2em]">{label}</span>
      </div>)}</div>
    </div>
  </section>;
}
