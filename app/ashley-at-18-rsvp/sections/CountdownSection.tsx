"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import countdownPattern from "../assets/countdown-pattern.webp";
import { celebration } from "../data/event";
import { getTimeRemaining } from "../utilities/countdown";
import styles from "../styles/invitation.module.css";

const units = ["Days", "Hours", "Minutes", "Seconds"];
const target = Date.parse(celebration.dateTime);

export default function CountdownSection() {
  const [remaining, setRemaining] = useState<number[] | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getTimeRemaining(target, Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const arrived = remaining?.every(value => value === 0);

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="relative isolate scroll-mt-[72px] overflow-hidden bg-[#f8d8e4] px-6 py-20 text-[#784156] sm:px-10 sm:py-24">
      <Image src={countdownPattern} alt="" aria-hidden="true" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="countdown-title" data-reveal="heading" className={`${styles.sectionTitle} text-5xl sm:text-7xl`}>{arrived ? "The celebration begins" : "Counting the moments"}</h2>
        <p data-reveal="message" data-reveal-delay="120" className="mt-5 text-sm leading-7">Counting down to {celebration.date} at {celebration.arrival}, Philippine time.</p>
        <dl aria-label="Time until Ashley’s celebration" className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-3 sm:mt-14 sm:gap-8">
          {units.map((unit, index) => (
            <div key={unit} data-reveal="number" data-reveal-delay={(index + 2) * 120} className="flex flex-col gap-3">
              <dt className="text-xs sm:text-sm">{unit}</dt>
              <dd className="-order-1 font-instrumentSerif text-5xl tabular-nums leading-none sm:text-7xl">{remaining ? String(remaining[index]).padStart(2, "0") : "—"}</dd>
            </div>
          ))}
        </dl>
        <noscript><p className="mt-6 text-sm">The celebration begins on {celebration.date} at {celebration.arrival}, Philippine time.</p></noscript>
        <p data-reveal="message" data-reveal-delay="240" className="mt-10 text-xs tracking-[0.08em]">{celebration.hashtag}</p>
      </div>
    </section>
  );
}
