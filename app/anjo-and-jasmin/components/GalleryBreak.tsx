"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Reveal from "./motion/Reveal";
import { galleryBreakPhotos } from "../media";
import type { GalleryImage } from "../types";
import FloralAccent from "./FloralAccent";

const layouts = [
  "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto",
  "col-span-2 aspect-[2/1] md:aspect-auto",
  "aspect-[3/4] md:aspect-auto",
  "aspect-[3/4] md:aspect-auto",
];

export default function GalleryBreak() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [selected]);

  function close() {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }

  return (
    <section id="gallery-break" aria-labelledby="gallery-break-title" className="relative overflow-hidden bg-[rgb(var(--aj-cream))] px-5 py-16 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-24 lg:px-12">
      <FloralAccent kind="corner" className="right-0 top-0 w-32 rotate-90 sm:w-48 lg:w-60" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-8 flex flex-col gap-4 text-center sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-[10px] uppercase tracking-[.3em] text-[rgb(var(--aj-olive))]">Anjo &amp; Jasmin</p>
            <h2 id="gallery-break-title" className="mt-4 font-instrumentSerif text-4xl leading-tight sm:text-5xl lg:text-6xl">A lifetime of <span className="font-meaCulpa text-[rgb(var(--aj-accent-dark))]">memories.</span></h2>
          </div>
          <p className="text-xs leading-6 text-[rgb(var(--aj-muted))]">A closer look at our little moments.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-[1.1fr_1.1fr_1fr_1fr] md:grid-rows-[230px_230px] lg:grid-rows-[280px_280px] sm:gap-5">
          {galleryBreakPhotos.map((photo, index) => (
            <Reveal key={photo.alt} delay={index * 0.06} className={`relative min-h-0 min-w-0 ${layouts[index]}`}>
              <button type="button" aria-label={`Open memory: ${photo.alt}`} onClick={event => { opener.current = event.currentTarget; setSelected(photo); }} className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-sm bg-[#d9dac4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))]">
                <Image src={photo.src} alt={photo.alt} fill sizes={index < 2 ? "(max-width: 767px) 90vw, 580px" : "(max-width: 767px) 43vw, 280px"} style={{ objectPosition: photo.position }} className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
                <span aria-hidden="true" className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-[rgb(var(--aj-paper))]/90 text-[rgb(var(--aj-ink))] shadow-sm"><ArrowUpRight size={17} strokeWidth={1.4} /></span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <dialog ref={dialog} aria-label="Garden memory preview" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} className="max-h-[94svh] w-[min(1100px,94vw)] border-0 bg-[rgb(var(--aj-cream))] p-4 pt-14 text-[rgb(var(--aj-ink))] backdrop:bg-[rgb(var(--aj-olive-deep))]/90 backdrop:backdrop-blur">
        <button type="button" onClick={close} aria-label="Close memory preview" className="absolute right-2 top-1 grid h-11 w-11 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--aj-accent))]"><X aria-hidden="true" /></button>
        {selected && <Image src={selected.src} alt={selected.alt} width={1600} height={1200} sizes="90vw" className="max-h-[75svh] w-full object-contain" />}
        <p className="mt-3 text-center text-xs leading-6">{selected?.alt}</p>
      </dialog>
    </section>
  );
}
