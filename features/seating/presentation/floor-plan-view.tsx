"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloorPlan } from "./floor-plan";
import { canvasSize } from "./canvas-size";
import { MAX_FLOOR_PLAN_ZOOM } from "./floor-plan-gestures";
import { useFloorPlanGestures } from "./use-floor-plan-gestures";

export function FloorPlanView({ fillWidth = false, expanded = false, initialZoom = 1, onEnlarge, ...props }: ComponentProps<typeof FloorPlan> & { fillWidth?: boolean; expanded?: boolean; initialZoom?: number; onEnlarge?(): void }) {
  const [zoom, setZoom] = useState(initialZoom);
  const viewport = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState({ width: 1000, height: 600 });
  const canvas = canvasSize(props.plan);
  const containedWidth = Math.min(available.width, canvas.width / canvas.height * available.height);
  const baseWidth = fillWidth ? available.width : containedWidth;
  const fitZoom = baseWidth > 0 ? containedWidth / baseWidth : 1;
  const currentZoom = Math.max(fitZoom, Number.isFinite(zoom) ? zoom : 1);
  const controlClass = expanded ? "h-11 min-w-11" : undefined;
  const { changeZoom, handlers } = useFloorPlanGestures({ viewport, enabled: expanded, zoom: currentZoom,
    baseWidth, aspectRatio: canvas.height / canvas.width, minZoom: fitZoom, onZoom: setZoom });
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const measure = () => {
      const width = element.clientWidth, height = expanded ? element.clientHeight : window.innerHeight * 0.65;
      // Hidden or detaching containers can report zero. Keep the last usable
      // measurement so Fit never divides 0 by 0 or stores an invalid zoom.
      if (width <= 0 || height <= 0) return;
      setAvailable({ width, height });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element); window.addEventListener("resize", measure); measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [expanded]);
  useEffect(() => {
    if (!expanded || !viewport.current) return;
    const table = props.plan.tables.find(item => item.id === props.highlightedId);
    const width = viewport.current.firstElementChild?.getBoundingClientRect().width ?? 0;
    if (!width) return;
    viewport.current.scrollTo({
      left: width * (table?.x ?? 50) / 100 - viewport.current.clientWidth / 2,
      top: width * canvas.height / canvas.width * (table?.y ?? 50) / 100 - viewport.current.clientHeight / 2,
    });
  }, [expanded, props.highlightedId, props.plan.tables, baseWidth, canvas.width, canvas.height]);
  return <div className={expanded ? "flex min-h-0 flex-1 flex-col gap-3" : "min-w-0 space-y-2"}>
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button type="button" variant="outline" size="sm" className={controlClass} disabled={currentZoom <= fitZoom} onClick={() => changeZoom(currentZoom - 0.5)} aria-label="Zoom out floor plan">−</Button>
      <span className="text-xs text-ink-muted">{Math.round(currentZoom * 100)}%</span>
      <Button type="button" variant="outline" size="sm" className={controlClass} disabled={currentZoom >= MAX_FLOOR_PLAN_ZOOM} onClick={() => changeZoom(currentZoom + 0.5)} aria-label="Zoom in floor plan">+</Button>
      <Button type="button" variant="outline" size="sm" className={controlClass} onClick={() => changeZoom(fitZoom)}>Fit</Button>
    </div>
    {/* Reserve scrollbar space so zooming cannot resize the viewport and reset a pinch. */}
    <div ref={viewport} {...handlers} className={`relative overscroll-contain rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest ${expanded ? "min-h-0 flex-1 touch-none overflow-scroll" : "max-h-[70vh] overflow-auto"}`} tabIndex={0} aria-label="Scrollable floor plan">
      <div className="mx-auto" style={{ width: baseWidth * currentZoom }}><FloorPlan {...props} /></div>
      {onEnlarge && <button type="button" aria-label="Enlarge floor plan" aria-haspopup="dialog" onClick={onEnlarge} className="absolute inset-0 cursor-zoom-in rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-forest lg:hidden">
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-medium text-forest shadow-sm"><Maximize2 aria-hidden="true" className="size-4" /> Tap to enlarge</span>
      </button>}
    </div>
  </div>;
}
