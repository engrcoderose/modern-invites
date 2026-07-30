import type { AdminAuthRepository } from "../domain/admin-auth-repository";
import type { AdminAccessResult } from "../domain/auth-principal";

export async function getAdminAccess(
  repository: AdminAuthRepository,
): Promise<AdminAccessResult> {
  const identity = await repository.getAuthenticatedIdentity();

  if (!identity) {
    return { status: "unauthenticated" };
  }

  const isAdministrator = await repository.hasPlatformAdminAccess(
    identity.userId,
  );

  if (!isAdministrator) {
    return {
      status: "forbidden",
      identity,
    };
  }

  return {
    status: "authorized",
    principal: {
      ...identity,
      kind: "administrator",
    },
  };
}
