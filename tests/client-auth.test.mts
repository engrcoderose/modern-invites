import assert from "node:assert/strict";
import test from "node:test";

import { getClientAccess } from "../features/auth/application/get-client-access.ts";
import { signInClient } from "../features/auth/application/sign-in-client.ts";
import type {
  ActiveClientProfile,
  ClientAuthRepository,
  ClientCredentials,
} from "../features/auth/domain/client-auth-repository.ts";
import type { AuthenticatedIdentity } from "../features/auth/domain/auth-principal.ts";

class FakeClientAuthRepository implements ClientAuthRepository {
  signOutCount = 0;
  private currentIdentity: AuthenticatedIdentity | null;
  private activeProfile: ActiveClientProfile | null;

  constructor(
    currentIdentity: AuthenticatedIdentity | null,
    activeProfile: ActiveClientProfile | null,
  ) {
    this.currentIdentity = currentIdentity;
    this.activeProfile = activeProfile;
  }

  async getAuthenticatedIdentity() {
    return this.currentIdentity;
  }

  async getActiveClientProfile() {
    return this.activeProfile;
  }

  async signIn(_credentials: ClientCredentials) {
    return this.currentIdentity;
  }

  async signOut() {
    this.signOutCount += 1;
  }
}

const clientIdentity = {
  userId: "22222222-2222-2222-2222-222222222222",
  email: "couple@example.com",
};

const activeClientProfile = {
  userId: clientIdentity.userId,
  displayName: "Nylgen & Kersee",
};

test("getClientAccess distinguishes missing, forbidden, and active clients", async () => {
  const unauthenticated = await getClientAccess(
    new FakeClientAuthRepository(null, null),
  );
  assert.deepEqual(unauthenticated, { status: "unauthenticated" });

  const forbidden = await getClientAccess(
    new FakeClientAuthRepository(clientIdentity, null),
  );
  assert.equal(forbidden.status, "forbidden");

  const authorized = await getClientAccess(
    new FakeClientAuthRepository(clientIdentity, activeClientProfile),
  );
  assert.equal(authorized.status, "authorized");

  if (authorized.status === "authorized") {
    assert.equal(authorized.principal.kind, "client");
    assert.equal(
      authorized.principal.displayName,
      activeClientProfile.displayName,
    );
  }
});

test("signInClient signs an unapproved identity back out", async () => {
  const repository = new FakeClientAuthRepository(clientIdentity, null);

  const result = await signInClient(repository, {
    email: "couple@example.com",
    accessCode: "MI-TEST-TEST-TEST-TEST",
  });

  assert.deepEqual(result, { status: "forbidden" });
  assert.equal(repository.signOutCount, 1);
});

test("signInClient authorizes an identity with an active client profile", async () => {
  const result = await signInClient(
    new FakeClientAuthRepository(clientIdentity, activeClientProfile),
    {
      email: "couple@example.com",
      accessCode: "MI-TEST-TEST-TEST-TEST",
    },
  );

  assert.equal(result.status, "authorized");
});
