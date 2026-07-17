export type RSVPStage = "access" | "search";

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
