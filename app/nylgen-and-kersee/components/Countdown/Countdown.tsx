"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Leaf } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";

type CountdownProps = {
  data: Pick<WeddingData, "couple" | "event">;
};

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyCountdown: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeRemaining(targetDate: string): TimeRemaining {
  const difference = Math.max(
    new Date(targetDate).getTime() - new Date().getTime(),
    0,
  );

  if (!Number.isFinite(difference)) {
    return emptyCountdown;
  }

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

const countdownUnits: Array<{
  key: keyof TimeRemaining;
  label: string;
}> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown({ data }: CountdownProps) {
  const [remaining, setRemaining] = useState<TimeRemaining | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateCountdown = () => {
      setRemaining(getTimeRemaining(data.event.dateTimeISO));
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1_000);

    return () => window.clearInterval(timer);
  }, [data.event.dateTimeISO]);

  return (
    <Section
      id="countdown"
      aria-labelledby="countdown-heading"
      tone="sage"
      spacing="compact"
      className="border-y border-wedding-paper/15"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_12%_18%,rgb(var(--wedding-color-sage-soft)/.65),transparent_22%),radial-gradient(circle_at_88%_78%,rgb(var(--wedding-color-gold)/.35),transparent_22%)]"
      />
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-1/2 size-44 -translate-y-1/2 rotate-45 stroke-[0.55] text-wedding-paper/10 sm:size-60"
      />
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-1/2 size-44 -translate-y-1/2 -rotate-[135deg] stroke-[0.55] text-wedding-paper/10 sm:size-60"
      />

      <Container className="relative">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 text-wedding-paper/70">
            <span className="h-px w-8 bg-wedding-paper/35" aria-hidden="true" />
            <CalendarDays className="size-4 stroke-[1.2]" aria-hidden="true" />
            <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
              Save the date
            </p>
            <span className="h-px w-8 bg-wedding-paper/35" aria-hidden="true" />
          </div>

          <Heading
            id="countdown-heading"
            as="h2"
            variant="script"
            align="center"
            className="mt-5 text-[clamp(2.9rem,12vw,6.5rem)] text-wedding-paper"
          >
            Until we say I do
          </Heading>

          <p className="mt-3 font-wedding-body text-xs uppercase tracking-[0.22em] text-wedding-paper/70 sm:text-sm">
            {data.event.dateDisplay}
          </p>

          <div
            className="mt-10 grid w-full grid-cols-2 gap-px overflow-hidden rounded-wedding border border-wedding-paper/20 bg-wedding-paper/20 sm:mt-12 sm:grid-cols-4"
            aria-label={`Countdown to the wedding of ${data.couple.groom.firstName} and ${data.couple.bride.firstName}`}
          >
            {countdownUnits.map(({ key, label }) => {
              const value = remaining?.[key];

              return (
                <div
                  key={key}
                  className="flex min-h-32 flex-col items-center justify-center bg-wedding-sage-deep/80 px-3 py-6 backdrop-blur-sm sm:min-h-40"
                >
                  <span className="font-wedding-display text-5xl leading-none tabular-nums text-wedding-paper sm:text-6xl">
                    {value === undefined
                      ? "—"
                      : String(value).padStart(2, "0")}
                  </span>
                  <span className="mt-3 font-sans text-[0.58rem] uppercase tracking-[0.26em] text-wedding-paper/65 sm:text-[0.62rem]">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-8 max-w-lg font-wedding-body text-xs italic leading-6 tracking-[0.08em] text-wedding-paper/70 sm:text-sm">
            Every passing moment brings us closer to celebrating with you.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
