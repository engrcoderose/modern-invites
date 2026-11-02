"use client";

import { useEffect, useState } from "react";
import { useIsPresent } from "framer-motion";
import { wedding } from "../data/wedding";
import { getCountdown, type CountdownTime } from "../utils/countdown";
import styles from "../styles/wedding.module.css";

const units = [
  ["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"],
] as const;

export default function WeddingCountdown({ enabled }: { enabled: boolean }) {
  const [remaining, setRemaining] = useState<CountdownTime | null>(null);
  const present = useIsPresent();

  useEffect(() => {
    const target = Date.parse(wedding.ceremonyISO);
    let interval: number | undefined;

    function update() {
      const next = getCountdown(target, Date.now());
      setRemaining(next);
      if (next.complete) {
        window.clearInterval(interval);
        interval = undefined;
      }
      return next.complete;
    }

    function syncClock() {
      window.clearInterval(interval);
      interval = undefined;
      const complete = update();
      if (enabled && present && !document.hidden && !complete) {
        interval = window.setInterval(update, 1000);
      }
    }

    syncClock();
    document.addEventListener("visibilitychange", syncClock);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", syncClock);
    };
  }, [enabled, present]);

  return <div className="w-full max-w-[480px]" data-reveal>
    <div role="timer" aria-live="off" aria-label={`Countdown to ${wedding.date}, ${wedding.venues[0].time}, Philippine time`}>
      <dl className="grid grid-cols-4 gap-3 border-y border-[var(--ae-line)] py-5 sm:gap-6 sm:py-6">
        {units.map(([key, label]) => <div key={key} className="flex min-w-0 flex-col items-center">
          <dt className={`${styles.label} order-2 mt-3`}>{label}</dt>
          <dd className={`${styles.countdownNumber} order-1`}>{remaining ? String(remaining[key]).padStart(2, "0") : "—"}</dd>
        </div>)}
      </dl>
    </div>
    {remaining?.complete && <p role="status" className={`${styles.body} mt-5`}>Our forever has begun.</p>}
  </div>;
}
