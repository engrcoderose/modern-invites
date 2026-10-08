"use client";

import { useLayoutEffect } from "react";

export default function RefreshScrollReset() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type !== "reload") return;

    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    history.replaceState(history.state, "", `${location.pathname}${location.search}#top`);

    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) resetScroll();
    };
    resetScroll();
    // Cover browser scroll restoration after hydration without a smooth scroll.
    const frame = requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", onPageShow, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", onPageShow);
      history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
