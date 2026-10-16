import assert from "node:assert/strict";
import test from "node:test";
import { openRsvpSchema, openRsvpNameSchema } from "../features/rsvp/domain/open-rsvp.ts";
import { checkOpenRsvpName } from "../features/rsvp/application/check-open-rsvp-name.ts";
import { submitOpenRsvp } from "../features/rsvp/application/submit-open-rsvp.ts";
import type { RsvpEventAccessConfiguration } from "../features/rsvp/domain/rsvp-event-access.ts";

const input = { slug: "sample-event", requestId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", fullName: "New Visitor", attendance: "attending" as const, email: "", phone: "", message: "", dietaryRestrictions: "" };
const event: RsvpEventAccessConfiguration = { eventId: 7, eventName: "Sample", slug: input.slug, accessMode: "open", responseMode: "household", rsvpDeadline: null, isActive: true };

test("a visitor absent from the guest list can RSVP without a code", async () => {
  let writes = 0;
  const result = await submitOpenRsvp({ findBySlug: async () => event, verifySharedCode: async () => { throw new Error("Must not verify a code"); } }, {
    submit: async (eventId, submitted) => {
      writes++;
      assert.equal(eventId, 7);
      assert.deepEqual(submitted, input);
      return { totalGuests: 1, attendingCount: 1, declinedCount: 0, maxAttendees: 1 };
    },
  }, input);
  assert.equal(result.status, "saved");
  assert.equal(writes, 1);
});

test("open submission cannot bypass another mode, a deadline, closure, or a missing event", async () => {
  for (const configured of [null, { ...event, accessMode: "name_search" as const }, { ...event, accessMode: "shared_code" as const }, { ...event, isActive: false }, { ...event, rsvpDeadline: "2000-01-01" }]) {
    const result = await submitOpenRsvp({ findBySlug: async () => configured, verifySharedCode: async () => null }, { submit: async () => { throw new Error("Must not write"); } }, input);
    assert.notEqual(result.status, "saved");
  }
});

test("validates required details, lengths, email, status and retry token", () => {
  assert.equal(openRsvpSchema.safeParse(input).success, true);
  for (const change of [{ fullName: " " }, { fullName: "a".repeat(151) }, { attendance: "pending" }, { requestId: "not-a-uuid" }, { email: "bad" }, { email: "a".repeat(255) }, { phone: "1".repeat(41) }, { dietaryRestrictions: "x".repeat(501) }, { message: "x".repeat(2001) }, { slug: "" }]) {
    assert.equal(openRsvpSchema.safeParse({ ...input, ...change }).success, false);
  }
  const normalized = openRsvpSchema.parse({ ...input, fullName: "  New   Visitor ", email: " visitor@example.com " });
  assert.equal(normalized.fullName, "New Visitor");
  assert.equal(normalized.email, "visitor@example.com");
  assert.equal(openRsvpNameSchema.parse({ slug: input.slug, fullName: "\t NEW \tVisitor \n" }).fullName, "NEW Visitor");
  assert.equal(openRsvpNameSchema.parse({ slug: input.slug, fullName: "\u00a0New\u202fVisitor\ufeff" }).fullName, "New Visitor");
});

test("name preflight authorizes open access and returns only the name status", async () => {
  for (const status of ["available", "responded", "ambiguous"] as const) {
    let reads = 0;
    const result = await checkOpenRsvpName({ findBySlug: async () => event, verifySharedCode: async () => { throw new Error("No code needed"); } }, {
      checkName: async (eventId, fullName) => { reads++; assert.equal(eventId, 7); assert.equal(fullName, input.fullName); return { status, fullName }; },
    }, { slug: input.slug, fullName: input.fullName });
    assert.deepEqual(result, { status, fullName: input.fullName });
    assert.equal(reads, 1);
  }
});

test("name preflight cannot read guest status for unavailable or restricted events", async () => {
  for (const configured of [null, { ...event, accessMode: "name_search" as const }, { ...event, accessMode: "shared_code" as const }, { ...event, isActive: false }, { ...event, rsvpDeadline: "2000-01-01" }]) {
    const result = await checkOpenRsvpName({ findBySlug: async () => configured, verifySharedCode: async () => null }, {
      checkName: async () => { throw new Error("Must not read names"); },
    }, { slug: input.slug, fullName: input.fullName });
    assert.ok(result.status === "closed" || result.status === "denied");
  }
});
