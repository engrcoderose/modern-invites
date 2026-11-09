import type { RefObject } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { PreviewMatch } from "../../data/rsvp-preview";
import styles from "../../styles/invitation.module.css";

export default function HouseholdSearch({ fullName, matches, error, inputRef, headingRef, onNameChange, onSearch, onSelect }: {
  fullName: string; matches: PreviewMatch[] | null; error: string;
  inputRef: RefObject<HTMLInputElement | null>; headingRef: RefObject<HTMLHeadingElement | null>;
  onNameChange: (name: string) => void; onSearch: () => void; onSelect: (match: PreviewMatch) => void;
}) {
  return <div className="mt-5 space-y-5">
    <p data-cr-reveal className="text-[13px] leading-6">Find your household to let us know who can join us.</p>
    <form data-cr-reveal className="space-y-5" onSubmit={event => { event.preventDefault(); onSearch(); }}>
      <label htmlFor="cr-rsvp-search" className="block text-[10px] uppercase tracking-[.16em]">Full name</label>
      <input ref={inputRef} id="cr-rsvp-search" autoComplete="name" required minLength={3} maxLength={150}
        aria-describedby="cr-rsvp-search-hint" value={fullName} onChange={event => onNameChange(event.target.value)}
        className="w-full border-0 border-b border-[var(--cr-line)] bg-transparent px-2 py-3 text-center text-base" />
      <p id="cr-rsvp-search-hint" className="text-xs leading-5">Enter your first and last name.<br />Preview example: Alex Rivera</p>
      {error && <p role="alert" className="text-xs leading-5">{error}</p>}
      <button type="submit" disabled={fullName.trim().length < 3}
        className={`${styles.primary} flex min-h-12 w-full items-center justify-center gap-3 px-4 py-3 font-sans text-[10px] uppercase tracking-[.1em]`}>
        Find my invitation<Search size={15} aria-hidden="true" />
      </button>
    </form>
    {matches && <div className="space-y-3 border-t border-[var(--cr-line)] pt-5">
      <h3 ref={headingRef} tabIndex={-1} className="text-sm font-medium outline-none">{matches.length ? "Select your household" : "No sample household found"}</h3>
      <p role="status" className="text-xs leading-5">{matches.length
        ? `${matches.length} sample ${matches.length === 1 ? "household matches" : "households match"} your search.`
        : "Try the sample guest Alex Rivera. Real guest lookup will be connected after setup."}</p>
      {matches.map(match => <button key={match.household.key} type="button" onClick={() => onSelect(match)}
        className="flex min-h-14 w-full items-center justify-between gap-3 border border-[var(--cr-line)] px-4 py-3 text-left hover:bg-[#f5e9d8]">
        <span><span className="block text-sm font-semibold">{match.household.householdName}</span>
          <span className="mt-1 block text-xs leading-5">Matched: {match.matchedGuestName}<br />{match.household.guests.length} invited guests · Sample household</span></span>
        <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
      </button>)}
    </div>}
  </div>;
}
