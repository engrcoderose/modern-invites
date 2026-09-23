import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { findHouseholds, emptyResponse, validateResponse, summarizeResponse, type DemoHousehold } from "../app/anjo-and-jasmin/lib/demo-rsvp.ts";

const household: DemoHousehold = { id: "test", name: "Sample household", maxAttendees: 1, guests: [
  { id: "one", name: "Sample Guest", type: "Adult" },
  { id: "two", name: "Second Guest", type: "Adult" },
] };

test("lookup normalizes full names and rejects partial or unknown names", () => {
  assert.equal(findHouseholds([household], "  SAMPLE   GUEST  ")[0]?.matchedName, "Sample Guest");
  assert.deepEqual(findHouseholds([household], "Sample"), []);
  assert.deepEqual(findHouseholds([household], "Unknown Guest"), []);
  assert.deepEqual(findHouseholds([household], " "), []);
});

test("RSVP needs every guest answered and respects the invitation maximum", () => {
  const responses = emptyResponse(household);
  assert.throws(() => validateResponse(household, responses), /every member/);
  responses.one.status = "attending";
  responses.two.status = "attending";
  assert.throws(() => validateResponse(household, responses), /maximum of 1/);
  responses.two.status = "declined";
  assert.deepEqual(validateResponse(household, responses), { attending: 1, declined: 1, pending: 0, maximum: 1 });
  responses.extra = { status: "declined", dietary: "" };
  assert.throws(() => validateResponse(household, responses), /only for the guests/);
});

test("new household drafts are independent and show pending totals", () => {
  const original = emptyResponse(household);
  const next = emptyResponse(household);
  original.one.status = "attending";
  assert.equal(next.one.status, "pending");
  assert.equal(summarizeResponse(household, next).pending, 2);
});

test("sample RSVP never invokes live RSVP hooks, network calls, or persistent storage", () => {
  const component = readFileSync(new URL("../app/anjo-and-jasmin/components/DemoRsvpFlow.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(component, /fetch\s*\(|\/api\/|useSmartRsvp|usePartyResponse|localStorage|sessionStorage/);
});
