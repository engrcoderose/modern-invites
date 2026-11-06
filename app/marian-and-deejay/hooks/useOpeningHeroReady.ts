"use client";

import { useEffect, useState, type RefObject } from "react";

const READY_TIMEOUT_MS = 10000;

async function decodeImage(image: HTMLImageElement, signal: AbortSignal) {
  if (signal.aborted) return;
  if (!image.complete) await new Promise<void>((resolve) => {
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
  if (!signal.aborted) await image.decode().catch(() => undefined);
}

export default function useOpeningHeroReady(scope: RefObject<HTMLDivElement | null>, requested: boolean) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!requested || !scope.current) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setReady(true);
      controller.abort();
    }, READY_TIMEOUT_MS);
    const images = [...scope.current.querySelectorAll<HTMLImageElement>("#home img")];
    void Promise.all([...images.map((image) => decodeImage(image, controller.signal)), document.fonts.ready]).then(() => {
      if (controller.signal.aborted) return;
      window.clearTimeout(timeout);
      setReady(true);
    });
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [requested, scope]);
  return ready;
}
