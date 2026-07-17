import { NextRequest, NextResponse } from "next/server";

import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import {
  isRsvpDeadlinePassed,
  isValidOptionalEmail,
} from "@/lib/rsvp/security";
import { createSupabaseServerClient } from "@/lib/supabase";

type AttendanceStatus = "attending" | "declined";

interface SubmitRequestBody {
  slug?: unknown;
  code?: unknown;
  invitationId?: unknown;
  matchedFullName?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  guestResponses?: unknown;
}

interface VerifiedEventRow {
  event_id: number;
  event_name: string;
  rsvp_deadline: string | null;
  is_open: boolean;
}

interface DatabaseGuestResponse {
  guest_id: number;
  status: AttendanceStatus;
  dietary_restrictions: string;
}

interface SubmissionResult {
  success: boolean;
  invitation_id: number;
  total_guests: number;
  attending_count: number;
  declined_count: number;
  max_attendees: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, {
    scope: "rsvp-submit",
    rateLimit: { limit: 10, windowMs: 10 * 60 * 1000 },
  });

  if (policyError) {
    return policyError;
  }

  let body: SubmitRequestBody;

  // Read the JSON request.
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

  // Validate the main required fields.
  if (
    typeof body.slug !== "string" ||
    typeof body.code !== "string" ||
    typeof body.invitationId !== "number" ||
    typeof body.matchedFullName !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "The RSVP submission is incomplete.",
      },
      { status: 400 },
    );
  }

  if (
    body.email !== undefined &&
    body.email !== null &&
    typeof body.email !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "The email address is invalid.",
      },
      { status: 400 },
    );
  }

  if (
    body.phone !== undefined &&
    body.phone !== null &&
    typeof body.phone !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "The phone number is invalid.",
      },
      { status: 400 },
    );
  }

  if (
    body.message !== undefined &&
    body.message !== null &&
    typeof body.message !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "The RSVP message is invalid.",
      },
      { status: 400 },
    );
  }

  const slug = body.slug.trim().toLowerCase();
  const code = body.code.trim();
  const invitationId = body.invitationId;

  const matchedFullName = body.matchedFullName.trim().replace(/\s+/g, " ");

  const email = typeof body.email === "string" ? body.email.trim() : "";

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Validate lengths and numeric values.
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

  if (!Number.isSafeInteger(invitationId) || invitationId < 1) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid invitation selection.",
      },
      { status: 400 },
    );
  }

  if (matchedFullName.length < 3 || matchedFullName.length > 150) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid guest name.",
      },
      { status: 400 },
    );
  }

  if (email.length > 254) {
    return NextResponse.json(
      {
        success: false,
        message: "The email address is too long.",
      },
      { status: 400 },
    );
  }

  if (!isValidOptionalEmail(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  if (phone.length > 40) {
    return NextResponse.json(
      {
        success: false,
        message: "The phone number is too long.",
      },
      { status: 400 },
    );
  }

  if (message.length > 2000) {
    return NextResponse.json(
      {
        success: false,
        message: "The message is too long.",
      },
      { status: 400 },
    );
  }

  // The response must contain at least one party member.
  if (
    !Array.isArray(body.guestResponses) ||
    body.guestResponses.length < 1 ||
    body.guestResponses.length > 20
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Please answer for every member of your party.",
      },
      { status: 400 },
    );
  }

  const databaseGuestResponses: DatabaseGuestResponse[] = [];
  const seenGuestIds = new Set<number>();

  // Validate each individual guest response.
  for (const response of body.guestResponses) {
    if (!isRecord(response)) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more guest responses are invalid.",
        },
        { status: 400 },
      );
    }

    const guestId = response.guestId;
    const status = response.status;
    const dietaryValue = response.dietaryRestrictions;

    if (
      typeof guestId !== "number" ||
      !Number.isSafeInteger(guestId) ||
      guestId < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more guest IDs are invalid.",
        },
        { status: 400 },
      );
    }

    if (status !== "attending" && status !== "declined") {
      return NextResponse.json(
        {
          success: false,
          message: "Every guest must be marked attending or declined.",
        },
        { status: 400 },
      );
    }

    if (
      dietaryValue !== undefined &&
      dietaryValue !== null &&
      typeof dietaryValue !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more dietary responses are invalid.",
        },
        { status: 400 },
      );
    }

    const dietaryRestrictions =
      typeof dietaryValue === "string" ? dietaryValue.trim() : "";

    if (dietaryRestrictions.length > 500) {
      return NextResponse.json(
        {
          success: false,
          message: "A dietary restriction response is too long.",
        },
        { status: 400 },
      );
    }

    if (seenGuestIds.has(guestId)) {
      return NextResponse.json(
        {
          success: false,
          message: "The same guest cannot appear more than once.",
        },
        { status: 400 },
      );
    }

    seenGuestIds.add(guestId);

    databaseGuestResponses.push({
      guest_id: guestId,
      status,
      dietary_restrictions: dietaryRestrictions,
    });
  }

  try {
    const supabase = createSupabaseServerClient();

    // Verify the shared event code again.
    const { data: rawVerifiedEvents, error: verificationError } =
      await supabase.rpc("verify_event_rsvp_code", {
        p_slug: slug,
        p_code: code,
      });

    if (verificationError) {
      console.error("Submission verification failed:", {
        code: verificationError.code,
        message: verificationError.message,
        details: verificationError.details,
        hint: verificationError.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify the RSVP code.",
        },
        { status: 500 },
      );
    }

    const verifiedEvents = (rawVerifiedEvents ?? []) as VerifiedEventRow[];

    const event = verifiedEvents[0];

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "The RSVP code is incorrect.",
        },
        { status: 401 },
      );
    }

    if (!event.is_open || isRsvpDeadlinePassed(event.rsvp_deadline)) {
      return NextResponse.json(
        {
          success: false,
          message: "RSVPs for this event are currently closed.",
        },
        { status: 403 },
      );
    }

    // Submit the validated responses to PostgreSQL.
    const { data: rawSubmissionResult, error: submissionError } =
      await supabase.rpc("submit_invitation_rsvp", {
        p_event_id: event.event_id,
        p_invitation_id: invitationId,
        p_matched_full_name: matchedFullName,
        p_email: email,
        p_phone: phone,
        p_message: message,
        p_guest_responses: databaseGuestResponses,
      });

    if (submissionError) {
      console.error("RSVP database submission failed:", {
        code: submissionError.code,
        message: submissionError.message,
        details: submissionError.details,
        hint: submissionError.hint,
      });

      const safeExactMessages = [
        "Guest responses must be a JSON array.",
        "The selected invitation does not belong to this event.",
        "RSVPs are currently closed.",
        "The RSVP deadline has passed.",
        "The searched guest does not belong to this invitation.",
        "The email address is too long.",
        "The phone number is too long.",
        "The message is too long.",
        "Every guest must have a valid attendance response.",
        "The same guest cannot appear more than once.",
        "One or more guests do not belong to this invitation.",
        "Please answer for every member of your party.",
      ];

      const isSafeMessage =
        safeExactMessages.includes(submissionError.message) ||
        submissionError.message.startsWith(
          "This invitation allows a maximum of",
        );

      return NextResponse.json(
        {
          success: false,
          message: isSafeMessage
            ? submissionError.message
            : "Unable to save the RSVP.",
        },
        { status: 400 },
      );
    }

    const submissionResult = rawSubmissionResult as SubmissionResult | null;

    if (!submissionResult) {
      return NextResponse.json(
        {
          success: false,
          message: "Supabase did not return an RSVP result.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your RSVP has been saved.",
        summary: {
          totalGuests: submissionResult.total_guests,
          attendingCount: submissionResult.attending_count,
          declinedCount: submissionResult.declined_count,
          maxAttendees: submissionResult.max_attendees,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected RSVP submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred.",
      },
      { status: 500 },
    );
  }
}
