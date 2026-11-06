"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import MemoryViewer from "../components/MemoryViewer";
import { memoryPhotos } from "../data/memory-photos";
import flowers from "../assets/designs/flower-design-3.png";

const thumbnailSizes = "(min-width: 1280px) 276px, (min-width: 1024px) calc((100vw - 144px) / 4), (min-width: 768px) calc((100vw - 112px) / 4), (min-width: 640px) calc((100vw - 80px) / 2), calc((100vw - 52px) / 2)";
const wideThumbnailSizes = "(min-width: 1280px) 568px, (min-width: 1024px) calc((100vw - 112px) / 2), (min-width: 768px) calc((100vw - 80px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)";

export default function MemoryGallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  function close() {
    setSelectedIndex(null);
    opener.current?.focus({ preventScroll: true });
  }

  return (
    <section id="memories" aria-labelledby="mj-memories-title" className="relative overflow-hidden bg-[var(--mj-paper)] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Image src={flowers} alt="" sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 112px" className="pointer-events-none absolute -right-6 -top-8 h-auto w-28 -rotate-12 opacity-50 sm:w-40 lg:w-48" />
      <div className="relative mx-auto max-w-6xl">
        <h2 data-mj-reveal id="mj-memories-title" className="mj-heading mb-8 text-center sm:mb-10 sm:text-left">A lifetime of memories</h2>
        <div data-mj-stagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {memoryPhotos.map((photo, index) => (
            <div data-mj-reveal key={photo.src.src} className={`relative min-h-0 min-w-0 ${index < 2 ? "aspect-square md:row-span-2 md:aspect-auto" : index === memoryPhotos.length - 1 ? "col-span-2 aspect-[4/3] md:aspect-[8/3]" : "aspect-square md:aspect-[4/3]"}`}>
              <button type="button" aria-label={`Open memory: ${photo.alt}`} onClick={(event) => { opener.current = event.currentTarget; setSelectedIndex(index); }}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-sm border border-[var(--mj-line)] bg-[var(--mj-palette-3)]">
                <Image src={photo.src} alt={photo.alt} fill sizes={index === memoryPhotos.length - 1 ? wideThumbnailSizes : thumbnailSizes}
                  style={{ objectPosition: photo.position }} className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedIndex !== null && <MemoryViewer selectedIndex={selectedIndex} onSelect={setSelectedIndex} onClose={close} />}
    </section>
  );
}
