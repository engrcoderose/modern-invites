import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { GuestAttendanceList } from "./GuestAttendanceList";
import type {
  EventInformation,
  PartyInformation,
  SearchMatch,
} from "./types";
import { usePartyResponse } from "./usePartyResponse";

interface PartyStepProps {
  event: EventInformation;
  eventSlug: string;
  rsvpCode: string;
  selectedMatch: SearchMatch;
  party: PartyInformation;
  onBack: () => void;
  onReset: () => void;
}

export function PartyStep({
  event,
  eventSlug,
  rsvpCode,
  selectedMatch,
  party,
  onBack,
  onReset,
}: PartyStepProps) {
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
      <Card className="border-2 border-green-300 bg-white shadow-xl">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h3 className="font-libreBaskerville text-3xl text-gray-900">
            RSVP Confirmed
          </h3>
          <p className="mt-3 text-gray-600">
            Thank you, {selectedMatch.matchedGuestName}. Your response has been
            saved.
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-lg bg-green-50 p-4 text-sm text-green-900">
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
            className="mt-6 bg-[var(--smart-rsvp-accent)] text-white hover:bg-[var(--smart-rsvp-accent-hover)]"
          >
            Finish
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl">
      <CardHeader className="border-b border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] text-center">
        <CardTitle className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">
          {party.householdName}
        </CardTitle>
        <p className="mt-2 text-sm text-gray-600">
          Respond for each member invited to {event.name}.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {answeredCount} of {party.guests.length} answered · {attendingCount}{" "}
          attending · Maximum {party.maxAttendees}
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-6 md:p-8">
        <GuestAttendanceList
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

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div>
            <Label htmlFor="rsvp-email">Email Address (optional)</Label>
            <Input
              id="rsvp-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              maxLength={254}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="rsvp-phone">Phone Number (optional)</Label>
            <Input
              id="rsvp-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={isSubmitting}
              maxLength={40}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="rsvp-message">Message (optional)</Label>
            <Textarea
              id="rsvp-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSubmitting}
              maxLength={2000}
              rows={4}
              className="mt-2"
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
          className="w-full rounded-full bg-[var(--smart-rsvp-accent)] py-6 text-lg text-white hover:bg-[var(--smart-rsvp-accent-hover)]"
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

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1"
          >
            Back to Search
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            disabled={isSubmitting}
            className="flex-1 text-gray-500"
          >
            Use a Different Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
