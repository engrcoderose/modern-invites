import { NextRequest, NextResponse } from "next/server";

import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import { isValidOptionalEmail } from "@/lib/rsvp/security";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type AttendanceStatus = "attending" | "declined";

interface SubmitRsvpBody {
  attendeeName?: unknown;
  attendance?: unknown;
  contact?: unknown;
  email?: unknown;
}

function normalizeText(value: unknown) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ")
    : "";
}

function isValidContact(contact: string) {
  return /^[+()\d][+()\d\s.-]{5,39}$/.test(contact);
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, {
    scope: "nylgen-kersee-rsvp",
    rateLimit: { limit: 10, windowMs: 10 * 60 * 1000 },
  });

  if (policyError) {
    return policyError;
  }

  let body: SubmitRsvpBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "The submitted form is invalid." },
      { status: 400 },
    );
  }

  const attendeeName = normalizeText(body.attendeeName);
  const contact = normalizeText(body.contact);
  const email = normalizeText(body.email).toLowerCase();
  const attendance = body.attendance;

  if (attendeeName.length < 2 || attendeeName.length > 150) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter the attendee's complete name.",
      },
      { status: 400 },
    );
  }

  if (attendance !== "attending" && attendance !== "declined") {
    return NextResponse.json(
      {
        success: false,
        message: "Please select whether the attendee will be joining.",
      },
      { status: 400 },
    );
  }

  if (!isValidContact(contact)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid contact number.",
      },
      { status: 400 },
    );
  }

  if (
    email.length === 0 ||
    email.length > 254 ||
    !isValidOptionalEmail(email)
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  const tableName =
    process.env.NYLGEN_KERSEE_RSVP_TABLE ?? "nylgen_kersee_rsvps";

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from(tableName).insert({
      attendee_name: attendeeName,
      attendance_status: attendance satisfies AttendanceStatus,
      contact_number: contact,
      email,
      submitted_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Nylgen and Kersee RSVP insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "RSVP tracking is not connected yet. Please contact the couple directly for now.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your RSVP has been saved.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unexpected Nylgen and Kersee RSVP error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "RSVP tracking is not connected yet. Please contact the couple directly for now.",
      },
      { status: 503 },
    );
  }
}
