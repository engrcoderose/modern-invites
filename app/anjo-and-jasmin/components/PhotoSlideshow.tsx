"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { usePageVisibility } from "../../jasmin-and-anjo/hooks/usePageVisibility";
import { afterDressCodeSlides as slides } from "../media";

export default function PhotoSlideshow() {
  const section = useRef<HTMLElement>(null);
  const nearViewport = useInView(section, { margin: "400px", once: true });
  const inView = useInView(section, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<string[]>([]);
  const ready = (index: number) => loaded.includes(`background-${index}`) && loaded.includes(`photo-${index}`);
  const playing = inView && pageVisible && !paused && !reducedMotion;

  function markLoaded(key: string) {
    setLoaded(current => current.includes(key) ? current : [...current, key]);
  }

  useEffect(() => {
    if (!playing) return;
    const next = (active + 1) % slides.length;
    if (!loaded.includes(`background-${next}`) || !loaded.includes(`photo-${next}`)) return;
    const timer = window.setTimeout(() => setActive(next), 5000);
    return () => window.clearTimeout(timer);
  }, [active, loaded, playing]);

  return (
    <section ref={section} id="photo-slideshow" aria-label="Anjo and Jasmin photo memories" aria-roledescription="carousel" data-playing={playing} className="relative isolate flex h-[clamp(440px,47vw,900px)] items-center justify-center overflow-hidden bg-[#fbf8f1]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {nearViewport && slides.map((slide, index) => (
          <Image key={slide.alt} src={slide.src} alt="" fill loading="eager" sizes="100vw" onLoad={() => markLoaded(`background-${index}`)} style={{ objectPosition: slide.position }} className={`object-cover transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-[#fbf8f1]/70" />
      </div>

      <div className="relative aspect-video w-[84vw] max-w-[800px] bg-[#e5eadd] sm:w-[65vw] lg:w-[42vw]" aria-live="off">
        {nearViewport && slides.map((slide, index) => (
          <div key={slide.alt} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`} aria-hidden={active !== index} data-active={active === index} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}>
            <Image src={slide.src} alt={slide.alt} fill loading="eager" sizes="(max-width: 639px) 84vw, (max-width: 1023px) 65vw, (max-width: 1904px) 42vw, 800px" onLoad={() => markLoaded(`photo-${index}`)} style={{ objectPosition: slide.position }} className="object-cover" />
          </div>
        ))}
      </div>

      <div role="group" aria-label="Photo memories slideshow controls" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-[#cba4b6]/40 bg-[#fffdf8]/85 px-2 text-[#624451] backdrop-blur-sm sm:bottom-8">
        {slides.map((slide, index) => (
          <button key={slide.alt} type="button" aria-label={`Show memory photograph ${index + 1}`} aria-current={active === index ? "true" : undefined} disabled={!ready(index)} onClick={() => { setActive(index); setPaused(true); }} className="grid h-11 w-9 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#946879] disabled:opacity-30">
            <span className={`h-1.5 rounded-full ${active === index ? "w-5 bg-[#946879]" : "w-1.5 bg-[#946879]/45"}`} />
          </button>
        ))}
        {!reducedMotion && <button type="button" aria-label={paused ? "Play photo memories slideshow" : "Pause photo memories slideshow"} aria-pressed={paused} onClick={() => setPaused(value => !value)} className="ml-1 grid h-11 w-11 place-items-center rounded-full border-l border-[#cba4b6]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#946879]">{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>}
      </div>
    </section>
  );
}
