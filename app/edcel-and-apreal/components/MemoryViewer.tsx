"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { MemoryPhoto } from "../data/memory-photos";
import styles from "../styles/memory-gallery.module.css";

type Props = {
  photos: readonly MemoryPhoto[];
  selected: number;
  onSelect: (index: number) => void;
  onClose: () => void;
};

export default function MemoryViewer({ photos, selected, onSelect, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[selected];
  const ratio = photo.src.width / photo.src.height;

  useEffect(() => {
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);

  function move(direction: number) {
    onSelect((selected + direction + photos.length) % photos.length);
  }

  return <dialog ref={dialog} aria-label="Edcel and Apreal’s memory gallery" onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
    onKeyDown={event => {
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") onSelect(0);
        else if (event.key === "End") onSelect(photos.length - 1);
        else move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}
    className={`${styles.viewer} fixed inset-0 m-auto h-full max-h-none w-full max-w-none flex-col items-center justify-center gap-5 overflow-hidden border-0 bg-transparent px-3 py-16 text-[#f8f0e5] open:flex`}>
    <button autoFocus type="button" aria-label="Close memory viewer" onClick={() => dialog.current?.close()}
      className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-[#f8f0e5]/40 bg-[#401522]/70 sm:right-6 sm:top-6"><X size={23} aria-hidden="true" /></button>
    <div className="relative h-[min(70svh,850px)] w-[min(1100px,94vw)] touch-pan-y"
      onPointerDown={event => {
        if (event.pointerType === "mouse") return;
        touch.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { touch.current = null; }}
      onPointerUp={event => {
        if (!touch.current) return;
        const dx = event.clientX - touch.current.x;
        const dy = event.clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      }}>
      <Image key={photo.src.src} src={photo.src} alt={photo.alt} fill quality={85} loading="eager" placeholder="blur" draggable={false}
        sizes={`min(94vw, 1100px, ${70 * ratio}svh, ${850 * ratio}px)`} className="pointer-events-none select-none object-contain" />
    </div>
    <div className="flex items-center justify-center gap-6">
      <button type="button" aria-label="Previous memory photograph" onClick={() => move(-1)} className="grid size-11 place-items-center rounded-full border border-[#f8f0e5]/40 bg-[#401522]/70"><ChevronLeft size={23} aria-hidden="true" /></button>
      <p aria-live="polite" aria-atomic="true" className="min-w-16 text-center text-xs tracking-[.12em]">{selected + 1} / {photos.length}</p>
      <button type="button" aria-label="Next memory photograph" onClick={() => move(1)} className="grid size-11 place-items-center rounded-full border border-[#f8f0e5]/40 bg-[#401522]/70"><ChevronRight size={23} aria-hidden="true" /></button>
    </div>
  </dialog>;
}
