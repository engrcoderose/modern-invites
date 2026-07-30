import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DashboardAttendanceStatus } from "@/features/dashboard/domain/client-dashboard";

interface GuestFiltersProps {
  eventId: number;
  search?: string;
  attendanceStatus?: DashboardAttendanceStatus;
}

export function GuestFilters({
  eventId,
  search,
  attendanceStatus,
}: GuestFiltersProps) {
  const hasFilters = Boolean(search || attendanceStatus);

  return (
    <form
      method="get"
      className="flex flex-col gap-3 lg:flex-row lg:items-center"
    >
      <div className="relative min-w-0 flex-1 lg:max-w-sm">
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
        />
        <Input
          name="search"
          defaultValue={search}
          placeholder="Search guest by name"
          className="h-10 bg-white pl-9"
        />
      </div>

      <select
        name="status"
        defaultValue={attendanceStatus ?? ""}
        aria-label="Filter by RSVP status"
        className="h-10 rounded-md border border-input bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="">All response statuses</option>
        <option value="attending">Attending</option>
        <option value="declined">Declined</option>
        <option value="pending">Awaiting reply</option>
      </select>

      <Button type="submit" variant="outline" className="bg-white">
        Apply filters
      </Button>

      {hasFilters ? (
        <Button asChild type="button" variant="ghost">
          <Link href={`/dashboard/events/${eventId}`}>
            <X aria-hidden="true" className="size-4" />
            Clear
          </Link>
        </Button>
      ) : null}
    </form>
  );
}
