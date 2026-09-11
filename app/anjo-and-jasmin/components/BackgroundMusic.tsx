"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ListMusic, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { invitationOpenedEvent, prenupVideoStartedEvent } from "../../jasmin-and-anjo/lib/events";
import { backgroundMusic, type MusicTrack } from "../data";

const tracks = backgroundMusic.filter((track): track is MusicTrack => Boolean(track)).slice(0, 4);

export default function BackgroundMusic({ visible }: { visible: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playlistButton = useRef<HTMLButtonElement>(null);
  const selectedIndex = useRef(0);
  const wantsPlayback = useRef(false);
  const playRequest = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [error, setError] = useState<string | null>(null);

  const pauseMusic = useCallback(() => {
    wantsPlayback.current = false;
    playRequest.current += 1;
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return;
    const request = ++playRequest.current;
    wantsPlayback.current = true;
    setError(null);
    if (audio.error) audio.load();
    // Choosing music also pauses any currently playing prenup video.
    audio.closest(".classic-garden-invitation")?.querySelectorAll("video").forEach(video => video.pause());
    try {
      await audio.play();
    } catch (cause) {
      // Ignore a superseded request after pausing or changing songs quickly.
      if (request !== playRequest.current || !wantsPlayback.current) return;
      wantsPlayback.current = false;
      setPlaying(false);
      setError(cause instanceof DOMException && cause.name === "NotAllowedError"
        ? "Tap play to start the music."
        : "This song could not play. Try again or choose another song.");
    }
  }, []);

  function selectTrack(index: number, shouldPlay: boolean) {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return;
    const next = (index + tracks.length) % tracks.length;
    pauseMusic();
    selectedIndex.current = next;
    setActiveIndex(next);
    setError(null);
    // Keep source changes and play within the same gesture for mobile browsers.
    audio.src = tracks[next].src;
    audio.load();
    if (shouldPlay) void playMusic();
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = 0.5;
    const openInvitation = () => void playMusic();
    window.addEventListener(invitationOpenedEvent, openInvitation);
    window.addEventListener(prenupVideoStartedEvent, pauseMusic);
    return () => {
      window.removeEventListener(invitationOpenedEvent, openInvitation);
      window.removeEventListener(prenupVideoStartedEvent, pauseMusic);
      wantsPlayback.current = false;
      playRequest.current += 1;
      audio?.pause();
    };
  }, [pauseMusic, playMusic]);

  useEffect(() => {
    if (!expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !playerRef.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expanded]);

  if (!tracks.length) return null;
  const activeTrack = tracks[activeIndex];

  return (
    <>
      <audio
        ref={audioRef}
        // This prop stays stable; selectTrack owns subsequent source changes.
        src={tracks[0].src}
        preload="metadata"
        onPlay={() => {
          if (!wantsPlayback.current) { audioRef.current?.pause(); return; }
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          if (wantsPlayback.current) selectTrack(selectedIndex.current + 1, true);
        }}
        onError={() => {
          pauseMusic();
          setError("This song is unavailable. Try again or choose another song.");
        }}
      />
      <div
        ref={playerRef}
        hidden={!visible}
        className="fixed bottom-4 right-4 z-[60] max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6"
        onKeyDown={event => {
          if (event.key === "Escape" && expanded) {
            setExpanded(false);
            playlistButton.current?.focus();
          }
        }}
      >
        {expanded && (
          <section id="wedding-playlist" aria-labelledby="playlist-title" className="absolute bottom-full right-0 mb-3 max-h-[65svh] w-[min(320px,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-[#cba4b6]/50 bg-[#fffdf8] p-5 text-[#624451] shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div><p className="text-[9px] uppercase tracking-[.22em] text-[#946879]">Anjo &amp; Jasmin</p><h2 id="playlist-title" className="mt-1 font-instrumentSerif text-3xl">Our soundtrack</h2></div>
              <button type="button" onClick={() => { setExpanded(false); playlistButton.current?.focus(); }} aria-label="Close playlist" className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-[#f8edf0]"><X size={18} /></button>
            </div>
            <ol className="mt-5 space-y-2">
              {tracks.map((track, index) => (
                <li key={track.src}>
                  <button type="button" onClick={() => selectTrack(index, true)} aria-label={`Play ${track.title}`} aria-current={index === activeIndex ? "true" : undefined} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#946879] ${index === activeIndex ? "border-[#cba4b6] bg-[#f8edf0]" : "border-transparent hover:bg-[#f8edf0]/60"}`}>
                    <span aria-hidden="true" className="w-5 shrink-0 text-xs text-[#946879]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 text-sm leading-6">{track.title}</span>
                    {index === activeIndex ? <Check size={16} aria-hidden="true" className="shrink-0 text-[#637b65]" /> : <Play size={14} aria-hidden="true" className="shrink-0 text-[#946879]" />}
                  </button>
                </li>
              ))}
            </ol>
            <label className="mt-5 flex items-center gap-3 border-t border-[#cba4b6]/30 pt-5 text-[#946879]">
              <Volume2 size={18} aria-hidden="true" /><span className="sr-only">Music volume</span>
              <input aria-label="Music volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={event => { const value = Number(event.target.value); setVolume(value); if (audioRef.current) audioRef.current.volume = value; }} className="min-h-11 min-w-0 flex-1 accent-[#946879]" />
              <span className="w-9 text-right text-xs tabular-nums">{Math.round(volume * 100)}%</span>
            </label>
            <p className="mt-2 text-center text-[11px] text-[#756770]">{tracks.length} {tracks.length === 1 ? "song" : "songs"} · Plays in order</p>
          </section>
        )}
        {error && <p role="status" className="mb-3 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-[#cba4b6]/40 bg-[#fffdf8] px-4 py-3 text-xs leading-6 text-[#624451] shadow-lg">{error}</p>}
        <div className="flex items-center gap-1 rounded-full border border-[#eac8cd]/25 bg-[#263d35]/95 p-2 text-[#fffaf3] shadow-xl backdrop-blur-xl sm:gap-2">
          <button type="button" onClick={() => { if (wantsPlayback.current) pauseMusic(); else void playMusic(); }} aria-label={playing ? "Pause background music" : "Play background music"} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#eac8cd]/35 bg-[#637b65] text-[#f2dce0] transition hover:bg-[#7c927d]">
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
          {tracks.length > 1 && <button type="button" onClick={() => selectTrack(selectedIndex.current - 1, wantsPlayback.current)} aria-label="Previous song" className="grid h-11 w-9 shrink-0 place-items-center rounded-full hover:bg-white/10"><SkipBack size={16} /></button>}
          <div className="hidden min-w-0 max-w-36 px-1 sm:block"><p className="text-[8px] uppercase tracking-[.2em] text-[#eac8cd]">Our soundtrack</p><p className="mt-1 truncate font-instrumentSerif text-base" title={activeTrack.title}>{activeTrack.title}</p></div>
          {tracks.length > 1 && <button type="button" onClick={() => selectTrack(selectedIndex.current + 1, wantsPlayback.current)} aria-label="Next song" className="grid h-11 w-9 shrink-0 place-items-center rounded-full hover:bg-white/10"><SkipForward size={16} /></button>}
          <button ref={playlistButton} type="button" onClick={() => setExpanded(value => !value)} aria-label={expanded ? "Hide playlist" : "Show playlist"} aria-expanded={expanded} aria-controls="wedding-playlist" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#eac8cd]/20 text-[#eac8cd] hover:bg-white/10"><ListMusic size={19} /></button>
        </div>
      </div>
    </>
  );
}
