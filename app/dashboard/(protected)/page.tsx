import { redirect } from "next/navigation";
import { CalendarHeart } from "lucide-react";

import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { listAssignedEvents } from "@/features/dashboard/application/list-assigned-events";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import { AssignedEventCard } from "@/features/dashboard/presentation/assigned-event-card";

export default async function ClientDashboardPage() {
  const authRepository = await createSupabaseClientAuthRepository();
  const access = await getClientAccess(authRepository);

  if (access.status !== "authorized") {
    redirect("/client-login");
  }

  const dashboardRepository =
    await createSupabaseClientDashboardRepository();
  const events = await listAssignedEvents(
    dashboardRepository,
    access.principal.userId,
  );

  if (events.length === 1) {
    redirect(`/dashboard/events/${events[0].id}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark">
          Your celebrations
        </p>
        <h1 className="mt-2 font-elegant text-4xl font-medium text-forest sm:text-5xl">
          Welcome, {access.principal.displayName}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
          Select a wedding to view its private RSVP workspace.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <AssignedEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-eucalyptus/40 bg-white/65 px-6 py-14 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-eucalyptus/10 text-forest">
            <CalendarHeart aria-hidden="true" className="size-6" />
          </div>
          <h2 className="mt-4 font-elegant text-2xl text-forest">
            No wedding assigned yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
            Your login is active, but an event has not been assigned to
            this dashboard. Please contact Modern Invites for help.
          </p>
        </div>
      )}
    </div>
  );
}
