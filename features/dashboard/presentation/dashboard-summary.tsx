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
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-5">
      {summaryConfig.map(
        ({ key, label, icon: Icon, color, background }) => (
          <Card
            key={key}
            className="min-w-0 border-black/10 bg-white shadow-sm"
          >
            <CardHeader className="flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6 sm:pb-2">
              <CardTitle className="text-xs font-medium text-ink-muted sm:text-sm">
                {label}
              </CardTitle>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9 ${background} ${color}`}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
              <p className={`text-2xl font-semibold sm:text-3xl ${color}`}>
                {summary[key]}
              </p>
            </CardContent>
          </Card>
        ),
      )}

      <Card className="col-span-2 border-black/10 bg-forest text-white shadow-sm xl:col-span-1">
        <CardHeader className="flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6 sm:pb-2">
          <CardTitle className="text-xs font-medium text-white/75 sm:text-sm">
            RSVP submissions
          </CardTitle>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-champagne-light sm:size-9">
            <MailCheck aria-hidden="true" className="size-4" />
          </span>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
          <p className="text-2xl font-semibold sm:text-3xl">
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
