"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { AccessStep } from "./AccessStep";
import { InitializationStep } from "./InitializationStep";
import { PartyStep } from "./PartyStep";
import { SearchStep } from "./SearchStep";
import type { SmartRsvpTheme } from "./theme";
import { debutSmartRsvpTheme } from "./theme";
import type { RsvpAccessMode } from "./types";
import { useSmartRsvp } from "./useSmartRsvp";

interface SmartRsvpFlowProps {
  eventSlug: string;
  theme?: SmartRsvpTheme;
  className?: string;
  accessMode?: RsvpAccessMode;
}

type SmartRsvpThemeProperties = CSSProperties & {
  "--smart-rsvp-accent": string;
  "--smart-rsvp-accent-hover": string;
  "--smart-rsvp-heading": string;
  "--smart-rsvp-border": string;
  "--smart-rsvp-border-soft": string;
  "--smart-rsvp-soft": string;
  "--smart-rsvp-soft-strong": string;
};

function createThemeProperties(theme: SmartRsvpTheme): SmartRsvpThemeProperties {
  return {
    "--smart-rsvp-accent": theme.accent,
    "--smart-rsvp-accent-hover": theme.accentHover,
    "--smart-rsvp-heading": theme.heading,
    "--smart-rsvp-border": theme.border,
    "--smart-rsvp-border-soft": theme.borderSoft,
    "--smart-rsvp-soft": theme.soft,
    "--smart-rsvp-soft-strong": theme.softStrong,
  };
}

export function SmartRsvpFlow({
  eventSlug,
  theme = debutSmartRsvpTheme,
  className,
  accessMode = "shared_code",
}: SmartRsvpFlowProps) {
  const {
    stage,
    event,
    party,
    selectedMatch,
    rsvpCode,
    fullName,
    searchMatches,
    isCheckingCode,
    isSearching,
    loadingInvitationId,
    accessError,
    searchError,
    partyError,
    updateRsvpCode,
    updateFullName,
    verifyAccess,
    initializeNameSearch,
    searchGuest,
    selectInvitation,
    returnToSearch,
    reset,
  } = useSmartRsvp(eventSlug, accessMode);

  return (
    <div
      className={cn("w-full", className)}
      style={createThemeProperties(theme)}
    >
      {stage === "initializing" && (
        <InitializationStep
          errorMessage={accessError}
          onRetry={initializeNameSearch}
        />
      )}

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
  );
}
