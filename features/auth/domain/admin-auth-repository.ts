import type { AuthenticatedIdentity } from "./auth-principal";

export interface AdminCredentials {
  email: string;
  password: string;
}

/**
 * Boundary used by the authentication application layer.
 *
 * Implementations may use Supabase or another identity provider, while the
 * application use cases remain independent of that infrastructure choice.
 */
export interface AdminAuthRepository {
  getAuthenticatedIdentity(): Promise<AuthenticatedIdentity | null>;
  hasPlatformAdminAccess(userId: string): Promise<boolean>;
  signIn(
    credentials: AdminCredentials,
  ): Promise<AuthenticatedIdentity | null>;
  signOut(): Promise<void>;
}
