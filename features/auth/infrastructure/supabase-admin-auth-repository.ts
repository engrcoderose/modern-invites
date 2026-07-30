import "server-only";

import type {
  AdminAuthRepository,
  AdminCredentials,
} from "@/features/auth/domain/admin-auth-repository";
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

export async function createSupabaseAdminAuthRepository(): Promise<AdminAuthRepository> {
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

    async hasPlatformAdminAccess(userId: string) {
      const { data, error } = await supabase
        .from("platform_admins")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        throw new Error("Unable to verify administrator access.");
      }

      return Boolean(data);
    },

    async signIn(credentials: AdminCredentials) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
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
