import assert from "node:assert/strict";
import test from "node:test";
import { householdCapacityError, householdSettingsSchema } from "../features/dashboard/domain/household-settings.ts";

const input = { eventId: "42", householdId: "12", householdName: " Reyes Family ", maximumGuests: "6" };

test("household settings trim names, parse limits, and ignore unrelated fields", () => {
  assert.deepEqual(householdSettingsSchema.parse({ ...input, invitation_code: "changed", guestCount: 0 }), {
    eventId: 42, householdId: 12, householdName: "Reyes Family", maximumGuests: 6,
  });
});

test("household settings reject invalid identifiers, names, and capacities", () => {
  for (const override of [
    { eventId: "0" }, { householdId: "-1" }, { householdId: "1.5" },
    { householdName: "  " }, { householdName: "A".repeat(121) }, { householdName: null },
    { maximumGuests: "" }, { maximumGuests: null }, { maximumGuests: "0" },
    { maximumGuests: "1.5" }, { maximumGuests: "1001" }, { maximumGuests: "NaN" },
  ]) {
    assert.equal(householdSettingsSchema.safeParse({ ...input, ...override }).success, false);
  }
});

test("limits can increase or decrease to the current guest count, but never below it", () => {
  assert.equal(householdCapacityError(6, 4), null);
  assert.equal(householdCapacityError(4, 4), null);
  assert.equal(householdCapacityError(1, 0), null);
  assert.match(householdCapacityError(3, 4)!, /4 guests already/);
});
