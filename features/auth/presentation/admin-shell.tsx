import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AdminShellProps {
  children: ReactNode;
  email: string | null;
  logoutAction: () => Promise<void>;
}

const navigationItems = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/clients",
    label: "Clients",
    icon: Users,
  },
] as const;

export function AdminShell({
  children,
  email,
  logoutAction,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-ink">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/admin"
              className="font-elegant text-2xl font-medium text-forest"
            >
              Modern Invites
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              Administration
            </p>
          </div>

          <div className="flex items-center gap-3">
            {email ? (
              <span className="hidden text-sm text-ink-muted sm:inline">
                {email}
              </span>
            ) : null}

            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut aria-hidden="true" />
                Sign out
              </Button>
            </form>
          </div>
        </div>

        <nav
          aria-label="Administrator navigation"
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8"
        >
          {navigationItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm font-medium text-ink-muted transition hover:border-eucalyptus hover:text-forest"
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
