"use client";
import { Button } from "@/components/ui/button";
export default function EventsError({ reset }: { reset(): void }) {
  return <div className="rounded-xl border border-black/10 bg-white p-8"><h1 className="font-elegant text-3xl text-forest">Unable to load event details</h1><p className="my-4 text-ink-muted">Please try again in a moment.</p><Button onClick={reset}>Try again</Button></div>;
}
