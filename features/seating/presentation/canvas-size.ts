import { DEFAULT_CANVAS, canvasSchema, type SeatingPlan } from "../domain/seating-plan.ts";
import { objectSize, type FloorObject } from "./object-transform.ts";

export function canvasSize(plan: SeatingPlan) {
  return plan.canvas ?? DEFAULT_CANVAS;
}

export function objectPosition(item: Pick<FloorObject, "x" | "y">, canvas = DEFAULT_CANVAS) {
  return { x: item.x / 100 * canvas.width, y: item.y / 100 * canvas.height };
}

export function objectBounds(item: FloorObject) {
  const size = objectSize(item);
  const angle = (item.rotation ?? 0) * Math.PI / 180;
  const padding = "capacity" in item ? 24 : 30;
  return {
    x: Math.abs(Math.cos(angle)) * size.width / 2 + Math.abs(Math.sin(angle)) * size.height / 2 + padding,
    y: Math.abs(Math.sin(angle)) * size.width / 2 + Math.abs(Math.cos(angle)) * size.height / 2 + padding,
  };
}

// Keep all object centres, dimensions, rotations and seat assignments stationary.
// Shrinking is refused if it would cut off any object; growing is always safe.
export function resizeCanvas(plan: SeatingPlan, next: { width: number; height: number }): SeatingPlan | null {
  if (!canvasSchema.safeParse(next).success) return null;
  const previous = canvasSize(plan);
  if ([...plan.tables, ...plan.landmarks].some(item => {
    const point = objectPosition(item, previous), bounds = objectBounds(item);
    return next.width < previous.width && point.x + bounds.x > next.width - 20
      || next.height < previous.height && point.y + bounds.y > next.height - 20;
  })) return null;
  const move = <T extends FloorObject>(item: T): T => ({ ...item,
    x: item.x * previous.width / next.width, y: item.y * previous.height / next.height,
  });
  return { ...plan, canvas: next, tables: plan.tables.map(move), landmarks: plan.landmarks.map(move) };
}
