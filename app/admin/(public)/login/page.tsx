import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { AdminLoginForm } from "@/features/auth/presentation/admin-login-form";

import { loginAdminAction } from "./actions";

export const metadata: Metadata = {
  title: "Administrator Login | Modern Invites",
  description: "Secure administrator access for Modern Invites.",
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  let isAuthorized = false;

  try {
    const repository = await createSupabaseAdminAuthRepository();
    const access = await getAdminAccess(repository);
    isAuthorized = access.status === "authorized";
  } catch (error) {
    console.error("Unable to inspect the administrator session:", error);
  }

  if (isAuthorized) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ivory px-4 py-12">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 size-96 rounded-full bg-eucalyptus/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-24 size-[28rem] rounded-full bg-champagne/15 blur-3xl"
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-eucalyptus-dark">
            Modern Invites
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Private administration portal
          </p>
        </div>

        <AdminLoginForm action={loginAdminAction} />
      </div>
    </main>
  );
}
