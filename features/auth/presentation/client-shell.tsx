import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ClientShellProps {
  children: ReactNode;
  displayName: string;
  email: string | null;
  logoutAction: () => Promise<void>;
}

export function ClientShell({
  children,
  displayName,
  email,
  logoutAction,
}: ClientShellProps) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-eucalyptus-dark">
              Modern Invites
            </p>
            <p className="mt-1 truncate font-elegant text-xl text-forest">
              Client Dashboard
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="truncate text-sm font-medium text-ink">
                {displayName}
              </p>
              {email ? (
                <p className="truncate text-xs text-ink-muted">{email}</p>
              ) : null}
            </div>

            <form action={logoutAction}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="bg-white"
              >
                <LogOut aria-hidden="true" className="size-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="border-b border-black/5 bg-white/55">
        <nav
          aria-label="Client navigation"
          className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 border-b-2 border-forest px-1 py-3 text-sm font-medium text-forest"
          >
            <LayoutDashboard aria-hidden="true" className="size-4" />
            Dashboard
          </Link>
        </nav>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
