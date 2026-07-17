import type { AccessResponse, EventInformation, SearchResponse } from "./types";

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
