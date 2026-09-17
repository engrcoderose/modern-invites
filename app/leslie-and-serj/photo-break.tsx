"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useIsPresent, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import firstPhoto from "./assets/prenups/1.jpg";
import secondPhoto from "./assets/prenups/3.jpg";
import thirdPhoto from "./assets/prenups/5.jpg";
import gardenPhoto from "./assets/prenups/warm romatic cinematic couple photos inspiration filoli gardens_.jpg";
import meadowPhoto from "./assets/prenups/Engagement photos 🤍.jpg";
import forestPhoto from "./assets/prenups/It’s a dream 💫.jpg";

const portraitPhotos = [
  { src: firstPhoto, alt: "A couple holding hands in a woodland clearing", position: "57% center" },
  { src: secondPhoto, alt: "A couple running together through a mountain meadow", position: "center" },
  { src: thirdPhoto, alt: "A couple walking hand in hand at sunset", position: "20% center" },
];
const fullPagePhotos = [
  { src: gardenPhoto, alt: "A couple holding hands among garden flowers", position: "center" },
  { src: meadowPhoto, alt: "A couple lying together in the grass", position: "43% center" },
  { src: forestPhoto, alt: "A couple walking hand in hand along a woodland path", position: "center" },
];

export default function PhotoBreak({ fullPage = false }: { fullPage?: boolean }) {
  const photos = fullPage ? fullPagePhotos : portraitPhotos;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const present = useIsPresent();

  useEffect(() => {
    if (paused || reducedMotion || !present) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % photos.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, present, photos.length]);

  return (
    <div
      className={`lj-photo-break relative !m-0 flex h-full !max-w-none flex-col items-center justify-center overflow-hidden text-[#f2ede0] ${fullPage ? "" : "gap-5 px-8 py-6 lj-mobile:gap-3 lj-mobile:px-6"}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${fullPage ? "Together" : "A little of us"} — photo slideshow`}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.stopPropagation();
          event.preventDefault();
          setPaused(true);
          setActive((index) => (index + (event.key === "ArrowRight" ? 1 : photos.length - 1)) % photos.length);
        }
      }}
    >
      {!fullPage && <p className="lj-label relative z-10 tracking-[0.22em]">A little of us</p>}
      <div className={fullPage ? "absolute inset-0" : "relative my-7 h-[clamp(200px,calc(100svh-360px),360px)] max-w-full shrink-0 aspect-[3/4]"}>
        <div className={`absolute inset-0 overflow-hidden ${fullPage ? "" : "shadow-[0_16px_50px_#0006] ring-1 ring-[#f2ede04d]"}`}>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: index === active ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.4 }}
              aria-hidden={index !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={fullPage ? "100vw" : "270px"}
                draggable={false}
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </motion.div>
          ))}
        </div>
        {!fullPage && <h2 className="lj-photo-break-names pointer-events-none absolute inset-0 z-10" aria-label="Leslie and Serj">
          <span className="absolute -left-7 -top-9" aria-hidden="true">Leslie</span>
          <span className="absolute -bottom-9 -right-7" aria-hidden="true">&amp; Serj</span>
        </h2>}
      </div>
      <div className={`${fullPage ? "absolute bottom-[calc(86px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 rounded-full border border-[#f2ede026] bg-[#17201599] px-2 backdrop-blur-sm" : "relative"} z-10 flex items-center justify-center`} aria-label="Slideshow controls">
        {photos.map((photo, index) => (
          <button
            key={photo.src.src}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full"
            aria-label={`Show photo ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => { setPaused(true); setActive(index); }}
          >
            <span className={`h-1.5 rounded-full transition-[width,background-color] motion-reduce:transition-none ${index === active ? "w-5 bg-[#f2ede0]" : "w-1.5 bg-[#f2ede066]"}`} />
          </button>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            data-slideshow-playback
            className="sr-only focus:not-sr-only focus:absolute focus:left-full focus:flex focus:h-11 focus:w-11 focus:items-center focus:justify-center focus:rounded-full"
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
