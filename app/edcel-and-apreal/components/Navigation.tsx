"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Monogram from "./Monogram";
import { navigationLinks } from "../data/navigation";
import { wedding } from "../data/wedding";
import { startInvitationMusic } from "../lib/media-events";
import styles from "../styles/invitation.module.css";
import navigation from "../styles/navigation.module.css";

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!expanded) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOutside = (event: Event) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setExpanded(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setExpanded(false);
      toggle.current?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("click", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("click", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [expanded]);

  function navigate(id: string) {
    setExpanded(false);
    if (id !== "prenup-film") startInvitationMusic();
    window.requestAnimationFrame(() => {
      const section = document.getElementById(id);
      const destination = section?.querySelector<HTMLElement>("h1, h2") ?? section;
      if (!destination) return;
      const originalTabIndex = destination.getAttribute("tabindex");
      destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
      if (originalTabIndex === null) destination.addEventListener("blur", () => destination.removeAttribute("tabindex"), { once: true });
    });
  }

  return <header ref={header} className={`${styles.navigation} sticky top-0 z-40 px-5 sm:px-8`}
    onBlur={event => {
      if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
    }}>
    <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5">
      <a href="#prenup-film" onClick={() => navigate("prenup-film")} className="shrink-0 mix-blend-multiply px-1 py-2" aria-label={`${wedding.couple.display}, back to top`}>
        <Monogram variant="burgundyMark" className="w-11" sizes="44px" />
      </a>
      <div className="flex items-center gap-6">
        <nav aria-label="Invitation" className="hidden items-center gap-5 text-xs xl:flex">
          {navigationLinks.filter(link => link.desktop).map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => navigate(id)}
            className={id === "rsvp" ? `${styles.navRsvp} px-4 py-2.5` : "py-4"}>{label}</a>)}
        </nav>
        <button ref={toggle} type="button" aria-expanded={expanded} aria-controls="ea-navigation-sections"
          aria-label={expanded ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setExpanded(value => !value)} className="flex min-h-11 min-w-11 items-center justify-center gap-2 border border-[var(--ea-line)] px-3 xl:px-4">
          <span className="hidden text-xs xl:inline">All sections</span>
          {expanded ? <X size={21} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={21} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </div>
    </div>
    <nav ref={panel} id="ea-navigation-sections" aria-label="All invitation sections" hidden={!expanded} data-text-motion-skip
      className={`${navigation.panel} absolute inset-x-0 top-full max-h-[calc(100svh-65px)] overflow-y-auto overscroll-contain border-b border-[var(--ea-line)]`}>
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-5 sm:px-8">
        <p className={`${navigation.title} mb-4`}>Explore the invitation</p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3 xl:grid-cols-4">
          {navigationLinks.map(({ id, label }) => <li key={id}>
            <a href={`#${id}`} onClick={() => navigate(id)} className={`${navigation.link} flex min-h-11 items-center py-2 text-[13px] sm:text-sm`}>{label}</a>
          </li>)}
        </ul>
      </div>
    </nav>
  </header>;
}
