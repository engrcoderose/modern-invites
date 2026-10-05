"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Armchair, LayoutDashboard } from "lucide-react";

export function ClientNavigation({ hasSeatFinder }: { hasSeatFinder: boolean }) {
  const pathname = usePathname();
  const seatingActive = pathname.startsWith("/dashboard/seat-finder");
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: !seatingActive },
    ...(hasSeatFinder ? [{ href: "/dashboard/seat-finder", label: "Seat Finder", icon: Armchair, active: seatingActive }] : []),
  ];
  return <nav aria-label="Client navigation" className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
    {items.map(({ href, label, icon: Icon, active }) => <Link key={href} href={href} aria-current={active ? "page" : undefined}
      className={`flex shrink-0 items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium focus-visible:outline-offset-4 ${active ? "border-forest text-forest" : "border-transparent text-ink-muted hover:text-forest"}`}>
      <Icon aria-hidden="true" className="size-4" />{label}
    </Link>)}
  </nav>;
}
