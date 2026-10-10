"use client";

import { useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(motionQuery).matches;
}

// Start with readable, static content during SSR and hydration. Subscribe so
// switching the OS preference also stops animations that are already running.
export default function useMarketingReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
