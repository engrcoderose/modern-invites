"use client";

import {
  CalendarDays,
  Church,
  Clock3,
  Leaf,
  MapPin,
  PartyPopper,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Button, Card, Container, Heading, Section } from "../ui";

type EventDetailsProps = {
  data: Pick<WeddingData, "event">;
};

type VenueCardProps = {
  eyebrow: string;
  name: string;
  address: string | null;
  time: string;
  mapUrl: string | null;
  icon: typeof Church;
  index: number;
  reduceMotion: boolean | null;
};

function VenueCard({
  eyebrow,
  name,
  address,
  time,
  mapUrl,
  icon: Icon,
  index,
  reduceMotion,
}: VenueCardProps) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card
        variant="elevated"
        padding="lg"
        className="relative flex h-full min-h-[29rem] flex-col items-center overflow-hidden text-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-wedding-gold/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 size-36 rounded-full border border-wedding-line/25"
        />
        <div
          aria-hidden="true"
          className="absolute -right-7 -top-7 size-20 rounded-full border border-wedding-line/20"
        />

        <div className="grid size-16 place-items-center rounded-full border border-wedding-line/55 bg-wedding-mist text-wedding-sage-deep">
          <Icon className="size-7 stroke-[1.05]" aria-hidden="true" />
        </div>

        <p className="mt-7 font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em] text-wedding-sage">
          {eyebrow}
        </p>
        <h3 className="mt-4 max-w-md font-wedding-display text-3xl leading-tight text-wedding-sage-deep sm:text-4xl">
          {name}
        </h3>

        <div className="my-7 flex w-full items-center gap-3 text-wedding-line">
          <span className="h-px flex-1 bg-current/55" />
          <Leaf className="size-4 stroke-[1]" />
          <span className="h-px flex-1 bg-current/55" />
        </div>

        <div className="space-y-4 font-wedding-body text-sm leading-6 tracking-[0.04em] text-wedding-ink/70">
          <p className="flex items-center justify-center gap-2">
            <Clock3
              className="size-4 shrink-0 stroke-[1.25] text-wedding-sage"
              aria-hidden="true"
            />
            {time}
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin
              className="size-4 shrink-0 stroke-[1.25] text-wedding-sage"
              aria-hidden="true"
            />
            {address ?? "Detailed directions will be shared soon"}
          </p>
        </div>

        <div className="mt-auto pt-8">
          {mapUrl ? (
            <Button asChild variant="secondary">
              <a href={mapUrl} target="_blank" rel="noreferrer">
                View map
              </a>
            </Button>
          ) : (
            <p className="font-sans text-[0.58rem] uppercase tracking-[0.2em] text-wedding-sage/75">
              Map details to follow
            </p>
          )}
        </div>
      </Card>
    </motion.article>
  );
}

export function EventDetails({ data }: EventDetailsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="event-details"
      aria-labelledby="event-details-heading"
      tone="mist"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-65 [background-image:radial-gradient(circle_at_6%_22%,rgb(var(--wedding-color-paper)/.95),transparent_24%),radial-gradient(circle_at_92%_82%,rgb(var(--wedding-color-sage-soft)/.55),transparent_26%)]"
      />

      <Container size="content" className="relative">
        <motion.header
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 text-wedding-sage">
            <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
            <CalendarDays
              className="size-4 stroke-[1.2]"
              aria-hidden="true"
            />
            <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
              Where our day unfolds
            </p>
            <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
          </div>

          <Heading
            id="event-details-heading"
            as="h2"
            variant="script"
            align="center"
            className="mt-5 text-[clamp(4rem,9vw,7rem)]"
          >
            The celebration
          </Heading>

          <p className="mt-4 font-wedding-display text-xl tracking-[0.08em] text-wedding-sage-deep sm:text-2xl">
            {data.event.dateDisplay}
          </p>
        </motion.header>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <VenueCard
            eyebrow="The ceremony"
            name={data.event.ceremony.name}
            address={data.event.ceremony.address}
            time={data.event.ceremonyTime}
            mapUrl={data.event.ceremony.mapUrl}
            icon={Church}
            index={0}
            reduceMotion={reduceMotion}
          />
          <VenueCard
            eyebrow="The reception"
            name={data.event.reception.name}
            address={data.event.reception.address}
            time={data.event.receptionTime}
            mapUrl={data.event.reception.mapUrl}
            icon={PartyPopper}
            index={1}
            reduceMotion={reduceMotion}
          />
        </div>
      </Container>
    </Section>
  );
}
