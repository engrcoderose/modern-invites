"use client";

import { useEffect, useState } from "react";
import CountdownFlowers from "../components/CountdownFlowers";
import wedding from "../data/wedding-details.json";
import { useInvitationOpen } from "../components/InvitationState";
import { getTimeRemaining } from "../utils/countdown";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export default function CountdownSection() {
  const open = useInvitationOpen();
  const [remaining, setRemaining] = useState<ReturnType<typeof getTimeRemaining> | null>(null);

  useEffect(() => {
    if (!open) return;
    let timer: number | undefined;
    function update() {
      const next = getTimeRemaining(wedding.date.ceremonyIso);
      setRemaining(next);
      const finished = Object.values(next).every((value) => value === 0);
      if (finished && timer !== undefined) window.clearInterval(timer);
      return finished;
    }
    function resume() {
      window.clearInterval(timer);
      if (document.hidden) return;
      if (!update()) timer = window.setInterval(update, 1000);
    }
    resume();
    document.addEventListener("visibilitychange", resume);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [open]);

  const finished = remaining !== null && Object.values(remaining).every((value) => value === 0);
  return (
    <section id="countdown" aria-labelledby="mj-countdown-title" className="mj-countdown relative isolate flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-20 text-center sm:min-h-[480px] sm:px-10 lg:aspect-[1366/759]">
      <CountdownFlowers />
      <div data-mj-stagger className="relative mx-auto w-full max-w-3xl">
        <h2 data-mj-reveal id="mj-countdown-title" aria-live="polite" className="mj-script mb-6 text-[clamp(2.3rem,4.4vw,4rem)] leading-[1.4] sm:mb-8">{finished ? "Our forever has begun." : "Forever starts soon…"}</h2>
        <p className="sr-only">Counting down to {wedding.date.display}, {wedding.date.ceremonyTime}, Baguio City time.</p>
        <dl aria-label="Time until the wedding ceremony" aria-live="off" className="mx-auto grid w-full max-w-2xl grid-cols-4">
          {units.map(({ key, label }, index) => (
            <div data-mj-reveal key={key} className="flex min-w-0 flex-col">
              <dt className="mt-2 text-xs sm:text-sm">{label}</dt>
              <dd className="mj-countdown-number relative -order-1">
                {remaining ? String(remaining[key]).padStart(2, "0") : "—"}
                {index < units.length - 1 && <span aria-hidden="true" className="absolute right-0 top-0 translate-x-1/2">:</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
