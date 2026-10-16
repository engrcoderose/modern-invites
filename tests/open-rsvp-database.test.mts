import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { before, beforeEach, after, test } from "node:test";
import { PGlite } from "@electric-sql/pglite";

let db: PGlite;
const requestId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

before(async () => {
  db = new PGlite();
  await db.exec(`
    create role anon; create role authenticated; create role service_role;
    create type attendance_status as enum ('pending', 'attending', 'declined');
    create type guest_type as enum ('adult', 'child');
    create table events(id bigint primary key, is_active boolean not null, rsvp_access_mode text not null, rsvp_code_hash text, rsvp_deadline date, client_services text default 'rsvp');
    create table invitations(id bigint generated always as identity primary key, event_id bigint references events, household_name text not null, max_attendees integer not null);
    create table guests(id bigint generated always as identity primary key, invitation_id bigint references invitations, full_name text not null, guest_type guest_type not null, attendance_status attendance_status not null, dietary_restrictions text, rsvp_email text, rsvp_phone text, rsvp_message text, responded_at timestamptz, updated_at timestamptz);
    create table rsvps(id bigint generated always as identity primary key, invitation_id bigint references invitations, submitted_by text, email text, phone text, message text, submitted_at timestamptz, updated_at timestamptz);
  `);
  for (const migration of ["20260731_individual_name_search_rsvp.sql", "20260731_lock_completed_individual_rsvp.sql", "20261014_open_rsvp.sql", "20261016_open_rsvp_name_first.sql"]) {
    await db.exec(await readFile(new URL(`../supabase/migrations/${migration}`, import.meta.url), "utf8"));
  }
});
after(async () => { await db?.close(); });
beforeEach(async () => {
  await db.exec(`reset role; truncate events, invitations, guests, rsvps, open_rsvp_receipts restart identity cascade;
    insert into events(id, is_active, rsvp_access_mode, rsvp_code_hash) values (1, true, 'open', null), (2, true, 'name_search', null), (3, true, 'shared_code', 'existing-hash');`);
});

async function invoke(eventId = 1, name: string | null = "New Visitor", status: string | null = "attending", id = requestId) {
  await db.exec("set role service_role");
  try {
    return (await db.query<{ result: unknown }>("select public.submit_open_rsvp($1, $2, $3, $4, 'visitor@example.com', '', 'Vegetarian', 'Hello') result", [eventId, id, name, status])).rows[0].result;
  } finally { await db.exec("reset role"); }
}
async function counts() {
  return (await db.query("select (select count(*)::int from invitations) invitations, (select count(*)::int from guests) guests, (select count(*)::int from rsvps) rsvps, (select count(*)::int from open_rsvp_receipts) receipts")).rows[0];
}
async function checkName(name = "New Visitor", eventId = 1) {
  await db.exec("set role service_role");
  try { return (await db.query("select public.check_open_rsvp_name($1, $2) result", [eventId, name])).rows[0].result; }
  finally { await db.exec("reset role"); }
}

test("creates dashboard-compatible guest, invitation and RSVP records without a guest list", async () => {
  assert.deepEqual(await invoke(), { success: true, total_guests: 1, attending_count: 1, declined_count: 0, max_attendees: 1 });
  assert.deepEqual(await counts(), { invitations: 1, guests: 1, rsvps: 1, receipts: 1 });
  assert.deepEqual((await db.query("select full_name, attendance_status, dietary_restrictions, rsvp_email, responded_at is not null responded from guests")).rows[0], { full_name: "New Visitor", attendance_status: "attending", dietary_restrictions: "Vegetarian", rsvp_email: "visitor@example.com", responded: true });
});

test("same request retries do not duplicate records; changed payloads cannot reuse a receipt", async () => {
  const saved = await invoke();
  assert.deepEqual(await invoke(), saved);
  await assert.rejects(invoke(1, "Different Visitor"), /different reply/);
  assert.deepEqual(await counts(), { invitations: 1, guests: 1, rsvps: 1, receipts: 1 });
});

test("same-name submissions are rejected without modifying earlier responses", async () => {
  await invoke();
  await assert.rejects(invoke(1, "\t new   VISITOR \n", "declined", "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"), /OPEN_RSVP_ALREADY_RESPONDED/);
  assert.equal((await counts()).guests, 1);
  assert.deepEqual((await db.query("select attendance_status, dietary_restrictions from guests order by id")).rows, [{ attendance_status: "attending", dietary_restrictions: "Vegetarian" }]);
});

test("a pending guest replies directly using their existing record and other events are independent", async () => {
  await db.exec("insert into invitations(event_id, household_name, max_attendees) values (1, 'Existing family', 2); insert into guests(invitation_id, full_name, guest_type, attendance_status) values (1, 'New Visitor', 'adult', 'pending');");
  assert.deepEqual(await checkName("\t new   VISITOR \n"), { status: "available", full_name: "New Visitor" });
  await invoke(1, "\t new   VISITOR \n");
  assert.deepEqual(await counts(), { invitations: 1, guests: 1, rsvps: 1, receipts: 1 });
  assert.deepEqual(await checkName(" NEW visitor "), { status: "responded", full_name: "NEW visitor" });
  assert.equal((await db.query("select responded_at is not null responded from guests")).rows[0].responded, true);
  await db.exec("update events set rsvp_access_mode = 'open' where id = 2");
  await invoke(2);
  assert.equal((await counts()).guests, 2);
});

test("rejects restricted modes, missing/archived/expired events and Seat Finder only", async () => {
  await assert.rejects(invoke(2), /unavailable/);
  await assert.rejects(invoke(3), /unavailable/);
  await assert.rejects(invoke(999), /unavailable/);
  await db.exec("update events set is_active = false where id = 1");
  await assert.rejects(invoke(), /unavailable/);
  await db.exec("update events set is_active = true, rsvp_deadline = '2000-01-01' where id = 1");
  await assert.rejects(invoke(), /deadline/);
  await db.exec("update events set rsvp_deadline = null, client_services = 'seat_finder' where id = 1");
  await assert.rejects(invoke(), /unavailable/);
  assert.equal((await counts()).guests, 0);
});

test("validates direct RPC calls and disallows anonymous database execution", async () => {
  for (const [name, status] of [[null, "attending"], ["a", "attending"], ["Visitor", null], ["Visitor", "pending"]]) await assert.rejects(invoke(1, name, status), /Invalid RSVP/);
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`set role ${role}`);
    await assert.rejects(db.query("select public.submit_open_rsvp(1, $1, 'Visitor', 'attending')", [requestId]), /permission denied/);
    await assert.rejects(db.query("select public.check_open_rsvp_name(1, 'Visitor')"), /permission denied/);
    await assert.rejects(db.query("select * from open_rsvp_receipts"), /permission denied/);
    await db.exec("reset role");
  }
});

test("a write failure rolls back all records and permits a successful retry", async () => {
  await db.exec(`create function fail_rsvp() returns trigger language plpgsql as $$ begin raise exception 'Simulated failure'; end $$;
    create trigger fail_rsvp before insert on rsvps for each row execute function fail_rsvp();`);
  await assert.rejects(invoke(), /Simulated failure/);
  assert.deepEqual(await counts(), { invitations: 0, guests: 0, rsvps: 0, receipts: 0 });
  await db.exec("drop trigger fail_rsvp on rsvps; drop function fail_rsvp()");
  await invoke();
  assert.equal((await counts()).guests, 1);
});

test("mode switching preserves shared-code hashes and existing responses", async () => {
  await invoke();
  await db.exec("update events set rsvp_access_mode = 'open' where id = 3; update events set rsvp_access_mode = 'shared_code' where id = 3;");
  assert.equal((await db.query("select rsvp_code_hash from events where id = 3")).rows[0].rsvp_code_hash, "existing-hash");
  assert.equal((await counts()).guests, 1);
});

test("installing the migration preserves existing event settings, guests and replies", async () => {
  await invoke();
  const snapshot = async () => {
    const result = [];
    for (const table of ["events", "invitations", "guests", "rsvps"]) {
      result.push((await db.query(`select * from ${table} order by id`)).rows);
    }
    return result;
  };
  const before = await snapshot();
  await db.exec(await readFile(new URL("../supabase/migrations/20261016_open_rsvp_name_first.sql", import.meta.url), "utf8"));
  assert.deepEqual(await snapshot(), before);
  await assert.rejects(db.exec("update events set rsvp_code_hash = 'unexpected' where id = 2"), /check constraint/);
});

test("preflight reads do not create records and recognize both response markers", async () => {
  assert.deepEqual(await checkName("\tNew   Visitor \n"), { status: "available", full_name: "New Visitor" });
  assert.deepEqual(await counts(), { invitations: 0, guests: 0, rsvps: 0, receipts: 0 });
  await invoke(1, " New   Visitor ", "declined");
  assert.equal((await checkName("\u00a0NEW\u202fvisitor\ufeff")).status, "responded");
  assert.deepEqual(await checkName("NEW visitor"), { status: "responded", full_name: "NEW visitor" });
  await db.exec("update guests set responded_at = null");
  assert.equal((await checkName()).status, "responded");
  await assert.rejects(invoke(1, "New Visitor", "attending", "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"), /OPEN_RSVP_ALREADY_RESPONDED/);
  await db.exec("update guests set attendance_status = 'pending', responded_at = now()");
  assert.equal((await checkName()).status, "responded");
});

test("one person's reply does not block or overwrite another unanswered member", async () => {
  await db.exec(`insert into invitations(event_id, household_name, max_attendees) values (1, 'Sample family', 2);
    insert into guests(invitation_id, full_name, guest_type, attendance_status, responded_at, rsvp_message) values
      (1, 'Earlier Guest', 'adult', 'attending', now(), 'Keep my message'), (1, 'New Visitor', 'adult', 'pending', null, null);
    insert into rsvps(invitation_id, submitted_by) values (1, 'Earlier Guest');`);
  assert.equal((await checkName()).status, "available");
  await invoke();
  assert.deepEqual(await counts(), { invitations: 1, guests: 2, rsvps: 1, receipts: 1 });
  assert.deepEqual((await db.query("select full_name, attendance_status, rsvp_message from guests order by id")).rows, [
    { full_name: "Earlier Guest", attendance_status: "attending", rsvp_message: "Keep my message" },
    { full_name: "New Visitor", attendance_status: "attending", rsvp_message: "Hello" },
  ]);
  assert.equal((await checkName()).status, "responded");
});

test("ambiguous pending names are blocked safely; any completed match takes priority", async () => {
  await db.exec(`insert into invitations(event_id, household_name, max_attendees) values (1, 'A', 1), (1, 'B', 1);
    insert into guests(invitation_id, full_name, guest_type, attendance_status) values
      (1, 'New Visitor', 'adult', 'pending'), (2, ' new  VISITOR ', 'adult', 'pending');`);
  assert.equal((await checkName()).status, "ambiguous");
  await assert.rejects(invoke(), /OPEN_RSVP_NAME_AMBIGUOUS/);
  assert.equal((await counts()).receipts, 0);
  await db.exec("update guests set attendance_status = 'declined' where id = 2");
  assert.equal((await checkName()).status, "responded");
  await assert.rejects(invoke(), /OPEN_RSVP_ALREADY_RESPONDED/);
});

test("submission rechecks status after a successful preflight and keeps existing capacity rules", async () => {
  assert.equal((await checkName()).status, "available");
  await invoke();
  await assert.rejects(invoke(1, "new visitor", "attending", "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"), /OPEN_RSVP_ALREADY_RESPONDED/);
  assert.equal((await counts()).receipts, 1);
  await db.exec(`insert into invitations(event_id, household_name, max_attendees) values (1, 'Full', 1);
    insert into guests(invitation_id, full_name, guest_type, attendance_status) values
      (2, 'Seated Person', 'adult', 'attending'), (2, 'Waiting Person', 'adult', 'pending');`);
  await assert.rejects(invoke(1, "Waiting Person", "attending", "cccccccc-cccc-4ccc-8ccc-cccccccccccc"), /maximum of 1/);
  assert.deepEqual((await db.query("select attendance_status, responded_at from guests where full_name = 'Waiting Person'")).rows[0], { attendance_status: "pending", responded_at: null });
  assert.equal((await checkName("Waiting Person")).status, "available");
  assert.equal((await counts()).receipts, 1);
});

test("preflight rejects missing, restricted, inactive, expired and non-RSVP events", async () => {
  for (const eventId of [2, 3, 999]) await assert.rejects(checkName("Visitor", eventId), /unavailable/);
  await db.exec("update events set is_active = false where id = 1");
  await assert.rejects(checkName(), /unavailable/);
  await db.exec("update events set is_active = true, rsvp_deadline = '2000-01-01' where id = 1");
  await assert.rejects(checkName(), /deadline/);
  await db.exec("update events set rsvp_deadline = null, client_services = 'seat_finder' where id = 1");
  await assert.rejects(checkName(), /unavailable/);
  await db.exec("update events set client_services = 'rsvp' where id = 1");
  await assert.rejects(checkName(" \t "), /Invalid RSVP name/);
});
