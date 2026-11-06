"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PrenupFilmProps = { src: string; poster: string; label: string };

export default function PrenupFilm({ src, poster, label }: PrenupFilmProps) {
  const video = useRef<HTMLVideoElement>(null);
  const starting = useRef(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) player.pause();
    }, { threshold: 0.1 });
    const pauseWhenHidden = () => { if (document.hidden) player.pause(); };
    observer.observe(player);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      player.pause();
    };
  }, []);

  async function start() {
    const player = video.current;
    if (!player || starting.current) return;
    starting.current = true;
    setFailed(false);
    setLoading(true);
    setStarted(true);
    player.controls = true;
    if (failed) player.load();
    try {
      await player.play();
      player.focus({ preventScroll: true });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setFailed(true);
        setStarted(false);
      }
      setLoading(false);
    } finally { starting.current = false; }
  }

  return (
    <div>
      <div className="mj-film-frame relative mx-auto aspect-video overflow-hidden">
        <video ref={video} src={src} poster={poster} controls={started} playsInline preload="none" aria-label={label} tabIndex={started ? 0 : -1}
          className="block h-full w-full bg-black object-contain" aria-busy={loading}
          onPlaying={() => { setLoading(false); setFailed(false); }}
          onWaiting={() => setLoading(true)} onCanPlay={() => setLoading(false)}
          onPause={() => setLoading(false)}
          onEnded={() => { setStarted(false); setLoading(false); }}
          onError={() => { setFailed(true); setStarted(false); setLoading(false); }}>
          Your browser cannot display this video. <a href={src}>Open the prenup film</a>.
        </video>
        {!started && <button type="button" onClick={() => void start()} aria-label={failed ? "Retry playing the prenup film" : "Play Marian and Dee Jay’s prenup film"}
          className="mj-film-start absolute inset-0 flex h-full w-full items-center justify-center">
          <span className="mj-film-play flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"><Play size={27} fill="currentColor" strokeWidth={1.5} className="ml-1" aria-hidden="true" /></span>
        </button>}
        {loading && <span role="status" className="mj-film-loading pointer-events-none absolute inset-0 flex items-center justify-center text-sm">Loading film…</span>}
      </div>
      {failed && <p role="alert" className="mx-auto mt-4 max-w-lg text-center text-sm leading-6">The film couldn’t play. Try the Play button again, or <a href={src} className="underline underline-offset-4">open the video</a>.</p>}
    </div>
  );
}
