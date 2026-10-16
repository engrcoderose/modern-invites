"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Shapes } from "lucide-react";
import { TABLE_LABELS, type SeatingTable } from "../domain/seating-plan";
import { VENUE_OBJECTS, type VenueKind } from "../domain/venue-objects";
import { TableArtwork } from "./table-artwork";
import { VenueArtwork } from "./venue-artwork";

const groups: { title: string; kinds: VenueKind[] }[] = [
  { title: "Buffet tables · without seats", kinds: ["buffet_long", "buffet_square", "buffet_round", "buffet_oval"] },
  { title: "Room & structure", kinds: ["label", "pillar", "wall", "door", "door_right", "door_left", "entrance", "dance_floor", "dance_floor_round", "stage", "stage_half_round", "tent", "area"] },
  { title: "Signs & event details", kinds: ["accessibility", "high_chair", "toilets", "toilet_booth", "arrow", "target", "cake", "gifts", "tree", "bar", "couple"] },
];

export function VenueMenu({ disabled, onAdd, onAddTable }: {
  disabled: boolean; onAdd(kind: VenueKind): void; onAddTable(shape: SeatingTable["shape"]): void;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState({ above: false, height: 560, left: 0 });
  function close() { if (details.current) details.current.open = false; }
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (event.target instanceof Node && !details.current?.contains(event.target)) close(); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  const itemClass = "flex min-h-24 min-w-0 flex-col items-center justify-center gap-2 rounded-md border px-2 py-3 text-center text-xs leading-4 text-forest hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest disabled:opacity-50";
  return <details ref={details} className="relative" onToggle={event => {
    const expanded = event.currentTarget.open;
    setOpen(expanded);
    if (expanded) {
      if (panel.current) panel.current.scrollTop = 0;
      const bounds = event.currentTarget.querySelector("summary")?.getBoundingClientRect();
      if (!bounds) return;
      const below = window.innerHeight - bounds.bottom - 16;
      const above = bounds.top - 16;
      const showAbove = below < 280 && above > below;
      const width = Math.min(512, window.innerWidth - 48);
      setPlacement({ above: showAbove, height: Math.max(120, Math.min(560, showAbove ? above : below)), left: Math.max(16 - bounds.left, Math.min(0, window.innerWidth - 16 - width - bounds.left)) });
    }
  }} onKeyDown={event => {
    if (event.key === "Escape") { close(); details.current?.querySelector("summary")?.focus(); }
  }}>
    <summary aria-disabled={disabled} onClick={event => { if (disabled) event.preventDefault(); }} className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border bg-white px-3 text-sm font-medium shadow-sm hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest [&::-webkit-details-marker]:hidden">
      <Shapes aria-hidden="true" className="size-4" /> Venue & more <ChevronDown aria-hidden="true" className="size-4" />
    </summary>
    <div ref={panel} style={{ maxHeight: placement.height, left: placement.left }} className={`absolute z-20 w-[min(32rem,calc(100vw-3rem))] overflow-y-auto overscroll-contain rounded-xl border bg-white p-3 shadow-lg ${placement.above ? "bottom-full mb-2" : "top-full mt-2"}`} aria-label="Venue objects">
      <h2 className="mb-3 text-sm font-semibold text-forest">More seating</h2>
      <div className="grid grid-cols-3 gap-2">{(["half_round", "curved", "chair_row"] as const).map(shape => <button key={shape} type="button" disabled={disabled} className={itemClass} onClick={() => { onAddTable(shape); close(); }}>
        <svg aria-hidden="true" viewBox="-100 -65 200 130" className="h-12 w-full"><TableArtwork table={{ id: "preview", name: "", shape, capacity: shape === "chair_row" ? 5 : 4, x: 50, y: 50, rotation: 0, color: "#88a999" }} count={0} highlighted={false} showOccupancy={false} occupiedSeats={[]} showLabel={false} /></svg>{TABLE_LABELS[shape]}
      </button>)}</div>
      {groups.map(group => <section key={group.title} className="mt-5">
        <h2 className="mb-3 text-sm font-semibold text-forest">{group.title}</h2>
        <div className="grid grid-cols-3 gap-2">{group.kinds.map(kind => <button key={kind} type="button" disabled={disabled} className={itemClass} onClick={() => { onAdd(kind); close(); }}>
          <svg aria-hidden="true" viewBox="-100 -65 200 130" className="h-12 w-full"><VenueArtwork item={{ id: "preview", name: kind === "label" ? "Label" : "", kind, x: 50, y: 50 }} selected={false} showLabel={kind === "label"} /></svg>{VENUE_OBJECTS[kind].name}
        </button>)}</div>
      </section>)}
    </div>
  </details>;
}
