"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { FloorPlan } from "./floor-plan";
import { canvasSize } from "./canvas-size";

export function FloorPlanView({ fillWidth = false, ...props }: ComponentProps<typeof FloorPlan> & { fillWidth?: boolean }) {
  const [zoom, setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState({ width: 1000, height: 600 });
  const canvas = canvasSize(props.plan);
  const containedWidth = Math.min(available.width, canvas.width / canvas.height * available.height);
  const baseWidth = fillWidth ? available.width : containedWidth;
  const fitZoom = baseWidth > 0 ? containedWidth / baseWidth : 1;
  const currentZoom = Math.max(fitZoom, Number.isFinite(zoom) ? zoom : 1);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const measure = () => {
      const width = element.clientWidth, height = window.innerHeight * 0.65;
      // Hidden or detaching containers can report zero. Keep the last usable
      // measurement so Fit never divides 0 by 0 or stores an invalid zoom.
      if (width <= 0 || height <= 0) return;
      setAvailable({ width, height });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element); window.addEventListener("resize", measure); measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  return <div className="min-w-0 space-y-2">
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button type="button" variant="outline" size="sm" disabled={currentZoom <= fitZoom} onClick={() => setZoom(Math.max(fitZoom, currentZoom - 0.5))} aria-label="Zoom out floor plan">−</Button>
      <span className="text-xs text-ink-muted">{Math.round(currentZoom * 100)}%</span>
      <Button type="button" variant="outline" size="sm" disabled={currentZoom >= 12} onClick={() => setZoom(Math.min(12, currentZoom + 0.5))} aria-label="Zoom in floor plan">+</Button>
      <Button type="button" variant="outline" size="sm" onClick={() => setZoom(fitZoom)}>Fit</Button>
    </div>
    <div ref={viewport} className="max-h-[70vh] overflow-auto overscroll-contain rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest" tabIndex={0} aria-label="Scrollable floor plan">
      <div className="mx-auto" style={{ width: baseWidth * currentZoom }}><FloorPlan {...props} /></div>
    </div>
  </div>;
}
