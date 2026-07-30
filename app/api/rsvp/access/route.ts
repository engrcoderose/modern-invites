import { NextRequest, NextResponse } from "next/server";

import { resolveRsvpEventAccess } from "@/features/rsvp/application/resolve-rsvp-event-access";
import { createSupabaseRsvpEventAccessRepository } from "@/features/rsvp/infrastructure/supabase-rsvp-event-access-repository";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";

interface AccessRequestBody {
  slug?: unknown;
  code?: unknown;
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, {
    scope: "rsvp-access",
    rateLimit: { limit: 10, windowMs: 5 * 60 * 1000 },
  });

  if (policyError) {
    return policyError;
  }

  let body: AccessRequestBody;

  // ==========================================
  // 1. Read the incoming JSON safely
  // ==========================================

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "The request body must be valid JSON.",
      },
      { status: 400 },
    );
  }

  // ==========================================
  // 2. Validate the input types
  // ==========================================

  if (
    typeof body.slug !== "string" ||
    (body.code !== undefined &&
      body.code !== null &&
      typeof body.code !== "string")
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Event slug and RSVP code are required.",
      },
      { status: 400 },
    );
  }

  const slug = body.slug.trim().toLowerCase();
  const code = typeof body.code === "string" ? body.code.trim() : "";

  // ==========================================
  // 3. Validate basic input lengths
  // ==========================================

  if (
    slug.length < 1 ||
    slug.length > 100 ||
    code.length > 64
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid event or RSVP code.",
      },
      { status: 400 },
    );
  }

  // ==========================================
  // 4. Call the Supabase verification function
  // ==========================================

  try {
    const access = await resolveRsvpEventAccess(
      createSupabaseRsvpEventAccessRepository(),
      { slug, code },
    );

    if (access.status === "denied") {
      return NextResponse.json(
        {
          success: false,
          message: code
            ? "The RSVP code is incorrect."
            : "RSVP access is unavailable.",
        },
        { status: 401 },
      );
    }

    if (access.status === "closed") {
      return NextResponse.json(
        {
          success: false,
          message: "RSVPs for this event are currently closed.",
        },
        { status: 403 },
      );
    }

    // ==========================================
    // 5. Return only safe event information
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        event: {
          name: access.event.eventName,
          slug,
          rsvpDeadline: access.event.rsvpDeadline,
          accessMode: access.event.accessMode,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected RSVP access error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred.",
      },
      { status: 500 },
    );
  }
}
