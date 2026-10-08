"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { getCountdown } from "../utils/countdown";
import styles from "../styles/wedding.module.css";

export default function Countdown() {
  const [remaining, setRemaining] = useState<number[] | null>(null);
  useEffect(() => {
    const update = () => {
      setRemaining(getCountdown(wedding.ceremonyISO, Date.now()));
      return Date.now() >= Date.parse(wedding.ceremonyISO);
    };
    if (update()) return;
    const interval = window.setInterval(() => { if (update()) window.clearInterval(interval); }, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <div role="timer" aria-label="Countdown to Ryan and Anne’s wedding ceremony" aria-live="off" className="mx-auto mt-8 grid max-w-xl grid-cols-4">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
        <div data-reveal key={label} className="border-r border-[#d1b788]/25 px-2 last:border-0 sm:px-6">
          <span className={`${styles.countdownNumber} block`}>{remaining ? String(remaining[index]).padStart(2, "0") : "—"}</span>
          <span className={`${styles.countdownLabel} mt-3 block`}>{label}</span>
        </div>
      ))}
    </div>
  );
}
