import { GuestManagementError } from "../application/manage-dashboard-guests.ts";

interface HouseholdDatabaseError {
  code: string;
}

// Database messages can contain household names and guest details. Return only
// fixed instructions and a validated reference code to the dashboard.
export function householdPersistenceError(
  error: HouseholdDatabaseError,
  operation: "read" | "update",
) {
  const code = /^(?:[A-Z0-9]{5}|PGRST\d{3})$/.test(error.code)
    ? error.code
    : "UNKNOWN";
  const action = operation === "read" ? "load" : "save";

  if (code === "42501") {
    return new GuestManagementError(
      "forbidden",
      `The database did not permit this household ${operation}. Ask the site administrator to check household permissions. Reference: ${code}.`,
    );
  }

  if (["42703", "42P01", "PGRST204", "PGRST205"].includes(code)) {
    return new GuestManagementError(
      "unexpected",
      `Unable to ${action} the household because the database setup needs attention. Ask the site administrator to check the dashboard migrations and schema cache. Reference: ${code}.`,
    );
  }

  if (code === "23514") {
    return new GuestManagementError(
      "invalid",
      "The database rejected these household details. Ask the site administrator to review the household constraints. Reference: 23514.",
    );
  }

  if (code === "23505") {
    return new GuestManagementError(
      "invalid",
      "These household details conflict with an existing record. Review the household name and refresh the list. Reference: 23505.",
    );
  }

  return new GuestManagementError(
    "unexpected",
    `Unable to ${action} the household. Refresh the list before trying again. If this continues, share this reference with the site administrator: ${code}.`,
  );
}
