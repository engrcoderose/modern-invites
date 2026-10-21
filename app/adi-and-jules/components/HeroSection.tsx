"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { usePageVisibility } from "../hooks/usePageVisibility";
import { usePhotoCrossfade } from "../hooks/usePhotoCrossfade";
import { heroSlides } from "../media";
import { wedding } from "../data";
import Monogram from "./Monogram";
import { weddingHeroEnteredEvent } from "../lib/events";
import { useInvitationMotion } from "./motion/InvitationMotion";

const mobileHeroSources = heroSlides.map(slide => getImageProps({
  src: slide.mobilePhoto.src,
  alt: slide.mobilePhoto.alt,
  fill: true,
  quality: 85,
  sizes: slide.mobilePhoto.src.width > slide.mobilePhoto.src.height ? "1300px" : "750px",
}).props);

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.15 });
  const { active: invitationActive } = useInvitationMotion();
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const playing = inView && pageVisible && !reducedMotion;
  const fade = usePhotoCrossfade(heroSlides.length, playing, reducedMotion, 4000);
  const { active, requested } = fade;

  useEffect(() => {
    const section = hero.current;
    if (!invitationActive || !pageVisible || !section) return;
    let observer: IntersectionObserver | undefined;
    const observeHero = () => {
      observer?.disconnect();
      // Start when the hero reaches the upper half of the viewport. Using
      // viewport pixels also supports a hero taller than a landscape screen.
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) window.dispatchEvent(new Event(weddingHeroEnteredEvent));
      }, { rootMargin: `0px 0px -${window.innerHeight / 2}px 0px`, threshold: 0 });
      observer.observe(section);
    };
    observeHero();
    window.addEventListener("resize", observeHero);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeHero);
    };
  }, [invitationActive, pageVisible]);

  return <section id="top" ref={hero} aria-label="Adi and Jules wedding photo slideshow" aria-roledescription="carousel" data-playing={playing} data-visible={inView && pageVisible} className="aj-warm-photo-theme relative isolate flex min-h-[760px] min-h-svh items-center justify-center overflow-hidden bg-[rgb(var(--aj-olive-deep))] px-6 pb-40 pt-28 text-center text-[rgb(var(--aj-ivory))]">
    <div className="absolute inset-0 -z-20" aria-live="off">
      {heroSlides.map((slide, index) => requested.includes(index) && <div key={slide.src.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`} aria-hidden={active !== index} data-active={active === index || fade.previous === index} className="aj-photo-crossfade absolute inset-0" style={fade.style(index)} onTransitionEnd={event => fade.finish(index, event)}>
        <picture>
          <source media="(max-width: 639px)" srcSet={mobileHeroSources[index].srcSet} sizes={mobileHeroSources[index].sizes} />
          <Image src={slide.src} alt={slide.alt} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} quality={85} sizes="100vw" className="hero-photo object-cover [object-position:var(--mobile-photo-position)] sm:[object-position:var(--photo-position)]" style={{ "--photo-position": slide.position, "--mobile-photo-position": slide.mobilePosition } as CSSProperties} onLoad={event => void fade.decode(index, event.currentTarget)} />
        </picture>
      </div>)}
    </div>
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgb(var(--aj-olive-deep))]/45 via-[rgb(var(--aj-olive-deep))]/35 to-[rgb(var(--aj-olive-deep))]/65" />
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <div className="hero-reveal [animation-delay:100ms]"><Monogram className="mx-auto h-24 w-24 sm:h-28 sm:w-28" sizes="112px" light /></div>
      <p className="hero-reveal mt-6 text-xs uppercase tracking-[.4em] [animation-delay:350ms]">The wedding of</p>
      <h1 className="my-8 flex flex-col items-center justify-center gap-2 font-imperial text-[clamp(5rem,10vw,8rem)] leading-[1.05] md:flex-row md:gap-9"><span className="hero-reveal hero-name [animation-delay:600ms]">{wedding.displayGroom}</span><span className="hero-reveal hero-ampersand text-[.5em] text-[rgb(var(--aj-sand))] [animation-delay:1300ms]">&amp;</span><span className="hero-reveal hero-name [animation-delay:1900ms]">{wedding.displayBride}</span></h1>
      <p className="hero-reveal text-base uppercase tracking-[.12em] [animation-delay:2600ms] sm:text-2xl">{wedding.date}</p>
      <p className="hero-reveal mt-4 text-sm [animation-delay:2900ms] sm:text-base">{wedding.time} · {wedding.city}, Philippines</p>
    </div>
    <a href="#countdown" aria-label="Explore the invitation" className="absolute bottom-6 left-1/2 z-10 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-white/70 pt-2"><span className="hero-scroll-cue h-2 w-1 rounded-full bg-white" /></a>
  </section>;
}

