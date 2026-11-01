export const RIBBON_RELEASE_SECONDS = 3.5;

export function smooth(from: number, to: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

export function knotPosition(progress: number) {
  const fall = smooth(.77, 1, progress);
  return { x: .5 - .035 * fall, y: .469 + 1.6 * fall * fall };
}

export function bandPoint(t: number, side: -1 | 1, progress: number) {
  const outer = side === -1 ? 0 : 1;
  const knot = knotPosition(progress);
  const fall = smooth(.77, 1, progress);
  const edgeY = knot.y - .08 * Math.sin(fall * Math.PI);
  const edgeX = outer - side * .12 * fall;
  const sag = .025 * Math.sin(progress * Math.PI);
  const s = 1 - t;
  return {
    x: s * s * s * edgeX + 3 * s * s * t * (edgeX - side * .16)
      + 3 * s * t * t * (knot.x + side * .13) + t * t * t * knot.x,
    y: s * s * s * edgeY + 3 * s * s * t * (edgeY + sag)
      + 3 * s * t * t * (knot.y + sag) + t * t * t * knot.y,
  };
}
