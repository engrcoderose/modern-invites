"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { backgroundMusic } from "../data/music";

export interface BackgroundMusicHandle {
  prepare: () => void;
  play: () => void;
}

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
  const pending = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playMusic = useCallback(async () => {
    const player = audio.current;
    if (!player || pending.current || (started.current && !player.paused)) return;
    pending.current = true;
    setError(null);
    player.closest(".mj-invitation")?.querySelectorAll("video").forEach((video) => video.pause());
    if (player.error) player.load();
    try {
      if (!started.current) {
        started.current = true;
        if (player.readyState >= HTMLMediaElement.HAVE_METADATA) player.currentTime = 0;
      }
      const graph = output.current;
      if (graph) graph.gain.gain.setValueAtTime(backgroundMusic.volume, graph.context.currentTime);
      const resume = graph && graph.context.state !== "running" ? graph.context.resume() : Promise.resolve();
      const playback = player.play();
      await Promise.all([resume, playback]);
      setPlaying(!player.paused);
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setPlaying(false);
      setError(cause instanceof DOMException && cause.name === "NotAllowedError"
        ? "Tap play to start the music."
        : "Music could not play. Tap play to try again.");
    } finally {
      pending.current = false;
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
      // Unlock audio in the original tap, keeping its output silent until release.
      // The completion callback rewinds the track before raising the gain.
      const resume = context.resume();
      const playback = player.play();
      void Promise.all([resume, playback]).catch(() => {
        // Playback after opening exposes a retry if preparation was blocked.
      });
    } catch {
      if (context && !output.current) void context.close().catch(() => {});
      if (!output.current) player.load();
    }
  }, []);

  useImperativeHandle(ref, () => ({ prepare: prepareMusic, play: () => { void playMusic(); } }), [playMusic, prepareMusic]);

  useEffect(() => {
    const player = audio.current;
    const invitation = player?.closest(".mj-invitation");
    if (!player || !invitation) return;
    player.volume = backgroundMusic.volume;
    const pauseForFilm = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) player.pause();
    };
    invitation.addEventListener("play", pauseForFilm, true);
    return () => {
      invitation.removeEventListener("play", pauseForFilm, true);
      player.pause();
      const graph = output.current;
      graph?.source.disconnect();
      graph?.gain.disconnect();
      if (graph && graph.context.state !== "closed") void graph.context.close().catch(() => {});
    };
  }, []);

  return (
    <>
      <audio ref={audio} src={backgroundMusic.src} loop preload="none" aria-label={backgroundMusic.title}
        onPlay={() => { if (started.current) setPlaying(true); }} onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setError("Music could not play. Tap play to try again."); }} />
      {visible && (
        <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 sm:right-6">
          {error && <p role="status" className="absolute bottom-full right-0 mb-3 w-56 border border-[var(--mj-line)] bg-[var(--mj-paper)] p-3 text-left text-xs leading-relaxed">{error}</p>}
          <button type="button" aria-label={playing ? "Pause background music" : "Play background music"}
            aria-pressed={playing} title={backgroundMusic.title}
            onClick={() => { if (audio.current?.paused) void playMusic(); else audio.current?.pause(); }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--mj-line)] bg-[var(--mj-paper)] text-[var(--mj-ink)] transition-colors hover:bg-[var(--mj-palette-2)] motion-reduce:transition-none">
            {playing ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" /> : <Play size={18} strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      )}
    </>
  );
});

export default BackgroundMusic;
