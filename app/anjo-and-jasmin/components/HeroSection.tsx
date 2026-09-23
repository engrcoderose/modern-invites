"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { usePageVisibility } from "../hooks/usePageVisibility";
import { heroSlides } from "../media";
import { wedding } from "../data";
import Monogram from "./Monogram";

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const playing = inView && pageVisible && !reducedMotion;
  const next = (active + 1) % heroSlides.length;
  const activeReady = loaded.includes(active);
  const nextReady = loaded.includes(next);

  useEffect(() => {
    if (!playing || !activeReady) return;
    setRequested(current => current.includes(next) ? current : [...current, next]);
  }, [activeReady, next, playing]);

  useEffect(() => {
    if (!playing || !nextReady) return;
    const timer = window.setTimeout(() => setActive(next), 5000);
    return () => window.clearTimeout(timer);
  }, [next, nextReady, playing]);

  return <section id="top" ref={hero} aria-label="Anjo and Jasmin wedding photo slideshow" aria-roledescription="carousel" data-playing={playing} data-visible={inView && pageVisible} className="relative isolate flex min-h-[760px] min-h-svh items-center justify-center overflow-hidden bg-[rgb(var(--aj-olive-deep))] px-6 pb-40 pt-28 text-center text-[rgb(var(--aj-ivory))]">
    <div className="absolute inset-0 -z-20" aria-live="off">
      {heroSlides.map((slide, index) => requested.includes(index) && <div key={slide.src.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`} aria-hidden={active !== index} data-active={active === index} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}>
        <Image src={slide.src} alt={slide.alt} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} quality={85} sizes="100vw" className="hero-photo object-cover [object-position:var(--photo-position)] max-sm:[object-position:var(--mobile-photo-position)]" style={{ "--photo-position": slide.position, "--mobile-photo-position": slide.mobilePosition } as CSSProperties} onLoad={() => setLoaded(current => current.includes(index) ? current : [...current, index])} />
      </div>)}
    </div>
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgb(var(--aj-olive-deep))]/45 via-[rgb(var(--aj-olive-deep))]/35 to-[rgb(var(--aj-olive-deep))]/65" />
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <div className="hero-reveal [animation-delay:100ms]"><Monogram className="mx-auto h-24 w-24 sm:h-28 sm:w-28" sizes="112px" light /></div>
      <p className="hero-reveal mt-6 text-xs uppercase tracking-[.4em] [animation-delay:350ms]">The wedding of</p>
      <h1 className="my-8 flex flex-col items-center justify-center gap-2 font-imperial text-[clamp(5rem,10vw,8rem)] leading-[1.05] md:flex-row md:gap-9"><span className="hero-reveal hero-name [animation-delay:400ms]">Anjo</span><span className="hero-reveal hero-ampersand text-[.5em] text-[rgb(var(--aj-sand))] [animation-delay:850ms]">&amp;</span><span className="hero-reveal hero-name [animation-delay:1200ms]">Jasmin</span></h1>
      <p className="hero-reveal text-base uppercase tracking-[.12em] [animation-delay:1600ms] sm:text-2xl">{wedding.date}</p>
      <p className="hero-reveal mt-4 text-sm [animation-delay:1800ms] sm:text-base">{wedding.time} · Malabon, Philippines</p>
      <p className="hero-reveal mt-8 text-sm tracking-wide text-[rgb(var(--aj-ivory))] [animation-delay:2000ms]">Scroll down for RSVP</p>
    </div>
    <a href="#countdown" aria-label="Explore the invitation" className="absolute bottom-6 left-1/2 z-10 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-white/70 pt-2"><span className="hero-scroll-cue h-2 w-1 rounded-full bg-white" /></a>
  </section>;
}

