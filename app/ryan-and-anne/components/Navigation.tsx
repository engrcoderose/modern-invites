"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import monogram from "../assets/design/Copy of Monogram.png";
import { dateLabels, wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

const links = [
  { href: "#invitation", label: "Invitation" },
  { href: "#countdown", label: "Countdown" },
  { href: "#story", label: "Our story" },
  { href: "#details", label: "Venues" },
  { href: "#schedule", label: "Schedule" },
  { href: "#entourage", label: "Entourage" },
  { href: "#attire", label: "Attire" },
  { href: "#hashtag", label: "Hashtag" },
  { href: "#gallery", label: "Gallery" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d1b788]/20 bg-[#171714]/95 text-[#f5f0e6] backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); }
      }}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <a href="#top" onClick={() => setOpen(false)} aria-label={`${wedding.title}, back to top`} className="flex shrink-0 items-center gap-3">
          <Image src={monogram} alt="" priority sizes="(min-width:640px) 96px, 80px" className="h-auto w-20 shrink-0 sm:w-24" />
          <span className={`${styles.eyebrow} hidden border-l border-[#d1b788]/30 pl-3 text-[9px] sm:block`}>{dateLabels.short}</span>
        </a>
        <nav aria-label="Wedding navigation" className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {links.map((link) => <a key={link.href} href={link.href} className={`${styles.navLink} whitespace-nowrap`}>{link.label}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a href="#rsvp" onClick={() => setOpen(false)} className={`${styles.navLink} border border-[#d1b788]/60 px-5 py-3 text-[#ead9b8]`}>RSVP</a>
          <button ref={button} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="ra-mobile-navigation"
            onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center xl:hidden">
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav ref={mobileNav} id="ra-mobile-navigation" aria-label="Mobile wedding navigation" hidden={!open} className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-[#d1b788]/20 px-6 py-5 xl:hidden">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={`${styles.navLink} py-3`}>{link.label}</a>)}</div>
      </nav>
    </header>
  );
}
