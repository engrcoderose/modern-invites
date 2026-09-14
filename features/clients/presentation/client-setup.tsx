"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { CalendarPlus, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClientEventOption } from "../domain/client";
import type { CreateEventAction, CreateEventFormState } from "../domain/event-creation";
import type { CreateClientAction } from "./create-client-form.types";
import { CreateClientForm } from "./create-client-form";

const initialState: CreateEventFormState = { status: "idle" };
const selectClass = "flex h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function EventForm({ action, onCreated }: { action: CreateEventAction; onCreated(event: ClientEventOption): void }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [customSlug, setCustomSlug] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [responseMode, setResponseMode] = useState("household");
  const reportedEvent = useRef<number | null>(null);

  useEffect(() => {
    if (state.status !== "success" || !state.createdEvent || reportedEvent.current === state.createdEvent.id) return;
    reportedEvent.current = state.createdEvent.id;
    onCreated(state.createdEvent);
    setName("");
    setSlug("");
    setCustomSlug(false);
    setDeadline("");
    setResponseMode("household");
  }, [state, onCreated]);

  function updateName(value: string) {
    setName(value);
    if (!customSlug) {
      setSlug(value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100).replace(/-$/, ""));
    }
  }

  return (
    <Card className="border-black/10 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-elegant text-3xl font-medium">Create an event</CardTitle>
        <CardDescription className="max-w-2xl leading-6">Set up a new celebration here, then create the client’s dashboard access below. If the event already exists, skip this step.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          <fieldset disabled={pending} className="grid gap-5 disabled:opacity-70 sm:grid-cols-2">
            <legend className="sr-only">New event details</legend>
            <div className="space-y-2">
              <Label htmlFor="event-name">Event name</Label>
              <Input id="event-name" name="name" value={name} onChange={e => updateName(e.target.value)} placeholder="Anjo & Jasmin" required minLength={2} maxLength={150} aria-invalid={Boolean(state.fieldErrors?.name)} aria-describedby={state.fieldErrors?.name ? "event-name-error" : undefined} className="h-11" />
              {state.fieldErrors?.name?.[0] && <p id="event-name-error" className="text-sm text-destructive">{state.fieldErrors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-slug">Event identifier</Label>
              <Input id="event-slug" name="slug" value={slug} onChange={e => { setSlug(e.target.value); setCustomSlug(true); }} placeholder="anjo-and-jasmin" required minLength={2} maxLength={100} autoCapitalize="none" spellCheck={false} aria-invalid={Boolean(state.fieldErrors?.slug)} aria-describedby="event-slug-help event-slug-error" className="h-11" />
              <p id="event-slug-help" className="text-xs leading-5 text-ink-muted">Match the identifier used by the invitation, such as anjo-and-jasmin.</p>
              <p id="event-slug-error" className="text-sm text-destructive">{state.fieldErrors?.slug?.[0]}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-deadline">RSVP deadline <span className="font-normal text-ink-muted">(optional)</span></Label>
              <Input id="event-deadline" name="rsvpDeadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} aria-invalid={Boolean(state.fieldErrors?.rsvpDeadline)} aria-describedby="event-deadline-help event-deadline-error" className="h-11" />
              <p id="event-deadline-help" className="text-xs leading-5 text-ink-muted">Leave blank if there is no deadline yet.</p>
              <p id="event-deadline-error" className="text-sm text-destructive">{state.fieldErrors?.rsvpDeadline?.[0]}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-response-mode">Guests can reply for</Label>
              <select id="event-response-mode" name="responseMode" value={responseMode} onChange={e => setResponseMode(e.target.value)} aria-invalid={Boolean(state.fieldErrors?.responseMode)} aria-describedby="event-response-help event-response-error" className={selectClass}>
                <option value="household">Their household or invitation group</option>
                <option value="individual">Themselves only</option>
              </select>
              <p id="event-response-help" className="text-xs leading-5 text-ink-muted">Guests find their invitation by entering their invited name.</p>
              <p id="event-response-error" className="text-sm text-destructive">{state.fieldErrors?.responseMode?.[0]}</p>
            </div>
          </fieldset>
          {state.message && <p role={state.status === "error" ? "alert" : "status"} className={`rounded-lg border px-4 py-3 text-sm ${state.status === "error" ? "border-destructive/20 bg-destructive/5 text-destructive" : "border-eucalyptus/30 bg-sage-50 text-forest"}`}>{state.status === "success" && <Check aria-hidden="true" className="mr-2 inline size-4" />}{state.message}</p>}
          <Button type="submit" disabled={pending} className="h-11 bg-forest text-white hover:bg-forest-light">{pending ? <Loader2 aria-hidden="true" className="animate-spin" /> : <CalendarPlus aria-hidden="true" />}{pending ? "Creating event…" : "Create event"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ClientSetup({ events, clientAction, eventAction }: { events: ClientEventOption[]; clientAction: CreateClientAction; eventAction: CreateEventAction }) {
  const [createdEvents, setCreatedEvents] = useState<ClientEventOption[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number>();
  const handleCreated = useCallback((event: ClientEventOption) => {
    setCreatedEvents(current => [...current.filter(item => item.id !== event.id), event]);
    setSelectedEventId(event.id);
  }, []);
  const options = [...new Map([...events, ...createdEvents].map(event => [event.id, event])).values()].sort((a, b) => a.name.localeCompare(b.name));

  return <div className="space-y-8">
    <EventForm action={eventAction} onCreated={handleCreated} />
    <CreateClientForm action={clientAction} events={options} selectedEventId={selectedEventId} />
  </div>;
}
