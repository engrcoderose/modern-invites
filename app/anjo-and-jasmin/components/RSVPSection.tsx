"use client";

import Image from "next/image";
import { Together } from "../prenup-media";
import DemoRsvpFlow from "./DemoRsvpFlow";
import { Mail } from "lucide-react";
import Reveal from "./motion/Reveal";
import FloralAccent from "./FloralAccent";
import { coordinator } from "../data";

interface RSVPSectionProps {
  deadline: string;
}

export default function RSVPSection({ deadline }: RSVPSectionProps) {
  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden border-t border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-sand))] bg-[radial-gradient(ellipse_at_top_left,#fff7ef,transparent_65%)] px-5 py-20 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      <FloralAccent
        kind="blue"
        className="-left-12 top-20 w-36 -rotate-12 opacity-60 sm:w-56"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="text-[10px] uppercase tracking-[.3em] text-[rgb(var(--aj-accent-dark))] sm:text-xs">
            A seat, a smile, a celebration
          </p>
          <h2
            id="rsvp-title"
            className="mt-5 font-instrumentSerif text-[clamp(3.5rem,7vw,6rem)] leading-[1.1] tracking-[-.035em]"
          >
            Will you{" "}
            <span className="font-meaCulpa font-normal text-[rgb(var(--aj-accent-dark))]">
              join us?
            </span>
          </h2>
        </Reveal>

        <Reveal className="overflow-hidden rounded-[1.75rem] border border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-paper))] shadow-[0_20px_70px_-35px_#51423755] sm:rounded-[2rem]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col border-b border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-sand))] lg:border-b-0 lg:border-r">
              <div className="relative aspect-[3/2] overflow-hidden lg:aspect-[4/3]">
                <Image
                  src={Together}
                  alt="A couple sharing a kiss beneath a tree"
                  fill
                  sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 90vw, 520px"
                  className="object-cover object-[center_75%]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-6 py-8 text-center sm:px-10 sm:py-10 lg:text-left">
                <p className="text-base leading-8 text-[rgb(var(--aj-muted))]">
                  Our day would be even more beautiful with you in it. We look
                  forward to sharing our joy with the people we love.
                </p>
                <p className="mt-5 font-meaCulpa text-3xl text-[rgb(var(--aj-accent-dark))] sm:text-4xl">
                  With love, Anjo &amp; Jasmin
                </p>
                <div className="mt-7 flex items-start gap-3 border-t border-[#d3b6a1]/60 pt-6 text-left">
                  <Mail
                    size={18}
                    strokeWidth={1.4}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[rgb(var(--aj-accent-dark))]"
                  />
                  <div className="text-sm leading-7 text-[rgb(var(--aj-muted))]">
                    <p>Please <strong className="font-semibold text-[rgb(var(--aj-ink))]">RSVP</strong> by <strong className="font-semibold text-[rgb(var(--aj-ink))]">{deadline}</strong>.</p>
                    <p className="mt-3">
                      If you have any concerns, please contact our coordinator, {coordinator.name}, at{" "}
                      <a href={coordinator.phoneHref} className="inline-block rounded-sm font-medium text-[rgb(var(--aj-accent-dark))] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))]">{coordinator.phone}</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-w-0">
              <div
                data-rsvp-scroll
                role="region"
                aria-label="RSVP form"
                tabIndex={0}
                className="flex max-h-[80svh] flex-col overflow-y-auto overscroll-y-contain px-6 py-8 [scrollbar-gutter:stable] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))] sm:p-10 lg:absolute lg:inset-0 lg:max-h-none lg:p-12"
              >
                <div className="my-auto shrink-0">
                  <DemoRsvpFlow />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
