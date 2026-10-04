"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Monogram from "./Monogram";

const links = [
  ["Home", "invitation"], ["Our Story", "story"], ["Program", "program"],
  ["Entourage", "entourage"], ["Venue", "location"], ["Dress Code", "dress-code"], ["Seat Finder", "seat-finder"], ["Gift Registry", "gifts"], ["FAQ", "faq"], ["RSVP", "rsvp"],
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 50);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  function navigate(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
  }
  return <nav aria-label="Invitation navigation" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }} className={`fixed inset-x-0 top-0 z-50 text-white transition-colors ${scrolled || open ? "bg-[#916c4d]" : "bg-transparent"}`}>
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
      <button type="button" onClick={() => navigate("invitation")} aria-label="Anjo and Jasmin, back to top" className="flex min-h-11 items-center"><Monogram className="h-11 w-11" sizes="44px" light /></button>
      <div className="hidden items-center gap-6 xl:flex">{links.map(([label, id]) => <button key={id} type="button" onClick={() => navigate(id)} className="aj-nav-link relative min-h-11 text-sm">{label}</button>)}</div>
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="invitation-mobile-nav" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center xl:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <motion.div initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} id="invitation-mobile-nav" className="flex max-h-[calc(100svh-68px)] flex-col items-center gap-2 overflow-y-auto border-t border-white/20 bg-[#916c4d] py-5 xl:hidden">{links.map(([label, id]) => <button key={id} type="button" onClick={() => navigate(id)} className="min-h-11 px-8 font-serif text-xl">{label}</button>)}</motion.div>}
  </nav>;
}

