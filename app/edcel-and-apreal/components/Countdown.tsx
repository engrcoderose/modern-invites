"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import styles from "../styles/countdown.module.css";

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(wedding.date.iso).getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (remaining === 0) return <p className="text-center text-xl">Our forever has begun.</p>;
  const seconds = remaining === null ? null : Math.floor(remaining / 1000);
  const values = [
    { label: "Days", value: seconds === null ? null : Math.floor(seconds / 86400) },
    { label: "Hours", value: seconds === null ? null : Math.floor(seconds / 3600) % 24 },
    { label: "Minutes", value: seconds === null ? null : Math.floor(seconds / 60) % 60 },
    { label: "Seconds", value: seconds === null ? null : seconds % 60 },
  ];
  return <div role="timer" aria-live="off" aria-label="Time until our wedding ceremony" className="mx-auto grid max-w-3xl grid-cols-4 text-center">
    {values.map(({ label, value }) => <div key={label} data-reveal="timer" className={`${styles.unit} relative px-1 sm:px-3`}>
      <span className={`${styles.number} block`}>{value === null ? "—" : String(value).padStart(2, "0")}</span>
      <span className={`${styles.label} mt-3 block text-[11px] sm:text-base`}>{label}</span>
    </div>)}
  </div>;
}
