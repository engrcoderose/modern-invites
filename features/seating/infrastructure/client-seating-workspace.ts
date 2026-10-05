import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import { includesSeatFinder } from "@/features/services/domain/client-services";

export const getClientSeatingEvents = cache(async () => {
  const access = await getClientAccess(await createSupabaseClientAuthRepository());
  if (access.status !== "authorized") redirect("/client-login");
  const repository = await createSupabaseClientDashboardRepository();
  const events = await repository.listAssignedEvents(access.principal.userId);
  return { userId: access.principal.userId, repository, events: events.filter(event => includesSeatFinder(event.clientServices)) };
});
