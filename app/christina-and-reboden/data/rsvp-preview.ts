import type { GuestResponseDraft, PartyGuest, PartyInformation } from "../../../components/smart-rsvp/types";

export type PreviewGuest = Pick<PartyGuest, "fullName"> & { key: string };
export type PreviewHousehold = Pick<PartyInformation, "householdName" | "maxAttendees"> & {
  key: string;
  guests: readonly PreviewGuest[];
};
export type PreviewMatch = { household: PreviewHousehold; matchedGuestName: string };
export type PreviewResponses = Record<string, Pick<GuestResponseDraft, "status" | "dietaryRestrictions">>;

// Fictional examples only. These keys are not invitation IDs or database IDs.
export const previewHouseholds: readonly PreviewHousehold[] = [
  {
    key: "preview-rivera", householdName: "Rivera household", maxAttendees: 2,
    guests: [
      { key: "preview-alex-rivera", fullName: "Alex Rivera" },
      { key: "preview-sam-rivera", fullName: "Sam Rivera" },
    ],
  },
  {
    key: "preview-santos", householdName: "Santos household", maxAttendees: 2,
    guests: [
      { key: "preview-alex-santos", fullName: "Alex Santos" },
      { key: "preview-mia-santos", fullName: "Mia Santos" },
    ],
  },
];
