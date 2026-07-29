"use client";

import { Flower2, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";

type AttireProps = {
  data: Pick<WeddingData, "attire">;
};

export function Attire({ data }: AttireProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="attire"
      aria-labelledby="attire-heading"
      tone="ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_5%_12%,rgb(var(--wedding-color-sage-soft)/.75),transparent_24%),radial-gradient(circle_at_96%_86%,rgb(var(--wedding-color-mist)),transparent_30%)]"
      />
      <Flower2
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 size-60 -rotate-12 stroke-[0.4] text-wedding-sage/15 sm:size-72"
      />

      <Container size="wide" className="relative">
        <motion.div
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-wedding-line/40 bg-wedding-paper shadow-wedding-soft lg:grid-cols-[0.82fr_1.18fr]"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative isolate flex min-h-[34rem] flex-col justify-between overflow-hidden bg-wedding-sage-deep px-7 py-12 text-wedding-paper sm:px-12 sm:py-16 lg:min-h-[43rem]">
            <div
              aria-hidden="true"
              className="absolute inset-5 -z-10 rounded-[999px_999px_1.3rem_1.3rem] border border-wedding-paper/20"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-20 h-2/3 bg-[radial-gradient(circle_at_50%_100%,rgb(var(--wedding-color-sage)/.9),transparent_65%)]"
            />
            <div className="flex items-center gap-3 text-wedding-paper/75">
              <Sparkles className="size-4 stroke-[1.15]" aria-hidden="true" />
              <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.3em]">
                What to wear
              </p>
              <span
                className="h-px flex-1 bg-wedding-paper/25"
                aria-hidden="true"
              />
            </div>

            <div className="my-12 text-center">
              <p className="font-wedding-script text-[clamp(4.8rem,10vw,7.5rem)] leading-[0.75] text-wedding-paper">
                Formal
              </p>
              <p className="mt-6 font-sans text-[0.62rem] uppercase tracking-[0.34em] text-wedding-paper/65">
                Attire requested
              </p>
            </div>

            <div className="border-t border-wedding-paper/25 pt-6">
              <p className="font-sans text-[0.58rem] uppercase tracking-[0.25em] text-wedding-paper/55">
                Dress code
              </p>
              <p className="mt-3 font-wedding-display text-xl leading-relaxed sm:text-2xl">
                {data.attire.dressCode}
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-14">
            <div className="flex items-center gap-3 text-wedding-sage">
              <span className="h-px w-10 bg-wedding-line/70" aria-hidden="true" />
              <Flower2 className="size-4 stroke-[1.15]" aria-hidden="true" />
              <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.3em]">
                Celebration palette
              </p>
            </div>

            <Heading
              id="attire-heading"
              as="h2"
              variant="script"
              className="mt-5 max-w-xl text-[clamp(4rem,8vw,6.6rem)]"
            >
              {data.attire.heading}
            </Heading>

            <p className="mt-5 max-w-xl font-wedding-body text-sm leading-8 tracking-[0.05em] text-wedding-ink/70 sm:text-base">
              {data.attire.message}
            </p>

            <motion.ul
              aria-label="Suggested wedding color palette"
              className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.1,
                  },
                },
              }}
            >
              {data.attire.palette.map((color, index) => (
                <motion.li
                  key={color.hex}
                  className="group relative overflow-hidden rounded-wedding border border-wedding-line/30 bg-wedding-ivory p-3 shadow-[0_10px_35px_rgb(76_99_68/.06)] sm:p-4"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: reduceMotion ? 0 : 16,
                    },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="relative block aspect-[4/3] overflow-hidden rounded-[0.8rem]"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="absolute -right-5 -top-5 size-20 rounded-full border border-white/35" />
                    <span className="absolute -right-1 -top-1 size-12 rounded-full border border-white/35" />
                    <span className="absolute bottom-2 left-3 font-wedding-display text-3xl text-white/65">
                      0{index + 1}
                    </span>
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-sans text-[0.55rem] font-medium uppercase leading-4 tracking-[0.16em] text-wedding-sage-deep sm:text-[0.6rem]">
                      {color.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-9 flex items-center gap-4 text-wedding-gold">
              <span className="h-px flex-1 bg-wedding-line/50" />
              <span
                className="size-1.5 rotate-45 border border-wedding-gold/80"
                aria-hidden="true"
              />
              <span className="h-px flex-1 bg-wedding-line/50" />
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
