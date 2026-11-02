import wedding from "../data/wedding-details.json";

export function GET() {
  const escape = (value: string) => value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Modern Invites//Marian and Dee Jay//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    "UID:marian-and-deejay-20270119@moderninvites.com", "DTSTAMP:20261031T000000Z", "DTSTART:20270119T060000Z",
    `SUMMARY:${escape(`${wedding.couple.display} — Wedding ceremony`)}`,
    `LOCATION:${escape(`${wedding.ceremony.venue}, ${wedding.ceremony.address}`)}`,
    `DESCRIPTION:${escape(`Please arrive at ${wedding.ceremony.suggestedArrivalTime}. Reception: ${wedding.reception.venue}, ${wedding.reception.address}.`)}`,
    "END:VEVENT", "END:VCALENDAR",
  ];
  // iCalendar lines fold at 75 octets; source includes multi-byte punctuation.
  const encoder = new TextEncoder();
  const folded = lines.map((line) => {
    let result = "", current = "";
    for (const char of line) {
      if (encoder.encode(current + char).length > 75) { result += `${current}\r\n`; current = " "; }
      current += char;
    }
    return result + current;
  });
  return new Response(folded.join("\r\n") + "\r\n", { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="marian-and-deejay.ics"' } });
}
