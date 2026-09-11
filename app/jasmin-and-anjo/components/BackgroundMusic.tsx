"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { invitationOpenedEvent, prenupVideoStartedEvent } from "../lib/events";

const musicSource = "/music/isabelle-and-daniel-music-Libu-libong%20buwan.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || audioError || !audio.paused || playPromiseRef.current) return;

    try {
      const playPromise = audio.play();
      playPromiseRef.current = playPromise;
      await playPromise;
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== "NotAllowedError") {
        console.error("Unable to play background music:", error);
      }
    } finally {
      playPromiseRef.current = null;
    }
  }, [audioError]);

  useEffect(() => {
    const startMusic = () => void playMusic();
    const pauseForVideo = () => audioRef.current?.pause();
    window.addEventListener(invitationOpenedEvent, startMusic);
    window.addEventListener(prenupVideoStartedEvent, pauseForVideo);
    return () => {
      window.removeEventListener(invitationOpenedEvent, startMusic);
      window.removeEventListener(prenupVideoStartedEvent, pauseForVideo);
    };
  }, [playMusic]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    if (audio.paused) {
      void playMusic();
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onLoadedMetadata={(event) => {
          event.currentTarget.volume = 0.5;
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setAudioError(true);
        }}
      >
        <source src={musicSource} type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <div className="flex items-center gap-3 rounded-full border border-[#eac8cd]/25 bg-[#263d35]/90 p-2 pr-4 text-[#fffaf3] shadow-[0_14px_45px_rgba(34,4,12,0.32)] backdrop-blur-xl sm:gap-4 sm:pr-5">
          <button
            type="button"
            onClick={toggleMusic}
            disabled={audioError}
            aria-label={playing ? "Pause background music" : "Play background music"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#eac8cd]/35 bg-[#637b65] text-[#f2dce0] transition duration-300 hover:scale-105 hover:bg-[#637b65] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="translate-x-px" />}
          </button>

          <div className="hidden min-w-0 sm:block">
            <p className="text-[0.48rem] uppercase tracking-[0.28em] text-[#eac8cd]">Sample music</p>
            <p className="mt-0.5 max-w-36 truncate font-instrumentSerif text-base leading-none">Libu-libong Buwan</p>
          </div>

          <div aria-hidden="true" className="flex h-7 items-center gap-[3px] text-[#eac8cd]">
            {audioError ? (
              <Music2 size={15} className="opacity-50" />
            ) : (
              [0, 1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className={`w-[2px] rounded-full bg-current ${playing ? "music-bar h-5 origin-center" : "h-1.5 opacity-55"}`}
                  style={{ animationDelay: `${bar * 120}ms` }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
