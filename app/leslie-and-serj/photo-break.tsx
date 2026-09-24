"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageLoaderProps } from "next/image";
import { useIsPresent, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import main1 from "./assets/prenups/Main-1.jpg";
import main2 from "./assets/prenups/Main-2.jpg";
import main3 from "./assets/prenups/Main-3.jpg";
import main4 from "./assets/prenups/Main-4.jpg";
import main5 from "./assets/prenups/Main-5.jpg";
import group1 from "./assets/prenups/Group1 -1.jpg";
import group2 from "./assets/prenups/Group1-2.jpg";
import group3 from "./assets/prenups/Group1-3.jpg";
import group4 from "./assets/prenups/Group1-4.jpg";
import group5 from "./assets/prenups/Group1-5.jpg";

const portraitPhotos = [
  { src: main1, alt: "Leslie and Serj sharing a sunlit embrace", position: "55% center" },
  { src: main2, alt: "Leslie and Serj silhouetted against a warm oval of light", position: "center" },
  { src: main3, alt: "Leslie and Serj smiling at each other in a spotlight", position: "center" },
  { src: main4, alt: "Leslie and Serj posing with their dogs", position: "35% center" },
  { src: main5, alt: "Leslie and Serj sitting together beside an arched mirror", position: "center" },
];
const fullPagePhotos = [
  { src: group1, alt: "Leslie and Serj with their dogs in the kitchen", position: "center 45%" },
  { src: group2, alt: "Leslie and Serj sitting together with their dog", position: "center" },
  { src: group3, alt: "Leslie and Serj sharing a bite at the kitchen counter", position: "48% center" },
  { src: group4, alt: "Leslie and Serj smiling in an embrace", position: "center 35%" },
  { src: group5, alt: "Leslie and Serj laughing together at the kitchen counter", position: "43% center" },
];

const slideInterval = 2000;

// Keep every slide at least full HD, including the wide photos cropped into
// portrait frames. Larger displays can still request the 2048/3840px variants.
function slideshowImageLoader({ src, width, quality }: ImageLoaderProps) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${Math.max(1920, width)}&q=${quality ?? 95}`;
}

export default function PhotoBreak({ fullPage = false }: { fullPage?: boolean }) {
  const photos = fullPage ? fullPagePhotos : portraitPhotos;
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const transitioning = useRef(false);
  const reducedMotion = useReducedMotion();
  const present = useIsPresent();

  useEffect(() => {
    if (reducedMotion) {
      transitioning.current = false;
      setPrevious(null);
    }
  }, [reducedMotion]);

  function showPhoto(index: number) {
    if (index === active || transitioning.current || !loaded.includes(index)) return;
    transitioning.current = !reducedMotion;
    setPrevious(reducedMotion ? null : active);
    setActive(index);
  }

  useEffect(() => {
    if (paused || reducedMotion || !present) return;
    const next = (active + 1) % photos.length;
    if (!loaded.includes(next)) return;
    const timer = window.setInterval(() => {
      if (document.hidden || transitioning.current) return;
      transitioning.current = true;
      setPrevious(active);
      setActive(next);
    }, slideInterval);
    return () => window.clearInterval(timer);
  }, [active, loaded, paused, reducedMotion, present, photos.length]);

  return (
    <div
      className={`lj-photo-break relative !m-0 flex h-full !max-w-none flex-col items-center justify-center overflow-hidden text-[#f2ede0] ${fullPage ? "" : "gap-5 px-8 py-4 lj-mobile:gap-3"}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${fullPage ? "Together" : "Us"} — photo slideshow`}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.stopPropagation();
          event.preventDefault();
          setPaused(true);
          showPhoto((active + (event.key === "ArrowRight" ? 1 : photos.length - 1)) % photos.length);
        }
      }}
    >
      <div className={fullPage ? "absolute inset-0" : "lj-portrait-frame relative my-7 max-w-full shrink-0 aspect-[3/4]"}>
        <div className={`absolute inset-0 isolate overflow-hidden ${fullPage ? "" : "shadow-[0_16px_50px_#0006] ring-1 ring-[#f2ede04d]"}`}>
          {photos.map((photo, index) => (
            <div
              key={photo.src.src}
              className={`lj-photo-slide pointer-events-none absolute inset-0 ${index === active && previous !== null ? "lj-photo-slide-enter" : ""}`}
              // Only the incoming layer animates. The previous image remains
              // opaque until this layer's own fade ends, including at loop wrap.
              style={{
                zIndex: index === active ? 2 : index === previous ? 1 : 0,
                opacity: index === active || index === previous ? 1 : 0,
              }}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget && index === active) {
                  transitioning.current = false;
                  setPrevious(null);
                }
              }}
              aria-hidden={index !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
            >
              <Image
                src={photo.src}
                loader={slideshowImageLoader}
                quality={95}
                alt={photo.alt}
                fill
                loading="eager"
                onLoad={() => setLoaded((current) => current.includes(index) ? current : [...current, index])}
                sizes={fullPage
                  ? `max(100vw, calc(100svh * ${photo.src.width / photo.src.height}))`
                  : `calc(min(747px, calc((100vw - 64px) * 4 / 3), calc(100svh - 300px)) * ${Math.max(0.75, photo.src.width / photo.src.height)})`}
                draggable={false}
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </div>
          ))}
        </div>
        {!fullPage && <h2 className="lj-photo-break-names pointer-events-none absolute inset-0 z-10" aria-label="Leslie and Serj">
          <span className="absolute -left-7 -top-9 lj-mobile:-left-4" aria-hidden="true">Leslie</span>
          <span className="absolute -bottom-9 -right-7 lj-mobile:-right-4" aria-hidden="true">Serj</span>
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
            disabled={!loaded.includes(index)}
            onClick={() => { setPaused(true); showPhoto(index); }}
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
