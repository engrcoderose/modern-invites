"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "countdown", label: "Details" },
  { id: "rsvp", label: "RSVP" },
] as const;

type Destination = typeof links[number]["id"];

export default function InvitationNavigation() {
  const [active, setActive] = useState<Destination>("home");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = ["home", "countdown", "venue", "rsvp"]
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      const current = sections.filter(section => visible.has(section)).at(-1);
      if (current) setActive(current.id === "venue" ? "countdown" : current.id as Destination);
    }, { rootMargin: "-72px 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Invitation sections" className="sticky top-0 z-40 flex h-[72px] items-center justify-center border-b border-[#eee6f0] bg-white">
      <ul className="flex items-center justify-center gap-5 sm:gap-12">
        {links.map(link => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => setActive(link.id)}
              className="relative inline-flex min-h-[72px] items-center px-2 text-[10px] uppercase tracking-[0.28em] text-[#705379] transition-colors hover:text-[#9b3561] sm:text-[11px]"
            >
              {link.label}
              {active === link.id && <span aria-hidden="true" className="absolute bottom-[15px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#a85fba]" />}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
