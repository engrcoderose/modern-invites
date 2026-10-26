"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PhotoAlbum } from "../domain/photo-sharing";
import { browserAlbumRepository } from "../infrastructure/browser-album-repository";
import { createDemoAlbum } from "../infrastructure/demo-album";

const CHANNEL = "modern-invites-photo-demo";

export function useDemoAlbum() {
  const [album, setAlbum] = useState<PhotoAlbum>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const channel = useRef<BroadcastChannel | undefined>(undefined);

  const reload = useCallback(async () => {
    try { setAlbum(await browserAlbumRepository.load()); setError(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Couldn’t open the demo album. Reload to try again."); }
  }, []);

  useEffect(() => {
    void reload();
    if (typeof BroadcastChannel !== "undefined") {
      channel.current = new BroadcastChannel(CHANNEL);
      channel.current.onmessage = () => { if (!locked.current) void reload(); };
    }
    const onFocus = () => { if (!locked.current) void reload(); };
    window.addEventListener("focus", onFocus);
    return () => { channel.current?.close(); window.removeEventListener("focus", onFocus); };
  }, [reload]);

  const update = useCallback(async (change: (current: PhotoAlbum) => PhotoAlbum) => {
    if (locked.current) return false;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      // Re-read before writing so ordinary navigation never overwrites newer demo changes.
      const current = await browserAlbumRepository.load();
      const next = change(current);
      await browserAlbumRepository.save(next);
      setAlbum(next);
      channel.current?.postMessage("changed");
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The change wasn’t saved. Please try again.");
      return false;
    } finally { locked.current = false; setBusy(false); }
  }, []);

  return { album, error, busy, update, reload, reset: () => update(() => createDemoAlbum()) };
}
