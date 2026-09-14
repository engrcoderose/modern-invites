import { type NextRequest, NextResponse } from "next/server";
import { createGuestAction } from "@/app/dashboard/(protected)/actions";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ eventId: string }> },
) {
  const blocked = enforceRsvpRequestPolicy(request, {
    scope: "dashboard-create-guest",
    maximumBodyBytes: 8 * 1024,
    rateLimit: { limit: 30, windowMs: 60_000 },
  });
  if (blocked) return blocked;

  const { eventId } = await context.params;
  const responseHeaders = { "Cache-Control": "no-store" };
  if (!Number.isSafeInteger(Number(eventId)) || Number(eventId) < 1) {
    return NextResponse.json(
      { status: "error", message: "The event identifier is invalid." },
      { status: 400, headers: responseHeaders },
    );
  }

  let payload: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > 8 * 1024) {
      return NextResponse.json(
        { status: "error", message: "The request is too large." },
        { status: 413, headers: responseHeaders },
      );
    }
    payload = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { status: "error", message: "The guest information is invalid." },
      { status: 400, headers: responseHeaders },
    );
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { status: "error", message: "The guest information is invalid." },
      { status: 400, headers: responseHeaders },
    );
  }

  const form = new FormData();
  form.set("eventId", eventId);
  for (const key of [
    "invitationId",
    "householdName",
    "maximumGuests",
    "fullName",
    "guestType",
    "dietaryRestrictions",
  ]) {
    const value = (payload as Record<string, unknown>)[key];
    if (typeof value === "string") form.set(key, value);
  }

  // Reuse the existing validation, authenticated-client and event-role checks.
  // In a route handler revalidation invalidates data without attaching a fresh
  // dashboard render to the mutation response.
  const result = await createGuestAction({ status: "idle" }, form);
  return NextResponse.json(result, {
    status: result.status === "success" ? 201 : 400,
    headers: responseHeaders,
  });
}
