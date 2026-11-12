import { useEffect, useRef, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import type { PartyInformation, SearchMatch } from "../../../../components/smart-rsvp/types";
import { usePartyResponse } from "../../../../components/smart-rsvp/usePartyResponse";
import { RsvpClosedNotice, coupleRsvpClosedMessage } from "../../../../components/smart-rsvp/RsvpClosedNotice";
import styles from "../../styles/invitation.module.css";

export default function HouseholdReply({ eventSlug, rsvpCode, match, party, onBack }: {
  eventSlug: string; rsvpCode: string; match: SearchMatch; party: PartyInformation; onBack: () => void;
}) {
  const response = usePartyResponse({ eventSlug, rsvpCode, selectedMatch: match, party });
  const heading = useRef<HTMLHeadingElement>(null);
  const inFlight = useRef(false);
  const household = party.responseMode === "household";
  useEffect(() => { heading.current?.focus(); }, [response.summary]);

  const back = <button type="button" disabled={response.isSubmitting} onClick={onBack} className="block min-h-11 w-full text-center text-xs underline underline-offset-4 disabled:opacity-60">Back to name search</button>;

  if (response.rsvpClosed) return <RsvpClosedNotice appearance="minimal" titleClassName={styles.smallScript} message={coupleRsvpClosedMessage} />;

  if (response.summary) return <div role="status" className="mt-5 flex flex-col items-center gap-4 text-center">
    <Check size={28} strokeWidth={1.3} aria-hidden="true" />
    <h3 ref={heading} tabIndex={-1} className="text-base font-semibold outline-none">We received your reply.</h3>
    <p className="text-sm">Thank you, {match.matchedGuestName}. Your response has been saved.</p>
    <p className="text-xs">{response.summary.attendingCount} attending · {response.summary.declinedCount} unable to attend</p>
    {back}
  </div>;

  if (party.responseLocked) return <div className="mt-5 space-y-4">
    <h3 ref={heading} tabIndex={-1} className="text-base font-semibold outline-none">Your reply has already been received.</h3>
    <ul className="space-y-3 border-y border-[var(--cr-line)] py-4 text-left text-sm">
      {party.guests.map(guest => <li key={guest.id}><span className="block font-medium">{guest.fullName}</span><span className="text-xs">{guest.attendanceStatus === "attending" ? "Attending" : guest.attendanceStatus === "declined" ? "Unable to attend" : "Awaiting reply"}</span></li>)}
    </ul>
    <p className="text-xs leading-6">Please contact the couple directly if you need to make changes.</p>
    {back}
  </div>;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || response.isSubmitting || party.responseLocked) return;
    inFlight.current = true;
    try { await response.submitResponse(); } finally { inFlight.current = false; }
  }

  return <div className="mt-5">
    <h3 ref={heading} tabIndex={-1} className="text-base font-semibold outline-none">{household ? party.householdName : match.matchedGuestName}</h3>
    <p className="mt-2 text-xs leading-5">{household ? "Please respond for each invited guest." : "Please submit your own reply. Other invited guests can search their names separately."}</p>
    <p className="mt-2 text-[11px] leading-5" aria-live="polite">{response.answeredCount} of {party.guests.length} answered · Up to {party.maxAttendees} attending</p>
    <form onSubmit={event => void submit(event)} aria-busy={response.isSubmitting} className="mt-5 space-y-5 text-left">
      {party.guests.map(guest => <fieldset key={guest.id} disabled={response.isSubmitting} className="border-t border-[var(--cr-line)] pt-3">
        <legend className="pr-3 text-sm font-medium">{guest.fullName}</legend>
        <div className="grid grid-cols-2 gap-2">
          {([["attending", "Attending"], ["declined", "Unable to attend"]] as const).map(([status, label]) => <label key={status}
            className="flex min-h-11 cursor-pointer items-center gap-2 border border-[var(--cr-line)] px-3 py-2 text-xs leading-5 has-[:checked]:border-[var(--cr-ink)] has-[:checked]:bg-[#f4e1df]">
            <input type="radio" name={`cr-attendance-${guest.id}`} required value={status}
              checked={response.responses[guest.id]?.status === status} onChange={() => response.updateAttendance(guest.id, status)}
              className="size-4 shrink-0 accent-[var(--cr-ink)]" />{label}
          </label>)}
        </div>
        {response.responses[guest.id]?.status === "attending" && <label className="mt-3 block text-xs leading-5">
          Dietary restrictions for {guest.fullName} (optional)
          <input maxLength={500} value={response.responses[guest.id].dietaryRestrictions} onChange={event => response.updateDietaryRestrictions(guest.id, event.target.value)}
            className={`${styles.field} mt-2 w-full px-3 py-2.5 text-base`} />
        </label>}
      </fieldset>)}
      <label className="block text-xs leading-5">A message for the couple (optional)
        <textarea rows={2} maxLength={1000} disabled={response.isSubmitting} value={response.message} onChange={event => response.setMessage(event.target.value)}
          className={`${styles.field} mt-2 w-full resize-none px-3 py-2.5 text-base`} />
      </label>
      {response.exceedsMaximum && <p role="alert" className="text-xs leading-5">This invitation allows a maximum of {party.maxAttendees} attendees.</p>}
      {response.submissionError && <p role="alert" className="text-xs leading-5">{response.submissionError}</p>}
      <button type="submit" disabled={response.isSubmitting || !response.allAnswered || response.exceedsMaximum}
        className={`${styles.primary} flex min-h-11 w-full items-center justify-center gap-3 px-4 py-3 font-sans text-[10px] uppercase tracking-[.1em]`}>
        {response.isSubmitting ? <>Saving your reply…<LoaderCircle size={15} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /></> : <>{household ? "Send our responses" : "Send my response"}<ArrowRight size={15} aria-hidden="true" /></>}
      </button>
      {back}
    </form>
  </div>;
}
