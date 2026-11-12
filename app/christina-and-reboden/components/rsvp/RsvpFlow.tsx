"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useSmartRsvp } from "../../../../components/smart-rsvp/useSmartRsvp";
import { RsvpClosedNotice, coupleRsvpClosedMessage } from "../../../../components/smart-rsvp/RsvpClosedNotice";
import { wedding } from "../../data/wedding";
import HouseholdReply from "./HouseholdReply";
import HouseholdSearch from "./HouseholdSearch";
import styles from "../../styles/invitation.module.css";

export default function RsvpFlow() {
  const controller = useSmartRsvp(wedding.rsvp.eventSlug, "name_search");
  const [nameError, setNameError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const results = useRef<HTMLHeadingElement>(null);
  const busy = controller.isCheckingCode || controller.isSearching || controller.loadingInvitationId !== null;

  useEffect(() => {
    if (controller.stage === "search" && controller.searchMatches.length > 0) results.current?.focus();
  }, [controller.stage, controller.searchMatches]);

  if (controller.rsvpClosed) return <RsvpClosedNotice appearance="minimal" titleClassName={styles.smallScript} message={coupleRsvpClosedMessage} />;

  if (controller.stage === "initializing") return <div className="mt-5 space-y-4">
    {controller.accessError ? <>
      <p role="alert" className="text-xs leading-6">{controller.accessError}</p>
      <button type="button" disabled={busy} onClick={() => void controller.initializeNameSearch()} className="min-h-11 px-3 text-xs underline underline-offset-4">Try again</button>
    </> : <p role="status" className="flex items-center justify-center gap-2 text-xs leading-6"><LoaderCircle size={15} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />Opening RSVP…</p>}
  </div>;

  // Household lookup is required by this invitation's guest experience.
  if (controller.stage === "open") return <p role="status" className="mt-5 text-xs leading-6">Guest-list RSVP is unavailable right now. Please contact the couple for help with your invitation.</p>;

  if (controller.stage === "party" && controller.party && controller.selectedMatch) return <HouseholdReply
    key={`${controller.selectedMatch.invitationId}-${controller.selectedMatch.matchedGuestName}`}
    eventSlug={wedding.rsvp.eventSlug} rsvpCode={controller.rsvpCode} party={controller.party} match={controller.selectedMatch}
    onBack={() => { controller.returnToSearch(); requestAnimationFrame(() => input.current?.focus()); }} />;

  function search() {
    if (busy) return;
    if (controller.fullName.trim().split(/\s+/).length < 2) { setNameError("Please enter your first and last name."); return; }
    setNameError("");
    void controller.searchGuest();
  }

  return <HouseholdSearch fullName={controller.fullName} matches={controller.searchMatches}
    error={nameError || controller.searchError} partyError={controller.partyError} busy={busy}
    loadingInvitationId={controller.loadingInvitationId} inputRef={input} headingRef={results}
    onNameChange={name => { setNameError(""); controller.updateFullName(name); }} onSearch={search}
    onSelect={match => { if (!busy) void controller.selectInvitation(match); }} />;
}
