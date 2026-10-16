"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_CANVAS, MAX_CANVAS_SIZE, type SeatingPlan } from "../domain/seating-plan";
import { canvasSize, resizeCanvas } from "./canvas-size";

export function CanvasControls({ plan, disabled, onChange }: { plan: SeatingPlan; disabled: boolean; onChange(plan: SeatingPlan): void }) {
  const size = canvasSize(plan);
  const [width, setWidth] = useState(String(size.width));
  const [height, setHeight] = useState(String(size.height));
  const [message, setMessage] = useState("");
  function apply(next: { width: number; height: number }) {
    const resized = resizeCanvas(plan, next);
    if (!resized) { setMessage("Use whole numbers within the limits. To make the room smaller, first move objects inside its new edges."); return; }
    onChange(resized); setWidth(String(next.width)); setHeight(String(next.height)); setMessage("");
  }
  return <details className="rounded-xl border bg-white p-3">
    <summary className="cursor-pointer text-sm font-medium text-forest focus-visible:outline-forest">Canvas size · {size.width} × {size.height}</summary>
    <fieldset disabled={disabled} className="mt-3 space-y-3 disabled:opacity-60"><legend className="sr-only">Venue canvas dimensions</legend>
      <p className="text-xs leading-5 text-ink-muted">Extend the room for a larger venue. Objects keep their size and position. Dimensions use floor plan units.</p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-0 flex-col gap-1 text-sm">Width<Input className="w-28" type="number" min={DEFAULT_CANVAS.width} max={MAX_CANVAS_SIZE} step={100} value={width} onChange={event => setWidth(event.target.value)} /></label>
        <label className="flex min-w-0 flex-col gap-1 text-sm">Height<Input className="w-28" type="number" min={DEFAULT_CANVAS.height} max={MAX_CANVAS_SIZE} step={100} value={height} onChange={event => setHeight(event.target.value)} /></label>
        <Button type="button" variant="outline" onClick={() => apply({ width: Number(width), height: Number(height) })}>Apply size</Button>
        <Button type="button" variant="outline" disabled={size.width >= MAX_CANVAS_SIZE} onClick={() => apply({ ...size, width: Math.min(MAX_CANVAS_SIZE, size.width + 500) })}>Extend right +500</Button>
        <Button type="button" variant="outline" disabled={size.height >= MAX_CANVAS_SIZE} onClick={() => apply({ ...size, height: Math.min(MAX_CANVAS_SIZE, size.height + 500) })}>Extend down +500</Button>
      </div>
      <p className="text-xs text-ink-muted">Width 1,000–6,000 · Height 700–6,000</p>
    </fieldset>
    {message && <p role="alert" className="mt-3 text-sm text-destructive">{message}</p>}
  </details>;
}
