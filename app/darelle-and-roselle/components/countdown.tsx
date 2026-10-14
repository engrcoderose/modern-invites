"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { getCountdown } from "../utils/countdown";
import styles from "../styles/invitation.module.css";

export default function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getCountdown> | null>(null);
  useEffect(() => {
    const update = () => setRemaining(getCountdown(wedding.ceremonyISO, Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!remaining) return <p className={`${styles.body} min-h-[78px]`}>{wedding.date} · 2:00 PM</p>;
  if (remaining.total === 0) return <p className={styles.body}>Our wedding day has arrived.</p>;
  return (
    <dl aria-label="Time until the wedding ceremony" className="grid w-full max-w-[480px] grid-cols-4 gap-3 text-center sm:gap-8">
      {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
        <div key={unit}>
          <dd className={`${styles.countdownNumber} tabular-nums`}>{String(remaining[unit]).padStart(2, "0")}</dd>
          <dt className="mt-2 text-[10px] uppercase tracking-[0.1em]">{unit}</dt>
        </div>
      ))}
    </dl>
  );
}
