import assert from "node:assert/strict";
import test from "node:test";
import { objectSize, resizeObject, rotateObject } from "../features/seating/presentation/object-transform.ts";
import type { SeatingTable, SeatingLandmark } from "../features/seating/domain/seating-plan.ts";
import { tableGeometry } from "../features/seating/presentation/table-geometry.ts";

const table: SeatingTable = { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", name: "Example", shape: "long", capacity: 11, x: 50, y: 50, rotation: 90, color: "#88a999" };
const wall: SeatingLandmark = { id: table.id, name: "Wall", kind: "wall", x: 50, y: 50, width: 160, height: 12, rotation: 0 };
test("rotated resizing follows local axes without moving the object or its seats", () => {
  const next = resizeObject(table, "e", { x: 0, y: 20 });
  assert.deepEqual(objectSize(next), { width: 184, height: 60 });
  assert.equal(next.x, table.x); assert.equal(next.y, table.y);
  assert.ok("capacity" in next && next.capacity === 11);
  assert.deepEqual(objectSize(resizeObject(wall, "w", { x: -100, y: 0 })), { width: 180, height: 12 });
  assert.deepEqual(objectSize(resizeObject(wall, "s", { x: 0, y: -100 })), { width: 160, height: 8 });
});
test("circular and square tables preserve equal sides and clamp extreme pointer movements", () => {
  for (const shape of ["round", "square"] as const) {
    const source = { ...table, shape, rotation: 0 };
    assert.deepEqual(objectSize(resizeObject(source, "se", { x: 20, y: 20 })), { width: 134, height: 134 });
    assert.deepEqual(objectSize(resizeObject(source, "se", { x: 10000, y: 10000 })), { width: 200, height: 200 });
    assert.deepEqual(objectSize(resizeObject(source, "se", { x: -10000, y: -10000 })), { width: 60, height: 60 });
  }
});
test("rotation wraps across zero, preserves initial angle and supports 15 degree snapping", () => {
  const source = { ...wall, rotation: 350 };
  const center = { x: 500, y: 350 };
  const point = (degrees: number) => ({ x: center.x + Math.cos(degrees * Math.PI / 180) * 100, y: center.y + Math.sin(degrees * Math.PI / 180) * 100 });
  assert.equal(rotateObject(source, point(-90), point(-60)).rotation, 20);
  assert.equal(rotateObject(wall, point(-90), point(-73), true).rotation, 15);
  assert.equal(rotateObject(wall, point(179), point(-179)).rotation, 2);
});
test("custom table sizes retain every chair with valid geometry", () => {
  for (const shape of ["round", "square", "long", "oval"] as const) {
    for (const size of [{ width: 60, height: 40 }, { width: 240, height: 200 }]) {
      const geometry = tableGeometry(shape, 30, size);
      assert.equal(geometry.chairs.length, 30);
      assert.ok(geometry.chairs.every(chair => Number.isFinite(chair.x) && Number.isFinite(chair.y) && chair.width > 0));
    }
  }
});
