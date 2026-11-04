"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { wedding } from "../data/wedding-data";

export interface BackgroundMusicHandle {
  prepare: () => void;
  play: () => void;
}

const MUSIC_VOLUME = 0.4;
interface MusicOutput {
  context: AudioContext;
  gain: GainNode;
  source: MediaElementAudioSourceNode;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, { visible: boolean }>(function BackgroundMusic({ visible }, ref) {
  const audio = useRef<HTMLAudioElement>(null);
  const output = useRef<MusicOutput | null>(null);
  const prepared = useRef(false);
  const started = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playMusic = useCallback(async () => {
    const player = audio.current;
    if (!player) return;
    setError(null);
    if (player.error) player.load();
    try {
      if (!started.current) {
        started.current = true;
        if (player.readyState >= HTMLMediaElement.HAVE_METADATA) player.currentTime = 0;
      }
      const graph = output.current;
      if (graph) graph.gain.gain.setValueAtTime(MUSIC_VOLUME, graph.context.currentTime);
      // Invoke both immediately so a manual retry retains its user gesture.
      const resume = graph && graph.context.state !== "running" ? graph.context.resume() : Promise.resolve();
      const playback = player.play();
      await Promise.all([resume, playback]);
      setPlaying(!player.paused);
    } catch (cause) {
      // Pausing a pending play request is an intentional cancellation.
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setPlaying(false);
      setError(cause instanceof DOMException && cause.name === "NotAllowedError"
        ? "Tap play to start the music."
        : "Music could not play. Tap play to try again.");
    }
  }, []);

  const prepareMusic = useCallback(() => {
    const player = audio.current;
    if (!player || prepared.current) return;
    prepared.current = true;
    let context: AudioContext | undefined;
    try {
      if (!window.AudioContext) { player.load(); return; }
      context = new AudioContext();
      const gain = context.createGain();
      gain.gain.value = 0;
      gain.connect(context.destination);
      const source = context.createMediaElementSource(player);
      source.connect(gain);
      output.current = { context, gain, source };
      player.volume = 1;
      // Unlock playback in the original tap, routing it through a silent output.
      // The envelope's completion callback rewinds the song and raises the gain.
      const resume = context.resume();
      const playback = player.play();
      void Promise.all([resume, playback]).catch(() => {
        // The normal start/retry path handles any playback failure after opening.
      });
    } catch {
      if (context && !output.current) void context.close().catch(() => {});
      if (!output.current) player.load();
    }
  }, []);

  useImperativeHandle(ref, () => ({ prepare: prepareMusic, play: () => { void playMusic(); } }), [playMusic, prepareMusic]);

  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = MUSIC_VOLUME;
    return () => {
      player?.pause();
      const graph = output.current;
      graph?.source.disconnect();
      graph?.gain.disconnect();
      if (graph && graph.context.state !== "closed") void graph.context.close().catch(() => {});
    };
  }, []);

  if (!wedding.music.src) return null;

  return (
    <>
      <audio
        ref={audio}
        src={wedding.music.src}
        loop
        preload="none"
        onPlay={() => { if (started.current) setPlaying(true); }}
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
