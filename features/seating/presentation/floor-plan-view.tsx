"use client";

import { useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { FloorPlan } from "./floor-plan";

export function FloorPlanView(props: ComponentProps<typeof FloorPlan>) {
  const [zoom, setZoom] = useState(1);
  return <div className="min-w-0 space-y-2">
    <div className="flex items-center justify-end gap-2">
      <Button type="button" variant="outline" size="sm" disabled={zoom <= 1} onClick={() => setZoom(value => Math.max(1, value - 0.5))} aria-label="Zoom out floor plan">−</Button>
      <span className="text-xs text-ink-muted">{Math.round(zoom * 100)}%</span>
      <Button type="button" variant="outline" size="sm" disabled={zoom >= 3} onClick={() => setZoom(value => Math.min(3, value + 0.5))} aria-label="Zoom in floor plan">+</Button>
      <Button type="button" variant="outline" size="sm" onClick={() => setZoom(1)}>Fit</Button>
    </div>
    <div className={`overflow-auto rounded-xl ${zoom > 1 ? "max-h-[70vh]" : ""}`} tabIndex={0} aria-label="Scrollable floor plan">
      <div style={{ width: `${zoom * 100}%` }}><FloorPlan {...props} /></div>
    </div>
  </div>;
}
