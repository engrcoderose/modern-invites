"use client";

import { useActionState } from "react";
import { Home, Loader2, Trash2, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DashboardHousehold } from "@/features/dashboard/domain/client-dashboard";
import type { GuestMutationAction } from "./guest-mutation.types";
import { initialGuestMutationState } from "./guest-mutation.types";

interface ManageHouseholdsProps {
  eventId: number;
  households: DashboardHousehold[];
  action: GuestMutationAction;
}

function HouseholdDeleteForm({
  eventId,
  household,
  action,
}: {
  eventId: number;
  household: DashboardHousehold;
  action: GuestMutationAction;
}) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialGuestMutationState,
  );

  return (
    <div className="rounded-xl border border-black/10 bg-black/[0.015] p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {household.name}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            {household.guestCount}{" "}
            {household.guestCount === 1 ? "guest" : "guests"} · Maximum{" "}
            {household.maxAttendees}
          </p>
        </div>

        <form
          action={formAction}
          onSubmit={(event) => {
            const guestDescription =
              household.guestCount === 1
                ? "1 guest and their RSVP data"
                : `${household.guestCount} guests and their RSVP data`;

            if (
              !window.confirm(
                `Remove ${household.name}? This will permanently remove ${guestDescription}.`,
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="eventId" value={eventId} />
          <input
            type="hidden"
            name="householdId"
            value={household.id}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={isPending}
            aria-label={`Remove ${household.name}`}
            className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            {isPending ? (
              <Loader2 aria-hidden="true" className="animate-spin" />
            ) : (
              <Trash2 aria-hidden="true" />
            )}
          </Button>
        </form>
      </div>

      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={
            state.status === "error"
              ? "mt-2 text-xs text-destructive"
              : "mt-2 text-xs text-emerald-700"
          }
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

export function ManageHouseholds({
  eventId,
  households,
  action,
}: ManageHouseholdsProps) {
  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-4 text-sm font-medium text-forest shadow-sm transition-colors hover:bg-black/[0.025]">
        <Home aria-hidden="true" className="size-4" />
        Households
      </summary>

      <div className="absolute right-0 top-12 z-40 w-[min(25rem,calc(100vw-2rem))] rounded-2xl border border-black/10 bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-eucalyptus/10 text-forest">
            <UsersRound aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-forest">
              Manage households
            </p>
            <p className="text-xs text-ink-muted">
              Removing one also removes its guests and RSVP data.
            </p>
          </div>
        </div>

        {households.length > 0 ? (
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {households.map((household) => (
              <HouseholdDeleteForm
                key={household.id}
                eventId={eventId}
                household={household}
                action={action}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-black/15 px-4 py-8 text-center text-sm text-ink-muted">
            No households have been created.
          </div>
        )}
      </div>
    </details>
  );
}
