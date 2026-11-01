"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useAnimationControls } from "framer-motion";
import { envelopeHoldMs } from "./envelopeMotion";

type OpeningPhase = "closed" | "preparing" | "opening" | "holding" | "exiting";

export default function useEnvelopeOpening({ opening, reducedMotion, onOpened, cover }: {
  opening: boolean;
  reducedMotion: boolean;
  onOpened: () => void;
  cover: RefObject<HTMLDivElement | null>;
}) {
  const paper = useAnimationControls();
  const exit = useAnimationControls();
  const [phase, setPhase] = useState<OpeningPhase>("closed");
  const prepared = useRef(false);
  const holdStarted = useRef<number | null>(null);

  useEffect(() => {
    if (!opening) return;
    let cancelled = false;
    let preparationTimer: ReturnType<typeof setTimeout> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    async function run() {
      if (!prepared.current) {
        setPhase("preparing");
        const images = Array.from(cover.current?.querySelectorAll("img") ?? []);
        await Promise.race([
          Promise.allSettled([...images.map(image => image.decode()), document.fonts.ready]),
          new Promise<void>(resolve => { preparationTimer = setTimeout(resolve, 2000); }),
        ]);
        clearTimeout(preparationTimer);
        if (cancelled) return;
        prepared.current = true;
      }

      if (reducedMotion || holdStarted.current !== null) {
        paper.set("opened");
      } else {
        setPhase("opening");
        await paper.start("opened");
      }
      if (cancelled) return;

      setPhase("holding");
      if (holdStarted.current === null) {
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        if (cancelled) return;
        holdStarted.current = performance.now();
      }
      const remaining = Math.max(0, envelopeHoldMs - (performance.now() - holdStarted.current));
      await new Promise<void>(resolve => { holdTimer = setTimeout(resolve, remaining); });
      if (cancelled) return;

      setPhase("exiting");
      await exit.start("exited");
      if (!cancelled) onOpened();
    }

    void run();
    return () => {
      cancelled = true;
      clearTimeout(preparationTimer);
      clearTimeout(holdTimer);
      paper.stop();
      exit.stop();
    };
  }, [opening, reducedMotion, onOpened, cover, paper, exit]);

  return { paper, exit, phase };
}
