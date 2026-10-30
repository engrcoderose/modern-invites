import { wedding } from "../data/wedding";

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function GET() {
  const event = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Modern Invites//Jahzen and Glyzell//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    "UID:jahzen-and-glyzell-20270530@moderninvites.com", "DTSTAMP:20261028T000000Z",
    "DTSTART:20270530T083000Z",
    `SUMMARY:${escapeIcs(`${wedding.couple.display}'s wedding`)}`,
    `LOCATION:${escapeIcs(`${wedding.venue.name} ${wedding.venue.detail}, ${wedding.venue.address}`)}`,
    "DESCRIPTION:Guest arrival at 4:00 PM. Ceremony at 4:30 PM (Philippine time). Formal attire.",
    "END:VEVENT", "END:VCALENDAR", "",
  ].map(line => line.match(/.{1,73}/g)?.join("\r\n ") ?? "").join("\r\n");
  return new Response(event, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="jahzen-and-glyzell.ics"' } });
}
