import type { SeatingTable } from "../domain/seating-plan";

export interface ChairPosition {
  x: number;
  y: number;
  rotation: number;
  width: number;
}

const CHAIR_OFFSET = 12;
const CURVE_SAMPLES = 360;

export function tableDimensions(shape: SeatingTable["shape"], size: Pick<SeatingTable, "width" | "height"> = {}) {
  const round = shape === "round" || shape === "square";
  const diameter = Math.max(60, Math.min(200, size.width ?? size.height ?? 94, size.height ?? size.width ?? 94));
  const radiusX = round ? diameter / 2 : (size.width ?? 144) / 2;
  const radiusY = round ? diameter / 2 : (size.height ?? 60) / 2;
  return { radiusX, radiusY };
}

export function tableGeometry(shape: SeatingTable["shape"], capacity: number, size: Pick<SeatingTable, "width" | "height"> = {}) {
  const { radiusX, radiusY } = tableDimensions(shape, size);
  const rectangular = shape === "square" || shape === "long";
  const chairs = rectangular
    ? rectangularChairs(radiusX, radiusY, capacity)
    : curvedChairs(radiusX, radiusY, capacity);
  // Avoid tiny engine-specific floating point differences in SSR SVG attributes.
  const precision = (value: number) => Math.round(value * 1000) / 1000;
  return { radiusX, radiusY, chairs: chairs.map(chair => ({
    x: precision(chair.x), y: precision(chair.y), rotation: precision(chair.rotation), width: precision(chair.width),
  })) };
}

function rectangularChairs(rx: number, ry: number, capacity: number): ChairPosition[] {
  const lengths = [rx * 2, ry * 2, rx * 2, ry * 2];
  const counts = [0, 0, 0, 0];
  // Opposite sides win ties, keeping small and odd seat counts balanced.
  const priority = [0, 2, 1, 3];
  for (let seat = 0; seat < capacity; seat++) {
    const side = priority.reduce((best, candidate) =>
      lengths[candidate] / (counts[candidate] + 1) > lengths[best] / (counts[best] + 1) ? candidate : best);
    counts[side]++;
  }
  return counts.flatMap((count, side) => Array.from({ length: count }, (_, index) => {
    const along = lengths[side] * ((index + 1) / (count + 1) - 0.5);
    const positions = [
      { x: along, y: -ry - CHAIR_OFFSET },
      { x: rx + CHAIR_OFFSET, y: along },
      { x: -along, y: ry + CHAIR_OFFSET },
      { x: -rx - CHAIR_OFFSET, y: -along },
    ];
    return { ...positions[side], rotation: side * 90, width: Math.min(14, lengths[side] / (count + 1) - 4) };
  }));
}

function curvedChairs(rx: number, ry: number, capacity: number): ChairPosition[] {
  // Sample the offset outline, then place chairs at equal perimeter distances.
  // Equal angles alone bunch oval seats at its ends and leave uneven gaps.
  const points = Array.from({ length: CURVE_SAMPLES + 1 }, (_, index) => {
    const angle = index / CURVE_SAMPLES * Math.PI * 2 - Math.PI / 2;
    const nx = Math.cos(angle) / rx;
    const ny = Math.sin(angle) / ry;
    const normal = Math.hypot(nx, ny);
    return {
      x: rx * Math.cos(angle) + CHAIR_OFFSET * nx / normal,
      y: ry * Math.sin(angle) + CHAIR_OFFSET * ny / normal,
      rotation: Math.atan2(ny, nx) * 180 / Math.PI + 90,
    };
  });
  const distances = [0];
  for (let index = 1; index < points.length; index++) {
    distances.push(distances[index - 1] + Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y));
  }
  const perimeter = distances[CURVE_SAMPLES];
  let segment = 1;
  return Array.from({ length: capacity }, (_, index) => {
    const target = perimeter * index / capacity;
    while (distances[segment] < target) segment++;
    const ratio = (target - distances[segment - 1]) / (distances[segment] - distances[segment - 1]);
    const start = points[segment - 1], end = points[segment];
    return { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio,
      rotation: start.rotation + ((end.rotation - start.rotation + 540) % 360 - 180) * ratio,
      width: Math.min(14, perimeter / capacity - 5) };
  });
}
