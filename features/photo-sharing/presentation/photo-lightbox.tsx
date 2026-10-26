"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import type { AlbumPhoto } from "../domain/photo-sharing";
import { PhotoImage } from "./photo-image";

export async function downloadPhoto(photo: AlbumPhoto) {
  const blob = typeof photo.source === "string" ? await fetch(photo.source).then(response => {
    if (!response.ok) throw new Error("Download failed. Please try again.");
    return response.blob();
  }) : photo.source;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = photo.fileName;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function PhotoLightbox({ photos, selectedId, onSelect, onClose }: { photos: AlbumPhoto[]; selectedId: string; onSelect: (id: string) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const error = useRef<HTMLParagraphElement>(null);
  const index = photos.findIndex(photo => photo.id === selectedId);
  const photo = photos[index];
  useEffect(() => {
    const element = dialog.current;
    const previouslyFocused = document.activeElement;
    const overflow = document.body.style.overflow;
    element?.showModal(); document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = overflow; if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus(); };
  }, []);
  if (!photo) return null;
  const move = (offset: number) => onSelect(photos[(index + offset + photos.length) % photos.length].id);
  return <dialog ref={dialog} aria-labelledby="photo-viewer-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }} className="m-auto w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-xl bg-ivory p-4 text-forest backdrop:bg-black/80 sm:p-6">
    <div className="mb-3 flex items-center justify-between gap-3"><h2 id="photo-viewer-title" className="truncate font-elegant text-xl">Shared by {photo.guestName}</h2><button type="button" onClick={onClose} aria-label="Close photo viewer" className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-sage-100 focus-visible:outline focus-visible:outline-2"><X aria-hidden="true" /></button></div>
    <div className="relative h-[55dvh] min-h-48"><PhotoImage key={photo.id} photo={photo} sizes="90vw" contain /></div>
    <p className="mt-4 break-words text-sm">{photo.caption}</p>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2"><button type="button" aria-label="Previous photo" onClick={() => move(-1)} className="flex size-11 items-center justify-center rounded-lg border"><ChevronLeft /></button><span className="text-sm tabular-nums">{index + 1} / {photos.length}</span><button type="button" aria-label="Next photo" onClick={() => move(1)} className="flex size-11 items-center justify-center rounded-lg border"><ChevronRight /></button></div>
      <button type="button" className="flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm" onClick={() => { void downloadPhoto(photo).catch(() => { if (error.current) error.current.textContent = "Couldn’t download this photo. Please try again."; }); }}><Download aria-hidden="true" className="size-4" />Download photo</button>
    </div><p ref={error} role="status" className="mt-2 text-sm text-red-800" />
  </dialog>;
}
