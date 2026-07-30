import type { ClientDashboardRepository } from "../domain/client-dashboard-repository";

export async function listAssignedEvents(
  repository: ClientDashboardRepository,
  userId: string,
) {
  return repository.listAssignedEvents(userId);
}
