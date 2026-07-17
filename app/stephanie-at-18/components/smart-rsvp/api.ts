import type {
  AccessResponse,
  EventInformation,
  PartyInformation,
  PartyResponse,
  SearchResponse,
  SubmissionSummary,
  SubmitResponse,
  SubmitRsvpPayload,
} from "./types";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let result: T;

  try {
    result = (await response.json()) as T;
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    const possibleError = result as {
      message?: string;
    };

    throw new Error(
      possibleError.message || "The request could not be completed.",
    );
  }

  return result;
}

export async function requestRsvpAccess(
  slug: string,
  code: string,
): Promise<EventInformation> {
  const result = await postJson<AccessResponse>("/api/rsvp/access", {
    slug,
    code,
  });

  if (!result.success || !result.event) {
    throw new Error(result.message || "Unable to verify the RSVP code.");
  }

  return result.event;
}

export async function requestGuestSearch(
  slug: string,
  code: string,
  fullName: string,
): Promise<SearchResponse> {
  const result = await postJson<SearchResponse>("/api/rsvp/search", {
    slug,
    code,
    fullName,
  });

  if (!result.success) {
    throw new Error(result.message || "Unable to search the guest list.");
  }

  return result;
}

export async function requestInvitationParty(
  slug: string,
  code: string,
  invitationId: number,
  matchedFullName: string,
): Promise<PartyInformation> {
  const result = await postJson<PartyResponse>("/api/rsvp/party", {
    slug,
    code,
    invitationId,
    matchedFullName,
  });

  if (!result.success || !result.party) {
    throw new Error(result.message || "Unable to load the selected party.");
  }

  return result.party;
}

export async function requestRsvpSubmission(
  payload: SubmitRsvpPayload,
): Promise<SubmissionSummary> {
  const result = await postJson<SubmitResponse>("/api/rsvp/submit", payload);

  if (!result.success || !result.summary) {
    throw new Error(result.message || "Unable to save the RSVP.");
  }

  return result.summary;
}
