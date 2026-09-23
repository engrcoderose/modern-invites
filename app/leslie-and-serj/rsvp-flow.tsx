"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  LoaderCircle,
  LockKeyhole,
  Search,
  X,
} from "lucide-react";
import {
  usePartyResponse,
  useSmartRsvp,
  type PartyInformation,
  type SearchMatch,
} from "@/components/smart-rsvp";
import { wedding } from "./data";
import { Ornament } from "./artwork";

const eventSlug = "leslie-and-serj";
const inputClass =
  "mt-2 w-full border border-[#bfb59a] bg-[#fffdf440] px-3 py-3 text-base text-[#414636] placeholder:text-[#646650] disabled:opacity-60";
const buttonClass =
  "lj-button lj-button-solid inline-flex min-h-11 w-full items-center justify-center gap-3 px-5 py-3 disabled:opacity-50";
const labelClass = "block text-left text-[11px] leading-relaxed tracking-wide";

function ErrorMessage({ message }: { message: string }) {
  return message ? (
    <p role="alert" className="my-4 text-sm leading-relaxed text-[#803c32]">
      {message}
    </p>
  ) : null;
}

function PartyReply({
  party,
  match,
  onBack,
}: {
  party: PartyInformation;
  match: SearchMatch;
  onBack: () => void;
}) {
  const response = usePartyResponse({
    eventSlug,
    rsvpCode: "",
    selectedMatch: match,
    party,
  });
  const household = party.responseMode === "household";
  const backButton = (
    <button
      type="button"
      onClick={onBack}
      disabled={response.isSubmitting}
      className="mt-5 min-h-11 text-[11px] underline underline-offset-4 disabled:opacity-50"
    >
      Back to name search
    </button>
  );

  if (response.summary) {
    return (
      <div role="status" className="py-4 text-center">
        <Check
          className="mx-auto mb-4 size-8 text-[#5a6946]"
          aria-hidden="true"
        />
        <h3 className="lj-heading !my-3 !text-[38px]">
          We received your reply.
        </h3>
        <p className="text-sm leading-relaxed">
          Thank you for letting us know, {match.matchedGuestName}.
        </p>
        <p className="mt-4 text-sm">
          {response.summary.attendingCount} attending ·{" "}
          {response.summary.declinedCount} unable to attend
        </p>
        {backButton}
      </div>
    );
  }

  if (party.responseLocked) {
    return (
      <div className="py-4 text-center">
        <LockKeyhole
          className="mx-auto mb-4 size-7 text-[#5a6946]"
          aria-hidden="true"
        />
        <h3 className="lj-heading !my-3 !text-[38px]">Already received</h3>
        <p className="text-sm leading-relaxed">
          Your {household ? "household’s " : ""}reply has already been
          confirmed.
        </p>
        <ul className="my-5 space-y-3 border-y border-[#bfb59a66] py-4 text-left text-sm">
          {party.guests.map((guest) => (
            <li key={guest.id}>
              <span className="block font-semibold">{guest.fullName}</span>
              <span>
                {guest.attendanceStatus === "attending"
                  ? "Joyfully attending"
                  : guest.attendanceStatus === "declined"
                    ? "Unable to attend"
                    : "Awaiting reply"}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed">
          Please contact the couple directly if you need to make changes.
        </p>
        {backButton}
      </div>
    );
  }

  return (
    <div>
      <h3 className="lj-rsvp-form-heading my-3">
        {household ? "Your household" : "Your invitation"}
      </h3>
      <p className="text-sm font-semibold">
        {household ? party.householdName : match.matchedGuestName}
      </p>
      <p className="mt-3 text-xs leading-relaxed">
        {household
          ? "Please respond for everyone listed below."
          : "Please submit your own reply. Other invited guests can search their names separately."}
      </p>
      {household && (
        <p className="mt-2 text-[10px] tracking-wide">
          {response.answeredCount} of {party.guests.length} answered · Maximum{" "}
          {party.maxAttendees} attending
        </p>
      )}
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (!response.isSubmitting) void response.submitResponse();
        }}
      >
        <div className="space-y-6">
          {party.guests.map((guest) => (
            <fieldset
              key={guest.id}
              disabled={response.isSubmitting}
              className="border-t border-[#bfb59a66] pt-3 text-left"
            >
              <legend className="pr-3 text-sm font-semibold">
                {guest.fullName}
              </legend>
              <div className="mt-2 grid gap-2">
                {(
                  [
                    ["attending", "Joyfully attending"],
                    ["declined", "Regretfully unable to attend"],
                  ] as const
                ).map(([status, label]) => (
                  <label
                    key={status}
                    className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#bfb59a80] px-3 py-3 text-xs has-[:checked]:border-[#5a6946] has-[:checked]:bg-[#5a694615]"
                  >
                    <input
                      type="radio"
                      required
                      name={`leslie-attendance-${guest.id}`}
                      value={status}
                      checked={response.responses[guest.id]?.status === status}
                      onChange={() =>
                        response.updateAttendance(guest.id, status)
                      }
                      className="size-4 accent-[#5a6946]"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {response.responses[guest.id]?.status === "attending" && (
                <label className={`${labelClass} mt-4`}>
                  Dietary restrictions or allergies (optional)
                  <input
                    type="text"
                    maxLength={500}
                    value={response.responses[guest.id].dietaryRestrictions}
                    onChange={(event) =>
                      response.updateDietaryRestrictions(
                        guest.id,
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </label>
              )}
            </fieldset>
          ))}
        </div>
        <fieldset
          disabled={response.isSubmitting}
          className="mt-6 space-y-4 border-t border-[#bfb59a66] pt-5"
        >
          <label className={labelClass}>
            Contact number
            <input
              required
              type="tel"
              autoComplete="tel"
              minLength={6}
              maxLength={40}
              value={response.phone}
              onChange={(event) => response.setPhone(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              maxLength={254}
              value={response.email}
              onChange={(event) => response.setEmail(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            {wedding.rsvpQuestions[0].question} (optional)
            <input
              type="text"
              maxLength={500}
              placeholder={wedding.rsvpQuestions[0].placeholder}
              value={response.message}
              onChange={(event) => response.setMessage(event.target.value)}
              className={inputClass}
            />
          </label>
        </fieldset>
        {response.exceedsMaximum && (
          <ErrorMessage
            message={`This invitation allows a maximum of ${party.maxAttendees} attendees.`}
          />
        )}
        <ErrorMessage message={response.submissionError} />
        <button
          type="submit"
          disabled={
            response.isSubmitting ||
            !response.allAnswered ||
            response.exceedsMaximum
          }
          className={`${buttonClass} mt-6`}
        >
          {response.isSubmitting
            ? "Saving your reply…"
            : household
              ? "Send our responses"
              : "Send my response"}
          {response.isSubmitting ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight size={15} aria-hidden="true" />
          )}
        </button>
        {backButton}
      </form>
    </div>
  );
}

export default function RsvpFlow() {
  const controller = useSmartRsvp(eventSlug, "name_search");
  const dialog = useRef<HTMLDialogElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const hasParty =
    controller.stage === "party" &&
    !!controller.party &&
    !!controller.selectedMatch;
  const busy =
    controller.isSearching || controller.loadingInvitationId !== null;

  useEffect(() => {
    const responseDialog = dialog.current;
    if (!hasParty || !responseDialog) return;
    if (!responseDialog.open) responseDialog.showModal();
    const entrance = animate(responseDialog, {
      opacity: reducedMotion ? 1 : [0, 1],
      y: reducedMotion ? 0 : [10, 0],
    }, {
      duration: reducedMotion ? 0 : 0.85,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => entrance.stop();
  }, [hasParty, reducedMotion]);

  async function findInvitation() {
    if (busy) return;
    // A unique match goes straight to the verified response form.
    // Duplicate names must choose the correct invitation first.
    await controller.searchGuest(async (matches) => {
      if (matches.length === 1) await controller.selectInvitation(matches[0]);
    });
  }

  return (
    <div className="mt-7">
      <form
        data-lj-reveal
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          void findInvitation();
        }}
      >
        <label className="block text-center text-[10px] uppercase leading-relaxed tracking-[0.16em]">
          Full Name
          <span className="mt-1 block text-[11px] normal-case tracking-normal">
            (First name, Last name)
          </span>
          <input
            required
            autoComplete="name"
            type="text"
            minLength={3}
            maxLength={150}
            value={controller.fullName}
            onChange={(event) => controller.updateFullName(event.target.value)}
            disabled={busy}
            className="mt-3 w-full border-0 border-b border-[#8c997f] bg-transparent px-0 py-3 text-center text-base normal-case tracking-normal text-[#414636] focus:outline-none focus:ring-1 focus:ring-[#5a6946] disabled:opacity-60"
          />
        </label>
        <ErrorMessage message={controller.searchError} />
        <button
          ref={searchButton}
          type="submit"
          disabled={busy || controller.fullName.trim().length < 3}
          className="lj-button lj-button-solid relative flex min-h-14 w-full items-center justify-center px-10 py-4 text-center disabled:opacity-50"
        >
          {busy ? "Finding your invitation…" : "Find my invitation"}
          {busy ? (
            <LoaderCircle className="absolute right-4 size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="absolute right-4" size={16} aria-hidden="true" />
          )}
        </button>
      </form>
      {controller.searchMatches.length > 0 && !hasParty && !busy && (
        <div className="mt-6 space-y-3 border-t border-[#bfb59a66] pt-4">
          <p className="text-xs">Select your invitation</p>
          {controller.searchMatches.map((match) => (
            <button
              key={`${match.invitationId}-${match.matchedGuestName}`}
              type="button"
              disabled={controller.loadingInvitationId !== null}
              onClick={() => void controller.selectInvitation(match)}
              className="w-full border border-[#bfb59a] p-4 text-left transition-colors hover:bg-[#5a694615] disabled:opacity-60"
            >
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                {match.householdName}
                {controller.loadingInvitationId === match.invitationId ? (
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowRight size={15} aria-hidden="true" />
                )}
              </span>
              <span className="mt-2 block text-xs">
                Matched: {match.matchedGuestName}
              </span>
              <span className="mt-3 block text-[10px] leading-relaxed">
                Maximum {match.householdSummary.maximumGuests} guests ·{" "}
                {match.householdSummary.attendingGuests} attending ·{" "}
                {match.householdSummary.declinedGuests} unable ·{" "}
                {match.householdSummary.pendingGuests} awaiting reply
              </span>
            </button>
          ))}
        </div>
      )}
      <ErrorMessage message={controller.partyError} />
      <dialog
        ref={dialog}
        className="lj-dialog"
        aria-labelledby="lj-rsvp-dialog-title"
        onKeyDown={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onClose={() => {
          controller.returnToSearch();
          searchButton.current?.focus({ preventScroll: true });
        }}
      >
        <button
          type="button"
          className="absolute right-3 top-3 p-2"
          aria-label="Close RSVP"
          onClick={() => dialog.current?.close()}
        >
          <X size={21} />
        </button>
        <Ornament className="lj-ornament" />
        <p className="lj-label">{wedding.title}</p>
        <h2 id="lj-rsvp-dialog-title" className="lj-heading">
          Kindly respond
        </h2>
        {hasParty && controller.party && controller.selectedMatch && (
          <PartyReply
            key={`${controller.selectedMatch.invitationId}-${controller.selectedMatch.matchedGuestName}`}
            party={controller.party}
            match={controller.selectedMatch}
            onBack={() => dialog.current?.close()}
          />
        )}
      </dialog>
    </div>
  );
}
