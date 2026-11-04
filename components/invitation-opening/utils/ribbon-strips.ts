import { smooth } from "./ribbon-motion";

export type RibbonPoint = { x: number; y: number; z: number };
export type RibbonStrip = { points: RibbonPoint[]; materialOffset: number; twist: number; tail: boolean; width?: number };

const ORIGIN: RibbonPoint = { x: 0, y: 0, z: 0 };
export const RIBBON_WIDTH = 53;
const CURVE_STEPS = 64;

export function ribbonFeed(side: -1 | 1, progress: number) {
  return smooth(side === 1 ? .08 : .3, side === 1 ? .43 : .67, progress);
}

function cubic(a: RibbonPoint, b: RibbonPoint, c: RibbonPoint, d: RibbonPoint, t: number): RibbonPoint {
  const s = 1 - t;
  return {
    x: s * s * s * a.x + 3 * s * s * t * b.x + 3 * s * t * t * c.x + t * t * t * d.x,
    y: s * s * s * a.y + 3 * s * s * t * b.y + 3 * s * t * t * c.y + t * t * t * d.y,
    z: s * s * s * a.z + 3 * s * s * t * b.z + 3 * s * t * t * c.z + t * t * t * d.z,
  };
}

function curve(a: RibbonPoint, b: RibbonPoint, c: RibbonPoint, d: RibbonPoint) {
  return Array.from({ length: CURVE_STEPS + 1 }, (_, i) => cubic(a, b, c, d, i / CURVE_STEPS));
}

export function stripLength(points: RibbonPoint[]) {
  let length = 0;
  for (let i = 1; i < points.length; i++) length += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y, points[i].z - points[i - 1].z);
  return length;
}

function loop(side: -1 | 1, feed: number) {
  const radius = 1 - feed;
  const first = curve(
    { x: side * 10, y: -2, z: 4 },
    { x: side * (10 + 65 * radius), y: -68 * radius, z: 25 * radius },
    { x: side * (10 + 143 * radius), y: -74 * radius, z: 16 * radius },
    { x: side * (10 + 117 * radius), y: -8 * radius, z: -8 * radius },
  );
  const second = curve(first[first.length - 1],
    { x: side * (10 + 125 * radius), y: 45 * radius, z: -19 * radius },
    { x: side * (10 + 43 * radius), y: 37 * radius, z: -4 },
    { x: side * 10, y: 8, z: 5 },
  );
  return [...first, ...second.slice(1)];
}

const REST_LOOP_LENGTH = { left: stripLength(loop(-1, 0)), right: stripLength(loop(1, 0)) };
const REST_TAIL_LENGTH = 163;

function tail(side: -1 | 1, length: number, progress: number) {
  const pull = smooth(side === 1 ? .02 : .29, side === 1 ? .22 : .48, progress);
  const flutter = Math.sin(progress * 8 + side) * smooth(.55, .9, progress);
  const start = { x: side * 10, y: 8, z: 5 };
  // Shape changes under the pull, but normalization below preserves arc length.
  const points = curve(ORIGIN,
    { x: side * (.11 + .08 * pull), y: .2, z: .07 },
    { x: side * (.27 + .2 * pull) + flutter * .045, y: .68, z: -.04 },
    { x: side * (.4 + .22 * pull), y: .93, z: .025 },
  );
  const scale = length / stripLength(points);
  return points.map(point => ({ x: start.x + point.x * scale, y: start.y + point.y * scale, z: start.z + point.z * scale }));
}

export function ribbonStrips(progress: number): RibbonStrip[] {
  const strips: RibbonStrip[] = [];
  for (const side of [-1, 1] as const) {
    const feed = ribbonFeed(side, progress);
    const points = loop(side, feed);
    const restingLength = side === 1 ? REST_LOOP_LENGTH.right : REST_LOOP_LENGTH.left;
    const remaining = stripLength(points);
    const transferred = restingLength - remaining;
    // The same material leaving the loop becomes free tail. Never scale a bow
    // bitmap or reduce the ribbon's full width to make its loop disappear.
    if (remaining > 32) strips.push({ points, materialOffset: transferred, twist: side * .52, tail: false });
    strips.push({ points: tail(side, REST_TAIL_LENGTH + transferred, progress), materialOffset: -transferred, twist: side * .17, tail: true });
  }
  const undo = smooth(.59, .78, progress);
  strips.push({
    points: curve({ x: -10, y: -12, z: 40 }, { x: 24 + undo * 13, y: -24 + undo * 31, z: 56 },
      { x: -18 + undo * 23, y: 21 + undo * 26, z: 44 }, { x: -8 + undo * 43, y: 13 + undo * 53, z: 34 }),
    materialOffset: undo * 65, twist: .35 * (1 - undo), tail: false, width: 28,
  });
  return strips;
}
