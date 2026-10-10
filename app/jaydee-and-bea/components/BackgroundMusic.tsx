"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { wedding } from "../data/wedding-data";

export interface BackgroundMusicHandle {
  play: () => void;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, { visible: boolean }>(function BackgroundMusic({ visible }, ref) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playMusic = useCallback(async () => {
    const player = audio.current;
    if (!player) return;
    setError(null);
    if (player.error) player.load();
    try {
      await player.play();
    } catch (cause) {
      // Pausing a pending play request is an intentional cancellation.
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setPlaying(false);
      setError(cause instanceof DOMException && cause.name === "NotAllowedError"
        ? "Tap play to start the music."
        : "Music could not play. Tap play to try again.");
    }
  }, []);

  useImperativeHandle(ref, () => ({ play: () => { void playMusic(); } }), [playMusic]);

  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = 0.4;
    return () => { player?.pause(); };
  }, []);

  if (!wedding.music.src) return null;

  return (
    <>
      <audio
        ref={audio}
        src={wedding.music.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setError("Music could not play. Tap play to try again.");
        }}
      />
      {visible && (
        <div data-jb-music-controls className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] sm:right-6">
          {error && (
            <p role="status" className="absolute bottom-full right-0 mb-3 w-56 rounded-xl border border-[#526445]/25 bg-[#fffaf3] p-3 text-left text-xs leading-relaxed text-[#36472e]">
              {error}
            </p>
          )}
          <button
            type="button"
            aria-label={playing ? "Pause background music" : "Play background music"}
            aria-pressed={playing}
            title={wedding.music.title}
            onClick={() => {
              if (audio.current?.paused) void playMusic();
              else audio.current?.pause();
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#526445]/40 bg-[#fffaf3]/95 text-[#36472e] shadow-[0_4px_16px_rgb(54_71_46_/_12%)] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#526445] motion-reduce:transition-none"
          >
            {playing ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" /> : <Play size={18} strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      )}
    </>
  );
});

export default BackgroundMusic;
