"use client";

import { useEffect, useLayoutEffect, useRef, type PointerEvent, type RefObject } from "react";
import { FloorPlanGesture, MAX_FLOOR_PLAN_ZOOM, zoomAtPoint, type GestureViewport, type ZoomPosition } from "./floor-plan-gestures";

export function useFloorPlanGestures({ viewport, enabled, zoom, baseWidth, aspectRatio, minZoom, onZoom }: {
  viewport: RefObject<HTMLDivElement | null>; enabled: boolean; zoom: number; baseWidth: number;
  aspectRatio: number; minZoom: number; onZoom(zoom: number): void;
}) {
  const gesture = useRef(new FloorPlanGesture());
  const pending = useRef<ZoomPosition | null>(null);
  const frame = useRef<number | undefined>(undefined);

  function readView(): GestureViewport | null {
    const element = viewport.current;
    if (!element || !baseWidth || !element.clientWidth || !element.clientHeight) return null;
    return { zoom: pending.current?.zoom ?? zoom, left: pending.current?.left ?? element.scrollLeft,
      top: pending.current?.top ?? element.scrollTop, width: element.clientWidth, height: element.clientHeight,
      baseWidth, aspectRatio, minZoom };
  }

  function queue(next: ZoomPosition) {
    pending.current = next;
    if (frame.current !== undefined) return;
    // Coalesce both fingers' pointer updates into one render per painted frame.
    frame.current = requestAnimationFrame(() => {
      frame.current = undefined;
      const next = pending.current;
      const element = viewport.current;
      if (!next || !element) return;
      onZoom(next.zoom);
      // Panning at the same scale does not trigger a React commit.
      if (Math.abs((element.firstElementChild?.getBoundingClientRect().width ?? 0) - baseWidth * next.zoom) < 0.5) {
        element.scrollTo({ left: next.left, top: next.top });
        pending.current = null;
      }
    });
  }

  useLayoutEffect(() => {
    const next = pending.current;
    if (enabled && next && next.zoom === zoom && viewport.current) {
      // Scroll after React has resized the SVG, so the browser does not clamp
      // the focal point against the previous, smaller drawing.
      viewport.current.scrollTo({ left: next.left, top: next.top });
      pending.current = null;
    }
  }, [enabled, zoom, baseWidth, viewport]);

  useEffect(() => {
    const currentGesture = gesture.current;
    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
      frame.current = undefined;
      pending.current = null;
      currentGesture.reset();
    };
  }, [enabled, baseWidth, aspectRatio]);

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };
  function end(event: PointerEvent<HTMLDivElement>) {
    const view = readView();
    if (view) gesture.current.up(event.pointerId, view);
  }

  return {
    changeZoom(next: number) {
      const view = enabled ? readView() : null;
      gesture.current.reset();
      if (view) queue(zoomAtPoint(view, next, { x: view.width / 2, y: view.height / 2 }));
      else onZoom(Math.max(minZoom, Math.min(MAX_FLOOR_PLAN_ZOOM, next)));
    },
    handlers: enabled ? {
      onPointerDown(event: PointerEvent<HTMLDivElement>) {
        const view = readView();
        if (event.pointerType !== "touch" || !view) return;
        if (gesture.current.down(event.pointerId, point(event), view)) {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      },
      onPointerMove(event: PointerEvent<HTMLDivElement>) {
        const view = readView();
        if (event.pointerType !== "touch" || !view) return;
        const next = gesture.current.move(event.pointerId, point(event), view);
        if (next) { event.preventDefault(); queue(next); }
      },
      onPointerUp: end,
      onLostPointerCapture: end,
      onPointerCancel() { gesture.current.reset(); },
    } : {},
  };
}
