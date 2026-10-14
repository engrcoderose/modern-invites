"use client";

import { useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { AccessStep } from "./AccessStep";
import { InitializationStep } from "./InitializationStep";
import { OpenRsvpForm } from "./OpenRsvpForm";
import { PartyStep, type PartyDisplayOptions } from "./PartyStep";
import { SearchStep, type SearchHeaderOptions } from "./SearchStep";
import type { SmartRsvpTheme } from "./theme";
import { debutSmartRsvpTheme } from "./theme";
import type { RsvpAccessMode } from "./types";
import { useSmartRsvp } from "./useSmartRsvp";

interface SmartRsvpFlowProps {
  eventSlug: string;
  theme?: SmartRsvpTheme;
  className?: string;
  accessMode?: RsvpAccessMode;
  allowUnlistedReplies?: boolean;
  searchHeader?: SearchHeaderOptions;
  searchAppearance?: "card" | "minimal";
  partyDisplay?: PartyDisplayOptions;
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
  allowUnlistedReplies = true,
  searchHeader,
  searchAppearance,
  partyDisplay,
}: SmartRsvpFlowProps) {
  const [openPath, setOpenPath] = useState<"new" | "search">("search");
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

      {allowUnlistedReplies && event?.accessMode === "open" && (stage === "open" || stage === "search") && (
        <div className="mb-5 flex flex-wrap gap-3" aria-label="Choose how to RSVP">
          <button type="button" aria-pressed={openPath === "search"} onClick={() => setOpenPath("search")} className="min-h-11 rounded-md border border-[var(--smart-rsvp-border)] px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2">Find my household</button>
          <button type="button" aria-pressed={openPath === "new"} onClick={() => setOpenPath("new")} className="min-h-11 rounded-md border border-[var(--smart-rsvp-border)] px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2">RSVP without a guest-list entry</button>
        </div>
      )}

      {(stage === "search" || stage === "open") && event && (!allowUnlistedReplies || event.accessMode !== "open" || openPath === "search") && (
        <SearchStep
          appearance={searchAppearance}
          header={searchHeader}
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

      {allowUnlistedReplies && (stage === "open" || stage === "search") && event?.accessMode === "open" && openPath === "new" && <OpenRsvpForm event={event} />}

      {stage === "party" && event && party && selectedMatch && (
        <PartyStep
          display={partyDisplay}
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
