import Link from "next/link";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AssignedDashboardEvent } from "@/features/dashboard/domain/client-dashboard";

interface AssignedEventCardProps {
  event: AssignedDashboardEvent;
}

const roleLabels = {
  owner: "Owner access",
  editor: "Editor access",
  viewer: "View-only access",
} as const;

function formatDeadline(deadline: string | null) {
  if (!deadline) {
    return "No RSVP deadline set";
  }

  return new Intl.DateTimeFormat("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${deadline}T00:00:00Z`));
}

export function AssignedEventCard({ event }: AssignedEventCardProps) {
  return (
    <Card className="flex h-full flex-col border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-eucalyptus/10 px-2.5 py-1 text-xs font-medium text-forest">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            {roleLabels[event.role]}
          </span>
        </div>
        <CardTitle className="font-elegant text-3xl font-medium text-forest">
          {event.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <CalendarDays aria-hidden="true" className="size-4" />
          RSVP deadline: {formatDeadline(event.rsvpDeadline)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm leading-6 text-ink-muted">
          Open this private workspace to view RSVP activity and manage
          the wedding guest list.
        </p>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          className="w-full bg-forest text-white hover:bg-forest-light"
        >
          <Link href={`/dashboard/events/${event.id}`}>
            Open wedding dashboard
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
