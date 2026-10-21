import assert from "node:assert/strict";
import test from "node:test";
import ExcelJS from "exceljs";
import { validateImportRows, importInvitationCount } from "../features/dashboard/domain/guest-import.ts";
import { guestTableToRows, parseGuestCsv, readGuestImport, GUEST_IMPORT_TEMPLATE } from "../features/dashboard/presentation/read-guest-import.ts";

test("template groups families and gives a solo guest one invitation", () => {
  const result = guestTableToRows(parseGuestCsv(GUEST_IMPORT_TEMPLATE));
  assert.deepEqual(result.issues, []);
  assert.equal(result.rows.length, 3);
  assert.equal(importInvitationCount(result.rows), 2);
  assert.equal(result.rows[0].householdName, "");
  assert.equal(result.rows[2].guestType, "child");
});

test("CSV handles UTF-8 BOM, quoted commas, quotes, multiline notes, CRLF and empty lines", () => {
  const result = guestTableToRows(parseGuestCsv('\uFEFFGuest name,Household,Dietary notes\r\n"Santos, Maria",,"No nuts, please\nSay ""hello"""\r\n,,\r\nJuan,,\r\n'));
  assert.deepEqual(result.issues, []);
  assert.equal(result.rows[0].fullName, "Santos, Maria");
  assert.equal(result.rows[0].dietaryRestrictions, 'No nuts, please\nSay "hello"');
  assert.equal(result.rows[1].rowNumber, 4);
  assert.equal(result.rows[1].guestType, "adult");
});

test("CSV imports preserve UTF-8 names, accents and non-Latin text with or without a BOM", async () => {
  for (const bom of ["", "\uFEFF"]) {
    const csv = `${bom}Guest name,Household,Dietary notes\r\nJoyce Zuñiga,Peña Family,No piñon nuts\r\nJosé Niño,,\r\n李 明,,\r\n`;
    const result = await readGuestImport(new File([csv], "guests.csv"));
    assert.deepEqual(result.issues, []);
    assert.deepEqual(result.rows.map(row => row.fullName), ["Joyce Zuñiga", "José Niño", "李 明"]);
    assert.equal(result.rows[0].householdName, "Peña Family");
    assert.equal(result.rows[0].dietaryRestrictions, "No piñon nuts");
  }
});

test("legacy Excel Windows CSV preserves ñ, Ñ and accents", async () => {
  const csv = Buffer.from('Guest name,Household,Dietary notes\r\nJoyce Zu\xf1iga,Pe\xf1a Family,No pi\xf1on nuts\r\nJos\xe9 NI\xd1O,,\r\n', "latin1");
  // Blob.text() used to replace the legacy byte with U+FFFD before parsing.
  assert.match(await new File([csv], "guests.csv").text(), /\uFFFD/u);
  const result = await readGuestImport(new File([csv], "guests.csv"));
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.rows.map(row => row.fullName), ["Joyce Zuñiga", "José NIÑO"]);
  assert.equal(result.rows[0].householdName, "Peña Family");
  assert.equal(result.rows[0].dietaryRestrictions, "No piñon nuts");
});

test("BOM-marked UTF-16 CSV imports preserve names in either byte order", async () => {
  const csv = Buffer.from("\uFEFFGuest name\r\nJoyce Zuñiga\r\n", "utf16le");
  for (const bytes of [csv, Buffer.from(csv).swap16()]) {
    const result = await readGuestImport(new File([bytes], "guests.csv"));
    assert.deepEqual(result.issues, []);
    assert.equal(result.rows[0].fullName, "Joyce Zuñiga");
  }
});

test("damaged CSV text and invalid declared Unicode encodings are rejected before preview", async () => {
  for (const bytes of [
    Buffer.from("Guest name\nJoyce Zu\uFFFDiga"),
    Buffer.from("\xef\xbb\xbfGuest name\nJoyce Zu\xf1iga", "latin1"),
    Buffer.from([0xff, 0xfe, 0x47]),
    Buffer.from("Guest name\nJoyce Zuñiga", "utf16le"),
  ]) {
    await assert.rejects(readGuestImport(new File([bytes], "guests.csv")), /unreadable characters.*original spreadsheet.*CSV UTF-8/);
  }
});

test("Unicode composition is normalized without merging distinct accented names", async () => {
  const csv = "Guest name\nJoyce Zun\u0303iga\nJoyce Zuñiga\nJoyce Zuniga\n";
  const result = await readGuestImport(new File([csv], "guests.csv"));
  assert.equal(result.rows[0].fullName, "Joyce Zuñiga");
  assert.equal(result.issues.length, 1);
  assert.equal(result.issues[0].rowNumber, 3);
  assert.match(result.issues[0].message, /also appears on row 2/);
});

test("malformed files, missing names, duplicate headers and excess rows are rejected", () => {
  assert.throws(() => parseGuestCsv('Guest name\n"Unclosed'), /unclosed/);
  assert.throws(() => parseGuestCsv('Guest name\n"Closed"broken'), /quotes/);
  assert.throws(() => guestTableToRows([["Household"], ["Family"]]), /Guest name/);
  assert.throws(() => guestTableToRows([["Guest name", "Full name"], ["One", "Two"]]), /more than once/);
  assert.throws(() => guestTableToRows([["Guest name"], ["One", "extra"]]), /without a column/);
  assert.ok(validateImportRows([]).issues.length);
  assert.ok(validateImportRows(Array(501).fill({})).issues.length);
  assert.ok(guestTableToRows([["Guest name", "Household"], ["", "Family"]]).issues.length);
});

test("duplicate names normalize whitespace and case, while identical household names group together", () => {
  const result = guestTableToRows([["Guest name", "Household"], [" Maria  Santos ", " Family "], ["maria santos", "family"]]);
  assert.match(result.issues[0].message, /also appears on row 2/);
  assert.equal(importInvitationCount(result.rows), 1);
});

test("individual and household name collisions, invalid types and long notes are reported", () => {
  const result = guestTableToRows([["Guest name", "Household", "Guest type", "Dietary notes"], ["Maria Santos", "", "Adult", ""], ["Juan Santos", "Maria Santos", "Baby", "x".repeat(501)]]);
  assert.equal(result.issues.length, 3);
});

test("unknown columns are disclosed and never become RSVP fields", () => {
  const result = guestTableToRows([["Guest name", "RSVP status", "Email"], ["Maria", "Attending", "test@example.test"]]);
  assert.deepEqual(result.ignoredColumns, ["RSVP status", "Email"]);
  assert.deepEqual(Object.keys(result.rows[0]).sort(), ["dietaryRestrictions", "fullName", "guestType", "householdName", "rowNumber"]);
});

test("xlsx chooses Guest List over Summary and reads text without evaluating formulas", async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.addWorksheet("Summary").addRow(["Not the guest list"]);
  const sheet = workbook.addWorksheet("Guest List");
  sheet.addRows([["Guest name", "Household", "Guest type"], ["Maria", "", "Child"]]);
  const file = new File([await workbook.xlsx.writeBuffer()], "guests.xlsx");
  const result = await readGuestImport(file);
  assert.deepEqual(result.issues, []);
  assert.equal(result.rows[0].fullName, "Maria");
  assert.equal(result.rows[0].guestType, "child");
  sheet.getCell("A2").value = { formula: '"Maria"', result: "Maria" };
  await assert.rejects(readGuestImport(new File([await workbook.xlsx.writeBuffer()], "guests.xlsx")), /formula or error/);
});

test("unsupported and oversized files are rejected before parsing", async () => {
  await assert.rejects(readGuestImport(new File(["Guest name\nMaria"], "guests.xls")), /Excel/);
  await assert.rejects(readGuestImport(new File([new Uint8Array(2 * 1024 * 1024 + 1)], "guests.csv")), /2 MB/);
});
