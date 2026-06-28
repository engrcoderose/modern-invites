"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const playMusic = useCallback(
    async (silent = false) => {
      const audio = audioRef.current;

      if (!audio || audioError || playPromiseRef.current) {
        return;
      }

      if (!audio.paused) {
        return;
      }

      try {
        const playPromise = audio.play();
        playPromiseRef.current = playPromise;
        await playPromise;
        setAutoplayBlocked(false);
      } catch (error) {
        if (
          error instanceof DOMException &&
          (error.name === "AbortError" || error.name === "NotAllowedError")
        ) {
          setAutoplayBlocked(true);
          return;
        }

        if (!silent) {
          console.error("Unable to play background music:", error);
        }
      } finally {
        playPromiseRef.current = null;
      }
    },
    [audioError],
  );

  useEffect(() => {
    playMusic(true);

    const playAfterInteraction = () => {
      playMusic(true);
    };

    window.addEventListener("pointerdown", playAfterInteraction, {
      once: true,
    });
    window.addEventListener("keydown", playAfterInteraction, { once: true });
    window.addEventListener("touchstart", playAfterInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", playAfterInteraction);
      window.removeEventListener("keydown", playAfterInteraction);
      window.removeEventListener("touchstart", playAfterInteraction);
    };
  }, [playMusic]);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio || audioError) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    playMusic();
  };

  const bars = [
    "h-3 [animation-delay:0ms]",
    "h-5 [animation-delay:150ms]",
    "h-4 [animation-delay:300ms]",
    "h-6 [animation-delay:450ms]",
  ];

  return (
    <>
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        onPlay={() => {
          setPlaying(true);
          setAutoplayBlocked(false);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setAudioError(true);
        }}
      >
        <source src="/music/eric-and-li-music.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-4 right-2 z-50">
        <div className="flex items-center gap-3 md:gap-4 rounded-full bg-white/80 px-3 md:px-5 md:py-3 shadow-xl backdrop-blur-md w-auto h-16">
          <button
            type="button"
            onClick={toggleMusic}
            disabled={audioError}
            aria-label={
              playing ? "Pause background music" : "Play background music"
            }
            className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#5b351e] text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <div>
            <p className="hidden sm:block text-xs uppercase tracking-[0.3em]">
              Our Song
            </p>

            <h3 className="text-xs font-serif md:text-lg">The Gift</h3>

            <p className="text-xs md:text-sm text-neutral-500">
              {audioError
                ? "Audio file missing"
                : autoplayBlocked
                  ? "Tap play to start"
                  : "Tap to pause"}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center gap-1 text-neutral-800"
          >
            {bars.map((barClass, index) => (
              <span
                key={index}
                className={`w-1 rounded-full bg-neutral-700 transition-all ${
                  playing ? `animate-pulse ${barClass}` : "h-2 opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
