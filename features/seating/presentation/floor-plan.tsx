"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { SeatingGuest, SeatingPlan } from "../domain/seating-plan";
import { TableArtwork } from "./table-artwork";
import { VenueArtwork } from "./venue-artwork";
import { ObjectTransformHandles } from "./object-transform-handles";
import type { FloorObject } from "./object-transform";
import { useTableHover } from "./use-table-hover";
import { TableHoverCard } from "./table-hover-card";

interface FloorPlanProps {
  plan: SeatingPlan;
  guests?: SeatingGuest[];
  selectedId?: string;
  highlightedId?: string;
  highlightedSeatNumber?: number;
  editable?: boolean;
  showOccupancy?: boolean;
  onSelect?(id: string): void;
  onMove?(id: string, x: number, y: number): void;
  onTransform?(item: FloorObject): void;
}

const clamp = (value: number) => Math.round(Math.min(92, Math.max(8, value)) * 10) / 10;

export function FloorPlan({ plan, guests, selectedId, highlightedId, highlightedSeatNumber, editable = false, showOccupancy = true, onSelect, onMove, onTransform }: FloorPlanProps) {
  const svg = useRef<SVGSVGElement>(null);
  const [handleScale, setHandleScale] = useState(1);
  const selected = [...plan.tables, ...plan.landmarks].find(item => item.id === selectedId);
  // Guest names are supplied only by the authenticated client workspace.
  const hover = useTableHover(guests !== undefined && showOccupancy);
  const hoveredTable = plan.tables.find(table => table.id === hover.active?.tableId);
  useEffect(() => {
    const element = svg.current;
    if (!element || !editable) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setHandleScale(Math.max(1, 1000 / entry.contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [editable]);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  function position(event: PointerEvent<SVGGElement>) {
    const matrix = svg.current?.getScreenCTM();
    if (!matrix || !svg.current) return null;
    const point = svg.current.createSVGPoint();
    point.x = event.clientX; point.y = event.clientY;
    const result = point.matrixTransform(matrix.inverse());
    return { x: result.x, y: result.y };
  }
  function start(event: PointerEvent<SVGGElement>, item: { id: string; x: number; y: number }) {
    onSelect?.(item.id);
    const point = position(event);
    if (!editable || !point) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: item.id, dx: item.x - point.x / 10, dy: item.y - point.y / 7 };
  }
  function move(event: PointerEvent<SVGGElement>) {
    const point = position(event);
    if (!editable || !drag.current || !event.currentTarget.hasPointerCapture(event.pointerId) || !point) return;
    onMove?.(drag.current.id, clamp(point.x / 10 + drag.current.dx), clamp(point.y / 7 + drag.current.dy));
  }
  function keyboard(event: KeyboardEvent<SVGGElement>, item: { id: string; x: number; y: number }) {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect?.(item.id); }
    if (!editable || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    onMove?.(item.id, clamp(item.x + (event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0)), clamp(item.y + (event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0)));
  }
  function interaction(item: { id: string; x: number; y: number }) {
    return {
      tabIndex: onSelect ? 0 : undefined,
      role: onSelect ? "button" as const : undefined,
      onClick: () => onSelect?.(item.id),
      onPointerDown: (event: PointerEvent<SVGGElement>) => start(event, item),
      onPointerMove: move,
      onPointerUp: () => { drag.current = null; },
      onPointerCancel: () => { drag.current = null; },
      onKeyDown: (event: KeyboardEvent<SVGGElement>) => keyboard(event, item),
    };
  }
  return <><svg ref={svg} viewBox="0 0 1000 700" onPointerDownCapture={hover.dismiss} className={`w-full rounded-xl border border-black/10 bg-white ${editable ? "touch-none" : ""}`} aria-label="Wedding venue floor plan">
    <defs><pattern id="seating-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--seat-map-grid, #eff0ec)" strokeWidth="1" /></pattern></defs>
    <rect width="1000" height="700" fill="url(#seating-grid)" />
    <rect x="20" y="20" width="960" height="660" fill="none" stroke="var(--seat-map-border, #b7c9bf)" strokeDasharray="8 6" />
    {plan.landmarks.map(item => <g key={item.id} transform={`translate(${item.x * 10} ${item.y * 7}) rotate(${item.rotation ?? 0})`} {...interaction(item)} aria-label={`${item.name}, venue object`} className="cursor-pointer focus:outline-none focus:[&>rect]:stroke-forest focus:[&>rect]:stroke-[4px]">
      <VenueArtwork item={item} selected={selectedId === item.id} showSelection={!editable || !onTransform} />
    </g>)}
    {plan.tables.map(table => {
      const assignments = plan.assignments.filter(assignment => assignment.tableId === table.id);
      const count = assignments.length;
      return <g key={table.id} transform={`translate(${table.x * 10} ${table.y * 7}) rotate(${table.rotation})`} {...interaction(table)} {...hover.interaction(table.id)} aria-label={`${table.name}, ${showOccupancy ? `${count} of ` : ""}${table.capacity} seats`} aria-pressed={onSelect ? selectedId === table.id : undefined} className="cursor-pointer focus:outline-none focus:[&>rect]:stroke-forest focus:[&>ellipse]:stroke-forest">
        <TableArtwork table={table} count={count} highlighted={table.id === highlightedId || table.id === selectedId} showOccupancy={showOccupancy} occupiedSeats={assignments.flatMap(assignment => assignment.seatNumber === undefined ? [] : [assignment.seatNumber])} highlightedSeatNumber={table.id === highlightedId ? highlightedSeatNumber : undefined} />
      </g>;
    })}
    {editable && selected && onTransform && <ObjectTransformHandles key={selected.id} item={selected} scale={handleScale} position={position} onChange={onTransform} />}
    {plan.tables.length === 0 && <text x="500" y="350" textAnchor="middle" fontSize="18" fill="#66706a">Add a table to start arranging the floor plan.</text>}
  </svg>
    {hover.active && hoveredTable && guests && <TableHoverCard key={hoveredTable.id} id={hover.tooltipId} table={hoveredTable} plan={plan} guests={guests} anchor={hover.active.anchor} onPointerEnter={hover.cancelClose} onPointerLeave={hover.scheduleClose} />}
  </>;
}
