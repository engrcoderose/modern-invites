"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { GalleryPhoto } from "../types/wedding";

interface GalleryCarouselProps {
  photos: readonly GalleryPhoto[];
  onOpen: (index: number) => void;
}

const SWIPE_THRESHOLD = 45;

export default function GalleryCarousel({ photos, onOpen }: GalleryCarouselProps) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const move = (direction: number) => {
    setSelected((index) => (index + direction + photos.length) % photos.length);
  };

  if (!photos.length) return null;

  return (
    <div
      role="group" aria-label="Our photo gallery carousel" aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          setSelected(event.key === "Home" ? 0 : photos.length - 1);
        }
      }}
      className="mx-auto max-w-6xl"
    >
      <div className="relative">
        <div
          className="relative touch-pan-y"
          onPointerDown={(event) => {
            swiped.current = false;
            if (event.pointerType !== "mouse") touchStart.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerCancel={() => { touchStart.current = null; }}
          onPointerUp={(event) => {
            if (!touchStart.current) return;
            const dx = event.clientX - touchStart.current.x;
            const dy = event.clientY - touchStart.current.y;
            touchStart.current = null;
            if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
              swiped.current = true;
              move(dx < 0 ? 1 : -1);
            }
          }}
          onClickCapture={(event) => {
            if (!swiped.current) return;
            event.preventDefault();
            event.stopPropagation();
            swiped.current = false;
          }}
        >
          <div className="jb-carousel-stage relative mx-auto aspect-[2/3] w-[clamp(210px,56vw,360px)]">
            {photos.map((photo, index) => {
              let offset = (index - selected + photos.length) % photos.length;
              if (offset > photos.length / 2) offset -= photos.length;
              const distance = Math.abs(offset);
              if (distance > 3) return null;
              const active = offset === 0;
              const visible = distance < 3;

              return (
                <motion.button
                  key={photo.alt} type="button"
                  aria-label={active ? `Open photo ${index + 1}: ${photo.alt}` : `Show gallery photo ${index + 1}: ${photo.alt}`}
                  aria-hidden={!visible} tabIndex={active ? 0 : -1}
                  initial={false}
                  animate={{
                    x: `${offset * 69}%`,
                    rotateY: active ? 0 : offset < 0 ? 24 : -24,
                    scale: active ? 1 : distance === 1 ? 0.87 : 0.76,
                    opacity: active ? 1 : distance === 1 ? 0.72 : visible ? 0.42 : 0,
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.65, ease: "easeIn" }}
                  style={{ zIndex: 10 - distance, pointerEvents: visible ? "auto" : "none" }}
                  onClick={() => active ? onOpen(index) : setSelected(index)}
                  className={`jb-carousel-photo absolute inset-0 overflow-hidden rounded-lg border border-[#faf8f0]/90 bg-[#eeeee4] sm:rounded-2xl ${active ? "cursor-zoom-in" : "cursor-pointer"}`}
                >
                  <Image src={photo.src} alt={photo.alt} fill draggable={false} sizes="(max-width:640px) 56vw, 360px" className="pointer-events-none select-none object-cover" loading="lazy" />
                </motion.button>
              );
            })}
          </div>
        </div>
        <button type="button" aria-label="Previous gallery photo" disabled={photos.length < 2} onClick={() => move(-1)} className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#faf8f0]/70 bg-[#526445]/95 text-[#faf8f0] shadow-lg transition-colors hover:bg-[#36472e] disabled:opacity-40 sm:left-3 sm:h-12 sm:w-12">
          <ChevronLeft size={26} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next gallery photo" disabled={photos.length < 2} onClick={() => move(1)} className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#faf8f0]/70 bg-[#526445]/95 text-[#faf8f0] shadow-lg transition-colors hover:bg-[#36472e] disabled:opacity-40 sm:right-3 sm:h-12 sm:w-12">
          <ChevronRight size={26} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <p aria-live="polite" aria-atomic="true" className="sr-only">Photo {selected + 1} of {photos.length}</p>
      <div aria-label="Choose a gallery photo" className="relative mt-6 flex flex-wrap justify-center">
        {photos.map((photo, index) => (
          <button key={photo.alt} type="button" aria-label={`Go to gallery photo ${index + 1}`} aria-current={selected === index ? "true" : undefined} onClick={() => setSelected(index)} className="group flex h-11 w-11 items-center justify-center rounded-full">
            <span aria-hidden="true" className={`rounded-full transition-all motion-reduce:transition-none ${selected === index ? "h-2.5 w-2.5 bg-[#526445] shadow-[0_0_0_4px_#c9e4ca55]" : "h-1.5 w-1.5 bg-[#526445]/40 group-hover:bg-[#526445]"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
