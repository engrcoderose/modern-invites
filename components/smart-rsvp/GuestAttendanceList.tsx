import { Check, UserRound, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type {
  AttendanceChoice,
  GuestResponseDraft,
  PartyGuest,
} from "./types";

interface GuestAttendanceListProps {
  appearance?: "default" | "minimal";
  guests: PartyGuest[];
  responses: Record<number, GuestResponseDraft>;
  disabled: boolean;
  onAttendanceChange: (guestId: number, status: AttendanceChoice) => void;
  onDietaryChange: (guestId: number, value: string) => void;
}

export function GuestAttendanceList({
  appearance = "default",
  guests,
  responses,
  disabled,
  onAttendanceChange,
  onDietaryChange,
}: GuestAttendanceListProps) {
  const minimal = appearance === "minimal";
  return (
    <div
      aria-label="Invited party members"
      className={cn("max-h-[26rem] overflow-y-auto overscroll-contain border border-[var(--smart-rsvp-border-soft)]", minimal ? "divide-y divide-[var(--smart-rsvp-border-soft)] rounded-sm" : "divide-y divide-gray-100 rounded-lg")}
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
                <p className={cn("font-medium text-gray-900", minimal && "break-words text-sm leading-6 sm:text-base")}>{guest.fullName}</p>
                <p className="mt-1 text-xs capitalize text-gray-500">
                  {guest.guestType}
                </p>
              </div>

              <div className={cn("flex gap-2", minimal && "shrink-0")}>
                <button
                  type="button"
                  aria-label={`${guest.fullName} is attending`}
                  aria-pressed={status === "attending"}
                  disabled={disabled}
                  onClick={() => onAttendanceChange(guest.id, "attending")}
                  style={
                    status === "attending"
                      ? {
                          backgroundColor: minimal ? "var(--smart-rsvp-accent)" : "#16a34a",
                          borderColor: minimal ? "var(--smart-rsvp-accent)" : "#16a34a",
                          color: "#ffffff",
                        }
                      : undefined
                  }
                  className={cn("flex items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
                    minimal ? "h-11 w-11 focus-visible:ring-[var(--smart-rsvp-border)]" : "h-10 w-10 focus-visible:ring-green-600",
                    status === "attending"
                      ? "shadow-sm"
                      : minimal
                        ? "border-[var(--smart-rsvp-border)] bg-transparent text-[var(--smart-rsvp-border)] hover:bg-[var(--smart-rsvp-soft-strong)]"
                        : "border-gray-300 bg-white text-gray-600 hover:border-green-500 hover:text-green-600"
                  )}
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
                          backgroundColor: minimal ? "var(--smart-rsvp-soft-strong)" : "#ef4444",
                          borderColor: minimal ? "var(--smart-rsvp-border)" : "#ef4444",
                          color: minimal ? "var(--smart-rsvp-heading)" : "#ffffff",
                        }
                      : undefined
                  }
                  className={cn("flex items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
                    minimal ? "h-11 w-11 focus-visible:ring-[var(--smart-rsvp-border)]" : "h-10 w-10 focus-visible:ring-red-500",
                    status === "declined"
                      ? "shadow-sm"
                      : minimal
                        ? "border-[var(--smart-rsvp-border-soft)] bg-transparent text-[var(--smart-rsvp-heading)] hover:bg-[var(--smart-rsvp-soft-strong)]"
                        : "border-gray-300 bg-white text-gray-600 hover:border-red-400 hover:text-red-500"
                  )}
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
                className={cn("sm:ml-[52px] sm:w-[calc(100%-52px)]", minimal && "min-h-12 rounded-sm border-[var(--smart-rsvp-border-soft)] bg-transparent shadow-none focus-visible:ring-[var(--smart-rsvp-border)]")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
