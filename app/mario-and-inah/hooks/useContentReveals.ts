"use client";

import { useEffect, type RefObject } from "react";
import { animate, frame } from "motion";

type RunningReveal = { stop: () => void; restore: () => void };

const revealPresets = {
  standard: { text: 0.7, heading: 0.85, photo: 1, maximumDelay: 0.48, ease: [0.16, 1, 0.3, 1] },
  soft: { text: 0.9, heading: 1, photo: 1.1, maximumDelay: 0.24, ease: [0.25, 0.1, 0.25, 1] },
} as const;

export default function useContentReveals(root: RefObject<HTMLDivElement | null>, enabled = true) {
  useEffect(() => {
    if (!enabled || !root.current || !("IntersectionObserver" in window)) return;
    const elements = [...root.current.querySelectorAll<HTMLElement>("[data-reveal]")];
    const seen = new WeakSet<HTMLElement>();
    const active = new Map<HTMLElement, RunningReveal>();
    const prepared = new Map<HTMLElement, { style: string | null; opacity: number }>();
    const order = new Map(elements.map((element, index) => [element, index]));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    let softContentObserver: IntersectionObserver | null = null;

    function restorePrepared(element: HTMLElement) {
      const original = prepared.get(element);
      if (!original) return;
      if (original.style === null) element.removeAttribute("style");
      else element.setAttribute("style", original.style);
    }

    function settle(element: HTMLElement) {
      const running = active.get(element);
      if (!running) return;
      running.stop();
      running.restore();
      // Motion may have queued a final DOM render before cancellation.
      frame.postRender(running.restore);
      active.delete(element);
    }

    async function reveal(element: HTMLElement, staggerDelay = 0) {
      if (seen.has(element) || preference.matches || document.hidden) return;
      seen.add(element);
      observer?.unobserve(element);
      softContentObserver?.unobserve(element);
      if (element.contains(document.activeElement)) { restorePrepared(element); return; }
      const kind = element.dataset.reveal;
      const risingPhoto = kind === "photo-rise";
      const photo = kind === "photo" || risingPhoto;
      const heading = kind === "heading";
      const ornament = kind === "ornament";
      const timeline = kind === "timeline";
      const soft = element.closest('[data-reveal-preset="soft"]') !== null;
      const preset = soft ? revealPresets.soft : revealPresets.standard;
      const preparedStyle = prepared.get(element);
      const finalOpacity = preparedStyle?.opacity ?? Number(getComputedStyle(element).opacity);
      // Preserve authored inline styles, including any existing transform.
      const originalStyle = preparedStyle ? preparedStyle.style : element.getAttribute("style");
      const restore = () => {
        if (originalStyle === null) element.removeAttribute("style");
        else element.setAttribute("style", originalStyle);
      };
      // Only standalone photos opt into movement; artwork and parallax layers
      // keep their authored positioning and fade without a transform.
      const keyframes = risingPhoto
        ? { opacity: [0, finalOpacity], y: [20, 0] }
        : photo || ornament
          ? { opacity: [0, finalOpacity] }
          : timeline
            ? { opacity: [0, finalOpacity], y: [16, 0] }
            : { opacity: [0, finalOpacity], y: [soft ? 14 : heading ? 16 : 10, 0] };
      const requestedDelay = Number(element.dataset.revealDelay ?? 0);
      const authoredDelay = Number.isFinite(requestedDelay) ? Math.max(0, requestedDelay) : 0;
      const delay = Math.min(preset.maximumDelay, authoredDelay + staggerDelay);
      const duration = photo ? preset.photo : heading || timeline ? preset.heading : preset.text;
      let controls: ReturnType<typeof animate> | undefined;
      let cancelled = false;
      let imageTimeout: number | undefined;
      let finishWaiting: (() => void) | undefined;
      active.set(element, { restore, stop: () => {
        cancelled = true;
        controls?.cancel();
        window.clearTimeout(imageTimeout);
        finishWaiting?.();
      } });
      element.style.willChange = (photo && !risingPhoto) || ornament ? "opacity" : "transform, opacity";
      element.style.opacity = "0";
      if (photo) {
        const images = element instanceof HTMLImageElement ? [element] : [...element.querySelectorAll("img")];
        // Lazy photos wait for decoding, with a fallback for slow or missing assets.
        await Promise.race([
          Promise.all(images.map(image => image.decode().catch(() => undefined))),
          new Promise<void>(resolve => { finishWaiting = resolve; imageTimeout = window.setTimeout(resolve, 1800); }),
        ]);
        window.clearTimeout(imageTimeout);
      }
      if (cancelled) return;
      if (!element.isConnected || preference.matches || document.hidden) { settle(element); return; }
      controls = animate(element, keyframes, {
        duration,
        delay,
        ease: preset.ease,
      });
      void controls.then(() => settle(element));
    }

    function revealEntries(entries: IntersectionObserverEntry[], minimumRatio = 0) {
      const groups = new Map<Element, HTMLElement[]>();
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < minimumRatio) continue;
        const element = entry.target as HTMLElement;
        const section = element.closest("section, footer");
        if (!section || seen.has(element)) continue;
        const group = groups.get(section) ?? [];
        group.push(element);
        groups.set(section, group);
      }
      for (const group of groups.values()) {
        group.sort((left, right) => (order.get(left) ?? 0) - (order.get(right) ?? 0));
        group.forEach((element, index) => void reveal(element, index * 0.08));
      }
    }

    function updatePreference() {
      observer?.disconnect();
      softContentObserver?.disconnect();
      for (const element of active.keys()) settle(element);
      if (preference.matches) {
        for (const element of prepared.keys()) restorePrepared(element);
        return;
      }
      observer = new IntersectionObserver(entries => revealEntries(entries), { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
      // Wait until text and standalone photo reveals are properly in view.
      // Large decorative images retain their original observer.
      softContentObserver = new IntersectionObserver(entries => revealEntries(entries, 0.25), { threshold: 0.25, rootMargin: "0px 0px -64px 0px" });
      for (const element of elements) {
        if (seen.has(element)) continue;
        if (!element.closest("section, footer")) continue;
        if (!prepared.has(element)) prepared.set(element, { style: element.getAttribute("style"), opacity: Number(getComputedStyle(element).opacity) });
        element.style.opacity = "0";
        const softContent = (element.dataset.reveal === "text" || element.dataset.reveal === "heading" || element.dataset.reveal === "timeline" || element.dataset.reveal === "photo-rise") && element.closest('[data-reveal-preset="soft"]');
        (softContent ? softContentObserver : observer).observe(element);
      }
    }

    function settleFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;
      for (const element of active.keys()) if (element.contains(event.target)) settle(element);
      for (const element of prepared.keys()) {
        if (seen.has(element) || !element.contains(event.target)) continue;
        seen.add(element);
        observer?.unobserve(element);
        softContentObserver?.unobserve(element);
        restorePrepared(element);
      }
    }

    function settleHiddenPage() {
      if (document.hidden) for (const element of active.keys()) settle(element);
      else updatePreference();
    }

    updatePreference();
    preference.addEventListener("change", updatePreference);
    root.current.addEventListener("focusin", settleFocusedContent);
    document.addEventListener("visibilitychange", settleHiddenPage);
    const container = root.current;
    return () => {
      observer?.disconnect();
      softContentObserver?.disconnect();
      for (const element of active.keys()) settle(element);
      for (const element of prepared.keys()) restorePrepared(element);
      preference.removeEventListener("change", updatePreference);
      container.removeEventListener("focusin", settleFocusedContent);
      document.removeEventListener("visibilitychange", settleHiddenPage);
    };
  }, [root, enabled]);
}
