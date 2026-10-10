"use client";

import { useEffect, useState, type RefObject } from "react";

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
    const images = Array.from(scope.current.querySelectorAll<HTMLImageElement>("#top img"));
    void Promise.all(images.map((image) => waitForImage(image, controller.signal))).then(() => {
      if (!controller.signal.aborted) setReady(true);
    });
    return () => controller.abort();
  }, [requested, scope]);

  return ready;
}
