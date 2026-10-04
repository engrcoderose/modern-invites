"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Reveal from "./motion/Reveal";
import { galleryBreakPhotos } from "../media";
import FloralAccent from "./FloralAccent";
import MemoryViewer from "./MemoryViewer";

const previewLimit = 10;
const previewPhotos = galleryBreakPhotos.slice(0, previewLimit);
const remainingCount = galleryBreakPhotos.length - previewPhotos.length;

export default function GalleryBreak() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  function close() {
    setSelectedIndex(null);
    opener.current?.focus({ preventScroll: true });
  }

  return (
    <section id="gallery-break" aria-labelledby="gallery-break-title" className="relative overflow-hidden bg-[rgb(var(--aj-cream))] px-5 py-16 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-24 lg:px-12">
      <FloralAccent kind="corner" className="right-0 top-0 w-28 rotate-90 opacity-50 sm:w-40 lg:w-48" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-8 text-center sm:mb-10 sm:text-left">
          <div>
            <h2 id="gallery-break-title" className="font-instrumentSerif text-4xl leading-tight sm:text-5xl lg:text-6xl">A lifetime of <span className="font-meaCulpa text-[rgb(var(--aj-accent-dark))]">memories.</span></h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {previewPhotos.map((photo, index) => {
            const isMoreTile = remainingCount > 0 && index === previewPhotos.length - 1;
            return (
              <Reveal key={photo.alt} delay={(index % 4) * 0.06} className={`relative aspect-square min-h-0 min-w-0 ${index < 2 ? "md:row-span-2 md:aspect-auto" : "md:aspect-[4/3]"}`}>
                <button
                  type="button"
                  aria-label={isMoreTile ? `View ${remainingCount} more memory photographs` : `Open memory: ${photo.alt}`}
                  onClick={event => {
                    opener.current = event.currentTarget;
                    setSelectedIndex(isMoreTile ? previewPhotos.length : index);
                  }}
                  className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-sm border border-[rgb(var(--aj-line))]/50 bg-[rgb(var(--aj-sand))] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))]"
                >
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 43vw, 280px" style={{ objectPosition: photo.position }} className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
                  {isMoreTile && (
                    <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgb(var(--aj-olive-deep))]/75 text-[rgb(var(--aj-ivory))] transition-colors group-hover:bg-[rgb(var(--aj-olive-deep))]/65">
                      <span className="font-instrumentSerif text-5xl sm:text-6xl">+{remainingCount}</span>
                      <span className="text-[10px] uppercase tracking-[.2em] sm:text-xs">more photos</span>
                    </span>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      {selectedIndex !== null && <MemoryViewer photos={galleryBreakPhotos} selectedIndex={selectedIndex} onSelect={setSelectedIndex} onClose={close} />}
    </section>
  );
}
