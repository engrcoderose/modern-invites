"use client";

import { useLayoutEffect } from "react";

export default function RefreshScrollReset() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type !== "reload") return;

    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    // Replace the old section anchor without adding another history entry.
    history.replaceState(history.state, "", `${location.pathname}${location.search}#top`);

    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    resetScroll();
    // Cover browser/Next restoration during the initial page presentation.
    const frame = requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", resetScroll);
      history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
