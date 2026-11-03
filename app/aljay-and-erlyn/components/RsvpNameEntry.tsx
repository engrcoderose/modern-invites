"use client";

import { useEffect, useRef, type CSSProperties, type FormEvent } from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import { coupleRsvpClosedMessage, RsvpClosedNotice, useSmartRsvp } from "@/components/smart-rsvp";
import { PartyStep } from "@/components/smart-rsvp/PartyStep";
import styles from "../styles/wedding.module.css";

const replyTheme = {
  "--smart-rsvp-accent": "#5a6946",
  "--smart-rsvp-accent-hover": "#4b502a",
  "--smart-rsvp-heading": "#414636",
  "--smart-rsvp-border": "#bfb59a",
  "--smart-rsvp-border-soft": "#d8d8c6",
  "--smart-rsvp-soft": "#f2ede0",
  "--smart-rsvp-soft-strong": "#e8e9da",
} as CSSProperties;

export default function RsvpNameEntry({ eventSlug }: { eventSlug: string }) {
  const controller = useSmartRsvp(eventSlug, "name_search");
  const dialog = useRef<HTMLDialogElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const hasParty = controller.stage === "party" && !!controller.party && !!controller.selectedMatch;
  const busy = controller.isCheckingCode || controller.isSearching || controller.loadingInvitationId !== null;

  useEffect(() => {
    if (hasParty && !dialog.current?.open) dialog.current?.showModal();
  }, [hasParty]);

  function findInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!busy && !controller.accessError) void controller.searchGuest();
  }

  if (controller.rsvpClosed) return <RsvpClosedNotice appearance="minimal" titleClassName={styles.rsvpHeading} message={coupleRsvpClosedMessage} />;

  return <div style={replyTheme}>
    <form className="mt-7 space-y-6" onSubmit={findInvitation} aria-busy={busy}>
      <label className={`${styles.rsvpNameLabel} block text-center`}>
        Full Name
        <span className="mt-1 block text-[11px] normal-case tracking-normal">Enter your first and last name</span>
        <input required autoComplete="name" type="text" minLength={3} maxLength={150}
          value={controller.fullName} onChange={(event) => controller.updateFullName(event.target.value)} disabled={busy}
          className={`${styles.rsvpNameInput} mt-3 w-full px-0 py-3 text-center text-base normal-case tracking-normal`} />
      </label>
      {controller.searchError && <p role="alert" className="text-center text-sm text-[#803c32]">{controller.searchError}</p>}
      {controller.accessError && <div className="text-center">
        <p role="alert" className="text-sm text-[#803c32]">{controller.accessError}</p>
        <button type="button" className={`${styles.textLink} mt-3 min-h-11 px-3 py-2`} disabled={busy} onClick={() => void controller.initializeNameSearch()}>Try again</button>
      </div>}
      <button ref={searchButton} type="submit" disabled={busy || !!controller.accessError || controller.fullName.trim().length < 3}
        className={`${styles.button} relative flex min-h-14 w-full items-center justify-center px-10 py-4 text-center`}>
        {controller.isSearching ? "Finding your invitation…" : "Find my invitation"}
        {busy ? <LoaderCircle className="absolute right-4 animate-spin" size={16} aria-hidden="true" /> : <Search className="absolute right-4" size={16} aria-hidden="true" />}
      </button>
    </form>
    {controller.searchMatches.length > 0 && !hasParty && <div className="mt-6 space-y-3 border-t border-[#bfb59a66] pt-4">
      <p className={`${styles.small} text-center`}>Select your invitation</p>
      {controller.searchMatches.map((match) => <button key={`${match.invitationId}-${match.matchedGuestName}`} type="button" disabled={busy}
        className="flex min-h-14 w-full items-center justify-between gap-3 border border-[#bfb59a] px-4 py-3 text-left"
        onClick={() => void controller.selectInvitation(match)}>
        <span><span className={`${styles.rsvpGuestName} block`}>{match.householdName}</span><span className={styles.small}>{match.matchedGuestName}</span></span>
        {controller.loadingInvitationId === match.invitationId ? <LoaderCircle size={16} className="shrink-0 animate-spin" aria-hidden="true" /> : <span className={styles.small}>Select</span>}
      </button>)}
    </div>}
    {controller.partyError && <p role="alert" className="mt-4 text-center text-sm text-[#803c32]">{controller.partyError}</p>}
    <dialog ref={dialog} className={`${styles.rsvpDialog} fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_36px)] max-w-[490px] overflow-y-auto px-5 py-10 text-center sm:px-[30px]`}
      aria-labelledby="ae-rsvp-dialog-title" onKeyDown={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()}
      onClose={() => { controller.returnToSearch(); searchButton.current?.focus({ preventScroll: true }); }}>
      <button type="button" className="absolute right-2 top-2 flex size-11 items-center justify-center" aria-label="Close RSVP" onClick={() => dialog.current?.close()}><X size={21} aria-hidden="true" /></button>
      <h2 id="ae-rsvp-dialog-title" className={`${styles.rsvpHeading} mb-6`}>Kindly Reply</h2>
      {hasParty && controller.event && controller.party && controller.selectedMatch && (controller.party.responseLocked ? <div>
        <h3 className={`${styles.rsvpGuestName} mb-4`}>Your reply has already been received.</h3>
        <p className={styles.small}>Please contact the couple directly if you need to make changes.</p>
      </div> : <PartyStep
        key={`${controller.selectedMatch.invitationId}-${controller.selectedMatch.matchedGuestName}`}
        event={controller.event} eventSlug={eventSlug} rsvpCode={controller.rsvpCode}
        selectedMatch={controller.selectedMatch} party={controller.party}
        display={{ appearance: "minimal", householdNameClassName: styles.rsvpGuestName }}
        fields={{ email: true, dietaryRestrictions: true, message: true }}
        closedAppearance="minimal" closedTitleClassName={styles.rsvpHeading} closedMessage={coupleRsvpClosedMessage}
        onBack={() => dialog.current?.close()} onReset={() => dialog.current?.close()}
      />)}
    </dialog>
  </div>;
}
