"use client";
import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import Reveal from "../components/Reveal";
import styles from "../styles/invitation.module.css";

const target = new Date(wedding.date.iso).getTime();
function remaining() {
  const difference = Math.max(0, target - Date.now());
  return [Math.floor(difference / 86400000), Math.floor(difference / 3600000) % 24, Math.floor(difference / 60000) % 60, Math.floor(difference / 1000) % 60];
}
export default function CountdownSection() {
  const [time, setTime] = useState<number[] | null>(null);
  useEffect(() => {
    const update = () => { if (!document.hidden) setTime(remaining()); };
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <section className={`${styles.countdown} px-6 py-20 text-center sm:px-10 sm:py-24`} aria-labelledby="jg-countdown">
    <Reveal><h2 id="jg-countdown" className={styles.subheading}>Until we say “I do”</h2><p className={`${styles.signature} mt-4`}>{wedding.couple.groom}<br className="sm:hidden" /> & {wedding.couple.bride}</p></Reveal>
    <div className={`${styles.countdownGrid} mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-px sm:grid-cols-4`} aria-label="Wedding countdown">{["Days", "Hours", "Minutes", "Seconds"].map((label, index) => <div key={label} className={`${styles.countdownCell} px-3 py-7 sm:py-9`}><span className={styles.countdownNumber}>{time ? String(time[index]).padStart(2, "0") : "—"}</span><span className={`${styles.smallText} mt-3 block`}>{label}</span></div>)}</div>
    <p className={`${styles.smallText} mt-8`}>{wedding.date.day}, {wedding.date.display} · 4:30 PM</p>
  </section>;
}
