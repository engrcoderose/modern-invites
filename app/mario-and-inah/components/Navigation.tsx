"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "../styles/invitation.module.css";

const links = [
  { href: "#entourage", label: "Entourage" },
  { href: "#gallery", label: "Gallery" },
  { href: "#celebration", label: "Venue" },
  { href: "#attire", label: "Attire" },
  { href: "#gifts", label: "Gifts" },
  { href: "#faq", label: "FAQs" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <nav aria-label="Invitation sections" className={`${styles.navigation} fixed inset-x-0 top-0 z-40`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          setExpanded(false);
          toggle.current?.focus();
        }
      }}>
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-6 px-6 md:px-10">
        <a href="#mi-invitation" onClick={() => setExpanded(false)}
          className={`${styles.navigationNames} inline-flex min-h-11 items-center`}>Mario &amp; Inah</a>
        <button ref={toggle} type="button" aria-expanded={expanded} aria-controls="mi-navigation-links"
          onClick={() => setExpanded(!expanded)} className="flex min-h-11 min-w-11 items-center justify-center lg:hidden">
          {expanded ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          <span className="sr-only">{expanded ? "Close menu" : "Open menu"}</span>
        </button>
        <ul id="mi-navigation-links" className={`${expanded ? "flex" : "hidden"} max-h-[calc(100dvh-4rem)] w-full flex-col gap-1 overflow-y-auto pb-4 lg:flex lg:max-h-none lg:w-auto lg:flex-row lg:items-center lg:gap-5 lg:overflow-visible lg:pb-0`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={() => setExpanded(false)}
                className={`${href === "#rsvp" ? styles.button : styles.navigationLink} flex min-h-11 items-center justify-center px-4 text-sm md:px-3`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
