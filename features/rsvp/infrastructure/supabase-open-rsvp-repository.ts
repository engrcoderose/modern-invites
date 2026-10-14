import "server-only";
import { OpenRsvpNameExistsError } from "../domain/open-rsvp-error";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { OpenRsvpRepository } from "../application/submit-open-rsvp";

export function createSupabaseOpenRsvpRepository(): OpenRsvpRepository {
  const db = createSupabaseAdminClient();
  return {
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
