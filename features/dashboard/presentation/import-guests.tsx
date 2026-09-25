"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFetchWithTimeout } from "@/lib/supabase/fetch-with-timeout";
import { importInvitationCount, type ImportGuestRow, type ImportIssue } from "../domain/guest-import";
import { GUEST_IMPORT_TEMPLATE, readGuestImport } from "./read-guest-import";
import { useDismissibleDetails } from "./use-dismissible-details";

export function ImportGuests({ eventId }: { eventId: number }) {
  const router = useRouter();
  const detailsRef = useDismissibleDetails();
  const working = useRef(false);
  const [rows, setRows] = useState<ImportGuestRow[]>([]);
  const [issues, setIssues] = useState<ImportIssue[]>([]);
  const [ignoredColumns, setIgnoredColumns] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [requestId, setRequestId] = useState("");
  const [phase, setPhase] = useState<"idle" | "reading" | "ready" | "saving" | "uncertain" | "complete">("idle");
  const [message, setMessage] = useState("");
  const busy = phase === "reading" || phase === "saving";

  async function send(mode: "preview" | "import", importRows: ImportGuestRow[], id: string) {
    const response = await createFetchWithTimeout(30_000)(`/api/dashboard/events/${eventId}/guests/import`, {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, rows: importRows, requestId: id }),
    });
    const result = await response.json();
    return { response, result };
  }

  async function chooseFile(file: File | undefined) {
    if (!file || working.current) return;
    working.current = true;
    setPhase("reading"); setRows([]); setIssues([]); setIgnoredColumns([]); setMessage(""); setSource(file.name);
    const id = crypto.randomUUID();
    setRequestId(id);
    try {
      const parsed = await readGuestImport(file);
      setRows(parsed.rows); setIssues(parsed.issues); setIgnoredColumns(parsed.ignoredColumns);
      if ("sheetName" in parsed) setSource(`${file.name} · ${parsed.sheetName}`);
      if (parsed.issues.length) { setPhase("idle"); return; }
      const { response, result } = await send("preview", parsed.rows, id);
      if (!response.ok || result.status !== "success") {
        setIssues(Array.isArray(result.issues) ? result.issues : []);
        setMessage(result.message || "The guest list could not be checked. Choose the file again to retry.");
        setPhase("idle");
        return;
      }
      setPhase("ready");
    } catch (error) {
      setMessage(error instanceof Error && error.name !== "AbortError" ? error.message : "The preview timed out. Choose the file again to retry.");
      setPhase("idle");
    } finally { working.current = false; }
  }

  async function save() {
    if (working.current || (phase !== "ready" && phase !== "uncertain")) return;
    working.current = true;
    setPhase("saving"); setMessage("");
    try {
      const { response, result } = await send("import", rows, requestId);
      if (response.ok && result.status === "success") {
        setPhase("complete");
        setMessage(`${result.guestCount} ${result.guestCount === 1 ? "guest" : "guests"} imported into ${result.invitationCount} ${result.invitationCount === 1 ? "invitation" : "invitations"}. All imported guests are pending.`);
        router.refresh();
      } else if (response.status < 500) {
        setIssues(Array.isArray(result.issues) ? result.issues : []);
        setMessage(result.message || "The import was rejected. Choose the file again to review it.");
        setPhase("idle");
      } else {
        setPhase("uncertain");
        setMessage(result.message || "The result could not be confirmed. Retry this import safely.");
      }
    } catch {
      setPhase("uncertain");
      setMessage("The result could not be confirmed. Retry this import safely; the same batch will not be added twice.");
    } finally { working.current = false; }
  }

  function downloadTemplate() {
    const url = URL.createObjectURL(new Blob(["\uFEFF", GUEST_IMPORT_TEMPLATE], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "guest-list-template.csv"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-md border border-input bg-white px-4 text-sm font-medium shadow-sm hover:bg-sage-50">
        <Upload aria-hidden="true" className="size-4" />Import guests
      </summary>
      <section aria-label="Import guest list" aria-busy={busy} className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[calc(100dvh-2rem)] max-w-3xl -translate-y-1/2 space-y-5 overflow-y-auto rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-elegant text-2xl font-medium text-forest">Import guest list</h3>
            <p className="mt-1 text-sm text-ink-muted">Upload Excel or CSV, review the preview, then add your guests.</p>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Close guest import" onClick={() => { if (detailsRef.current) { detailsRef.current.open = false; detailsRef.current.querySelector("summary")?.focus(); } }}><X aria-hidden="true" /></Button>
        </div>
        <div className="space-y-2 rounded-xl bg-sage-50 p-4 text-sm leading-6">
          <p><strong>One guest per row.</strong> Guest name is required. Household, Guest type, and Dietary notes are optional.</p>
          <p>Leave Household blank for an individual invitation with one guest. Use the same household name to group guests; its maximum is the number of guests listed.</p>
          <p>Existing guests and RSVP responses stay unchanged. Matching names or households must be resolved before importing.</p>
          <Button type="button" variant="outline" className="mt-1 bg-white" onClick={downloadTemplate}><Download aria-hidden="true" />Download CSV template</Button>
          <p className="text-xs text-ink-muted">Open the template in Excel and replace the example guests. Up to 500 guests, 2 MB. Excel uses “Guest List” or the first sheet. Use text values, not formulas.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="guest-import-file">Guest-list file</Label>
          <Input id="guest-import-file" type="file" accept=".xlsx,.csv" disabled={busy || phase === "uncertain"} onChange={event => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; void chooseFile(file); }} className="h-auto min-h-10 py-2" />
        </div>
        {source && <p className="break-words text-xs text-ink-muted">{source}</p>}
        {busy && <p role="status" className="flex items-center gap-2 text-sm"><Loader2 aria-hidden="true" className="size-4 animate-spin" />{phase === "reading" ? "Reading and checking guests…" : "Importing guests…"}</p>}
        {message && <p role={phase === "complete" ? "status" : "alert"} className={`rounded-lg p-3 text-sm ${phase === "complete" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>{message}</p>}
        {ignoredColumns.length > 0 && <p className="text-sm text-ink-muted">These columns will not be imported: {ignoredColumns.join(", ")}. Only guest names, households, guest types, and dietary notes are saved.</p>}
        {issues.length > 0 && <div role="alert" className="space-y-2 rounded-lg bg-red-50 p-3 text-sm text-destructive">
          <p className="font-semibold">Fix these issues in the file, then choose it again. Nothing has been imported.</p>
          <ul className="max-h-40 list-disc space-y-1 overflow-y-auto pl-5">{issues.map((issue, index) => <li key={index}>{issue.rowNumber ? `Row ${issue.rowNumber}: ` : ""}{issue.message}</li>)}</ul>
        </div>}
        {rows.length > 0 && <GuestImportPreview rows={rows} issues={issues} />}
        {phase !== "complete" && <Button type="button" onClick={save} disabled={phase !== "ready" && phase !== "uncertain"} className="w-full bg-forest text-white hover:bg-forest-light">{phase === "uncertain" ? "Retry this import safely" : rows.length ? `Import ${rows.length} ${rows.length === 1 ? "guest" : "guests"}` : "Import guests"}</Button>}
      </section>
    </details>
  );
}

function GuestImportPreview({ rows, issues }: { rows: ImportGuestRow[]; issues: ImportIssue[] }) {
  const invitationCount = importInvitationCount(rows);
  const invalidRows = new Set(issues.map(issue => issue.rowNumber));

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">
        Preview: {rows.length} {rows.length === 1 ? "guest" : "guests"} · {invitationCount}{" "}
        {invitationCount === 1 ? "invitation" : "invitations"}
      </p>
      <div className="max-h-64 overflow-auto rounded-lg border border-black/10">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="sticky top-0 bg-sage-50">
            <tr>
              {["Row", "Guest name", "Invitation", "Type", "Dietary notes"].map(label => (
                <th key={label} scope="col" className="px-3 py-2 font-semibold">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map(row => (
              <tr key={row.rowNumber} className={invalidRows.has(row.rowNumber) ? "bg-red-50" : ""}>
                <td className="px-3 py-2">{row.rowNumber}</td>
                <td className="max-w-48 break-words px-3 py-2">{row.fullName}</td>
                <td className="max-w-48 break-words px-3 py-2">{row.householdName || "Individual guest"}</td>
                <td className="px-3 py-2 capitalize">{row.guestType}</td>
                <td className="max-w-48 break-words px-3 py-2">{row.dietaryRestrictions || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
