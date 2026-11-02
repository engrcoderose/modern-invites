"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import FloralOrnament from "./FloralOrnament";
import wedding from "../data/wedding-details.json";
import "../styles/invitation.css";

export default function InvitationExperience({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const content = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const opening = useRef(false);
  const finish = () => setPhase("open");

  useEffect(() => {
    if (phase === "open") {
      content.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening") return;
    // Safety handoff if a browser suppresses transitionend (e.g. background tab).
    const fallback = window.setTimeout(finish, 1800);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    if (phase !== "open" || !content.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.25 });
    content.current.querySelectorAll("h2").forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [phase]);

  const palette = Object.fromEntries(wedding.design.palette.map((color, index) => [`--mj-palette-${index}`, color.hex])) as CSSProperties;
  return (
    <div className="mj-invitation" style={palette} data-phase={phase}>
      {phase !== "open" && (
        <div className="mj-cover fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-5 py-8 text-center" role="dialog" aria-modal="true" aria-label="Your wedding invitation"
          onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); openButton.current?.focus(); } }}
          onTransitionEnd={(event) => { if (phase === "opening" && event.target === event.currentTarget && event.propertyName === "opacity") finish(); }}>
          <div className="mj-cover-fold mj-cover-fold-left" aria-hidden="true" />
          <div className="mj-cover-fold mj-cover-fold-right" aria-hidden="true" />
          <div className="mj-cover-card relative m-auto flex min-h-[540px] w-full max-w-2xl shrink-0 flex-col items-center justify-center px-6 py-16 sm:min-h-[620px]">
            <FloralOrnament className="mj-cover-flower absolute bottom-0 left-0 w-32 sm:w-44" />
            <p className="mj-small mb-10">A little envelope, a lifetime of love</p>
            <p className="mj-script text-[clamp(3.8rem,12vw,6rem)] leading-[1.15]">{wedding.couple.display.split(" & ")[0]} <span className="block text-4xl leading-none">&</span> {wedding.couple.display.split(" & ")[1]}</p>
            <p className="mj-small mb-10 mt-9">{wedding.date.display} · Baguio</p>
            <button ref={openButton} className="mj-button inline-flex items-center gap-4 px-7 py-4" disabled={phase === "opening"} onClick={() => {
              if (opening.current) return;
              opening.current = true;
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
              else setPhase("opening");
            }}>Open our invitation <ArrowUpRight size={16} aria-hidden="true" /></button>
            <p className="mt-5 text-xs">We saved a place for you in our story.</p>
          </div>
        </div>
      )}
      <div ref={content} className="mj-content" inert={phase !== "open"} aria-hidden={phase !== "open"}>
        <a href="#celebration" className="mj-skip fixed left-4 top-4 z-40 px-5 py-3">Skip to wedding details</a>
        <header className="mj-navigation sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-4 sm:px-10">
          <a href="#home" className="mj-monogram shrink-0 whitespace-nowrap text-2xl" aria-label="Marian and Dee Jay, back to top">M <span>&</span> D</a>
          <nav aria-label="Invitation navigation" className="flex items-center gap-3 whitespace-nowrap text-[11px] sm:gap-8 sm:text-xs">
            <a href="#celebration">The day</a><a href="#details">Guest guide</a><a className="mj-nav-rsvp px-3 py-2 sm:px-4" href="#rsvp">Kindly reply <ArrowDown className="ml-1 hidden sm:inline" size={12} aria-hidden="true" /></a>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
