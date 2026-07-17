import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase";

interface PartyRequestBody {
  slug?: unknown;
  code?: unknown;
  invitationId?: unknown;
  matchedFullName?: unknown;
}

interface VerifiedEventRow {
  event_id: number;
  event_name: string;
  rsvp_deadline: string | null;
  is_open: boolean;
}

interface PartyRow {
  household_name: string;
  max_attendees: number;
  guest_id: number;
  guest_full_name: string;
  guest_type: "adult" | "child";
  attendance_status: "pending" | "attending" | "declined";
  dietary_restrictions: string | null;
}

export async function POST(request: NextRequest) {
  let body: PartyRequestBody;

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

  // Check that the required values have the correct types.
  if (
    typeof body.slug !== "string" ||
    typeof body.code !== "string" ||
    typeof body.invitationId !== "number" ||
    typeof body.matchedFullName !== "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "The party request is incomplete.",
      },
      { status: 400 },
    );
  }

  // Normalize the submitted values.
  const slug = body.slug.trim().toLowerCase();
  const code = body.code.trim();
  const invitationId = body.invitationId;
  const matchedFullName = body.matchedFullName.trim().replace(/\s+/g, " ");

  // Validate the event slug and RSVP code.
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

  // Validate the invitation ID.
  if (!Number.isSafeInteger(invitationId) || invitationId < 1) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid invitation selection.",
      },
      { status: 400 },
    );
  }

  // Validate the searched guest name.
  if (matchedFullName.length < 3 || matchedFullName.length > 150) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid guest name.",
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
      console.error("Party access verification failed:", {
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

    // No event means the code or slug did not match.
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "The RSVP code is incorrect.",
        },
        { status: 401 },
      );
    }

    // The event exists, but its RSVP is closed.
    if (!event.is_open) {
      return NextResponse.json(
        {
          success: false,
          message: "RSVPs for this event are currently closed.",
        },
        { status: 403 },
      );
    }

    // Load the selected invitation's party.
    const { data: rawPartyRows, error: partyError } = await supabase.rpc(
      "get_invitation_party",
      {
        p_event_id: event.event_id,
        p_invitation_id: invitationId,
        p_matched_full_name: matchedFullName,
      },
    );

    if (partyError) {
      console.error("Party loading failed:", {
        code: partyError.code,
        message: partyError.message,
        details: partyError.details,
        hint: partyError.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Unable to load the selected party.",
        },
        { status: 500 },
      );
    }

    // Give the raw Supabase result its TypeScript type.
    const partyRows = (rawPartyRows ?? []) as PartyRow[];

    // No rows means the invitation ID, event, and name
    // did not match each other.
    if (partyRows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected invitation could not be verified.",
        },
        { status: 404 },
      );
    }

    // Household information is repeated on each row.
    const firstRow = partyRows[0];

    // Convert database snake_case names to frontend camelCase.
    const guests = partyRows.map((row) => ({
      id: row.guest_id,
      fullName: row.guest_full_name,
      guestType: row.guest_type,
      attendanceStatus: row.attendance_status,
      dietaryRestrictions: row.dietary_restrictions,
    }));

    return NextResponse.json(
      {
        success: true,
        party: {
          householdName: firstRow.household_name,
          maxAttendees: firstRow.max_attendees,
          guests,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected party-loading error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred.",
      },
      { status: 500 },
    );
  }
}
