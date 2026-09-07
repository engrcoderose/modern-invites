"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { invitationOpenedEvent } from "../lib/events";
import Flowers from "../assets/images/designs/down-flowers.png";
import Walking from "../assets/images/prenup/pexels-king-caplis-471600979-36396110.jpg";
import Together from "../assets/images/prenup/pexels-king-caplis-471600979-36266073.jpg";
import Garden from "../assets/images/prenup/pexels-king-caplis-471600979-36266077.jpg";
import Sitting from "../assets/images/prenup/pexels-king-caplis-471600979-36396114.jpg";
import Embrace from "../assets/images/prenup/pexels-king-caplis-471600979-36266135.jpg";

interface HeroSlide {
  src: StaticImageData;
  alt: string;
  position: string;
  mobilePosition: string;
}

const slides: HeroSlide[] = [
  { src: Walking, alt: "Anjo and Jasmin walking hand in hand in the garden", position: "50% 45%", mobilePosition: "50% 45%" },
  { src: Together, alt: "Anjo and Jasmin leaning together on a garden bench", position: "50% 48%", mobilePosition: "50% 48%" },
  { src: Garden, alt: "Anjo and Jasmin sharing a playful moment in the garden", position: "50% 48%", mobilePosition: "50% 48%" },
  { src: Sitting, alt: "Anjo and Jasmin sitting together among the greenery", position: "50% 45%", mobilePosition: "50% 45%" },
  { src: Embrace, alt: "Anjo and Jasmin embracing in the garden", position: "50% 48%", mobilePosition: "82% 48%" },
];

interface HeroSectionProps {
  bride: string;
  groom: string;
  dateDisplay: string;
  location: string;
}

export default function HeroSection({ bride, groom, dateDisplay, location }: HeroSectionProps) {
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [loaded, setLoaded] = useState<number[]>([]);
  const playing = opened && inView && pageVisible && !paused && !reduceMotion;

  useEffect(() => {
    const open = () => setOpened(true);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    window.addEventListener(invitationOpenedEvent, open);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      window.removeEventListener(invitationOpenedEvent, open);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const next = (active + 1) % slides.length;
    if (!playing || !loaded.includes(next)) return;
    const timer = window.setTimeout(() => setActive(next), 3500);
    return () => window.clearTimeout(timer);
  }, [active, loaded, playing]);

  return (
    <section
      id="top"
      ref={hero}
      aria-label="Anjo and Jasmin wedding photo slideshow"
      aria-roledescription="carousel"
      className="garden-hero relative isolate overflow-hidden bg-[#263d35] text-[#ffe1ee]"
      data-opened={opened}
      data-playing={playing}
    >
      <div className="absolute inset-0" aria-live="off">
        {slides.map((slide, index) => (
          <div
            key={slide.src.src}
            className="garden-hero-slide absolute inset-0 overflow-hidden"
            data-active={active === index}
            aria-hidden={active !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              loading="eager"
              quality={85}
              sizes="100vw"
              className="garden-hero-photo object-cover"
              style={{ "--photo-position": slide.position, "--phone-photo-position": slide.mobilePosition } as CSSProperties}
              onLoad={() => setLoaded(current => current.includes(index) ? current : [...current, index])}
            />
          </div>
        ))}
      </div>
      <div className="garden-hero-wash pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="garden-hero-copy relative z-10 flex flex-col items-center px-6 text-center">
        <div className="garden-hero-reveal relative flex flex-col items-center max-[600px]:-top-3">
          <svg viewBox="0 0 420 90" className="w-[min(70vw,420px)] overflow-visible" aria-label="The wedding" role="img">
            <defs>
              <path id="garden-wedding-arc" d="M 25 75 Q 210 -5 395 75" />
            </defs>
            <text fill="currentColor" className="font-libreBaskerville text-[29px] uppercase tracking-[.28em]">
              <textPath href="#garden-wedding-arc" startOffset="50%" textAnchor="middle">The wedding</textPath>
            </text>
          </svg>
          <span className="font-imperial text-[clamp(30px,3.5vw,44px)] leading-none">of</span>
        </div>
        <h1 className="garden-hero-names garden-hero-reveal my-6 flex items-baseline justify-center gap-[.16em] whitespace-nowrap [font-family:var(--font-mea-culpa),cursive] text-[clamp(80px,12.5vw,185px)] font-normal not-italic leading-[1.1] sm:my-8" aria-label={`${groom} and ${bride}`}>
          <span>{groom}</span><span className="text-[.8em]">&amp;</span><span>{bride}</span>
        </h1>
        <p className="garden-hero-details garden-hero-reveal max-w-[90vw] font-sans text-[clamp(13px,1.65vw,21px)] leading-relaxed tracking-[.025em]">
          <span className="block sm:inline">{dateDisplay}</span>
          <span className="hidden sm:inline"> · </span>
          <span>{location}</span>
        </p>
      </div>

      <div className="garden-hero-flowers pointer-events-none absolute inset-x-0 bottom-0 z-[5] opacity-[.65]" aria-hidden="true">
        <Image src={Flowers} alt="" fill sizes="100vw" className="object-fill" />
      </div>

      <div className="absolute bottom-20 left-1/2 z-20 sm:bottom-4 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#263d35]/55 px-2 py-1 text-[#fff4f8] backdrop-blur-sm" aria-label="Slideshow controls">
        {slides.map((slide, index) => (
          <button
            key={slide.src.src}
            type="button"
            aria-label={`Show photograph ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => setActive(index)}
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span className={`h-1.5 rounded-full transition-[width,opacity] duration-500 ${active === index ? "w-5 bg-[#ffe1ee]" : "w-1.5 bg-white/60"}`} />
          </button>
        ))}
        {!reduceMotion && (
          <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"} className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border-l border-white/20">
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </section>
  );
}
