"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function MusicControl({ playing, error, onToggle }: { playing: boolean; error: string; onToggle: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !control.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return <div ref={control} className={`${styles.musicControl} absolute z-40`}
    onKeyDown={event => {
      if (!open) return;
      event.stopPropagation();
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
    }}>
    {open && <section id="cr-music-details" aria-label="Wedding music" className={`${styles.musicCard} absolute w-[280px] max-w-[calc(100vw-32px)] rounded-xl border p-4 text-left`}>
      <p className={`${styles.musicDetail} text-[9px] uppercase tracking-[.18em]`}>Our wedding soundtrack</p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-snug">{wedding.music.title}</h2>
          <p className={`${styles.musicDetail} mt-1 text-xs`}>{wedding.music.artist}</p>
        </div>
        <button type="button" aria-label={playing ? "Pause music" : "Play music"} aria-pressed={playing} onClick={() => void onToggle()}
          className={`${styles.musicPlayback} relative flex size-14 shrink-0 items-center justify-center rounded-full border-2 bg-transparent`}>
          {playing ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" /> : <Play size={18} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`${styles.musicDetail} mt-3 text-[10px] leading-4`}>{error || (playing ? "Now playing" : "Paused")}</p>
    </section>}
    <button ref={trigger} type="button" aria-label={open ? "Hide song details" : "Show song details"} aria-expanded={open} aria-controls="cr-music-details"
      onClick={() => setOpen(value => !value)} className={`${styles.musicTrigger} flex size-11 items-center justify-center rounded-full border`}>
      <Music2 size={17} strokeWidth={1.5} aria-hidden="true" />
    </button>
    {!open && error && <p role="status" className="sr-only">{error}</p>}
  </div>;
}
