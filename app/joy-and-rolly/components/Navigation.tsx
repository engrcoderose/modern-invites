"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "../styles/invitation.module.css";

const links = [["celebration", "Details"], ["entourage", "Entourage"], ["attire", "Attire"], ["seat-finder", "Seat Finder"], ["rsvp", "RSVP"]] as const;

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return <header className={`${styles.navigation} sticky top-0 z-30`}>
    <nav aria-label="Invitation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 px-4 py-2 sm:px-8"
      onKeyDown={event => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}>
      <a href="#invitation" aria-label="Joy and Rolly, back to top" onClick={() => setMenuOpen(false)} className={`${styles.smallMonogram} inline-flex min-h-11 min-w-11 items-center`}>J & R</a>
      <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="jr-mobile-navigation"
        onClick={() => setMenuOpen(open => !open)} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-2 text-sm lg:hidden">
        Menu {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>
      <div className="hidden items-center gap-5 lg:flex">{links.map(([id, label]) =>
        <a key={id} href={`#${id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm">{label}</a>)}
      </div>
      <div id="jr-mobile-navigation" hidden={!menuOpen} className="max-h-[60svh] w-full space-y-1 overflow-y-auto overscroll-contain pb-3 lg:hidden">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}
          className="flex min-h-11 w-full items-center justify-center px-3 py-2 text-base">{label}</a>)}
      </div>
    </nav>
  </header>;
}
