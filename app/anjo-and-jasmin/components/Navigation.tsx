"use client";

import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { useReducedMotion } from "motion/react";

const links = [
  ["Home", "top"], ["Our Story", "story"], ["Program", "program"],
  ["Entourage", "entourage"], ["Location", "location"], ["Gift Registry", "gifts"], ["FAQ", "faq"], ["RSVP", "rsvp"],
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
  return <nav aria-label="Invitation navigation" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }} className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || open ? "bg-[#fffdf8]/95 text-[#624451] shadow-sm backdrop-blur" : "bg-transparent text-white"}`}>
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
      <button type="button" onClick={() => navigate("top")} aria-label="Anjo and Jasmin, back to top" className="flex min-h-11 items-center gap-3 font-serif text-xl"><Heart size={20} className="fill-[#eac8cd] text-[#eac8cd]" /> A &amp; J</button>
      <div className="hidden items-center gap-6 lg:flex">{links.map(([label, id]) => <button key={id} type="button" onClick={() => navigate(id)} className="min-h-11 text-sm hover:underline underline-offset-8">{label}</button>)}</div>
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="invitation-mobile-nav" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center lg:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div id="invitation-mobile-nav" className="flex max-h-[calc(100svh-68px)] flex-col items-center gap-2 overflow-y-auto border-t border-[#ead7df] bg-[#fffdf8] py-5 lg:hidden">{links.map(([label, id]) => <button key={id} type="button" onClick={() => navigate(id)} className="min-h-11 px-8 font-serif text-xl">{label}</button>)}</div>}
  </nav>;
}

