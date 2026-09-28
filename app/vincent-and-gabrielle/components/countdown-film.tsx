"use client";

import { useEffect, useRef, useState } from "react";
import { useIsPresent } from "framer-motion";
import { wedding } from "../data";

export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    if (!wedding.ceremonyISO) return;
    const target = new Date(wedding.ceremonyISO).getTime();
    if (!Number.isFinite(target)) return;
    const update = () => setRemaining(Math.max(0, target - Date.now()));
    update();
    if (Date.now() >= target) return;
    const interval = window.setInterval(() => {
      update();
      if (Date.now() >= target) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const seconds = Math.floor((remaining ?? 0) / 1000);
  const units = [
    [Math.floor(seconds / 86400), "Days"],
    [Math.floor(seconds / 3600) % 24, "Hours"],
    [Math.floor(seconds / 60) % 60, "Minutes"],
    [seconds % 60, "Seconds"],
  ] as const;
  return (
    <div
      className="vg-countdown grid w-full max-w-[520px] grid-cols-4 gap-5 py-3 [@media(max-width:700px)]:gap-3"
      role="timer"
      aria-label={wedding.ceremonyISO ? `Countdown to ${wedding.date} at ${wedding.ceremonyTime}` : "Wedding date to be announced"}
      aria-live="off"
    >
      {units.map(([value, label], index) => (
        <div key={label} className="relative min-w-0 text-center">
          {index > 0 && (
            <span
              aria-hidden="true"
              className="absolute -left-3 top-0 text-[30px] leading-none opacity-40 [@media(max-width:700px)]:-left-2 [@media(max-width:700px)]:text-[24px]"
            >
              :
            </span>
          )}
          <span className="block text-[46px] leading-none tabular-nums [@media(max-width:700px)]:text-[32px]">
            {remaining === null ? "—" : String(value).padStart(2, "0")}
          </span>
          <span className="mt-3 block text-[9px] uppercase tracking-[0.15em] [@media(max-width:700px)]:text-[7px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SaveTheDateFilm({
  ready,
  onPlay,
}: {
  ready: boolean;
  onPlay: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const present = useIsPresent();

  useEffect(() => {
    const film = video.current;
    if (!film) return;
    if (!ready || !present) {
      film.pause();
      return;
    }
    let cancelled = false;
    void film
      .play()
      .then(() => {
        if (cancelled) film.pause();
      })
      .catch(() => {
        // Native controls remain available if the browser blocks autoplay.
      });
    return () => {
      cancelled = true;
      film.pause();
    };
  }, [ready, present]);

  return (
    <figure className="vg-film-frame relative shrink-0 p-2">
      {wedding.saveTheDateVideo.src ? <video
        ref={video}
        onPlay={onPlay}
        src={wedding.saveTheDateVideo.src}
        poster={wedding.saveTheDateVideo.poster}
        aria-label={`${wedding.title} — save-the-date video`}
        className="block h-full w-full bg-black object-contain"
        controls
        autoPlay={ready && present}
        playsInline
        preload="metadata"
      /> : <div className="flex h-full w-full items-center justify-center bg-[#e8e4d7] px-5 text-center text-sm text-[#646650]">Save-the-date video to follow</div>}
    </figure>
  );
}

