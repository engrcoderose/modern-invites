import type {
  ClientAuthRepository,
  ClientCredentials,
} from "../domain/client-auth-repository";
import type { ClientPrincipal } from "../domain/auth-principal";

export type ClientSignInResult =
  | {
      status: "authorized";
      principal: ClientPrincipal;
    }
  | {
      status: "invalid_credentials";
    }
  | {
      status: "forbidden";
    };

export async function signInClient(
  repository: ClientAuthRepository,
  credentials: ClientCredentials,
): Promise<ClientSignInResult> {
  const identity = await repository.signIn(credentials);

  if (!identity) {
    return { status: "invalid_credentials" };
  }

  const profile = await repository.getActiveClientProfile(identity.userId);

  if (!profile) {
    await repository.signOut();
    return { status: "forbidden" };
  }

  return {
    status: "authorized",
    principal: {
      ...identity,
      kind: "client",
      displayName: profile.displayName,
    },
  };
}
