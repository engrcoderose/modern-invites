"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DashboardHousehold } from "@/features/dashboard/domain/client-dashboard";
import { submitDashboardGuest, type AddGuestResult } from "./submit-dashboard-guest";
import { useDismissibleDetails } from "./use-dismissible-details";

interface AddGuestFormProps {
  eventId: number;
  households: DashboardHousehold[];
}

export function AddGuestForm({
  eventId,
  households,
}: AddGuestFormProps) {
  const router = useRouter();
  const [, startRefresh] = useTransition();
  const [state, setState] = useState<AddGuestResult>({ status: "idle" });
  const [isPending, setPending] = useState(false);
  const submitting = useRef(false);
  const [householdSelection, setHouseholdSelection] = useState("individual");
  const detailsRef = useDismissibleDetails();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || state.needsRefresh) return;
    const form = event.currentTarget;
    submitting.current = true;
    setPending(true);
    setState({ status: "idle" });
    try {
      const formData = new FormData(form);
      if (householdSelection === "individual") {
        formData.set("householdName", String(formData.get("fullName") ?? "").trim());
        formData.set("maximumGuests", "1");
      }
      const result = await submitDashboardGuest(eventId, formData);
      setState(result);
      if (result.status === "success") {
        form.reset();
        setHouseholdSelection("individual");
        startRefresh(() => router.refresh());
      }
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-md bg-forest px-4 text-sm font-medium text-white shadow transition-colors hover:bg-forest-light">
        <Plus aria-hidden="true" className="size-4" />
        Add guest
      </summary>

      <div className="fixed inset-x-4 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-auto max-w-md -translate-y-1/2 overflow-y-auto rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:absolute sm:inset-x-auto sm:left-0 sm:top-12 sm:max-h-[calc(100vh-6rem)] sm:w-[min(24rem,calc(100vw-2rem))] sm:max-w-none sm:translate-y-0 lg:left-auto lg:right-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-eucalyptus/10 text-forest">
            <UserPlus aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-forest">Add a new guest</p>
            <p className="text-xs text-ink-muted">
              The initial RSVP status will be pending.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isPending}>
          <input type="hidden" name="eventId" value={eventId} />

          <div className="space-y-2">
            <Label htmlFor="new-full-name">Guest name</Label>
            <Input
              id="new-full-name"
              name="fullName"
              required
              maxLength={120}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="household-selection">Invitation</Label>
            <input
              type="hidden"
              name="invitationId"
              value={
                householdSelection === "individual" || householdSelection === "new"
                  ? ""
                  : householdSelection
              }
            />
            <select
              id="household-selection"
              value={householdSelection}
              onChange={(event) =>
                setHouseholdSelection(event.target.value)
              }
              aria-describedby="invitation-help"
              className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm"
            >
              <option value="individual">Individual guest</option>
              <option value="new">Create a new household</option>
              {households.map((household) => (
                <option key={household.id} value={household.id}>
                  {household.name} ({household.guestCount} of{" "}
                  {household.maxAttendees} guests)
                </option>
              ))}
            </select>
            <p id="invitation-help" className="text-xs text-ink-muted">
              {householdSelection === "individual"
                ? "One seat will be reserved under this guest’s name. No household details are needed."
                : "Choose an existing household to keep party members together. Each option shows added guests against its maximum."}
            </p>
          </div>

          {householdSelection === "new" ? (
            <div className="grid grid-cols-[minmax(0,1fr)_8rem] gap-3">
              <div className="space-y-2">
                <Label htmlFor="new-household-name">
                  New household name
                </Label>
                <Input
                  id="new-household-name"
                  name="householdName"
                  required
                  maxLength={120}
                  placeholder="e.g. The Santos Family"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-maximum-guests">
                  Maximum guests
                </Label>
                <Input
                  id="new-maximum-guests"
                  name="maximumGuests"
                  required
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={1000}
                  step={1}
                  placeholder="e.g. 4"
                  className="bg-white"
                />
              </div>

              <p className="col-span-2 text-xs text-ink-muted">
                Include this first guest in the household maximum.
              </p>
            </div>
          ) : (
            <>
              <input type="hidden" name="householdName" value="" />
              <input type="hidden" name="maximumGuests" value="" />
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="new-guest-type">Guest type</Label>
              <select
                id="new-guest-type"
                name="guestType"
                className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm"
              >
                <option value="adult">Adult</option>
                <option value="child">Child</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-dietary">Dietary notes</Label>
              <Input
                id="new-dietary"
                name="dietaryRestrictions"
                maxLength={500}
                placeholder="Optional"
                className="bg-white"
              />
            </div>
          </div>

          {state.message ? (
            <p
              role={state.status === "error" ? "alert" : "status"}
              className={
                state.status === "error"
                  ? "text-sm text-destructive"
                  : "text-sm text-emerald-700"
              }
            >
              {state.message}
            </p>
          ) : null}

          {state.needsRefresh && <a href={`/dashboard/events/${eventId}`} className="block text-sm font-medium text-forest underline underline-offset-4">Refresh and check the guest list</a>}

          <Button
            type="submit"
            disabled={isPending || state.needsRefresh}
            className="w-full bg-forest text-white hover:bg-forest-light"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                Adding guest…
              </>
            ) : (
              "Add to guest list"
            )}
          </Button>
        </form>
      </div>
    </details>
  );
}
