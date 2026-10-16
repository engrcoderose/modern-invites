import "server-only";
import { OpenRsvpAlreadyRespondedError, OpenRsvpNameAmbiguousError, OpenRsvpNameExistsError } from "../domain/open-rsvp-error";
import type { OpenRsvpNameRepository } from "../application/check-open-rsvp-name";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { OpenRsvpRepository } from "../application/submit-open-rsvp";

export function createSupabaseOpenRsvpRepository(): OpenRsvpRepository & OpenRsvpNameRepository {
  const db = createSupabaseAdminClient();
  return {
    async checkName(eventId, fullName) {
      const { data, error } = await db.rpc("check_open_rsvp_name", { p_event_id: eventId, p_full_name: fullName });
      if (error || !data || !["available", "responded", "ambiguous"].includes(data.status) || typeof data.full_name !== "string") {
        throw new Error("Unable to check the RSVP name.");
      }
      return { status: data.status, fullName: data.full_name };
    },
    async submit(eventId, input) {
      const { data, error } = await db.rpc("submit_open_rsvp", {
        p_event_id: eventId,
        p_request_id: input.requestId,
        p_full_name: input.fullName,
        p_status: input.attendance,
        p_email: input.email,
        p_phone: input.phone,
        p_dietary_restrictions: input.attendance === "attending" ? input.dietaryRestrictions : "",
        p_message: input.message,
      });
      if (error?.message === "OPEN_RSVP_NAME_EXISTS") throw new OpenRsvpNameExistsError();
      if (error?.message === "OPEN_RSVP_ALREADY_RESPONDED") throw new OpenRsvpAlreadyRespondedError();
      if (error?.message === "OPEN_RSVP_NAME_AMBIGUOUS") throw new OpenRsvpNameAmbiguousError();
      if (error || !data?.success) throw new Error("Unable to save the open RSVP.");
      return {
        totalGuests: data.total_guests,
        attendingCount: data.attending_count,
        declinedCount: data.declined_count,
        maxAttendees: data.max_attendees,
      };
    },
  };
}
