import Image from "next/image";
import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import bow from "../assets/silver-satin-bow.webp";
import { createRibbonRenderer } from "../utils/ribbon-renderer";
import { RIBBON_RELEASE_SECONDS, smooth } from "../utils/ribbon-motion";
import styles from "../styles/opening.module.css";

export default function SatinBow({ releasing, onReleased }: { releasing: boolean; onReleased: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fallback = useRef<HTMLDivElement>(null);
  const renderer = useRef<ReturnType<typeof createRibbonRenderer>>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [mode, setMode] = useState<"loading" | "mesh" | "fallback">("loading");

  useEffect(() => {
    if (!releasing || mode !== "loading") return;
    // A stalled decorative image must not hold the invitation closed.
    const timeout = window.setTimeout(() => setMode("fallback"), 1600);
    return () => clearTimeout(timeout);
  }, [mode, releasing]);

  useEffect(() => {
    if (!image || !canvas.current) return;
    try {
      renderer.current = createRibbonRenderer(canvas.current, image);
    } catch {
      renderer.current = null;
    }
    setMode(renderer.current ? "mesh" : "fallback");
    return () => { renderer.current?.dispose(); renderer.current = null; };
  }, [image]);

  useEffect(() => {
    if (!releasing || mode === "loading") return;
    const controls = animate(0, 1, {
      duration: RIBBON_RELEASE_SECONDS,
      ease: "linear",
      onUpdate(progress) {
        if (renderer.current) {
          renderer.current.draw(progress);
          const handoff = smooth(0, .1, progress);
          if (canvas.current) canvas.current.style.opacity = String(handoff);
          if (fallback.current) fallback.current.style.opacity = String(1 - handoff);
        }
        else if (fallback.current) {
          const drop = Math.pow(Math.max(0, (progress - .5) * 2), 2);
          fallback.current.style.transform = `translateY(${drop * 160}%) rotate(${drop * -6}deg)`;
        }
      },
      onComplete: onReleased,
    });
    return () => controls.stop();
  }, [mode, releasing, onReleased]);

  return (
    <div aria-hidden="true" className={`${styles.ribbon} pointer-events-none absolute inset-0`} data-renderer={mode}>
      <div ref={fallback} className={`${styles.ribbonFallback} absolute inset-0`}>
        <div className={`${styles.ribbonBandLeft} absolute left-0 w-1/2`} />
        <div className={`${styles.ribbonBandRight} absolute right-0 w-1/2`} />
        <div className={`${styles.bow} absolute left-1/2`}>
          <Image src={bow} alt="" priority sizes="min(72.16vw, calc(47.54dvh - 60.85px), 344.4px)" draggable={false}
            onLoad={(event) => { if (mode === "loading") setImage(event.currentTarget); }} onError={() => setMode("fallback")} className="h-full w-full" />
        </div>
      </div>
      <canvas ref={canvas} className={`${styles.ribbonCanvas} absolute inset-x-0 top-0 h-[200%] w-full`} />
    </div>
  );
}
