import "server-only";

import {
  ClientProvisioningError,
  type ClientEventOption,
} from "@/features/clients/domain/client";
import type { ClientProvisioningRepository } from "@/features/clients/domain/client-provisioning-repository";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export function createSupabaseClientProvisioningRepository(): ClientProvisioningRepository {
  const supabase = createSupabaseAdminClient();

  return {
    async listActiveEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, slug")
        .eq("is_active", true)
        .order("name");

      if (error) {
        console.error("Active event lookup failed:", {
          code: error.code,
          message: error.message,
        });

        throw new ClientProvisioningError(
          "unexpected",
          "Unable to load active events.",
        );
      }

      return (data ?? []) as ClientEventOption[];
    },

    async createClientIdentity(input) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: input.email,
        password: input.accessCode,
        email_confirm: true,
        app_metadata: {
          account_type: "client",
        },
        user_metadata: {
          display_name: input.displayName,
        },
      });

      if (error || !data.user) {
        console.error("Client identity creation failed:", {
          code: error?.code,
          status: error?.status,
          message: error?.message,
        });

        if (error?.code === "email_exists") {
          throw new ClientProvisioningError(
            "email_already_registered",
            "A user with this email address already exists.",
          );
        }

        throw new ClientProvisioningError(
          "unexpected",
          "Unable to create the client identity.",
        );
      }

      return data.user.id;
    },

    async createClientProfile(input) {
      const { error } = await supabase.from("client_profiles").insert({
        user_id: input.userId,
        display_name: input.displayName,
        status: "active",
        access_code_last_four: input.accessCodeLastFour,
      });

      if (error) {
        console.error("Client profile creation failed:", {
          code: error.code,
          message: error.message,
        });

        throw new ClientProvisioningError(
          "unexpected",
          "Unable to create the client profile.",
        );
      }
    },

    async assignClientToEvent(input) {
      const { error } = await supabase.from("event_members").insert({
        user_id: input.userId,
        event_id: input.eventId,
        role: input.role,
      });

      if (error) {
        console.error("Client event assignment failed:", {
          code: error.code,
          message: error.message,
        });

        const code =
          error.code === "23503" ? "event_not_found" : "unexpected";

        throw new ClientProvisioningError(
          code,
          code === "event_not_found"
            ? "The selected event no longer exists."
            : "Unable to assign the client to the event.",
        );
      }
    },

    async deleteClientIdentity(userId) {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        console.error("Incomplete client cleanup failed:", {
          code: error.code,
          status: error.status,
          message: error.message,
        });

        throw new ClientProvisioningError(
          "unexpected",
          "Unable to clean up the incomplete client identity.",
        );
      }
    },
  };
}
