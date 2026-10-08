import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { GuestAttendanceList } from "./GuestAttendanceList";
import type {
  EventInformation,
  PartyInformation,
  SearchMatch,
} from "./types";
import { usePartyResponse } from "./usePartyResponse";

export interface PartyDisplayOptions {
  appearance?: "card" | "minimal";
  householdLabel?: string;
  householdNameClassName?: string;
  showBackToSearch?: boolean;
}

interface PartyStepProps {
  display?: PartyDisplayOptions;
  event: EventInformation;
  eventSlug: string;
  rsvpCode: string;
  selectedMatch: SearchMatch;
  party: PartyInformation;
  onBack: () => void;
  onReset: () => void;
}

export function PartyStep({
  display,
  event,
  eventSlug,
  rsvpCode,
  selectedMatch,
  party,
  onBack,
  onReset,
}: PartyStepProps) {
  const minimal = display?.appearance === "minimal";
  const fieldClassName = minimal
    ? "mt-3 min-h-12 rounded-sm border-[var(--smart-rsvp-border-soft)] bg-transparent shadow-none focus-visible:ring-[var(--smart-rsvp-border)]"
    : "mt-2";
  const labelClassName = minimal
    ? "text-xs font-normal uppercase tracking-[.12em] text-[var(--smart-rsvp-heading)]"
    : undefined;
  const {
    responses,
    email,
    phone,
    message,
    answeredCount,
    attendingCount,
    allAnswered,
    exceedsMaximum,
    isSubmitting,
    submissionError,
    summary,
    setEmail,
    setPhone,
    setMessage,
    updateAttendance,
    updateDietaryRestrictions,
    submitResponse,
  } = usePartyResponse({
    eventSlug,
    rsvpCode,
    selectedMatch,
    party,
  });

  if (summary) {
    return (
      <Card className={minimal ? "rounded-none border-0 bg-transparent shadow-none" : "border-2 border-green-300 bg-white shadow-xl"}>
        <CardContent className="p-8 text-center">
          <CheckCircle2 aria-hidden="true" className={cn("mx-auto mb-4 h-16 w-16", minimal ? "text-[var(--smart-rsvp-border)]" : "text-green-600")} />
          <h3 className={minimal ? display?.householdNameClassName ?? "font-serif text-3xl text-[var(--smart-rsvp-heading)]" : "font-libreBaskerville text-3xl text-gray-900"}>
            RSVP Confirmed
          </h3>
          <p className="mt-3 text-gray-600">
            Thank you, {selectedMatch.matchedGuestName}. Your response has been
            saved.
          </p>

          <div className={cn("mx-auto mt-6 max-w-sm p-4 text-sm", minimal ? "rounded-sm border border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] text-[var(--smart-rsvp-heading)]" : "rounded-lg bg-green-50 text-green-900")}>
            <p>
              Attending: <strong>{summary.attendingCount}</strong>
            </p>
            <p className="mt-1">
              Declined: <strong>{summary.declinedCount}</strong>
            </p>
          </div>

          <Button
            type="button"
            onClick={onReset}
            className={cn("mt-6 bg-[var(--smart-rsvp-accent)] text-white hover:bg-[var(--smart-rsvp-accent-hover)]", minimal && "min-h-12 rounded-sm px-8")}
          >
            Finish
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={minimal ? "rounded-none border-0 bg-transparent shadow-none" : "border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl"}>
      <CardHeader className={cn("border-b border-[var(--smart-rsvp-border-soft)] text-center", minimal ? "space-y-0 bg-transparent px-0 pb-8 pt-0" : "bg-[var(--smart-rsvp-soft)]")}>
        {display?.householdLabel && (
          <p className="mb-4 text-[10px] uppercase tracking-[.22em] text-[var(--smart-rsvp-heading)]">
            {display.householdLabel}
          </p>
        )}
        <CardTitle className={cn("text-[var(--smart-rsvp-heading)]", display?.householdNameClassName ?? "font-libreBaskerville text-2xl")}>
          {party.householdName}
        </CardTitle>
        <p className={cn("text-sm text-gray-600", minimal ? "mt-4 leading-7" : "mt-2")}>
          Respond for each member invited to {event.name}.
        </p>
        <p className={cn("text-xs text-gray-500", minimal ? "mt-3 leading-6" : "mt-1")}>
          {answeredCount} of {party.guests.length} answered · {attendingCount}{" "}
          attending · Maximum {party.maxAttendees}
        </p>
      </CardHeader>

      <CardContent className={minimal ? "space-y-7 px-0 pb-0 pt-7" : "space-y-6 p-6 md:p-8"}>
        <GuestAttendanceList
          appearance={minimal ? "minimal" : "default"}
          guests={party.guests}
          responses={responses}
          disabled={isSubmitting}
          onAttendanceChange={updateAttendance}
          onDietaryChange={updateDietaryRestrictions}
        />

        {!allAnswered && (
          <p className="text-sm text-amber-700">
            Please mark every guest as attending or declined.
          </p>
        )}

        {exceedsMaximum && (
          <p className="text-sm text-red-700">
            This invitation allows a maximum of {party.maxAttendees} attendees.
          </p>
        )}

        <div className={minimal ? "space-y-6 border-t border-[var(--smart-rsvp-border-soft)] pt-7" : "space-y-4 border-t border-gray-100 pt-6"}>
          <div>
            <Label htmlFor="rsvp-email" className={labelClassName}>Email Address (optional)</Label>
            <Input
              id="rsvp-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              maxLength={254}
              className={fieldClassName}
            />
          </div>

          <div>
            <Label htmlFor="rsvp-phone" className={labelClassName}>Phone Number (optional)</Label>
            <Input
              id="rsvp-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={isSubmitting}
              maxLength={40}
              className={fieldClassName}
            />
          </div>

          <div>
            <Label htmlFor="rsvp-message" className={labelClassName}>Message (optional)</Label>
            <Textarea
              id="rsvp-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSubmitting}
              maxLength={2000}
              rows={4}
              className={fieldClassName}
            />
          </div>
        </div>

        {submissionError && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {submissionError}
          </div>
        )}

        <Button
          type="button"
          disabled={isSubmitting || !allAnswered || exceedsMaximum}
          onClick={() => void submitResponse()}
          className={cn("w-full bg-[var(--smart-rsvp-accent)] text-white hover:bg-[var(--smart-rsvp-accent-hover)]", minimal ? "h-14 rounded-sm px-6 text-xs font-normal uppercase tracking-[.12em]" : "rounded-full py-6 text-lg")}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Saving RSVP...
            </>
          ) : (
            "Confirm Responses"
          )}
        </Button>

        <div className={cn("flex flex-col gap-3 border-t pt-5 sm:flex-row", minimal ? "border-[var(--smart-rsvp-border-soft)]" : "border-gray-100")}>
          {display?.showBackToSearch !== false && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1"
            >
              Back to Search
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            disabled={isSubmitting}
            className={cn("flex-1 text-gray-500", minimal && "min-h-12 rounded-sm text-xs uppercase tracking-[.12em] hover:bg-[var(--smart-rsvp-soft-strong)]")}
          >
            {event.accessMode === "shared_code"
              ? "Use a Different Code"
              : "Start Over"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
