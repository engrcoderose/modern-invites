"use client";

import { useState } from "react";
import type { SeatingGuest, SeatingPlan } from "../domain/seating-plan";
import { SeatNumberSelect } from "./seat-number-select";

export function GuestSeatingList({ guests, plan, disabled, selectedTable, onAssign }: {
  guests: SeatingGuest[]; plan: SeatingPlan; disabled: boolean; selectedTable?: string;
  onAssign(guestId: number, tableId: string, seatNumber?: number): void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const assignments = new Map(plan.assignments.map(assignment => [assignment.guestId, assignment]));
  const visible = guests.filter(guest => {
    const tableId = assignments.get(guest.id)?.tableId;
    const table = plan.tables.find(item => item.id === tableId);
    return `${guest.fullName} ${guest.householdName} ${table?.name ?? ""}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
      && (filter === "all" || (filter === "unassigned" && !tableId) || (filter === "seated" && !!tableId) || (filter === "selected" && tableId === selectedTable));
  });
  return <section className="rounded-xl border bg-white p-4">
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <label className="min-w-0 flex-1"><span className="sr-only">Search seating guests</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search guest, household or table" className="h-10 w-full rounded-md border px-3 text-sm" /></label>
      <label><span className="sr-only">Filter seating guests</span><select value={filter} onChange={event => setFilter(event.target.value)} className="h-10 rounded-md border bg-white px-3 text-sm"><option value="all">All guests</option><option value="unassigned">Unassigned</option><option value="seated">Seated</option>{selectedTable && <option value="selected">Selected table</option>}</select></label>
    </div>
    <p className="mb-3 text-xs text-ink-muted">{visible.length} guests · RSVP status comes from the shared guest list. Declined guests cannot be seated.</p>
    <div className="max-h-[560px] overflow-auto">
      <table className="w-full text-left text-sm"><caption className="sr-only">Guest table assignments</caption>
        <thead className="sticky top-0 bg-sage-50"><tr><th className="p-3 font-medium">Guest / household</th><th className="p-3 font-medium">RSVP</th><th className="p-3 font-medium">Table</th><th className="p-3 font-medium">Seat number</th></tr></thead>
        <tbody>{visible.map(guest => <tr key={guest.id} className="border-t">
          <td className="p-3"><span className="font-medium">{guest.fullName}</span><span className="mt-1 block text-xs text-ink-muted">{guest.householdName}</span></td>
          <td className="p-3 capitalize">{guest.attendanceStatus}</td>
          <td className="p-3"><select aria-label={`Table for ${guest.fullName}`} disabled={disabled} value={assignments.get(guest.id)?.tableId ?? ""} onChange={event => onAssign(guest.id, event.target.value)} className="h-10 w-full min-w-32 rounded-md border bg-white px-2 text-sm disabled:opacity-60">
            <option value="">Unassigned</option>{plan.tables.map(table => <option key={table.id} value={table.id} disabled={guest.attendanceStatus === "declined"}>{table.name} ({plan.assignments.filter(item => item.tableId === table.id).length}/{table.capacity})</option>)}
          </select></td>
          <td className="p-3"><SeatNumberSelect plan={plan} tableId={assignments.get(guest.id)?.tableId ?? ""} guestId={guest.id} guestName={guest.fullName} value={assignments.get(guest.id)?.seatNumber} disabled={disabled || guest.attendanceStatus === "declined"} onChange={seat => onAssign(guest.id, assignments.get(guest.id)?.tableId ?? "", seat)} /></td>
        </tr>)}</tbody>
      </table>
      {visible.length === 0 && <p className="px-3 py-8 text-center text-sm text-ink-muted">No guests match this view.</p>}
    </div>
  </section>;
}
