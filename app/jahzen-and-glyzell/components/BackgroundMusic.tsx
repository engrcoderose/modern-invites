"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Check, ListMusic, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { musicTracks } from "../data/music";
import useBackgroundMusic from "../hooks/useBackgroundMusic";
import styles from "../styles/invitation.module.css";

export type BackgroundMusicHandle = { play: () => Promise<void> };

export default function BackgroundMusic({ ref, visible }: { ref?: Ref<BackgroundMusicHandle>; visible: boolean }) {
  const music = useBackgroundMusic();
  const [expanded, setExpanded] = useState(false);
  const player = useRef<HTMLDivElement>(null);
  const playlistButton = useRef<HTMLButtonElement>(null);
  const track = musicTracks[music.activeIndex];
  const active = music.status === "playing" || music.status === "loading";
  useImperativeHandle(ref, () => ({ play: music.play }), [music.play]);

  useEffect(() => {
    if (!expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !player.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expanded]);

  function closePlaylist() {
    setExpanded(false);
    playlistButton.current?.focus();
  }

  return <>
    {/* The controller owns later source changes; keep this initial prop stable. */}
    <audio ref={music.audioRef} src={musicTracks[0].src} preload="none" playsInline
      onPlaying={music.onPlaying} onPause={music.onPause} onWaiting={music.onWaiting} onEnded={music.onEnded} onError={music.onError} />
    <div ref={player} hidden={!visible} role="group" aria-label="Invitation music" data-music-status={music.status} data-music-track={music.activeIndex}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6"
      onKeyDown={event => { if (event.key === "Escape" && expanded) { event.preventDefault(); closePlaylist(); } }}>
      <div className={`${styles.musicBar} flex items-center gap-1 rounded-full border p-1.5 sm:gap-2`}>
        <button type="button" onClick={music.toggle} aria-label={active ? "Pause background music" : "Play background music"} aria-pressed={active}
          className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-white/10">
          {active ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => music.skip(-1)} aria-label="Previous song" className="hidden size-11 shrink-0 place-items-center rounded-full hover:bg-white/10 sm:grid"><SkipBack size={17} aria-hidden="true" /></button>
        <div className="hidden min-w-0 max-w-40 sm:block">
          <p className={`${styles.musicCurrentTitle} truncate`} title={track.title}>{track.title}</p>
          <p className={`${styles.musicCurrentArtist} truncate`}>{track.artist}</p>
        </div>
        <button type="button" onClick={() => music.skip(1)} aria-label="Next song" className="hidden size-11 shrink-0 place-items-center rounded-full hover:bg-white/10 sm:grid"><SkipForward size={17} aria-hidden="true" /></button>
        <button ref={playlistButton} type="button" onClick={() => setExpanded(value => !value)} aria-label={expanded ? "Hide playlist" : "Show playlist"}
          aria-expanded={expanded} aria-controls="jg-music-playlist" className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-white/10"><ListMusic size={19} aria-hidden="true" /></button>
      </div>
      <section id="jg-music-playlist" hidden={!expanded} aria-labelledby="jg-playlist-title"
        className={`${styles.musicPanel} absolute bottom-full right-0 mb-3 max-h-[65svh] w-[min(320px,calc(100vw-2rem))] overflow-y-auto rounded-xl p-5`}>
        <div className="flex items-center justify-between gap-3">
          <h2 id="jg-playlist-title" className={styles.musicPanelHeading}>Our soundtrack</h2>
          <button type="button" onClick={closePlaylist} aria-label="Close playlist" className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-black/5"><X size={19} aria-hidden="true" /></button>
        </div>
        <ol className="mt-3 space-y-2">
          {musicTracks.map((song, index) => <li key={song.src}>
            <button type="button" onClick={() => music.selectTrack(index, true)} aria-label={`Play ${song.title} by ${song.artist}`}
              aria-current={index === music.activeIndex ? "true" : undefined} className={`${styles.musicTrack} flex min-h-14 w-full items-center gap-3 rounded-lg px-3 py-3 text-left`}>
              <span className="min-w-0 flex-1"><span className="block text-sm leading-6">{song.title}</span><span className={`${styles.musicTrackArtist} block text-xs leading-5`}>{song.artist}</span></span>
              {index === music.activeIndex ? <Check size={17} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            </button>
          </li>)}
        </ol>
        <label className="mt-4 flex min-h-11 items-center gap-3">
          <Volume2 size={18} aria-hidden="true" /><span className="sr-only">Music volume</span>
          <input aria-label="Music volume" type="range" min="0" max="1" step="0.05" value={music.volume} onChange={event => music.changeVolume(Number(event.target.value))} className="min-h-11 min-w-0 flex-1" />
          <span className="w-9 text-right text-xs tabular-nums">{Math.round(music.volume * 100)}%</span>
        </label>
      </section>
      <p role="status" className={music.error ? `${styles.musicPanel} mt-3 max-w-72 rounded-xl px-4 py-3 text-xs leading-5` : "sr-only"}>
        {music.error ?? (music.status === "playing" ? `Playing ${track.title}.` : music.status === "loading" ? `Loading ${track.title}.` : "Music paused.")}
      </p>
    </div>
  </>;
}
