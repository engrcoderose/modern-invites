import type { SavedSeatingPlan, SaveSeatingInput } from "./seating-plan";

export class SeatingError extends Error {
  readonly code: "forbidden" | "conflict" | "invalid";
  constructor(code: SeatingError["code"]) { super(code); this.code = code; }
}
export interface SeatingRepository {
  load(eventId: number): Promise<SavedSeatingPlan>;
  save(eventId: number, input: SaveSeatingInput): Promise<SavedSeatingPlan>;
}
