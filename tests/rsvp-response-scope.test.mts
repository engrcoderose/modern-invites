import assert from "node:assert/strict";
import test from "node:test";

import {
  canSubmitGuestResponses,
  getGuestsAllowedForResponse,
} from "../features/rsvp/domain/rsvp-response-scope.ts";
import { summarizeHouseholdAttendance } from "../features/rsvp/domain/household-attendance-summary.ts";
import { isRsvpResponseLocked } from "../features/rsvp/domain/rsvp-response-lock.ts";

const householdGuests = [
  { id: 89, fullName: "Rose Ann Liwanag" },
  { id: 90, fullName: "Ruby Grace Liwanag" },
];

test("name-search access returns only the searched guest", () => {
  assert.deepEqual(
    getGuestsAllowedForResponse(
      "name_search",
      "  ROSE   ANN LIWANAG ",
      householdGuests,
    ),
    [{ id: 89, fullName: "Rose Ann Liwanag" }],
  );
});

test("a name-search guest cannot submit another household member's response", () => {
  assert.equal(
    canSubmitGuestResponses(
      "name_search",
      "Rose Ann Liwanag",
      householdGuests,
      [90],
    ),
    false,
  );

  assert.equal(
    canSubmitGuestResponses(
      "name_search",
      "Rose Ann Liwanag",
      householdGuests,
      [89],
    ),
    true,
  );
});

test("ambiguous duplicate names cannot authorize an individual response", () => {
  assert.equal(
    canSubmitGuestResponses(
      "name_search",
      "Alex Santos",
      [
        { id: 1, fullName: "Alex Santos" },
        { id: 2, fullName: "Alex Santos" },
      ],
      [1],
    ),
    false,
  );
});

test("shared-code access retains the complete household response scope", () => {
  assert.deepEqual(
    getGuestsAllowedForResponse(
      "shared_code",
      "Rose Ann Liwanag",
      householdGuests,
    ),
    householdGuests,
  );

  assert.equal(
    canSubmitGuestResponses(
      "shared_code",
      "Rose Ann Liwanag",
      householdGuests,
      [89, 90],
    ),
    true,
  );
});

test("household summaries distinguish declined guests from pending guests", () => {
  assert.deepEqual(
    summarizeHouseholdAttendance(4, [
      "attending",
      "attending",
      "declined",
      "pending",
    ]),
    {
      maximumGuests: 4,
      attendingGuests: 2,
      declinedGuests: 1,
      pendingGuests: 1,
    },
  );
});

test("only a recorded individual submission locks a guest response", () => {
  assert.equal(isRsvpResponseLocked(null), false);
  assert.equal(isRsvpResponseLocked(undefined), false);
  assert.equal(
    isRsvpResponseLocked("2026-07-31T01:30:00.000Z"),
    true,
  );
});
