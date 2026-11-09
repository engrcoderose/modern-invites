import { nameWithoutMiddleInitials } from "../../../features/rsvp/application/search-invitations-without-middle-initials.ts";
import type { SubmissionSummary } from "../../../components/smart-rsvp/types";
import type { PreviewHousehold, PreviewMatch, PreviewResponses } from "../data/rsvp-preview";

export function findPreviewHouseholds(households: readonly PreviewHousehold[], fullName: string): PreviewMatch[] {
  const normalized = nameWithoutMiddleInitials(fullName);
  if (normalized.split(" ").filter(Boolean).length < 2) return [];
  return households.flatMap(household => {
    const guest = household.guests.find(member => nameWithoutMiddleInitials(member.fullName) === normalized);
    return guest ? [{ household, matchedGuestName: guest.fullName }] : [];
  });
}

export function createPreviewResponses(household: PreviewHousehold): PreviewResponses {
  return Object.fromEntries(household.guests.map(guest => [guest.key, { status: null, dietaryRestrictions: "" }]));
}

export function getPreviewSummary(household: PreviewHousehold, responses: PreviewResponses): SubmissionSummary {
  return {
    totalGuests: household.guests.length,
    attendingCount: household.guests.filter(guest => responses[guest.key]?.status === "attending").length,
    declinedCount: household.guests.filter(guest => responses[guest.key]?.status === "declined").length,
    maxAttendees: household.maxAttendees,
  };
}

export function validatePreviewResponses(household: PreviewHousehold, responses: PreviewResponses): string {
  if (household.guests.some(guest => !responses[guest.key]?.status)) return "Please respond for each invited guest.";
  if (getPreviewSummary(household, responses).attendingCount > household.maxAttendees) {
    return `This household invitation allows up to ${household.maxAttendees} guests to attend.`;
  }
  return "";
}
