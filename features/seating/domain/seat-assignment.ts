import type { SeatingPlan } from "./seating-plan";

export function availableSeatNumbers(plan: SeatingPlan, tableId: string, guestId?: number) {
  const table = plan.tables.find(item => item.id === tableId);
  if (!table) return [];
  const occupied = new Set(plan.assignments.filter(item => item.tableId === tableId && item.guestId !== guestId).map(item => item.seatNumber));
  return Array.from({ length: table.capacity }, (_, index) => index + 1).filter(number => !occupied.has(number));
}

export function seatAssignmentIssue(plan: SeatingPlan, guestId: number, tableId: string, seatNumber?: number) {
  const table = plan.tables.find(item => item.id === tableId);
  if (!table) return "Choose an existing table.";
  const others = plan.assignments.filter(item => item.tableId === tableId && item.guestId !== guestId);
  if (others.length >= table.capacity) return "This table is full. Increase its seats or choose another table.";
  if (seatNumber !== undefined && (!Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > table.capacity)) return "Choose a seat number within this table's capacity.";
  if (seatNumber !== undefined && others.some(item => item.seatNumber === seatNumber)) return "This seat is already assigned. Choose another seat.";
  return null;
}
