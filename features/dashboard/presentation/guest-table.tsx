"use client";

import { useActionState, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MoreHorizontal,
  Save,
  Trash2,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  DashboardAttendanceStatus,
  DashboardGuest,
  DashboardGuestPage,
} from "@/features/dashboard/domain/client-dashboard";
import { initialGuestMutationState } from "./guest-mutation.types";
import type { GuestMutationAction } from "./guest-mutation.types";

interface GuestTableProps {
  eventId: number;
  guestPage: DashboardGuestPage;
  canManage: boolean;
  search?: string;
  attendanceStatus?: DashboardAttendanceStatus;
  updateAction: GuestMutationAction;
  deleteAction: GuestMutationAction;
}

const statusStyles = {
  attending: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  declined: "bg-rose-50 text-rose-700 ring-rose-600/15",
  pending: "bg-amber-50 text-amber-700 ring-amber-600/15",
} as const;

const statusLabels = {
  attending: "Attending",
  declined: "Declined",
  pending: "Awaiting reply",
} as const;

function buildPageHref(
  eventId: number,
  page: number,
  search?: string,
  attendanceStatus?: DashboardAttendanceStatus,
) {
  const parameters = new URLSearchParams();
  parameters.set("page", String(page));

  if (search) {
    parameters.set("search", search);
  }

  if (attendanceStatus) {
    parameters.set("status", attendanceStatus);
  }

  return `/dashboard/events/${eventId}?${parameters.toString()}`;
}

function GuestEditDialog({
  eventId,
  guest,
  updateAction,
  deleteAction,
  onClose,
}: {
  eventId: number;
  guest: DashboardGuest;
  updateAction: GuestMutationAction;
  deleteAction: GuestMutationAction;
  onClose: () => void;
}) {
  const [updateState, updateFormAction, isUpdating] = useActionState(
    updateAction,
    initialGuestMutationState,
  );
  const [deleteState, deleteFormAction, isDeleting] = useActionState(
    deleteAction,
    initialGuestMutationState,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-guest-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-black/10 bg-white p-5 text-left shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p id="edit-guest-title" className="font-semibold text-forest">
              Edit guest
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Changes are saved directly to the protected guest list.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close guest editor"
            className="-mr-2 -mt-2"
          >
            <X aria-hidden="true" />
          </Button>
        </div>

        <form action={updateFormAction} className="mt-4 space-y-4">
          <input type="hidden" name="eventId" value={eventId} />
          <input type="hidden" name="guestId" value={guest.id} />

          <div className="space-y-2">
            <Label htmlFor={`full-name-${guest.id}`}>Guest name</Label>
            <Input
              id={`full-name-${guest.id}`}
              name="fullName"
              defaultValue={guest.fullName}
              required
              maxLength={120}
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`guest-type-${guest.id}`}>Guest type</Label>
              <select
                id={`guest-type-${guest.id}`}
                name="guestType"
                defaultValue={guest.guestType}
                className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm"
              >
                <option value="adult">Adult</option>
                <option value="child">Child</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`status-${guest.id}`}>RSVP status</Label>
              <select
                id={`status-${guest.id}`}
                name="attendanceStatus"
                defaultValue={guest.attendanceStatus}
                className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm"
              >
                <option value="pending">Awaiting reply</option>
                <option value="attending">Attending</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`dietary-${guest.id}`}>Dietary notes</Label>
            <Input
              id={`dietary-${guest.id}`}
              name="dietaryRestrictions"
              defaultValue={guest.dietaryRestrictions ?? ""}
              maxLength={500}
              className="bg-white"
            />
          </div>

          {updateState.message ? (
            <p
              role={updateState.status === "error" ? "alert" : "status"}
              className={
                updateState.status === "error"
                  ? "text-sm text-destructive"
                  : "text-sm text-emerald-700"
              }
            >
              {updateState.message}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-forest text-white hover:bg-forest-light"
          >
            {isUpdating ? (
              <Loader2 aria-hidden="true" className="animate-spin" />
            ) : (
              <Save aria-hidden="true" />
            )}
            Save changes
          </Button>
        </form>

        <div className="my-4 border-t border-black/10" />

        <form
          action={deleteFormAction}
          onSubmit={(event) => {
            if (
              !window.confirm(
                `Remove ${guest.fullName} from the guest list?`,
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="eventId" value={eventId} />
          <input type="hidden" name="guestId" value={guest.id} />
          <Button
            type="submit"
            variant="outline"
            disabled={isDeleting}
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            {isDeleting ? (
              <Loader2 aria-hidden="true" className="animate-spin" />
            ) : (
              <Trash2 aria-hidden="true" />
            )}
            Remove guest
          </Button>
          {deleteState.status === "error" && deleteState.message ? (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {deleteState.message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

function GuestActionsButton({
  guest,
  onOpen,
}: {
  guest: DashboardGuest;
  onOpen: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Manage ${guest.fullName}`}
      onClick={onOpen}
      className="text-ink-muted hover:text-ink"
    >
      <MoreHorizontal aria-hidden="true" />
    </Button>
  );
}

export function GuestTable({
  eventId,
  guestPage,
  canManage,
  search,
  attendanceStatus,
  updateAction,
  deleteAction,
}: GuestTableProps) {
  const [editingGuest, setEditingGuest] =
    useState<DashboardGuest | null>(null);

  if (guestPage.guests.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-eucalyptus/40 bg-white/65 px-6 py-14 text-center">
        <UsersRound
          aria-hidden="true"
          className="mx-auto size-8 text-eucalyptus-dark"
        />
        <p className="mt-3 font-medium text-forest">No guests found</p>
        <p className="mt-1 text-sm text-ink-muted">
          Try changing the filters or add a new guest.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-visible rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">Guest</th>
                <th className="px-5 py-4 font-semibold">Household</th>
                <th className="px-5 py-4 font-semibold">Contact</th>
                <th className="px-5 py-4 font-semibold">
                  Dietary notes
                </th>
                <th className="px-5 py-4 font-semibold">RSVP status</th>
                {canManage ? (
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {guestPage.guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="hover:bg-eucalyptus/[0.035]"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">
                      {guest.fullName}
                    </p>
                    <p className="mt-1 capitalize text-xs text-ink-muted">
                      {guest.guestType}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {guest.householdName}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-ink">
                      {guest.email ?? "No email"}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {guest.phone ?? "No phone"}
                    </p>
                  </td>
                  <td className="max-w-[14rem] px-5 py-4 text-ink-muted">
                    <p className="truncate">
                      {guest.dietaryRestrictions ?? "None"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium leading-none ring-1 ring-inset ${statusStyles[guest.attendanceStatus]}`}
                    >
                      {statusLabels[guest.attendanceStatus]}
                    </span>
                  </td>
                  {canManage ? (
                    <td className="px-5 py-4 text-right">
                      <GuestActionsButton
                        guest={guest}
                        onOpen={() => setEditingGuest(guest)}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            Showing {(guestPage.page - 1) * guestPage.pageSize + 1}–
            {Math.min(
              guestPage.page * guestPage.pageSize,
              guestPage.total,
            )}{" "}
            of {guestPage.total} guests
          </p>

          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:w-auto sm:grid-cols-[auto_auto_auto]">
            <Button
              asChild={guestPage.page > 1}
              variant="outline"
              size="sm"
              disabled={guestPage.page <= 1}
              className="min-w-0 whitespace-nowrap bg-white px-2 sm:px-3"
            >
              {guestPage.page > 1 ? (
                <Link
                  href={buildPageHref(
                    eventId,
                    guestPage.page - 1,
                    search,
                    attendanceStatus,
                  )}
                >
                  <ChevronLeft aria-hidden="true" />
                  Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <ChevronLeft aria-hidden="true" />
                  Previous
                </span>
              )}
            </Button>

            <span className="whitespace-nowrap px-1 text-center text-xs text-ink-muted sm:px-2">
              Page {guestPage.page} of {guestPage.totalPages}
            </span>

            <Button
              asChild={guestPage.page < guestPage.totalPages}
              variant="outline"
              size="sm"
              disabled={guestPage.page >= guestPage.totalPages}
              className="min-w-0 whitespace-nowrap bg-white px-2 sm:px-3"
            >
              {guestPage.page < guestPage.totalPages ? (
                <Link
                  href={buildPageHref(
                    eventId,
                    guestPage.page + 1,
                    search,
                    attendanceStatus,
                  )}
                >
                  Next
                  <ChevronRight aria-hidden="true" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  Next
                  <ChevronRight aria-hidden="true" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {editingGuest ? (
        <GuestEditDialog
          eventId={eventId}
          guest={editingGuest}
          updateAction={updateAction}
          deleteAction={deleteAction}
          onClose={() => setEditingGuest(null)}
        />
      ) : null}
    </>
  );
}
