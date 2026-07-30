import { NextRequest, NextResponse } from "next/server";

import { resolveRsvpEventAccess } from "@/features/rsvp/application/resolve-rsvp-event-access";
import { createSupabaseRsvpEventAccessRepository } from "@/features/rsvp/infrastructure/supabase-rsvp-event-access-repository";
import { canSubmitGuestResponses } from "@/features/rsvp/domain/rsvp-response-scope";
import { isRsvpResponseLocked } from "@/features/rsvp/domain/rsvp-response-lock";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import {
  isValidOptionalEmail,
} from "@/lib/rsvp/security";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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

interface PartyGuestRow {
  guest_id: number;
  guest_full_name: string;
}

interface GuestResponseStateRow {
  responded_at: string | null;
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
    (body.code !== undefined &&
      body.code !== null &&
      typeof body.code !== "string") ||
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
  const code = typeof body.code === "string" ? body.code.trim() : "";
  const invitationId = body.invitationId;

  const matchedFullName = body.matchedFullName.trim().replace(/\s+/g, " ");

  const email = typeof body.email === "string" ? body.email.trim() : "";

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Validate lengths and numeric values.
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
            : "Unable to verify this invitation.",
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

    const supabase = createSupabaseAdminClient();

    let rawSubmissionResult: unknown;
    let submissionError: {
      code?: string;
      message: string;
      details?: string;
      hint?: string;
    } | null;

    if (access.event.accessMode === "name_search") {
      // Re-load the invitation on the server. The browser is not
      // trusted to decide which guest it may update.
      const { data: rawPartyRows, error: partyError } =
        await supabase.rpc("get_invitation_party", {
          p_event_id: access.event.eventId,
          p_invitation_id: invitationId,
          p_matched_full_name: matchedFullName,
        });

      if (partyError) {
        console.error("Individual RSVP verification failed:", {
          code: partyError.code,
          message: partyError.message,
          details: partyError.details,
          hint: partyError.hint,
        });

        return NextResponse.json(
          {
            success: false,
            message: "Unable to verify this guest.",
          },
          { status: 400 },
        );
      }

      const partyGuests = ((rawPartyRows ?? []) as PartyGuestRow[]).map(
        (guest) => ({
          id: guest.guest_id,
          fullName: guest.guest_full_name,
        }),
      );

      if (
        !canSubmitGuestResponses(
          access.event.accessMode,
          matchedFullName,
          partyGuests,
          databaseGuestResponses.map((response) => response.guest_id),
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "You may only respond for your own invited name.",
          },
          { status: 403 },
        );
      }

      const individualResponse = databaseGuestResponses[0];
      const { data: responseState, error: responseStateError } =
        await supabase
          .from("guests")
          .select("responded_at")
          .eq("id", individualResponse.guest_id)
          .eq("invitation_id", invitationId)
          .maybeSingle();

      if (responseStateError || !responseState) {
        return NextResponse.json(
          {
            success: false,
            message: "Unable to verify the RSVP response status.",
          },
          { status: 400 },
        );
      }

      if (
        isRsvpResponseLocked(
          (responseState as GuestResponseStateRow).responded_at,
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Your RSVP has already been received. Please contact the couple to request a change.",
          },
          { status: 409 },
        );
      }

      const result = await supabase.rpc(
        "submit_locked_individual_guest_rsvp",
        {
          p_event_id: access.event.eventId,
          p_invitation_id: invitationId,
          p_matched_full_name: matchedFullName,
          p_guest_id: individualResponse.guest_id,
          p_status: individualResponse.status,
          p_dietary_restrictions:
            individualResponse.dietary_restrictions,
          p_email: email,
          p_phone: phone,
          p_message: message,
        },
      );

      rawSubmissionResult = result.data;
      submissionError = result.error;
    } else {
      const result = await supabase.rpc("submit_invitation_rsvp", {
        p_event_id: access.event.eventId,
        p_invitation_id: invitationId,
        p_matched_full_name: matchedFullName,
        p_email: email,
        p_phone: phone,
        p_message: message,
        p_guest_responses: databaseGuestResponses,
      });

      rawSubmissionResult = result.data;
      submissionError = result.error;
    }

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
        "You may only respond for your own invited name.",
        "Your RSVP has already been received.",
      ];

      const isSafeMessage =
        safeExactMessages.includes(submissionError.message) ||
        submissionError.message.startsWith(
          "Your RSVP has already been received.",
        ) ||
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
