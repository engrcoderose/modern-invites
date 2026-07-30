import type {
  CreateDashboardGuestCommand,
  UpdateDashboardGuestCommand,
} from "../domain/client-dashboard";
import type { ClientDashboardRepository } from "../domain/client-dashboard-repository";

export class GuestManagementError extends Error {
  public readonly code: "forbidden" | "not_found" | "unexpected";

  constructor(
    code: "forbidden" | "not_found" | "unexpected",
    message: string,
  ) {
    super(message);
    this.name = "GuestManagementError";
    this.code = code;
  }
}

async function requireGuestManager(
  repository: ClientDashboardRepository,
  userId: string,
  eventId: number,
) {
  const role = await repository.getEventRole(userId, eventId);

  if (role !== "owner" && role !== "editor") {
    throw new GuestManagementError(
      "forbidden",
      "You do not have permission to manage this guest list.",
    );
  }
}

export async function createDashboardGuest(
  repository: ClientDashboardRepository,
  userId: string,
  command: CreateDashboardGuestCommand,
) {
  await requireGuestManager(repository, userId, command.eventId);
  await repository.createGuest(userId, command);
}

export async function updateDashboardGuest(
  repository: ClientDashboardRepository,
  userId: string,
  command: UpdateDashboardGuestCommand,
) {
  await requireGuestManager(repository, userId, command.eventId);
  await repository.updateGuest(userId, command);
}

export async function deleteDashboardGuest(
  repository: ClientDashboardRepository,
  userId: string,
  eventId: number,
  guestId: number,
) {
  await requireGuestManager(repository, userId, eventId);
  await repository.deleteGuest(userId, eventId, guestId);
}
