import { NextRequest, NextResponse } from "next/server";
import { checkOpenRsvpName } from "@/features/rsvp/application/check-open-rsvp-name";
import { openRsvpNameSchema } from "@/features/rsvp/domain/open-rsvp";
import { createSupabaseOpenRsvpRepository } from "@/features/rsvp/infrastructure/supabase-open-rsvp-repository";
import { createSupabaseRsvpEventAccessRepository } from "@/features/rsvp/infrastructure/supabase-rsvp-event-access-repository";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";

function reply(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, { scope: "rsvp-open-name", rateLimit: { limit: 30, windowMs: 5 * 60 * 1000 } });
  if (policyError) return policyError;
  let body: unknown;
  try { body = await request.json(); }
  catch { return reply({ success: false, message: "The request body must be valid JSON." }, 400); }
  const parsed = openRsvpNameSchema.safeParse(body);
  if (!parsed.success) return reply({ success: false, message: parsed.error.issues[0].message }, 400);
  try {
    const result = await checkOpenRsvpName(createSupabaseRsvpEventAccessRepository(), createSupabaseOpenRsvpRepository(), parsed.data);
    if (result.status === "closed") return reply({ success: false, message: "RSVPs for this event are currently closed.", code: "RSVP_CLOSED" }, 403);
    if (result.status === "denied") return reply({ success: false, message: "Open RSVP is unavailable for this event." }, 403);
    return reply({ success: true, result }, 200);
  } catch {
    return reply({ success: false, message: "We could not check your name. Please try again." }, 500);
  }
}
