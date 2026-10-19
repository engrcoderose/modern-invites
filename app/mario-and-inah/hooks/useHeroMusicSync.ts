"use client";

import { useLayoutEffect, type RefObject } from "react";
import type { BackgroundMusicHandle } from "../components/BackgroundMusic";

// A slow or unavailable song must not leave event details waiting indefinitely.
const maximumMusicStallMs = 2000;

export default function useHeroMusicSync(
  root: RefObject<HTMLDivElement | null>,
  music: RefObject<BackgroundMusicHandle | null>,
  opened: boolean,
) {
  useLayoutEffect(() => {
    if (!opened) return;
    const audio = music.current?.getAudio();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Direct links, blocked playback and reduced motion retain the readable CSS fallback.
    if (!audio || audio.paused || audio.error || preference.matches) return;
    const animations = root.current?.querySelector("[data-hero-copy]")?.getAnimations({ subtree: true })
      .filter(animation => animation instanceof CSSAnimation && animation.animationName.includes("mi-hero-")) ?? [];
    if (!animations.length) return;

    const endTime = Math.max(...animations.map(animation => Number(animation.effect?.getComputedTiming().endTime ?? 0)));
    let frame = 0;
    let stopped = false;
    let lastMediaTime = audio.currentTime;
    let lastProgress = performance.now();
    animations.forEach(animation => animation.pause());

    function finish() {
      stopped = true;
      cancelAnimationFrame(frame);
      animations.forEach(animation => { if (animation.playState !== "idle") animation.finish(); });
    }

    function resumeWithoutMusic() {
      stopped = true;
      cancelAnimationFrame(frame);
      animations.forEach(animation => { if (animation.playState === "paused") animation.play(); });
    }

    function sync(now: number) {
      if (stopped) return;
      // Pausing the song reveals the remaining details rather than freezing them out.
      if (preference.matches || audio!.paused) { finish(); return; }
      if (audio!.error) { resumeWithoutMusic(); return; }
      const mediaTime = audio!.currentTime;
      if (mediaTime !== lastMediaTime) {
        lastMediaTime = mediaTime;
        lastProgress = now;
      } else if (now - lastProgress >= maximumMusicStallMs) {
        resumeWithoutMusic();
        return;
      }
      if (mediaTime * 1000 >= endTime) { finish(); return; }
      // Seek the existing CSS entrances to the actual song position, including
      // time spent on the cover, buffering and returning from a background tab.
      animations.forEach(animation => {
        if (animation.playState !== "idle") animation.currentTime = mediaTime * 1000;
      });
      frame = requestAnimationFrame(sync);
    }

    audio.addEventListener("pause", finish);
    audio.addEventListener("error", resumeWithoutMusic);
    preference.addEventListener("change", finish);
    sync(performance.now());

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      audio.removeEventListener("pause", finish);
      audio.removeEventListener("error", resumeWithoutMusic);
      preference.removeEventListener("change", finish);
      animations.forEach(animation => { if (animation.playState === "paused") animation.play(); });
    };
  }, [music, opened, root]);
}
