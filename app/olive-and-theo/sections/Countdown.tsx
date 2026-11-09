"use client";

import { useEffect, useState } from "react";
import { event } from "../data/event";
import styles from "../styles/invitation.module.css";

const units = ["Days", "Hours", "Minutes", "Seconds"];
const ceremony = Date.parse(event.startsAt);

function getRemaining() {
  const seconds = Math.max(0, Math.floor((ceremony - Date.now()) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<number[] | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => {
      const next = getRemaining();
      setRemaining(next);
      if (next.every(value => value === 0)) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const arrived = remaining?.every(value => value === 0);

  return (
    <section id="countdown" aria-labelledby="ot-countdown-heading" className={`${styles.oliveBand} px-6 py-14 text-center md:py-20`}>
      <h2 id="ot-countdown-heading" className={`${styles.display} text-3xl sm:text-4xl`}>
        {arrived ? "Our wedding day has arrived." : "Until we say “I do”."}
      </h2>
      <dl role="timer" aria-live="off" aria-label="Time until the ceremony" className="mx-auto mt-9 grid max-w-2xl grid-cols-4 divide-x divide-[var(--ot-line)]">
        {units.map((unit, index) => (
          <div key={unit} className="flex flex-col items-center gap-3 px-2">
            <dt className="text-xs sm:text-sm">{unit}</dt>
            <dd className={`${styles.countdownNumber} -order-1 tabular-nums`}>{remaining ? String(remaining[index]).padStart(2, "0") : "—"}</dd>
          </div>
        ))}
      </dl>
      <noscript><p className="mt-6 text-sm">{event.date} · {event.time}</p></noscript>
    </section>
  );
}
