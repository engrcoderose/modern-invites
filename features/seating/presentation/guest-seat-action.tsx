import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SeatingGuest, SeatingPlan, SeatingTable } from "../domain/seating-plan";
import { availableSeatNumbers } from "../domain/seat-assignment";
import { SeatNumberSelect } from "./seat-number-select";

export function GuestSeatAction({ guest, table, plan, disabled, moving, onAssign }: {
  guest: SeatingGuest; table: SeatingTable; plan: SeatingPlan; disabled: boolean; moving: boolean;
  onAssign(guestId: number, tableId: string, seatNumber?: number): void;
}) {
  const available = availableSeatNumbers(plan, table.id, guest.id);
  const [seatNumber, setSeatNumber] = useState<number | undefined>(() => available[0]);
  return <div className="flex w-full items-center gap-2">
    <SeatNumberSelect plan={plan} tableId={table.id} guestId={guest.id} guestName={guest.fullName} value={seatNumber} disabled={disabled} onChange={setSeatNumber} />
    <Button type="button" variant="outline" size="sm" disabled={disabled || seatNumber !== undefined && !available.includes(seatNumber)} onClick={() => onAssign(guest.id, table.id, seatNumber)} aria-label={`Seat ${guest.fullName} at ${table.name}`}>{moving ? "Move" : "Seat"}</Button>
  </div>;
}
