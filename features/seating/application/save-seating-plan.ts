import { includesSeatFinder } from "../../services/domain/client-services.ts";
import type { AssignedDashboardEvent } from "../../dashboard/domain/client-dashboard";
import { saveSeatingSchema, validateSeatingGuests, type SeatingGuest } from "../domain/seating-plan.ts";
import { SeatingError, type SeatingRepository } from "../domain/seating-repository.ts";

export async function saveSeatingPlan(dependencies: {
  findEvent(): Promise<AssignedDashboardEvent | null>;
  listGuests(): Promise<SeatingGuest[]>;
  repository: SeatingRepository;
}, eventId: number, body: unknown) {
  const event = await dependencies.findEvent();
  if (!event || event.id !== eventId || !includesSeatFinder(event.clientServices) || event.role === "viewer") {
    throw new SeatingError("forbidden");
  }
  const parsed = saveSeatingSchema.safeParse(body);
  if (!parsed.success) throw new SeatingError("invalid");
  // Closing the public page must still work after a guest declines or is
  // deleted. The database keeps the stored draft unchanged for unpublish.
  if (parsed.data.publish !== false && validateSeatingGuests(parsed.data.plan, await dependencies.listGuests())) throw new SeatingError("invalid");
  return dependencies.repository.save(eventId, parsed.data);
}
