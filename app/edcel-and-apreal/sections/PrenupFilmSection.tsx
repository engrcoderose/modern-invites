"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { getImageProps } from "next/image";
import { ArrowDown, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useInvitationOpen } from "../components/InvitationState";
import { prenupFilm } from "../data/prenup-film";
import { filmPlayEvent, startInvitationMusic } from "../lib/media-events";
import frameArtwork from "../assets/video/burgundy-floral-lace-frame.webp";
import mobileFrameArtwork from "../assets/video/burgundy-floral-lace-mobile.webp";
import styles from "../styles/prenup-film.module.css";

const frameSrc = getImageProps({ src: frameArtwork, alt: "", width: 1440, height: Math.round(1440 * frameArtwork.height / frameArtwork.width) }).props.src;
const posterSrc = getImageProps({ src: prenupFilm.poster, alt: "", width: 960, height: Math.round(960 * prenupFilm.poster.height / prenupFilm.poster.width) }).props.src;

export default function PrenupFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opened = useInvitationOpen();
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!opened || reducedMotion !== false) {
      video.pause();
      return;
    }
    // Match the established muted opening playback; native controls remain
    // usable when the browser requires another gesture before playing.
    void video.play().catch(() => {});
  }, [opened, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!opened || !video) return;
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }, { threshold: 0 });
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [opened]);

  function playFilm() {
    const video = videoRef.current;
    if (video) void video.play().catch(() => { if (video.error) setFailed(true); });
  }

  return <section id="prenup-film" aria-labelledby="ea-film-title" data-text-motion-skip
    className={`${styles.section} relative isolate min-h-[calc(100svh-64px)] overflow-hidden`}
    style={{ "--film-frame": `url("${frameSrc}")` } as CSSProperties}>
    <h2 id="ea-film-title" tabIndex={-1} className="sr-only">{prenupFilm.title}</h2>
    <div className={styles.frame}>
      <Image src={mobileFrameArtwork} alt="" fill sizes="max(100vw, calc((100svh - 64px) * 0.563))" className={styles.mobileArtwork} />
      <div className={`${styles.player} overflow-hidden bg-[#260d15]`}>
        <video ref={videoRef} src={opened ? prenupFilm.src : undefined} poster={posterSrc}
          autoPlay={opened && reducedMotion === false} muted controls loop playsInline preload="none"
          aria-label={prenupFilm.title} className="block h-full w-full object-contain"
          onPlay={() => { setPaused(false); setFailed(false); window.dispatchEvent(new Event(filmPlayEvent)); }} onPause={() => setPaused(true)} onError={() => setFailed(true)}>
          Your browser does not support embedded video. <a href={prenupFilm.src}>Watch the film preview</a>.
        </video>
        {paused && !failed && <button type="button" onClick={playFilm} aria-label="Play prenup film preview"
          className={`${styles.play} absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:size-16`}>
          <Play size={24} fill="currentColor" strokeWidth={1} aria-hidden="true" />
        </button>}
      </div>
    </div>
    {failed && <p role="status" className="absolute inset-x-4 bottom-24 z-10 mx-auto max-w-md bg-[#401522] px-4 py-3 text-center text-sm text-[#f8f0e5]">The film could not load. You can <a href={prenupFilm.src} className="underline underline-offset-4">open the preview</a> or continue to the invitation below.</p>}
    <noscript><p className="absolute inset-x-4 bottom-24 z-10 text-center text-sm"><a href={prenupFilm.src} className="underline underline-offset-4">Watch the film preview</a></p></noscript>
    <a href="#home" onClick={() => { videoRef.current?.pause(); startInvitationMusic(); }} className={`${styles.continue} absolute bottom-5 left-1/2 z-10 flex min-h-11 -translate-x-1/2 items-center justify-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-[10px] uppercase tracking-[.15em] sm:bottom-6 sm:text-xs`}>
      Continue to our invitation<ArrowDown size={18} strokeWidth={1} aria-hidden="true" />
    </a>
  </section>;
}
