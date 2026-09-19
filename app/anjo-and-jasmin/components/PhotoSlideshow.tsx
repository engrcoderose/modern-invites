"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { usePageVisibility } from "../../joshua-and-bea/hooks/usePageVisibility";
import { afterDressCodeSlides as slides } from "../media";

export default function PhotoSlideshow() {
  const section = useRef<HTMLElement>(null);
  const nearViewport = useInView(section, { margin: "400px", once: true });
  const inView = useInView(section, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState([0]);
  const [loaded, setLoaded] = useState<string[]>([]);

  const playing = inView && pageVisible && !reducedMotion;
  const next = (active + 1) % slides.length;
  const activeReady = loaded.includes(`background-${active}`) && loaded.includes(`photo-${active}`);
  const nextReady = loaded.includes(`background-${next}`) && loaded.includes(`photo-${next}`);

  useEffect(() => {
    if (!playing || !activeReady) return;
    setRequested(current => current.includes(next) ? current : [...current, next]);
  }, [activeReady, next, playing]);

  function markLoaded(key: string) {
    setLoaded(current => current.includes(key) ? current : [...current, key]);
  }

  useEffect(() => {
    if (!playing || !nextReady) return;
    const timer = window.setTimeout(() => setActive(next), 3500);
    return () => window.clearTimeout(timer);
  }, [next, nextReady, playing]);

  return (
    <section ref={section} id="photo-slideshow" aria-label="Anjo and Jasmin photo memories" aria-roledescription="carousel" data-playing={playing} className="relative isolate flex h-[clamp(440px,47vw,900px)] items-center justify-center overflow-hidden bg-[#fbf8f1]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {nearViewport && slides.map((slide, index) => requested.includes(index) && (
          <Image key={slide.alt} src={slide.src} alt="" fill loading="eager" sizes="100vw" onLoad={() => markLoaded(`background-${index}`)} style={{ objectPosition: slide.position }} className={`object-cover transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-[#fbf8f1]/70" />
      </div>

      <div className="relative aspect-video w-[84vw] max-w-[800px] bg-[#e5eadd] sm:w-[65vw] lg:w-[42vw]" aria-live="off">
        {nearViewport && slides.map((slide, index) => requested.includes(index) && (
          <div key={slide.alt} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`} aria-hidden={active !== index} data-active={active === index} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}>
            <Image src={slide.src} alt={slide.alt} fill loading="eager" sizes="(max-width: 639px) 84vw, (max-width: 1023px) 65vw, (max-width: 1904px) 42vw, 800px" onLoad={() => markLoaded(`photo-${index}`)} style={{ objectPosition: slide.position }} className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
