"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import type { SeatingGuest, SeatingPlan } from "../domain/seating-plan";

function download(content: string, type: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function csvCell(value: string) {
  const safe = /^[\s]*[=+@-]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}
export function SeatingExports({ slug, plan, guests, published, dirty }: {
  slug: string; plan: SeatingPlan; guests: SeatingGuest[]; published: boolean; dirty: boolean;
}) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const qr = useRef<HTMLDivElement>(null);
  useEffect(() => { setUrl(new URL(`/seat-finder/events/${encodeURIComponent(slug)}`, window.location.origin).href); }, [slug]);
  function exportGuests() {
    const tables = new Map(plan.tables.map(table => [table.id, table.name]));
    const assignments = new Map(plan.assignments.map(item => [item.guestId, item]));
    const rows = [["Guest", "Household", "RSVP", "Table", "Seat number"], ...guests.map(guest => [guest.fullName, guest.householdName, guest.attendanceStatus, tables.get(assignments.get(guest.id)?.tableId ?? "") ?? "Unassigned", String(assignments.get(guest.id)?.seatNumber ?? "")])];
    download("\ufeff" + rows.map(row => row.map(csvCell).join(",")).join("\r\n"), "text/csv;charset=utf-8", `${slug}-seating.csv`);
  }
  function exportQr() {
    const svg = qr.current?.querySelector("svg");
    if (svg) download(new XMLSerializer().serializeToString(svg), "image/svg+xml", `${slug}-seat-finder-qr.svg`);
  }
  return <section className="grid gap-6 rounded-xl border bg-white p-5 sm:grid-cols-[auto_1fr]">
    <div ref={qr} className="flex justify-center rounded-lg bg-white p-3">{url && <QRCode value={url} size={180} title="Guest Seat Finder QR code" />}</div>
    <div className="min-w-0 space-y-4">
      <h2 className="font-elegant text-2xl text-forest">QR & exports</h2>
      <p className="text-sm leading-6 text-ink-muted">Guests enter their full invited name and see their table highlighted on the floor plan. They see the last published plan; draft changes stay private.</p>
      <p className="text-sm text-forest">{published ? "Guest link is published." : "Publish the plan before sharing this link."}{dirty ? " You have unsaved changes." : ""}</p>
      <label className="block space-y-2"><span className="text-sm font-medium">Guest link</span><input readOnly value={url} className="h-10 w-full rounded-md border px-3 text-sm" /></label>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={!url} onClick={async () => { try { await navigator.clipboard.writeText(url); setMessage("Link copied."); } catch { setMessage("Select the guest link above to copy it."); } }}>Copy link</Button>
        <Button type="button" variant="outline" onClick={exportQr} disabled={!url || !published}>Download QR</Button>
        <Button type="button" variant="outline" onClick={exportGuests}>Export seating CSV</Button>
        <Button asChild variant="outline"><a href={`/seat-finder/events/${encodeURIComponent(slug)}`} target="_blank" rel="noopener noreferrer">View guest page</a></Button>
      </div>
      <p role="status" className="text-sm text-forest">{message}</p>
    </div>
  </section>;
}
