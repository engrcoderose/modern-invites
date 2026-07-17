import { useState } from "react";

import {
  requestGuestSearch,
  requestRsvpAccess,
} from "./api";
import type {
  EventInformation,
  RSVPStage,
  SearchMatch,
} from "./types";
import {
  normalizeGuestName,
  normalizeRsvpCode,
} from "./utils";

export function useSmartRsvp(eventSlug: string) {
  const [stage, setStage] =
    useState<RSVPStage>("access");

  const [rsvpCode, setRsvpCode] = useState("");
  const [fullName, setFullName] = useState("");

  const [event, setEvent] =
    useState<EventInformation | null>(null);

  const [searchMatches, setSearchMatches] =
    useState<SearchMatch[]>([]);

  const [isCheckingCode, setIsCheckingCode] =
    useState(false);

  const [isSearching, setIsSearching] =
    useState(false);

  const [accessError, setAccessError] =
    useState("");

  const [searchError, setSearchError] =
    useState("");

  function updateRsvpCode(value: string) {
    setRsvpCode(value.toUpperCase());
    setAccessError("");
  }

  function updateFullName(value: string) {
    setFullName(value);
    setSearchMatches([]);
    setSearchError("");
  }

  async function verifyAccess() {
    const normalizedCode =
      normalizeRsvpCode(rsvpCode);

    if (!normalizedCode) {
      setAccessError("Please enter the RSVP code.");
      return;
    }

    setIsCheckingCode(true);
    setAccessError("");

    try {
      const verifiedEvent = await requestRsvpAccess(
        eventSlug,
        normalizedCode,
      );

      setRsvpCode(normalizedCode);
      setEvent(verifiedEvent);

      setFullName("");
      setSearchMatches([]);
      setSearchError("");

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
    const normalizedFullName =
      normalizeGuestName(fullName);

    if (normalizedFullName.length < 3) {
      setSearchError(
        "Please enter your complete invited name.",
      );
      setSearchMatches([]);
      return;
    }

    setIsSearching(true);
    setSearchError("");
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

  function reset() {
    setStage("access");

    setRsvpCode("");
    setFullName("");
    setEvent(null);
    setSearchMatches([]);

    setAccessError("");
    setSearchError("");

    setIsCheckingCode(false);
    setIsSearching(false);
  }

  return {
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
  };
}