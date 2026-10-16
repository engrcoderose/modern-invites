"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

type PlaybackStatus = "paused" | "loading" | "playing" | "failed";
const musicVolume = 0.4;

export interface BackgroundMusicHandle { play: () => Promise<void>; }

export default function BackgroundMusic({ ref, showControl = true }: { ref?: Ref<BackgroundMusicHandle>; showControl?: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const pendingPlay = useRef(false);
  const control = useRef<HTMLDivElement>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [status, setStatus] = useState<PlaybackStatus>("paused");
  const active = status === "playing" || status === "loading";

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.volume = musicVolume;
    return () => player.pause();
  }, []);

  useEffect(() => {
    if (!detailsOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !control.current?.contains(event.target)) setDetailsOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [detailsOpen]);

  const startPlayback = useCallback(async () => {
    const player = audio.current;
    if (!player || !player.paused || pendingPlay.current) return;
    pendingPlay.current = true;
    setStatus("loading");
    try {
      if (player.error) player.load();
      await player.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setStatus("failed");
    } finally {
      pendingPlay.current = false;
    }
  }, []);

  useImperativeHandle(ref, () => ({ play: startPlayback }), [startPlayback]);

  const togglePlayback = () => {
    if (active) {
      audio.current?.pause();
      setStatus("paused");
    } else void startPlayback();
  };

  return (
    <div ref={control} role="group" aria-label="Wedding music"
      className={`${showControl ? "block" : "hidden"} fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && detailsOpen) {
          event.stopPropagation();
          setDetailsOpen(false);
          detailsButton.current?.focus();
        }
      }}>
      <audio ref={audio} src={wedding.music.src} loop preload="none"
        onPlay={() => setStatus("loading")} onPlaying={() => setStatus("playing")}
        onPause={() => setStatus("paused")} onError={() => { setStatus("failed"); setDetailsOpen(true); }} />
      <section id="dr-music-details" aria-labelledby="dr-music-title" hidden={!detailsOpen}
        className={`${styles.musicPanel} absolute bottom-[72px] right-0 w-[325px] max-w-[calc(100vw-40px)] rounded-2xl border border-[var(--dr-line)] p-5`}>
        <p className="text-[11px] uppercase leading-5 tracking-[0.18em] text-[var(--dr-muted)]">Our wedding soundtrack</p>
        <div className="mt-3 flex items-center justify-between gap-5">
          <div className="min-w-0 text-left">
            <h2 id="dr-music-title" className="text-xl font-semibold leading-7">{wedding.music.title}</h2>
            <p className="mt-1 text-sm text-[var(--dr-muted)]">{wedding.music.artist}</p>
          </div>
          <button type="button" onClick={togglePlayback} aria-pressed={active}
            aria-label={active ? "Pause background music" : `Play background music: ${wedding.music.title} by ${wedding.music.artist}`}
            className={`${styles.musicButton} flex size-[54px] shrink-0 items-center justify-center rounded-full border border-[var(--dr-line)]`}>
            {active ? <Pause size={20} strokeWidth={1.6} aria-hidden="true" /> : <Play size={20} strokeWidth={1.6} aria-hidden="true" />}
          </button>
        </div>
        <p role="status" className="mt-3 text-left text-xs leading-5 text-[var(--dr-muted)]">
          {status === "failed" ? "Music couldn’t start. Tap play to try again." : status === "loading" ? "Loading our song…" : status === "playing" ? "Now playing" : "Paused"}
        </p>
      </section>
      <button ref={detailsButton} type="button" onClick={() => setDetailsOpen((open) => !open)}
        aria-label={detailsOpen ? "Hide song details" : "Show song details"}
        aria-expanded={detailsOpen} aria-controls="dr-music-details"
        className={`${styles.musicButton} flex size-[54px] items-center justify-center rounded-full border border-[var(--dr-line)]`}>
        <Music2 size={22} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  );
}
