export const MAX_FLOOR_PLAN_ZOOM = 12;

export interface GesturePoint { x: number; y: number }
export interface ZoomPosition { zoom: number; left: number; top: number }
export interface GestureViewport extends ZoomPosition {
  width: number;
  height: number;
  baseWidth: number;
  aspectRatio: number;
  minZoom: number;
}

const midpoint = (points: GesturePoint[]) => points.length === 1 ? points[0] : {
  x: (points[0].x + points[1].x) / 2,
  y: (points[0].y + points[1].y) / 2,
};
const distance = (points: GesturePoint[]) => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
const bound = (value: number, max: number) => Math.max(0, Math.min(Math.max(0, max), value));

// Preserve the same point on the drawing beneath the moving fingers. The SVG
// is horizontally centred when narrower than the viewport (e.g. landscape Fit).
function projectZoom(view: GestureViewport, zoom: number, from: GesturePoint, to: GesturePoint): ZoomPosition {
  const nextZoom = Math.max(view.minZoom, Math.min(MAX_FLOOR_PLAN_ZOOM, zoom));
  const oldWidth = view.baseWidth * view.zoom;
  const nextWidth = view.baseWidth * nextZoom;
  const oldMargin = Math.max(0, (view.width - oldWidth) / 2);
  const nextMargin = Math.max(0, (view.width - nextWidth) / 2);
  const anchorX = (view.left + from.x - oldMargin) / oldWidth;
  const anchorY = (view.top + from.y) / oldWidth;
  return {
    zoom: nextZoom,
    left: bound(anchorX * nextWidth + nextMargin - to.x, nextWidth - view.width),
    top: bound(anchorY * nextWidth - to.y, nextWidth * view.aspectRatio - view.height),
  };
}

export function zoomAtPoint(view: GestureViewport, zoom: number, point: GesturePoint) {
  return projectZoom(view, zoom, point, point);
}

export class FloorPlanGesture {
  private points = new Map<number, GesturePoint>();
  private start?: { points: GesturePoint[]; view: GestureViewport };

  private rebase(view: GestureViewport) {
    this.start = this.points.size ? { points: [...this.points.values()], view: { ...view } } : undefined;
  }

  down(id: number, point: GesturePoint, view: GestureViewport) {
    if (this.points.size >= 2 && !this.points.has(id)) return false;
    this.points.set(id, point);
    this.rebase(view);
    return true;
  }

  move(id: number, point: GesturePoint, view: GestureViewport): ZoomPosition | null {
    if (!this.points.has(id) || !this.start) return null;
    this.points.set(id, point);
    const points = [...this.points.values()];
    const startDistance = points.length === 2 ? distance(this.start.points) : 1;
    if (startDistance === 0) { this.rebase(view); return null; }
    const scale = points.length === 2 ? distance(points) / startDistance : 1;
    return projectZoom(this.start.view, this.start.view.zoom * scale, midpoint(this.start.points), midpoint(points));
  }

  up(id: number, view: GestureViewport) {
    if (this.points.delete(id)) this.rebase(view);
  }

  reset() { this.points.clear(); this.start = undefined; }
}
