"use client";

import Image from "next/image";
import { Camera, Hash } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import clientLogo from "../../assets/initials.webp";
import photoUploadQrCode from "../../assets/photo-upload-qr-code.png";
import { Container, Heading, Section } from "../ui";

type HashtagProps = {
  data: Pick<WeddingData, "socialSharing">;
};

export function Hashtag({ data }: HashtagProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="hashtag"
      aria-labelledby="hashtag-heading"
      tone="sage"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_12%_12%,rgb(var(--wedding-color-sage-soft)/.8),transparent_24%),radial-gradient(circle_at_88%_88%,rgb(var(--wedding-color-gold)/.35),transparent_24%)]"
      />

      <Container size="wide" className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 text-wedding-paper/70">
              <Hash className="size-4 stroke-[1.2]" aria-hidden="true" />
              <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
                Share the celebration
              </p>
              <span
                className="hidden h-px w-16 bg-wedding-paper/35 sm:block"
                aria-hidden="true"
              />
            </div>

            <Heading
              id="hashtag-heading"
              as="h2"
              variant="script"
              align="center"
              className="mt-5 text-[clamp(4.5rem,9vw,7.5rem)] text-wedding-paper lg:text-left"
            >
              Capture the love
            </Heading>

            <p className="mt-6 max-w-xl font-wedding-body text-sm leading-8 tracking-[0.06em] text-wedding-paper/80 sm:text-base">
              {data.socialSharing.message}
            </p>

            <div className="mt-8 w-full max-w-xl border-y border-wedding-paper/25 py-5">
              <p className="font-sans text-[0.55rem] uppercase tracking-[0.28em] text-wedding-paper/55">
                Our wedding hashtag
              </p>
              <p className="mt-3 break-all font-wedding-display text-2xl leading-tight tracking-[0.025em] text-wedding-paper sm:text-3xl">
                {data.socialSharing.hashtag}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-wedding-paper/65">
              <span
                className="size-1.5 rotate-45 border border-wedding-paper/60"
                aria-hidden="true"
              />
              <p className="font-sans text-[0.56rem] uppercase tracking-[0.22em]">
                Every photograph becomes part of our story
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[27rem]"
            initial={reduceMotion ? false : { opacity: 0, x: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1.15,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[999px_999px_2rem_2rem] border border-wedding-paper/25 sm:-inset-5"
            />
            <div className="relative overflow-hidden rounded-[999px_999px_1.5rem_1.5rem] border border-wedding-line/35 bg-wedding-paper px-7 pb-9 pt-12 text-center text-wedding-ink shadow-wedding-soft sm:px-10 sm:pb-11 sm:pt-14">
              <div
                aria-hidden="true"
                className="absolute -left-14 -top-14 size-40 rounded-full border border-wedding-line/20"
              />
              <div
                aria-hidden="true"
                className="absolute -right-8 top-24 size-24 rounded-full border border-wedding-line/20"
              />

              <div className="relative mx-auto size-16 overflow-hidden rounded-full border border-wedding-line/45 bg-wedding-ivory shadow-wedding-card">
                <Image
                  src={clientLogo}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <p className="mt-6 font-sans text-[0.56rem] font-medium uppercase tracking-[0.28em] text-wedding-sage">
                Our shared album
              </p>
              <h3 className="mt-3 font-wedding-display text-3xl text-wedding-sage-deep sm:text-4xl">
                Share your moments
              </h3>

              <div className="mx-auto my-6 flex items-center gap-3 text-wedding-line">
                <span className="h-px flex-1 bg-current/60" />
                <span
                  className="size-1.5 rotate-45 border border-current"
                  aria-hidden="true"
                />
                <span className="h-px flex-1 bg-current/60" />
              </div>

              <div className="mx-auto w-fit rounded-[1.25rem] border border-wedding-line/35 bg-white p-3 shadow-[0_14px_45px_rgb(76_99_68/.12)]">
                <Image
                  src={photoUploadQrCode}
                  alt="QR code for the wedding photo album"
                  width={196}
                  height={196}
                  className="size-44 object-contain sm:size-48"
                />
              </div>

              <Camera
                className="mx-auto mt-6 size-5 stroke-[1.15] text-wedding-sage"
                aria-hidden="true"
              />
              <p className="mx-auto mt-3 max-w-[15rem] font-sans text-[0.57rem] uppercase leading-5 tracking-[0.2em] text-wedding-sage-deep">
                Scan the code and add your favorite photographs
              </p>

              <p className="mt-6 font-wedding-script text-3xl text-wedding-gold">
                Nylgen &amp; Kersee
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
