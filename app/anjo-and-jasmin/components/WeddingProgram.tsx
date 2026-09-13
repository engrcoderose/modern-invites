"use client";

import { useRef } from "react";
import { wedding } from "../data";
import FloralAccent from "./FloralAccent";
import Image from "next/image";
import { timelineIllustrations } from "../media";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { TimelineEvent } from "../../jasmin-and-anjo/types";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";

function Illustration({ index }: { index: number; }) {
  const source = timelineIllustrations[index] ?? timelineIllustrations[3];
  return (
    <div className="relative h-[110px] w-[110px] shrink-0 max-[600px]:h-[84px] max-[600px]:w-[68px]">
      <Image src={source} alt="" aria-hidden="true" fill sizes="(max-width: 600px) 68px, 110px" className="object-contain" />
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
  return <section id="program" className="relative overflow-hidden bg-[#e9edf0] bg-[radial-gradient(ellipse_at_center,#faf7f1,transparent_75%)] px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="wedding-timeline-title">
    <FloralAccent kind="blue" className="-right-12 bottom-24 w-44 opacity-65 sm:right-[calc(50%-450px)] sm:w-64" />
    <div className="relative mx-auto max-w-[660px] rounded-t-[5rem] rounded-b-xl border border-[#c7cfc7] bg-[#fffdf7] px-[46px] pt-[60px] pb-9 shadow-[0_14px_55px_#62445112] max-[600px]:rounded-t-[3rem] max-[600px]:px-[15px] max-[600px]:pt-[42px] max-[600px]:pb-7">
      <FloralAccent kind="daisies" className="-top-10 left-1/2 w-24 -translate-x-1/2 rotate-12" sizes="96px" />
      <header className="text-center">
        <p className="text-[9px] uppercase tracking-[.25em] text-[#946879]">A day to remember</p>
        <h2 id="wedding-timeline-title" className="mt-[15px] mb-3.5 font-instrumentSerif text-[54px] font-normal leading-[1.08] text-[#624451] max-[600px]:text-[40px]">Wedding <em className="font-meaCulpa font-normal text-[#946879]">timeline</em></h2>
        <span className="block text-[10px] uppercase tracking-[.18em] text-[#756770]">{wedding.dateDisplay}</span>
        <small className="mt-[15px] block text-[10px] leading-5 text-[#756770] max-[600px]:text-[9px]">2:30 PM church arrival · {wedding.time} ceremony<br />Reception times are samples</small>
      </header>
      <ol ref={listRef} className="relative mt-[42px] list-none p-0 [--timeline-axis:37%] max-[600px]:mt-[30px] max-[600px]:[--timeline-axis:32%]">
        <li className="absolute inset-y-0 left-[var(--timeline-axis)] w-0.5 bg-[repeating-linear-gradient(to_bottom,#9b9f89_0_2px,transparent_2px_8px)]" aria-hidden="true">
          {!reducedMotion && <motion.span className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7d9368] shadow-[0_0_0_5px_#fffdf7] motion-reduce:hidden" style={{ top: markerTop }} />}
        </li>
        {program.map((event, index) => <li className="grid min-h-[175px] grid-cols-[var(--timeline-axis)_1fr] items-center py-[22px] max-[600px]:min-h-[165px]" key={`${event.time}-${event.title}`}>
          <Reveal y={14} className="flex justify-center pr-6 max-[600px]:pr-3"><Illustration index={index} /></Reveal>
          <Reveal y={14} delay={0.06} className="pl-8 max-[600px]:pl-5">
            <time className="font-instrumentSerif text-[25px] text-[#624451] max-[600px]:text-[22px]">{event.time}</time>
            <h3 className="mt-[9px] text-[10px] font-medium uppercase leading-[1.8] tracking-[.14em] text-[#624451] max-[600px]:text-[9px] max-[600px]:tracking-[.09em]">{event.title}</h3>
            <p className="mt-2 max-w-60 font-instrumentSerif text-[17px] leading-normal text-[#756770] max-[600px]:text-[15px]">{event.description}</p>
          </Reveal>
        </li>)}
      </ol>
      <p className="mt-10 text-center font-meaCulpa text-[29px] text-[#946879] max-[600px]:text-2xl">A little love in every moment.</p>
    </div>
  </section>;
}

