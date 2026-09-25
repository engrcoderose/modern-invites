import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { before, beforeEach, after, test } from "node:test";
import { PGlite } from "@electric-sql/pglite";

let db: PGlite;
const owner = "11111111-1111-4111-8111-111111111111";
const requestId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const row = (fullName: string, householdName = "", guestType = "adult") => ({ rowNumber: 2, fullName, householdName, guestType, dietaryRestrictions: "" });

before(async () => {
  db = new PGlite();
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth;
    create function auth.uid() returns uuid language sql as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    create type guest_type as enum ('adult', 'child');
    create type attendance_status as enum ('pending', 'attending', 'declined');
    create table events(id bigint primary key, is_active boolean not null default true);
    create table client_profiles(user_id uuid primary key, status text);
    create table event_members(event_id bigint references events, user_id uuid references client_profiles, role text);
    create table invitations(id bigint generated always as identity primary key, event_id bigint references events, household_name text not null, max_attendees integer not null);
    create table guests(id bigint generated always as identity primary key, invitation_id bigint references invitations, full_name text not null, guest_type guest_type not null, attendance_status attendance_status not null, dietary_restrictions text);
    create table rsvps(id bigint primary key, invitation_id bigint references invitations, message text);
  `);
  await db.exec(await readFile(new URL("../supabase/migrations/20260927_rsvp_guest_import.sql", import.meta.url), "utf8"));
});
after(async () => { await db?.close(); });
beforeEach(async () => {
  await db.exec(`reset role; truncate events, client_profiles, event_members, invitations, guests, rsvps, rsvp_guest_imports restart identity cascade;
    insert into events values(1, true), (2, true);
    insert into client_profiles values('${owner}', 'active');
    insert into event_members values(1, '${owner}', 'owner');
    select set_config('request.jwt.claim.sub', '${owner}', false);`);
});

async function invoke(rows: unknown, preview = false, eventId = 1, id = requestId) {
  await db.exec("set role authenticated");
  try {
    const result = await db.query<{ result: { guestCount: number; invitationCount: number; issues: { message: string }[] } }>(
      "select public.import_event_guests($1, $2, $3::jsonb, $4) result", [eventId, id, JSON.stringify(rows), preview]);
    return result.rows[0].result;
  } finally { await db.exec("reset role"); }
}
async function count(table: string) {
  return (await db.query<{ count: number }>(`select count(*)::int count from ${table}`)).rows[0].count;
}

test("preview writes nothing; import creates pending guests and counted household capacities", async () => {
  const rows = [row("Maria"), row("Juan", "Reyes"), row("Ana", "reyes", "child")];
  assert.deepEqual(await invoke(rows, true), { guestCount: 3, invitationCount: 2, issues: [] });
  assert.equal(await count("guests"), 0);
  assert.equal(await count("rsvp_guest_imports"), 0);
  await invoke(rows);
  assert.equal(await count("guests"), 3);
  assert.deepEqual((await db.query("select max_attendees from invitations order by max_attendees")).rows, [{ max_attendees: 1 }, { max_attendees: 2 }]);
  assert.equal((await db.query("select * from guests where attendance_status <> 'pending'")).rows.length, 0);
  assert.equal(await count("rsvps"), 0);
});

test("existing guests, empty households, and RSVP responses are protected", async () => {
  await db.exec("insert into invitations(event_id, household_name, max_attendees) values(1, 'Existing', 3), (1, 'Empty', 2); insert into guests(invitation_id,full_name,guest_type,attendance_status) values(1, 'Maria Santos','adult','attending'); insert into rsvps values(1,1,'Keep this reply');");
  const result = await invoke([row(" maria   santos "), row("New Person", "Empty")]);
  assert.equal(result.issues.length, 2);
  assert.equal(await count("guests"), 1);
  assert.equal(await count("rsvp_guest_imports"), 0);
  assert.deepEqual((await db.query("select attendance_status from guests")).rows, [{ attendance_status: "attending" }]);
  assert.deepEqual((await db.query("select message from rsvps")).rows, [{ message: "Keep this reply" }]);
});

test("same request retries return the saved result without inserting twice", async () => {
  const rows = [row("Maria")];
  const first = await invoke(rows);
  assert.deepEqual(await invoke(rows), first);
  assert.equal(await count("guests"), 1);
  await assert.rejects(invoke([row("Someone Else")]), /different file/);
  assert.equal(await count("guests"), 1);
});

test("new request IDs still reject already imported names", async () => {
  await invoke([row("Maria")]);
  const result = await invoke([row("Maria")], false, 1, "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb");
  assert.equal(result.issues.length, 1);
  assert.equal(await count("guests"), 1);
});

test("authorization rejects viewers, other events, suspended profiles, and anonymous callers", async () => {
  await assert.rejects(invoke([row("Maria")], false, 2), /not permitted/);
  await db.exec("update event_members set role = 'viewer'");
  await assert.rejects(invoke([row("Maria")]), /not permitted/);
  await db.exec("update event_members set role = 'editor'; update client_profiles set status = 'suspended'");
  await assert.rejects(invoke([row("Maria")]), /not permitted/);
  await db.exec("select set_config('request.jwt.claim.sub', '', false)");
  await assert.rejects(invoke([row("Maria")]), /not permitted/);
  await db.exec("set role anon");
  await assert.rejects(db.query("select public.import_event_guests(1, $1, '[]', true)", [requestId]), /permission denied/);
  await db.exec("reset role");
  assert.equal(await count("guests"), 0);
});

test("database validates direct RPC inputs and archived events", async () => {
  for (const rows of [[], Array(501).fill(row("Maria")), [row("Maria", "", "invalid")], [{ ...row("Maria"), fullName: null }], [row("Maria"), row("MARIA")], [row("Maria"), row("Juan", "Maria")]]) {
    await assert.rejects(invoke(rows));
  }
  await db.exec("update events set is_active = false where id = 1");
  await assert.rejects(invoke([row("Maria")]), /not available/);
  assert.equal(await count("guests"), 0);
});

test("a failure partway through a batch rolls back guests, invitations and receipt", async () => {
  await db.exec(`create function reject_test_guest() returns trigger language plpgsql as $$ begin if new.full_name = 'Failure Guest' then raise exception 'Simulated failure'; end if; return new; end $$;
    create trigger reject_test_guest before insert on guests for each row execute function reject_test_guest();`);
  try {
    await assert.rejects(invoke([row("First Guest", "Family"), row("Failure Guest", "Family")]), /Simulated failure/);
    assert.equal(await count("guests"), 0);
    assert.equal(await count("invitations"), 0);
    assert.equal(await count("rsvp_guest_imports"), 0);
  } finally { await db.exec("drop trigger reject_test_guest on guests; drop function reject_test_guest()"); }
});
