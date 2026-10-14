import { Search } from "lucide-react";
import styles from "../styles/invitation.module.css";

// Frontend draft follows the reference's unconfigured RSVP state.
// Enable lookup through the shared smart-RSVP flow once this client is connected.
export default function RsvpSearch() {
  return (
    <div className="mt-[34px] space-y-[30px]" aria-describedby="dr-rsvp-availability">
      <label className="block text-center text-xs uppercase leading-relaxed tracking-[0.16em]">
        Full Name
        <span id="dr-rsvp-name-hint" className="mt-1 block text-sm normal-case tracking-normal">Enter your first and last name</span>
        <input disabled autoComplete="name" type="text" aria-describedby="dr-rsvp-name-hint dr-rsvp-availability" className={`${styles.rsvpSearchInput} mt-3 h-[72px] w-full bg-transparent px-0 py-3 text-center text-base normal-case tracking-normal disabled:opacity-60`} />
      </label>
      <button type="button" disabled className={`${styles.button} ${styles.rsvpSearchButton} relative flex min-h-[70px] w-full items-center justify-center px-10 py-4 text-center disabled:cursor-not-allowed disabled:opacity-50`}>
        Find my invitation
        <Search className="absolute right-4" size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
