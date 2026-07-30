import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { listActiveClientEvents } from "@/features/clients/application/list-active-client-events";
import { createSupabaseClientProvisioningRepository } from "@/features/clients/infrastructure/supabase-client-provisioning-repository";
import { CreateClientForm } from "@/features/clients/presentation/create-client-form";

import { createClientAction } from "./actions";

export const metadata: Metadata = {
  title: "Clients | Modern Invites Administration",
};

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const authRepository = await createSupabaseAdminAuthRepository();
  const access = await getAdminAccess(authRepository);

  if (access.status !== "authorized") {
    redirect("/admin/login");
  }

  const provisioningRepository =
    createSupabaseClientProvisioningRepository();
  const events = await listActiveClientEvents(
    provisioningRepository,
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark">
          Client management
        </p>
        <h1 className="mt-2 font-elegant text-4xl font-medium text-forest">
          Dashboard access
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Provision secure access and connect each client to the correct
          event.
        </p>
      </div>

      <CreateClientForm
        action={createClientAction}
        events={events}
      />
    </div>
  );
}
