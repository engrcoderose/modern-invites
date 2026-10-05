"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { RotateCw } from "lucide-react";
import { normalizeRotation, objectSize, resizeObject, rotateObject, type FloorObject, type MapPoint, type ResizeHandle } from "./object-transform";

const handles: { id: ResizeHandle; x: number; y: number; name: string }[] = [
  { id: "nw", x: -1, y: -1, name: "top left" }, { id: "n", x: 0, y: -1, name: "top" },
  { id: "ne", x: 1, y: -1, name: "top right" }, { id: "e", x: 1, y: 0, name: "right" },
  { id: "se", x: 1, y: 1, name: "bottom right" }, { id: "s", x: 0, y: 1, name: "bottom" },
  { id: "sw", x: -1, y: 1, name: "bottom left" }, { id: "w", x: -1, y: 0, name: "left" },
];

export function ObjectTransformHandles({ item, scale, position, onChange }: {
  item: FloorObject; scale: number; position(event: PointerEvent<SVGGElement>): MapPoint | null; onChange(item: FloorObject): void;
}) {
  const gesture = useRef<{ item: FloorObject; start: MapPoint; handle: ResizeHandle | "rotate" } | undefined>(undefined);
  const size = objectSize(item);
  const table = "capacity" in item;
  const uniform = table && (item.shape === "round" || item.shape === "square");
  const padding = table ? 24 : 8;
  const rx = Math.max(size.width / 2 + padding, 24 * scale), ry = Math.max(size.height / 2 + padding, 24 * scale);
  const controls = handles.filter(handle => handle.x && handle.y || !uniform && (handle.x === 0 ? rx : ry) >= 44 * scale);
  // Prefer the top handle, but keep it reachable near the room's edges.
  const angle = (item.rotation ?? 0) * Math.PI / 180;
  const rotationHandle = [
    { x: 0, y: -ry - 34 * scale, edgeX: 0, edgeY: -ry },
    { x: 0, y: ry + 34 * scale, edgeX: 0, edgeY: ry },
    { x: rx + 34 * scale, y: 0, edgeX: rx, edgeY: 0 },
    { x: -rx - 34 * scale, y: 0, edgeX: -rx, edgeY: 0 },
  ].find(point => {
    const x = item.x * 10 + point.x * Math.cos(angle) - point.y * Math.sin(angle);
    const y = item.y * 7 + point.x * Math.sin(angle) + point.y * Math.cos(angle);
    return x >= 22 * scale && x <= 1000 - 22 * scale && y >= 22 * scale && y <= 700 - 22 * scale;
  }) ?? { x: 0, y: -ry - 34 * scale, edgeX: 0, edgeY: -ry };

  function start(event: PointerEvent<SVGGElement>, handle: ResizeHandle | "rotate") {
    if (event.button !== 0) return;
    const point = position(event);
    if (!point) return;
    event.preventDefault(); event.stopPropagation();
    event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { item, start: point, handle };
  }
  function move(event: PointerEvent<SVGGElement>) {
    const active = gesture.current, point = position(event);
    if (!active || !point || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.stopPropagation();
    onChange(active.handle === "rotate" ? rotateObject(active.item, active.start, point, event.shiftKey)
      : resizeObject(active.item, active.handle, { x: point.x - active.start.x, y: point.y - active.start.y }));
  }
  function stop(event: PointerEvent<SVGGElement>) {
    event.stopPropagation(); gesture.current = undefined;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyboard(event: KeyboardEvent<SVGGElement>, handle: ResizeHandle | "rotate") {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    const increase = event.key === "ArrowRight" || event.key === "ArrowUp";
    const step = (increase ? 1 : -1) * (event.shiftKey ? 15 : 2);
    if (handle === "rotate") onChange({ ...item, rotation: event.key === "Home" ? 0 : normalizeRotation((item.rotation ?? 0) + step) });
    else if (event.key !== "Home") {
      const angle = (item.rotation ?? 0) * Math.PI / 180;
      const dx = handle.includes("e") ? step : handle.includes("w") ? -step : 0;
      const dy = handle.includes("s") ? step : handle.includes("n") ? -step : 0;
      onChange(resizeObject(item, handle, { x: dx * Math.cos(angle) - dy * Math.sin(angle), y: dx * Math.sin(angle) + dy * Math.cos(angle) }));
    }
  }
  const interaction = (handle: ResizeHandle | "rotate") => ({
    tabIndex: 0, role: "slider" as const,
    onPointerDown: (event: PointerEvent<SVGGElement>) => start(event, handle), onPointerMove: move,
    onPointerUp: stop, onPointerCancel: stop,
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => keyboard(event, handle),
    onClick: (event: React.MouseEvent<SVGGElement>) => event.stopPropagation(),
  });
  return <g transform={`translate(${item.x * 10} ${item.y * 7}) rotate(${item.rotation ?? 0})`} aria-label={`Adjust ${item.name}`}>
    <rect x={-rx} y={-ry} width={rx * 2} height={ry * 2} rx="5" fill="none" stroke="#173d32" strokeDasharray="5 4" pointerEvents="none" />
    <path d={`M ${rotationHandle.edgeX} ${rotationHandle.edgeY} L ${rotationHandle.x} ${rotationHandle.y}`} stroke="#173d32" strokeDasharray="4 3" pointerEvents="none" />
    <g transform={`translate(${rotationHandle.x} ${rotationHandle.y}) scale(${scale})`} {...interaction("rotate")} aria-label={`Rotate ${item.name}`} aria-valuemin={0} aria-valuemax={359} aria-valuenow={item.rotation ?? 0} aria-valuetext={`${item.rotation ?? 0} degrees. Arrow keys rotate; Shift snaps in 15 degree steps; Home resets.`} className="cursor-grab focus:outline-none focus:[&>circle]:stroke-[4px] active:cursor-grabbing">
      <title>Drag to rotate. Hold Shift to snap.</title><circle r="22" fill="transparent" /><circle r="12" fill="white" stroke="#173d32" strokeWidth="2" /><RotateCw x="-8" y="-8" width="16" height="16" color="#173d32" pointerEvents="none" />
    </g>
    {controls.map(handle => <g key={handle.id} transform={`translate(${rx * handle.x} ${ry * handle.y}) scale(${scale})`} {...interaction(handle.id)} aria-label={`Resize ${item.name} ${handle.name}`} aria-valuemin={table ? handle.x ? 60 : 40 : handle.x ? 20 : 8} aria-valuemax={table ? uniform || !handle.x ? 200 : 240 : handle.x ? 180 : 100} aria-valuenow={handle.x ? size.width : size.height} aria-valuetext={`${size.width} by ${size.height}. Arrow keys adjust size.`} className="cursor-pointer focus:outline-none focus:[&>circle]:stroke-[4px]">
      <title>Drag to resize{uniform ? " evenly" : ""}</title><circle r="22" fill="transparent" /><circle r="6" fill="white" stroke="#173d32" strokeWidth="2" />
    </g>)}
  </g>;
}
