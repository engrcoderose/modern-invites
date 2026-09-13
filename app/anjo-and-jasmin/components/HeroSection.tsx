"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { usePageVisibility } from "../../jasmin-and-anjo/hooks/usePageVisibility";
import { heroSlides } from "../media";
import Flowers from "../../jasmin-and-anjo/assets/images/designs/down-flowers.png";
import { wedding } from "../data";

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<number[]>([]);
  const playing = inView && pageVisible && !paused && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    // Advance only to a decoded photo, so a slow image never leaves a blank hero.
    const next = Array.from({ length: heroSlides.length - 1 }, (_, i) => (active + i + 1) % heroSlides.length).find(index => loaded.includes(index));
    if (next === undefined) return;
    const timer = window.setTimeout(() => setActive(next), 5000);
    return () => window.clearTimeout(timer);
  }, [active, loaded, playing]);

  return <section id="top" ref={hero} aria-label="Anjo and Jasmin wedding photo slideshow" aria-roledescription="carousel" data-playing={playing} data-visible={inView && pageVisible} className="relative isolate flex min-h-[760px] min-h-svh items-center justify-center overflow-hidden bg-[#263d35] px-6 pb-40 pt-28 text-center text-[#fff4f8]">
    <div className="absolute inset-0 -z-20" aria-live="off">
      {heroSlides.map((slide, index) => <div key={slide.src.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`} aria-hidden={active !== index} data-active={active === index} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}>
        <Image src={slide.src} alt={slide.alt} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} quality={85} sizes="100vw" className="hero-photo object-cover [object-position:var(--photo-position)] max-sm:[object-position:var(--mobile-photo-position)]" style={{ "--photo-position": slide.position, "--mobile-photo-position": slide.mobilePosition } as CSSProperties} onLoad={() => setLoaded(current => current.includes(index) ? current : [...current, index])} />
      </div>)}
    </div>
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#263d35]/45 via-[#263d35]/35 to-[#263d35]/65" />
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <p className="hero-reveal font-imperial text-6xl [animation-delay:100ms] sm:text-7xl" aria-label="Anjo and Jasmin initials">A &amp; J</p>
      <p className="hero-reveal mt-6 text-xs uppercase tracking-[.4em] [animation-delay:350ms]">The wedding of</p>
      <h1 className="my-8 flex flex-col items-center justify-center gap-2 font-imperial text-[clamp(5rem,10vw,8rem)] leading-[1.05] md:flex-row md:gap-9"><span className="hero-reveal hero-name [animation-delay:400ms]">Anjo</span><span className="hero-reveal hero-ampersand text-[.5em] text-[#f3c3cf] [animation-delay:850ms]">&amp;</span><span className="hero-reveal hero-name [animation-delay:1200ms]">Jasmin</span></h1>
      <p className="hero-reveal text-base uppercase tracking-[.12em] [animation-delay:1600ms] sm:text-2xl">{wedding.date}</p>
      <p className="hero-reveal mt-4 text-sm [animation-delay:1800ms] sm:text-base">{wedding.time} · Malabon, Philippines</p>
      <a href="#rsvp" className="hero-reveal [animation-delay:2000ms] mt-8 inline-flex min-h-11 items-center rounded-md bg-[#f3c3cf] px-9 py-3 text-sm tracking-wide text-[#624451] transition hover:bg-[#f8edf0]">RSVP</a>
    </div>
    <Image src={Flowers} alt="" aria-hidden="true" fill sizes="100vw" className="pointer-events-none object-contain object-bottom opacity-40" />
    <div role="group" aria-label="Hero slideshow controls" className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full border border-white/20 bg-[#263d35]/70 px-2 text-white backdrop-blur-sm sm:bottom-20">
      {heroSlides.map((slide, index) => <button key={slide.src.src} type="button" aria-label={`Show hero photograph ${index + 1}`} aria-current={active === index ? "true" : undefined} disabled={!loaded.includes(index)} onClick={() => { setActive(index); setPaused(true); }} className="grid h-11 w-9 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f3c3cf] disabled:opacity-30 sm:w-11"><span className={`h-1.5 rounded-full ${active === index ? "w-5 bg-[#f3c3cf]" : "w-1.5 bg-white/70"}`} /></button>)}
      {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"} className="ml-1 grid h-11 w-11 place-items-center rounded-full border-l border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f3c3cf]">{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>}
    </div>
    <a href="#countdown" aria-label="Explore the invitation" className="absolute bottom-6 left-1/2 z-10 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-white/70 pt-2"><span className="hero-scroll-cue h-2 w-1 rounded-full bg-white" /></a>
  </section>;
}

