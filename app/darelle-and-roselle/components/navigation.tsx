"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "../styles/invitation.module.css";
import { wedding } from "../data/wedding";
import Monogram from "./monogram";

const links = [
  ["The Wedding Venue", "the-day"],
  ["Entourage", "entourage"],
  ["RSVP", "rsvp"],
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className={`${styles.navigation} sticky top-0 z-30`} onKeyDown={(event) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="mx-auto flex min-h-[70px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-10">
        <a href="#invitation" className="flex min-h-11 shrink-0 items-center py-1" aria-label="Roselle and Darell, back to invitation"><Monogram framed={false} className="w-[48px]" sizes="110px" /></a>
        <span className={`${styles.navDate} mr-auto hidden pl-4 sm:block`}>{wedding.date}</span>
        <nav className={`${styles.navLinks} hidden items-center gap-8 lg:flex`} aria-label="Wedding navigation">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center px-2">{label}</a>)}
        </nav>
        <button ref={toggle} type="button" className="flex h-11 w-11 items-center justify-center lg:hidden" aria-expanded={open} aria-controls="dr-mobile-navigation" aria-label={open ? "Close wedding navigation" : "Open wedding navigation"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      <nav id="dr-mobile-navigation" aria-label="Mobile wedding navigation" hidden={!open} className={`${styles.mobileNavigation} px-6 pb-4 lg:hidden`}>
        {links.map(([label, id]) => <a key={id} href={`#${id}`} className="flex min-h-12 items-center justify-between" onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}
