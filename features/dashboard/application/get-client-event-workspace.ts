import type { ClientDashboardRepository } from "../domain/client-dashboard-repository";
import type { DashboardGuestQuery } from "../domain/client-dashboard";

export async function getClientEventWorkspace(
  repository: ClientDashboardRepository,
  userId: string,
  eventId: number,
  query: DashboardGuestQuery,
) {
  return repository.getEventWorkspace(userId, eventId, query);
}
