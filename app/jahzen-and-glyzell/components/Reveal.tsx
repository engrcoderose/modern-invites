"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { entranceFrames, entranceMotion } from "../lib/entrance-motion";

export default function Reveal({ children, className = "", delay = 0, stagger = true }: { children: ReactNode; className?: string; delay?: number; stagger?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState("ready");
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || typeof element.animate !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) { setPhase("settled"); return; }
    const marked = Array.from(element.querySelectorAll("[data-reveal-item]"))
      .filter(target => target.closest("[data-reveal]") === element);
    const targets = stagger ? (marked.length ? marked : Array.from(element.children).filter(child => !child.hasAttribute("data-reveal"))) : [element];
    if (!targets.length) { setPhase("settled"); return; }
    const waiting = new Set(targets);
    const animations = new Map<Element, Animation>();
    let active = true;
    let completed = 0;
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting && waiting.has(entry.target))
        .sort((a, b) => targets.indexOf(a.target) - targets.indexOf(b.target));
      entering.forEach(entry => {
        if (!active || preference.matches) return;
        waiting.delete(entry.target);
        observer.unobserve(entry.target);
        const animation = animations.get(entry.target);
        animation?.effect?.updateTiming({ delay: Math.min(delay, 240) + Math.min(targets.indexOf(entry.target) * entranceMotion.stagger, entranceMotion.maxStagger) });
        animation?.play();
        setPhase("running");
      });
    }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    try {
      targets.forEach(target => {
        const animation = target.animate(entranceFrames, {
          duration: entranceMotion.duration, easing: entranceMotion.easing, fill: "backwards",
        });
        animation.pause();
        animation.currentTime = 0;
        animations.set(target, animation);
        void animation.finished.then(() => {
          completed += 1;
          if (active && completed === targets.length) setPhase("settled");
        }).catch(() => undefined);
        observer.observe(target);
      });
    } catch {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      setPhase("settled");
      return;
    }
    const stopMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      setPhase("settled");
    };
    const revealFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      for (const [target, animation] of animations) {
        if (!target.contains(event.target)) continue;
        waiting.delete(target);
        observer.unobserve(target);
        animation.finish();
      }
    };
    preference.addEventListener("change", stopMotion);
    element.addEventListener("focusin", revealFocus);
    return () => {
      active = false;
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      element.removeEventListener("focusin", revealFocus);
      animations.forEach(animation => animation.cancel());
    };
  }, [delay, stagger]);
  return <div ref={ref} className={className} data-reveal={stagger ? "stagger" : "frame"} data-reveal-state={phase}>{children}</div>;
}
