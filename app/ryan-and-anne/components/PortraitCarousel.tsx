"use client";

import type { RefObject } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "./OptimizedPhoto";
import type { PrenupPhoto } from "../types/media";
import styles from "../styles/wedding.module.css";

interface Props {
  frame: RefObject<HTMLDivElement | null>;
  slides: readonly PrenupPhoto[];
  sizes: string;
  label: string;
  current: number;
  mounted: number[];
  paused: boolean;
  reducedMotion: boolean;
  onLoad: (index: number) => void;
  onSelect: (index: number) => void;
  onStep: (direction: number) => void;
  onTogglePlayback: () => void;
}

export default function PortraitCarousel({ frame, slides, sizes, label, current, mounted, paused, reducedMotion, onLoad, onSelect, onStep, onTogglePlayback }: Props) {
  return (
    <div data-reveal="image" ref={frame} role="group" aria-label={`${label} slideshow controls`} onKeyDown={(event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      onStep(event.key === "ArrowLeft" ? -1 : 1);
    }}>
      <div className="relative mx-auto h-[clamp(270px,82.5vw,540px)] w-full max-w-5xl">
        {mounted.map((index) => {
          const photo = slides[index];
          const offset = (index - current + slides.length) % slides.length;
          const position = offset === 0 ? "center" : offset === 1 ? "next" : offset === slides.length - 1 ? "previous" : "hidden";
          return (
            <div key={photo.id} data-position={position} className={`${styles.portraitCard} absolute left-1/2 top-1/2 aspect-[2/3] w-[clamp(180px,55vw,360px)] overflow-hidden rounded-lg`}>
              <Image src={photo.src} alt={index === current ? photo.alt : ""} aria-hidden={index !== current || undefined}
                fill sizes={photo.sizes ?? sizes} quality={85} loading={index === 0 ? "lazy" : "eager"}
                className="object-cover" style={{ objectPosition: photo.position }} onLoad={() => onLoad(index)} />
            </div>
          );
        })}
        <button type="button" aria-label={`Previous ${label.toLowerCase()} photo`} onClick={() => onStep(-1)}
          className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f5f0e6]/70 bg-[#6b5c45] text-[#f5f0e6] transition-colors hover:bg-[#8a714e] sm:left-8"><ChevronLeft size={22} aria-hidden="true" /></button>
        <button type="button" aria-label={`Next ${label.toLowerCase()} photo`} onClick={() => onStep(1)}
          className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f5f0e6]/70 bg-[#6b5c45] text-[#f5f0e6] transition-colors hover:bg-[#8a714e] sm:right-8"><ChevronRight size={22} aria-hidden="true" /></button>
      </div>
      <div className="mt-7 flex items-center justify-center gap-2">
        <div className="flex">
          {slides.map((photo, index) => <button key={photo.id} type="button" aria-label={`Show ${label.toLowerCase()} photo ${index + 1} of ${slides.length}: ${photo.alt}`}
            aria-pressed={current === index} onClick={() => onSelect(index)} className="flex h-11 w-10 items-center justify-center">
            <span className={`rounded-full ${current === index ? "h-2.5 w-2.5 bg-[#d1b788] ring-4 ring-[#d1b788]/15" : "h-1.5 w-1.5 bg-[#d1b788]/60"}`} />
          </button>)}
        </div>
        <button type="button" disabled={reducedMotion} onClick={onTogglePlayback}
          aria-label={reducedMotion ? "Automatic slideshow disabled for reduced motion" : paused ? `Play ${label.toLowerCase()} slideshow` : `Pause ${label.toLowerCase()} slideshow`}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#d1b788] hover:bg-[#d1b788]/10 disabled:opacity-50">
          {paused || reducedMotion ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
      </div>
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>Photo {current + 1} of {slides.length}</p>
    </div>
  );
}
