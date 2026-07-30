export type DashboardEventRole = "owner" | "editor" | "viewer";
export type DashboardGuestType = "adult" | "child";
export type DashboardAttendanceStatus =
  | "pending"
  | "attending"
  | "declined";

export interface AssignedDashboardEvent {
  id: number;
  name: string;
  slug: string;
  rsvpDeadline: string | null;
  role: DashboardEventRole;
}

export interface DashboardSummary {
  totalGuests: number;
  attendingGuests: number;
  declinedGuests: number;
  pendingGuests: number;
  totalInvitations: number;
  submittedRsvps: number;
}

export interface DashboardGuest {
  id: number;
  invitationId: number;
  householdName: string;
  maxAttendees: number;
  fullName: string;
  guestType: DashboardGuestType;
  attendanceStatus: DashboardAttendanceStatus;
  dietaryRestrictions: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  submittedAt: string | null;
}

export interface DashboardGuestQuery {
  page: number;
  pageSize: number;
  search?: string;
  attendanceStatus?: DashboardAttendanceStatus;
}

export interface DashboardGuestPage {
  guests: DashboardGuest[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardHousehold {
  id: number;
  name: string;
  maxAttendees: number;
  guestCount: number;
}

export interface ClientEventWorkspace {
  event: AssignedDashboardEvent;
  summary: DashboardSummary;
  guestPage: DashboardGuestPage;
  households: DashboardHousehold[];
}

export interface CreateDashboardGuestCommand {
  eventId: number;
  invitationId: number | null;
  householdName: string | null;
  fullName: string;
  guestType: DashboardGuestType;
  dietaryRestrictions: string | null;
}

export interface UpdateDashboardGuestCommand {
  eventId: number;
  guestId: number;
  fullName: string;
  guestType: DashboardGuestType;
  attendanceStatus: DashboardAttendanceStatus;
  dietaryRestrictions: string | null;
}
