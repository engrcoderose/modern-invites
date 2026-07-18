import { useState } from "react";

import { requestRsvpSubmission } from "./api";
import type {
  AttendanceChoice,
  GuestResponseDraft,
  PartyInformation,
  SearchMatch,
  SubmissionSummary,
} from "./types";

interface UsePartyResponseOptions {
  eventSlug: string;
  rsvpCode: string;
  selectedMatch: SearchMatch;
  party: PartyInformation;
}

function createInitialResponses(party: PartyInformation) {
  const responses: Record<number, GuestResponseDraft> = {};

  for (const guest of party.guests) {
    responses[guest.id] = {
      guestId: guest.id,
      status:
        guest.attendanceStatus === "pending"
          ? null
          : guest.attendanceStatus,
      dietaryRestrictions: guest.dietaryRestrictions ?? "",
    };
  }

  return responses;
}

export function usePartyResponse({
  eventSlug,
  rsvpCode,
  selectedMatch,
  party,
}: UsePartyResponseOptions) {
  const [responses, setResponses] = useState(() =>
    createInitialResponses(party),
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [summary, setSummary] = useState<SubmissionSummary | null>(null);

  const answeredCount = party.guests.filter(
    (guest) => responses[guest.id]?.status !== null,
  ).length;
  const attendingCount = party.guests.filter(
    (guest) => responses[guest.id]?.status === "attending",
  ).length;
  const allAnswered = answeredCount === party.guests.length;
  const exceedsMaximum = attendingCount > party.maxAttendees;

  function updateAttendance(guestId: number, status: AttendanceChoice) {
    setResponses((current) => {
      const existing = current[guestId];

      if (!existing) {
        return current;
      }

      return {
        ...current,
        [guestId]: {
          ...existing,
          status,
          dietaryRestrictions:
            status === "declined" ? "" : existing.dietaryRestrictions,
        },
      };
    });
    setSubmissionError("");
  }

  function updateDietaryRestrictions(guestId: number, value: string) {
    setResponses((current) => {
      const existing = current[guestId];

      if (!existing) {
        return current;
      }

      return {
        ...current,
        [guestId]: {
          ...existing,
          dietaryRestrictions: value,
        },
      };
    });
    setSubmissionError("");
  }

  async function submitResponse() {
    if (!allAnswered) {
      setSubmissionError("Please answer for every member of your party.");
      return;
    }

    if (exceedsMaximum) {
      setSubmissionError(
        `This invitation allows a maximum of ${party.maxAttendees} attendee(s).`,
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const guestResponses = party.guests.map((guest) => {
        const response = responses[guest.id];

        if (!response?.status) {
          throw new Error("Please answer for every member of your party.");
        }

        return {
          guestId: guest.id,
          status: response.status,
          dietaryRestrictions: response.dietaryRestrictions.trim(),
        };
      });

      const result = await requestRsvpSubmission({
        slug: eventSlug,
        code: rsvpCode,
        invitationId: selectedMatch.invitationId,
        matchedFullName: selectedMatch.matchedGuestName,
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        guestResponses,
      });

      setSummary(result);
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Unable to save the RSVP.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    responses,
    email,
    phone,
    message,
    answeredCount,
    attendingCount,
    allAnswered,
    exceedsMaximum,
    isSubmitting,
    submissionError,
    summary,
    setEmail,
    setPhone,
    setMessage,
    updateAttendance,
    updateDietaryRestrictions,
    submitResponse,
  };
}
