"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useIsPresent, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { portraitPhotos, fullPagePhotos } from "../data/media";
import { wedding } from "../data";

const slideInterval = 2000;

export default function PhotoBreak({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
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
    if (index === active || transitioning.current || !loaded.includes(index))
      return;
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
      className={`vg-photo-break relative !m-0 flex h-full !max-w-none flex-col items-center justify-center overflow-hidden text-[#f2ede0] ${fullPage ? "" : "gap-5 px-8 py-4 [@media(max-width:700px)]:gap-3"}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${fullPage ? "Together" : "Us"} — photo slideshow`}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-slideshow-playback]"))
          setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.stopPropagation();
          event.preventDefault();
          setPaused(true);
          showPhoto(
            (active + (event.key === "ArrowRight" ? 1 : photos.length - 1)) %
              photos.length,
          );
        }
      }}
    >
      {/* Cap the mobile crop at 3:5 so both people fit in the wide Together photos. */}
      <div
        className={
          fullPage
            ? "absolute inset-x-0 top-1/2 h-full -translate-y-1/2 [@media(max-width:700px)]:max-h-[166.667vw]"
            : "vg-portrait-frame relative my-7 max-w-full shrink-0 aspect-[3/4]"
        }
      >
        <div
          className={`absolute inset-0 isolate overflow-hidden ${fullPage ? "" : "shadow-[0_16px_50px_#0006] ring-1 ring-[#f2ede04d]"}`}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.src.src}
              className={`vg-photo-slide pointer-events-none absolute inset-0 ${index === active && previous !== null ? "vg-photo-slide-enter" : ""}`}
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
                quality={85}
                alt={photo.alt}
                fill
                loading="eager"
                onLoad={() =>
                  setLoaded((current) =>
                    current.includes(index) ? current : [...current, index],
                  )
                }
                sizes={
                  fullPage
                    ? `(max-width: 700px) max(100vw, calc(min(100svh, 166.667vw) * ${photo.src.width / photo.src.height})), max(100vw, calc(100svh * ${photo.src.width / photo.src.height}))`
                    : `calc(min(747px, calc((100vw - 64px) * 4 / 3), calc(100svh - 300px)) * ${Math.max(0.75, photo.src.width / photo.src.height)})`
                }
                draggable={false}
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </div>
          ))}
        </div>
        {!fullPage && (
          <h2
            className="vg-photo-break-names pointer-events-none absolute inset-0 z-10"
            aria-label={wedding.title}
          >
            <span
              className="absolute -left-7 -top-9 [@media(max-width:700px)]:-left-4"
              aria-hidden="true"
            >
              {wedding.groomShort}
            </span>
            <span
              className="absolute -bottom-9 -right-7 [@media(max-width:700px)]:-right-4"
              aria-hidden="true"
            >
              {wedding.brideShort}
            </span>
          </h2>
        )}
      </div>
      <div
        className={`${fullPage ? "absolute bottom-[calc(86px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 rounded-full border border-[#f2ede026] bg-[#17201599] px-2 backdrop-blur-sm" : "relative"} z-10 flex items-center justify-center`}
        aria-label="Slideshow controls"
      >
        {photos.map((photo, index) => (
          <button
            key={photo.src.src}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full"
            aria-label={`Show photo ${index + 1}`}
            aria-pressed={index === active}
            disabled={!loaded.includes(index)}
            onClick={() => {
              setPaused(true);
              showPhoto(index);
            }}
          >
            <span
              className={`h-1.5 rounded-full transition-[width,background-color] motion-reduce:transition-none ${index === active ? "w-5 bg-[#f2ede0]" : "w-1.5 bg-[#f2ede066]"}`}
            />
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
            {paused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
