"use client";

import { useEffect, type RefObject } from "react";
import styles from "../styles/text-motion.module.css";

const textSelector = 'main h2, main h3, main p, main address, main figcaption, main summary, main label, main legend, main li, main time, main a[href], main button, footer p, footer a[href], nav a[href], main [data-reveal="timer"], main [data-reveal="image"], main figure[data-reveal]';
const revealTiming = { stagger: 90, maxDelay: 360 };

export default function useInvitationTextMotion(root: RefObject<HTMLDivElement | null>, opened: boolean) {
  useEffect(() => {
    const container = root.current;
    if (!opened || !container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !window.IntersectionObserver) return;

    const candidates = [...container.querySelectorAll<HTMLElement>(textSelector)]
      .filter(element => !element.closest('#home, [aria-hidden="true"], [data-text-motion-skip], .sr-only') && !element.classList.contains("sr-only"));
    const candidatesSet = new Set(candidates);
    // Keep whole words and script lettering intact; animate the smallest readable block.
    const elements = candidates.filter(element => {
      if (element.tagName === "LI") return ![...element.querySelectorAll<HTMLElement>("*")].some(child => candidatesSet.has(child));
      return !candidates.some(parent => parent !== element && parent.tagName !== "LI" && parent.contains(element));
    });
    const pending = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      const groups = new Map<Element | null, number>();
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        if (!pending.delete(element)) return;
        observer.unobserve(element);
        const group = element.closest("article, section, footer");
        const order = groups.get(group) ?? 0;
        groups.set(group, order + 1);
        element.style.setProperty("--ea-text-delay", `${Math.min(order * revealTiming.stagger, revealTiming.maxDelay)}ms`);
        element.dataset.eaTextReveal = "visible";
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -16px 0px" });

    elements.forEach(element => {
      element.classList.add(styles.text);
      const heading = /^H[23]$/.test(element.tagName);
      element.dataset.eaTextKind = heading ? "heading" : "body";
      const bounds = element.getBoundingClientRect();
      if (bounds.height && bounds.top < window.innerHeight && bounds.bottom > 0) {
        element.dataset.eaTextReveal = "initial";
      } else if (bounds.bottom >= 0 || !bounds.height) {
        element.dataset.eaTextReveal = "pending";
        pending.add(element);
        observer.observe(element);
      }
    });

    const revealFocusedText = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-ea-text-reveal]");
      if (!element) return;
      pending.delete(element);
      observer.unobserve(element);
      element.dataset.eaTextReveal = "visible";
      element.style.setProperty("--ea-text-delay", "0ms");
    };
    const clear = () => {
      observer.disconnect();
      pending.clear();
      elements.forEach(element => {
        element.classList.remove(styles.text);
        delete element.dataset.eaTextReveal;
        delete element.dataset.eaTextKind;
        element.style.removeProperty("--ea-text-delay");
      });
    };
    container.addEventListener("focusin", revealFocusedText);
    preference.addEventListener("change", clear);
    return () => {
      clear();
      container.removeEventListener("focusin", revealFocusedText);
      preference.removeEventListener("change", clear);
    };
  }, [opened, root]);
}
