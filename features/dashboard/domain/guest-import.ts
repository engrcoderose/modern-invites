export const MAX_IMPORT_GUESTS = 500;
export const MAX_IMPORT_FILE_BYTES = 2 * 1024 * 1024;

export interface ImportGuestRow {
  rowNumber: number;
  fullName: string;
  householdName: string;
  guestType: "adult" | "child";
  dietaryRestrictions: string;
}

export interface ImportIssue {
  rowNumber: number;
  message: string;
}

export function importNameKey(value: string) {
  return value.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase();
}

export function validateImportRows(input: unknown): {
  rows: ImportGuestRow[];
  issues: ImportIssue[];
} {
  const rows: ImportGuestRow[] = [];
  const issues: ImportIssue[] = [];
  if (
    !Array.isArray(input) ||
    !input.length ||
    input.length > MAX_IMPORT_GUESTS
  ) {
    return {
      rows,
      issues: [
        {
          rowNumber: 0,
          message: `Import between 1 and ${MAX_IMPORT_GUESTS} guests at a time.`,
        },
      ],
    };
  }
  const names = new Map<string, number>();
  const invitations = new Map<
    string,
    { individual: boolean; rowNumber: number }
  >();
  for (const [index, value] of input.entries()) {
    const rowNumber =
      Number.isSafeInteger(value?.rowNumber) && value.rowNumber >= 2
        ? value.rowNumber
        : index + 2;
    if (
      !value ||
      typeof value !== "object" ||
      ["fullName", "householdName", "guestType", "dietaryRestrictions"].some(
        (key) => typeof value[key] !== "string",
      )
    ) {
      issues.push({
        rowNumber,
        message: "Use text values in each guest column.",
      });
      continue;
    }
    const fullName = value.fullName
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ");
    const householdName = value.householdName
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ");
    const guestType = value.guestType.trim().toLowerCase() || "adult";
    const dietaryRestrictions = value.dietaryRestrictions.trim();
    if (!fullName || fullName.length > 120)
      issues.push({
        rowNumber,
        message: "Guest name must contain 1–120 characters.",
      });
    if (householdName.length > 120)
      issues.push({
        rowNumber,
        message: "Household must contain at most 120 characters.",
      });
    if (guestType !== "adult" && guestType !== "child")
      issues.push({
        rowNumber,
        message: "Guest type must be Adult or Child (or blank for Adult).",
      });
    if (dietaryRestrictions.length > 500)
      issues.push({
        rowNumber,
        message: "Dietary notes must contain at most 500 characters.",
      });
    const key = importNameKey(fullName);
    if (names.has(key))
      issues.push({
        rowNumber,
        message: `This guest name also appears on row ${names.get(key)}. Remove the duplicate or add guests with identical names manually.`,
      });
    names.set(key, rowNumber);
    const invitationKey = importNameKey(householdName || fullName);
    const prior = invitations.get(invitationKey);
    if (prior) {
      // A solo invitation must not accidentally become a named household.
      if (prior.individual !== !householdName)
        issues.push({
          rowNumber,
          message: `This household name conflicts with an individual invitation on row ${prior.rowNumber}. Use a different household name.`,
        });
    }
    invitations.set(invitationKey, { individual: !householdName, rowNumber });
    rows.push({
      rowNumber,
      fullName,
      householdName,
      guestType: guestType === "child" ? "child" : "adult",
      dietaryRestrictions,
    });
  }
  return { rows, issues };
}

export function importInvitationCount(rows: ImportGuestRow[]) {
  return new Set(
    rows.map((row) =>
      row.householdName
        ? `household:${importNameKey(row.householdName)}`
        : `individual:${importNameKey(row.fullName)}`,
    ),
  ).size;
}
