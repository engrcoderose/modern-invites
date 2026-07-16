import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase";

interface AccessRequestBody {
  slug?: unknown;
  code?: unknown;
}

export async function POST(request: NextRequest) {
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
    typeof body.code !== "string"
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
  const code = body.code.trim();

  // ==========================================
  // 3. Validate basic input lengths
  // ==========================================

  if (
    slug.length < 1 ||
    slug.length > 100 ||
    code.length < 1 ||
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
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.rpc(
      "verify_event_rsvp_code",
      {
        p_slug: slug,
        p_code: code,
      },
    );

    if (error) {
      console.error("RSVP access verification failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify the RSVP code.",
        },
        { status: 500 },
      );
    }

    // A table-returning PostgreSQL function returns an array.
    const event = data?.[0];

    // No row means the slug or code did not match.
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "The RSVP code is incorrect.",
        },
        { status: 401 },
      );
    }

    // A matching row with is_open=false means the event
    // exists and the code is correct, but RSVPs are closed.
    if (!event.is_open) {
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
          name: event.event_name,
          slug,
          rsvpDeadline: event.rsvp_deadline,
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