import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { AdminShell } from "@/features/auth/presentation/admin-shell";

import { logoutAdminAction } from "./actions";

interface ProtectedAdminLayoutProps {
  children: ReactNode;
}

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: ProtectedAdminLayoutProps) {
  let access;

  try {
    const repository = await createSupabaseAdminAuthRepository();
    access = await getAdminAccess(repository);
  } catch (error) {
    console.error("Administrator authorization failed:", error);
    redirect("/admin/login");
  }

  if (access.status !== "authorized") {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      email={access.principal.email}
      logoutAction={logoutAdminAction}
    >
      {children}
    </AdminShell>
  );
}
