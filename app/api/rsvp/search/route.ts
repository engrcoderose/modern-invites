import { NextRequest, NextResponse } from "next/server";

import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import { isRsvpDeadlinePassed } from "@/lib/rsvp/security";
import { createSupabaseServerClient } from "@/lib/supabase";

interface SearchRequestBody {
  slug?: unknown;
  code?: unknown;
  fullName?: unknown;
}

interface VerifiedEventRow {
  event_id: number;
  event_name: string;
  rsvp_deadline: string | null;
  is_open: boolean;
}

interface SearchInvitationRow {
  invitation_id: number;
  household_name: string;
  matched_guest_name: string;
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, {
    scope: "rsvp-search",
    rateLimit: { limit: 30, windowMs: 5 * 60 * 1000 },
  });

  if (policyError) {
    return policyError;
  }

  let body: SearchRequestBody;

  // Read the request body.
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

  // Validate the required input types.
  if (
    typeof body.slug !== "string" ||
    typeof body.code !== "string" ||
    typeof body.fullName !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Event, RSVP code, and full name are required.",
      },
      { status: 400 },
    );
  }

  // Normalize the submitted values.
  const slug = body.slug.trim().toLowerCase();
  const code = body.code.trim();

  const fullName = body.fullName.trim().replace(/\s+/g, " ");

  // Validate the slug and code lengths.
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

  // Require a reasonable complete name.
  if (fullName.length < 3 || fullName.length > 150) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter your complete invited name.",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();

    // Verify the shared RSVP code.
    const { data: rawVerifiedEvents, error: verificationError } =
      await supabase.rpc("verify_event_rsvp_code", {
        p_slug: slug,
        p_code: code,
      });

    if (verificationError) {
      console.error("RSVP search verification failed:", {
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

    // A matching event can still be closed.
    if (!event.is_open || isRsvpDeadlinePassed(event.rsvp_deadline)) {
      return NextResponse.json(
        {
          success: false,
          message: "RSVPs for this event are currently closed.",
        },
        { status: 403 },
      );
    }

    // Search for the exact guest name within the
    // verified event.
    const { data: rawMatchingInvitations, error: searchError } =
      await supabase.rpc("search_guest_invitation", {
        p_event_id: event.event_id,
        p_full_name: fullName,
      });

    if (searchError) {
      console.error("Guest-name search failed:", {
        code: searchError.code,
        message: searchError.message,
        details: searchError.details,
        hint: searchError.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Unable to search the guest list.",
        },
        { status: 500 },
      );
    }

    const matchingInvitations = (rawMatchingInvitations ??
      []) as SearchInvitationRow[];

    const matches = matchingInvitations.map((invitation) => ({
      invitationId: invitation.invitation_id,
      householdName: invitation.household_name,
      matchedGuestName: invitation.matched_guest_name,
    }));

    return NextResponse.json(
      {
        success: true,
        matches,
        message:
          matches.length === 0
            ? "We could not find that exact name on the guest list."
            : undefined,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected RSVP search error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred.",
      },
      { status: 500 },
    );
  }
}
