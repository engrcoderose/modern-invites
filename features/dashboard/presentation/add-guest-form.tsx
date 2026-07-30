"use client";

import { useActionState } from "react";
import { Loader2, Plus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GuestMutationAction } from "./guest-mutation.types";
import { initialGuestMutationState } from "./guest-mutation.types";

interface AddGuestFormProps {
  eventId: number;
  action: GuestMutationAction;
}

export function AddGuestForm({ eventId, action }: AddGuestFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialGuestMutationState,
  );

  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-md bg-forest px-4 text-sm font-medium text-white shadow transition-colors hover:bg-forest-light">
        <Plus aria-hidden="true" className="size-4" />
        Add guest
      </summary>

      <div className="absolute right-0 top-12 z-30 w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-black/10 bg-white p-5 shadow-2xl">
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

        <form action={formAction} className="space-y-4">
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
            <Label htmlFor="new-household-name">Household name</Label>
            <Input
              id="new-household-name"
              name="householdName"
              required
              maxLength={120}
              placeholder="e.g. The Santos Family"
              className="bg-white"
            />
          </div>

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

          <Button
            type="submit"
            disabled={isPending}
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
