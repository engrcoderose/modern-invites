import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CalendarDays, Download, ShieldCheck } from "lucide-react";

import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { ClientLoginForm } from "@/features/auth/presentation/client-login-form";

import { loginClientAction } from "./actions";

export const metadata: Metadata = {
  title: "Client Login | Modern Invites",
  description:
    "Securely access your Modern Invites wedding RSVP dashboard.",
};

export const dynamic = "force-dynamic";

const benefits = [
  {
    icon: CalendarDays,
    title: "Live RSVP overview",
    description: "See responses for your wedding as they arrive.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Your dashboard only shows events assigned to you.",
  },
  {
    icon: Download,
    title: "Ready to export",
    description: "Keep your guest information organized for planning.",
  },
] as const;

export default async function ClientLoginPage() {
  let isAuthorized = false;

  try {
    const repository = await createSupabaseClientAuthRepository();
    const access = await getClientAccess(repository);
    isAuthorized = access.status === "authorized";
  } catch (error) {
    console.error("Unable to inspect the client session:", error);
  }

  if (isAuthorized) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ivory">
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-eucalyptus/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-32 size-[38rem] rounded-full bg-champagne/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="invitation-grid absolute inset-0 opacity-60"
      />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_31rem] lg:px-8">
        <section className="mx-auto max-w-xl lg:mx-0">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-eucalyptus-dark">
            Modern Invites
          </p>
          <h1 className="mt-5 text-balance font-elegant text-5xl font-medium leading-[1.05] text-forest sm:text-6xl">
            Your celebration, beautifully organized.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-ink-muted">
            A private place to follow your guest responses and prepare
            for the day you have been dreaming of.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/80 bg-white/65 p-4 backdrop-blur"
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 text-eucalyptus-dark"
                />
                <p className="mt-3 text-sm font-semibold text-forest">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-5 text-ink-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-lg lg:mx-0">
          <ClientLoginForm action={loginClientAction} />
          <p className="mt-5 text-center text-xs leading-5 text-ink-muted">
            Need help accessing your dashboard? Contact Modern Invites
            directly so we can verify your access securely.
          </p>
        </section>
      </div>
    </main>
  );
}
