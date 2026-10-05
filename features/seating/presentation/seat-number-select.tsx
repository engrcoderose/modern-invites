import type { SeatingPlan } from "../domain/seating-plan";
import { availableSeatNumbers } from "../domain/seat-assignment";

export function SeatNumberSelect({ plan, tableId, guestId, guestName, value, disabled, onChange }: {
  plan: SeatingPlan; tableId: string; guestId: number; guestName: string; value?: number; disabled: boolean;
  onChange(value: number | undefined): void;
}) {
  const table = plan.tables.find(item => item.id === tableId);
  const available = new Set(availableSeatNumbers(plan, tableId, guestId));
  return <select aria-label={`Seat number for ${guestName}`} value={value ?? ""} disabled={disabled || !table}
    onChange={event => onChange(event.target.value ? Number(event.target.value) : undefined)}
    className="h-10 w-full min-w-32 rounded-md border bg-white px-2 text-sm disabled:opacity-60">
    <option value="">{table ? "Table only" : "Choose table first"}</option>
    {value !== undefined && table && value > table.capacity && <option value={value} disabled>Seat {value} — outside capacity</option>}
    {Array.from({ length: table?.capacity ?? 0 }, (_, index) => index + 1).map(number => <option key={number} value={number} disabled={!available.has(number)}>
      Seat {number}{available.has(number) ? "" : " — occupied"}
    </option>)}
  </select>;
}
