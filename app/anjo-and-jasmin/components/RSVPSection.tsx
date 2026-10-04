"use client";

import Image from "next/image";
import { BrownFlowerWavyLine } from "../design-media";
import { coordinator } from "../data";
import { rsvpPhoto } from "../media";
import RsvpFlow from "./RsvpFlow";
import Reveal from "./motion/Reveal";

interface RSVPSectionProps {
  deadline: string;
}

export default function RSVPSection({ deadline }: RSVPSectionProps) {
  return (
    <section
      id="rsvp"
      aria-label="RSVP"
      className="relative overflow-hidden border-t border-[rgb(var(--aj-line))]/30 bg-[rgb(var(--aj-paper))] bg-[radial-gradient(ellipse_at_top_left,rgb(var(--aj-ivory)),transparent_65%)] px-5 py-20 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-28"
    >
      <Image
        src={BrownFlowerWavyLine}
        alt=""
        aria-hidden="true"
        sizes="(max-width: 639px) 208px, 288px"
        className="pointer-events-none absolute -left-16 top-3 h-auto w-52 -rotate-12 select-none opacity-30 sm:-left-20 sm:top-8 sm:w-72"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-md">
          <figure className="relative aspect-[2/3] overflow-hidden rounded-sm">
            <Image
              src={rsvpPhoto.src}
              alt={rsvpPhoto.alt}
              fill
              sizes="(max-width: 639px) calc(100vw - 40px), 448px"
              style={{ objectPosition: rsvpPhoto.position }}
              className="object-cover"
            />
          </figure>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full min-w-0 max-w-2xl">
          <RsvpFlow />
          <div className="mt-8 text-center text-xs leading-7 text-[rgb(var(--aj-muted))] sm:text-sm">
            <p>Please reply by <span className="font-medium">{deadline}</span>.</p>
            <p className="mt-2">
              For assistance, contact {coordinator.name}:{" "}
              <a
                href={coordinator.phoneHref}
                className="inline-block rounded-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))]"
              >
                {coordinator.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
