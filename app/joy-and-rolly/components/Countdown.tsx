"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

function timeRemaining() { return Math.max(0, new Date(wedding.date.iso).getTime() - Date.now()); }

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    let interval: number | undefined;
    function syncClock() {
      window.clearInterval(interval);
      setRemaining(timeRemaining());
      if (!document.hidden) interval = window.setInterval(() => setRemaining(timeRemaining()), 1000);
    }
    syncClock();
    document.addEventListener("visibilitychange", syncClock);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", syncClock);
    };
  }, []);
  const units = [
    ["Days", remaining === null ? "—" : Math.floor(remaining / 86_400_000)],
    ["Hours", remaining === null ? "—" : Math.floor(remaining / 3_600_000) % 24],
    ["Minutes", remaining === null ? "—" : Math.floor(remaining / 60_000) % 60],
    ["Seconds", remaining === null ? "—" : Math.floor(remaining / 1000) % 60],
  ] as const;
  return <div className={styles.countdownClock} role="timer" aria-live="off" aria-label={`Countdown to ${wedding.date.display}, at 3 PM Philippine time`}>
    {remaining === 0 ? <p className={`${styles.serif} text-3xl`}>Our forever has begun.</p> :
      <dl className={`${styles.countdownGrid} mx-auto grid w-full max-w-4xl gap-y-6`}>
        {units.map(([label, value], index) => <div key={label} className="flex min-w-0 flex-col">
          <dt className={`${styles.countdownLabel} order-2 mt-2`}>{label}</dt>
          <dd className={`${styles.countdownNumber} relative order-1 tabular-nums`}>
            {typeof value === "number" ? String(value).padStart(2, "0") : value}
            {index < units.length - 1 && <span aria-hidden="true" className={`${styles.countdownColon} absolute right-0 top-0 translate-x-1/2`}>:</span>}
          </dd>
        </div>)}
      </dl>}
  </div>;
}
