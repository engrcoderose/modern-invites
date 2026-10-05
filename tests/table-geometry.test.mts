import assert from "node:assert/strict";
import { test } from "node:test";
import { tableGeometry, type ChairPosition } from "../features/seating/presentation/table-geometry.ts";

function corners(chair: ChairPosition) {
  const angle = chair.rotation * Math.PI / 180;
  return [[-chair.width / 2, -5], [chair.width / 2, -5], [chair.width / 2, 5], [-chair.width / 2, 5]].map(([x, y]) => ({
    x: chair.x + x * Math.cos(angle) - y * Math.sin(angle),
    y: chair.y + x * Math.sin(angle) + y * Math.cos(angle),
  }));
}

function overlap(first: ChairPosition, second: ChairPosition) {
  const a = corners(first), b = corners(second);
  return [first.rotation, first.rotation + 90, second.rotation, second.rotation + 90].every(rotation => {
    const angle = rotation * Math.PI / 180;
    const project = (point: { x: number; y: number }) => point.x * Math.cos(angle) + point.y * Math.sin(angle);
    const p = a.map(project), q = b.map(project);
    return Math.max(...p) > Math.min(...q) && Math.max(...q) > Math.min(...p);
  });
}

test("every supported shape and capacity renders the exact chair count outside the tabletop without overlapping chairs", () => {
  for (const shape of ["round", "square", "long", "oval"] as const) {
    for (let capacity = 1; capacity <= 30; capacity++) {
      const { radiusX: rx, radiusY: ry, chairs } = tableGeometry(shape, capacity);
      assert.equal(chairs.length, capacity);
      chairs.forEach((chair, index) => {
        assert.ok(chair.width >= 6 && chair.width <= 14);
        for (const corner of corners(chair)) {
          assert.ok(shape === "long" || shape === "square"
            ? Math.abs(corner.x) > rx || Math.abs(corner.y) > ry
            : corner.x ** 2 / rx ** 2 + corner.y ** 2 / ry ** 2 > 1,
          `${shape} / ${capacity}: chair intersects tabletop`);
        }
        for (const other of chairs.slice(index + 1)) assert.equal(overlap(chair, other), false, `${shape} / ${capacity}: chairs overlap`);
      });
    }
  }
});

test("square seats align in straight rows and long-table seats follow the long sides", () => {
  const square = tableGeometry("square", 8);
  assert.deepEqual([0, 90, 180, 270].map(rotation => square.chairs.filter(chair => chair.rotation === rotation).length), [2, 2, 2, 2]);
  const long = tableGeometry("long", 11);
  assert.equal(long.chairs.filter(chair => chair.rotation === 0 || chair.rotation === 180).length, 8);
  assert.equal(long.chairs.filter(chair => chair.rotation === 90 || chair.rotation === 270).length, 3);
});

test("resized tables keep chairs outside the surface and separate at supported size limits", () => {
  for (const shape of ["round", "square", "long", "oval"] as const) {
    for (const size of [{ width: 60, height: 40 }, { width: 60, height: 200 }, { width: 240, height: 40 }, { width: 240, height: 200 }]) {
      for (let capacity = 1; capacity <= 30; capacity++) {
        const { radiusX: rx, radiusY: ry, chairs } = tableGeometry(shape, capacity, size);
        chairs.forEach((chair, index) => {
          for (const corner of corners(chair)) assert.ok(shape === "long" || shape === "square"
            ? Math.abs(corner.x) > rx || Math.abs(corner.y) > ry
            : corner.x ** 2 / rx ** 2 + corner.y ** 2 / ry ** 2 > 1, `${shape} ${JSON.stringify(size)} ${capacity}: chair intersects tabletop`);
          for (const other of chairs.slice(index + 1)) assert.equal(overlap(chair, other), false, `${shape} ${JSON.stringify(size)} ${capacity}: chairs overlap`);
        });
      }
    }
  }
});

test("oval chair spacing follows the perimeter rather than bunching at the narrow ends", () => {
  const { chairs } = tableGeometry("oval", 11);
  const gaps = chairs.map((chair, index) => {
    const next = chairs[(index + 1) % chairs.length];
    return Math.hypot(chair.x - next.x, chair.y - next.y);
  });
  assert.ok(Math.max(...gaps) / Math.min(...gaps) < 1.1);
});
