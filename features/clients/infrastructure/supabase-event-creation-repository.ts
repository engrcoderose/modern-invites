import "server-only";
import { serviceColumnsForWrite } from "@/features/services/infrastructure/service-schema-compatibility";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ClientEventOption } from "../domain/client";
import type { EventCreationRepository } from "../domain/event-creation";

export function createSupabaseEventCreationRepository(): EventCreationRepository {
  const supabase = createSupabaseAdminClient();
  return {
    async createEvent(input) {
      const serviceColumns = await serviceColumnsForWrite(input.clientServices, () => supabase.from("events").select("client_services").limit(0));
      const { data, error } = await supabase.from("events").insert({
        name: input.name,
        slug: input.slug,
        rsvp_deadline: input.rsvpDeadline,
        rsvp_access_mode: "name_search",
        rsvp_response_mode: input.responseMode,
        ...serviceColumns,
        rsvp_code_hash: null,
        is_active: true,
      }).select("id, name, slug").single();

      if (error || !data) {
        if (error?.code === "23505") return { status: "duplicate_slug" };
        console.error("Admin event creation failed:", { code: error?.code, message: error?.message });
        throw new Error("Unable to create event.");
      }
      return { status: "created", event: data as ClientEventOption };
    },
  };
}
