"use client";

import { BrownLineFlower } from "../design-media";

import { useRef } from "react";
import { wedding } from "../data";
import Image from "next/image";
import { timelineIllustrations } from "../media";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { TimelineEvent } from "../types";
import Reveal from "./motion/Reveal";

function Illustration({ index }: { index: number; }) {
  const source = timelineIllustrations[index] ?? timelineIllustrations[3];
  return (
    <div className="relative grid h-[88px] w-[72px] shrink-0 place-items-center sm:h-28 sm:w-28">
      <span aria-hidden="true" className="absolute inset-x-0 inset-y-2 rounded-full bg-[rgb(var(--aj-sand))]/45 sm:inset-2" />
      <Image src={source} alt="" aria-hidden="true" fill sizes="(max-width: 639px) 72px, 112px" className="object-contain" />
    </div>
  );
}

export default function WeddingProgram({ events: program }: { events: TimelineEvent[]; }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const markerTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  if (!program.length) return null;
  return (
    <section id="program" className="relative overflow-hidden bg-[rgb(var(--aj-sand))] px-5 py-20 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-28" aria-labelledby="wedding-timeline-title">
      <div className="aj-program-card relative mx-auto max-w-4xl rounded-2xl border border-[rgb(var(--aj-line))]/70 bg-[rgb(var(--aj-paper))] px-5 py-12 shadow-[0_24px_70px_-40px_#57361c55] sm:px-14 sm:py-16">
        <Reveal className="relative text-center" y={20}>
          <Image src={BrownLineFlower} alt="" aria-hidden="true" sizes="(max-width: 639px) 176px, 224px" className="mx-auto mb-6 h-auto w-44 sm:w-56" />
          <h2 id="wedding-timeline-title" className="font-instrumentSerif text-4xl leading-[1.1] sm:text-6xl">Wedding <em className="font-meaCulpa font-normal text-[rgb(var(--aj-accent-dark))]">timeline</em></h2>
          <p className="mt-4 text-[10px] uppercase tracking-[.2em] text-[rgb(var(--aj-muted))] sm:text-xs">{wedding.dateDisplay}</p>
          <p className="mt-3 text-xs leading-5 text-[rgb(var(--aj-muted))]">2:30 PM church arrival · {wedding.time} ceremony</p>
        </Reveal>
        <div className="relative mx-auto mt-10 w-full max-w-[16rem] sm:mt-12 sm:max-w-[22rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute bottom-16 left-[84px] top-16 w-px bg-[repeating-linear-gradient(to_bottom,rgb(var(--aj-line))_0_3px,transparent_3px_8px)] sm:left-[128px] lg:bottom-[72px] lg:left-1/2 lg:top-[72px]">
            {!reducedMotion && <motion.span className="absolute inset-0 origin-top bg-[rgb(var(--aj-accent))]/40" style={{ scaleY: progress }} />}
            {!reducedMotion && <motion.span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--aj-accent))] shadow-[0_0_0_5px_rgb(var(--aj-paper))] motion-reduce:hidden" style={{ top: markerTop }} />}
          </div>
          <ol ref={listRef} className="relative list-none p-0">
            {program.map((event, index) => {
              const reversed = index % 2 === 1;
              return (
                <li className="grid min-h-32 grid-cols-[72px_24px_1fr] items-center py-3 sm:grid-cols-[112px_32px_1fr] lg:min-h-36 lg:grid-cols-[1fr_40px_1fr]" key={`${event.time}-${event.title}`}>
                  <Reveal y={14} className={`col-start-1 row-start-1 flex justify-center ${reversed ? "lg:col-start-3 lg:justify-start lg:pl-10" : "lg:justify-end lg:pr-10"}`}>
                    <Illustration index={index} />
                  </Reveal>
                  <span aria-hidden="true" className="relative col-start-2 row-start-1 mx-auto grid h-5 w-5 place-items-center rounded-full border border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-paper))]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--aj-accent))]" />
                  </span>
                  <Reveal y={14} delay={0.06} className={`col-start-3 row-start-1 min-w-0 pl-3 text-center sm:pl-6 ${reversed ? "lg:col-start-1 lg:pl-0 lg:pr-10 lg:text-right" : "lg:pl-10 lg:text-left"}`}>
                    <time className="font-instrumentSerif text-3xl leading-none text-[rgb(var(--aj-accent-dark))] sm:text-4xl">{event.time}</time>
                    <h3 className="mt-2 whitespace-normal break-words text-balance font-instrumentSerif text-xl leading-tight sm:text-2xl">{event.title}</h3>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

