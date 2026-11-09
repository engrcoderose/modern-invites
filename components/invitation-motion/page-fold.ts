type Point = { x: number; y: number };

/** Fold a rectangular sheet about the bisector of its corner and dragged corner. */
export function pageFold(progress: number, width: number, height: number) {
  const t = Math.max(0.00001, Math.min(1, progress));
  const dx = 2 * width * t;
  const dy = height * 0.16 * Math.sin(Math.PI * t);
  const length = Math.hypot(dx, dy);
  const normal = { x: dx / length, y: dy / length };
  const midpoint = { x: width - dx / 2, y: height - dy / 2 };
  const distance = (p: Point) => (p.x - midpoint.x) * normal.x + (p.y - midpoint.y) * normal.y;
  const rectangle = [{ x: 0, y: 0 }, { x: width, y: 0 }, { x: width, y: height }, { x: 0, y: height }];

  function clip(keepFront: boolean) {
    const result: Point[] = [];
    for (let i = 0; i < rectangle.length; i++) {
      const a = rectangle[i];
      const b = rectangle[(i + 1) % rectangle.length];
      const da = distance(a);
      const db = distance(b);
      const insideA = keepFront ? da <= 0 : da >= 0;
      const insideB = keepFront ? db <= 0 : db >= 0;
      if (insideA) result.push(a);
      if (insideA !== insideB) {
        const fraction = da / (da - db);
        result.push({ x: a.x + fraction * (b.x - a.x), y: a.y + fraction * (b.y - a.y) });
      }
    }
    return result;
  }

  const front = clip(true);
  const reverse = clip(false).map((p) => {
    const offset = 2 * distance(p);
    return { x: p.x - offset * normal.x, y: p.y - offset * normal.y };
  });
  const path = (points: Point[]) => points.length
    ? `M ${points.map((p) => `${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(" L ")} Z`
    : "M 0 0 Z";
  const shadeWidth = Math.min(70, width * 0.1);
  return {
    front: progress <= 0 ? "inset(0)" : progress >= 1 ? "inset(0 100% 0 0)" : `polygon(${front.map((p) => `${p.x}px ${p.y}px`).join(",")})`,
    reverse: path(reverse),
    opacity: Math.min(1, progress * 18, (1 - progress) * 18),
    shadeStartX: midpoint.x - normal.x * shadeWidth,
    shadeStartY: midpoint.y - normal.y * shadeWidth,
    shadeEndX: midpoint.x,
    shadeEndY: midpoint.y,
  };
}
