"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { invitationOpenedEvent } from "../../lib/events";

const musicSource = "/music/PALAGI%20(Wedding%20Version).mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const reduceMotion = useReducedMotion();

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

    window.addEventListener(invitationOpenedEvent, startMusic);
    return () => window.removeEventListener(invitationOpenedEvent, startMusic);
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
        <div className="flex items-center gap-3 rounded-full border border-wedding-line/35 bg-wedding-paper/92 p-2 pr-3 text-wedding-sage-deep shadow-[0_14px_45px_rgb(55_67_55/.18)] backdrop-blur-xl sm:gap-4 sm:pr-5">
          <button
            type="button"
            onClick={toggleMusic}
            disabled={audioError}
            aria-label={
              playing ? "Pause background music" : "Play background music"
            }
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-wedding-sage/40 bg-wedding-sage-deep text-wedding-paper transition duration-300 hover:scale-105 hover:bg-wedding-sage disabled:cursor-not-allowed disabled:opacity-50"
          >
            {playing ? (
              <Pause className="size-4 fill-current stroke-[1.2]" />
            ) : (
              <Play className="size-4 translate-x-px fill-current stroke-[1.2]" />
            )}
          </button>

          <div className="hidden min-w-0 sm:block">
            <p className="font-sans text-[0.48rem] uppercase tracking-[0.28em] text-wedding-gold">
              Our song
            </p>
            <p className="mt-0.5 max-w-44 truncate font-wedding-display text-base leading-none">
              PALAGI
              <span className="ml-1.5 font-sans text-[0.52rem] uppercase tracking-[0.12em] text-wedding-sage">
                by TJ Monterde
              </span>
            </p>
          </div>

          <div
            aria-hidden="true"
            className="flex h-7 items-center gap-[3px] text-wedding-gold"
          >
            {audioError ? (
              <Music2 className="size-4 opacity-50" />
            ) : (
              [0, 1, 2, 3].map((bar) => (
                <motion.span
                  key={bar}
                  className="h-5 w-0.5 origin-center rounded-full bg-current"
                  animate={
                    playing && !reduceMotion
                      ? { scaleY: [0.28, 1, 0.48, 0.82, 0.28] }
                      : { scaleY: 0.3 }
                  }
                  transition={{
                    duration: 1.05 + bar * 0.08,
                    delay: bar * 0.1,
                    repeat: playing && !reduceMotion ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
