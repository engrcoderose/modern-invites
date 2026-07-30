"use client";

import { Leaf, MailCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";
import { NylgenRsvpFlow } from "./NylgenRsvpFlow";

type RSVPProps = {
  data: Pick<WeddingData, "couple" | "rsvp" | "meta">;
};

export function RSVP({ data }: RSVPProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      tone="ivory"
      className="border-t border-wedding-line/25"
    >
      <Container size="wide">
        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-28">
          <motion.div
            className="mx-auto max-w-xl text-center lg:sticky lg:top-28 lg:mx-0 lg:text-left"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex items-center justify-center gap-3 text-wedding-sage lg:justify-start">
              <MailCheck
                className="size-4 stroke-[1.2]"
                aria-hidden="true"
              />
              <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
                Kindly respond
              </p>
            </div>

            <Heading
              id="rsvp-heading"
              as="h2"
              variant="title"
              align="center"
              className="mt-7 text-[clamp(4rem,8vw,7.5rem)] leading-[0.8] lg:text-left"
            >
              Will you
              <span className="mt-3 block font-wedding-script text-[0.72em] font-normal leading-none text-wedding-gold">
                join us?
              </span>
            </Heading>

            <p className="mt-8 font-wedding-body text-sm leading-8 tracking-[0.05em] text-wedding-ink/70 sm:text-base">
              Your presence would make our celebration complete. Please
              reply on or before {data.rsvp.deadlineDisplay}.
            </p>

            <p className="mt-4 font-wedding-body text-sm leading-7 text-wedding-ink/60">
              Enter your complete invited name to securely locate your
              household.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 text-wedding-line lg:justify-start">
              <span className="h-px w-12 bg-current" />
              <Leaf className="size-4 stroke-[1]" />
              <span className="h-px w-12 bg-current" />
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <NylgenRsvpFlow
              eventSlug={data.meta.slug}
              confirmationMessage={data.rsvp.confirmationMessage}
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
