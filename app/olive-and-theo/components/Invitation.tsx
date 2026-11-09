"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveRight, Sprout } from "lucide-react";
import { event } from "../data/event";
import Hero from "../sections/Hero";
import Celebration from "../sections/Celebration";
import Countdown from "../sections/Countdown";
import Rsvp from "../sections/Rsvp";
import styles from "../styles/invitation.module.css";

export default function Invitation() {
  const [phase, setPhase] = useState<"closed" | "opening" | "revealing" | "open">("closed");
  const destination = useRef<HTMLAnchorElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (phase === "open") destination.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (phase === "closed" || phase === "open") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) setPhase("open"); };
    preference.addEventListener("change", finish);
    return () => preference.removeEventListener("change", finish);
  }, [phase]);

  function open() {
    if (started.current) return;
    started.current = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "open" : "opening");
  }

  return (
    <div className={`${styles.invitation} min-h-screen`}>
      {phase !== "open" && <div className={`${styles.cover} fixed inset-0 z-50 flex min-h-svh flex-col items-center justify-center overflow-y-auto px-6 py-12 text-center ${phase === "revealing" ? styles.coverRevealing : ""}`}
        onAnimationEnd={e => { if (e.target === e.currentTarget && e.animationName.includes("handoff")) setPhase("open"); }}>
        <div className={`flex flex-col items-center ${phase === "opening" || phase === "revealing" ? styles.coverOpening : ""}`}
          onAnimationEnd={e => { if (e.target === e.currentTarget && e.animationName.includes("unfold") && phase === "opening") setPhase("revealing"); }}>
        <Sprout size={38} strokeWidth={1} aria-hidden="true" className="mb-10" />
        <h1 className={`${styles.coverTitle} my-7`}>For all the days<br /><em>to come.</em></h1>
        <p className={`${styles.display} text-3xl`}>{event.names}</p>
        <p className="mt-3 text-xs tracking-[0.12em]">{event.shortDate}</p>
        <button type="button" onClick={open} disabled={phase !== "closed"} className={`${styles.coverButton} mt-10 inline-flex min-h-12 items-center gap-7 rounded-full px-7 py-4 text-sm disabled:cursor-wait`}>Open our invitation<MoveRight size={18} aria-hidden="true" /></button>
        </div>
      </div>}

      <div className={phase === "revealing" || phase === "open" ? styles.entered : undefined} inert={phase !== "open"} aria-hidden={phase !== "open"} style={{ visibility: phase === "revealing" || phase === "open" ? "visible" : "hidden", height: phase === "closed" || phase === "opening" ? "100svh" : undefined, overflow: phase === "closed" || phase === "opening" ? "hidden" : undefined }}>
        <a className={styles.skipLink} href="#celebration">Skip to celebration details</a>
        <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-6 py-5 md:px-12 lg:px-20">
          <a ref={destination} href="#home" aria-label="Olive and Theo, back to the beginning" className={`${styles.display} text-3xl`}>o<span className="mx-1 text-lg italic">&</span>t</a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-xs sm:gap-8">
            <a href="#celebration" className="hidden py-3 sm:inline-block">The celebration</a>
            <a href="#countdown" className="hidden py-3 md:inline-block">Countdown</a>
            <a href="#rsvp" className={`${styles.navReply} inline-flex min-h-11 items-center gap-4 rounded-full px-5 py-3`}>Kindly RSVP<ArrowUpRight size={15} aria-hidden="true" /></a>
          </nav>
        </header>
        <main>
          <Hero />
          <Celebration />
          <Countdown />
          <Rsvp />
        </main>
        <footer className="mx-auto max-w-[1280px] px-6 pb-8 pt-14 md:px-12">
          <div className="flex flex-col justify-between gap-8 border-b border-[var(--ot-line)] pb-10 sm:flex-row sm:items-end">
            <div><p className={`${styles.display} text-5xl`}>{event.names}</p><p className="mt-3 text-xs">{event.shortDate} · {event.location}</p></div>
            <p className={`${styles.display} text-2xl italic`}>With you, it’s a celebration.</p>
          </div>
          <div className="flex flex-wrap justify-between gap-3 pt-6 text-[11px] leading-5 text-[var(--ot-muted)]"><p>Designed by Modern Invites</p><a className="underline underline-offset-4" href="#home">Back to the beginning</a></div>
        </footer>
      </div>
    </div>
  );
}
