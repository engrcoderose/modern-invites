import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { createSupabaseEventManagementRepository } from "@/features/clients/infrastructure/supabase-event-management-repository";
import { EventSettingsForm } from "@/features/clients/presentation/event-settings-form";
import { updateEventSettingsAction } from "../actions";

export const metadata = { title: "Event settings | Modern Invites Administration" };
export const dynamic = "force-dynamic";

export default async function AdminEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  if ((await getAdminAccess(await createSupabaseAdminAuthRepository())).status !== "authorized") redirect("/admin/login");
  const { eventId } = await params;
  if (!/^[1-9]\d*$/.test(eventId) || !Number.isSafeInteger(Number(eventId))) notFound();
  const event = await createSupabaseEventManagementRepository().getEvent(Number(eventId));
  if (!event) notFound();
  return <div className="space-y-8">
    <Link href="/admin/events" className="inline-flex items-center gap-2 text-sm text-forest"><ArrowLeft aria-hidden="true" className="size-4" />All events</Link>
    <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark">Event settings</p><h1 className="mt-2 break-words font-elegant text-4xl font-medium text-forest">{event.name}</h1><p className="mt-2 text-ink-muted">Update event and RSVP settings when your client requests a change.</p></div>
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section aria-label="Event settings" className="min-w-0 rounded-xl border border-black/10 bg-white p-6 shadow-sm sm:p-8"><EventSettingsForm event={event} action={updateEventSettingsAction} /></section>
      <aside className="min-w-0 space-y-6">
        <section className="rounded-xl border border-black/10 bg-white p-6"><h2 className="font-elegant text-2xl text-forest">Event details</h2><dl className="mt-5 space-y-5 text-sm"><div><dt className="text-ink-muted">Event identifier</dt><dd className="mt-1 break-all font-medium">{event.slug}</dd><dd className="mt-2 text-xs leading-5 text-ink-muted">Fixed to preserve the invitation’s RSVP connection.</dd></div><div><dt className="text-ink-muted">RSVP access</dt><dd className="mt-1">{event.rsvp_access_mode === "name_search" ? "Invited-name search" : "Shared invitation code"}</dd></div></dl></section>
        <section className="rounded-xl border border-black/10 bg-white p-6"><h2 className="font-elegant text-2xl text-forest">Assigned clients</h2>{event.clients.length ? <ul className="mt-4 divide-y divide-black/10">{event.clients.map((client, index) => <li key={index} className="py-3"><p className="break-words font-medium">{client.name}</p><p className="mt-1 text-xs capitalize text-ink-muted">{client.role} · {client.status}</p></li>)}</ul> : <p className="mt-4 text-sm text-ink-muted">No client has been assigned yet.</p>}<Link href="/admin/clients" className="mt-4 inline-block text-sm text-forest underline">Create client access</Link></section>
      </aside>
    </div>
  </div>;
}
