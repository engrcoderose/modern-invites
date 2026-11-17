"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SeatingGuest, SeatingPlan, SeatingTable } from "../domain/seating-plan";
import { SeatNumberSelect } from "./seat-number-select";
import { GuestSeatAction } from "./guest-seat-action";

const filters = ["unassigned", "seated", "all"] as const;
type Filter = typeof filters[number];
const listClass = "min-h-0 overflow-y-auto overscroll-contain px-4 pb-4 [scrollbar-gutter:stable] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest";

export function TableGuestPicker({ table, plan, guests, disabled, view, onAssign }: {
  table: SeatingTable; plan: SeatingPlan; guests: SeatingGuest[]; disabled: boolean; view: "add" | "seated";
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

  if (view === "seated") return <div className="flex min-h-0 flex-col">
    <p className="shrink-0 px-4 pb-3 pt-4 text-sm leading-6 text-ink-muted">{seated.length ? "Change a seat number or remove a guest from this table." : "No guests seated here yet. Choose Add guests to get started."}</p>
    {seated.length > 0 && <div role="region" aria-label={`Guests at ${table.name}`} tabIndex={0} className={listClass}>
      <ul className="divide-y">{seated.map(assignment => {
        const guest = guests.find(item => item.id === assignment.guestId);
        return <li key={assignment.guestId} className="space-y-3 py-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><p className="break-words text-base font-medium leading-6">{guest?.fullName ?? "Guest removed from list"}</p>
              <p className="mt-1 break-words text-xs text-ink-muted">{guest?.householdName}{guest?.attendanceStatus === "declined" ? " · Declined" : ""}</p></div>
            <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={() => onAssign(assignment.guestId, "")} aria-label={`Unassign ${guest?.fullName ?? "removed guest"}`}>Remove</Button>
          </div>
          <SeatNumberSelect plan={plan} tableId={table.id} guestId={assignment.guestId} guestName={guest?.fullName ?? "removed guest"} value={assignment.seatNumber} disabled={disabled || !guest || guest.attendanceStatus === "declined"} onChange={seat => onAssign(assignment.guestId, table.id, seat)} />
        </li>;
      })}</ul>
    </div>}
  </div>;

  return <div className="flex min-h-0 flex-col">
    <div className="shrink-0 space-y-3 border-b p-4">
      <label className="block space-y-2"><span className="text-sm font-medium text-forest">Find a guest</span>
        <Input value={search} onChange={event => setSearch(event.target.value)} placeholder="Name, household or table" aria-label="Search guests to seat" type="search" className="h-11" /></label>
      <div className="grid grid-cols-3 gap-1 rounded-lg border p-1" role="group" aria-label="Filter guests to seat">
        {filters.map(value => <Button key={value} type="button" size="sm" variant={filter === value ? "default" : "ghost"} aria-pressed={filter === value} onClick={() => setFilter(value)} className={`px-1 text-xs capitalize ${filter === value ? "bg-forest text-white" : ""}`}>{value}</Button>)}
      </div>
      <p role="status" className="text-xs leading-5 text-ink-muted">{full ? "This table is full. Remove a seated guest or increase capacity in Settings." : `${table.capacity - seated.length} seats left · ${visible.length} ${visible.length === 1 ? "guest" : "guests"} found`}</p>
    </div>
    <div role="region" aria-label="Guest search results" tabIndex={0} className={listClass}>
      <ul className="divide-y">{visible.map(guest => {
        const current = assignments.get(guest.id);
        const atTable = current === table.id;
        return <li key={guest.id} className="space-y-3 py-4">
          <div className="min-w-0"><p className="break-words text-base font-medium leading-6">{guest.fullName}</p>
            <p className="mt-1 break-words text-xs text-ink-muted">{guest.householdName} · {current ? tableNames.get(current) : "Unassigned"}</p>
            {guest.attendanceStatus === "declined" && <p className="text-xs text-destructive">Declined · cannot be seated</p>}</div>
          {atTable ? <p className="text-xs text-forest">Already at this table · manage under Seated</p> : <GuestSeatAction key={`${guest.id}:${table.id}`} guest={guest} table={table} plan={plan} moving={!!current} disabled={disabled || full || guest.attendanceStatus === "declined"} onAssign={onAssign} />}
        </li>;
      })}</ul>
      {visible.length === 0 && <p className="py-6 text-center text-sm leading-6 text-ink-muted">{search ? "No guests match your search. Try another name or household." : filter === "unassigned" ? "No eligible guests are waiting for a seat. Try Seated or All to review." : "No guests in this view."}</p>}
    </div>
  </div>;
}
