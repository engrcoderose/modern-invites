import type { ClientAuthRepository } from "../domain/client-auth-repository";
import type { ClientAccessResult } from "../domain/auth-principal";

export async function getClientAccess(
  repository: ClientAuthRepository,
): Promise<ClientAccessResult> {
  const identity = await repository.getAuthenticatedIdentity();

  if (!identity) {
    return { status: "unauthenticated" };
  }

  const profile = await repository.getActiveClientProfile(identity.userId);

  if (!profile) {
    return {
      status: "forbidden",
      identity,
    };
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
