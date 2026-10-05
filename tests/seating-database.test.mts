import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { before, beforeEach, after, test } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { VENUE_KINDS, VENUE_OBJECTS } from "../features/seating/domain/venue-objects.ts";

let db: PGlite;
const owner = "11111111-1111-4111-8111-111111111111";
const tableId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const plan = () => ({ version: 1, tables: [{ id: tableId, name: "Family", shape: "round", capacity: 2, x: 30, y: 30, rotation: 0, color: "#88a999" }], landmarks: [], assignments: [{ guestId: 1, tableId }] });
before(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role;
    create schema auth; create function auth.uid() returns uuid language sql as $$ select nullif(current_setting('request.jwt.claim.sub', true),'')::uuid $$;
    create table events(id bigint primary key, name text, slug text, is_active boolean default true);
    create table client_profiles(user_id uuid primary key, status text);
    create table event_members(event_id bigint references events,user_id uuid references client_profiles,role text);
    create table invitations(id bigint primary key,event_id bigint references events);
    create table guests(id bigint primary key,invitation_id bigint references invitations,full_name text,attendance_status text,responded_at timestamptz,rsvp_email text,rsvp_phone text,rsvp_message text);
    create table rsvps(id bigint primary key,invitation_id bigint references invitations);
    grant usage on schema auth to authenticated;
    grant select (id,name,slug,is_active) on events to authenticated;
    grant select on client_profiles,event_members to authenticated;
  `);
  await db.exec(await readFile(new URL("../supabase/migrations/20261005_client_services_and_seating.sql", import.meta.url), "utf8"));
});
after(async () => { await db?.close(); });
beforeEach(async () => {
  await db.exec(`reset role; truncate events,client_profiles,event_members,invitations,guests,rsvps,event_seating_plans cascade;
    insert into events(id,name,slug,client_services) values(1,'Example wedding','example','rsvp_and_seat_finder'),(2,'Other wedding','other','rsvp');
    insert into client_profiles values('${owner}','active'); insert into event_members values(1,'${owner}','owner');
    insert into invitations values(1,1),(2,2); insert into guests(id,invitation_id,full_name,attendance_status) values(1,1,'Example Guest','attending'),(2,2,'Other Guest','attending');
    select set_config('request.jwt.claim.sub','${owner}',false);`);
});
async function save(document: unknown = plan(), revision = 0, publish: boolean | null = null, eventId = 1) {
  await db.exec("set role authenticated");
  try { const result = (await db.query<{ result: { revision: number; published: boolean } }>("select save_event_seating_plan($1,$2,$3::jsonb,$4) result", [eventId, revision, JSON.stringify(document), publish])).rows[0].result; return { revision: result.revision, published: result.published }; }
  finally { await db.exec("reset role"); }
}
async function publicCall(sql: string, parameters: unknown[] = []) {
  await db.exec("set role service_role");
  try { return (await db.query<{ result: Record<string, unknown> | null }>(sql, parameters)).rows[0].result; }
  finally { await db.exec("reset role"); }
}

test("seat-number migration preserves legacy plans and publishes only the matching seat", async () => {
  await save(plan(), 0, true);
  const before = (await db.query("select * from event_seating_plans")).rows;
  const update = await readFile(new URL("../supabase/migrations/20261005_seating_seat_numbers.sql", import.meta.url), "utf8");
  await db.exec(update);
  await db.exec(update);
  assert.deepEqual((await db.query("select * from event_seating_plans")).rows, before);
  const setup = await readFile(new URL("../supabase/migrations/20261005_client_services_and_seating.sql", import.meta.url), "utf8");
  assert.ok(update.includes(setup.slice(setup.indexOf("create or replace function public.save_event_seating_plan("), setup.indexOf("-- Public-facing server endpoints")).trim()));
  assert.ok(update.includes(setup.slice(setup.indexOf("create or replace function public.find_published_seat("), setup.indexOf("revoke all on function public.get_published_seating_layout")).trim()));
  const numbered = { ...plan(), assignments: [{ guestId: 1, tableId, seatNumber: 2 }] };
  await save(numbered, 1, true);
  assert.deepEqual(await publicCall("select find_published_seat('example','Example Guest') result"), { status: "found", tableId, seatNumber: 2 });
  const publicPlan = await publicCall("select get_published_seating_layout('example') result");
  assert.deepEqual((publicPlan!.plan as ReturnType<typeof plan>).assignments, []);
  await save({ ...numbered, assignments: [{ guestId: 1, tableId, seatNumber: 1 }] }, 2);
  assert.deepEqual(await publicCall("select find_published_seat('example','Example Guest') result"), { status: "found", tableId, seatNumber: 2 });
  await assert.rejects(save(numbered, 2), /changed/);
  await save(plan(), 3, true);
  assert.deepEqual(await publicCall("select find_published_seat('example','Example Guest') result"), { status: "found", tableId });
  await db.exec("set role authenticated");
  await assert.rejects(db.query("select find_published_seat('example','Example Guest')"), /permission denied/);
  await db.exec("reset role");
});

test("database enforces seat bounds and uniqueness while allowing seat release and reassignment", async () => {
  await db.exec("insert into guests(id,invitation_id,full_name,attendance_status) values(3,1,'Third Guest','pending')");
  for (const seatNumber of [null, "1", 0, 3, 1.5]) {
    await assert.rejects(save({ ...plan(), assignments: [{ guestId: 1, tableId, seatNumber }] }), /Invalid seat number|Invalid seating document/);
  }
  await assert.rejects(save({ ...plan(), assignments: [{ guestId: 1, tableId, seatNumber: 1 }, { guestId: 3, tableId, seatNumber: 1 }] }), /already assigned/);
  const secondTableId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const separate = { ...plan(), tables: [...plan().tables, { ...plan().tables[0], id: secondTableId }], assignments: [{ guestId: 1, tableId, seatNumber: 2 }, { guestId: 3, tableId: secondTableId, seatNumber: 2 }] };
  await save(separate, 0, true);
  await assert.rejects(save({ ...separate, tables: separate.tables.map(table => ({ ...table, capacity: 1 })) }, 1), /Invalid seat number/);
  await save({ ...plan(), assignments: [{ guestId: 3, tableId, seatNumber: 2 }] }, 1, true);
  assert.deepEqual(await publicCall("select find_published_seat('example','Third Guest') result"), { status: "found", tableId, seatNumber: 2 });
  assert.deepEqual(await publicCall("select find_published_seat('example','Example Guest') result"), { status: "not_found" });
});

test("rerunning the setup migration preserves events, guests, replies and published seating", async () => {
  await db.exec("insert into rsvps values(1,1)");
  await save(plan(), 0, true);
  const snapshot = async () => ({
    events: (await db.query("select * from events order by id")).rows,
    guests: (await db.query("select * from guests order by id")).rows,
    replies: (await db.query("select * from rsvps order by id")).rows,
    seating: (await db.query("select * from event_seating_plans order by event_id")).rows,
  });
  const before = await snapshot();
  await db.exec(await readFile(new URL("../supabase/migrations/20261005_client_services_and_seating.sql", import.meta.url), "utf8"));
  assert.deepEqual(await snapshot(), before);
});
test("manual migration keeps existing events RSVP only and constrains service values", async () => {
  await db.exec("insert into events(id,name,slug) values(3,'Legacy','legacy')");
  assert.equal((await db.query("select client_services from events where id=3")).rows[0].client_services, "rsvp");
  await assert.rejects(db.exec("update events set client_services='all'"), /check constraint/);
});

test("venue update retains stored plans and supports publishing all new object types", async () => {
  await save(plan(), 0, true);
  const before = (await db.query("select * from event_seating_plans where event_id=1")).rows;
  const update = await readFile(new URL("../supabase/migrations/20261005_seating_venue_objects.sql", import.meta.url), "utf8");
  await db.exec(update);
  assert.deepEqual((await db.query("select * from event_seating_plans where event_id=1")).rows, before);
  const document = { ...plan(), landmarks: VENUE_KINDS.map((kind, index) => ({
    id: `bbbbbbbb-bbbb-4bbb-8bbb-${String(index + 1).padStart(12, "0")}`, name: VENUE_OBJECTS[kind].name, kind,
    width: VENUE_OBJECTS[kind].width, height: VENUE_OBJECTS[kind].height, rotation: 90, x: 50, y: 50,
  })) };
  await save(document, 1, true);
  const published = await publicCall("select get_published_seating_layout('example') result");
  assert.deepEqual((published!.plan as typeof document).landmarks, document.landmarks);
  assert.deepEqual((published!.plan as typeof document).assignments, []);
  // The standalone migration must use the same secured save function as setup.
  const setup = await readFile(new URL("../supabase/migrations/20261005_client_services_and_seating.sql", import.meta.url), "utf8");
  const functionSource = setup.slice(setup.indexOf("create or replace function public.save_event_seating_plan("), setup.indexOf("-- Public-facing server endpoints")).trim();
  assert.ok(update.includes(functionSource));
});

test("table sizing migration retains plans, publishes dimensions and rejects invalid geometry", async () => {
  await save(plan(), 0, true);
  const before = (await db.query("select * from event_seating_plans where event_id=1")).rows;
  const update = await readFile(new URL("../supabase/migrations/20261005_seating_object_transforms.sql", import.meta.url), "utf8");
  await db.exec(update);
  assert.deepEqual((await db.query("select * from event_seating_plans where event_id=1")).rows, before);
  for (const fields of [{ width: 59 }, { width: 241 }, { width: "100" }, { width: null }, { height: 39 }, { height: 201 }, { height: null }]) {
    await assert.rejects(save({ ...plan(), tables: [{ ...plan().tables[0], ...fields }] }, 1), /Invalid table/);
  }
  const document = { ...plan(), tables: [{ ...plan().tables[0], width: 180, height: 180, rotation: 15 }] };
  await save(document, 1, true);
  const published = await publicCall("select get_published_seating_layout('example') result");
  assert.deepEqual((published!.plan as typeof document).tables, document.tables);
  assert.deepEqual((published!.plan as typeof document).assignments, []);
  const setup = await readFile(new URL("../supabase/migrations/20261005_client_services_and_seating.sql", import.meta.url), "utf8");
  assert.ok(update.includes(setup.slice(setup.indexOf("create or replace function public.save_event_seating_plan("), setup.indexOf("-- Public-facing server endpoints")).trim()));
});

test("database rejects unsupported venue types, oversized geometry and unexpected fields", async () => {
  const landmark = { id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", name: "Wall", kind: "wall", x: 50, y: 50, width: 160, height: 12, rotation: 0 };
  for (const fields of [{ kind: "unsupported" }, { width: 0 }, { width: 181 }, { width: "100" }, { height: null }, { height: 101 }, { rotation: 360 }, { rotation: "90" }, { secret: "payload" }]) {
    await assert.rejects(save({ ...plan(), landmarks: [{ ...landmark, ...fields }] }), /Invalid venue object/);
  }
  // Legacy landmarks omit optional geometry; saving them is still supported.
  await save({ ...plan(), landmarks: [{ id: landmark.id, name: "Entrance", kind: "entrance", x: 50, y: 90 }] });
});

test("migration extends column-level event reads without granting event writes", async () => {
  await db.exec("set role authenticated");
  try {
    assert.deepEqual((await db.query("select id,name,slug,is_active,client_services from events where id=1")).rows,
      [{ id: 1, name: "Example wedding", slug: "example", is_active: true, client_services: "rsvp_and_seat_finder" }]);
    assert.equal((await db.query("select has_column_privilege('authenticated','public.events','client_services','UPDATE') allowed")).rows[0].allowed, false);
  } finally { await db.exec("reset role"); }
});

test("follow-up repairs missing column grants while preserving event RLS and membership boundaries", async () => {
  await db.exec(`revoke select(client_services) on events from authenticated;
    alter table events enable row level security;
    create policy "Synthetic assigned event reads" on events for select to authenticated using (
      is_active and exists(select 1 from event_members m join client_profiles p on p.user_id=m.user_id
        where m.event_id=events.id and m.user_id=auth.uid() and p.status='active')
    );`);
  try {
    await db.exec("set role authenticated");
    await assert.rejects(db.query("select id,name,client_services from events where id=1"), /permission denied/);
    assert.deepEqual((await db.query("select id,name from events where id=1")).rows, [{ id: 1, name: "Example wedding" }]);
    await db.exec("reset role");
    await db.exec(await readFile(new URL("../supabase/migrations/20261005_client_services_read_permission.sql", import.meta.url), "utf8"));
    await db.exec("set role authenticated");
    assert.deepEqual((await db.query("select id,client_services from events order by id")).rows, [{ id: 1, client_services: "rsvp_and_seat_finder" }]);
    assert.equal((await db.query("select has_column_privilege('authenticated','public.events','client_services','UPDATE') allowed")).rows[0].allowed, false);
    await db.exec("reset role; update client_profiles set status='suspended'; set role authenticated");
    assert.deepEqual((await db.query("select id,client_services from events")).rows, []);
  } finally {
    await db.exec(`reset role; drop policy "Synthetic assigned event reads" on events;
      alter table events disable row level security;
      grant select(client_services) on events to authenticated;`);
  }
});
test("save preserves publication until explicitly published or unpublished, and rejects stale saves", async () => {
  assert.deepEqual(await save(), { revision: 1, published: false });
  await assert.rejects(save(), /changed/);
  assert.deepEqual(await save(plan(), 1, true), { revision: 2, published: true });
  const changed = plan(); changed.tables[0].name = "New draft";
  assert.deepEqual(await save(changed, 2), { revision: 3, published: true });
  const publicPlan = await publicCall("select get_published_seating_layout('example') result");
  assert.equal((publicPlan!.plan as ReturnType<typeof plan>).tables[0].name, "Family");
  assert.deepEqual((publicPlan!.plan as ReturnType<typeof plan>).assignments, []);
  await save(changed, 3, false);
  assert.equal(await publicCall("select get_published_seating_layout('example') result"), null);
});
test("database rejects viewers, disabled services, suspended profiles, archived events and anonymous callers", async () => {
  await assert.rejects(save(plan(), 0, true, 2), /not permitted/);
  for (const [disable, enable] of [
    ["update event_members set role='viewer'", "update event_members set role='editor'"],
    ["update events set client_services='rsvp' where id=1", "update events set client_services='seat_finder' where id=1"],
    ["update client_profiles set status='suspended'", "update client_profiles set status='active'"],
    ["update events set is_active=false where id=1", "update events set is_active=true where id=1"],
    ["select set_config('request.jwt.claim.sub','',false)", `select set_config('request.jwt.claim.sub','${owner}',false)`],
  ]) { await db.exec(disable); await assert.rejects(save(), /not permitted/); await db.exec(enable); }
  await db.exec("set role anon");
  await assert.rejects(db.query("select save_event_seating_plan(1,0,$1,true)", [JSON.stringify(plan())]), /permission denied/);
  await db.exec("reset role");
});
test("database independently rejects invalid plans, foreign guests, duplicate IDs and overcapacity", async () => {
  const original = plan();
  for (const invalid of [
    { ...original, assignments: [{ guestId: 2, tableId }] },
    { ...original, assignments: [...original.assignments, ...original.assignments] },
    { ...original, tables: [original.tables[0], original.tables[0]] },
    { ...original, tables: [{ ...original.tables[0], capacity: 0 }] },
    { ...original, tables: [{ ...original.tables[0], x: "30" }] },
    { ...original, tables: [{ ...original.tables[0], name: null }] },
    { ...original, landmarks: [{ id: tableId, name: "Entrance", kind: "entrance", x: 50, y: 50 }] },
    { ...original, assignments: [{ guestId: 1, tableId: "missing" }] },
    { ...original, injected: true }, { ...original, version: null },
  ]) await assert.rejects(save(invalid), /Invalid/);
  await db.exec("insert into guests(id,invitation_id,full_name,attendance_status) values(3,1,'Third Guest','pending')");
  await assert.rejects(save({ ...original, tables: [{ ...original.tables[0], capacity: 1 }], assignments: [...original.assignments, { guestId: 3, tableId }] }), /capacity/);
  await db.exec("update guests set attendance_status='declined' where id=1");
  await assert.rejects(save(), /Invalid event guest/);
  assert.equal((await db.query("select count(*)::int count from event_seating_plans")).rows[0].count, 0);
});
test("row policies hide other events and direct writes or self-enabling services are denied", async () => {
  await save();
  await db.exec("set role authenticated");
  assert.equal((await db.query("select * from event_seating_plans")).rows.length, 1);
  await assert.rejects(db.exec("update event_seating_plans set revision=100"), /permission denied/);
  await db.exec("reset role; update client_profiles set status='suspended'; set role authenticated");
  assert.equal((await db.query("select * from event_seating_plans")).rows.length, 0);
  await db.exec("reset role; grant update(client_services) on events to authenticated; set role authenticated");
  await assert.rejects(db.exec("update events set client_services='seat_finder' where id=2"), /administrator access/);
  await assert.rejects(db.exec("select get_published_seating_layout('example')"), /permission denied/);
  await db.exec("reset role");
});
test("public search exposes only one exact name result, hides declined/deleted guests and rejects ambiguity", async () => {
  await save(plan(), 0, true);
  const search = (name: string) => publicCall("select find_published_seat('example',$1) result", [name]);
  assert.deepEqual(await search(" example   guest "), { status: "found", tableId });
  assert.deepEqual(await search("Example"), { status: "not_found" });
  await db.exec("insert into guests(id,invitation_id,full_name,attendance_status) values(3,1,'Example Guest','attending')");
  await save({ ...plan(), assignments: [...plan().assignments, { guestId: 3, tableId }] }, 1, true);
  assert.deepEqual(await search("Example Guest"), { status: "ambiguous" });
  await db.exec("update guests set attendance_status='declined' where id=3");
  assert.deepEqual(await search("Example Guest"), { status: "found", tableId });
  await db.exec("delete from guests where id=1");
  assert.deepEqual(await search("Example Guest"), { status: "not_found" });
});
test("Seat Finder only disables RSVP writes without deleting replies or blocking manual attendance", async () => {
  await db.exec("insert into rsvps values(1,1); update events set client_services='seat_finder' where id=1");
  await assert.rejects(db.exec("insert into rsvps values(2,1)"), /RSVP is not included/);
  await assert.rejects(db.exec("update guests set responded_at=now() where id=1"), /RSVP is not included/);
  await db.exec("update guests set attendance_status='pending' where id=1");
  assert.equal((await db.query("select count(*)::int count from rsvps")).rows[0].count, 1);
});

test("unpublishing after deleted or declined guests preserves the stored draft and ignores supplied edits", async () => {
  await save(plan(), 0, true);
  await db.exec("delete from guests where id=1");
  const changed = plan(); changed.tables[0].name = "Do not apply";
  assert.deepEqual(await save(changed, 1, false), { revision: 2, published: false });
  const stored = (await db.query<{ document: ReturnType<typeof plan> }>("select document from event_seating_plans where event_id=1")).rows[0].document;
  assert.equal(stored.tables[0].name, "Family");
  assert.equal(await publicCall("select get_published_seating_layout('example') result"), null);
});
