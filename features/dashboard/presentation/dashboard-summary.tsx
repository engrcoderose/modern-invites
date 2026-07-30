import {
  CheckCircle2,
  CircleHelp,
  MailCheck,
  UserRoundX,
  UsersRound,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardSummary } from "@/features/dashboard/domain/client-dashboard";

interface DashboardSummaryCardsProps {
  summary: DashboardSummary;
}

const summaryConfig = [
  {
    key: "totalGuests",
    label: "Total guests",
    icon: UsersRound,
    color: "text-forest",
    background: "bg-eucalyptus/10",
  },
  {
    key: "attendingGuests",
    label: "Attending",
    icon: CheckCircle2,
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  {
    key: "declinedGuests",
    label: "Declined",
    icon: UserRoundX,
    color: "text-rose-700",
    background: "bg-rose-50",
  },
  {
    key: "pendingGuests",
    label: "Awaiting reply",
    icon: CircleHelp,
    color: "text-amber-700",
    background: "bg-amber-50",
  },
] as const;

export function DashboardSummaryCards({
  summary,
}: DashboardSummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {summaryConfig.map(
        ({ key, label, icon: Icon, color, background }) => (
          <Card key={key} className="border-black/10 bg-white shadow-sm">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ink-muted">
                {label}
              </CardTitle>
              <span
                className={`flex size-9 items-center justify-center rounded-full ${background} ${color}`}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-semibold ${color}`}>
                {summary[key]}
              </p>
            </CardContent>
          </Card>
        ),
      )}

      <Card className="border-black/10 bg-forest text-white shadow-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/75">
            RSVP submissions
          </CardTitle>
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-champagne-light">
            <MailCheck aria-hidden="true" className="size-4" />
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">
            {summary.submittedRsvps}
            <span className="ml-1 text-sm font-normal text-white/60">
              / {summary.totalInvitations}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
