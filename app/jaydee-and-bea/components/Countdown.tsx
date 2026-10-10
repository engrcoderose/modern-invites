"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding-data";
import { getTimeLeft } from "../utils/countdown";
import ScrollLayer from "./ScrollLayer";

export default function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getTimeLeft
  > | null>(null);
  useEffect(() => {
    const target = Date.parse(wedding.date.iso);
    let timer: number | undefined;
    const update = () => {
      const next = getTimeLeft(target, Date.now());
      setRemaining(next);
      if (next.finished && timer !== undefined) window.clearInterval(timer);
      return next.finished;
    };
    if (!update()) timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-10 sm:mt-12">
      {remaining?.finished && (
        <p className="mb-6 text-sm text-[rgb(var(--jb-countdown-label))]">
          Our wedding day is here
        </p>
      )}
      <div
        role="timer"
        aria-label="Countdown to the ceremony"
        aria-live="off"
        className="grid grid-cols-4"
      >
        {(["days", "hours", "minutes", "seconds"] as const).map(
          (label, index) => (
            <div
              key={label}
              className="border-r border-[#637b65]/15 py-6 last:border-r-0 sm:py-10"
            >
              <ScrollLayer profile="countdown-value" phase={index * 0.015}>
                <span className="jb-countdown-value block text-[clamp(2.5rem,9vw,5rem)] leading-none tabular-nums">
                  {remaining ? String(remaining[label]).padStart(2, "0") : "—"}
                </span>
                <span className="mt-3 block text-xs uppercase tracking-[0.04em] text-[#616b60] sm:mt-4 sm:tracking-[0.16em]">
                  {label}
                </span>
              </ScrollLayer>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
