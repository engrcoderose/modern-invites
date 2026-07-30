import "server-only";

import type {
  RsvpAccessMode,
  RsvpEventAccessConfiguration,
} from "@/features/rsvp/domain/rsvp-event-access";
import type { RsvpEventAccessRepository } from "@/features/rsvp/domain/rsvp-event-access-repository";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface EventConfigurationRow {
  id: number;
  name: string;
  slug: string;
  rsvp_deadline: string | null;
  is_active: boolean;
  rsvp_access_mode: RsvpAccessMode;
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
    isActive: row.is_active,
    accessMode: row.rsvp_access_mode,
  };
}

export function createSupabaseRsvpEventAccessRepository(): RsvpEventAccessRepository {
  const supabase = createSupabaseAdminClient();

  return {
    async findBySlug(slug) {
      const { data, error } = await supabase
        .from("events")
        .select(
          "id, name, slug, rsvp_deadline, is_active, rsvp_access_mode",
        )
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        throw new Error("Unable to load the RSVP event.");
      }

      return data
        ? toConfiguration(data as EventConfigurationRow)
        : null;
    },

    async verifySharedCode(slug, code) {
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
      };
    },
  };
}
