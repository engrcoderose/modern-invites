import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_CANVAS, TABLE_SHAPES, emptySeatingPlan, planSchema, type SeatingPlan } from "../features/seating/domain/seating-plan.ts";
import { canvasSize, objectPosition, resizeCanvas } from "../features/seating/presentation/canvas-size.ts";
import { rotateObject } from "../features/seating/presentation/object-transform.ts";
import { tableGeometry } from "../features/seating/presentation/table-geometry.ts";

const plan: SeatingPlan = { ...emptySeatingPlan(), tables: [{ id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", name: "Example", shape: "curved", capacity: 4, color: "#88a999", rotation: 45, x: 8, y: 8 }],
  landmarks: [{ id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", name: "Tree", kind: "tree", x: 80, y: 80 }], assignments: [{ guestId: 1, tableId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", seatNumber: 2 }] };

test("legacy plans keep the original canvas; invalid dimensions are rejected", () => {
  assert.deepEqual(canvasSize(plan), DEFAULT_CANVAS);
  assert.deepEqual(planSchema.parse(plan), plan);
  for (const canvas of [null, {}, { width: 999, height: 700 }, { width: 6001, height: 700 }, { width: 1000, height: 699 }, { width: 1000, height: 6001 }, { width: 1500.5, height: 700 }, { width: "1500", height: 700 }, { width: 1000, height: 700, extra: true }]) {
    assert.equal(planSchema.safeParse({ ...plan, canvas }).success, false);
  }
});

test("expanding both axes preserves physical positions, geometry and assignments", () => {
  const next = resizeCanvas(plan, { width: 6000, height: 6000 })!;
  assert.ok(next);
  assert.equal(planSchema.safeParse(next).success, true);
  for (const [index, item] of [...plan.tables, ...plan.landmarks].entries()) {
    const moved = [...next.tables, ...next.landmarks][index];
    const oldPoint = objectPosition(item), newPoint = objectPosition(moved, next.canvas);
    assert.ok(Math.abs(oldPoint.x - newPoint.x) < 1e-9);
    assert.ok(Math.abs(oldPoint.y - newPoint.y) < 1e-9);
    assert.equal(moved.rotation, item.rotation);
  }
  assert.deepEqual(next.assignments, plan.assignments);
  assert.deepEqual(resizeCanvas(next, DEFAULT_CANVAS), { ...plan, canvas: DEFAULT_CANVAS });
  assert.equal(plan.canvas, undefined);
});

test("shrinking cannot cut off objects and supports independent axis expansion", () => {
  const larger = resizeCanvas(plan, { width: 2000, height: 1400 })!;
  larger.landmarks[0] = { ...larger.landmarks[0], x: 90, y: 90, rotation: 45 };
  assert.equal(resizeCanvas(larger, DEFAULT_CANVAS), null);
  assert.equal(resizeCanvas(plan, { width: 999, height: 700 }), null);
  assert.equal(resizeCanvas(plan, { width: Infinity, height: 700 }), null);
  const wider = resizeCanvas(plan, { width: 1500, height: 700 })!;
  assert.equal(wider.tables[0].y, plan.tables[0].y);
  assert.ok(Math.abs(objectPosition(wider.tables[0], wider.canvas).x - 80) < 1e-9);
});

test("rotation uses the expanded room's actual centre coordinates", () => {
  const item = { ...plan.tables[0], rotation: 0, x: 50, y: 50 };
  assert.equal(rotateObject(item, { x: 1500, y: 900 }, { x: 1600, y: 1000 }, false, { width: 3000, height: 2000 }).rotation, 90);
});

test("new seating shapes retain finite distinct numbered chairs at all capacities", () => {
  for (const shape of TABLE_SHAPES) for (let capacity = 1; capacity <= 30; capacity++) {
    for (const size of [{}, { width: 60, height: 40 }, { width: 240, height: 200 }]) {
      const { chairs } = tableGeometry(shape, capacity, size);
      assert.equal(chairs.length, capacity);
      assert.equal(new Set(chairs.map(chair => `${chair.x}:${chair.y}`)).size, capacity);
      assert.ok(chairs.every(chair => Number.isFinite(chair.x) && Number.isFinite(chair.y) && Number.isFinite(chair.rotation) && chair.width > 0));
    }
  }
});
