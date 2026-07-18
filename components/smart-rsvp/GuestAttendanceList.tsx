import { Check, UserRound, X } from "lucide-react";

import { Input } from "@/components/ui/input";

import type {
  AttendanceChoice,
  GuestResponseDraft,
  PartyGuest,
} from "./types";

interface GuestAttendanceListProps {
  guests: PartyGuest[];
  responses: Record<number, GuestResponseDraft>;
  disabled: boolean;
  onAttendanceChange: (guestId: number, status: AttendanceChoice) => void;
  onDietaryChange: (guestId: number, value: string) => void;
}

export function GuestAttendanceList({
  guests,
  responses,
  disabled,
  onAttendanceChange,
  onDietaryChange,
}: GuestAttendanceListProps) {
  return (
    <div
      aria-label="Invited party members"
      className="max-h-[26rem] divide-y divide-gray-100 overflow-y-auto overscroll-contain rounded-lg border border-[var(--smart-rsvp-border-soft)]"
    >
      {guests.map((guest) => {
        const response = responses[guest.id];
        const status = response?.status ?? null;

        return (
          <div key={guest.id} className="space-y-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--smart-rsvp-soft-strong)]">
                <UserRound className="h-5 w-5 text-[var(--smart-rsvp-accent)]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{guest.fullName}</p>
                <p className="mt-1 text-xs capitalize text-gray-500">
                  {guest.guestType}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={`${guest.fullName} is attending`}
                  aria-pressed={status === "attending"}
                  disabled={disabled}
                  onClick={() => onAttendanceChange(guest.id, "attending")}
                  style={
                    status === "attending"
                      ? {
                          backgroundColor: "#16a34a",
                          borderColor: "#16a34a",
                          color: "#ffffff",
                        }
                      : undefined
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                    status === "attending"
                      ? "shadow-sm"
                      : "border-gray-300 bg-white text-gray-600 hover:border-green-500 hover:text-green-600"
                  }`}
                >
                  <Check
                    aria-hidden="true"
                    className="h-5 w-5 stroke-current"
                    strokeWidth={3}
                  />
                </button>

                <button
                  type="button"
                  aria-label={`${guest.fullName} is declining`}
                  aria-pressed={status === "declined"}
                  disabled={disabled}
                  onClick={() => onAttendanceChange(guest.id, "declined")}
                  style={
                    status === "declined"
                      ? {
                          backgroundColor: "#ef4444",
                          borderColor: "#ef4444",
                          color: "#ffffff",
                        }
                      : undefined
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                    status === "declined"
                      ? "shadow-sm"
                      : "border-gray-300 bg-white text-gray-600 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  <X
                    aria-hidden="true"
                    className="h-5 w-5 stroke-current"
                    strokeWidth={3}
                  />
                </button>
              </div>
            </div>

            {status === "attending" && (
              <Input
                type="text"
                value={response?.dietaryRestrictions ?? ""}
                onChange={(event) =>
                  onDietaryChange(guest.id, event.target.value)
                }
                disabled={disabled}
                maxLength={500}
                placeholder="Dietary restrictions or allergies (optional)"
                className="sm:ml-[52px] sm:w-[calc(100%-52px)]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
