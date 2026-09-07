"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Our story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Dress code", href: "#dress-code" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

interface NavigationProps {
  initials: string;
}

export default function Navigation({ initials }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const visible = window.scrollY > 80;
      setScrolled(visible);
      if (!visible) setOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ y: scrolled ? 0 : "-100%", opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      inert={!scrolled}
      aria-hidden={!scrolled}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        scrolled ? "border-b border-[#d7acb9]/50 bg-[#f2dce0]/95 py-3 backdrop-blur-xl" : "bg-[#f2dce0] py-5 sm:py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="font-instrumentSerif text-2xl tracking-[0.12em] text-[#624451]" aria-label="Back to top">
          {initials}
        </a>

        <nav className="hidden items-center gap-7 lg:gap-9 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative text-[0.66rem] uppercase tracking-[0.24em] text-[#73515f] transition-colors hover:text-[#432d37]">
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#ad758a] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 rounded-full border border-[#ad758a]/40 p-2 text-[#624451] md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] rounded-sm border border-[#d7acb9]/50 bg-[#f2dce0] p-7 shadow-2xl md:hidden"
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="block border-b border-[#ad758a]/25 py-4 font-instrumentSerif text-2xl text-[#624451] last:border-0"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
