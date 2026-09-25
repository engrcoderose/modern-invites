import { MAX_IMPORT_FILE_BYTES, MAX_IMPORT_GUESTS, validateImportRows } from "../domain/guest-import.ts";

const headers: Record<string, string> = {
  "guest name": "fullName", "full name": "fullName", "name": "fullName",
  "household": "householdName", "household name": "householdName",
  "guest type": "guestType", "type": "guestType",
  "dietary notes": "dietaryRestrictions", "dietary restrictions": "dietaryRestrictions",
};

// RFC-style CSV: quoted commas, escaped quotes, CRLF and multiline cells.
export function parseGuestCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  let closedQuote = false;
  const pushCell = () => { row.push(cell); cell = ""; closedQuote = false; };
  const pushRow = () => {
    pushCell();
    rows.push(row);
    row = [];
    if (rows.length > MAX_IMPORT_GUESTS + 2) throw new Error(`Use at most ${MAX_IMPORT_GUESTS} guest rows.`);
  };
  text = text.replace(/^\uFEFF/, "");
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { cell += '"'; index++; }
      else if (char === '"') { quoted = false; closedQuote = true; }
      else cell += char;
    } else if (char === ",") pushCell();
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[index + 1] === "\n") index++;
      pushRow();
    } else if (char === '"' && !cell && !closedQuote) quoted = true;
    else {
      if (char === '"' || closedQuote) throw new Error("The CSV contains misplaced quotes. Save it again as CSV UTF-8.");
      cell += char;
    }
    if (cell.length > 2000 || row.length > 30) throw new Error("The file contains too many columns or an oversized cell. Use the guest-list template.");
  }
  if (quoted) throw new Error("The CSV contains an unclosed quote.");
  if (cell || row.length || closedQuote) pushRow();
  return rows;
}

export function guestTableToRows(table: string[][]) {
  const header = table[0];
  if (!header) throw new Error("The file is empty.");
  const columns = header.map(value => {
    const key = value.replace(/^\uFEFF/, "").trim().toLowerCase();
    return Object.hasOwn(headers, key) ? headers[key] : undefined;
  });
  if (!columns.includes("fullName")) throw new Error('The first row must include a "Guest name" column. Download the template for an example.');
  const known = columns.filter(Boolean);
  if (new Set(known).size !== known.length) throw new Error("A guest column appears more than once. Keep one copy of each column.");
  const ignoredColumns = header.filter((value, index) => !columns[index] && value.trim());
  const rawRows = table.slice(1).flatMap((cells, index) => {
    if (cells.every(cell => !cell.trim())) return [];
    if (cells.length > header.length && cells.slice(header.length).some(cell => cell.trim())) throw new Error(`Row ${index + 2} has values without a column heading.`);
    const row: Record<string, string | number> = { rowNumber: index + 2, fullName: "", householdName: "", guestType: "", dietaryRestrictions: "" };
    columns.forEach((key, column) => { if (key) row[key] = cells[column] ?? ""; });
    return [row];
  });
  return { ...validateImportRows(rawRows), ignoredColumns };
}

export async function readGuestImport(file: File) {
  if (file.size > MAX_IMPORT_FILE_BYTES) throw new Error("Choose a file smaller than 2 MB.");
  if (/\.csv$/i.test(file.name)) return guestTableToRows(parseGuestCsv(await file.text()));
  if (!/\.xlsx$/i.test(file.name)) throw new Error("Choose an Excel (.xlsx) or CSV (.csv) file.");
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.default.Workbook();
  try {
    await workbook.xlsx.load(await file.arrayBuffer());
  } catch {
    throw new Error("This Excel file could not be opened. Save an unprotected .xlsx copy and try again.");
  }
  const sheet = workbook.getWorksheet("Guest List") ?? workbook.worksheets[0];
  if (!sheet || sheet.rowCount > MAX_IMPORT_GUESTS + 1 || sheet.columnCount > 30) throw new Error(`Use a sheet with at most ${MAX_IMPORT_GUESTS} guests and 30 columns.`);
  const table: string[][] = [];
  for (let rowIndex = 1; rowIndex <= sheet.rowCount; rowIndex++) {
    const row: string[] = [];
    for (let column = 1; column <= sheet.columnCount; column++) {
      const cell = sheet.getCell(rowIndex, column);
      const value = cell.value;
      if (value && typeof value === "object" && ("formula" in value || "sharedFormula" in value || "error" in value)) throw new Error(`Cell ${cell.address} contains a formula or error. Replace it with a text value.`);
      row.push(cell.text);
    }
    table.push(row);
  }
  return { ...guestTableToRows(table), sheetName: sheet.name };
}

export const GUEST_IMPORT_TEMPLATE = "Guest name,Household,Guest type,Dietary notes\r\nMaria Santos,,Adult,\r\nJuan Reyes,Reyes Family,Adult,\r\nAna Reyes,Reyes Family,Child,No peanuts\r\n";
