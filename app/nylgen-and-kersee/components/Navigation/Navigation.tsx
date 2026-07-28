"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Leaf, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import type { WeddingData } from "../../data/weddingData";
import clientLogo from "../../assets/initials.webp";

type NavigationProps = {
  data: Pick<WeddingData, "couple">;
};

const navigationItems = [
  { label: "Invitation", href: "#invitation", sectionId: "invitation" },
  { label: "Gallery", href: "#gallery", sectionId: "gallery" },
  { label: "Details", href: "#event-details", sectionId: "event-details" },
  { label: "Entourage", href: "#entourage", sectionId: "entourage" },
  {
    label: "Timeline",
    href: "#wedding-timeline",
    sectionId: "wedding-timeline",
  },
  { label: "Attire", href: "#attire", sectionId: "attire" },
  { label: "Photos", href: "#hashtag", sectionId: "hashtag" },
] as const;

export function Navigation({ data }: NavigationProps) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "hero",
      ...navigationItems.map(({ sectionId }) => sectionId),
      "rsvp",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const isSolid = isScrolled || isOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
          isSolid
            ? "border-wedding-line/25 bg-wedding-paper/95 shadow-[0_8px_35px_rgb(55_67_55/.06)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Wedding invitation navigation"
          className="mx-auto flex h-[4.5rem] w-full max-w-wedding-wide items-center justify-between px-wedding-gutter"
        >
          <a
            href="#hero"
            onClick={closeMenu}
            className="group flex items-center gap-3 text-wedding-sage-deep"
            aria-label={`${data.couple.groom.firstName} and ${data.couple.bride.firstName}, back to top`}
          >
            <span className="relative size-9 overflow-hidden rounded-full border border-wedding-line/60 bg-wedding-paper shadow-sm transition-transform duration-300 group-hover:rotate-[-5deg]">
              <Image
                src={clientLogo}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="hidden font-wedding-display text-lg leading-none tracking-[-0.02em] sm:block">
              {data.couple.groom.firstName}
              <span className="mx-1.5 font-wedding-script text-xl text-wedding-gold">
                &amp;
              </span>
              {data.couple.bride.firstName}
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.sectionId;

              return (
                <a
                  key={item.sectionId}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative py-2 font-sans text-[0.61rem] font-medium uppercase tracking-[0.19em] transition-colors duration-300",
                    isActive
                      ? "text-wedding-sage-deep"
                      : "text-wedding-sage hover:text-wedding-sage-deep",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-center bg-wedding-gold transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}

            <a
              href="#rsvp"
              aria-current={activeSection === "rsvp" ? "location" : undefined}
              className="rounded-full border border-wedding-sage/55 bg-wedding-sage-deep px-5 py-2.5 font-sans text-[0.61rem] font-medium uppercase tracking-[0.2em] text-wedding-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-wedding-sage"
            >
              RSVP
            </a>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="wedding-mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-wedding-line/55 bg-wedding-paper/85 text-wedding-sage-deep shadow-sm backdrop-blur-sm transition-colors hover:bg-wedding-mist lg:hidden"
          >
            {isOpen ? (
              <X className="size-4 stroke-[1.4]" aria-hidden="true" />
            ) : (
              <Menu className="size-4 stroke-[1.4]" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="wedding-mobile-navigation"
            className="fixed inset-0 z-40 grid bg-wedding-ivory px-wedding-gutter pb-10 pt-[5.5rem] lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_90%_15%,rgb(var(--wedding-color-sage-soft)/.7),transparent_28%),radial-gradient(circle_at_5%_92%,rgb(var(--wedding-color-mist)),transparent_35%)]"
            />

            <motion.nav
              aria-label="Mobile wedding invitation navigation"
              className="relative mx-auto flex w-full max-w-md flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: reduceMotion ? 0 : 0.08,
                    staggerChildren: reduceMotion ? 0 : 0.055,
                  },
                },
              }}
            >
              <div className="mb-7 flex items-center gap-3 text-wedding-sage">
                <span className="h-px flex-1 bg-wedding-line/60" />
                <Leaf className="size-3.5 stroke-[1.2]" aria-hidden="true" />
                <span className="font-sans text-[0.58rem] uppercase tracking-[0.28em]">
                  Explore our day
                </span>
                <span className="h-px flex-1 bg-wedding-line/60" />
              </div>

              {[
                ...navigationItems,
                { label: "RSVP", href: "#rsvp", sectionId: "rsvp" },
              ].map((item, index) => (
                <motion.a
                  key={item.sectionId}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={
                    activeSection === item.sectionId ? "location" : undefined
                  }
                  className={cn(
                    "group flex items-center justify-between border-b border-wedding-line/25 py-3.5 font-wedding-display text-[clamp(1.8rem,8vw,2.55rem)] leading-none tracking-[-0.035em] transition-colors",
                    activeSection === item.sectionId
                      ? "text-wedding-sage-deep"
                      : "text-wedding-sage hover:text-wedding-sage-deep",
                  )}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-[0.55rem] tracking-[0.22em] text-wedding-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}

              <p className="mt-8 text-center font-wedding-body text-[0.65rem] italic tracking-[0.15em] text-wedding-sage">
                {data.couple.tagline}
              </p>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
