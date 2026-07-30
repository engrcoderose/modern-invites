import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  Download,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { getClientEventWorkspace } from "@/features/dashboard/application/get-client-event-workspace";
import type { DashboardAttendanceStatus } from "@/features/dashboard/domain/client-dashboard";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import { AddGuestForm } from "@/features/dashboard/presentation/add-guest-form";
import { DashboardRealtimeRefresh } from "@/features/dashboard/presentation/dashboard-realtime-refresh";
import { DashboardSummaryCards } from "@/features/dashboard/presentation/dashboard-summary";
import { GuestFilters } from "@/features/dashboard/presentation/guest-filters";
import { GuestTable } from "@/features/dashboard/presentation/guest-table";

import {
  createGuestAction,
  deleteGuestAction,
  updateGuestAction,
} from "../../actions";

interface WeddingDashboardPageProps {
  params: Promise<{
    eventId: string;
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

const allowedStatuses = new Set<DashboardAttendanceStatus>([
  "pending",
  "attending",
  "declined",
]);

function parsePage(value: string | undefined) {
  const page = Number(value ?? "1");
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

function parseStatus(
  value: string | undefined,
): DashboardAttendanceStatus | undefined {
  return allowedStatuses.has(value as DashboardAttendanceStatus)
    ? (value as DashboardAttendanceStatus)
    : undefined;
}

export default async function WeddingDashboardPage({
  params,
  searchParams,
}: WeddingDashboardPageProps) {
  const [{ eventId: rawEventId }, filters] = await Promise.all([
    params,
    searchParams,
  ]);
  const eventId = Number(rawEventId);

  if (!Number.isSafeInteger(eventId) || eventId <= 0) {
    notFound();
  }

  const authRepository = await createSupabaseClientAuthRepository();
  const access = await getClientAccess(authRepository);

  if (access.status !== "authorized") {
    redirect("/client-login");
  }

  const page = parsePage(filters.page);
  const search = filters.search?.trim().slice(0, 120) || undefined;
  const attendanceStatus = parseStatus(filters.status);
  const dashboardRepository =
    await createSupabaseClientDashboardRepository();
  const workspace = await getClientEventWorkspace(
    dashboardRepository,
    access.principal.userId,
    eventId,
    {
      page,
      pageSize: 25,
      search,
      attendanceStatus,
    },
  );

  if (!workspace) {
    notFound();
  }

  const canManage =
    workspace.event.role === "owner" ||
    workspace.event.role === "editor";

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark">
              Wedding dashboard
            </p>
            <DashboardRealtimeRefresh eventId={eventId} />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink-muted ring-1 ring-inset ring-black/10">
              <ShieldCheck aria-hidden="true" className="size-3" />
              {workspace.event.role} access
            </span>
          </div>
          <h1 className="mt-3 font-elegant text-4xl font-medium text-forest sm:text-5xl">
            {workspace.event.name}
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink-muted">
            Follow RSVP responses, organize guests, and export a planning
            copy whenever you need it.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="bg-white">
            <Link href={`/${workspace.event.slug}`} target="_blank">
              View invitation
              <ExternalLink aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild className="bg-forest text-white hover:bg-forest-light">
            <Link href={`/api/dashboard/events/${eventId}/export`}>
              <Download aria-hidden="true" />
              Export Excel
            </Link>
          </Button>
        </div>
      </div>

      <DashboardSummaryCards summary={workspace.summary} />

      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-elegant text-3xl font-medium text-forest">
              Guest list and RSVPs
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Search responses and keep planning details up to date.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <GuestFilters
              eventId={eventId}
              search={search}
              attendanceStatus={attendanceStatus}
            />
            {canManage ? (
              <AddGuestForm
                eventId={eventId}
                action={createGuestAction}
              />
            ) : null}
          </div>
        </div>

        <GuestTable
          eventId={eventId}
          guestPage={workspace.guestPage}
          canManage={canManage}
          search={search}
          attendanceStatus={attendanceStatus}
          updateAction={updateGuestAction}
          deleteAction={deleteGuestAction}
        />
      </section>
    </div>
  );
}
