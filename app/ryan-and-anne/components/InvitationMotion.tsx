"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "motion";

const revealTiming = { text: 0.85, image: 1.1, stagger: 0.1, maxDelay: 0.3 };

// Progressive enhancement: server-rendered content stays visible without JS.
export default function InvitationMotion({ children, className, enabled = true }: { children: ReactNode; className: string; enabled?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !window.IntersectionObserver) return;
    const container = root.current;
    if (!container) return;
    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"))
      .filter((element) => !element.parentElement?.closest("[data-reveal]"));
    const originals = new Map(elements.map((element) => [element, { opacity: element.style.opacity, translate: element.style.translate }]));
    const pending = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const restore = (element: HTMLElement) => {
      const original = originals.get(element);
      if (!original) return;
      element.style.opacity = original.opacity;
      element.style.translate = original.translate;
    };
    const clear = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.stop());
      animations.clear();
      pending.clear();
      elements.forEach(restore);
    };
    const observer = new IntersectionObserver((entries) => {
      const groups = new Map<Element | null, number>();
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        if (!pending.delete(element)) return;
        observer.unobserve(element);
        const group = element.closest("[data-reveal-group]") ?? element.closest("section, footer");
        const order = groups.get(group) ?? 0;
        groups.set(group, order + 1);
        animations.set(element, animate(element, { opacity: 1, translate: "0px 0px" }, {
          duration: ["image", "fade"].includes(element.dataset.reveal ?? "") ? revealTiming.image : revealTiming.text,
          delay: Math.min(order * revealTiming.stagger, revealTiming.maxDelay),
          ease: [0.22, 1, 0.36, 1],
          onComplete: () => { restore(element); animations.delete(element); },
        }));
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight && !element.contains(document.activeElement)) {
        element.style.opacity = "0";
        // Individual translate preserves the artwork's existing rotation/transform.
        element.style.translate = element.dataset.reveal === "fade" ? "0px 0px" : element.dataset.reveal === "image" ? "0px 28px" : "0px 20px";
        pending.add(element);
        observer.observe(element);
      }
    });
    const revealFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (!element || !originals.has(element)) return;
      observer.unobserve(element);
      pending.delete(element);
      animations.get(element)?.stop();
      animations.delete(element);
      restore(element);
    };
    container.addEventListener("focusin", revealFocusedContent);
    media.addEventListener("change", clear);
    return () => {
      clear();
      container.removeEventListener("focusin", revealFocusedContent);
      media.removeEventListener("change", clear);
    };
  }, [enabled]);
  return <div ref={root} className={className}>{children}</div>;
}
