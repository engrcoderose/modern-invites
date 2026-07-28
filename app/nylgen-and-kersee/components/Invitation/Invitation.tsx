"use client";

import Image from "next/image";
import { Church, Clock3, Leaf } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import walkingPortrait from "../../assets/romantically-running.webp";
import { Container, Divider, Heading, Section } from "../ui";

type InvitationProps = {
  data: Pick<WeddingData, "couple" | "event" | "invitation">;
};

export function Invitation({ data }: InvitationProps) {
  const reduceMotion = useReducedMotion();
  const { couple, event, invitation } = data;

  return (
    <Section
      id="invitation"
      aria-labelledby="invitation-heading"
      tone="paper"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_88%_10%,rgb(var(--wedding-color-sage-soft)/.62),transparent_24%),radial-gradient(circle_at_6%_92%,rgb(var(--wedding-color-mist)/.8),transparent_25%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-28">
          <motion.figure
            className="relative mx-auto w-full max-w-[30rem]"
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[999px_999px_0.75rem_0.75rem] border border-wedding-line/60 sm:-inset-5"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_0.5rem_0.5rem] bg-wedding-mist shadow-wedding-card">
              <Image
                src={walkingPortrait}
                alt={`${couple.groom.firstName} and ${couple.bride.firstName} walking together`}
                fill
                quality={90}
                sizes="(min-width: 1024px) 35vw, (min-width: 640px) 62vw, 88vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wedding-sage-deep/35 via-transparent to-wedding-paper/5" />
              <figcaption className="absolute inset-x-5 bottom-5 text-center font-wedding-body text-[0.58rem] uppercase tracking-[0.25em] text-wedding-paper drop-shadow-md sm:bottom-7 sm:text-[0.65rem]">
                Our hearts became one
              </figcaption>
            </div>

            <motion.div
              aria-hidden="true"
              className="absolute -bottom-10 -right-7 grid size-24 place-items-center rounded-full border border-wedding-line/50 bg-wedding-ivory text-wedding-sage shadow-wedding-card sm:-right-12 sm:size-28"
              animate={reduceMotion ? undefined : { rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf className="size-10 rotate-[-30deg] stroke-[0.8]" />
            </motion.div>
          </motion.figure>

          <motion.div
            className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-3 text-wedding-sage">
              <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
              <Leaf className="size-3.5 stroke-[1.2]" aria-hidden="true" />
              <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
                With joyful hearts
              </p>
              <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
            </div>

            <Heading
              id="invitation-heading"
              as="h2"
              variant="script"
              align="center"
              className="text-[clamp(3.8rem,8vw,6.5rem)]"
            >
              We invite you
            </Heading>

            <p className="mt-3 font-wedding-display text-xl tracking-[0.08em] text-wedding-sage-deep sm:text-2xl">
              to witness our vows renewed
            </p>

            <Divider className="my-8 max-w-md" />

            <div className="max-w-xl space-y-5">
              {invitation.message.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-wedding-body text-sm leading-8 tracking-[0.055em] text-wedding-ink/80 sm:text-base sm:leading-9"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 w-full border-y border-wedding-line/45 py-6">
              <p className="font-wedding-display text-2xl tracking-[0.08em] text-wedding-sage-deep sm:text-3xl">
                {event.dateDisplay}
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-4 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-wedding-sage sm:flex-row sm:gap-8">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4 stroke-[1.25]" aria-hidden="true" />
                  {event.ceremonyTime}
                </span>
                <span className="hidden size-1 rotate-45 bg-wedding-gold sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Church className="size-4 stroke-[1.25]" aria-hidden="true" />
                  {event.ceremony.name}
                </span>
              </div>
            </div>

            <p className="mt-8 font-wedding-script text-4xl text-wedding-gold sm:text-5xl">
              {couple.groom.firstName} &amp; {couple.bride.firstName}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
