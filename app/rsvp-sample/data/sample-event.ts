import type { PartyInformation } from "@/components/smart-rsvp/types";

export const sampleEvent = {
  names: "Olivia & Alexander",
  initials: "O & A",
  date: "December 12, 2026",
  time: "Saturday · 4:00 in the afternoon",
  venue: "The Glasshouse",
  location: "Tagaytay, Philippines",
  deadline: "November 20, 2026",
};

export const sampleParties: PartyInformation[] = [
  {
    householdName: "The Santos family",
    maxAttendees: 3,
    responseMode: "household",
    responseLocked: false,
    respondedAt: null,
    guests: [
      { id: 1, fullName: "Isabel Santos", guestType: "adult", attendanceStatus: "pending", dietaryRestrictions: null, hasResponded: false, respondedAt: null },
      { id: 2, fullName: "Marco Santos", guestType: "adult", attendanceStatus: "pending", dietaryRestrictions: null, hasResponded: false, respondedAt: null },
      { id: 3, fullName: "Sofia Santos", guestType: "child", attendanceStatus: "pending", dietaryRestrictions: null, hasResponded: false, respondedAt: null },
    ],
  },
  {
    householdName: "Daniel Reyes",
    maxAttendees: 1,
    responseMode: "household",
    responseLocked: false,
    respondedAt: null,
    guests: [
      { id: 4, fullName: "Daniel Reyes", guestType: "adult", attendanceStatus: "pending", dietaryRestrictions: null, hasResponded: false, respondedAt: null },
    ],
  },
];
