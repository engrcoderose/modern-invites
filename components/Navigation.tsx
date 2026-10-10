"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircleHeart, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { CONTACT_URL } from "@/lib/site";
import useMarketingReducedMotion from "./landing/useMarketingReducedMotion";

const navigationItems = [
  { label: "Work", href: "/#featured-work" },
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-champagne"
      style={{ scaleX: smoothProgress }}
    />
  );
}

export default function Navigation() {
  const prefersReducedMotion = useMarketingReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    if (mobileNavigationRef.current?.contains(document.activeElement)) {
      mobileMenuButtonRef.current?.focus();
    }
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) closeMobileMenu();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeMobileMenu, isMobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-forest/10 bg-ivory/95 shadow-[0_8px_28px_-22px] shadow-forest/50 backdrop-blur-xl"
          : "border-transparent bg-ivory/70 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="group inline-flex min-h-11 items-center gap-3" aria-label="Modern Invites home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest font-instrumentSerif text-lg italic text-white transition motion-safe:group-hover:rotate-6">
            M
          </span>
          <span className="font-instrumentSerif text-2xl tracking-[-0.02em] text-forest">Modern Invites</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link key={item.label} href={item.href} className="inline-flex min-h-11 min-w-11 items-center justify-center text-xs font-semibold text-marketing-muted transition hover:text-forest">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 py-2 text-xs font-bold text-white transition motion-safe:hover:-translate-y-0.5 hover:bg-forest-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
          >
            Start your invitation
            <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest lg:hidden"
          onClick={() => {
            if (isMobileMenuOpen) closeMobileMenu();
            else setIsMobileMenuOpen(true);
          }}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        ref={mobileNavigationRef}
        id="mobile-navigation"
        inert={!isMobileMenuOpen}
        aria-hidden={!isMobileMenuOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
          isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-forest/10 bg-ivory px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-ink transition hover:bg-white hover:text-forest"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"
            >
              Start your invitation
              <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      {!prefersReducedMotion && <ScrollProgress />}
    </header>
  );
}
