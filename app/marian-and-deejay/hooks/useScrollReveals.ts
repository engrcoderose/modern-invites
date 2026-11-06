"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

const DURATION_MS = 800;
const STAGGER_MS = 120;
const MAX_DELAY_MS = 360;
const TARGET = "[data-mj-reveal]";

/** Enhance visible HTML without changing layout or owning existing transforms. */
export default function useScrollReveals(root: RefObject<HTMLDivElement | null>, enabled: boolean, reducedMotion: boolean) {
  const seen = useRef(new WeakSet<HTMLElement>());

  useLayoutEffect(() => {
    const container = root.current;
    if (!enabled || !container) return;

    // Adapt the shared form locally. Later form steps stay immediately readable.
    const formTargets = container.querySelectorAll<HTMLElement>(".mj-rsvp-flow h3, .mj-rsvp-flow p, .mj-rsvp-flow form > div, .mj-rsvp-flow form > button");
    formTargets.forEach(element => {
      if (!element.closest("form > div")) element.dataset.mjReveal = "";
      else if (element.matches("form > div")) element.dataset.mjReveal = "";
    });

    const targets = new Set<HTMLElement>();
    const timers = new Map<HTMLElement, number>();
    const groupStarts = new Map<Element, number>();
    let observer: IntersectionObserver | undefined;
    let additions: MutationObserver | undefined;

    function settle(element: HTMLElement) {
      window.clearTimeout(timers.get(element));
      timers.delete(element);
      element.dataset.mjRevealState = "shown";
      seen.current.add(element);
      observer?.unobserve(element);
    }

    function prepare(element: HTMLElement) {
      if (targets.has(element) || element.parentElement?.closest(TARGET)) return;
      targets.add(element);
      if (reducedMotion || !observer || seen.current.has(element) || element.dataset.mjReveal === "opening" || element.contains(document.activeElement)) {
        settle(element);
        return;
      }
      element.dataset.mjRevealState = "pending";
      // Commit the hidden endpoint before a cached/nearby target can intersect.
      void getComputedStyle(element).opacity;
      observer.observe(element);
    }

    if (!reducedMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        const groups = new Map<Element, HTMLElement[]>();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (seen.current.has(element)) continue;
          const group = element.closest("[data-mj-stagger], section, footer") ?? container;
          groups.set(group, [...(groups.get(group) ?? []), element]);
        }
        for (const [group, elements] of groups) {
          const now = window.performance.now();
          elements.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
          elements.forEach(element => {
            if (document.hidden || element.contains(document.activeElement)) { settle(element); return; }
            // Keep the stagger when siblings intersect in separate scroll frames.
            const previousStart = groupStarts.get(group) ?? now - STAGGER_MS;
            const delay = Math.min(Math.max(0, previousStart + STAGGER_MS - now), MAX_DELAY_MS);
            groupStarts.set(group, now + delay);
            seen.current.add(element);
            observer?.unobserve(element);
            element.style.setProperty("--mj-reveal-delay", `${delay}ms`);
            element.dataset.mjRevealState = "revealing";
            timers.set(element, window.setTimeout(() => settle(element), DURATION_MS + delay));
          });
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    }

    container.querySelectorAll<HTMLElement>(TARGET).forEach(prepare);

    // Gallery frames mount incrementally; observe only newly inserted marked nodes.
    if (observer && "MutationObserver" in window) {
      additions = new MutationObserver(records => {
        for (const record of records) for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(TARGET)) prepare(node);
          node.querySelectorAll<HTMLElement>(TARGET).forEach(prepare);
        }
      });
      additions.observe(container, { childList: true, subtree: true });
    }

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(TARGET);
      if (element && targets.has(element)) settle(element);
    }

    function finishBackgroundAnimations() {
      if (document.hidden) for (const element of timers.keys()) settle(element);
    }

    container.addEventListener("focusin", revealFocusedContent);
    document.addEventListener("visibilitychange", finishBackgroundAnimations);
    return () => {
      observer?.disconnect();
      additions?.disconnect();
      for (const timer of timers.values()) window.clearTimeout(timer);
      for (const element of targets) {
        element.dataset.mjRevealState = "shown";
        element.style.removeProperty("--mj-reveal-delay");
      }
      container.removeEventListener("focusin", revealFocusedContent);
      document.removeEventListener("visibilitychange", finishBackgroundAnimations);
    };
  }, [enabled, reducedMotion, root]);
}
