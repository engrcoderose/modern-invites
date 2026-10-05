"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Armchair, Map, QrCode, Save, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createFetchWithTimeout } from "@/lib/supabase/fetch-with-timeout";
import type { AssignedDashboardEvent } from "@/features/dashboard/domain/client-dashboard";
import { planSchema, savedSeatingSchema, TABLE_SHAPES, validateSeatingGuests, type SavedSeatingPlan, type SeatingGuest, type SeatingLandmark, type SeatingPlan, type SeatingTable } from "../domain/seating-plan";
import { FloorPlanView } from "./floor-plan-view";
import { TableInspector } from "./table-inspector";
import { GuestSeatingList } from "./guest-seating-list";
import { SeatingExports } from "./seating-exports";
import { VENUE_OBJECTS } from "../domain/venue-objects";
import { VenueMenu } from "./venue-menu";
import { seatAssignmentIssue } from "../domain/seat-assignment";

const tabs = [{ id: "floor", label: "Floor plan", icon: Map }, { id: "guests", label: "Guests & tables", icon: Users }, { id: "exports", label: "QR & exports", icon: QrCode }] as const;
type Tab = (typeof tabs)[number]["id"];

export function SeatingWorkspace({ event, initial, guests }: {
  event: AssignedDashboardEvent; initial: SavedSeatingPlan; guests: SeatingGuest[];
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initial);
  const [plan, setPlan] = useState(initial.plan);
  const [tab, setTab] = useState<Tab>("floor");
  const [selectedId, setSelectedId] = useState<string>();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const canEdit = event.role !== "viewer";
  const disabled = !canEdit || pending;
  const dirty = JSON.stringify(plan) !== JSON.stringify(saved.plan);
  const selected = [...plan.tables, ...plan.landmarks].find(item => item.id === selectedId);
  const assignedIds = new Set(plan.assignments.map(item => item.guestId));
  const unassigned = guests.filter(guest => guest.attendanceStatus !== "declined" && !assignedIds.has(guest.id)).length;
  const overCapacity = plan.tables.filter(table => plan.assignments.filter(item => item.tableId === table.id).length > table.capacity).length;
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(next: SeatingPlan) {
    if (disabled) return;
    setPlan(next); setMessage(""); setFailed(false);
  }
  function changeItem(item: SeatingTable | SeatingLandmark) {
    update({ ...plan, tables: plan.tables.map(table => table.id === item.id && "capacity" in item ? item : table), landmarks: plan.landmarks.map(landmark => landmark.id === item.id && "kind" in item ? item : landmark) });
  }
  function moveItem(id: string, x: number, y: number) {
    const item = [...plan.tables, ...plan.landmarks].find(item => item.id === id);
    if (item) changeItem({ ...item, x, y });
  }
  function addTable(shape: SeatingTable["shape"]) {
    if (plan.tables.length >= 100) { setMessage("The limit is 100 tables."); return; }
    const table: SeatingTable = { id: crypto.randomUUID(), name: `Table ${plan.tables.length + 1}`, shape, capacity: 8, color: "#88a999", rotation: 0, x: 20 + plan.tables.length % 4 * 20, y: 25 + Math.floor(plan.tables.length / 4) % 3 * 25 };
    update({ ...plan, tables: [...plan.tables, table] }); setSelectedId(table.id);
  }
  function addLandmark(kind: SeatingLandmark["kind"]) {
    if (plan.landmarks.length >= 20) { setMessage("The limit is 20 venue objects."); return; }
    const config = VENUE_OBJECTS[kind];
    const item: SeatingLandmark = { id: crypto.randomUUID(), name: config.name, kind, width: config.width, height: config.height, rotation: 0,
      x: 50, y: kind === "entrance" || kind === "door" ? 90 : kind === "stage" || kind === "couple" ? 12 : 50 };
    update({ ...plan, landmarks: [...plan.landmarks, item] }); setSelectedId(item.id);
  }
  function removeItem() {
    if (!selected) return;
    update({ ...plan, tables: plan.tables.filter(item => item.id !== selected.id), landmarks: plan.landmarks.filter(item => item.id !== selected.id), assignments: plan.assignments.filter(item => item.tableId !== selected.id) });
    setSelectedId(undefined); setMessage("Object removed. Guests from that table are now unassigned. Save to keep this change.");
  }
  function duplicateItem() {
    if (!selected || ("capacity" in selected ? plan.tables.length >= 100 : plan.landmarks.length >= 20)) return;
    const copy = { ...selected, id: crypto.randomUUID(), name: `${selected.name.slice(0, 53)} (copy)`, x: Math.min(92, selected.x + 8), y: Math.min(92, selected.y + 8) };
    update("capacity" in copy ? { ...plan, tables: [...plan.tables, copy] } : { ...plan, landmarks: [...plan.landmarks, copy] });
    setSelectedId(copy.id);
  }
  function assignGuest(guestId: number, tableId: string, seatNumber?: number) {
    if (disabled) return;
    const assignments = plan.assignments.filter(item => item.guestId !== guestId);
    const table = plan.tables.find(item => item.id === tableId);
    const guest = guests.find(item => item.id === guestId);
    if (tableId && (!table || !guest || guest.attendanceStatus === "declined")) { setFailed(true); setMessage("Choose an eligible guest and an existing table."); return; }
    const issue = table ? seatAssignmentIssue(plan, guestId, tableId, seatNumber) : null;
    if (issue) { setFailed(true); setMessage(issue); return; }
    update({ ...plan, assignments: [...assignments, ...(table ? [{ guestId, tableId, ...(seatNumber === undefined ? {} : { seatNumber }) }] : [])] });
  }
  async function save(publish: boolean | null) {
    if (disabled) return;
    const submittedPlan = publish === false ? saved.plan : plan;
    const parsed = planSchema.safeParse(submittedPlan);
    const issue = parsed.success ? publish === false ? null : validateSeatingGuests(submittedPlan, guests) : parsed.error.issues[0]?.message;
    if (issue) { setMessage(issue); setFailed(true); return; }
    setPending(true); setFailed(false); setMessage("");
    try {
      const response = await createFetchWithTimeout(30_000)(`/api/dashboard/events/${event.id}/seating`, {
        method: "PUT", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: submittedPlan, revision: saved.revision, publish }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save this plan.");
      const parsedResult = savedSeatingSchema.safeParse(result);
      if (!parsedResult.success) throw new Error("We couldn’t confirm the saved plan. Reload to check the latest version before saving again.");
      const next = parsedResult.data;
      setSaved(next);
      if (publish !== false) setPlan(next.plan);
      setMessage(publish === true ? "Plan saved and published. Guests can now find their table." : publish === false ? "Guest page unpublished. Your plan is kept." : "Draft saved. The guest page keeps its last published layout.");
    } catch (error) {
      setFailed(true); setMessage(error instanceof Error && error.name !== "AbortError" ? error.message : "We couldn’t confirm the save. Your edits are still here. Reload to check the latest version before saving again.");
    } finally { setPending(false); }
  }

  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark"><Armchair aria-hidden="true" className="size-4" /> Seat Finder</p>
        <h1 className="mt-2 font-elegant text-4xl text-forest sm:text-5xl">{event.name}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted">Arrange the venue, assign guests, then publish their floor plan. {canEdit ? "Your guest list is shared with the dashboard." : "You have view-only access."}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs text-ink-muted">{dirty ? "Unsaved changes" : "Draft saved"} · {saved.published ? "Published" : "Private"}</span>
        <Button type="button" variant="outline" disabled={disabled || !dirty} onClick={() => save(null)}><Save aria-hidden="true" className="size-4" />{pending ? "Saving…" : "Save draft"}</Button>
        <Button type="button" disabled={disabled || (!saved.published && plan.tables.length === 0)} onClick={() => save(!saved.published)} className="bg-forest text-white hover:bg-forest-light">{saved.published ? "Unpublish" : "Save & publish"}</Button>
        {saved.published && <Button type="button" variant="outline" disabled={disabled || !dirty} onClick={() => save(true)}>Publish changes</Button>}
      </div>
    </div>
    <div className="flex flex-wrap gap-3 text-sm">{[`${plan.tables.length} tables`, `${plan.assignments.length} seated guests`, `${unassigned} unassigned`, `${overCapacity} over capacity`].map(label => <span key={label} className="rounded-full border bg-white px-4 py-2 text-forest">{label}</span>)}</div>
    {message && <p role={failed ? "alert" : "status"} className={`rounded-lg border p-4 text-sm ${failed ? "border-destructive/30 bg-destructive/5 text-destructive" : "bg-sage-50 text-forest"}`}>{message}</p>}
    <nav aria-label="Seat Finder tools" className="flex flex-wrap gap-2">{tabs.map(({ id, label, icon: Icon }) => <Button key={id} type="button" variant={tab === id ? "default" : "outline"} aria-pressed={tab === id} onClick={() => setTab(id)} className={tab === id ? "bg-forest text-white" : "bg-white"}><Icon aria-hidden="true" className="size-4" />{label}</Button>)}</nav>
    {tab === "floor" && <>
      <fieldset disabled={disabled} className="flex flex-wrap items-center gap-2 rounded-xl border bg-white p-3 disabled:opacity-60"><legend className="sr-only">Add floor plan objects</legend>
        {TABLE_SHAPES.map(shape => <Button key={shape} type="button" variant="outline" onClick={() => addTable(shape)}>+ {shape[0].toUpperCase() + shape.slice(1)} table</Button>)}
        <VenueMenu disabled={disabled} onAdd={addLandmark} onAddOval={() => addTable("oval")} />
      </fieldset>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0"><FloorPlanView plan={plan} guests={guests} selectedId={selectedId} editable={!disabled} onSelect={setSelectedId} onMove={moveItem} onTransform={changeItem} /><p className="mt-2 text-xs text-ink-muted">Hover over a table to see its guests. Select an object, then drag its circular handles to resize or the top arrow to rotate. Hold Shift to snap rotation. Filled chairs indicate numbered seat assignments. Select a table to see seat numbers. Zoom in for finer adjustments.</p></div>
        {selected ? <TableInspector item={selected} plan={plan} guests={guests} disabled={disabled} onChange={changeItem} onDelete={removeItem} onDuplicate={duplicateItem} onClose={() => setSelectedId(undefined)} onAssign={assignGuest} /> : <div className="rounded-xl border border-dashed p-5 text-sm leading-6 text-ink-muted">Select a table or venue object to edit its details and position.</div>}
      </div>
    </>}
    {tab === "guests" && <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-ink-muted">Add guests and import files through your existing dashboard.</p><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={() => router.refresh()} disabled={pending}>Refresh RSVP status</Button><Button asChild variant="outline"><Link href={`/dashboard/events/${event.id}`}>Manage guest list</Link></Button></div></div>
      <GuestSeatingList plan={plan} guests={guests} disabled={disabled} selectedTable={selected && "capacity" in selected ? selected.id : undefined} onAssign={assignGuest} />
      {plan.assignments.some(item => !guests.some(guest => guest.id === item.guestId)) && <Button type="button" variant="outline" disabled={disabled} onClick={() => update({ ...plan, assignments: plan.assignments.filter(item => guests.some(guest => guest.id === item.guestId)) })}>Remove assignments for deleted guests</Button>}
    </div>}
    {tab === "exports" && <SeatingExports slug={event.slug} plan={plan} guests={guests} published={saved.published} dirty={dirty} />}
  </div>;
}
