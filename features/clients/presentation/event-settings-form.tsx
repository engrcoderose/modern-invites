"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ManagedEvent, EventSettingsState, UpdateEventSettingsAction } from "../domain/event-management";

const initialState: EventSettingsState = { status: "idle" };
const selectClass = "h-11 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function EventSettingsForm({ event, action }: { event: ManagedEvent; action: UpdateEventSettingsAction }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [name, setName] = useState(event.name);
  const [deadline, setDeadline] = useState(event.rsvp_deadline ?? "");
  const [responseMode, setResponseMode] = useState(event.rsvp_response_mode);
  const [status, setStatus] = useState(event.is_active ? "active" : "archived");
  const [version, setVersion] = useState(event.updated_at);
  const [saved, setSaved] = useState(event);

  useEffect(() => {
    if (state.status === "success" && state.updatedEvent) {
      setSaved(state.updatedEvent);
      setVersion(state.updatedEvent.updated_at);
      setName(state.updatedEvent.name);
    }
  }, [state]);

  const dirty = name !== saved.name || deadline !== (saved.rsvp_deadline ?? "") || responseMode !== saved.rsvp_response_mode || status !== (saved.is_active ? "active" : "archived");
  function resetChanges() {
    setName(saved.name);
    setDeadline(saved.rsvp_deadline ?? "");
    setResponseMode(saved.rsvp_response_mode);
    setStatus(saved.is_active ? "active" : "archived");
  }
  function error(field: string) {
    return state.fieldErrors?.[field]?.[0] ? <p id={`${field}-error`} className="text-sm text-destructive">{state.fieldErrors[field]?.[0]}</p> : null;
  }

  return <form action={formAction} className="space-y-6">
    <input type="hidden" name="id" value={event.id} />
    <input type="hidden" name="version" value={version} />
    <fieldset disabled={pending} className="grid gap-6 disabled:opacity-70 sm:grid-cols-2">
      <legend className="sr-only">Edit event settings</legend>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="name">Event name</Label>
        <Input id="name" name="name" value={name} onChange={e => setName(e.target.value)} required minLength={2} maxLength={150} className="h-11" aria-invalid={!!state.fieldErrors?.name} aria-describedby={state.fieldErrors?.name ? "name-error" : undefined} />
        {error("name")}
      </div>
      <div className="space-y-2">
        <Label htmlFor="rsvpDeadline">RSVP deadline <span className="font-normal text-ink-muted">(optional)</span></Label>
        <Input id="rsvpDeadline" name="rsvpDeadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="h-11" aria-invalid={!!state.fieldErrors?.rsvpDeadline} aria-describedby="deadline-help rsvpDeadline-error" />
        <p id="deadline-help" className="text-xs leading-5 text-ink-muted">Leave blank to remove the deadline.</p>
        {error("rsvpDeadline")}
      </div>
      <div className="space-y-2">
        <Label htmlFor="responseMode">Guests can reply for</Label>
        <select id="responseMode" name="responseMode" value={responseMode} onChange={e => setResponseMode(e.target.value as ManagedEvent["rsvp_response_mode"])} className={selectClass} aria-invalid={!!state.fieldErrors?.responseMode} aria-describedby="response-help responseMode-error">
          <option value="household">Their household or invitation group</option>
          <option value="individual">Themselves only</option>
        </select>
        <p id="response-help" className="text-xs leading-5 text-ink-muted">Applies to future replies. Previously submitted RSVPs are retained.</p>
        {error("responseMode")}
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="status">Event status</Label>
        <select id="status" name="status" value={status} onChange={e => setStatus(e.target.value)} className={selectClass} aria-describedby="status-help status-error" aria-invalid={!!state.fieldErrors?.status}>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <p id="status-help" className="rounded-lg bg-sage-50 p-3 text-sm leading-6 text-ink-muted">{status === "archived" ? "Archiving closes RSVP access and hides this event from the client dashboard. Guest lists, replies, and client assignments are kept. You can reactivate it here." : "Active events are available in the client dashboard. Guests can respond while the RSVP deadline allows."}</p>
        {error("status")}
      </div>
    </fieldset>
    {state.message && <p role={state.status === "error" ? "alert" : "status"} className={`rounded-lg border p-4 text-sm ${state.status === "error" ? "border-destructive/20 bg-destructive/5 text-destructive" : "border-eucalyptus/30 bg-sage-50 text-forest"}`}>{state.message}</p>}
    <div className="flex flex-wrap items-center gap-3 border-t border-black/10 pt-6">
      <Button type="submit" disabled={pending || !dirty} className="h-11 bg-forest text-white hover:bg-forest-light">{pending ? <Loader2 aria-hidden="true" className="animate-spin" /> : <Save aria-hidden="true" />}{pending ? "Saving…" : "Save changes"}</Button>
      <Button type="button" variant="outline" disabled={pending || !dirty} onClick={resetChanges}>Discard changes</Button>
      {dirty && <span className="text-xs text-ink-muted">Unsaved changes</span>}
    </div>
  </form>;
}
