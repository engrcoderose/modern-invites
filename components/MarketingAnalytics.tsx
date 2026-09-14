"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

const trackedPaths = new Set(["/", "/pricing", "/portfolio"]);

function beforeSend(event: BeforeSendEvent) {
  const pathname = new URL(event.url).pathname.replace(/\/+$/, "") || "/";

  // Keep tracking limited to these pages, including after client navigation.
  return trackedPaths.has(pathname) ? event : null;
}

export default function MarketingAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
