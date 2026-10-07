"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, X } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import type { GalleryImage } from "../types";
import { usePageVisibility } from "../hooks/usePageVisibility";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

export default function GallerySection({ images }: { images: GalleryImage[]; }) {
  const wall = useRef<HTMLDivElement>(null);
  const inView = useInView(wall, { margin: "100px" });
  const reduceMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);

  const close = () => {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  };

  if (!images.length) return null;
  const columns = Array.from({ length: Math.min(3, images.length) }, (_, column) => {
    const originals = images.filter((_, index) => index % 3 === column);
    // Repeat enough photos to fill either a desktop column or a mobile row seamlessly.
    return Array.from({ length: Math.max(6, originals.length) }, (_, index) => originals[index % originals.length]);
  });

  return (
    <section id="gallery" className="flow-gallery bg-[#e7edf0] text-[#33473d] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal><SectionLabel className="text-[#526753]">Captured moments</SectionLabel></Reveal>
            <Reveal delay={0.08}><h2 id="gallery-title" className="mt-8 text-[#526753] font-instrumentSerif text-[clamp(3.7rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Scenes from<br />our forever.</h2></Reveal>
          </div>
          <Reveal delay={0.12}><p className="max-w-xs text-[#526753] font-libreBaskerville text-xs leading-7 sm:text-right">The little glances, the laughter, and the quiet moments that brought us here.</p></Reveal>
        </div>

        <div ref={wall} className="flow-gallery-wall relative isolate mt-[38px] grid h-auto grid-cols-1 gap-2.5 overflow-hidden [--gallery-gap:10px] sm:mt-16 sm:h-[clamp(420px,58vw,740px)] sm:grid-cols-3 sm:gap-[var(--gallery-gap)] sm:[--gallery-gap:14px] motion-reduce:h-auto motion-reduce:max-h-none motion-reduce:overflow-visible" data-paused={paused || !inView || !pageVisible || Boolean(selected)} aria-label="Continuously scrolling wedding photographs">
          {columns.map((column, columnIndex) => (
            <div className="flow-gallery-column min-w-0 overflow-hidden sm:overflow-visible motion-reduce:overflow-x-auto sm:motion-reduce:overflow-x-visible" key={columnIndex}>
              <div className="flow-gallery-track flex w-max sm:block sm:w-auto">
                {[0, 1].map(copy => (
                  <div className="flex shrink-0 flex-row gap-[var(--gallery-gap)] pb-0 pr-[var(--gallery-gap)] sm:shrink sm:flex-col sm:pb-[var(--gallery-gap)] sm:pr-0 motion-reduce:aria-hidden:hidden" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                    {column.map((photo, index) => (
                      <button className="group/photo relative block aspect-square w-[clamp(240px,76vw,420px)] min-h-0 shrink-0 cursor-zoom-in overflow-hidden rounded-none sm:w-full sm:rounded-md border-0 bg-[#d1dad2] p-0" key={`${copy}-${index}`} tabIndex={copy === 1 ? -1 : 0} aria-label={`View photograph: ${photo.alt}`} onClick={event => { opener.current = event.currentTarget; setSelected(photo); }}>
                        <Image src={photo.src} alt={copy === 1 ? "" : photo.alt} fill sizes="(min-width: 1376px) 418px, (min-width: 1024px) calc((100vw - 124px) / 3), (min-width: 640px) calc((100vw - 92px) / 3), clamp(240px, 76vw, 420px)" style={{ objectPosition: photo.position }} className="object-cover transition-transform [transition-duration:650ms] [transition-timing-function:ease] group-hover/photo:scale-[1.035] motion-reduce:transition-none" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flow-gallery-controls mt-[22px] flex items-center justify-between gap-5">
          <p className="max-w-[180px] font-instrumentSerif text-[18px] italic sm:max-w-none sm:text-[23px]">Little moments. A lifetime of memories.</p>
          {!reduceMotion && <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[30px] border border-[#8da08d] px-[15px] py-3 text-[10px] tracking-[.04em]" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume gallery animation" : "Pause gallery animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? "Resume motion" : "Pause motion"}</button>}
        </div>
      </div>
      <dialog ref={dialog} className="backdrop:bg-[#1e332ad9] backdrop:backdrop-blur-[7px] w-[min(1100px,94vw)] max-h-[94svh] border-0 bg-[#fbf8f1] px-[18px] pb-[18px] pt-[45px] text-[#33473d]" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} aria-label="Wedding photograph">
        <button className="absolute right-2.5 top-2 p-[5px]" onClick={close} aria-label="Close photograph"><X size={22} /></button>
        {selected && <Image src={selected.src} alt={selected.alt} width={1600} height={1200} sizes="90vw" className="h-auto max-h-[77svh] w-full object-contain" />}
        <p className="mt-3.5 text-center text-[11px]">Our favorite moments, forever remembered.</p>
      </dialog>
    </section>
  );
}
