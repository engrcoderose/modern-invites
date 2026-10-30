"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(update: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", update);
  return () => preference.removeEventListener("change", update);
}

// The first browser render must agree with the server. Apply the real motion
// preference immediately after hydration, then keep it synchronized.
export default function useHydratedReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
