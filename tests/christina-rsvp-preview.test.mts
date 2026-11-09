import assert from "node:assert/strict";
import test from "node:test";
import { previewHouseholds } from "../app/christina-and-reboden/data/rsvp-preview.ts";
import { createPreviewResponses, findPreviewHouseholds, getPreviewSummary, validatePreviewResponses } from "../app/christina-and-reboden/utilities/rsvpPreview.ts";

test("preview name search uses the existing exact-name normalization", () => {
  for (const name of ["Alex Rivera", "  ALEX   RIVERA ", "Alex M. Rivera"]) {
    const matches = findPreviewHouseholds(previewHouseholds, name);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].household.key, "preview-rivera");
    assert.equal(matches[0].matchedGuestName, "Alex Rivera");
  }
  for (const name of ["Alex", "Rivera", "Alex R", "Alex% Rivera", "Not Invited"]) {
    assert.deepEqual(findPreviewHouseholds(previewHouseholds, name), []);
  }
});

test("matching a different invited household member finds the same household", () => {
  assert.equal(findPreviewHouseholds(previewHouseholds, "Sam Rivera")[0].household.key, "preview-rivera");
});

test("ambiguous names return every household for explicit selection", () => {
  const duplicate = { ...previewHouseholds[0], key: "preview-second-rivera", householdName: "Another sample household" };
  assert.equal(findPreviewHouseholds([...previewHouseholds, duplicate], "Alex Rivera").length, 2);
});

test("every invited guest needs an attendance answer", () => {
  const household = previewHouseholds[0];
  const responses = createPreviewResponses(household);
  responses[household.guests[0].key].status = "attending";
  assert.match(validatePreviewResponses(household, responses), /each invited guest/);
  responses[household.guests[1].key].status = "declined";
  assert.equal(validatePreviewResponses(household, responses), "");
  assert.deepEqual(getPreviewSummary(household, responses), { totalGuests: 2, attendingCount: 1, declinedCount: 1, maxAttendees: 2 });
});

test("household limits hold and unrelated response keys are ignored", () => {
  const household = { ...previewHouseholds[0], maxAttendees: 1 };
  const responses = createPreviewResponses(household);
  for (const guest of household.guests) responses[guest.key].status = "attending";
  assert.match(validatePreviewResponses(household, responses), /up to 1/);
  responses[household.guests[1].key].status = "declined";
  responses.uninvited = { status: "attending", dietaryRestrictions: "" };
  assert.equal(validatePreviewResponses(household, responses), "");
  assert.equal(getPreviewSummary(household, responses).attendingCount, 1);
});
