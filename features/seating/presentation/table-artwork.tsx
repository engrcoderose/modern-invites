import { useMemo } from "react";
import type { SeatingTable } from "../domain/seating-plan";
import { tableGeometry } from "./table-geometry";

export function TableArtwork({ table, count, highlighted, showOccupancy, occupiedSeats, highlightedSeatNumber }: {
  table: SeatingTable; count: number; highlighted: boolean; showOccupancy: boolean; occupiedSeats: number[]; highlightedSeatNumber?: number;
}) {
  const { radiusX, radiusY, chairs } = useMemo(() => tableGeometry(table.shape, table.capacity, { width: table.width, height: table.height }), [table.shape, table.capacity, table.width, table.height]);
  const stroke = highlighted ? "var(--seat-map-selected, #173d32)" : table.color;
  const surface = { fill: highlighted ? "var(--seat-map-selected-fill, #f1f6ef)" : "#ffffff", stroke, strokeWidth: highlighted ? 4 : 3 };
  return <>
    <g aria-hidden="true" pointerEvents="none">
      {chairs.map((chair, index) => {
        const occupied = showOccupancy && occupiedSeats.includes(index + 1);
        const found = index + 1 === highlightedSeatNumber;
        return <g key={index} transform={`translate(${chair.x} ${chair.y}) rotate(${chair.rotation})`}>
          <rect x={-chair.width / 2} y="-5" width={chair.width} height="10" rx="2" fill={found ? "#e9bc54" : occupied ? table.color : "white"} stroke={found ? "#735313" : table.color} strokeWidth={found ? 2.5 : 1.5} />
          {highlighted ? <text textAnchor="middle" dominantBaseline="central" transform={`rotate(${-table.rotation - chair.rotation})`} fontSize={Math.min(7, chair.width / 1.4)} fontWeight="600" fill={occupied && !found ? "white" : "var(--seat-map-ink, #173d32)"}>{index + 1}</text>
            : <path d={`M ${-chair.width / 2 + 2} -2.5 H ${chair.width / 2 - 2}`} stroke={occupied ? "#ffffff" : table.color} strokeWidth="1" />}
        </g>;
      })}
    </g>
    {table.shape === "square" || table.shape === "long"
      ? <rect x={-radiusX} y={-radiusY} width={radiusX * 2} height={radiusY * 2} rx={table.shape === "square" ? 3 : 6} {...surface} />
      : <ellipse rx={radiusX} ry={radiusY} {...surface} />}
    <g transform={`rotate(${-table.rotation})`} fill="var(--seat-map-ink, #173d32)" textAnchor="middle" pointerEvents="none">
      <text y="-2" fontSize="12" fontWeight="600">{table.name.length > 19 ? `${table.name.slice(0, 18)}…` : table.name}</text>
      <text y="16" fontSize="10" fill="#66706a">{showOccupancy ? `${count}/${table.capacity} seats` : `${table.capacity} seats`}</text>
    </g>
  </>;
}
