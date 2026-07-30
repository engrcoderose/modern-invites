export type HouseholdAttendanceStatus =
  | "pending"
  | "attending"
  | "declined";

export interface HouseholdAttendanceSummary {
  maximumGuests: number;
  attendingGuests: number;
  declinedGuests: number;
  pendingGuests: number;
}

export function summarizeHouseholdAttendance(
  maximumGuests: number,
  statuses: HouseholdAttendanceStatus[],
): HouseholdAttendanceSummary {
  return statuses.reduce<HouseholdAttendanceSummary>(
    (summary, status) => {
      if (status === "attending") {
        summary.attendingGuests += 1;
      } else if (status === "declined") {
        summary.declinedGuests += 1;
      } else {
        summary.pendingGuests += 1;
      }

      return summary;
    },
    {
      maximumGuests,
      attendingGuests: 0,
      declinedGuests: 0,
      pendingGuests: 0,
    },
  );
}
