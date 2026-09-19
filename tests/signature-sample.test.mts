import assert from "node:assert/strict";
import test from "node:test";
import { demoHouseholds } from "../app/joshua-and-bea/data.ts";
import { emptyResponse, findHouseholds, summarizeResponse, validateResponse } from "../app/joshua-and-bea/lib/demo-rsvp.ts";

test("name search matches full invited names with normalized whitespace and case", () => {
  assert.equal(findHouseholds(demoHouseholds, "  CLARA   del ROSARIO  ")[0]?.household.id, "del-rosario-aguilar");
  assert.equal(findHouseholds(demoHouseholds, "Enzo Aguilar")[0]?.household.guests.length, 2);
  for (const name of ["Clara", "BLOOM-2", "Unknown Guest", ""]) assert.equal(findHouseholds(demoHouseholds, name).length, 0);
});

test("every household member must respond, with no extra guests or excess attendees", () => {
  const household = demoHouseholds[0];
  const responses = emptyResponse(household);
  assert.throws(() => validateResponse(household, responses), /every member/);
  responses.clara = { status: "attending", dietary: "Vegetarian" };
  assert.throws(() => validateResponse(household, responses), /every member/);
  responses.enzo = { status: "attending", dietary: "" };
  assert.equal(validateResponse(household, responses).attending, 2);
  assert.throws(() => validateResponse({ ...household, maxAttendees: 1 }, responses), /maximum/);
  assert.throws(() => validateResponse(household, { ...responses, extra: { status: "declined", dietary: "" } }), /only.*listed/);
});

test("mixed and declined replies produce accurate totals without mutating demo data", () => {
  const household = demoHouseholds[0];
  const responses = emptyResponse(household);
  responses.clara = { status: "attending", dietary: "Vegetarian" };
  responses.enzo = { status: "declined", dietary: "" };
  assert.deepEqual(validateResponse(household, responses), { attending: 1, declined: 1, pending: 0, maximum: 2 });
  responses.clara.status = "declined";
  assert.equal(validateResponse(household, responses).declined, 2);
  assert.equal(summarizeResponse(household, emptyResponse(household)).pending, 2);
});
