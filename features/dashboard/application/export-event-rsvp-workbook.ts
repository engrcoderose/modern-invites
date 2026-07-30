import type { ClientDashboardRepository } from "../domain/client-dashboard-repository";
import type {
  RsvpWorkbook,
  RsvpWorkbookExporter,
} from "../domain/rsvp-workbook-exporter";

export async function exportEventRsvpWorkbook(
  repository: ClientDashboardRepository,
  exporter: RsvpWorkbookExporter,
  userId: string,
  eventId: number,
): Promise<RsvpWorkbook | null> {
  const events = await repository.listAssignedEvents(userId);
  const event = events.find((candidate) => candidate.id === eventId);

  if (!event) {
    return null;
  }

  const guests = await repository.listAllEventGuests(userId, eventId);
  return exporter.create(event, guests);
}
