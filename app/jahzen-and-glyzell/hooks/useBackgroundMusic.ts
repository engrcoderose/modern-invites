"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { musicTracks } from "../data/music";

type PlaybackStatus = "paused" | "loading" | "playing" | "failed";
const initialVolume = .4;

export default function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const selected = useRef(0);
  const wantsPlayback = useRef(false);
  const playRequest = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<PlaybackStatus>("paused");
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(initialVolume);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = initialVolume;
    return () => {
      wantsPlayback.current = false;
      playRequest.current += 1;
      audio?.pause();
    };
  }, []);

  const pause = useCallback(() => {
    wantsPlayback.current = false;
    playRequest.current += 1;
    audioRef.current?.pause();
    setStatus("paused");
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || (!audio.paused && wantsPlayback.current)) return;
    const request = ++playRequest.current;
    wantsPlayback.current = true;
    setError(null);
    setStatus("loading");
    if (audio.error) audio.load();
    try {
      await audio.play();
    } catch (cause) {
      if (request !== playRequest.current || !wantsPlayback.current) return;
      wantsPlayback.current = false;
      setStatus("failed");
      setError(cause instanceof DOMException && cause.name === "NotAllowedError"
        ? "Tap play to start the music."
        : "This song couldn’t play. Try again or choose another song.");
    }
  }, []);

  const selectTrack = useCallback((index: number, shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = (index + musicTracks.length) % musicTracks.length;
    pause();
    selected.current = next;
    setActiveIndex(next);
    setError(null);
    // Source changes and play stay inside the same gesture for mobile browsers.
    audio.src = musicTracks[next].src;
    audio.load();
    if (shouldPlay) void play();
  }, [pause, play]);

  function onPlaying() {
    if (!audioRef.current || audioRef.current.paused || audioRef.current.readyState < 2) return;
    if (!wantsPlayback.current) { audioRef.current?.pause(); return; }
    setStatus("playing");
  }

  function onError() {
    if (!audioRef.current?.error) return;
    wantsPlayback.current = false;
    playRequest.current += 1;
    setStatus("failed");
    setError("This song is unavailable. Try again or choose another song.");
  }

  return {
    audioRef, activeIndex, status, error, volume, play, pause, selectTrack, onPlaying, onError,
    toggle: () => { if (wantsPlayback.current) pause(); else void play(); },
    skip: (direction: number) => selectTrack(selected.current + direction, wantsPlayback.current),
    onPause: () => { if (audioRef.current?.paused && !audioRef.current.error) setStatus("paused"); },
    onWaiting: () => { if (wantsPlayback.current) setStatus("loading"); },
    onEnded: () => { if (wantsPlayback.current) selectTrack(selected.current + 1, true); },
    changeVolume: (value: number) => {
      const next = Math.max(0, Math.min(1, value));
      setVolume(next);
      if (audioRef.current) audioRef.current.volume = next;
    },
  };
}
