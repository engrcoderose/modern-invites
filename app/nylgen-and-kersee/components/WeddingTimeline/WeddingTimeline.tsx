"use client";

import type { LucideIcon } from "lucide-react";
import {
  CakeSlice,
  Church,
  Coffee,
  HeartHandshake,
  Music2,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";

type WeddingTimelineProps = {
  data: Pick<WeddingData, "timeline">;
};

const timelineIcons: LucideIcon[] = [
  Church,
  Coffee,
  PartyPopper,
  UtensilsCrossed,
  CakeSlice,
  HeartHandshake,
  Music2,
];

export function WeddingTimeline({ data }: WeddingTimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="wedding-timeline"
      aria-labelledby="timeline-heading"
      tone="mist"
      spacing="compact"
    >
      <Container size="wide">
        <motion.header
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-14"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em] text-wedding-sage">
            From vows to dancing
          </p>
          <Heading
            id="timeline-heading"
            as="h2"
            variant="script"
            align="center"
            className="mt-5 text-[clamp(4rem,9vw,7rem)]"
          >
            Wedding timeline
          </Heading>
        </motion.header>

        <div className="relative hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute left-[6.5%] right-[6.5%] top-[4.75rem] h-px bg-wedding-line/65"
          />

          <div className="grid grid-cols-7 gap-3 xl:gap-5">
            {data.timeline.map((item, index) => {
              const Icon = timelineIcons[index] ?? PartyPopper;

              return (
                <motion.article
                  key={`${item.time}-${item.title}`}
                  className="relative flex min-w-0 flex-col items-center text-center"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.95,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <p className="flex h-8 items-end font-wedding-display text-base tracking-[0.06em] text-wedding-sage-deep xl:text-lg">
                    {item.time}
                  </p>

                  <div className="relative z-10 mt-4 grid size-14 place-items-center rounded-full border border-wedding-line/70 bg-wedding-paper text-wedding-sage-deep shadow-wedding-card">
                    <Icon className="size-5 stroke-[1.1]" />
                  </div>

                  <div className="mt-5 min-w-0">
                    <h3 className="font-wedding-display text-xl leading-tight text-wedding-sage-deep xl:text-2xl">
                      {item.title}
                    </h3>
                    {item.details?.map((detail) => (
                      <p
                        key={detail}
                        className="mt-2 font-wedding-body text-[0.65rem] leading-5 tracking-[0.06em] text-wedding-ink/60"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto max-w-xl lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-wedding-line/65"
          />

          <div className="space-y-7">
            {data.timeline.map((item, index) => {
              const Icon = timelineIcons[index] ?? PartyPopper;

              return (
                <motion.article
                  key={`${item.time}-${item.title}-mobile`}
                  className="relative grid grid-cols-[3rem_1fr] items-start gap-4"
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="relative z-10 grid size-12 place-items-center rounded-full border border-wedding-line/70 bg-wedding-paper text-wedding-sage-deep shadow-wedding-card">
                    <Icon className="size-[1.125rem] stroke-[1.1]" />
                  </div>

                  <div className="min-w-0 pt-2">
                    <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3">
                      <p className="whitespace-nowrap font-wedding-display text-base tracking-[0.05em] text-wedding-sage">
                        {item.time}
                      </p>
                      <h3 className="font-wedding-display text-xl leading-tight text-wedding-sage-deep sm:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    {item.details?.map((detail) => (
                      <p
                        key={detail}
                        className="mt-1.5 pl-0 font-wedding-body text-xs tracking-[0.06em] text-wedding-ink/60"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
