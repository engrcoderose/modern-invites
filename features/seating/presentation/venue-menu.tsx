"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Circle, DoorOpen, Heart, Minus, Music, Shapes, Square, Type, Wine } from "lucide-react";
import { VENUE_OBJECTS, type VenueKind } from "../domain/venue-objects";

const roomObjects = [
  { kind: "stage", icon: Square }, { kind: "dance_floor", icon: Music },
  { kind: "bar", icon: Wine }, { kind: "door", icon: DoorOpen },
  { kind: "wall", icon: Minus }, { kind: "label", icon: Type }, { kind: "area", icon: Shapes },
] as const;

export function VenueMenu({ disabled, onAdd, onAddOval }: {
  disabled: boolean; onAdd(kind: VenueKind): void; onAddOval(): void;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState({ above: false, height: 560 });
  function close() { if (details.current) details.current.open = false; }
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (event.target instanceof Node && !details.current?.contains(event.target)) close(); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  const itemClass = "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest disabled:opacity-50";
  return <details ref={details} className="relative" onToggle={event => {
    const expanded = event.currentTarget.open;
    setOpen(expanded);
    if (expanded) {
      const bounds = event.currentTarget.querySelector("summary")?.getBoundingClientRect();
      if (!bounds) return;
      const below = window.innerHeight - bounds.bottom - 16;
      const above = bounds.top - 16;
      const showAbove = below < 280 && above > below;
      setPlacement({ above: showAbove, height: Math.max(120, Math.min(560, showAbove ? above : below)) });
    }
  }} onKeyDown={event => {
    if (event.key === "Escape") { close(); details.current?.querySelector("summary")?.focus(); }
  }}>
    <summary aria-disabled={disabled} onClick={event => { if (disabled) event.preventDefault(); }} className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border bg-white px-3 text-sm font-medium shadow-sm hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest [&::-webkit-details-marker]:hidden">
      <Shapes aria-hidden="true" className="size-4" /> Venue <ChevronDown aria-hidden="true" className="size-4" />
    </summary>
    <div style={{ maxHeight: placement.height }} className={`absolute left-0 z-20 w-56 max-w-[calc(100vw-3rem)] overflow-y-auto overscroll-contain rounded-xl border bg-white p-2 shadow-lg ${placement.above ? "bottom-full mb-2" : "top-full mt-2"}`} aria-label="Venue objects">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">Add to room</p>
      {roomObjects.map(({ kind, icon: Icon }) => <button key={kind} type="button" disabled={disabled} className={itemClass} onClick={() => { onAdd(kind); close(); }}><Icon aria-hidden="true" className="size-4" />{VENUE_OBJECTS[kind].name}</button>)}
      <div className="mt-2 border-t pt-2">{([{ kind: "entrance", icon: DoorOpen }, { kind: "couple", icon: Heart }] as const).map(({ kind, icon: Icon }) =>
        <button key={kind} type="button" disabled={disabled} className={itemClass} onClick={() => { onAdd(kind); close(); }}><Icon aria-hidden="true" className="size-4" />{VENUE_OBJECTS[kind].name}</button>)}</div>
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">More table shapes</p>
      <button type="button" disabled={disabled} className={itemClass} onClick={() => { onAddOval(); close(); }}><Circle aria-hidden="true" className="size-4" />Oval table</button>
    </div>
  </details>;
}
