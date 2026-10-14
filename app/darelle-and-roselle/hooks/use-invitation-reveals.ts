"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { animate, useReducedMotion } from "framer-motion";

const selectors = "[data-dr-reveal], h1, h2:not(.sr-only), h3, h4, p, ul, ol, details, dl";
const revealEase = [0.22, 1, 0.36, 1] as const;
const revealDistance = 10;

export function useInvitationReveals(content: RefObject<HTMLDivElement | null>, ready: boolean, enhanced: boolean) {
  const reducedMotion = useReducedMotion() === true;
  const revealed = useRef(new WeakSet<HTMLElement>());
  useLayoutEffect(() => {
    const root = content.current;
    if (!root || !enhanced) return;
    const revealedTargets = revealed.current;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selectors))
      .filter((target) => !target.closest("header"));
    // A name list or FAQ is one group; do not animate its nested text twice.
    const groups = targets.filter((target) => !targets.some((parent) => parent !== target && parent.contains(target)));
    const baseline = new Map(groups.map((target) => [target, { opacity: target.style.opacity, transform: target.style.transform }]));
    const navigation = root.querySelector<HTMLElement>("header");
    const navigationOpacity = navigation?.style.opacity ?? "";
    const animations: Array<ReturnType<typeof animate>> = [];
    const restore = () => {
      groups.forEach((target) => {
        const original = baseline.get(target);
        target.style.opacity = original?.opacity ?? "";
        target.style.transform = original?.transform ?? "";
      });
      if (navigation) navigation.style.opacity = navigationOpacity;
    };
    if (!ready) {
      // Preserve the stationary logo for the cover's shared-element handoff.
      groups.filter((target) => target.closest("#invitation")).forEach((target) => { target.style.opacity = "0"; });
      if (navigation) navigation.style.opacity = "0";
      return restore;
    }
    if (reducedMotion || !window.IntersectionObserver) { restore(); return; }
    const navigationAnimation = navigation
      ? animate(0, 1, { duration: 0.65, onUpdate: (opacity) => { navigation.style.opacity = String(opacity); } })
      : undefined;
    if (navigationAnimation) animations.push(navigationAnimation);
    const active = new Map<HTMLElement, ReturnType<typeof animate>>();

    // Prepare offscreen text before observing it, so entering the viewport never
    // shows the finished text first and then hides it for a second appearance.
    const pending = groups.filter((target) => !revealedTargets.has(target));
    pending.forEach((target) => {
      target.style.opacity = "0";
      if (!target.closest("#invitation")) target.style.transform = `translateY(${revealDistance}px)`;
    });

    const startReveal = (target: HTMLElement) => {
      if (revealedTargets.has(target)) return;
      revealedTargets.add(target);
      const openingReveal = Boolean(target.closest("#invitation"));
      const siblings = groups.filter((group) => group.closest("section") === target.closest("section"));
      const index = siblings.indexOf(target);
      const timing = {
        duration: openingReveal ? 0.5 : 0.85,
        delay: openingReveal ? Math.min(index * 0.08, 0.48) : 0.4 + Math.min(index * 0.07, 0.42),
        ease: openingReveal ? "easeInOut" : revealEase,
        onComplete: () => {
          target.style.opacity = "1";
          if (!openingReveal) target.style.transform = "translateY(0px)";
          active.delete(target);
        },
      } as const;
      // Persist opacity and movement inline, including their final values, so
      // completing a temporary native fill cannot expose the hidden baseline.
      const animation = animate(0, 1, {
        ...timing,
        onUpdate: (progress) => {
          target.style.opacity = String(progress);
          if (!openingReveal) target.style.transform = `translateY(${revealDistance * (1 - progress)}px)`;
        },
      });
      active.set(target, animation);
      animations.push(animation);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        const target = entry.target as HTMLElement;
        observer.unobserve(target);
        startReveal(target);
      });
    }, { threshold: 0.08 });
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      if (navigation?.contains(event.target)) {
        navigationAnimation?.stop(); navigation.style.opacity = "1";
      }
      groups.filter((target) => target.contains(event.target as Node)).forEach((target) => {
        observer.unobserve(target); revealedTargets.add(target);
        active.get(target)?.stop(); active.delete(target);
        target.style.opacity = "1";
        if (!target.closest("#invitation")) target.style.transform = "translateY(0px)";
      });
    };
    root.addEventListener("focusin", revealFocused);
    pending.forEach((target) => {
      if (target.closest("#invitation")) startReveal(target);
      else observer.observe(target);
    });
    return () => {
      root.removeEventListener("focusin", revealFocused);
      observer.disconnect();
      animations.forEach((animation) => animation.stop());
      restore();
      // Cleanup can interrupt an entrance; already revealed groups stay usable.
      groups.filter((target) => revealedTargets.has(target)).forEach((target) => { target.style.opacity = "1"; });
      if (navigation) navigation.style.opacity = "1";
    };
  }, [content, ready, enhanced, reducedMotion]);
}
