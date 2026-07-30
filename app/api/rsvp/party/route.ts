import { NextRequest, NextResponse } from "next/server";

import { resolveRsvpEventAccess } from "@/features/rsvp/application/resolve-rsvp-event-access";
import { createSupabaseRsvpEventAccessRepository } from "@/features/rsvp/infrastructure/supabase-rsvp-event-access-repository";
import { getGuestsAllowedForResponse } from "@/features/rsvp/domain/rsvp-response-scope";
import { isRsvpResponseLocked } from "@/features/rsvp/domain/rsvp-response-lock";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface PartyRequestBody {
  slug?: unknown;
  code?: unknown;
  invitationId?: unknown;
  matchedFullName?: unknown;
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

interface GuestResponseStateRow {
  id: number;
  responded_at: string | null;
}

interface HouseholdRsvpRow {
  submitted_at: string;
  updated_at: string;
}

export async function POST(request: NextRequest) {
  const policyError = enforceRsvpRequestPolicy(request, {
    scope: "rsvp-party",
    rateLimit: { limit: 30, windowMs: 5 * 60 * 1000 },
  });

  if (policyError) {
    return policyError;
  }

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
    (body.code !== undefined &&
      body.code !== null &&
      typeof body.code !== "string") ||
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
  const code = typeof body.code === "string" ? body.code.trim() : "";
  const invitationId = body.invitationId;
  const matchedFullName = body.matchedFullName.trim().replace(/\s+/g, " ");

  // Validate the event slug and RSVP code.
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

    // Load the selected invitation's party.
    const { data: rawPartyRows, error: partyError } = await supabase.rpc(
      "get_invitation_party",
      {
        p_event_id: access.event.eventId,
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
    const partyGuests = partyRows.map((row) => ({
      id: row.guest_id,
      fullName: row.guest_full_name,
      guestType: row.guest_type,
      attendanceStatus: row.attendance_status,
      dietaryRestrictions: row.dietary_restrictions,
    }));

    const allowedGuests = getGuestsAllowedForResponse(
      access.event.responseMode,
      matchedFullName,
      partyGuests,
    );

    // Individual responses require one uniquely matched guest.
    // Household responses retain every guest on the invitation.
    if (
      access.event.responseMode === "individual" &&
      allowedGuests.length !== 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This guest name could not be uniquely verified. Please contact the couple.",
        },
        { status: 409 },
      );
    }

    const { data: rawResponseStates, error: responseStateError } =
      await supabase
        .from("guests")
        .select("id, responded_at")
        .in(
          "id",
          allowedGuests.map((guest) => guest.id),
        );

    if (responseStateError) {
      console.error("Guest response-state loading failed:", {
        code: responseStateError.code,
        message: responseStateError.message,
        details: responseStateError.details,
        hint: responseStateError.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify the RSVP response status.",
        },
        { status: 500 },
      );
    }

    const responseStateByGuestId = new Map(
      ((rawResponseStates ?? []) as GuestResponseStateRow[]).map(
        (guest) => [guest.id, guest.responded_at],
      ),
    );

    const guests = allowedGuests.map((guest) => {
      const respondedAt =
        responseStateByGuestId.get(guest.id) ?? null;

      return {
        ...guest,
        hasResponded: isRsvpResponseLocked(respondedAt),
        respondedAt,
      };
    });

    let householdRespondedAt: string | null = null;

    // Nylgen and Kersee use name verification followed by one locked
    // household response. Shared-code events retain their existing
    // update behavior.
    if (
      access.event.accessMode === "name_search" &&
      access.event.responseMode === "household"
    ) {
      const { data: householdRsvp, error: householdRsvpError } =
        await supabase
          .from("rsvps")
          .select("submitted_at, updated_at")
          .eq("invitation_id", invitationId)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

      if (householdRsvpError) {
        return NextResponse.json(
          {
            success: false,
            message: "Unable to verify the household RSVP status.",
          },
          { status: 500 },
        );
      }

      const rsvp = householdRsvp as HouseholdRsvpRow | null;
      householdRespondedAt =
        rsvp?.updated_at ?? rsvp?.submitted_at ?? null;
    }

    const individualRespondedAt =
      guests.find((guest) => guest.respondedAt)?.respondedAt ?? null;
    const responseLocked =
      access.event.responseMode === "household"
        ? householdRespondedAt !== null
        : individualRespondedAt !== null;

    return NextResponse.json(
      {
        success: true,
        party: {
          householdName: firstRow.household_name,
          maxAttendees:
            access.event.responseMode === "individual"
              ? 1
              : firstRow.max_attendees,
          responseMode: access.event.responseMode,
          responseLocked,
          respondedAt:
            householdRespondedAt ?? individualRespondedAt,
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
