"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SeatingGuest, SeatingPlan, SeatingTable } from "../domain/seating-plan";
import { SeatNumberSelect } from "./seat-number-select";
import { GuestSeatAction } from "./guest-seat-action";

const filters = ["unassigned", "seated", "all"] as const;
type Filter = typeof filters[number];

export function TableGuestPicker({ table, plan, guests, disabled, onAssign }: {
  table: SeatingTable; plan: SeatingPlan; guests: SeatingGuest[]; disabled: boolean;
  onAssign(guestId: number, tableId: string, seatNumber?: number): void;
}) {
  const [filter, setFilter] = useState<Filter>("unassigned");
  const [search, setSearch] = useState("");
  const assignments = new Map(plan.assignments.map(assignment => [assignment.guestId, assignment.tableId]));
  const tableNames = new Map(plan.tables.map(item => [item.id, item.name]));
  const seated = plan.assignments.filter(assignment => assignment.tableId === table.id);
  const full = seated.length >= table.capacity;
  const visible = guests.filter(guest => {
    const assignedTable = assignments.get(guest.id);
    const matches = `${guest.fullName} ${guest.householdName} ${tableNames.get(assignedTable ?? "") ?? ""}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
    return matches && (filter === "all" || (filter === "seated" ? !!assignedTable : !assignedTable && guest.attendanceStatus !== "declined"));
  });
  return <div className="space-y-5 border-t pt-5">
    <section aria-label={`Guests at ${table.name}`} className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Guests at this table</h3>
      {seated.length === 0 ? <p className="text-sm text-ink-muted">No guests seated here yet.</p> :
        <ul className="max-h-60 divide-y overflow-y-auto">{seated.map(assignment => {
          const guest = guests.find(item => item.id === assignment.guestId);
          return <li key={assignment.guestId} className="space-y-2 py-3">
            <div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-sm font-medium">{guest?.fullName ?? "Guest removed from list"}</p>
              <p className="mt-1 break-words text-xs text-ink-muted">{guest?.householdName}{guest?.attendanceStatus === "declined" ? " · Declined" : ""}</p></div>
            <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={() => onAssign(assignment.guestId, "")} aria-label={`Unassign ${guest?.fullName ?? "removed guest"}`}>Remove</Button></div>
            <SeatNumberSelect plan={plan} tableId={table.id} guestId={assignment.guestId} guestName={guest?.fullName ?? "removed guest"} value={assignment.seatNumber} disabled={disabled || !guest || guest.attendanceStatus === "declined"} onChange={seat => onAssign(assignment.guestId, table.id, seat)} />
          </li>;
        })}</ul>}
    </section>
    <section aria-label="Find guests to seat" className="space-y-3 border-t pt-5">
      <div className="grid grid-cols-3 gap-1 rounded-lg border p-1" role="group" aria-label="Filter guests to seat">
        {filters.map(value => <Button key={value} type="button" size="sm" variant={filter === value ? "default" : "ghost"} aria-pressed={filter === value} onClick={() => setFilter(value)} className={`px-1 text-xs capitalize ${filter === value ? "bg-forest text-white" : ""}`}>{value}</Button>)}
      </div>
      <label className="block space-y-2"><span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Find guests to seat</span>
        <Input value={search} onChange={event => setSearch(event.target.value)} placeholder="Name, household or table" aria-label="Search guests to seat" type="search" /></label>
      {full && <p role="status" className="text-xs text-ink-muted">This table is full. Increase its seats or remove a guest to seat someone else.</p>}
      <ul className="max-h-80 divide-y overflow-y-auto">{visible.map(guest => {
        const current = assignments.get(guest.id);
        const atTable = current === table.id;
        return <li key={guest.id} className="space-y-2 py-3">
          <div className="min-w-0"><p className="break-words text-sm font-medium">{guest.fullName}</p>
            <p className="mt-1 break-words text-xs text-ink-muted">{guest.householdName} · {current ? tableNames.get(current) : "Unassigned"}</p>
            {guest.attendanceStatus === "declined" && <p className="text-xs text-destructive">Declined · cannot be seated</p>}</div>
          {atTable ? <p className="text-xs text-forest">Already at this table</p> : <GuestSeatAction key={`${guest.id}:${table.id}`} guest={guest} table={table} plan={plan} moving={!!current} disabled={disabled || full || guest.attendanceStatus === "declined"} onAssign={onAssign} />}
        </li>;
      })}</ul>
      {visible.length === 0 && <p className="py-4 text-center text-sm leading-6 text-ink-muted">{search ? "No guests match your search." : filter === "unassigned" ? "No eligible guests are waiting for a seat. Try Seated or All to review." : "No guests in this view."}</p>}
    </section>
  </div>;
}
