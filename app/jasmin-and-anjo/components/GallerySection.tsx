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
          <Reveal delay={0.12}><p className="max-w-xs text-[#526753] font-libreBaskerville text-xs leading-7 sm:text-right">Placeholder photographs for now. Soon, these frames will hold our own favorite moments.</p></Reveal>
        </div>

        <div ref={wall} className="flow-gallery-wall relative isolate mt-16 grid h-[clamp(420px,58vw,740px)] grid-cols-3 gap-[var(--gallery-gap)] overflow-hidden [--gallery-gap:14px] max-[640px]:mt-[38px] max-[640px]:h-auto max-[640px]:grid-cols-1 max-[640px]:gap-2.5 max-[640px]:[--gallery-gap:10px] motion-reduce:h-auto motion-reduce:max-h-none motion-reduce:overflow-visible" data-paused={paused || !inView || !pageVisible || Boolean(selected)} aria-label="Continuously scrolling wedding photographs">
          {columns.map((column, columnIndex) => (
            <div className="flow-gallery-column min-w-0 max-[640px]:overflow-hidden max-[640px]:motion-reduce:overflow-x-auto" key={columnIndex}>
              <div className="flow-gallery-track max-[640px]:flex max-[640px]:w-max">
                {[0, 1].map(copy => (
                  <div className="flex flex-col gap-[var(--gallery-gap)] pb-[var(--gallery-gap)] max-[640px]:flex-row max-[640px]:shrink-0 max-[640px]:pb-0 max-[640px]:pr-[var(--gallery-gap)] motion-reduce:aria-hidden:hidden" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                    {column.map((photo, index) => (
                      <button className="group/photo relative block aspect-square w-full min-h-0 shrink-0 cursor-zoom-in overflow-hidden rounded-md max-[640px]:rounded-none max-[640px]:w-[clamp(240px,76vw,420px)] border-0 bg-[#d1dad2] p-0" key={`${copy}-${index}`} tabIndex={copy === 1 ? -1 : 0} aria-label={`View photograph: ${photo.alt}`} onClick={event => { opener.current = event.currentTarget; setSelected(photo); }}>
                        <Image src={photo.src} alt={copy === 1 ? "" : photo.alt} fill sizes="(max-width: 640px) 80vw, (max-width: 1280px) 30vw, 410px" style={{ objectPosition: photo.position }} className="object-cover transition-transform duration-[650ms] ease-[ease] group-hover/photo:scale-[1.035] motion-reduce:transition-none" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flow-gallery-controls mt-[22px] flex items-center justify-between gap-5">
          <p className="font-instrumentSerif text-[23px] italic max-[640px]:max-w-[180px] max-[640px]:text-[18px]">Little moments. A lifetime of memories.</p>
          {!reduceMotion && <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[30px] border border-[#8da08d] px-[15px] py-3 text-[10px] tracking-[.04em]" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume gallery animation" : "Pause gallery animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? "Resume motion" : "Pause motion"}</button>}
        </div>
      </div>
      <dialog ref={dialog} className="backdrop:bg-[#1e332ad9] backdrop:backdrop-blur-[7px] w-[min(1100px,94vw)] max-h-[94svh] border-0 bg-[#fbf8f1] px-[18px] pb-[18px] pt-[45px] text-[#33473d]" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} aria-label="Wedding photograph preview">
        <button className="absolute right-2.5 top-2 p-[5px]" onClick={close} aria-label="Close photograph"><X size={22} /></button>
        {selected && <Image src={selected.src} alt={selected.alt} width={1600} height={1200} sizes="90vw" className="h-auto max-h-[77svh] w-full object-contain" />}
        <p className="mt-3.5 text-center text-[11px]">Placeholder photograph · Our photos to follow</p>
      </dialog>
    </section>
  );
}
