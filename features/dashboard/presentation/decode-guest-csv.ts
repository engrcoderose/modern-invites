const encodingError = "The CSV contains unreadable characters. Correct the names in the original spreadsheet, then save as CSV UTF-8 or Excel (.xlsx) and try again.";

export function decodeGuestCsv(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const hasUtf8Bom = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
  const utf16Encoding = bytes[0] === 0xff && bytes[1] === 0xfe ? "utf-16le"
    : bytes[0] === 0xfe && bytes[1] === 0xff ? "utf-16be" : undefined;
  let text: string;
  try {
    text = new TextDecoder(utf16Encoding ?? "utf-8", { fatal: true }).decode(bytes);
  } catch {
    // Excel's legacy Windows CSV uses single-byte accents, including ñ (0xF1).
    // Only fall back for unmarked files; a BOM declares the intended encoding.
    if (hasUtf8Bom || utf16Encoding) throw new Error(encodingError);
    text = new TextDecoder("windows-1252").decode(bytes);
  }
  // Replacement characters have already lost their original letter. Never guess
  // a guest's identity or save that damaged text as a searchable invited name.
  if (/[\uFFFD\u0000]/u.test(text)) throw new Error(encodingError);
  return text;
}
