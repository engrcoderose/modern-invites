"use client";
import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { photos } from "../data/photos";
import countdownFlowers from "../assets/artwork/countdown-flowers.png";
import CountdownFlourish from "../components/CountdownFlourish";
import SamplePhoto from "../components/SamplePhoto";
import Reveal from "../components/Reveal";
import styles from "../styles/invitation.module.css";

const target = new Date(wedding.date.iso).getTime();
const botanicalStyle = {
  maskImage: `url("${countdownFlowers.src}")`,
  WebkitMaskImage: `url("${countdownFlowers.src}")`,
  aspectRatio: `${countdownFlowers.width} / ${countdownFlowers.height}`,
};
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
  return <section id="countdown" tabIndex={-1} className={`${styles.countdown} scroll-mt-24 text-center`} aria-labelledby="jg-countdown">
    <div className="relative isolate overflow-hidden px-5 pb-8 pt-10 sm:px-10 sm:pb-12 sm:pt-16 lg:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span style={botanicalStyle} className={`${styles.countdownBotanical} absolute -right-12 top-2 w-28 -rotate-12 opacity-80 sm:-right-12 sm:top-6 sm:w-52`} />
        <span style={botanicalStyle} className={`${styles.countdownBotanical} absolute -left-14 bottom-14 w-28 rotate-[155deg] opacity-80 sm:-left-14 sm:bottom-20 sm:w-52`} />
        <span className={`${styles.countdownArc} absolute -left-20 bottom-0 h-64 w-[calc(100%+160px)] sm:h-96`} />
      </div>
      <div className="mx-auto max-w-4xl">
        <Reveal><h2 id="jg-countdown" className={styles.countdownHeading}>Until we say I do</h2></Reveal>
        <Reveal stagger={false} className="mx-auto mt-2 w-36 sm:w-44"><CountdownFlourish className="w-full" /></Reveal>
        <Reveal className="mt-5 sm:mt-7">
          <p className={styles.countdownNames}>
            <span data-reveal-item className="block">{wedding.couple.groom}</span>
            <span data-reveal-item className={`${styles.countdownAmpersand} block`}>&amp;</span>
            <span data-reveal-item className="block">{wedding.couple.bride}</span>
          </p>
        </Reveal>
      </div>
      <Reveal className="relative mx-auto mt-8 max-w-3xl sm:mt-12">
      <dl className="grid grid-cols-4" aria-label="Wedding countdown">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => <div data-reveal-item key={label} className={`${styles.countdownCell} flex min-w-0 flex-col border-l px-1 first:border-l-0 sm:px-4`}>
          <dt className={`${styles.countdownUnit} order-2 mt-3`}>{label}</dt>
          <dd className={`${styles.countdownNumber} order-1`}>{time ? String(time[index]).padStart(2, "0") : "—"}</dd>
        </div>)}
      </dl>
      </Reveal>
      <time className="sr-only" dateTime={wedding.date.iso}>{wedding.date.day}, {wedding.date.display} · 4:30 PM</time>
    </div>
    <Reveal stagger={false}><div className="relative h-[52vw] min-h-44 max-h-[32rem] sm:h-[36vw]">
      <SamplePhoto src={photos.countdown} alt="A couple silhouetted together against a golden sunset" sizes="100vw" position="center 60%" />
    </div></Reveal>
    <Reveal stagger={false} className="py-3 sm:py-5"><CountdownFlourish className="mx-auto w-52 sm:w-64" /></Reveal>
  </section>;
}
