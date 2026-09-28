"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { wedding } from "../data";

export function MusicControl({
  audio,
}: {
  audio: RefObject<HTMLAudioElement | null>;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!detailsOpen) return;
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !control.current?.contains(event.target)
      )
        setDetailsOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [detailsOpen]);
  if (!wedding.music?.src) return null;
  async function toggle() {
    if (!audio.current) return;
    if (audio.current.paused) {
      try {
        await audio.current.play();
        setPlaying(true);
        setFailed(false);
      } catch {
        setFailed(true);
      }
    } else {
      audio.current.pause();
      setPlaying(false);
    }
  }
  return (
    <div
      ref={control}
      className="vg-music absolute bottom-[95px] right-[18px] z-[35]"
      onKeyDown={(event) => {
        if (!detailsOpen) return;
        event.stopPropagation();
        if (event.key === "Escape") {
          setDetailsOpen(false);
          detailsButton.current?.focus();
        }
      }}
    >
      <audio
        ref={audio}
        src={wedding.music.src}
        loop
        preload="none"
        onPlay={() => {
          setPlaying(true);
          setFailed(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      {detailsOpen && (
        <section
          id="vg-music-details"
          aria-label="Wedding music"
          className="absolute bottom-[58px] right-0 w-[260px] max-w-[calc(100vw-36px)] rounded-xl border border-[var(--vg-line)] bg-[var(--vg-paper)] p-4 text-[var(--vg-ink)] shadow-lg"
        >
          <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--vg-muted)]">
            Our wedding soundtrack
          </p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="min-w-0 text-left">
              <p className="text-base font-semibold">{wedding.music.title}</p>
              <p className="mt-1 text-xs text-[var(--vg-muted)]">
                {wedding.music.artist}
              </p>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={
                playing
                  ? "Pause music"
                  : `Play ${wedding.music.title} by ${wedding.music.artist}`
              }
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--vg-line)] bg-transparent"
            >
              {playing ? (
                <Pause size={17} aria-hidden="true" />
              ) : (
                <Play size={17} aria-hidden="true" />
              )}
            </button>
          </div>
          <p
            role="status"
            className="mt-3 text-left text-[10px] text-[var(--vg-muted)]"
          >
            {failed
              ? "Music is unavailable. Please try again."
              : playing
                ? "Now playing"
                : "Paused"}
          </p>
        </section>
      )}
      <button
        ref={detailsButton}
        type="button"
        onClick={() => setDetailsOpen((open) => !open)}
        aria-label={detailsOpen ? "Hide song details" : "Show song details"}
        aria-expanded={detailsOpen}
        aria-controls="vg-music-details"
        className="flex size-11 items-center justify-center rounded-full border border-[var(--vg-line)] bg-[var(--vg-paper)] text-[var(--vg-ink)]"
      >
        <Music2 size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

