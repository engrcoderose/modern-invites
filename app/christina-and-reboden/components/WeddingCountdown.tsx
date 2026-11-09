"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { getCountdown } from "../utilities/countdown";
import styles from "../styles/invitation.module.css";

const units = [["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"]] as const;

export default function WeddingCountdown({ enabled }: { enabled: boolean }) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getCountdown> | null>(null);

  useEffect(() => {
    const target = Date.parse(wedding.ceremonyISO);
    let interval: number | undefined;
    function update() {
      const next = getCountdown(target, Date.now());
      setRemaining(next);
      if (next.complete) window.clearInterval(interval);
      return next.complete;
    }
    function sync() {
      window.clearInterval(interval);
      interval = undefined;
      if (!update() && enabled && !document.hidden) interval = window.setInterval(update, 1000);
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", sync); };
  }, [enabled]);

  return <div data-cr-reveal role="timer" aria-live="off" aria-label={`Countdown to ${wedding.date}, 3:00 PM Philippine time`} className="h-11 w-full max-w-xs shrink-0 text-center">
    {remaining?.complete ? <p role="status" aria-live="polite" className="flex h-full items-center justify-center text-sm italic">Our forever has begun.</p> : <dl className="grid grid-cols-4 gap-3">
      {units.map(([key, label]) => <div key={key} className="flex min-w-0 flex-col items-center gap-1">
        <dt className="order-2 font-sans text-[9px] uppercase leading-3 tracking-[.1em]">{label}</dt>
        <dd className={`${styles.countdownValue} order-1`}>{remaining ? String(remaining[key]).padStart(2, "0") : "—"}</dd>
      </div>)}
    </dl>}
  </div>;
}
