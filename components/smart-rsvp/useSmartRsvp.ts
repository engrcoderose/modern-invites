import { useCallback, useEffect, useRef, useState } from "react";

import {
  isRsvpClosedError,
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
    initialAccessMode === "shared_code" ? "access" : "initializing",
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
  const [rsvpClosed, setRsvpClosed] = useState(false);

  const [searchError, setSearchError] = useState("");

  const [partyError, setPartyError] = useState("");

  // Preserve the code-first interface unless the event explicitly enables open RSVP.
  useEffect(() => {
    if (initialAccessMode !== "shared_code") return;
    setRsvpClosed(false);
    let cancelled = false;
    void requestRsvpAccess(eventSlug, "").then(configured => {
      if (!cancelled && configured.accessMode === "open") {
        setEvent(configured);
        setStage("open");
      }
    }).catch(error => {
      if (!cancelled && isRsvpClosedError(error)) {
        setAccessError(error.message);
        setRsvpClosed(true);
      }
      // Other failures leave the existing code verification available.
    });
    return () => { cancelled = true; };
  }, [eventSlug, initialAccessMode]);

  const initializeNameSearch = useCallback(async () => {
    setRsvpClosed(false);
    setStage("initializing");
    setIsCheckingCode(true);
    setAccessError("");

    try {
      const configuredEvent = await requestRsvpAccess(eventSlug, "");

      if (initialAccessMode === "open" && configuredEvent.accessMode !== "open") {
        throw new Error("Open RSVP is unavailable for this event.");
      }

      if (configuredEvent.accessMode === "shared_code") {
        throw new Error("This invitation requires an RSVP code.");
      }

      setEvent(configuredEvent);
      setStage(configuredEvent.accessMode === "open" ? "open" : "search");
    } catch (error) {
      setRsvpClosed(isRsvpClosedError(error));
      setAccessError(
        error instanceof Error
          ? error.message
          : "Unable to open RSVP search.",
      );
    } finally {
      setIsCheckingCode(false);
    }
  }, [eventSlug, initialAccessMode]);

  useEffect(() => {
    if (
      initialAccessMode === "shared_code" ||
      initializedSlug.current === eventSlug
    ) {
      return;
    }

    initializedSlug.current = eventSlug;
    void initializeNameSearch();
  }, [eventSlug, initialAccessMode, initializeNameSearch]);

  function updateRsvpCode(value: string) {
    setRsvpClosed(false);
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
    setRsvpClosed(false);
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

      setStage(verifiedEvent.accessMode === "open" ? "open" : "search");
    } catch (error) {
      setRsvpClosed(isRsvpClosedError(error));
      setAccessError(
        error instanceof Error
          ? error.message
          : "Unable to verify the RSVP code.",
      );
    } finally {
      setIsCheckingCode(false);
    }
  }

  async function searchGuest(onMatches?: (matches: SearchMatch[]) => Promise<void>) {
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
      await onMatches?.(matches);
    } catch (error) {
      if (isRsvpClosedError(error)) setRsvpClosed(true);
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
      if (isRsvpClosedError(error)) setRsvpClosed(true);
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
    setRsvpClosed(false);
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

    if (initialAccessMode !== "shared_code") {
      setStage(event ? (event.accessMode === "open" ? "open" : "search") : "initializing");
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
    rsvpClosed,
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
