import { NextRequest, NextResponse } from "next/server";
import { OpenRsvpAlreadyRespondedError, OpenRsvpNameAmbiguousError, OpenRsvpNameExistsError } from "@/features/rsvp/domain/open-rsvp-error";
import { openRsvpSchema } from "@/features/rsvp/domain/open-rsvp";
import { submitOpenRsvp } from "@/features/rsvp/application/submit-open-rsvp";
import { createSupabaseOpenRsvpRepository } from "@/features/rsvp/infrastructure/supabase-open-rsvp-repository";
import { createSupabaseRsvpEventAccessRepository } from "@/features/rsvp/infrastructure/supabase-rsvp-event-access-repository";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";

function reply(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, {
    scope: "rsvp-open",
    rateLimit: { limit: 10, windowMs: 10 * 60 * 1000 },
  });
  if (policyError) return policyError;

  let body: unknown;
  try { body = await request.json(); }
  catch { return reply({ success: false, message: "The request body must be valid JSON." }, 400); }
  const parsed = openRsvpSchema.safeParse(body);
  if (!parsed.success) return reply({ success: false, message: parsed.error.issues[0].message }, 400);

  try {
    const result = await submitOpenRsvp(
      createSupabaseRsvpEventAccessRepository(),
      createSupabaseOpenRsvpRepository(),
      parsed.data,
    );
    if (result.status === "closed") return reply({ success: false, message: "RSVPs for this event are currently closed.", code: "RSVP_CLOSED" }, 403);
    if (result.status === "denied") return reply({ success: false, message: "Open RSVP is unavailable for this event." }, 403);
    return reply({ success: true, summary: result.summary }, 200);
  } catch (error) {
    if (error instanceof OpenRsvpAlreadyRespondedError) return reply({ success: false, code: "ALREADY_RESPONDED", message: error.message }, 409);
    if (error instanceof OpenRsvpNameAmbiguousError) return reply({ success: false, code: "AMBIGUOUS_NAME", message: error.message }, 409);
    if (error instanceof OpenRsvpNameExistsError) return reply({ success: false, message: error.message }, 409);
    return reply({ success: false, message: "We could not save your reply. Please try again." }, 500);
  }
}
