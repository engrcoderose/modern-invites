"use client";

import { useEffect, useState } from "react";
import FloralArtwork from "./FloralArtwork";
import ParallaxLayer from "./ParallaxLayer";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const units = ["days", "hours", "minutes", "seconds"] as const;
const unitDurations = [86_400_000, 3_600_000, 60_000, 1_000];
function timeRemaining() {
  const difference = Math.max(0, Date.parse(wedding.date.iso) - Date.now());
  return unitDurations.map((duration, index) => Math.floor(difference / duration) % (index === 0 ? Infinity : index === 1 ? 24 : 60));
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<number[] | null>(null);
  useEffect(() => {
    const update = () => setRemaining(timeRemaining());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="countdown" aria-labelledby="mi-countdown-title" className={`${styles.countdownPaper} relative isolate overflow-hidden px-6 py-16 sm:px-10 sm:py-20`}>
      <ParallaxLayer reverse overscan className="-z-10">
        <FloralArtwork reveal name="venueUpper" className="absolute inset-0 h-full w-full object-cover opacity-40" sizes="100vw" />
      </ParallaxLayer>
      <ParallaxLayer className="-z-10">
        <FloralArtwork reveal name="countdownLeft" className="absolute bottom-5 left-0 h-auto w-[19%] max-w-[180px] -translate-x-1/4" sizes="(min-width: 948px) 180px, 19vw" />
        <FloralArtwork reveal name="countdownRight" className="absolute bottom-5 right-0 h-auto w-[19%] max-w-[180px] translate-x-1/4" sizes="(min-width: 948px) 180px, 19vw" />
      </ParallaxLayer>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:gap-8">
        <h2 data-reveal="heading" id="mi-countdown-title" className={styles.heading}>{remaining?.every(value => value === 0) ? "Our wedding day has arrived" : "Counting down to forever"}</h2>
        <dl aria-label="Time until the ceremony" className="grid w-full max-w-xl grid-cols-4 gap-3 sm:gap-7">
          {units.map((unit, index) => <div data-reveal="text" data-reveal-delay={index * 0.05} key={unit} className="flex flex-col"><dt className={`${styles.serifDetail} mt-2 text-xs capitalize sm:text-sm`}>{unit}</dt><dd className={`${styles.countNumber} -order-1`} suppressHydrationWarning>{remaining ? String(remaining[index]).padStart(2, "0") : "—"}</dd></div>)}
        </dl>
        <noscript><p className="text-sm">Our wedding is on {wedding.date.display} at 4:00 PM.</p></noscript>
      </div>
    </section>
  );
}
