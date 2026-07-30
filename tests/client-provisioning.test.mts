import assert from "node:assert/strict";
import test from "node:test";

import { createClientAccess } from "../features/clients/application/create-client-access.ts";
import type {
  AssignClientEventInput,
  ClientProvisioningRepository,
  CreateClientIdentityInput,
  CreateClientProfileInput,
} from "../features/clients/domain/client-provisioning-repository.ts";

class FakeClientProvisioningRepository
  implements ClientProvisioningRepository
{
  createdIdentity: CreateClientIdentityInput | null = null;
  createdProfile: CreateClientProfileInput | null = null;
  assignedEvent: AssignClientEventInput | null = null;
  deletedUserIds: string[] = [];
  private failAssignment: boolean;

  constructor(failAssignment = false) {
    this.failAssignment = failAssignment;
  }

  async listActiveEvents() {
    return [];
  }

  async createClientIdentity(input: CreateClientIdentityInput) {
    this.createdIdentity = input;
    return "22222222-2222-2222-2222-222222222222";
  }

  async createClientProfile(input: CreateClientProfileInput) {
    this.createdProfile = input;
  }

  async assignClientToEvent(input: AssignClientEventInput) {
    if (this.failAssignment) {
      throw new Error("Assignment failed");
    }

    this.assignedEvent = input;
  }

  async deleteClientIdentity(userId: string) {
    this.deletedUserIds.push(userId);
  }
}

const command = {
  displayName: "Nylgen and Kersee",
  email: "client@example.com",
  eventId: 1,
  role: "owner" as const,
};

test("createClientAccess provisions identity, profile, and membership", async () => {
  const repository = new FakeClientProvisioningRepository();
  const result = await createClientAccess(
    repository,
    () => "MI-7K4P-D9XR-M2QF-W8NC",
    command,
  );

  assert.equal(result.accessCode, "MI-7K4P-D9XR-M2QF-W8NC");
  assert.equal(repository.createdIdentity?.email, command.email);
  assert.equal(
    repository.createdProfile?.accessCodeLastFour,
    "W8NC",
  );
  assert.equal(repository.assignedEvent?.eventId, command.eventId);
  assert.deepEqual(repository.deletedUserIds, []);
});

test("createClientAccess removes an incomplete identity when assignment fails", async () => {
  const repository = new FakeClientProvisioningRepository(true);

  await assert.rejects(
    createClientAccess(
      repository,
      () => "MI-7K4P-D9XR-M2QF-W8NC",
      command,
    ),
    /Assignment failed/,
  );

  assert.deepEqual(repository.deletedUserIds, [
    "22222222-2222-2222-2222-222222222222",
  ]);
});
