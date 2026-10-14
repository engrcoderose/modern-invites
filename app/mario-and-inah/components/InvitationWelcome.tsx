"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import WelcomeSection from "../sections/WelcomeSection";
import styles from "../styles/opening.module.css";

export default function InvitationWelcome({ children, onOpening, onOpened }: { children: ReactNode; onOpening: () => void; onOpened: () => void }) {
  const content = useRef<HTMLDivElement>(null);
  const action = useRef<HTMLAnchorElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [requested, setRequested] = useState(false);
  const [opened, setOpened] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useLayoutEffect(() => {
    setEnhanced(true);
    // Explicit links to guest details retain their direct navigation behavior.
    const id = window.location.hash.slice(1);
    const target = id && id !== "top" && id !== "mi-invitation" ? document.getElementById(id) : null;
    if (target && content.current?.contains(target)) {
      setRequested(true);
      setOpened(true);
      onOpened();
      const frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" }));
      return () => cancelAnimationFrame(frame);
    }
  }, [onOpened]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    if (!enhanced || opened) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    action.current?.focus({ preventScroll: true });
    return () => { document.documentElement.style.overflow = original; };
  }, [enhanced, opened]);

  useEffect(() => {
    if (!requested || opened) return;
    let cancelled = false;
    const ready = () => { if (!cancelled) setHeroReady(true); };
    const frame = requestAnimationFrame(() => {
      const image = content.current?.querySelector<HTMLImageElement>("#mi-invitation img");
      if (image) void image.decode().then(ready, ready);
      else ready();
    });
    // A missing image must never trap guests on the cover.
    const fallback = window.setTimeout(ready, 2200);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [requested, opened]);

  const finishOpening = useCallback(() => {
    setOpened(true);
    onOpened();
  }, [onOpened]);
  const closing = requested && heroReady;

  useEffect(() => {
    if (closing && reducedMotion && !opened) finishOpening();
  }, [closing, reducedMotion, opened, finishOpening]);

  useEffect(() => {
    if (!opened || !requested) return;
    // Direct links were handled separately during enhancement.
    if (window.location.hash !== "#mi-invitation") return;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("mi-title")?.focus({ preventScroll: true });
  }, [opened, requested]);

  function openInvitation(event: MouseEvent<HTMLAnchorElement>) {
    if (!enhanced || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (requested) return;
    // Start playback in the guest's gesture, before the opening animation.
    onOpening();
    window.history.replaceState(window.history.state, "", "#mi-invitation");
    window.scrollTo({ top: 0, behavior: "instant" });
    setRequested(true);
  }

  return (
    <>
      {!opened && <WelcomeSection enhanced={enhanced} requested={requested} closing={closing}
        reducedMotion={reducedMotion} pageVisible={pageVisible} actionRef={action}
        onOpen={openInvitation} onOpened={finishOpening} />}
      <div ref={content} hidden={enhanced && !requested} inert={enhanced && !opened}
        className={styles.content} data-opening={enhanced && !opened ? true : undefined}
        aria-hidden={enhanced && !opened ? true : undefined}
        style={{ opacity: enhanced && !opened && !closing ? 0 : 1 }}>
        {children}
      </div>
    </>
  );
}
