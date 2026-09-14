import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { createSupabaseEventManagementRepository } from "@/features/clients/infrastructure/supabase-event-management-repository";

export const metadata = { title: "Events | Modern Invites Administration" };
export const dynamic = "force-dynamic";

export default async function AdminEventsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if ((await getAdminAccess(await createSupabaseAdminAuthRepository())).status !== "authorized") redirect("/admin/login");
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q.trim().slice(0, 150) : "";
  const status = params.status === "active" || params.status === "archived" ? params.status : "all";
  const page = typeof params.page === "string" && /^\d+$/.test(params.page) ? Math.min(100000, Math.max(1, Number(params.page))) : 1;
  const result = await createSupabaseEventManagementRepository().listEvents(search, status, page);
  const pages = Math.max(1, Math.ceil(result.total / 30));
  function pageUrl(value: number) { return `/admin/events?${new URLSearchParams({ q: search, status, page: String(value) })}`; }

  return <div className="space-y-8">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark">Event directory</p><h1 className="mt-2 font-elegant text-4xl font-medium text-forest">Your client events</h1><p className="mt-2 max-w-2xl text-ink-muted">Find current and past events, review their assigned clients, and update RSVP settings.</p></div>
      <Button asChild className="bg-forest text-white hover:bg-forest-light"><Link href="/admin/clients"><Plus aria-hidden="true" />Create event</Link></Button>
    </div>
    <form action="/admin/events" className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-5 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-2"><label htmlFor="q" className="text-sm font-medium">Search event name</label><Input id="q" name="q" defaultValue={search} placeholder="e.g. Anjo & Jasmin" maxLength={150} className="h-11" /></div>
      <div className="space-y-2"><label htmlFor="event-status" className="block text-sm font-medium">Status</label><select id="event-status" name="status" defaultValue={status} className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm sm:w-44"><option value="all">All events</option><option value="active">Active</option><option value="archived">Archived</option></select></div>
      <Button type="submit" className="h-11">Search</Button>
      {(search || status !== "all") && <Link href="/admin/events" className="py-3 text-sm underline">Clear filters</Link>}
    </form>
    <p role="status" className="text-sm text-ink-muted">{result.total} {result.total === 1 ? "event" : "events"} found</p>
    {result.events.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{result.events.map(event => <article key={event.id} className="flex flex-col rounded-xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3"><CalendarDays aria-hidden="true" className="size-5 text-eucalyptus-dark" /><span className={`rounded-full px-3 py-1 text-xs font-medium ${event.is_active ? "bg-sage-50 text-forest" : "bg-black/5 text-ink-muted"}`}>{event.is_active ? "Active" : "Archived"}</span></div>
      <h2 className="mt-5 break-words font-elegant text-2xl text-forest">{event.name}</h2><p className="mt-1 break-all text-xs text-ink-muted">{event.slug}</p>
      <dl className="my-5 space-y-3 text-sm"><div><dt className="text-ink-muted">Assigned clients</dt><dd className="mt-1 break-words">{event.clients.length ? event.clients.map(client => client.name).join(", ") : "No client assigned"}</dd></div><div><dt className="text-ink-muted">RSVP deadline</dt><dd className="mt-1">{event.rsvp_deadline ?? "Not set"}</dd></div></dl>
      <Link href={`/admin/events/${event.id}`} aria-label={`View and edit ${event.name}`} className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 text-sm font-semibold text-forest">View &amp; edit event<ArrowRight aria-hidden="true" className="size-4" /></Link>
    </article>)}</div> : <div className="rounded-xl border border-dashed border-black/20 p-10 text-center"><h2 className="font-elegant text-2xl text-forest">No events found</h2><p className="mt-2 text-ink-muted">Try another name or status, or create your first event.</p></div>}
    {pages > 1 || page > 1 ? <nav aria-label="Event pages" className="flex items-center justify-between gap-4 text-sm">{page > 1 ? <Link href={pageUrl(page - 1)} className="underline">Previous</Link> : <span />}<span>Page {page} · {pages} {pages === 1 ? "page" : "pages"} available</span>{page < pages ? <Link href={pageUrl(page + 1)} className="underline">Next</Link> : <Link href={pageUrl(1)} className="underline">First page</Link>}</nav> : null}
  </div>;
}
