"use client";

import { useEffect, useState, type RefObject } from "react";

const HERO_READY_TIMEOUT_MS = 10000;

async function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  if (!image.complete) {
    await new Promise<void>((resolve) => {
      const finish = () => {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);
        signal.removeEventListener("abort", finish);
        resolve();
      };
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
      signal.addEventListener("abort", finish, { once: true });
    });
  }
  // A failed image must not strand the guest on the cover.
  if (!signal.aborted) await image.decode().catch(() => undefined);
}

/** Prepare the actual responsive hero images without remounting them at reveal. */
export default function useHeroReady(scope: RefObject<HTMLDivElement | null>, requested: boolean) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!requested || !scope.current) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      // A stalled request must not trap a guest on the finished invitation card.
      setReady(true);
      controller.abort();
    }, HERO_READY_TIMEOUT_MS);
    const images = Array.from(scope.current.querySelectorAll<HTMLImageElement>("#top img"));
    void Promise.all([...images.map((image) => waitForImage(image, controller.signal)), document.fonts.ready]).then(() => {
      if (!controller.signal.aborted) {
        window.clearTimeout(timeout);
        setReady(true);
      }
    });
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [requested, scope]);

  return ready;
}
