import type { SeatingLandmark, SeatingTable } from "../domain/seating-plan";
import { VENUE_OBJECTS } from "../domain/venue-objects.ts";
import { tableDimensions } from "./table-geometry.ts";

export type FloorObject = SeatingTable | SeatingLandmark;
export type ResizeHandle = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";
export interface MapPoint { x: number; y: number }
export const normalizeRotation = (angle: number) => (Math.round(angle) % 360 + 360) % 360;
const bound = (value: number, min: number, max: number) => Math.round(Math.min(max, Math.max(min, value)));

export function objectSize(item: FloorObject) {
  if ("capacity" in item) {
    const { radiusX, radiusY } = tableDimensions(item.shape, item);
    return { width: radiusX * 2, height: radiusY * 2 };
  }
  return { width: item.width ?? VENUE_OBJECTS[item.kind].width, height: item.height ?? VENUE_OBJECTS[item.kind].height };
}

export function resizeObject(item: FloorObject, handle: ResizeHandle, delta: MapPoint): FloorObject {
  // Project the pointer movement onto the object's axes, so rotated handles
  // resize the same edge the client grabbed. The centre stays fixed.
  const angle = (item.rotation ?? 0) * Math.PI / 180;
  const dx = delta.x * Math.cos(angle) + delta.y * Math.sin(angle);
  const dy = -delta.x * Math.sin(angle) + delta.y * Math.cos(angle);
  const { width, height } = objectSize(item);
  const horizontal = handle.includes("e") ? 1 : handle.includes("w") ? -1 : 0;
  const vertical = handle.includes("s") ? 1 : handle.includes("n") ? -1 : 0;
  const table = "capacity" in item;
  if (table && (item.shape === "round" || item.shape === "square")) {
    const changes = [horizontal ? dx * horizontal : null, vertical ? dy * vertical : null].filter((value): value is number => value !== null);
    const diameter = bound(width + 2 * changes.reduce((sum, value) => sum + value, 0) / changes.length, 60, 200);
    return { ...item, width: diameter, height: diameter };
  }
  return { ...item,
    width: bound(width + dx * horizontal * 2, table ? 60 : 20, table ? 240 : 180),
    height: bound(height + dy * vertical * 2, table ? 40 : 8, table ? 200 : 100),
  };
}

export function rotateObject(item: FloorObject, start: MapPoint, current: MapPoint, snap = false): FloorObject {
  const center = { x: item.x * 10, y: item.y * 7 };
  const angle = (point: MapPoint) => Math.atan2(point.y - center.y, point.x - center.x) * 180 / Math.PI;
  const rotation = (item.rotation ?? 0) + angle(current) - angle(start);
  return { ...item, rotation: normalizeRotation(snap ? Math.round(rotation / 15) * 15 : rotation) };
}
