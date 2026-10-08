"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Pause, Play } from "lucide-react";
import { wedding } from "../data/wedding";

type PlaybackStatus = "paused" | "loading" | "playing" | "failed";
const musicVolume = 0.4;

export interface BackgroundMusicHandle { play: () => Promise<void>; }

export default function BackgroundMusic({ ref, showControl = true }: { ref?: Ref<BackgroundMusicHandle>; showControl?: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const pendingPlay = useRef(false);
  const [status, setStatus] = useState<PlaybackStatus>("paused");
  const active = status === "playing" || status === "loading";

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.volume = musicVolume;
    return () => player.pause();
  }, []);

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

  if (!wedding.music.src) return null;

  const togglePlayback = () => {
    if (audio.current && !audio.current.paused) audio.current.pause();
    else void startPlayback();
  };

  return (
    <div role="group" aria-label="Wedding music" className={`${showControl ? "flex" : "hidden"} fixed bottom-5 right-5 z-50 items-center gap-3 rounded-full border border-[#d1b788]/40 bg-[#171714]/95 p-1 text-[#d1b788] shadow-lg sm:bottom-6 sm:right-6 sm:pr-5`}>
      <audio ref={audio} src={wedding.music.src} loop preload="none"
        onPlay={() => setStatus("loading")} onPlaying={() => setStatus("playing")}
        onPause={() => setStatus("paused")} onError={() => setStatus("failed")} />
      <button type="button" onClick={togglePlayback} aria-pressed={active}
        aria-label={active ? "Pause background music" : `Play background music: ${wedding.music.title} by ${wedding.music.artist}`}
        title={active ? "Pause music" : "Play our song"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-[#d1b788]/15">
        {active ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
      </button>
      <div className="hidden min-w-0 sm:block">
        <p className="max-w-44 truncate text-xs">{wedding.music.title}</p>
        <p className="mt-1 text-[9px] text-[#f5f0e6]/65">{wedding.music.artist}</p>
      </div>
      <p role="status" className={status === "failed" ? "absolute bottom-16 right-0 w-64 rounded-lg border border-[#d1b788]/40 bg-[#171714] p-4 text-xs leading-6 text-[#f5f0e6]" : "sr-only"}>
        {status === "failed" ? "Music couldn’t start. Tap play to try again." : status === "loading" ? "Loading our song." : status === "playing" ? "Music playing." : "Music paused."}
      </p>
    </div>
  );
}
