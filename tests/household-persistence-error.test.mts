import assert from "node:assert/strict";
import test from "node:test";
import { GuestManagementError } from "../features/dashboard/application/manage-dashboard-guests.ts";
import { householdPersistenceError } from "../features/dashboard/infrastructure/household-persistence-error.ts";

test("household persistence errors distinguish database permission, schema, and constraint problems", () => {
  for (const [code, expectedType, instruction] of [
    ["42501", "forbidden", /permissions/],
    ["42703", "unexpected", /migrations and schema cache/],
    ["PGRST204", "unexpected", /migrations and schema cache/],
    ["42P01", "unexpected", /migrations and schema cache/],
    ["PGRST205", "unexpected", /migrations and schema cache/],
    ["23514", "invalid", /constraints/],
    ["23505", "invalid", /existing record/],
  ] as const) {
    const error = householdPersistenceError({ code }, "update");
    assert.ok(error instanceof GuestManagementError);
    assert.equal(error.code, expectedType);
    assert.match(error.message, instruction);
    assert.ok(error.message.includes(code));
  }
});

test("load failures identify the read step and never include raw database messages or details", () => {
  const error = householdPersistenceError({
    code: "PGRST204",
    ...{ message: "Private Sample Family", details: "sample@example.test", hint: "private details" },
  }, "read");
  assert.match(error.message, /load the household/);
  assert.doesNotMatch(error.message, /Private Sample Family|sample@example|private details/);
});

test("unknown failures retain a safe reference and request refresh before retrying an uncertain save", () => {
  for (const code of ["08006", "", "private household <name>"]) {
    const error = householdPersistenceError({ code }, "update");
    assert.equal(error.code, "unexpected");
    assert.match(error.message, /Refresh the list before trying again/);
    assert.ok(error.message.includes(code === "08006" ? "08006" : "UNKNOWN"));
    assert.doesNotMatch(error.message, /private household/);
  }
});
