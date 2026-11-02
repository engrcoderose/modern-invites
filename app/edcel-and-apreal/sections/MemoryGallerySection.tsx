"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import MemoryViewer from "../components/MemoryViewer";
import { memoryPhotos as photos, type MemoryPhoto } from "../data/memory-photos";
import invitation from "../styles/invitation.module.css";
import styles from "../styles/memory-gallery.module.css";

const previewPhotos = photos.slice(0, 10);
const remainingCount = photos.length - (previewPhotos.length - 1);

function thumbnailSizes(photo: MemoryPhoto, index: number) {
  const ratio = photo.src.width / photo.src.height;
  const cover = (width: string) => `max(${width}, calc(${width} * ${ratio * (index < 2 ? 1.5 : .75)}${index < 2 ? ` + ${16 * ratio}px` : ""}))`;
  return `(min-width: 1376px) ${cover("308px")}, (min-width: 1024px) ${cover("calc((100vw - 144px) / 4)")}, (min-width: 768px) ${cover("calc((100vw - 112px) / 4)")}, (min-width: 640px) calc((100vw - 80px) * ${Math.max(1, ratio) / 2}), calc((100vw - 52px) * ${Math.max(1, ratio) / 2})`;
}

export default function MemoryGallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  function close() {
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }

  return <section id="memories" aria-labelledby="ea-memories-title" className={`${styles.memories} px-5 py-16 sm:px-8 sm:py-24 lg:px-12`}>
    <div className="mx-auto max-w-7xl">
      <h2 id="ea-memories-title" className={`${invitation.sectionTitle} mb-8 text-center sm:mb-10 sm:text-left`}>A lifetime of <em>memories.</em></h2>
      <div data-text-motion-skip className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {previewPhotos.map((photo, index) => {
          const more = remainingCount > 1 && index === previewPhotos.length - 1;
          return <button key={photo.src.src} type="button"
            aria-label={more ? `View ${remainingCount} more memory photographs` : `Open memory photograph ${index + 1}: ${photo.alt}`}
            onClick={event => { opener.current = event.currentTarget; setSelected(index); }}
            className={`group relative block aspect-square min-h-0 min-w-0 cursor-zoom-in overflow-hidden rounded-sm border border-[var(--ea-line)] bg-[#e8d7ce] ${index < 2 ? "md:row-span-2 md:aspect-auto" : "md:aspect-[4/3]"}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes={thumbnailSizes(photo, index)} loading="lazy" style={{ objectPosition: photo.position }}
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" />
            {more && <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#4b0f1f]/75 text-[var(--ea-text)] sm:gap-2">
              <span className="text-4xl leading-none sm:text-5xl">+{remainingCount}</span>
              <span className="text-[9px] uppercase tracking-[.18em] sm:text-xs">More photos</span>
            </span>}
          </button>;
        })}
      </div>
    </div>
    {selected !== null && <MemoryViewer photos={photos} selected={selected} onSelect={setSelected} onClose={close} />}
  </section>;
}
