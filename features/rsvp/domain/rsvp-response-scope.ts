import type { RsvpAccessMode } from "./rsvp-event-access";

export interface ResponseScopeGuest {
  id: number;
  fullName: string;
}

function normalizeInvitedName(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
}

export function getGuestsAllowedForResponse<TGuest extends ResponseScopeGuest>(
  accessMode: RsvpAccessMode,
  matchedFullName: string,
  guests: TGuest[],
) {
  if (accessMode === "shared_code") {
    return guests;
  }

  const normalizedMatchedName = normalizeInvitedName(matchedFullName);

  return guests.filter(
    (guest) =>
      normalizeInvitedName(guest.fullName) === normalizedMatchedName,
  );
}

export function canSubmitGuestResponses(
  accessMode: RsvpAccessMode,
  matchedFullName: string,
  partyGuests: ResponseScopeGuest[],
  submittedGuestIds: number[],
) {
  const allowedGuests = getGuestsAllowedForResponse(
    accessMode,
    matchedFullName,
    partyGuests,
  );

  if (accessMode === "name_search" && allowedGuests.length !== 1) {
    return false;
  }

  if (submittedGuestIds.length !== allowedGuests.length) {
    return false;
  }

  const allowedGuestIds = new Set(allowedGuests.map((guest) => guest.id));

  return submittedGuestIds.every((guestId) =>
    allowedGuestIds.has(guestId),
  );
}
