"use client";

import { Crown, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Card, Container, Divider, Heading, Section } from "../ui";

type EntourageProps = {
  data: Pick<WeddingData, "weddingParty" | "principalSponsors">;
};

export function Entourage({ data }: EntourageProps) {
  const reduceMotion = useReducedMotion();
  const familyGroups = data.weddingParty.slice(0, 2);
  const weddingParty = data.weddingParty.slice(2);
  return (
    <Section
      id="entourage"
      aria-labelledby="entourage-heading"
      tone="paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-65 [background-image:radial-gradient(circle_at_8%_10%,rgb(var(--wedding-color-sage-soft)/.55),transparent_21%),radial-gradient(circle_at_92%_90%,rgb(var(--wedding-color-mist)/.9),transparent_25%)]"
      />

      <Container size="content" className="relative">
        <motion.header
          className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 text-wedding-sage">
            <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
            <Crown className="size-4 stroke-[1.2]" aria-hidden="true" />
            <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
              The people beside us
            </p>
            <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
          </div>
          <Heading
            id="entourage-heading"
            as="h2"
            variant="script"
            align="center"
            className="mt-5 text-[clamp(4rem,9vw,7rem)]"
          >
            Our wedding Entourage
          </Heading>
          <p className="mt-4 max-w-xl font-wedding-body text-sm leading-7 tracking-[0.06em] text-wedding-ink/70 sm:text-base">
            With grateful hearts, we honor the family and friends who have
            shaped our story.
          </p>
        </motion.header>

        <motion.div
          className="grid gap-5 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {familyGroups.map((group) => (
            <motion.div
              key={group.role}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              <Card
                variant="soft"
                padding="lg"
                className="h-full border border-wedding-line/30 text-center"
              >
                <p className="font-wedding-script text-4xl text-wedding-sage-deep sm:text-5xl">
                  {group.role}
                </p>
                <div className="mt-5 space-y-2">
                  {group.people.map((person) => (
                    <p
                      key={person.name}
                      className="font-wedding-display text-xl tracking-[0.05em] text-wedding-ink/80 sm:text-2xl"
                    >
                      {person.name}
                    </p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Divider className="my-14" />

        <div className="text-center">
          {/* <Sparkles
            className="mx-auto size-5 stroke-[1] text-wedding-gold"
            aria-hidden="true"
          /> */}
          <h3 className="mt-4 font-wedding-script text-5xl text-wedding-sage-deep sm:text-6xl">
            Principal Sponsors
          </h3>
          <div className="mx-auto mt-9 grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
            {data.principalSponsors.map(({ sponsorOne, sponsorTwo }) => (
              <div
                key={`${sponsorOne.name}-${sponsorTwo.name}`}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-wedding-line/25 pb-4 font-wedding-body text-sm leading-6 tracking-[0.04em] text-wedding-ink/75 sm:text-base"
              >
                <span className="text-right">
                  {sponsorOne.name}
                </span>
                <span
                  className="size-1.5 rotate-45 border border-wedding-sage/80"
                  aria-hidden="true"
                />
                <span className="text-left">
                  {sponsorTwo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Divider className="my-14" />

        <motion.div
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {weddingParty.map((group) => (
            <motion.div
              key={group.role}
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <h3 className="font-wedding-script text-4xl leading-none text-wedding-sage-deep">
                {group.role}
              </h3>
              <div className="mt-4 space-y-1.5">
                {group.people.map((person) => (
                  <p
                    key={person.name}
                    className="font-wedding-body text-sm leading-6 tracking-[0.06em] text-wedding-ink/70"
                  >
                    {person.name}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
