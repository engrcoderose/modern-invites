"use client";

import { Camera, Images, Maximize2 } from "lucide-react";
import type { AlbumPhoto } from "../domain/photo-sharing";
import { PhotoImage } from "./photo-image";
import styles from "./photo-sharing.module.css";

interface AlbumGalleryProps {
  visible: boolean;
  photos: AlbumPhoto[];
  onSelect: (id: string) => void;
  onShare: () => void;
}

export function AlbumGallery({ visible, photos, onSelect, onShare }: AlbumGalleryProps) {
  return (
    <section aria-labelledby="gallery-heading" className="py-2">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--album-line)] pb-5">
        <div>
          <h2 id="gallery-heading" className="font-instrumentSerif text-4xl">A day to remember</h2>
          <p className="mt-2 text-sm text-[var(--album-muted)]">Little moments, kept together.</p>
        </div>
        <p className="text-sm tabular-nums text-[var(--album-muted)]">{photos.length} shared {photos.length === 1 ? "memory" : "memories"}</p>
      </div>

      {!visible ? (
        <div className="rounded-xl bg-white px-6 py-14 text-center">
          <Images aria-hidden="true" className="mx-auto mb-4 size-8" />
          <h3 className="font-instrumentSerif text-2xl">A little privacy for now</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6">The couple is keeping the gallery private. You can still share photos while uploads are open.</p>
        </div>
      ) : !photos.length ? (
        <div className="rounded-xl bg-white px-6 py-14 text-center">
          <Camera aria-hidden="true" className="mx-auto mb-4 size-8" />
          <h3 className="font-instrumentSerif text-2xl">The memories start with you</h3>
          <p className="mt-2 text-sm">Approved photos will appear here.</p>
          <button type="button" onClick={onShare} className="mt-4 min-h-11 px-4 text-sm font-semibold underline">Share a photo</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6">
          {photos.map(photo => (
            <figure key={photo.id} className={`${styles.galleryPrint} min-w-0 bg-white p-2 pb-4 sm:p-3 sm:pb-5`}>
              <button type="button" onClick={() => onSelect(photo.id)} aria-label={`View photo by ${photo.guestName}`} className="group relative block aspect-[4/5] w-full overflow-hidden bg-[var(--album-paper)]">
                <PhotoImage photo={photo} sizes="(max-width: 639px) calc((100vw - 80px) / 2), (max-width: 1071px) calc((100vw - 168px) / 3), 301px" />
                <span aria-hidden="true" className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-[var(--album-accent)] opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"><Maximize2 className="size-4" /></span>
              </button>
              <figcaption className="mt-4 truncate text-center font-instrumentSerif text-xl">From {photo.guestName}</figcaption>
              {photo.caption && <p className="mt-1 line-clamp-2 break-words px-1 text-center text-xs leading-5 text-[var(--album-muted)]">{photo.caption}</p>}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
