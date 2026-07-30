import "server-only";

import type {
  ClientAuthRepository,
  ClientCredentials,
} from "@/features/auth/domain/client-auth-repository";
import type { AuthenticatedIdentity } from "@/features/auth/domain/auth-principal";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function toIdentity(
  userId: string,
  email: unknown,
): AuthenticatedIdentity {
  return {
    userId,
    email: typeof email === "string" ? email : null,
  };
}

export async function createSupabaseClientAuthRepository(): Promise<ClientAuthRepository> {
  const supabase = await createSupabaseServerClient();

  return {
    async getAuthenticatedIdentity() {
      const { data, error } = await supabase.auth.getClaims();
      const claims = data?.claims;
      const userId = claims?.sub;

      if (error || typeof userId !== "string") {
        return null;
      }

      return toIdentity(userId, claims?.email);
    },

    async getActiveClientProfile(userId: string) {
      const { data, error } = await supabase
        .from("client_profiles")
        .select("user_id, display_name")
        .eq("user_id", userId)
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        throw new Error("Unable to verify client access.");
      }

      if (!data) {
        return null;
      }

      return {
        userId: data.user_id as string,
        displayName: data.display_name as string,
      };
    },

    async signIn(credentials: ClientCredentials) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.accessCode,
      });

      if (error || !data.user) {
        return null;
      }

      return toIdentity(data.user.id, data.user.email);
    },

    async signOut() {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) {
        throw new Error("Unable to sign out.");
      }
    },
  };
}
