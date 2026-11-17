import assert from "node:assert/strict";
import test from "node:test";
import { FloorPlanGesture, zoomAtPoint, type GestureViewport, type ZoomPosition } from "../features/seating/presentation/floor-plan-gestures.ts";

const view: GestureViewport = { zoom: 2, left: 200, top: 100, width: 400, height: 300, baseWidth: 400, aspectRatio: 0.7, minZoom: 1 };
const updated = (next: ZoomPosition): GestureViewport => ({ ...view, ...next });

test("one finger pans the drawing without changing zoom and stays within its edges", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 200, y: 150 }, view);
  assert.deepEqual(gesture.move(1, { x: 180, y: 120 }, view), { zoom: 2, left: 220, top: 130 });
  assert.deepEqual(gesture.move(1, { x: 10000, y: 10000 }, view), { zoom: 2, left: 0, top: 0 });
  assert.deepEqual(gesture.move(1, { x: -10000, y: -10000 }, view), { zoom: 2, left: 400, top: 260 });
});

test("spreading two fingers doubles zoom while the same map point stays between them", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 150, y: 150 }, view);
  gesture.down(2, { x: 250, y: 150 }, view);
  gesture.move(1, { x: 100, y: 150 }, view);
  const next = gesture.move(2, { x: 300, y: 150 }, view)!;
  assert.deepEqual(next, { zoom: 4, left: 600, top: 350 });
  assert.equal((view.left + 200) / (view.baseWidth * view.zoom), (next.left + 200) / (view.baseWidth * next.zoom));
  assert.equal((view.top + 150) / (view.baseWidth * view.zoom), (next.top + 150) / (view.baseWidth * next.zoom));
  gesture.move(1, { x: 100, y: 200 }, updated(next));
  assert.deepEqual(gesture.move(2, { x: 300, y: 200 }, updated(next)), { zoom: 4, left: 600, top: 300 });
});

test("pinching respects Fit and maximum zoom limits without invalid scroll positions", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 100, y: 150 }, view);
  gesture.down(2, { x: 300, y: 150 }, view);
  const maximum = gesture.move(2, { x: 5000, y: 150 }, view)!;
  assert.equal(maximum.zoom, 12);
  assert.ok(Number.isFinite(maximum.left) && Number.isFinite(maximum.top));
  assert.deepEqual(gesture.move(2, { x: 101, y: 150 }, updated(maximum)), { zoom: 1, left: 0, top: 0 });
});

test("lifting one finger continues panning from the current scale without a jump", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 150, y: 150 }, view);
  gesture.down(2, { x: 250, y: 150 }, view);
  gesture.move(1, { x: 100, y: 150 }, view);
  const next = gesture.move(2, { x: 300, y: 150 }, view)!;
  gesture.up(2, updated(next));
  assert.deepEqual(gesture.move(1, { x: 100, y: 150 }, updated(next)), next);
  assert.deepEqual(gesture.move(1, { x: 80, y: 150 }, updated(next)), { ...next, left: 620 });
  gesture.up(1, updated(next));
  assert.equal(gesture.move(1, { x: 50, y: 150 }, updated(next)), null);
});

test("adding a second finger after panning preserves the already moved view", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 200, y: 150 }, view);
  const panned = gesture.move(1, { x: 180, y: 120 }, view)!;
  gesture.down(2, { x: 280, y: 120 }, updated(panned));
  assert.deepEqual(gesture.move(2, { x: 280, y: 120 }, updated(panned)), panned);
});

test("a third finger is ignored and cancellation discards stale contacts", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 100, y: 150 }, view);
  gesture.down(2, { x: 300, y: 150 }, view);
  assert.equal(gesture.down(3, { x: 200, y: 300 }, view), false);
  assert.equal(gesture.move(3, { x: 1000, y: 1000 }, view), null);
  gesture.up(3, view);
  assert.deepEqual(gesture.move(2, { x: 300, y: 150 }, view), { zoom: 2, left: 200, top: 100 });
  gesture.reset();
  assert.equal(gesture.move(2, { x: 500, y: 150 }, view), null);
  gesture.down(7, { x: 100, y: 150 }, view);
  assert.deepEqual(gesture.move(7, { x: 90, y: 150 }, view), { zoom: 2, left: 210, top: 100 });
});

test("coincident fingertips rebase safely before zooming", () => {
  const gesture = new FloorPlanGesture();
  gesture.down(1, { x: 200, y: 150 }, view);
  gesture.down(2, { x: 200, y: 150 }, view);
  assert.equal(gesture.move(1, { x: 150, y: 150 }, view), null);
  const next = gesture.move(2, { x: 250, y: 150 }, view)!;
  assert.equal(next.zoom, 4);
  assert.ok(Number.isFinite(next.left) && Number.isFinite(next.top));
});

test("zoom accounts for a centred drawing in a wide landscape viewport", () => {
  const landscape = { ...view, width: 600, height: 200, zoom: 1, left: 0, top: 0, baseWidth: 200, aspectRatio: 0.5 };
  assert.deepEqual(zoomAtPoint(landscape, 4, { x: 300, y: 50 }), { zoom: 4, left: 100, top: 150 });
});

test("button zoom preserves the current view centre after panning, and Fit resets overflow", () => {
  assert.deepEqual(zoomAtPoint(view, 3, { x: 200, y: 150 }), { zoom: 3, left: 400, top: 225 });
  assert.deepEqual(zoomAtPoint(view, 1, { x: 200, y: 150 }), { zoom: 1, left: 0, top: 0 });
});
