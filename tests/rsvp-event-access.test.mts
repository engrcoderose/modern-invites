import assert from "node:assert/strict";
import test from "node:test";

import { resolveRsvpEventAccess } from "../features/rsvp/application/resolve-rsvp-event-access.ts";
import type { RsvpEventAccessConfiguration } from "../features/rsvp/domain/rsvp-event-access.ts";
import type { RsvpEventAccessRepository } from "../features/rsvp/domain/rsvp-event-access-repository.ts";

class FakeRsvpEventAccessRepository
  implements RsvpEventAccessRepository
{
  verifyCount = 0;
  configuredEvent: RsvpEventAccessConfiguration | null;
  verifiedEvent: RsvpEventAccessConfiguration | null;

  constructor(
    configuredEvent: RsvpEventAccessConfiguration | null,
    verifiedEvent: RsvpEventAccessConfiguration | null = null,
  ) {
    this.configuredEvent = configuredEvent;
    this.verifiedEvent = verifiedEvent;
  }

  async findBySlug() {
    return this.configuredEvent;
  }

  async verifySharedCode() {
    this.verifyCount += 1;
    return this.verifiedEvent;
  }
}

function createEvent(
  accessMode: "shared_code" | "name_search",
  overrides: Partial<RsvpEventAccessConfiguration> = {},
): RsvpEventAccessConfiguration {
  return {
    eventId: 3,
    eventName: "Nylgen & Kersee",
    slug: "nylgen-and-kersee",
    rsvpDeadline: "2099-01-27",
    isActive: true,
    accessMode,
    responseMode: "household",
    ...overrides,
  };
}

test("a database-configured name-search event does not require a code", async () => {
  const repository = new FakeRsvpEventAccessRepository(
    createEvent("name_search"),
  );

  const result = await resolveRsvpEventAccess(repository, {
    slug: "nylgen-and-kersee",
    code: "",
  });

  assert.equal(result.status, "authorized");
  assert.equal(repository.verifyCount, 0);
});

test("a shared-code event is denied when the code is omitted", async () => {
  const repository = new FakeRsvpEventAccessRepository(
    createEvent("shared_code"),
  );

  const result = await resolveRsvpEventAccess(repository, {
    slug: "nylgen-and-kersee",
    code: "",
  });

  assert.deepEqual(result, { status: "denied" });
  assert.equal(repository.verifyCount, 0);
});

test("a shared-code event uses database code verification", async () => {
  const event = createEvent("shared_code");
  const repository = new FakeRsvpEventAccessRepository(event, event);

  const result = await resolveRsvpEventAccess(repository, {
    slug: event.slug,
    code: "VALID-CODE",
  });

  assert.equal(result.status, "authorized");
  assert.equal(repository.verifyCount, 1);
});

test("access verification preserves the configured response mode", async () => {
  const configuredEvent = createEvent("shared_code", {
    responseMode: "individual",
  });
  const verifiedEvent = createEvent("shared_code", {
    responseMode: "household",
  });
  const repository = new FakeRsvpEventAccessRepository(
    configuredEvent,
    verifiedEvent,
  );

  const result = await resolveRsvpEventAccess(repository, {
    slug: configuredEvent.slug,
    code: "VALID-CODE",
  });

  assert.equal(result.status, "authorized");

  if (result.status === "authorized") {
    assert.equal(result.event.responseMode, "individual");
  }
});

test("an inactive name-search event remains closed", async () => {
  const repository = new FakeRsvpEventAccessRepository(
    createEvent("name_search", { isActive: false }),
  );

  const result = await resolveRsvpEventAccess(repository, {
    slug: "nylgen-and-kersee",
    code: "",
  });

  assert.deepEqual(result, { status: "closed" });
});
