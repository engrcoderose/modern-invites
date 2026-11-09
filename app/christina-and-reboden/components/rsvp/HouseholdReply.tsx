import type { FormEvent, RefObject } from "react";
import { ArrowRight } from "lucide-react";
import type { AttendanceChoice } from "../../../../components/smart-rsvp/types";
import type { PreviewMatch, PreviewResponses } from "../../data/rsvp-preview";
import { getPreviewSummary } from "../../utilities/rsvpPreview";
import styles from "../../styles/invitation.module.css";

export default function HouseholdReply({ match, responses, message, error, headingRef, onAttendance, onDietary, onMessage, onSubmit, onBack }: {
  match: PreviewMatch; responses: PreviewResponses; message: string; error: string;
  headingRef: RefObject<HTMLHeadingElement | null>; onAttendance: (key: string, status: AttendanceChoice) => void;
  onDietary: (key: string, value: string) => void; onMessage: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void; onBack: () => void;
}) {
  const { attendingCount, declinedCount } = getPreviewSummary(match.household, responses);
  return <div className="mt-5">
    <h3 ref={headingRef} tabIndex={-1} className="text-base font-semibold outline-none">{match.household.householdName}</h3>
    <p className="mt-2 text-xs leading-5">Please respond for each invited guest.</p>
    <p className="mt-2 text-[11px] leading-5" aria-live="polite">{attendingCount + declinedCount} of {match.household.guests.length} answered · Up to {match.household.maxAttendees} attending</p>
    <form onSubmit={onSubmit} className="mt-5 space-y-5 text-left">
      {match.household.guests.map(guest => <fieldset key={guest.key} className="border-t border-[var(--cr-line)] pt-3">
        <legend className="pr-3 text-sm font-medium">{guest.fullName}</legend>
        <div className="grid grid-cols-2 gap-2">
          {([ ["attending", "Attending"], ["declined", "Unable to attend"] ] as const).map(([status, label]) => <label key={status}
            className="flex min-h-11 cursor-pointer items-center gap-2 border border-[var(--cr-line)] px-3 py-2 text-xs leading-5 has-[:checked]:border-[#9b5d68] has-[:checked]:bg-[#f4e1df]">
            <input type="radio" name={`cr-attendance-${guest.key}`} required value={status}
              checked={responses[guest.key]?.status === status} onChange={() => onAttendance(guest.key, status)}
              className="size-4 shrink-0 accent-[#9b5d68]" />{label}
          </label>)}
        </div>
        {responses[guest.key]?.status === "attending" && <label className="mt-3 block text-xs leading-5">
          Dietary restrictions for {guest.fullName} (optional)
          <input maxLength={500} value={responses[guest.key].dietaryRestrictions} onChange={event => onDietary(guest.key, event.target.value)}
            className={`${styles.field} mt-2 w-full px-3 py-2.5 text-base`} />
        </label>}
      </fieldset>)}
      <label className="block text-xs leading-5">A message for the couple (optional)
        <textarea rows={2} maxLength={1000} value={message} onChange={event => onMessage(event.target.value)}
          className={`${styles.field} mt-2 w-full resize-none px-3 py-2.5 text-base`} />
      </label>
      {error && <p role="alert" className="text-xs leading-5">{error}</p>}
      <button type="submit" className={`${styles.primary} flex min-h-11 w-full items-center justify-center gap-3 px-4 py-3 font-sans text-[10px] uppercase tracking-[.1em]`}>
        Complete preview reply<ArrowRight size={15} aria-hidden="true" />
      </button>
      <button type="button" onClick={onBack} className="block min-h-11 w-full text-center text-xs underline underline-offset-4">Search another name</button>
    </form>
  </div>;
}
