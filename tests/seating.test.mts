import assert from "node:assert/strict";
import test from "node:test";
import { saveSeatingPlan } from "../features/seating/application/save-seating-plan.ts";
import { emptySeatingPlan, planSchema, type SeatingPlan } from "../features/seating/domain/seating-plan.ts";
import { includesSeatFinder, includesRsvp, CLIENT_SERVICES } from "../features/services/domain/client-services.ts";
import { createAdminEvent } from "../features/clients/application/create-admin-event.ts";
import { updateAdminEvent } from "../features/clients/application/update-admin-event.ts";
import { JsonRequestError, readLimitedJson } from "../lib/http/read-limited-json.ts";
import { VENUE_KINDS, VENUE_OBJECTS } from "../features/seating/domain/venue-objects.ts";
import { availableSeatNumbers, seatAssignmentIssue } from "../features/seating/domain/seat-assignment.ts";

test("numbered seats are optional, bounded and unique within each table", () => {
  const document = plan();
  document.tables[0].capacity = 3;
  assert.equal(planSchema.safeParse(document).success, true);
  for (const seatNumber of [0, 4, 1.5, null, "1"]) {
    assert.equal(planSchema.safeParse({ ...document, assignments: [{ guestId: 1, tableId, seatNumber }] }).success, false);
  }
  document.assignments = [{ guestId: 1, tableId, seatNumber: 2 }, { guestId: 2, tableId, seatNumber: 2 }];
  assert.equal(planSchema.safeParse(document).success, false);
  const secondTableId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  document.tables.push({ ...document.tables[0], id: secondTableId });
  document.assignments[1].tableId = secondTableId;
  assert.equal(planSchema.safeParse(document).success, true);
  document.tables[0].capacity = 1;
  assert.equal(planSchema.safeParse(document).success, false);
});

test("seat availability handles editing, occupied seats, table-only guests and released seats", () => {
  const document = plan();
  document.tables[0].capacity = 2;
  document.assignments = [{ guestId: 1, tableId, seatNumber: 2 }];
  assert.deepEqual(availableSeatNumbers(document, tableId), [1]);
  assert.deepEqual(availableSeatNumbers(document, tableId, 1), [1, 2]);
  assert.match(seatAssignmentIssue(document, 2, tableId, 2)!, /already assigned/);
  assert.match(seatAssignmentIssue(document, 2, tableId, 3)!, /capacity/);
  assert.match(seatAssignmentIssue(document, 2, "missing", 1)!, /existing table/);
  document.assignments.push({ guestId: 2, tableId });
  assert.match(seatAssignmentIssue(document, 3, tableId, 1)!, /full/);
  assert.equal(seatAssignmentIssue(document, 1, tableId, 1), null);
  assert.equal(seatAssignmentIssue(document, 2, tableId, 1), null);
  document.assignments = document.assignments.filter(item => item.guestId !== 1);
  assert.deepEqual(availableSeatNumbers(document, tableId), [1, 2]);
  assert.equal(seatAssignmentIssue(document, 3, tableId, 2), null);
});

const tableId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
function plan(): SeatingPlan {
  return { ...emptySeatingPlan(), tables: [{ id: tableId, name: "Family", shape: "round", x: 30, y: 40, rotation: 0, color: "#88a999", capacity: 1 }], assignments: [{ guestId: 1, tableId }] };
}
function deps(services = "rsvp_and_seat_finder", role = "owner", eventId = 1) {
  let writes = 0;
  return {
    get writes() { return writes; },
    findEvent: async () => ({ id: eventId, name: "Synthetic wedding", slug: "synthetic", rsvpDeadline: null, role, clientServices: services }) as Awaited<ReturnType<Parameters<typeof saveSeatingPlan>[0]["findEvent"]>>,
    listGuests: async () => [{ id: 1, fullName: "Example Guest", householdName: "Family", attendanceStatus: "attending" as const }],
    repository: { load: async () => ({ plan: plan(), revision: 0, published: false }), save: async () => { writes++; return { plan: plan(), revision: 1, published: false }; } },
  };
}
test("RSVP and seating entitlements are independent, legacy events remain RSVP only", () => {
  assert.equal(includesRsvp(undefined), true); assert.equal(includesSeatFinder(undefined), false);
  assert.equal(includesRsvp("seat_finder"), false); assert.equal(includesSeatFinder("rsvp"), false);
  assert.equal(includesRsvp("rsvp_and_seat_finder"), true); assert.equal(includesSeatFinder("rsvp_and_seat_finder"), true);
});

test("venue objects accept every supported type and retain legacy object documents", () => {
  for (const kind of VENUE_KINDS) {
    const legacy = { id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", name: VENUE_OBJECTS[kind].name, kind, x: 50, y: 50 };
    assert.deepEqual(planSchema.parse({ ...plan(), landmarks: [legacy] }).landmarks[0], legacy);
    assert.equal(planSchema.safeParse({ ...plan(), landmarks: [{ ...legacy, width: VENUE_OBJECTS[kind].width, height: VENUE_OBJECTS[kind].height, rotation: 90 }] }).success, true);
    for (const fields of [{ width: 0 }, { width: 181 }, { height: 101 }, { height: null }, { rotation: 360 }, { rotation: NaN }, { kind: "unsupported" }, { hiddenPayload: true }]) {
      assert.equal(planSchema.safeParse({ ...plan(), landmarks: [{ ...legacy, ...fields }] }).success, false);
    }
  }
});
test("table dimensions are optional for legacy plans and reject invalid sizes", () => {
  const original = plan();
  assert.deepEqual(planSchema.parse(original), original);
  assert.equal(planSchema.safeParse({ ...original, tables: [{ ...original.tables[0], width: 180, height: 120 }] }).success, true);
  for (const fields of [{ width: 59 }, { width: 241 }, { height: 39 }, { height: 201 }, { width: null }, { height: "60" }, { width: Infinity }]) {
    assert.equal(planSchema.safeParse({ ...original, tables: [{ ...original.tables[0], ...fields }] }).success, false);
  }
});

test("all service packages survive authorized event creation and settings updates", async () => {
  for (const service of CLIENT_SERVICES) {
    const data = new FormData();
    for (const [key, value] of Object.entries({ name: "Example wedding", slug: "example-wedding", responseMode: "household", rsvpDeadline: "", clientServices: service })) data.set(key, value);
    const created = await createAdminEvent({ isAdministrator: async () => true, createEvent: async input => { assert.equal(input.clientServices, service); return { status: "created", event: { id: 1, name: input.name, slug: input.slug } }; } }, data);
    assert.equal(created.status, "success");
    data.set("id", "1"); data.set("version", "2026-10-05T00:00:00Z"); data.set("status", "active");
    await updateAdminEvent({ isAdministrator: async () => true, updateEvent: async input => { assert.equal(input.clientServices, service); return { status: "conflict" }; } }, data);
  }
});
test("disabled services, viewers, missing membership and other events cannot save", async () => {
  for (const dependencies of [deps("rsvp"), deps("seat_finder", "viewer"), deps("seat_finder", "owner", 2), { ...deps(), findEvent: async () => null }]) {
    await assert.rejects(saveSeatingPlan(dependencies, 1, { plan: plan(), revision: 0, publish: null }), /forbidden/);
    assert.equal(dependencies.writes, 0);
  }
});
test("owners and editors can save both seating packages without changing RSVP data", async () => {
  for (const service of ["seat_finder", "rsvp_and_seat_finder"]) for (const role of ["owner", "editor"]) {
    const dependencies = deps(service, role);
    await saveSeatingPlan(dependencies, 1, { plan: plan(), revision: 0, publish: true });
    assert.equal(dependencies.writes, 1);
  }
});
test("schema rejects duplicate seating, missing tables, capacity overflow and injected fields", () => {
  const original = plan();
  for (const invalid of [
    { ...original, assignments: [...original.assignments, ...original.assignments] },
    { ...original, tables: [] },
    { ...original, assignments: [...original.assignments, { guestId: 2, tableId }] },
    { ...original, tables: [{ ...original.tables[0], x: Infinity }] },
    { ...original, tables: [{ ...original.tables[0], shape: "triangle" }] },
    { ...original, role: "owner" },
  ]) assert.equal(planSchema.safeParse(invalid).success, false);
});
test("foreign, deleted and declined guests cannot be submitted", async () => {
  for (const listGuests of [async () => [], async () => [{ id: 1, fullName: "Example", householdName: "Family", attendanceStatus: "declined" as const }]]) {
    const dependencies = { ...deps(), listGuests };
    await assert.rejects(saveSeatingPlan(dependencies, 1, { plan: plan(), revision: 0, publish: true }), /invalid/);
    assert.equal(dependencies.writes, 0);
  }
});

test("authorized clients can unpublish when an assigned guest has since been deleted", async () => {
  const dependencies = { ...deps(), listGuests: async () => [] };
  await saveSeatingPlan(dependencies, 1, { plan: plan(), revision: 1, publish: false });
});

test("chunked JSON is bounded before buffering and oversized streams are cancelled", async () => {
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) { controller.enqueue(new Uint8Array(4)); controller.enqueue(new Uint8Array(10)); },
    cancel() { cancelled = true; },
  });
  await assert.rejects(readLimitedJson({ body: stream }, 8), error => error instanceof JsonRequestError && error.status === 413);
  assert.equal(cancelled, true);
  assert.deepEqual(await readLimitedJson(new Response('{"name":"Example Guest"}'), 100), { name: "Example Guest" });
  await assert.rejects(readLimitedJson(new Response("invalid"), 100), error => error instanceof JsonRequestError && error.status === 400);
});
