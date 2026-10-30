"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowDown } from "lucide-react";
import HeroSlideshow from "../components/HeroSlideshow";
import { useInvitationOpen } from "../components/InvitationState";
import { wedding } from "../data/wedding";
import hero from "../styles/hero.module.css";

export default function HeroSection() {
  const copy = useRef<HTMLDivElement>(null);
  const visible = useInView(copy, { once: true, amount: .15 });
  const opened = useInvitationOpen();

  return (
    <section id="home" aria-labelledby="ea-title" data-hero-revealed={opened ? visible : undefined} className={`${hero.hero} relative isolate flex min-h-[calc(100svh-64px)] items-end overflow-hidden px-6 pb-5 pt-[clamp(1.5rem,12svh,7rem)] text-center md:min-h-[max(790px,calc(100svh-64px))] md:items-center md:justify-center md:px-10 md:py-16 lg:px-16`}>
      <HeroSlideshow />
      <div aria-hidden="true" className={`${hero.shade} pointer-events-none absolute inset-0 z-10`} />
      <div ref={copy} className={`${hero.copy} relative z-20 mx-auto w-full max-w-md md:max-w-2xl lg:max-w-6xl`}>
        <p className={`${hero.eyebrow} ${hero.entrance} mx-auto max-w-xs text-[10px] uppercase leading-6 tracking-[.15em] sm:text-xs`}>TOGETHER WITH OUR FAMILIES WE,</p>
        <h1 id="ea-title" aria-label="Edcel and Apreal" tabIndex={-1} className={`${hero.names} my-4 flex flex-col items-center outline-none md:my-7 lg:flex-row lg:justify-center lg:gap-8 lg:whitespace-nowrap`}>
          <span className={`${hero.name} ${hero.groomName} inline-block`}>Edcel</span><span className={`${hero.connector} ${hero.entrance} my-2 md:my-4 lg:my-0`}>AND</span><span className={`${hero.name} ${hero.brideName} inline-block`}>Apreal</span>
        </h1>
        <p className={`${hero.request} ${hero.entrance} mx-auto max-w-sm text-[10px] uppercase leading-6 tracking-[.1em] sm:text-xs`}>REQUEST THE HONOR OF YOUR PRESENCE AS WE<br className="hidden lg:block" /> UNITE AS ONE IN MARRIAGE.</p>
        <div className={`${hero.ornament} mx-auto my-3 flex items-center justify-center gap-4 md:my-5`} aria-hidden="true"><span className="h-px w-12 bg-current opacity-60" /><span className="text-xs">✦</span><span className="h-px w-12 bg-current opacity-60" /></div>
        <p className={`${hero.date} ${hero.entrance} text-xs uppercase tracking-[.16em] sm:text-sm`}><time dateTime="2026-12-04">{wedding.date.display}</time></p>
        <p className={`${hero.metadata} ${hero.entrance} mx-auto mt-3 max-w-xs pt-3 text-[10px] uppercase tracking-[.14em] md:mt-5 md:pt-4`}>ANTIPOLO CITY, RIZAL</p>
        <a href="#countdown" className={`${hero.scroll} ${hero.entrance} mx-auto mt-3 flex min-h-11 w-fit items-center gap-3 px-4 py-2 text-[10px] uppercase tracking-[.14em] md:mt-5`}>Our forever begins here<ArrowDown size={17} strokeWidth={1} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
