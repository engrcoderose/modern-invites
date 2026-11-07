"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { memoryPhotos } from "../data/memory-photos";

interface MemoryViewerProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function MemoryViewer({ selectedIndex, onSelect, onClose }: MemoryViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const photo = memoryPhotos[selectedIndex];

  useEffect(() => {
    if (!dialog.current?.open) dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);

  function close() {
    dialog.current?.close();
    onClose();
  }

  function select(index: number) {
    if (index === selectedIndex) return;
    setLoading(true);
    setFailed(false);
    onSelect(index);
  }

  function move(direction: number) {
    select((selectedIndex + direction + memoryPhotos.length) % memoryPhotos.length);
  }

  const controlClass = "mj-memory-control absolute z-10 grid h-11 w-11 place-items-center rounded-full border";

  return (
    <dialog ref={dialog} aria-label="Memory photo viewer" onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
          return;
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          select(event.key === "Home" ? 0 : memoryPhotos.length - 1);
        }
      }}
      className="mj-memory-viewer fixed inset-0 m-auto h-full max-h-none w-full max-w-none flex-col items-center justify-center gap-4 overflow-hidden border-0 bg-transparent px-3 py-16 text-[var(--mj-ink)] open:flex sm:gap-5">
      <button ref={closeButton} type="button" onClick={close} aria-label="Close memory viewer" className={`${controlClass} right-3 top-3 sm:right-6 sm:top-6`}><X aria-hidden="true" size={22} strokeWidth={1.5} /></button>
      <div className="relative h-[min(70svh,850px)] w-[min(1100px,94vw)] touch-pan-y"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") {
            touchStart.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }} onPointerCancel={() => { touchStart.current = null; }} onPointerUp={(event) => {
          if (!touchStart.current) return;
          const dx = event.clientX - touchStart.current.x;
          const dy = event.clientY - touchStart.current.y;
          touchStart.current = null;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
        }}>
        {failed ? <div role="alert" className="flex h-full flex-col items-center justify-center gap-4 px-12 text-center text-sm leading-7">
          <p>This photo couldn’t load.</p>
          <button type="button" onClick={() => { setLoading(true); setFailed(false); closeButton.current?.focus({ preventScroll: true }); }} className="mj-memory-control border px-5 py-3">Try again</button>
        </div> : <Image key={photo.src.src} src={photo.src} alt={photo.alt} fill loading="eager" sizes="min(94vw, 46.7svh, 568px)" draggable={false}
          className="pointer-events-none select-none object-contain" onLoad={() => setLoading(false)} onError={() => { setFailed(true); setLoading(false); }} />}
        {loading && <p role="status" className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-sm">Loading photo…</p>}
      </div>
      <button type="button" onClick={() => move(-1)} aria-label="Previous memory photograph" className={`${controlClass} left-2 top-1/2 -translate-y-1/2 sm:left-6 sm:h-12 sm:w-12`}><ChevronLeft aria-hidden="true" size={26} strokeWidth={1.5} /></button>
      <button type="button" onClick={() => move(1)} aria-label="Next memory photograph" className={`${controlClass} right-2 top-1/2 -translate-y-1/2 sm:right-6 sm:h-12 sm:w-12`}><ChevronRight aria-hidden="true" size={26} strokeWidth={1.5} /></button>
      <p aria-live="polite" aria-atomic="true" className="px-8 text-center text-xs tabular-nums">{selectedIndex + 1} of {memoryPhotos.length}</p>
    </dialog>
  );
}
