"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SeatingGuest, SeatingPlan, SeatingTable } from "../domain/seating-plan";

export function TableHoverCard({ id, table, plan, guests, anchor, onPointerEnter, onPointerLeave }: {
  id: string; table: SeatingTable; plan: SeatingPlan; guests: SeatingGuest[]; anchor: SVGGElement;
  onPointerEnter(): void; onPointerLeave(): void;
}) {
  const card = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const seated = plan.assignments.filter(assignment => assignment.tableId === table.id);
  const names = new Map(guests.map(guest => [guest.id, guest.fullName]));

  useLayoutEffect(() => {
    function place() {
      const element = card.current;
      if (!element) return;
      const bounds = anchor.getBoundingClientRect();
      const gap = 10, margin = 12;
      const right = bounds.right + gap;
      const left = right + element.offsetWidth <= window.innerWidth - margin
        ? right : bounds.left - element.offsetWidth - gap;
      setPosition({
        left: Math.max(margin, Math.min(left, window.innerWidth - element.offsetWidth - margin)),
        top: Math.max(margin, Math.min(bounds.top, window.innerHeight - element.offsetHeight - margin)),
      });
    }
    place();
    const observer = new ResizeObserver(place);
    if (card.current) observer.observe(card.current);
    observer.observe(anchor);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchor, table.x, table.y, table.rotation]);

  return createPortal(<div ref={card} id={id} role="tooltip" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}
    style={{ left: position?.left ?? 0, top: position?.top ?? 0, visibility: position ? "visible" : "hidden" }}
    className="fixed z-50 flex max-h-[min(24rem,calc(100dvh-1.5rem))] w-64 max-w-[calc(100vw-1.5rem)] flex-col rounded-lg border border-forest/30 bg-white p-4 text-sm text-forest shadow-lg">
    <div className="flex shrink-0 items-start justify-between gap-4"><p className="min-w-0 break-words font-semibold">{table.name}</p><span className="shrink-0 text-xs leading-5 text-ink-muted" aria-label={`${seated.length} of ${table.capacity} seats assigned`}>{seated.length}/{table.capacity}</span></div>
    {seated.length ? <ul className="mt-2 min-h-0 space-y-1.5 overflow-y-auto overscroll-contain text-ink-muted">
      {seated.map(assignment => <li key={assignment.guestId} className="break-words"><span className="font-medium text-forest">{assignment.seatNumber === undefined ? "Seat not set" : `Seat ${assignment.seatNumber}`}</span> · {names.get(assignment.guestId) ?? "Guest removed from list"}</li>)}
    </ul> : <p className="mt-2 text-ink-muted">No guests seated here yet.</p>}
  </div>, document.body);
}
