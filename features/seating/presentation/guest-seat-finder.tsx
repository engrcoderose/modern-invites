"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Armchair, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createFetchWithTimeout } from "@/lib/supabase/fetch-with-timeout";
import type { SeatingPlan } from "../domain/seating-plan";
import { FloorPlanView } from "./floor-plan-view";
import { cn } from "@/lib/utils";

export interface GuestSeatFinderPresentation {
  header?: ReactNode;
  footer?: ReactNode;
  mapHeading?: ReactNode;
  classNames?: Partial<Record<"page" | "container" | "form" | "input" | "button" | "result" | "tableName" | "resultHint" | "map", string>>;
}

export function GuestSeatFinder({ name, slug, plan, presentation = {} }: { name: string; slug: string; plan: SeatingPlan; presentation?: GuestSeatFinderPresentation }) {
  const classes = presentation.classNames ?? {};
  const [query, setQuery] = useState("");
  const [tableId, setTableId] = useState<string>();
  const [seatNumber, setSeatNumber] = useState<number>();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const table = plan.tables.find(table => table.id === tableId);
  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setTableId(undefined); setSeatNumber(undefined); setMessage("");
    try {
      const response = await createFetchWithTimeout()(`/api/seat-finder/${encodeURIComponent(slug)}/search`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: query }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Please ask the welcome team for help.");
      if (result.status === "found") { setTableId(result.tableId); setSeatNumber(result.seatNumber); }
      else setMessage(result.status === "ambiguous" ? "More than one guest has this name. Please ask the welcome team for your table." : "We couldn’t find your table yet. Check your full invited name or ask the welcome team.");
    } catch (error) { setMessage(error instanceof Error && error.name !== "AbortError" ? error.message : "Please try again or ask the welcome team for help."); }
    finally { setPending(false); }
  }
  return <main className={cn("min-h-screen bg-ivory px-4 py-10 text-forest sm:px-6", classes.page)}>
    <div className={cn("mx-auto max-w-4xl space-y-6", classes.container)}>
      {presentation.header ?? <header className="text-center"><Armchair aria-hidden="true" className="mx-auto size-8" /><p className="mt-4 text-xs uppercase tracking-[0.24em]">Welcome to the celebration</p><h1 className="mt-3 font-elegant text-4xl sm:text-5xl">{name}</h1><p className="mt-3 text-sm text-ink-muted">Find your table and see where it is on the floor plan.</p></header>}
      <form onSubmit={search} className={cn("mx-auto flex max-w-xl flex-col gap-3 sm:flex-row", classes.form)}>
        <label className="min-w-0 flex-1"><span className="sr-only">Your full invited name</span><input value={query} onChange={event => { setQuery(event.target.value); setTableId(undefined); setSeatNumber(undefined); setMessage(""); }} placeholder="Enter your full invited name" required minLength={2} maxLength={150} autoComplete="name" disabled={pending} className={cn("h-12 w-full rounded-lg border bg-white px-4 text-sm", classes.input)} /></label>
        <Button type="submit" disabled={pending} className={cn("h-12 bg-forest text-white hover:bg-forest-light", classes.button)}><Search aria-hidden="true" className="size-4" />{pending ? "Finding…" : "Find my seat"}</Button>
      </form>
      <div role="status" className="text-center">{table ? <div className={cn("rounded-xl border border-eucalyptus/40 bg-white p-5", classes.result)}><p className={cn("text-xs uppercase tracking-widest text-ink-muted", classes.resultHint)}>Your table</p><p className={cn("mt-2 font-elegant text-3xl", classes.tableName)}>{table.name}</p>{seatNumber !== undefined && <p className="mt-2 text-lg font-semibold">Seat {seatNumber}</p>}<p className={cn("mt-2 text-sm text-ink-muted", classes.resultHint)}>{seatNumber === undefined ? "Your table is highlighted below." : "Your seat is highlighted in gold below. Zoom in to see the seat numbers."}</p></div> : message && <p className="mx-auto max-w-xl text-sm leading-6">{message}</p>}</div>
      <div className={classes.map}>{presentation.mapHeading}<FloorPlanView plan={plan} highlightedId={tableId} highlightedSeatNumber={seatNumber} showOccupancy={false} /></div>
      {presentation.footer ?? <p className="text-center text-xs text-ink-muted">Need help? The welcome team will guide you to your table.</p>}
    </div>
  </main>;
}
