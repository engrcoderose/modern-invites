import assert from "node:assert/strict";
import test from "node:test";
import { updateAdminEvent } from "../features/clients/application/update-admin-event.ts";
import type { EventSettingsInput, ManagedEvent } from "../features/clients/domain/event-management.ts";

const original: ManagedEvent = { id: 12, name: "Anjo & Jasmin", slug: "anjo-and-jasmin", rsvp_deadline: "2026-11-01", rsvp_response_mode: "household", rsvp_access_mode: "shared_code", is_active: true, updated_at: "2026-09-13T08:00:00.123456+00:00", clients: [] };
function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ id: "12", version: original.updated_at, name: " Updated event ", rsvpDeadline: "2026-11-05", responseMode: "individual", status: "active", ...overrides })) data.set(key, value);
  return data;
}
function dependencies(authorized = true) {
  const calls: EventSettingsInput[] = [];
  let stored = { ...original };
  return {
    calls,
    isAdministrator: async () => authorized,
    async updateEvent(input: EventSettingsInput) {
      calls.push(input);
      if (input.id !== stored.id || input.version !== stored.updated_at) return { status: "conflict" as const };
      stored = { ...stored, name: input.name, rsvp_deadline: input.rsvpDeadline, rsvp_response_mode: input.responseMode, is_active: input.isActive, updated_at: new Date(Date.parse(stored.updated_at) + 1000).toISOString() };
      return { status: "updated" as const, event: stored };
    },
  };
}

test("denies non-administrators before updating any event", async () => {
  const deps = dependencies(false);
  const result = await updateAdminEvent(deps, form({ isAdmin: "true" }));
  assert.equal(result.status, "error");
  assert.equal(deps.calls.length, 0);
});
test("updates only allowed settings, preserving identifier and RSVP access", async () => {
  const deps = dependencies();
  const result = await updateAdminEvent(deps, form({ slug: "replacement", rsvp_access_mode: "name_search", rsvp_code_hash: "replacement", user_id: "replacement" }));
  assert.equal(result.status, "success");
  assert.deepEqual(deps.calls[0], { id: 12, version: original.updated_at, name: "Updated event", rsvpDeadline: "2026-11-05", responseMode: "individual", isActive: true });
  assert.equal(result.updatedEvent?.slug, original.slug);
  assert.equal(result.updatedEvent?.rsvp_access_mode, "shared_code");
});
test("archives and reactivates the same event, and clears an optional deadline", async () => {
  const deps = dependencies();
  const archived = await updateAdminEvent(deps, form({ status: "archived", rsvpDeadline: "" }));
  assert.equal(archived.updatedEvent?.is_active, false);
  assert.equal(archived.updatedEvent?.rsvp_deadline, null);
  const active = await updateAdminEvent(deps, form({ version: archived.updatedEvent!.updated_at, status: "active" }));
  assert.equal(active.updatedEvent?.is_active, true);
  assert.equal(active.updatedEvent?.id, original.id);
});
test("rejects invalid IDs, dates, statuses, versions, and reply modes before writes", async () => {
  for (const overrides of [{ id: "0" }, { id: "1.5" }, { id: "9007199254740992" }, { name: " " }, { rsvpDeadline: "2026-02-30" }, { status: "deleted" }, { version: "invalid" }, { responseMode: "everyone" }]) {
    const deps = dependencies();
    const result = await updateAdminEvent(deps, form(overrides));
    assert.equal(result.status, "error");
    assert.equal(deps.calls.length, 0);
  }
});
test("stale and missing events cannot overwrite a newer save", async () => {
  const deps = dependencies();
  await updateAdminEvent(deps, form());
  const result = await updateAdminEvent(deps, form({ name: "Stale edit" }));
  assert.equal(result.status, "error");
  assert.match(result.message!, /Reload/);
  assert.equal((await updateAdminEvent(deps, form({ id: "99" }))).status, "error");
});
test("database and authentication failures do not disclose internal errors", async () => {
  const failing = async () => { throw new Error("secret internal details"); };
  for (const deps of [{ ...dependencies(), updateEvent: failing }, { ...dependencies(), isAdministrator: failing }]) {
    const result = await updateAdminEvent(deps, form());
    assert.equal(result.status, "error");
    assert.doesNotMatch(result.message!, /secret/);
  }
});
