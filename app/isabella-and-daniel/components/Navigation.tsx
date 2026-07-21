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
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        scrolled ? "border-b border-white/10 bg-[#2b0710]/90 py-3 backdrop-blur-xl" : "py-5 sm:py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="font-instrumentSerif text-2xl tracking-[0.12em] text-[#f6ecdf]" aria-label="Back to top">
          {initials}
        </a>

        <nav className="hidden items-center gap-7 lg:gap-9 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative text-[0.66rem] uppercase tracking-[0.24em] text-[#f6ecdf]/75 transition-colors hover:text-white">
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#d8bd83] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 rounded-full border border-white/20 p-2 text-white md:hidden"
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
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] rounded-sm border border-white/10 bg-[#350a15]/98 p-7 shadow-2xl md:hidden"
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="block border-b border-white/10 py-4 font-instrumentSerif text-2xl text-[#f6ecdf] last:border-0"
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
