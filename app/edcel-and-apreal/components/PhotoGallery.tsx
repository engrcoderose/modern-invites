"use client";

import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { galleryPhotos } from "../data/gallery-photos";
import styles from "../styles/gallery.module.css";

const count = galleryPhotos.length;
const imageSizes = "(min-width: 1500px) 420px, (min-width: 768px) 28vw, (min-width: 517px) 320px, (min-width: 307px) 62vw, 190px";
const wrap = (index: number) => (index + count) % count;
const neighbours = (index: number) => [-2, -1, 0, 1, 2].map(offset => wrap(index + offset));

function relativePosition(index: number, current: number) {
  const offset = wrap(index - current);
  return offset > count / 2 ? offset - count : offset;
}

export default function PhotoGallery() {
  const carousel = useRef<HTMLDivElement>(null);
  const inView = useInView(carousel, { once: true, amount: .15 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(() => neighbours(0).sort((a, b) => a - b));
  const [loaded, setLoaded] = useState<number[]>([]);
  const [pending, setPending] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const requested = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressSwipeClick = useRef(false);

  function select(index: number) {
    requested.current = index;
    setFailed(false);
    setMounted(current => [...new Set([...current, ...neighbours(index)])].sort((a, b) => a - b));
    setPending(index);
  }

  useEffect(() => {
    if (pending === null || !loaded.includes(pending)) return;
    setActive(pending);
    setPending(null);
  }, [loaded, pending]);

  async function decode(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try { await image.decode(); } catch { fail(index); return; }
    if (image.isConnected) setLoaded(current => current.includes(index) ? current : [...current, index]);
  }

  function fail(index: number) {
    if (requested.current !== index) return;
    setPending(null);
    requested.current = active;
    setFailed(true);
    // A failed requested photo can be mounted again when the guest retries it.
    if (index !== active) setMounted(current => current.filter(photo => photo !== index));
  }

  function step(direction: number) { select(wrap(requested.current + direction)); }

  return <div ref={carousel} role="region" aria-roledescription="carousel" aria-label="Edcel and Apreal’s prenup photographs" aria-describedby="ea-gallery-instructions"
    data-gallery-entered={inView || reducedMotion ? "true" : "false"} data-text-motion-skip
    tabIndex={0} className={`${styles.carousel} relative outline-none`}
    onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") select(0);
      else if (event.key === "End") select(count - 1);
      else step(event.key === "ArrowLeft" ? -1 : 1);
    }}>
    <p id="ea-gallery-instructions" className="sr-only">Use the previous and next buttons, slide dots, left and right arrow keys, or swipe to browse the photographs.</p>
    <div className={`${styles.stage} relative w-full`}
      onPointerDown={event => {
        suppressSwipeClick.current = false;
        if (event.pointerType === "touch" && event.isPrimary) touchStart.current = { x: event.clientX, y: event.clientY };
      }}
      onClickCapture={event => {
        if (!suppressSwipeClick.current) return;
        suppressSwipeClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      }}
      onPointerCancel={() => { touchStart.current = null; }}
      onPointerUp={event => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          suppressSwipeClick.current = true;
          step(dx < 0 ? 1 : -1);
        }
      }}>
      {mounted.map(index => {
        const offset = relativePosition(index, active);
        const distance = Math.abs(offset);
        const hidden = distance > 2;
        const photo = galleryPhotos[index];
        return <div key={photo.src.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`} aria-hidden={offset !== 0}
          data-gallery-photo={index} data-hidden={hidden}
          className={`${styles.card} absolute left-1/2 top-1/2 aspect-[2/3] w-[var(--gallery-card-width)] overflow-hidden rounded-[14px] sm:rounded-[18px]`}
          style={{ "--card-x": `${offset * 73}%`, "--card-turn": `${offset === 0 ? 0 : -Math.sign(offset) * (distance === 1 ? 16 : 23)}deg`, "--card-scale": distance === 0 ? 1 : distance === 1 ? .93 : .83,
            zIndex: 30 - Math.min(distance, 3) * 10, opacity: hidden ? 0 : distance === 0 ? 1 : distance === 1 ? .78 : .52, pointerEvents: hidden ? "none" : undefined } as CSSProperties}>
          <Image src={photo.src} alt={offset === 0 ? photo.alt : ""} fill sizes={imageSizes} loading={index === pending ? "eager" : "lazy"} className="select-none object-cover" draggable={false}
            style={{ objectPosition: photo.position }} onLoad={event => void decode(index, event)} onError={() => fail(index)} />
          {offset !== 0 && !hidden && <button type="button" tabIndex={-1} aria-label={`View photograph ${index + 1}`} onClick={() => select(index)} className="absolute inset-0" />}
        </div>;
      })}
      <button type="button" aria-label="Previous gallery photograph" onClick={() => step(-1)} className={`${styles.arrow} absolute left-3 top-1/2 z-40 flex size-12 -translate-y-1/2 items-center justify-center rounded-full sm:left-[9%] md:size-14`}><ChevronLeft size={24} strokeWidth={1.5} aria-hidden="true" /></button>
      <button type="button" aria-label="Next gallery photograph" onClick={() => step(1)} className={`${styles.arrow} absolute right-3 top-1/2 z-40 flex size-12 -translate-y-1/2 items-center justify-center rounded-full sm:right-[9%] md:size-14`}><ChevronRight size={24} strokeWidth={1.5} aria-hidden="true" /></button>
    </div>
    <div role="group" aria-label="Choose gallery photograph" className="mt-2 flex items-center justify-center gap-0.5 sm:gap-1">
      {galleryPhotos.map((photo, index) => <button key={photo.src.src} type="button" aria-label={`Go to gallery photograph ${index + 1}`}
        aria-current={index === active ? "true" : undefined} onClick={() => select(index)} className="flex size-7 items-center justify-center rounded-full sm:size-9">
        <span aria-hidden="true" className={`${styles.dot} ${index === active ? styles.activeDot : ""}`} />
      </button>)}
    </div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">Photograph {active + 1} of {count}</p>
    <p role="status" className="mx-auto mt-2 min-h-6 max-w-sm px-5 text-center text-xs">{failed ? "This photo could not load. Please try another photograph." : pending !== null && !loaded.includes(pending) ? "Loading photograph…" : ""}</p>
  </div>;
}
