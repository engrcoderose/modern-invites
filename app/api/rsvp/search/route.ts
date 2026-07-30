import { NextRequest, NextResponse } from "next/server";

import { resolveRsvpEventAccess } from "@/features/rsvp/application/resolve-rsvp-event-access";
import {
  summarizeHouseholdAttendance,
  type HouseholdAttendanceStatus,
} from "@/features/rsvp/domain/household-attendance-summary";
import { createSupabaseRsvpEventAccessRepository } from "@/features/rsvp/infrastructure/supabase-rsvp-event-access-repository";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface SearchRequestBody {
  slug?: unknown;
  code?: unknown;
  fullName?: unknown;
}

interface SearchInvitationRow {
  invitation_id: number;
  household_name: string;
  matched_guest_name: string;
}

interface HouseholdSummaryRow {
  id: number;
  max_attendees: number;
  guests:
    | {
        attendance_status: HouseholdAttendanceStatus;
      }[]
    | null;
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
    (body.code !== undefined &&
      body.code !== null &&
      typeof body.code !== "string") ||
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
  const code = typeof body.code === "string" ? body.code.trim() : "";

  const fullName = body.fullName.trim().replace(/\s+/g, " ");

  // Validate the slug and code lengths.
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

    // Search for the exact guest name within the
    // verified event.
    const { data: rawMatchingInvitations, error: searchError } =
      await supabase.rpc("search_guest_invitation", {
        p_event_id: access.event.eventId,
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

    const invitationIds = [
      ...new Set(
        matchingInvitations.map(
          (invitation) => invitation.invitation_id,
        ),
      ),
    ];

    const summariesByInvitationId = new Map<
      number,
      ReturnType<typeof summarizeHouseholdAttendance>
    >();

    if (invitationIds.length > 0) {
      const { data: rawSummaryRows, error: summaryError } =
        await supabase
          .from("invitations")
          .select("id, max_attendees, guests(attendance_status)")
          .eq("event_id", access.event.eventId)
          .in("id", invitationIds);

      if (summaryError) {
        console.error("Household RSVP summary failed:", {
          code: summaryError.code,
          message: summaryError.message,
          details: summaryError.details,
          hint: summaryError.hint,
        });

        return NextResponse.json(
          {
            success: false,
            message: "Unable to load the household RSVP summary.",
          },
          { status: 500 },
        );
      }

      for (const row of (rawSummaryRows ?? []) as HouseholdSummaryRow[]) {
        summariesByInvitationId.set(
          row.id,
          summarizeHouseholdAttendance(
            row.max_attendees,
            (row.guests ?? []).map(
              (guest) => guest.attendance_status,
            ),
          ),
        );
      }
    }

    const matches = matchingInvitations.flatMap((invitation) => {
      const householdSummary = summariesByInvitationId.get(
        invitation.invitation_id,
      );

      if (!householdSummary) {
        return [];
      }

      return {
        invitationId: invitation.invitation_id,
        householdName: invitation.household_name,
        matchedGuestName: invitation.matched_guest_name,
        householdSummary,
      };
    });

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
