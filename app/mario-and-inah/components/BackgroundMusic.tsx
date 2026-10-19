"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Pause, Play } from "lucide-react";
import { wedding } from "../data/wedding";

type PlaybackStatus = "paused" | "loading" | "playing" | "failed";
export type BackgroundMusicHandle = { play: () => Promise<void>; getAudio: () => HTMLAudioElement | null };

export default function BackgroundMusic({ ref, visible }: { ref?: Ref<BackgroundMusicHandle>; visible: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const pending = useRef(false);
  const [status, setStatus] = useState<PlaybackStatus>("paused");
  const active = status === "playing" || status === "loading";

  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = 0.4;
    return () => player?.pause();
  }, []);

  const play = useCallback(async () => {
    const player = audio.current;
    if (!player || !player.paused || pending.current) return;
    pending.current = true;
    setStatus("loading");
    try {
      if (player.error) player.load();
      await player.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setStatus("failed");
    } finally {
      pending.current = false;
    }
  }, []);

  useImperativeHandle(ref, () => ({ play, getAudio: () => audio.current }), [play]);

  return (
    <>
      <audio ref={audio} src={wedding.music.src} loop preload="none"
        onPlay={() => setStatus("loading")} onPlaying={() => setStatus("playing")}
        onPause={() => setStatus("paused")} onError={() => setStatus("failed")} />
      {visible && (
        <div role="group" aria-label="Wedding music" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 sm:right-6">
          <button type="button" aria-pressed={active}
            aria-label={active ? "Pause background music" : `Play background music: ${wedding.music.title}`}
            title={`${wedding.music.title} · ${wedding.music.version}`}
            onClick={() => { if (active) audio.current?.pause(); else void play(); }}
            className="flex size-12 items-center justify-center rounded-full border border-[var(--mi-rule)] bg-[var(--mi-paper)] text-[var(--mi-ink)] shadow-lg transition-colors hover:bg-[var(--mi-sage)] motion-reduce:transition-none">
            {active ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" /> : <Play size={18} strokeWidth={1.5} aria-hidden="true" />}
          </button>
          <p role="status" className={status === "failed" ? "absolute bottom-full right-0 mb-3 w-56 rounded-lg border border-[var(--mi-rule)] bg-[var(--mi-paper)] p-3 text-xs leading-6 text-[var(--mi-ink)]" : "sr-only"}>
            {status === "failed" ? "Music couldn’t start. Tap play to try again." : status === "loading" ? "Loading our song." : status === "playing" ? "Music playing." : "Music paused."}
          </p>
        </div>
      )}
    </>
  );
}
