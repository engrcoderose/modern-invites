import { useCallback, useEffect, useRef, useState } from "react";

import {
  requestGuestSearch,
  requestInvitationParty,
  requestRsvpAccess,
} from "./api";
import type {
  EventInformation,
  PartyInformation,
  RsvpAccessMode,
  RSVPStage,
  SearchMatch,
} from "./types";
import { normalizeGuestName, normalizeRsvpCode } from "./utils";

export function useSmartRsvp(
  eventSlug: string,
  initialAccessMode: RsvpAccessMode,
) {
  const [stage, setStage] = useState<RSVPStage>(
    initialAccessMode === "name_search" ? "initializing" : "access",
  );
  const initializedSlug = useRef<string | null>(null);

  const [rsvpCode, setRsvpCode] = useState("");
  const [fullName, setFullName] = useState("");

  const [event, setEvent] = useState<EventInformation | null>(null);

  const [searchMatches, setSearchMatches] = useState<SearchMatch[]>([]);

  const [selectedMatch, setSelectedMatch] = useState<SearchMatch | null>(null);

  const [party, setParty] = useState<PartyInformation | null>(null);

  const [isCheckingCode, setIsCheckingCode] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  const [loadingInvitationId, setLoadingInvitationId] = useState<number | null>(
    null,
  );

  const [accessError, setAccessError] = useState("");

  const [searchError, setSearchError] = useState("");

  const [partyError, setPartyError] = useState("");

  const initializeNameSearch = useCallback(async () => {
    setStage("initializing");
    setIsCheckingCode(true);
    setAccessError("");

    try {
      const configuredEvent = await requestRsvpAccess(eventSlug, "");

      if (configuredEvent.accessMode !== "name_search") {
        throw new Error("This invitation requires an RSVP code.");
      }

      setEvent(configuredEvent);
      setStage("search");
    } catch (error) {
      setAccessError(
        error instanceof Error
          ? error.message
          : "Unable to open RSVP search.",
      );
    } finally {
      setIsCheckingCode(false);
    }
  }, [eventSlug]);

  useEffect(() => {
    if (
      initialAccessMode !== "name_search" ||
      initializedSlug.current === eventSlug
    ) {
      return;
    }

    initializedSlug.current = eventSlug;
    void initializeNameSearch();
  }, [eventSlug, initialAccessMode, initializeNameSearch]);

  function updateRsvpCode(value: string) {
    setRsvpCode(value.toUpperCase());
    setAccessError("");
  }

  function updateFullName(value: string) {
    setFullName(value);
    setSearchMatches([]);
    setSelectedMatch(null);
    setParty(null);
    setSearchError("");
    setPartyError("");
  }

  async function verifyAccess() {
    const normalizedCode = normalizeRsvpCode(rsvpCode);

    if (!normalizedCode) {
      setAccessError("Please enter the RSVP code.");
      return;
    }

    setIsCheckingCode(true);
    setAccessError("");

    try {
      const verifiedEvent = await requestRsvpAccess(eventSlug, normalizedCode);

      setRsvpCode(normalizedCode);
      setEvent(verifiedEvent);

      setFullName("");
      setSearchMatches([]);
      setSelectedMatch(null);
      setParty(null);

      setSearchError("");
      setPartyError("");

      setStage("search");
    } catch (error) {
      setAccessError(
        error instanceof Error
          ? error.message
          : "Unable to verify the RSVP code.",
      );
    } finally {
      setIsCheckingCode(false);
    }
  }

  async function searchGuest() {
    const normalizedFullName = normalizeGuestName(fullName);

    if (normalizedFullName.length < 3) {
      setSearchError("Please enter your complete invited name.");
      setSearchMatches([]);
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setPartyError("");
    setSearchMatches([]);

    try {
      const result = await requestGuestSearch(
        eventSlug,
        rsvpCode,
        normalizedFullName,
      );

      const matches = result.matches ?? [];

      if (matches.length === 0) {
        setSearchError(
          result.message ||
            "We could not find that exact name on the guest list.",
        );
        return;
      }

      setFullName(normalizedFullName);
      setSearchMatches(matches);
    } catch (error) {
      setSearchError(
        error instanceof Error
          ? error.message
          : "Unable to search the guest list.",
      );
    } finally {
      setIsSearching(false);
    }
  }

  async function selectInvitation(match: SearchMatch) {
    setLoadingInvitationId(match.invitationId);
    setPartyError("");

    try {
      const loadedParty = await requestInvitationParty(
        eventSlug,
        rsvpCode,
        match.invitationId,
        match.matchedGuestName,
      );

      setSelectedMatch(match);
      setParty(loadedParty);
      setStage("party");
    } catch (error) {
      setPartyError(
        error instanceof Error
          ? error.message
          : "Unable to load the selected party.",
      );
    } finally {
      setLoadingInvitationId(null);
    }
  }

  function returnToSearch() {
    setStage("search");
    setSelectedMatch(null);
    setParty(null);
    setPartyError("");
  }

  function reset() {
    setRsvpCode("");
    setFullName("");

    setSearchMatches([]);
    setSelectedMatch(null);
    setParty(null);

    setAccessError("");
    setSearchError("");
    setPartyError("");

    setIsCheckingCode(false);
    setIsSearching(false);
    setLoadingInvitationId(null);

    if (initialAccessMode === "name_search") {
      setStage(event ? "search" : "initializing");
      return;
    }

    setEvent(null);
    setStage("access");
  }

  return {
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
  };
}
