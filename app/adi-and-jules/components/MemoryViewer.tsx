"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "../types";

interface MemoryViewerProps {
  photos: readonly GalleryImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function MemoryViewer({ photos, selectedIndex, onSelect, onClose }: MemoryViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const selected = photos[selectedIndex];

  useEffect(() => {
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);

  function close() {
    dialog.current?.close();
    onClose();
  }

  function move(direction: number) {
    onSelect((selectedIndex + direction + photos.length) % photos.length);
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Memory gallery viewer"
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          onSelect(event.key === "Home" ? 0 : photos.length - 1);
        }
      }}
      className="fixed inset-0 m-auto h-full max-h-none w-full max-w-none flex-col items-center justify-center gap-4 overflow-hidden border-0 bg-transparent px-3 py-16 text-[rgb(var(--aj-ivory))] open:flex backdrop:bg-[rgb(var(--aj-olive-deep))]/95 backdrop:backdrop-blur-sm sm:gap-5"
    >
      <button type="button" onClick={close} aria-label="Close memory viewer" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6">
        <X aria-hidden="true" size={22} strokeWidth={1.5} />
      </button>
      <div
        className="relative h-[min(70svh,850px)] w-[min(1100px,94vw)] touch-pan-y"
        onPointerDown={event => {
          if (event.pointerType !== "mouse") {
            touchStart.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => { touchStart.current = null; }}
        onPointerUp={event => {
          if (!touchStart.current) return;
          const dx = event.clientX - touchStart.current.x;
          const dy = event.clientY - touchStart.current.y;
          touchStart.current = null;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
        }}
      >
        <Image src={selected.src} alt={selected.alt} fill draggable={false} loading="eager" sizes="(max-width: 1170px) 94vw, 1100px" className="pointer-events-none select-none object-contain" />
      </div>
      <button type="button" onClick={() => move(-1)} aria-label="Previous memory photograph" className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6 sm:h-12 sm:w-12">
        <ChevronLeft aria-hidden="true" size={26} strokeWidth={1.5} />
      </button>
      <button type="button" onClick={() => move(1)} aria-label="Next memory photograph" className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:h-12 sm:w-12">
        <ChevronRight aria-hidden="true" size={26} strokeWidth={1.5} />
      </button>
      <div className="max-w-2xl px-8 text-center">
        <p aria-live="polite" aria-atomic="true" className="text-xs tracking-[.15em]">{selectedIndex + 1} of {photos.length}</p>
      </div>
    </dialog>
  );
}
