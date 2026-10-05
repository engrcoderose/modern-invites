import "server-only";
import { readWithServiceCompatibility } from "@/features/services/infrastructure/service-schema-compatibility";
import { includesRsvp, type ClientServices } from "@/features/services/domain/client-services";

import type {
  RsvpAccessMode,
  RsvpEventAccessConfiguration,
  RsvpResponseMode,
} from "@/features/rsvp/domain/rsvp-event-access";
import type { RsvpEventAccessRepository } from "@/features/rsvp/domain/rsvp-event-access-repository";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface EventConfigurationRow {
  client_services?: ClientServices;
  id: number;
  name: string;
  slug: string;
  rsvp_deadline: string | null;
  is_active: boolean;
  rsvp_access_mode: RsvpAccessMode;
  rsvp_response_mode: RsvpResponseMode;
}

interface VerifiedEventRow {
  event_id: number;
  event_name: string;
  rsvp_deadline: string | null;
  is_open: boolean;
}

function toConfiguration(
  row: EventConfigurationRow,
): RsvpEventAccessConfiguration {
  return {
    eventId: row.id,
    eventName: row.name,
    slug: row.slug,
    rsvpDeadline: row.rsvp_deadline,
    isActive: row.is_active && includesRsvp(row.client_services),
    accessMode: row.rsvp_access_mode,
    responseMode: row.rsvp_response_mode,
  };
}

export function createSupabaseRsvpEventAccessRepository(): RsvpEventAccessRepository {
  const supabase = createSupabaseAdminClient();

  return {
    async findBySlug(slug) {
      const { data, error } = await readWithServiceCompatibility(includeServices => supabase
        .from("events")
        .select(
          `id, name, slug, rsvp_deadline, is_active, rsvp_access_mode, rsvp_response_mode${includeServices ? ", client_services" : ""}`,
        )
        .eq("slug", slug)
        .maybeSingle().returns<EventConfigurationRow | null>());

      if (error) {
        throw new Error("Unable to load the RSVP event.");
      }

      return data
        ? toConfiguration(data as EventConfigurationRow)
        : null;
    },

    async verifySharedCode(slug, code) {
      const { data: event, error: eventError } = await readWithServiceCompatibility(includeServices => supabase.from("events").select(includeServices ? "id, client_services" : "id").eq("slug", slug).maybeSingle().returns<{ id: number; client_services?: ClientServices } | null>());
      if (eventError) throw new Error("Unable to verify RSVP services.");
      if (!event || !includesRsvp(event.client_services as ClientServices)) return null;
      const { data, error } = await supabase.rpc(
        "verify_event_rsvp_code",
        {
          p_slug: slug,
          p_code: code,
        },
      );

      if (error) {
        throw new Error("Unable to verify the RSVP code.");
      }

      const verified = ((data ?? []) as VerifiedEventRow[])[0];

      if (!verified) {
        return null;
      }

      return {
        eventId: verified.event_id,
        eventName: verified.event_name,
        slug,
        rsvpDeadline: verified.rsvp_deadline,
        isActive: verified.is_open,
        accessMode: "shared_code",
        responseMode: "household",
      };
    },
  };
}
