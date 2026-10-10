"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { wedding } from "../data/wedding-data";

const links = [
  { href: "#story", label: "Our story" },
  { href: "#details", label: "The day" },
  { href: "#entourage", label: "Entourage" },
  { href: "#attire", label: "Attire" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("jb-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="jb-navigation sticky top-0 z-40 border-b border-[rgb(var(--jb-sage))]/15">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label={`${wedding.couple.display}, back to top`} className="jb-serif flex min-h-11 items-center text-2xl italic">{wedding.couple.initials}</a>
        <span className="text-xs tracking-[0.16em] text-[#65705e] md:hidden">{wedding.date.short}</span>
        <button id="jb-menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="jb-navigation-links" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-full md:hidden">
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav id="jb-navigation-links" aria-label="Invitation sections" className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-[72px] flex-col gap-1 border-b border-[rgb(var(--jb-sage))]/15 bg-[rgb(var(--jb-paper))] p-5 shadow-sm md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          {links.map(({ href, label }) => <a key={href} href={href} onClick={() => setOpen(false)} className={`flex min-h-11 items-center justify-center px-4 text-sm md:px-0 ${href === "#rsvp" ? "jb-nav-rsvp rounded-full border border-[rgb(var(--jb-sage))]/35 md:px-6" : "jb-nav-link"}`}>{label}</a>)}
        </nav>
      </div>
    </header>
  );
}
