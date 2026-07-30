import type {
  AdminAuthRepository,
  AdminCredentials,
} from "../domain/admin-auth-repository";
import type { AdminPrincipal } from "../domain/auth-principal";

export type AdminSignInResult =
  | {
      status: "authorized";
      principal: AdminPrincipal;
    }
  | {
      status: "invalid_credentials";
    }
  | {
      status: "forbidden";
    };

export async function signInAdmin(
  repository: AdminAuthRepository,
  credentials: AdminCredentials,
): Promise<AdminSignInResult> {
  const identity = await repository.signIn(credentials);

  if (!identity) {
    return { status: "invalid_credentials" };
  }

  const isAdministrator = await repository.hasPlatformAdminAccess(
    identity.userId,
  );

  if (!isAdministrator) {
    await repository.signOut();
    return { status: "forbidden" };
  }

  return {
    status: "authorized",
    principal: {
      ...identity,
      kind: "administrator",
    },
  };
}
