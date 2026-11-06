"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { galleryPhotos } from "../data/gallery-photos";
import { useInvitationOpen } from "../components/InvitationState";

const count = galleryPhotos.length;
const wrap = (index: number) => (index + count) % count;

export default function GallerySection() {
  const section = useRef<HTMLElement>(null);
  const opened = useInvitationOpen();
  const [nearby, setNearby] = useState(false);
  const [selected, setSelected] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const ready = useRef(new Set<number>());
  const requested = useRef<number | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!opened || !section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, [opened]);

  function goTo(index: number) {
    if (requested.current !== null) return;
    const target = wrap(index);
    setError(false);
    if (ready.current.has(target)) setSelected(target);
    else {
      requested.current = target;
      setPending(target);
      setAttempt((value) => value + 1);
    }
  }

  function failed(index: number) {
    ready.current.delete(index);
    if (requested.current !== index) return;
    requested.current = null;
    setPending(null);
    setError(true);
  }

  return (
    <section ref={section} id="gallery" aria-labelledby="mj-gallery-title" aria-roledescription="carousel" className="mj-gallery overflow-hidden py-16 sm:py-20">
      <h2 id="mj-gallery-title" className="sr-only">Our moments together</h2>
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-10" onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        goTo(event.key === "Home" ? 0 : event.key === "End" ? count - 1 : selected + (event.key === "ArrowRight" ? 1 : -1));
      }}>
        <div className="mj-gallery-stage relative mx-auto aspect-[2/3]" onPointerDown={(event) => {
          if (event.pointerType === "touch") touch.current = { x: event.clientX, y: event.clientY };
        }} onPointerCancel={() => { touch.current = null; }} onPointerUp={(event) => {
          if (!touch.current) return;
          const dx = event.clientX - touch.current.x;
          const dy = event.clientY - touch.current.y;
          touch.current = null;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goTo(selected + (dx < 0 ? 1 : -1));
        }}>
          {nearby && galleryPhotos.map((photo, index) => {
            let offset = wrap(index - selected);
            if (offset > count / 2) offset -= count;
            const distance = Math.abs(offset);
            if (distance > 3 && pending !== index) return null;
            // Cover cropping requires more source width for landscape originals.
            const cropScale = Math.max(1, photo.src.width / photo.src.height * 1.5);
            return (
              <div key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`} aria-hidden={distance !== 0} className="mj-gallery-photo absolute inset-0 overflow-hidden" style={{
                transform: `translateX(${offset * 78}%) scale(${distance === 0 ? 1 : distance === 1 ? 0.94 : 0.88})`,
                zIndex: 10 - distance,
                opacity: distance < 3 ? 1 : 0,
                visibility: distance < 4 ? "visible" : "hidden",
              }}>
                <Image key={pending === index ? attempt : "photo"} src={photo.src} alt={photo.alt} fill quality={85} sizes={`(min-width: 1223px) ${Math.round(330 * cropScale)}px, (min-width: 640px) ${27 * cropScale}vw, (min-width: 322px) ${56 * cropScale}vw, ${180 * cropScale}px`} loading="eager" draggable={false} className="select-none object-cover" onLoad={async (event) => {
                  try {
                    await event.currentTarget.decode();
                    ready.current.add(index);
                    if (requested.current === index) {
                      setSelected(index);
                      requested.current = null;
                      setPending(null);
                    }
                  } catch { failed(index); }
                }} onError={() => failed(index)} />
              </div>
            );
          })}
        </div>
        <button type="button" aria-label="Previous gallery photo" disabled={pending !== null || !nearby} onClick={() => goTo(selected - 1)} className="mj-gallery-arrow absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full sm:left-[8%]"><ChevronLeft size={25} strokeWidth={1.5} aria-hidden="true" /></button>
        <button type="button" aria-label="Next gallery photo" disabled={pending !== null || !nearby} onClick={() => goTo(selected + 1)} className="mj-gallery-arrow absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full sm:right-[8%]"><ChevronRight size={25} strokeWidth={1.5} aria-hidden="true" /></button>
      </div>
      <p aria-live="polite" aria-atomic="true" className="mt-7 text-center text-sm tabular-nums"><span className="sr-only">Photo </span>{selected + 1} <span aria-hidden="true">/</span><span className="sr-only"> of </span> {count}</p>
      <p role="status" className="mt-2 min-h-6 px-6 text-center text-sm">{pending !== null ? "Loading photo…" : error ? "This photo couldn’t load. Please try the arrow again." : ""}</p>
    </section>
  );
}
