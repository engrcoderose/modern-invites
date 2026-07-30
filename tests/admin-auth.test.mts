import assert from "node:assert/strict";
import test from "node:test";

import { getAdminAccess } from "../features/auth/application/get-admin-access.ts";
import { signInAdmin } from "../features/auth/application/sign-in-admin.ts";
import type {
  AdminAuthRepository,
  AdminCredentials,
} from "../features/auth/domain/admin-auth-repository.ts";
import type { AuthenticatedIdentity } from "../features/auth/domain/auth-principal.ts";

class FakeAdminAuthRepository implements AdminAuthRepository {
  signOutCount = 0;
  private currentIdentity: AuthenticatedIdentity | null;
  private isAdministrator: boolean;

  constructor(
    currentIdentity: AuthenticatedIdentity | null,
    isAdministrator: boolean,
  ) {
    this.currentIdentity = currentIdentity;
    this.isAdministrator = isAdministrator;
  }

  async getAuthenticatedIdentity() {
    return this.currentIdentity;
  }

  async hasPlatformAdminAccess() {
    return this.isAdministrator;
  }

  async signIn(_credentials: AdminCredentials) {
    return this.currentIdentity;
  }

  async signOut() {
    this.signOutCount += 1;
  }
}

const administratorIdentity = {
  userId: "11111111-1111-1111-1111-111111111111",
  email: "admin@example.com",
};

test("getAdminAccess distinguishes missing, forbidden, and authorized identities", async () => {
  const unauthenticated = await getAdminAccess(
    new FakeAdminAuthRepository(null, false),
  );
  assert.deepEqual(unauthenticated, { status: "unauthenticated" });

  const forbidden = await getAdminAccess(
    new FakeAdminAuthRepository(administratorIdentity, false),
  );
  assert.equal(forbidden.status, "forbidden");

  const authorized = await getAdminAccess(
    new FakeAdminAuthRepository(administratorIdentity, true),
  );
  assert.equal(authorized.status, "authorized");

  if (authorized.status === "authorized") {
    assert.equal(authorized.principal.kind, "administrator");
    assert.equal(
      authorized.principal.userId,
      administratorIdentity.userId,
    );
  }
});

test("signInAdmin signs a non-administrator back out", async () => {
  const repository = new FakeAdminAuthRepository(
    administratorIdentity,
    false,
  );

  const result = await signInAdmin(repository, {
    email: "admin@example.com",
    password: "not-used-by-the-fake",
  });

  assert.deepEqual(result, { status: "forbidden" });
  assert.equal(repository.signOutCount, 1);
});

test("signInAdmin returns authorized only for a platform administrator", async () => {
  const result = await signInAdmin(
    new FakeAdminAuthRepository(administratorIdentity, true),
    {
      email: "admin@example.com",
      password: "not-used-by-the-fake",
    },
  );

  assert.equal(result.status, "authorized");
});
