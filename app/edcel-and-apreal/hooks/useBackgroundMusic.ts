"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInvitationOpen } from "../components/InvitationState";
import { musicTracks as tracks } from "../data/music";
import { filmPlayEvent, musicStartEvent } from "../lib/media-events";

export default function useBackgroundMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const opened = useInvitationOpen();
  const allowed = useRef(false);
  const wantsPlayback = useRef(false);
  const manuallyPaused = useRef(false);
  const request = useRef(0);
  const active = useRef(0);
  const [available, setAvailable] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(.4);
  const [error, setError] = useState<string | null>(null);

  const pause = useCallback(() => {
    wantsPlayback.current = false;
    request.current += 1;
    audio.current?.pause();
    setPlaying(false);
  }, []);

  const play = useCallback(async () => {
    const player = audio.current;
    if (!player || !allowed.current) return;
    const currentRequest = ++request.current;
    wantsPlayback.current = true;
    setError(null);
    if (player.error) player.load();
    document.querySelectorAll<HTMLVideoElement>("#prenup-film video").forEach(video => video.pause());
    try {
      await player.play();
    } catch (cause) {
      if (currentRequest !== request.current || !wantsPlayback.current) return;
      wantsPlayback.current = false;
      setPlaying(false);
      setError(cause instanceof DOMException && cause.name === "NotAllowedError"
        ? "Tap play to start the music."
        : "This song could not play. Try again or choose another song.");
    }
  }, []);

  function selectTrack(index: number, shouldPlay = true) {
    const player = audio.current;
    if (!player) return;
    const next = (index + tracks.length) % tracks.length;
    pause();
    active.current = next;
    setActiveIndex(next);
    setError(null);
    player.src = tracks[next].src;
    player.load();
    if (shouldPlay) {
      manuallyPaused.current = false;
      void play();
    }
  }

  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = .4;
    return () => { request.current += 1; wantsPlayback.current = false; player?.pause(); };
  }, []);

  useEffect(() => {
    if (!opened) return;
    const start = () => {
      allowed.current = true;
      setAvailable(true);
      if (!manuallyPaused.current && !wantsPlayback.current) void play();
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) start();
    }, { threshold: .15 });
    const hero = document.getElementById("home");
    if (hero) observer.observe(hero);
    window.addEventListener(musicStartEvent, start);
    window.addEventListener(filmPlayEvent, pause);
    return () => {
      observer.disconnect();
      window.removeEventListener(musicStartEvent, start);
      window.removeEventListener(filmPlayEvent, pause);
    };
  }, [opened, pause, play]);

  return {
    audio, activeIndex, playing, volume, error, visible: opened && available,
    selectTrack,
    step: (direction: number) => selectTrack(active.current + direction, wantsPlayback.current),
    toggle: () => {
      if (wantsPlayback.current) { manuallyPaused.current = true; pause(); }
      else { manuallyPaused.current = false; void play(); }
    },
    changeVolume: (value: number) => {
      setVolume(value);
      if (audio.current) audio.current.volume = value;
    },
    onPlaying: () => {
      if (!allowed.current || !wantsPlayback.current) audio.current?.pause();
      else setPlaying(true);
    },
    onPause: () => setPlaying(false),
    onEnded: () => { if (wantsPlayback.current) selectTrack(active.current + 1); },
    onError: () => { pause(); setError("This song is unavailable. Try again or choose another song."); },
  };
}
