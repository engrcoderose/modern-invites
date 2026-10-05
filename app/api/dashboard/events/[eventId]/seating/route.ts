import { NextRequest, NextResponse } from "next/server";
import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import { saveSeatingPlan } from "@/features/seating/application/save-seating-plan";
import { SeatingError } from "@/features/seating/domain/seating-repository";
import { createSupabaseSeatingRepository } from "@/features/seating/infrastructure/supabase-seating-repository";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import {
  JsonRequestError,
  readLimitedJson,
} from "@/lib/http/read-limited-json";

const MAX_BODY_BYTES = 512 * 1024;
function response(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, private" },
  });
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const rejected = enforceRsvpRequestPolicy(request, {
    scope: "seating-save",
    rateLimit: { limit: 30, windowMs: 60_000 },
    maximumBodyBytes: MAX_BODY_BYTES,
  });
  if (rejected) return rejected;
  const eventId = Number((await params).eventId);
  if (!Number.isSafeInteger(eventId) || eventId <= 0)
    return response({ message: "Event unavailable." }, 404);
  try {
    const access = await getClientAccess(
      await createSupabaseClientAuthRepository(),
    );
    if (access.status !== "authorized")
      return response({ message: "Sign in again to save." }, 401);
    const body = await readLimitedJson(request, MAX_BODY_BYTES);
    const dashboard = await createSupabaseClientDashboardRepository();
    const saved = await saveSeatingPlan(
      {
        findEvent: async () =>
          (await dashboard.listAssignedEvents(access.principal.userId)).find(
            (event) => event.id === eventId,
          ) ?? null,
        listGuests: () =>
          dashboard.listAllEventGuests(access.principal.userId, eventId),
        repository: await createSupabaseSeatingRepository(),
      },
      eventId,
      body,
    );
    return response(saved);
  } catch (error) {
    if (error instanceof JsonRequestError)
      return response({ message: error.message }, error.status);
    if (error instanceof SeatingError) {
      const messages = {
        forbidden: "You do not have permission to manage this seating plan.",
        conflict:
          "This plan changed in another session. Reload to review the latest version; your unsaved edits are still here.",
        invalid:
          "Check the plan: guests must belong to this event, must not have declined, and tables must have enough seats.",
      };
      return response(
        { message: messages[error.code] },
        error.code === "forbidden"
          ? 403
          : error.code === "conflict"
            ? 409
            : 400,
      );
    }
    return response(
      {
        message:
          "Unable to save. Your changes are still here. Please try again.",
      },
      500,
    );
  }
}
