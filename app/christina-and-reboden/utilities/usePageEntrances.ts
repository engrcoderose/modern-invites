"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import styles from "../styles/entrances.module.css";

const selector = "[data-cr-reveal]";
const staggerMs = 120;
const maximumDelayMs = 600;

/** Reveal each content group once, after its page settles and it enters view. */
export default function usePageEntrances(root: RefObject<HTMLElement | null>, ready: boolean) {
  const seen = useRef(new WeakSet<HTMLElement>());

  useLayoutEffect(() => {
    const page = root.current;
    if (!page) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;

    function containsKeyboardFocus(element: HTMLElement) {
      const focused = document.activeElement;
      return focused instanceof HTMLElement && focused.matches(":focus-visible") && element.contains(focused);
    }

    function settle(element: HTMLElement) {
      seen.current.add(element);
      observer?.unobserve(element);
      element.dataset.crRevealState = "settled";
      element.style.removeProperty("--cr-reveal-delay");
    }

    function prepare(element: HTMLElement) {
      // Compositions such as a framed photo move as one group, without doubling
      // the movement on nested headings, images, or controls.
      if (element.parentElement?.closest(selector)) return;
      targets.add(element);
      element.classList.add(styles.item);
      if (preference.matches || !("IntersectionObserver" in window) || containsKeyboardFocus(element)) {
        settle(element);
      } else if (!seen.current.has(element)) {
        element.dataset.crRevealState = "pending";
        observer?.observe(element);
      }
    }

    function collect(node: HTMLElement) {
      if (node.matches(selector)) prepare(node);
      node.querySelectorAll<HTMLElement>(selector).forEach(prepare);
    }

    function configure() {
      observer?.disconnect();
      observer = undefined;
      for (const element of targets) {
        if (element.dataset.crRevealState === "entering") settle(element);
      }
      if (preference.matches || !("IntersectionObserver" in window)) {
        targets.forEach(settle);
        return;
      }
      if (!ready || document.hidden) return;

      observer = new IntersectionObserver(entries => {
        if (document.hidden) return;
        const entering = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= .12)
          .map(entry => entry.target as HTMLElement)
          .filter(element => !seen.current.has(element))
          .sort((left, right) => left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        entering.forEach((element, index) => {
          if (containsKeyboardFocus(element)) { settle(element); return; }
          seen.current.add(element);
          observer?.unobserve(element);
          element.style.setProperty("--cr-reveal-delay", `${Math.min(index * staggerMs, maximumDelayMs)}ms`);
          element.dataset.crRevealState = "entering";
        });
      }, { root: page, threshold: .12, rootMargin: "0px 0px -16px 0px" });
      for (const element of targets) if (!seen.current.has(element)) observer.observe(element);
    }

    function finish(event: TransitionEvent) {
      if (event.propertyName !== "opacity" || !(event.target instanceof HTMLElement)) return;
      if (targets.has(event.target) && event.target.dataset.crRevealState === "entering") settle(event.target);
    }

    function showFocusedContent(event: FocusEvent) {
      // Pointer focus happens between pointerdown and click. Snapping a moving
      // button then can move it out from under the guest's finger.
      if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
      for (const element of targets) if (element.contains(event.target)) settle(element);
    }

    // New RSVP fields and completion content use the same entrance rules.
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        record.removedNodes.forEach(node => {
          if (node instanceof HTMLElement) for (const element of targets) {
            if (node === element || node.contains(element)) { observer?.unobserve(element); targets.delete(element); }
          }
        });
        record.addedNodes.forEach(node => { if (node instanceof HTMLElement) collect(node); });
      }
    });

    collect(page);
    configure();
    mutations.observe(page, { childList: true, subtree: true });
    page.addEventListener("transitionend", finish);
    page.addEventListener("focusin", showFocusedContent);
    preference.addEventListener("change", configure);
    document.addEventListener("visibilitychange", configure);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      targets.forEach(element => { if (element.dataset.crRevealState === "entering") settle(element); });
      page.removeEventListener("transitionend", finish);
      page.removeEventListener("focusin", showFocusedContent);
      preference.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", configure);
    };
  }, [root, ready]);
}
