"use client";

import {
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  LoaderCircle,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  type EventInformation,
  type PartyInformation,
  type SearchMatch,
  usePartyResponse,
  useSmartRsvp,
} from "@/components/smart-rsvp";

interface NylgenRsvpFlowProps {
  eventSlug: string;
  confirmationMessage: string;
}

interface PaperPanelProps {
  children: ReactNode;
  className?: string;
}

const fieldLabelClass =
  "block font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-wedding-sage-deep";

const lineInputClass =
  "mt-3 w-full border-0 border-b border-wedding-line bg-transparent px-0 py-3 font-wedding-body text-base normal-case tracking-normal text-wedding-ink outline-none transition-colors placeholder:text-wedding-ink/30 focus:border-wedding-sage-deep focus:ring-0 disabled:opacity-60";

const primaryButtonClass =
  "group flex w-full items-center justify-between bg-wedding-sage-deep px-6 py-5 font-sans text-[0.64rem] font-medium uppercase tracking-[0.24em] text-wedding-paper transition-colors hover:bg-wedding-sage disabled:cursor-wait disabled:opacity-70";

function formatSubmittedAt(value: string | null) {
  if (!value) {
    return "Previously submitted";
  }

  const submittedAt = new Date(value);

  if (Number.isNaN(submittedAt.getTime())) {
    return "Previously submitted";
  }

  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  }).format(submittedAt);
}

function PaperPanel({ children, className = "" }: PaperPanelProps) {
  return (
    <div
      className={`border border-wedding-line/55 bg-wedding-paper p-6 shadow-wedding-card sm:p-10 lg:p-12 ${className}`}
    >
      {children}
    </div>
  );
}

function LoadingPanel({
  errorMessage,
  onRetry,
}: {
  errorMessage: string;
  onRetry: () => Promise<void>;
}) {
  return (
    <PaperPanel className="flex min-h-[28rem] flex-col items-center justify-center text-center">
      {errorMessage ? (
        <>
          <div className="grid size-14 place-items-center rounded-full border border-red-200 bg-red-50 text-red-700">
            <span className="font-wedding-display text-2xl">!</span>
          </div>
          <h3 className="mt-6 font-wedding-display text-3xl text-wedding-sage-deep">
            We could not open the RSVP.
          </h3>
          <p role="alert" className="mt-3 max-w-sm font-wedding-body text-sm leading-7 text-red-700">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => void onRetry()}
            className="mt-7 bg-wedding-sage-deep px-6 py-4 font-sans text-[0.62rem] uppercase tracking-[0.22em] text-wedding-paper transition-colors hover:bg-wedding-sage"
          >
            Try again
          </button>
        </>
      ) : (
        <>
          <LoaderCircle className="size-8 animate-spin text-wedding-sage-deep" />
          <p className="mt-5 font-wedding-body text-sm text-wedding-ink/65">
            Preparing the wedding guest list…
          </p>
        </>
      )}
    </PaperPanel>
  );
}

function SearchPanel({
  event,
  fullName,
  matches,
  isSearching,
  loadingInvitationId,
  searchError,
  partyError,
  onNameChange,
  onSearch,
  onSelectMatch,
}: {
  event: EventInformation;
  fullName: string;
  matches: SearchMatch[];
  isSearching: boolean;
  loadingInvitationId: number | null;
  searchError: string;
  partyError: string;
  onNameChange: (value: string) => void;
  onSearch: () => Promise<void>;
  onSelectMatch: (match: SearchMatch) => Promise<void>;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSearch();
  }

  return (
    <PaperPanel>
      <div className="text-center">
        <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.28em] text-wedding-sage">
          Guest verification
        </p>
        <h3 className="mt-4 font-wedding-display text-4xl text-wedding-sage-deep">
          Find your invitation
        </h3>
        <p className="mx-auto mt-4 max-w-md font-wedding-body text-sm leading-7 text-wedding-ink/65">
          Enter your complete invited name exactly as it appears on the
          guest list for {event.name}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-9 space-y-7">
        <label className={fieldLabelClass}>
          Complete invited name
          <input
            required
            value={fullName}
            onChange={(changeEvent) =>
              onNameChange(changeEvent.target.value)
            }
            type="text"
            autoComplete="name"
            minLength={3}
            maxLength={150}
            disabled={isSearching}
            placeholder="Your complete name"
            className={lineInputClass}
          />
        </label>

        {searchError ? (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 font-wedding-body text-sm leading-6 text-red-700"
          >
            {searchError}
          </div>
        ) : null}

        <button
          disabled={isSearching || fullName.trim().length < 3}
          type="submit"
          className={primaryButtonClass}
        >
          {isSearching ? "Searching guest list" : "Find my invitation"}
          {isSearching ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
        </button>
      </form>

      {matches.length > 0 ? (
        <div className="mt-8 space-y-3 border-t border-wedding-line/35 pt-7">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-wedding-sage-deep">
            Select your household
          </p>
          {matches.map((match) => {
            const isLoading =
              loadingInvitationId === match.invitationId;

            return (
              <button
                key={`${match.invitationId}-${match.matchedGuestName}`}
                type="button"
                disabled={loadingInvitationId !== null}
                onClick={() => void onSelectMatch(match)}
                className="group w-full border border-wedding-line/60 bg-wedding-ivory/45 px-5 py-4 text-left transition-colors hover:border-wedding-sage-deep hover:bg-wedding-mist disabled:opacity-60"
              >
                <span className="flex items-center justify-between">
                  <span>
                    <span className="block font-wedding-body text-sm text-wedding-ink">
                      {match.householdName}
                    </span>
                    <span className="mt-1 block font-sans text-[0.58rem] uppercase tracking-[0.16em] text-wedding-sage">
                      Matched: {match.matchedGuestName}
                    </span>
                  </span>
                  {isLoading ? (
                    <LoaderCircle className="size-4 animate-spin text-wedding-sage-deep" />
                  ) : (
                    <ArrowRight className="size-4 text-wedding-sage transition-transform group-hover:translate-x-1" />
                  )}
                </span>

                <span className="mt-4 grid grid-cols-2 border-t border-wedding-line/35 pt-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Maximum guests",
                      value:
                        match.householdSummary.maximumGuests,
                    },
                    {
                      label: "Attending",
                      value:
                        match.householdSummary.attendingGuests,
                    },
                    {
                      label: "Not attending",
                      value:
                        match.householdSummary.declinedGuests,
                    },
                    {
                      label: "Awaiting reply",
                      value:
                        match.householdSummary.pendingGuests,
                    },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="border-wedding-line/30 px-2 py-2 text-center first:pl-0 last:pr-0 sm:border-l sm:first:border-l-0"
                    >
                      <span className="block font-wedding-display text-xl text-wedding-sage-deep">
                        {item.value}
                      </span>
                      <span className="mt-1 block font-sans text-[0.48rem] uppercase tracking-[0.13em] text-wedding-sage">
                        {item.label}
                      </span>
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {partyError ? (
        <div
          role="alert"
          className="mt-5 border border-red-200 bg-red-50 px-4 py-3 font-wedding-body text-sm leading-6 text-red-700"
        >
          {partyError}
        </div>
      ) : null}
    </PaperPanel>
  );
}

function PartyPanel({
  event,
  eventSlug,
  selectedMatch,
  party,
  confirmationMessage,
  onBack,
  onReset,
}: {
  event: EventInformation;
  eventSlug: string;
  selectedMatch: SearchMatch;
  party: PartyInformation;
  confirmationMessage: string;
  onBack: () => void;
  onReset: () => void;
}) {
  const {
    responses,
    email,
    phone,
    allAnswered,
    exceedsMaximum,
    isSubmitting,
    submissionError,
    summary,
    setEmail,
    setPhone,
    updateAttendance,
    updateDietaryRestrictions,
    submitResponse,
  } = usePartyResponse({
    eventSlug,
    rsvpCode: "",
    selectedMatch,
    party,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitResponse();
  }

  if (summary) {
    const submittedGuest = party.guests[0];
    const submittedStatus = submittedGuest
      ? responses[submittedGuest.id]?.status
      : null;

    return (
      <PaperPanel className="flex min-h-[32rem] flex-col items-center justify-center text-center">
        <div className="grid size-16 place-items-center rounded-full border border-wedding-line bg-wedding-mist text-wedding-sage-deep">
          <Check className="size-7 stroke-[1.3]" />
        </div>
        <h3 className="mt-7 font-wedding-display text-4xl text-wedding-sage-deep">
          We received your reply.
        </h3>
        <p className="mt-4 max-w-sm font-wedding-body text-sm leading-7 text-wedding-ink/65">
          {confirmationMessage}
        </p>
        <div className="mt-6 border-y border-wedding-line/35 px-8 py-4 font-wedding-body text-sm text-wedding-ink/70">
          {selectedMatch.matchedGuestName}:{" "}
          {submittedStatus === "attending"
            ? "Joyfully attending"
            : "Regretfully unable to attend"}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 font-sans text-[0.6rem] uppercase tracking-[0.24em] text-wedding-sage underline decoration-wedding-line underline-offset-8"
        >
          Send another response
        </button>
      </PaperPanel>
    );
  }

  const respondedGuest = party.guests.find(
    (guest) => guest.hasResponded,
  );

  if (respondedGuest) {
    return (
      <PaperPanel className="flex min-h-[32rem] flex-col items-center justify-center text-center">
        <div className="grid size-16 place-items-center rounded-full border border-wedding-line bg-wedding-mist text-wedding-sage-deep">
          <LockKeyhole className="size-7 stroke-[1.3]" />
        </div>

        <p className="mt-6 font-sans text-[0.62rem] font-medium uppercase tracking-[0.28em] text-wedding-sage">
          Response confirmed
        </p>
        <h3 className="mt-3 font-wedding-display text-4xl text-wedding-sage-deep">
          Already Received
        </h3>
        <p className="mt-4 max-w-md font-wedding-body text-sm italic leading-7 text-wedding-ink/65">
          You have already sent your RSVP,{" "}
          {respondedGuest.fullName}. Your response is confirmed.
        </p>

        <dl className="mt-7 w-full border-l-2 border-wedding-gold/55 bg-wedding-mist/60 px-5 py-5 text-left font-wedding-body text-sm leading-7 text-wedding-ink/70">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-wedding-sage-deep">
              Guest:
            </dt>
            <dd>{respondedGuest.fullName}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-wedding-sage-deep">
              Response:
            </dt>
            <dd>
              {respondedGuest.attendanceStatus === "attending"
                ? "Joyfully attending"
                : "Regretfully unable to attend"}
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-wedding-sage-deep">
              Household:
            </dt>
            <dd>{party.householdName}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-wedding-sage-deep">
              Submitted:
            </dt>
            <dd>{formatSubmittedAt(respondedGuest.respondedAt)}</dd>
          </div>
        </dl>

        <p className="mt-7 max-w-md font-wedding-body text-sm italic leading-7 text-wedding-ink/60">
          If you need to make changes, please contact the couple
          directly.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="mt-7 font-sans text-[0.6rem] uppercase tracking-[0.24em] text-wedding-sage underline decoration-wedding-line underline-offset-8"
        >
          Search another guest
        </button>
      </PaperPanel>
    );
  }

  return (
    <PaperPanel>
      <div className="text-center">
        <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.28em] text-wedding-sage">
          Your invitation
        </p>
        <h3 className="mt-4 font-wedding-display text-4xl text-wedding-sage-deep">
          {selectedMatch.matchedGuestName}
        </h3>
        <p className="mt-3 font-wedding-body text-sm leading-7 text-wedding-ink/65">
          Please submit only your own response for {event.name}. Other
          members of {party.householdName} can search their names and
          respond separately.
        </p>
        <p className="mt-2 font-sans text-[0.58rem] uppercase tracking-[0.16em] text-wedding-sage">
          Individual RSVP
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="space-y-6">
          {party.guests.map((guest) => {
            const response = responses[guest.id];

            return (
              <fieldset
                key={guest.id}
                disabled={isSubmitting}
                className="border-t border-wedding-line/35 pt-6"
              >
                <legend className="pr-4 font-wedding-display text-2xl text-wedding-sage-deep">
                  {guest.fullName}
                </legend>
                <p className="mt-1 font-sans text-[0.56rem] uppercase tracking-[0.16em] text-wedding-sage">
                  {guest.guestType}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="cursor-pointer border border-wedding-line/65 p-4 text-center font-wedding-body text-sm text-wedding-ink/70 transition-colors has-[:checked]:border-wedding-sage-deep has-[:checked]:bg-wedding-mist has-[:checked]:text-wedding-sage-deep">
                    <input
                      required
                      type="radio"
                      name={`attendance-${guest.id}`}
                      value="attending"
                      checked={response?.status === "attending"}
                      onChange={() =>
                        updateAttendance(guest.id, "attending")
                      }
                      className="sr-only"
                    />
                    Joyfully Attending
                  </label>
                  <label className="cursor-pointer border border-wedding-line/65 p-4 text-center font-wedding-body text-sm text-wedding-ink/70 transition-colors has-[:checked]:border-wedding-sage-deep has-[:checked]:bg-wedding-mist has-[:checked]:text-wedding-sage-deep">
                    <input
                      required
                      type="radio"
                      name={`attendance-${guest.id}`}
                      value="declined"
                      checked={response?.status === "declined"}
                      onChange={() =>
                        updateAttendance(guest.id, "declined")
                      }
                      className="sr-only"
                    />
                    Regretfully Unable
                  </label>
                </div>

                {response?.status === "attending" ? (
                  <label className={`${fieldLabelClass} mt-4`}>
                    Dietary restrictions
                    <input
                      value={response.dietaryRestrictions}
                      onChange={(changeEvent) =>
                        updateDietaryRestrictions(
                          guest.id,
                          changeEvent.target.value,
                        )
                      }
                      type="text"
                      maxLength={500}
                      placeholder="Optional"
                      className={lineInputClass}
                    />
                  </label>
                ) : null}
              </fieldset>
            );
          })}
        </div>

        <div className="grid gap-7 border-t border-wedding-line/35 pt-7 sm:grid-cols-2">
          <label className={fieldLabelClass}>
            Contact
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              autoComplete="tel"
              minLength={6}
              maxLength={40}
              disabled={isSubmitting}
              placeholder="+63 900 000 0000"
              className={lineInputClass}
            />
          </label>

          <label className={fieldLabelClass}>
            Email
            <input
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="email"
              maxLength={254}
              disabled={isSubmitting}
              placeholder="you@example.com"
              className={lineInputClass}
            />
          </label>
        </div>

        {!allAnswered ? (
          <p className="font-wedding-body text-sm text-amber-700">
            Please select your attendance response.
          </p>
        ) : null}

        {exceedsMaximum ? (
          <p className="font-wedding-body text-sm text-red-700">
            This invitation allows a maximum of {party.maxAttendees}{" "}
            attendees.
          </p>
        ) : null}

        {submissionError ? (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 font-wedding-body text-sm leading-6 text-red-700"
          >
            {submissionError}
          </div>
        ) : null}

        <button
          disabled={isSubmitting || !allAnswered || exceedsMaximum}
          type="submit"
          className={primaryButtonClass}
        >
          {isSubmitting ? "Saving your reply" : "Send my response"}
          {isSubmitting ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="mx-auto flex items-center gap-2 font-sans text-[0.58rem] uppercase tracking-[0.2em] text-wedding-sage transition-colors hover:text-wedding-sage-deep disabled:opacity-50"
        >
          <ArrowLeft className="size-3.5" />
          Back to name search
        </button>
      </form>
    </PaperPanel>
  );
}

export function NylgenRsvpFlow({
  eventSlug,
  confirmationMessage,
}: NylgenRsvpFlowProps) {
  const controller = useSmartRsvp(eventSlug, "name_search");

  return (
    <AnimatePresence mode="wait">
      {controller.stage === "initializing" ? (
        <motion.div
          key="initializing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingPanel
            errorMessage={controller.accessError}
            onRetry={controller.initializeNameSearch}
          />
        </motion.div>
      ) : null}

      {controller.stage === "search" && controller.event ? (
        <motion.div
          key="search"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <SearchPanel
            event={controller.event}
            fullName={controller.fullName}
            matches={controller.searchMatches}
            isSearching={controller.isSearching}
            loadingInvitationId={controller.loadingInvitationId}
            searchError={controller.searchError}
            partyError={controller.partyError}
            onNameChange={controller.updateFullName}
            onSearch={controller.searchGuest}
            onSelectMatch={controller.selectInvitation}
          />
        </motion.div>
      ) : null}

      {controller.stage === "party" &&
      controller.event &&
      controller.party &&
      controller.selectedMatch ? (
        <motion.div
          key={`party-${controller.selectedMatch.invitationId}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <PartyPanel
            event={controller.event}
            eventSlug={eventSlug}
            selectedMatch={controller.selectedMatch}
            party={controller.party}
            confirmationMessage={confirmationMessage}
            onBack={controller.returnToSearch}
            onReset={controller.reset}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
