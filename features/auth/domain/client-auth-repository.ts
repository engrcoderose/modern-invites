import type { AuthenticatedIdentity } from "./auth-principal";

export interface ClientCredentials {
  email: string;
  accessCode: string;
}

export interface ActiveClientProfile {
  userId: string;
  displayName: string;
}

/**
 * Authentication boundary for the client portal.
 *
 * Application use cases depend on this contract instead of Supabase directly,
 * which keeps the client access rules portable and straightforward to test.
 */
export interface ClientAuthRepository {
  getAuthenticatedIdentity(): Promise<AuthenticatedIdentity | null>;
  getActiveClientProfile(
    userId: string,
  ): Promise<ActiveClientProfile | null>;
  signIn(
    credentials: ClientCredentials,
  ): Promise<AuthenticatedIdentity | null>;
  signOut(): Promise<void>;
}
