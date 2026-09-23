"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { gallery } from "../media";
import type { GalleryImage } from "../types";
import Reveal from "./motion/Reveal";

const photos = gallery.map(photo => ({
  ...photo,
  alt: photo.alt.replace("Jasmin and Anjo", "Anjo and Jasmin"),
}));

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const reducedMotion = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const isPreviewOpen = selected !== null;

  useEffect(() => {
    if (!isPreviewOpen) return;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [isPreviewOpen]);

  function close() {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }

  function move(direction: number) {
    setActive(current => (current + direction + photos.length) % photos.length);
  }

  function movePreview(direction: number) {
    setSelected(current => current
      ? photos[(photos.indexOf(current) + direction + photos.length) % photos.length]
      : null);
  }

  return (
    <section id="gallery" aria-label="Our photo gallery" aria-roledescription="carousel"
      className="relative overflow-hidden bg-[rgb(var(--aj-clay))] px-3 py-16 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-24"
      onKeyDown={event => {
        if (selected) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          setActive(event.key === "Home" ? 0 : photos.length - 1);
        }
      }}>
      <h2 className="sr-only">Our photo gallery</h2>
      <Reveal y={40} scale={0.96} className="relative mx-auto max-w-6xl">
        <div className="relative touch-pan-y"
          onPointerDown={event => {
            swiped.current = false;
            if (event.pointerType !== "mouse") touchStart.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerCancel={() => { touchStart.current = null; }}
          onPointerUp={event => {
            if (!touchStart.current) return;
            const dx = event.clientX - touchStart.current.x;
            const dy = event.clientY - touchStart.current.y;
            touchStart.current = null;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
              swiped.current = true;
              move(dx < 0 ? 1 : -1);
            }
          }}
          onClickCapture={event => {
            if (swiped.current) {
              event.preventDefault();
              event.stopPropagation();
              swiped.current = false;
            }
          }}>
          <div className="aj-gallery-stage relative mx-auto aspect-[2/3] w-[clamp(210px,56vw,360px)]">
            {photos.map((photo, index) => {
              let offset = (index - active + photos.length) % photos.length;
              if (offset > photos.length / 2) offset -= photos.length;
              const distance = Math.abs(offset);
              if (distance > 3) return null;
              const isActive = distance === 0;
              const visible = distance < 3;
              return (
                <motion.button key={photo.alt} type="button"
                  aria-label={isActive ? `View photograph: ${photo.alt}` : `Show photograph ${index + 1}: ${photo.alt}`}
                  aria-hidden={!visible}
                  tabIndex={isActive ? 0 : -1}
                  initial={false}
                  animate={{
                    x: `${offset * 69}%`,
                    rotateY: offset === 0 ? 0 : offset < 0 ? 24 : -24,
                    scale: isActive ? 1 : distance === 1 ? 0.87 : 0.76,
                    opacity: isActive ? 1 : distance === 1 ? 0.72 : visible ? 0.42 : 0,
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: 10 - distance, pointerEvents: visible ? "auto" : "none" }}
                  className={`aj-gallery-photo absolute inset-0 overflow-hidden rounded-lg border border-[rgb(var(--aj-paper))]/90 bg-[rgb(var(--aj-sand))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))] sm:rounded-2xl ${isActive ? "cursor-zoom-in" : "cursor-pointer"}`}
                  onClick={event => {
                    if (!isActive) { setActive(index); return; }
                    opener.current = event.currentTarget;
                    setSelected(photo);
                  }}>
                  <Image src={photo.src} alt={photo.alt} fill draggable={false}
                    sizes="(max-width: 640px) 56vw, 360px"
                    style={{ objectPosition: photo.position }}
                    className="pointer-events-none select-none object-cover" />
                </motion.button>
              );
            })}
          </div>
        </div>
        <button type="button" aria-label="Previous gallery photograph" onClick={() => move(-1)}
          className="absolute left-0 top-[calc(50%-22px)] z-20 grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--aj-paper))]/70 bg-[rgb(var(--aj-accent))]/95 text-[rgb(var(--aj-cream))] shadow-lg transition hover:bg-[rgb(var(--aj-accent-dark))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))] sm:left-3 sm:h-12 sm:w-12">
          <ChevronLeft aria-hidden="true" size={26} strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Next gallery photograph" onClick={() => move(1)}
          className="absolute right-0 top-[calc(50%-22px)] z-20 grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--aj-paper))]/70 bg-[rgb(var(--aj-accent))]/95 text-[rgb(var(--aj-cream))] shadow-lg transition hover:bg-[rgb(var(--aj-accent-dark))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))] sm:right-3 sm:h-12 sm:w-12">
          <ChevronRight aria-hidden="true" size={26} strokeWidth={1.5} />
        </button>
      </Reveal>
      <Reveal y={12} delay={0.2}>
        <div className="relative mx-auto mt-6 flex max-w-full flex-wrap justify-center gap-0.5" aria-label="Choose a gallery photograph">
          {photos.map((photo, index) => (
            <button key={photo.alt} type="button" onClick={() => setActive(index)}
              aria-label={`Go to photograph ${index + 1}`} aria-current={index === active ? "true" : undefined}
              className="group grid h-8 w-6 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--aj-accent))]">
              <span aria-hidden="true" className={`rounded-full transition-all motion-reduce:transition-none ${index === active ? "h-2.5 w-2.5 bg-[rgb(var(--aj-ink))] shadow-[0_0_0_4px_#f5f2ee55]" : "h-1.5 w-1.5 bg-[rgb(var(--aj-ink))]/50 group-hover:bg-[rgb(var(--aj-ink))]"}`} />
            </button>
          ))}
        </div>
      </Reveal>
      <p className="sr-only" aria-live="polite" aria-atomic="true">Photograph {active + 1} of {photos.length}</p>
      <dialog ref={dialog} aria-label="Wedding photograph preview"
        onCancel={event => { event.preventDefault(); close(); }}
        onClick={event => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            movePreview(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        className="fixed inset-0 m-auto h-full max-h-none w-full max-w-none items-center justify-center overflow-hidden border-0 bg-transparent p-0 text-[rgb(var(--aj-ivory))] open:flex backdrop:bg-[rgb(var(--aj-olive-deep))]/90 backdrop:backdrop-blur">
        <button type="button" onClick={close} aria-label="Close photograph"
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/45 transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"><X aria-hidden="true" /></button>
        {selected && <Image src={selected.src} alt={selected.alt} width={1600} height={1200} sizes="(max-width: 1170px) 94vw, 1100px" className="max-h-[88svh] w-[min(1100px,94vw)] select-none object-contain" />}
        <button type="button" onClick={() => movePreview(-1)} aria-label="Previous preview photograph"
          className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 shadow-lg transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6 sm:h-12 sm:w-12">
          <ChevronLeft aria-hidden="true" size={28} strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => movePreview(1)} aria-label="Next preview photograph"
          className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 shadow-lg transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:h-12 sm:w-12">
          <ChevronRight aria-hidden="true" size={28} strokeWidth={1.5} />
        </button>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{selected ? `Photograph ${photos.indexOf(selected) + 1} of ${photos.length}` : ""}</p>
      </dialog>
    </section>
  );
}
