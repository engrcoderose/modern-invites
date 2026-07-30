"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Radio } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface DashboardRealtimeRefreshProps {
  eventId: number;
}

export function DashboardRealtimeRefresh({
  eventId,
}: DashboardRealtimeRefreshProps) {
  const router = useRouter();
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "live" | "unavailable"
  >("connecting");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleRefresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        router.refresh();
      }, 350);
    };

    const channel = supabase
      .channel(`dashboard-event-${eventId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "invitations",
          filter: `event_id=eq.${eventId}`,
        },
        scheduleRefresh,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "guests",
        },
        scheduleRefresh,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rsvps",
        },
        scheduleRefresh,
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setConnectionStatus("live");
          return;
        }

        if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          setConnectionStatus("unavailable");
        }
      });

    return () => {
      clearTimeout(refreshTimer);
      void supabase.removeChannel(channel);
    };
  }, [eventId, router]);

  const label =
    connectionStatus === "live"
      ? "Live updates"
      : connectionStatus === "connecting"
        ? "Connecting"
        : "Refresh to update";

  return (
    <span
      className={
        connectionStatus === "live"
          ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/15"
          : "inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/15"
      }
    >
      <Radio
        aria-hidden="true"
        className={
          connectionStatus === "connecting" ? "size-3 animate-pulse" : "size-3"
        }
      />
      {label}
    </span>
  );
}
