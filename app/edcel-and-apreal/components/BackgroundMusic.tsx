"use client";

import { Check, ListMusic, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useBackgroundMusic from "../hooks/useBackgroundMusic";
import { musicTracks as tracks } from "../data/music";
import styles from "../styles/music.module.css";

export default function BackgroundMusic() {
  const music = useBackgroundMusic();
  const frame = useRef<HTMLDivElement>(null);
  const playlistButton = useRef<HTMLButtonElement>(null);
  const playlist = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    playlist.current?.querySelector<HTMLButtonElement>("button[aria-current]")?.focus();
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !frame.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [expanded]);

  function closePlaylist() {
    setExpanded(false);
    playlistButton.current?.focus();
  }

  return <div ref={frame} hidden={!music.visible} data-text-motion-skip
    className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6"
    onKeyDown={event => { if (event.key === "Escape" && expanded) closePlaylist(); }}>
    <audio ref={music.audio} src={tracks[0].src} preload="none" onPlaying={music.onPlaying} onPause={music.onPause} onEnded={music.onEnded} onError={music.onError} />
    {expanded && <section ref={playlist} id="ea-music-playlist" aria-labelledby="ea-music-title"
      className={`${styles.panel} absolute bottom-full right-0 mb-3 max-h-[65svh] w-[min(320px,calc(100vw-2rem))] overflow-y-auto rounded-2xl border p-5 shadow-xl`}>
      <div className="flex items-center justify-between gap-3">
        <h2 id="ea-music-title" className={`${styles.title} text-2xl sm:text-3xl`}>Our soundtrack</h2>
        <button type="button" aria-label="Close playlist" onClick={closePlaylist} className="grid size-11 shrink-0 place-items-center rounded-full"><X size={19} aria-hidden="true" /></button>
      </div>
      <ol className="mt-4 space-y-2">
        {tracks.map((track, index) => <li key={track.src}>
          <button type="button" aria-label={`Play ${track.title}`} aria-current={index === music.activeIndex ? "true" : undefined}
            onClick={() => music.selectTrack(index)}
            className={`${styles.track} flex min-h-14 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm`}>
            <span aria-hidden="true" className="w-4 shrink-0 text-[10px]">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1">{track.title}</span>
            {index === music.activeIndex ? <Check size={16} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          </button>
        </li>)}
      </ol>
      <label className="mt-4 flex items-center gap-3 border-t border-[#d9b9b1] pt-3">
        <Volume2 size={18} aria-hidden="true" /><span className="sr-only">Music volume</span>
        <input type="range" aria-label="Music volume" min="0" max="1" step=".05" value={music.volume} onChange={event => music.changeVolume(Number(event.target.value))} className="min-h-11 min-w-0 flex-1 accent-[#652235]" />
        <span className="w-8 text-right text-[10px] tabular-nums">{Math.round(music.volume * 100)}%</span>
      </label>
    </section>}
    {music.error && <p role="status" className={`${styles.panel} mb-3 w-[min(320px,calc(100vw-2rem))] rounded-xl border px-4 py-3 text-xs leading-6 shadow-lg`}>{music.error}</p>}
    <div role="group" aria-label="Wedding music" className={`${styles.player} flex items-center gap-1 rounded-full border p-1.5 shadow-lg sm:gap-2`}>
      <button type="button" aria-label={music.playing ? "Pause background music" : "Play background music"} onClick={music.toggle} className={`${styles.play} grid size-11 shrink-0 place-items-center rounded-full`}>
        {music.playing ? <Pause size={16} fill="currentColor" aria-hidden="true" /> : <Play size={16} fill="currentColor" aria-hidden="true" />}
      </button>
      <button type="button" aria-label="Previous song" onClick={() => music.step(-1)} className="hidden size-11 shrink-0 place-items-center rounded-full sm:grid"><SkipBack size={17} aria-hidden="true" /></button>
      <p className="hidden max-w-36 truncate px-2 text-xs sm:block" title={tracks[music.activeIndex].title}>{tracks[music.activeIndex].title}</p>
      <button type="button" aria-label="Next song" onClick={() => music.step(1)} className="hidden size-11 shrink-0 place-items-center rounded-full sm:grid"><SkipForward size={17} aria-hidden="true" /></button>
      <button ref={playlistButton} type="button" aria-label={expanded ? "Hide playlist" : "Show playlist"} aria-expanded={expanded} aria-controls="ea-music-playlist" onClick={() => setExpanded(value => !value)} className="grid size-11 shrink-0 place-items-center rounded-full"><ListMusic size={19} aria-hidden="true" /></button>
    </div>
  </div>;
}
