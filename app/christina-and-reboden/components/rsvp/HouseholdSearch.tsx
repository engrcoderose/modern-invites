import type { RefObject } from "react";
import { ArrowRight, LoaderCircle, Search } from "lucide-react";
import type { SearchMatch } from "../../../../components/smart-rsvp/types";
import styles from "../../styles/invitation.module.css";

export default function HouseholdSearch({ fullName, matches, error, partyError, busy, loadingInvitationId, inputRef, headingRef, onNameChange, onSearch, onSelect }: {
  fullName: string; matches: SearchMatch[]; error: string; partyError: string; busy: boolean; loadingInvitationId: number | null;
  inputRef: RefObject<HTMLInputElement | null>; headingRef: RefObject<HTMLHeadingElement | null>;
  onNameChange: (name: string) => void; onSearch: () => void; onSelect: (match: SearchMatch) => void;
}) {
  return <div className="mt-5 space-y-5">
    <p data-cr-reveal className="text-[13px] leading-6">Find your household to let us know who can join us.</p>
    <form data-cr-reveal className="space-y-5" aria-busy={busy} onSubmit={event => { event.preventDefault(); onSearch(); }}>
      <label htmlFor="cr-rsvp-search" className="block text-[10px] uppercase tracking-[.16em]">Full name</label>
      <input ref={inputRef} id="cr-rsvp-search" autoComplete="name" required minLength={3} maxLength={150} disabled={busy}
        aria-describedby="cr-rsvp-search-hint" value={fullName} onChange={event => onNameChange(event.target.value)}
        className="w-full border-0 border-b border-[var(--cr-line)] bg-transparent px-2 py-3 text-center text-base disabled:opacity-60" />
      <p id="cr-rsvp-search-hint" className="text-xs leading-5">Enter your first and last name.</p>
      {error && <p role="alert" className="text-xs leading-5">{error}</p>}
      <button type="submit" disabled={busy || fullName.trim().length < 3}
        className={`${styles.primary} flex min-h-12 w-full items-center justify-center gap-3 px-4 py-3 font-sans text-[10px] uppercase tracking-[.1em]`}>
        {busy ? <>Finding your invitation…<LoaderCircle size={15} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /></> : <>Find my invitation<Search size={15} aria-hidden="true" /></>}
      </button>
    </form>
    {matches.length > 0 && <div className="space-y-3 border-t border-[var(--cr-line)] pt-5">
      <h3 ref={headingRef} tabIndex={-1} className="text-sm font-medium outline-none">Select your household</h3>
      <p role="status" className="text-xs leading-5">Please select the invitation that belongs to you.</p>
      {matches.map(match => <button key={`${match.invitationId}-${match.matchedGuestName}`} type="button" disabled={busy} onClick={() => onSelect(match)}
        className="flex min-h-14 w-full items-center justify-between gap-3 border border-[var(--cr-line)] px-4 py-3 text-left hover:bg-[#f5e9d8] disabled:opacity-60">
        <span><span className="block text-sm font-semibold">{match.householdName}</span>
          <span className="mt-1 block text-xs leading-5">Matched: {match.matchedGuestName}</span></span>
        {loadingInvitationId === match.invitationId ? <LoaderCircle size={15} className="shrink-0 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowRight size={15} className="shrink-0" aria-hidden="true" />}
      </button>)}
    </div>}
    {partyError && <p role="alert" className="text-xs leading-5">{partyError}</p>}
  </div>;
}
