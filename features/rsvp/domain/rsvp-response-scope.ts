import type { RsvpResponseMode } from "./rsvp-event-access";

export interface ResponseScopeGuest {
  id: number;
  fullName: string;
}

function normalizeInvitedName(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
}

export function getGuestsAllowedForResponse<TGuest extends ResponseScopeGuest>(
  responseMode: RsvpResponseMode,
  matchedFullName: string,
  guests: TGuest[],
) {
  if (responseMode === "household") {
    return guests;
  }

  const normalizedMatchedName = normalizeInvitedName(matchedFullName);

  return guests.filter(
    (guest) =>
      normalizeInvitedName(guest.fullName) === normalizedMatchedName,
  );
}

export function canSubmitGuestResponses(
  responseMode: RsvpResponseMode,
  matchedFullName: string,
  partyGuests: ResponseScopeGuest[],
  submittedGuestIds: number[],
) {
  const allowedGuests = getGuestsAllowedForResponse(
    responseMode,
    matchedFullName,
    partyGuests,
  );

  if (responseMode === "individual" && allowedGuests.length !== 1) {
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
