import assert from "node:assert/strict";
import test from "node:test";

import { exportEventRsvpWorkbook } from "../features/dashboard/application/export-event-rsvp-workbook.ts";
import {
  createDashboardGuest,
  GuestManagementError,
  updateDashboardGuest,
} from "../features/dashboard/application/manage-dashboard-guests.ts";
import type {
  AssignedDashboardEvent,
  ClientEventWorkspace,
  CreateDashboardGuestCommand,
  DashboardEventRole,
  DashboardGuest,
  DashboardGuestQuery,
  UpdateDashboardGuestCommand,
} from "../features/dashboard/domain/client-dashboard.ts";
import type { ClientDashboardRepository } from "../features/dashboard/domain/client-dashboard-repository.ts";
import type {
  RsvpWorkbook,
  RsvpWorkbookExporter,
} from "../features/dashboard/domain/rsvp-workbook-exporter.ts";

const assignedEvent: AssignedDashboardEvent = {
  id: 42,
  name: "Nylgen & Kersee",
  slug: "nylgen-and-kersee",
  rsvpDeadline: "2026-12-01",
  role: "owner",
};

class FakeDashboardRepository implements ClientDashboardRepository {
  role: DashboardEventRole | null = "owner";
  events: AssignedDashboardEvent[] = [assignedEvent];
  createdGuests: CreateDashboardGuestCommand[] = [];
  updatedGuests: UpdateDashboardGuestCommand[] = [];

  async listAssignedEvents() {
    return this.events;
  }

  async getEventRole() {
    return this.role;
  }

  async getEventWorkspace(
    _userId: string,
    _eventId: number,
    _query: DashboardGuestQuery,
  ): Promise<ClientEventWorkspace | null> {
    return null;
  }

  async listAllEventGuests(): Promise<DashboardGuest[]> {
    return [];
  }

  async createGuest(
    _userId: string,
    command: CreateDashboardGuestCommand,
  ) {
    this.createdGuests.push(command);
  }

  async updateGuest(
    _userId: string,
    command: UpdateDashboardGuestCommand,
  ) {
    this.updatedGuests.push(command);
  }

  async deleteGuest() {}
}

class FakeWorkbookExporter implements RsvpWorkbookExporter {
  createCount = 0;

  async create(): Promise<RsvpWorkbook> {
    this.createCount += 1;
    return {
      data: new Uint8Array([80, 75]),
      filename: "rsvp.xlsx",
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  }
}

const createCommand: CreateDashboardGuestCommand = {
  eventId: assignedEvent.id,
  invitationId: null,
  householdName: "Santos Family",
  fullName: "Ana Santos",
  guestType: "adult",
  dietaryRestrictions: null,
};

test("viewer access cannot create dashboard guests", async () => {
  const repository = new FakeDashboardRepository();
  repository.role = "viewer";

  await assert.rejects(
    () =>
      createDashboardGuest(repository, "client-user-id", createCommand),
    (error: unknown) =>
      error instanceof GuestManagementError &&
      error.code === "forbidden",
  );
  assert.equal(repository.createdGuests.length, 0);
});

test("owner access can add a guest to an existing household", async () => {
  const repository = new FakeDashboardRepository();
  const command: CreateDashboardGuestCommand = {
    ...createCommand,
    invitationId: 9,
    householdName: null,
    fullName: "Ruby Grace Liwanag",
  };

  await createDashboardGuest(repository, "client-user-id", command);

  assert.deepEqual(repository.createdGuests, [command]);
});

test("editor access can update a dashboard guest", async () => {
  const repository = new FakeDashboardRepository();
  repository.role = "editor";
  const command: UpdateDashboardGuestCommand = {
    eventId: assignedEvent.id,
    guestId: 8,
    fullName: "Ana Santos",
    guestType: "adult",
    attendanceStatus: "attending",
    dietaryRestrictions: "Vegetarian",
  };

  await updateDashboardGuest(repository, "client-user-id", command);

  assert.deepEqual(repository.updatedGuests, [command]);
});

test("an unassigned event cannot be exported", async () => {
  const repository = new FakeDashboardRepository();
  repository.events = [];
  const exporter = new FakeWorkbookExporter();

  const workbook = await exportEventRsvpWorkbook(
    repository,
    exporter,
    "client-user-id",
    assignedEvent.id,
  );

  assert.equal(workbook, null);
  assert.equal(exporter.createCount, 0);
});

test("an assigned event can be exported", async () => {
  const repository = new FakeDashboardRepository();
  const exporter = new FakeWorkbookExporter();

  const workbook = await exportEventRsvpWorkbook(
    repository,
    exporter,
    "client-user-id",
    assignedEvent.id,
  );

  assert.equal(workbook?.filename, "rsvp.xlsx");
  assert.equal(exporter.createCount, 1);
});
