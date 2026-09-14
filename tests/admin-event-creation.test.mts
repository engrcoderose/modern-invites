import assert from "node:assert/strict";
import test from "node:test";
import { createAdminEvent } from "../features/clients/application/create-admin-event.ts";
import type { CreateEventInput } from "../features/clients/domain/event-creation.ts";

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: " Anjo & Jasmin ", slug: " Anjo-and-Jasmin ", rsvpDeadline: "2026-11-01", responseMode: "household", ...overrides })) data.set(key, value);
  return data;
}

function dependencies(authorized = true) {
  const calls: CreateEventInput[] = [];
  return {
    calls,
    isAdministrator: async () => authorized,
    async createEvent(input: CreateEventInput) {
      calls.push(input);
      return { status: "created" as const, event: { id: 42, name: input.name, slug: input.slug } };
    },
  };
}

test("only an administrator can create events, regardless of submitted fields", async () => {
  const deps = dependencies(false);
  const data = form();
  data.set("isAdmin", "true");
  const result = await createAdminEvent(deps, data);
  assert.equal(result.status, "error");
  assert.match(result.message!, /administrator session/);
  assert.equal(deps.calls.length, 0);
});

test("creates normalized event settings and returns the event for client assignment", async () => {
  const deps = dependencies();
  const data = form();
  data.set("rsvp_code_hash", "client-supplied-value");
  data.set("is_active", "false");
  const result = await createAdminEvent(deps, data);
  assert.deepEqual(deps.calls, [{ name: "Anjo & Jasmin", slug: "anjo-and-jasmin", rsvpDeadline: "2026-11-01", responseMode: "household" }]);
  assert.equal(result.status, "success");
  assert.deepEqual(result.createdEvent, { id: 42, name: "Anjo & Jasmin", slug: "anjo-and-jasmin" });
});

test("allows individual replies and an unset deadline", async () => {
  const deps = dependencies();
  await createAdminEvent(deps, form({ rsvpDeadline: "", responseMode: "individual" }));
  assert.equal(deps.calls[0].rsvpDeadline, null);
  assert.equal(deps.calls[0].responseMode, "individual");
});

test("rejects invalid slugs, impossible dates, missing names, and unsupported reply modes", async () => {
  for (const overrides of [
    { slug: "../admin" }, { slug: "bad--slug" }, { slug: "https://example.com" },
    { rsvpDeadline: "2026-02-30" }, { rsvpDeadline: "not-a-date" },
    { name: " " }, { responseMode: "everyone" },
  ]) {
    const deps = dependencies();
    const result = await createAdminEvent(deps, form(overrides));
    assert.equal(result.status, "error", JSON.stringify(overrides));
    assert.ok(result.fieldErrors);
    assert.equal(deps.calls.length, 0);
  }
});

test("reports duplicate identifiers without overwriting the existing event", async () => {
  const result = await createAdminEvent({ isAdministrator: async () => true, createEvent: async () => ({ status: "duplicate_slug" }) }, form());
  assert.equal(result.status, "error");
  assert.ok(result.fieldErrors?.slug);
  assert.equal(result.createdEvent, undefined);
});

test("database and authorization failures do not expose internal errors", async () => {
  for (const failAuth of [false, true]) {
    let writes = 0;
    const result = await createAdminEvent({
      isAdministrator: async () => { if (failAuth) throw new Error("private auth error"); return true; },
      createEvent: async () => { writes++; throw new Error("private database details"); },
    }, form());
    assert.equal(result.status, "error");
    assert.equal(result.message, "The event could not be created. Please try again.");
    assert.equal(writes, failAuth ? 0 : 1);
  }
});
