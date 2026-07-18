export type RSVPStage = "access" | "search" | "party";

export interface EventInformation {
  name: string;
  slug: string;
  rsvpDeadline: string | null;
}

export interface SearchMatch {
  invitationId: number;
  householdName: string;
  matchedGuestName: string;
}

export interface AccessResponse {
  success: boolean;
  message?: string;
  event?: EventInformation;
}

export interface SearchResponse {
  success: boolean;
  message?: string;
  matches?: SearchMatch[];
}

export interface PartyGuest {
  id: number;
  fullName: string;
  guestType: "adult" | "child";
  attendanceStatus: "pending" | "attending" | "declined";
  dietaryRestrictions: string | null;
}

export interface PartyInformation {
  householdName: string;
  maxAttendees: number;
  guests: PartyGuest[];
}

export interface PartyResponse {
  success: boolean;
  message?: string;
  party?: PartyInformation;
}

export type AttendanceChoice = "attending" | "declined";

export interface GuestResponseDraft {
  guestId: number;
  status: AttendanceChoice | null;
  dietaryRestrictions: string;
}

export interface SubmissionGuestResponse {
  guestId: number;
  status: AttendanceChoice;
  dietaryRestrictions: string;
}

export interface SubmitRsvpPayload {
  slug: string;
  code: string;
  invitationId: number;
  matchedFullName: string;
  email: string;
  phone: string;
  message: string;
  guestResponses: SubmissionGuestResponse[];
}

export interface SubmissionSummary {
  totalGuests: number;
  attendingCount: number;
  declinedCount: number;
  maxAttendees: number;
}

export interface SubmitResponse {
  success: boolean;
  message?: string;
  summary?: SubmissionSummary;
}
