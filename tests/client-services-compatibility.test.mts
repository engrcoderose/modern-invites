import assert from "node:assert/strict";
import { test } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { readWithServiceCompatibility, serviceColumnsForWrite, isMissingSeatingFunction } from "../features/services/infrastructure/service-schema-compatibility.ts";
import { ClientServicesSetupError, includesRsvp, includesSeatFinder } from "../features/services/domain/client-services.ts";
import { createAdminEvent } from "../features/clients/application/create-admin-event.ts";
import { updateAdminEvent } from "../features/clients/application/update-admin-event.ts";

const missingColumn = { code: "42703", message: "column events.client_services does not exist" };

test("legacy PostgreSQL events load without enabling seating; migrated events retain their package", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create table events(id int, name text, is_active boolean);
      insert into events values(1,'Assigned wedding',true),(2,'Other wedding',true),(3,'Archived wedding',false);`);
    const calls: boolean[] = [];
    const read = async (includeServices: boolean) => {
      calls.push(includeServices);
      try {
        const { rows } = await db.query<{ id: number; name: string; client_services?: "rsvp_and_seat_finder" }>(
          `select id,name${includeServices ? ",events.client_services" : ""} from events where id = $1 and is_active = true order by name`, [1],
        );
        return { data: rows, error: null as typeof missingColumn | null, count: rows.length };
      } catch (error) {
        const failure = error as { code: string; message: string };
        return { data: null, error: { code: failure.code, message: failure.message }, count: null };
      }
    };
    const legacy = await readWithServiceCompatibility(read);
    assert.equal(legacy.error, null);
    assert.deepEqual(legacy.data, [{ id: 1, name: "Assigned wedding" }]);
    assert.equal(legacy.count, 1);
    assert.equal(legacy.servicesAvailable, false);
    assert.deepEqual(calls, [true, false]);
    assert.equal(includesRsvp(legacy.data![0].client_services), true);
    assert.equal(includesSeatFinder(legacy.data![0].client_services), false);

    await db.exec("alter table events add column client_services text default 'rsvp_and_seat_finder'");
    calls.length = 0;
    const migrated = await readWithServiceCompatibility(read);
    assert.equal(migrated.servicesAvailable, true);
    assert.deepEqual(calls, [true]);
    assert.equal(includesSeatFinder(migrated.data![0].client_services), true);
  } finally { await db.close(); }
});

test("PostgREST schema-cache errors support legacy reads without dropping counts", async () => {
  const calls: boolean[] = [];
  const result = await readWithServiceCompatibility(async available => {
    calls.push(available);
    return available
      ? { data: null, count: null, error: { code: "PGRST204", message: "Could not find the 'client_services' column of 'events' in the schema cache" } }
      : { data: [{ id: 1 }], count: 42, error: null };
  });
  assert.deepEqual(calls, [true, false]);
  assert.equal(result.count, 42);
});

test("permission, network, and unrelated column failures never grant legacy access", async () => {
  for (const error of [
    { code: "42501", message: "permission denied for client_services" },
    { code: "FETCH_ERROR", message: "connection failed" },
    { code: "42703", message: "column events.rsvp_deadline does not exist" },
    { code: "PGRST204", message: "Could not find the 'other_client_services' column of 'events'" },
  ]) {
    let calls = 0;
    const result = await readWithServiceCompatibility(async () => { calls++; return { data: null, error }; });
    assert.equal(calls, 1);
    assert.equal(result.error, error);
  }
  await assert.rejects(readWithServiceCompatibility(async () => { throw new Error("transport failure"); }), /transport failure/);
});

test("legacy retry failures remain errors", async () => {
  const failure = { code: "42501", message: "permission denied" };
  const result = await readWithServiceCompatibility(async available => ({ data: null, error: available ? missingColumn : failure }));
  assert.equal(result.error, failure);
});

test("writes probe first and never silently downgrade a selected seating service", async () => {
  for (const service of ["seat_finder", "rsvp_and_seat_finder"] as const) {
    let mutations = 0;
    await assert.rejects(async () => {
      await serviceColumnsForWrite(service, async () => ({ error: missingColumn }));
      mutations++;
    }, ClientServicesSetupError);
    assert.equal(mutations, 0);
  }
  assert.deepEqual(await serviceColumnsForWrite("rsvp", async () => ({ error: missingColumn })), {});
  assert.deepEqual(await serviceColumnsForWrite("seat_finder", async () => ({ error: null })), { client_services: "seat_finder" });
  await assert.rejects(serviceColumnsForWrite("rsvp", async () => ({ error: { code: "42501", message: "permission denied" } })), /Unable to verify/);
});

test("missing published-layout function means unpublished; other errors remain failures", () => {
  const name = "get_published_seating_layout";
  assert.equal(isMissingSeatingFunction({ code: "PGRST202", message: `Could not find the function public.${name}(p_slug) in the schema cache` }, name), true);
  assert.equal(isMissingSeatingFunction({ code: "42883", message: `function public.${name}(text) does not exist` }, name), true);
  assert.equal(isMissingSeatingFunction({ code: "42501", message: `permission denied for function public.${name}` }, name), false);
  assert.equal(isMissingSeatingFunction({ code: "PGRST202", message: "Could not find the function public.other_function" }, name), false);
});

test("administrator forms explain migration setup failures instead of generic retry errors", async () => {
  const form = new FormData();
  for (const [key, value] of Object.entries({ id: "1", version: "2026-10-05T00:00:00Z", name: "Example wedding", slug: "example", rsvpDeadline: "", responseMode: "household", clientServices: "rsvp_and_seat_finder", status: "active" })) form.set(key, value);
  const failure = async () => { throw new ClientServicesSetupError(); };
  const dependencies = { isAdministrator: async () => true, createEvent: failure, updateEvent: failure };
  for (const result of [await createAdminEvent(dependencies, form), await updateAdminEvent(dependencies, form)]) {
    assert.equal(result.status, "error");
    assert.match(result.message!, /database setup is pending/);
    assert.match(result.fieldErrors!.clientServices![0], /requires database setup/);
  }
});
