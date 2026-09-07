"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";

interface CountdownSectionProps {
  date: string;
  brideFullName: string;
  groomFullName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const initialTimeLeft: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft(target: number): TimeLeft {
  const difference = Math.max(0, target - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export default function CountdownSection({ date, brideFullName, groomFullName }: CountdownSectionProps) {
  const target = useMemo(() => new Date(date).getTime(), [date]);
  // Keep the server and the browser's first render identical. The live value is
  // populated after hydration so a ticking second cannot cause a mismatch.
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft(target));

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  const values = [
    [timeLeft.days, "Days"],
    [timeLeft.hours, "Hours"],
    [timeLeft.minutes, "Minutes"],
    [timeLeft.seconds, "Seconds"],
  ] as const;

  return (
    <section className="relative overflow-hidden border-y border-[#637b65]/10 bg-[#e5eadd] px-5 py-20 text-[#33473d] sm:px-8 sm:py-24 lg:px-12">
      <SectionPetals />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#637b65]/[0.07] sm:h-[30rem] sm:w-[30rem]" />
      <div className="relative mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-[#637b65]">Counting down to our wedding day</p>
          <p className="mt-4 font-meaCulpa text-4xl text-[#637b65] sm:text-5xl">{groomFullName} &amp; {brideFullName}</p>
        </Reveal>
        <p className="mt-4 text-xs text-[#616b60]">November 21, 2026 · Ceremony time to be confirmed</p>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-px bg-[#637b65]/15 sm:grid-cols-4">
          {values.map(([value, label], index) => (
            <motion.div key={label} initial={false} whileInView={{ opacity: [0, 1], y: [16, 0] }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.7 }} style={{ "--reveal-y": "24px", "--reveal-scale": 0.96 } as CSSProperties} className="scroll-reveal bg-[#e5eadd] px-3 py-7 sm:py-9">
              <span className="block font-instrumentSerif text-5xl tabular-nums sm:text-6xl">{String(value).padStart(2, "0")}</span>
              <span className="mt-2 block text-[0.55rem] uppercase tracking-[0.28em] text-[#616b60]">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
