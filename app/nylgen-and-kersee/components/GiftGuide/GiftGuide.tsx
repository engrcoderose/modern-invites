"use client";

import { Gift, Heart, Leaf } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";

type GiftGuideProps = {
  data: Pick<WeddingData, "giftGuide">;
};

export function GiftGuide({ data }: GiftGuideProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="gift-guide"
      aria-labelledby="gift-guide-heading"
      tone="paper"
      spacing="compact"
    >
      <Container size="content">
        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-wedding border border-wedding-line/45 bg-wedding-ivory px-6 py-14 text-center shadow-wedding-card sm:px-14 sm:py-20"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Leaf
            aria-hidden="true"
            className="absolute -left-10 -top-10 size-40 rotate-45 stroke-[0.55] text-wedding-sage/15"
          />
          <Leaf
            aria-hidden="true"
            className="absolute -bottom-12 -right-8 size-44 -rotate-[135deg] stroke-[0.55] text-wedding-sage/15"
          />

          <div className="relative mx-auto grid size-16 place-items-center rounded-full border border-wedding-line/60 bg-wedding-paper text-wedding-sage-deep">
            <Gift className="size-7 stroke-[1.1]" aria-hidden="true" />
          </div>
          <Heading
            id="gift-guide-heading"
            as="h2"
            variant="script"
            align="center"
            className="relative mt-5 text-[clamp(4rem,9vw,7rem)]"
          >
            {data.giftGuide.heading}
          </Heading>
          <p className="relative mx-auto mt-6 max-w-2xl font-wedding-body text-sm leading-8 tracking-[0.06em] text-wedding-ink/75 sm:text-base sm:leading-9">
            {data.giftGuide.message}
          </p>
          <div className="relative mt-8 flex items-center justify-center gap-3 text-wedding-gold">
            <span className="h-px w-12 bg-wedding-line/70" />
            <Heart className="size-4 fill-current stroke-[1]" />
            <span className="h-px w-12 bg-wedding-line/70" />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
