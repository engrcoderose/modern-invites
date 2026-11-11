"use client";

import { useEffect } from "react";

const DURATION = 850;
const STAGGER = 120;
const MAX_DELAY = 600;

export default function InvitationMotion() {
  useEffect(() => {
    const root = document.getElementById("ashley-invitation");
    if (!root || !("IntersectionObserver" in window)) return;
    // Animate established form groups without changing shared RSVP components.
    root.querySelectorAll<HTMLElement>(
      '#rsvp section[aria-label^="RSVP for"] > h3, #rsvp section[aria-label^="RSVP for"] > p, #rsvp form > fieldset > div, #rsvp form > fieldset > fieldset, #rsvp form > button',
    ).forEach((element, index) => {
      element.dataset.reveal = "form";
      element.dataset.revealDelay = String(Math.min(index * STAGGER, MAX_DELAY));
    });
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealed = new WeakSet<Element>();
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | null = null;

    function stop() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      targets.forEach(element => element.removeAttribute("data-reveal-state"));
    }

    function observe() {
      stop();
      if (preference.matches || document.hidden) return;

      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting || revealed.has(entry.target)) continue;
          const element = entry.target as HTMLElement;
          revealed.add(element);
          observer?.unobserve(element);
          element.removeAttribute("data-reveal-state");
          const opacity = Number(getComputedStyle(element).opacity);
          try {
            const animation = element.animate([
              { opacity: 0, translate: "0 24px" },
              { opacity, translate: "0 0" },
            ], {
              duration: DURATION,
              delay: Math.min(Number(element.dataset.revealDelay || 0), MAX_DELAY),
              easing: "cubic-bezier(0.42, 0, 0.58, 1)",
              // Hide during the stagger delay; final appearance remains in rendered CSS.
              fill: "backwards",
            });
            animations.set(element, animation);
            void animation.finished.catch(() => undefined).finally(() => animations.delete(element));
          } catch {
            // Unsupported animation features must never leave content hidden.
            element.removeAttribute("data-reveal-state");
          }
        }
      }, { threshold: 0.1 });

      targets.forEach(element => {
        if (!revealed.has(element) && typeof element.animate === "function") {
          element.dataset.revealState = "pending";
          observer?.observe(element);
        }
      });
    }

    function showFocusedElement(event: FocusEvent) {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-reveal]");
      if (!element || !root?.contains(element)) return;
      revealed.add(element);
      observer?.unobserve(element);
      animations.get(element)?.cancel();
      animations.delete(element);
      element.removeAttribute("data-reveal-state");
    }

    observe();
    preference.addEventListener("change", observe);
    document.addEventListener("visibilitychange", observe);
    root.addEventListener("focusin", showFocusedElement);
    return () => {
      stop();
      preference.removeEventListener("change", observe);
      document.removeEventListener("visibilitychange", observe);
      root.removeEventListener("focusin", showFocusedElement);
    };
  }, []);

  return null;
}
