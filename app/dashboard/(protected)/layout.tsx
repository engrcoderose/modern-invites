import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { ClientShell } from "@/features/auth/presentation/client-shell";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import { includesSeatFinder } from "@/features/services/domain/client-services";

import { logoutClientAction } from "./actions";

interface ProtectedClientLayoutProps {
  children: ReactNode;
}

export const dynamic = "force-dynamic";

export default async function ProtectedClientLayout({
  children,
}: ProtectedClientLayoutProps) {
  let access;

  try {
    const repository = await createSupabaseClientAuthRepository();
    access = await getClientAccess(repository);
  } catch (error) {
    console.error("Client authorization failed:", error);
    redirect("/client-login");
  }

  if (access.status !== "authorized") {
    redirect("/client-login");
  }

  const dashboardRepository = await createSupabaseClientDashboardRepository();
  const events = await dashboardRepository.listAssignedEvents(access.principal.userId);

  return (
    <ClientShell
      displayName={access.principal.displayName}
      email={access.principal.email}
      logoutAction={logoutClientAction}
      hasSeatFinder={events.some(event => includesSeatFinder(event.clientServices))}
    >
      {children}
    </ClientShell>
  );
}
