"use client";

import { RSVPInfo } from "../types";
import { AccessStep } from "./smart-rsvp/AccessStep";
import { SearchStep } from "./smart-rsvp/SearchStep";
import { useSmartRsvp } from "./smart-rsvp/useSmartRsvp";
import { PartyStep } from "./smart-rsvp/PartyStep";

interface SmartRSVPSectionProps {
  rsvp: RSVPInfo;
  eventSlug: string;
}

export default function SmartRSVPSection({
  rsvp,
  eventSlug,
}: SmartRSVPSectionProps) {
  const {
    stage,
    event,

    rsvpCode,
    fullName,
    searchMatches,

    isCheckingCode,
    isSearching,

    accessError,
    searchError,

    updateRsvpCode,
    updateFullName,

    verifyAccess,
    searchGuest,
    reset,

    party,
    selectedMatch,
    loadingInvitationId,
    partyError,
    selectInvitation,
    returnToSearch,
  } = useSmartRsvp(eventSlug);

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 px-4 py-20"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-12 text-center">
          <p className="mb-5 font-libreBaskerville text-base uppercase text-[#ac243d] md:text-xl">
            {rsvp.subtitle}
          </p>

          <div className="mx-auto mb-4 h-1 w-16 bg-yellow-400" />

          <h2 className="font-meaCulpa text-5xl text-[#ac243d] md:text-8xl">
            RSVP
          </h2>
        </div>

        <div className="mx-auto max-w-xl">
          {stage === "access" && (
            <AccessStep
              rsvpCode={rsvpCode}
              isCheckingCode={isCheckingCode}
              errorMessage={accessError}
              onCodeChange={updateRsvpCode}
              onSubmit={verifyAccess}
            />
          )}

          {stage === "search" && event && (
            <SearchStep
              event={event}
              fullName={fullName}
              matches={searchMatches}
              isSearching={isSearching}
              loadingInvitationId={loadingInvitationId}
              errorMessage={searchError}
              partyError={partyError}
              onNameChange={updateFullName}
              onSearch={searchGuest}
              onSelectMatch={selectInvitation}
              onReset={reset}
            />
          )}
          {stage === "party" && event && party && selectedMatch && (
            <PartyStep
              event={event}
              eventSlug={eventSlug}
              rsvpCode={rsvpCode}
              selectedMatch={selectedMatch}
              party={party}
              onBack={returnToSearch}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </section>
  );
}
