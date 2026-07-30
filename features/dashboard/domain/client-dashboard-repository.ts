import type {
  AssignedDashboardEvent,
  ClientEventWorkspace,
  CreateDashboardGuestCommand,
  DashboardEventRole,
  DashboardGuest,
  DashboardGuestQuery,
  UpdateDashboardGuestCommand,
} from "./client-dashboard";

export interface ClientDashboardRepository {
  listAssignedEvents(userId: string): Promise<AssignedDashboardEvent[]>;
  getEventRole(
    userId: string,
    eventId: number,
  ): Promise<DashboardEventRole | null>;
  getEventWorkspace(
    userId: string,
    eventId: number,
    query: DashboardGuestQuery,
  ): Promise<ClientEventWorkspace | null>;
  listAllEventGuests(
    userId: string,
    eventId: number,
  ): Promise<DashboardGuest[]>;
  createGuest(
    userId: string,
    command: CreateDashboardGuestCommand,
  ): Promise<void>;
  updateGuest(
    userId: string,
    command: UpdateDashboardGuestCommand,
  ): Promise<void>;
  deleteGuest(
    userId: string,
    eventId: number,
    guestId: number,
  ): Promise<void>;
  deleteHousehold(
    userId: string,
    eventId: number,
    householdId: number,
  ): Promise<void>;
}
