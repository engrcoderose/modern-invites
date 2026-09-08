"use client";

import { useRef } from "react";
import { Camera, Church, Music2, Wine } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { TimelineEvent } from "../types";
import Reveal from "./motion/Reveal";

function Illustration({ index }: { index: number; }) {
  if (index === 1) return (
    <svg viewBox="0 0 110 110" fill="none" aria-hidden="true" className="h-[110px] w-[110px] max-[600px]:h-[84px] max-[600px]:w-[68px]">
      <ellipse cx="55" cy="65" rx="38" ry="35" fill="#f5ebd8" fillOpacity=".55" />
      <circle cx="55" cy="65" r="26" stroke="#b69a68" strokeWidth="3" />
      <circle cx="55" cy="65" r="21" stroke="#d8c49a" strokeWidth="1.2" />
      <path d="M40 27L46 19H64L70 27L55 43Z" fill="#f9e7ec" stroke="#b69a68" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M40 27H70M46 19L50 27L55 43L60 27L64 19M50 27L55 19L60 27" stroke="#c8ae91" strokeWidth="1" strokeLinejoin="round" />
      <path d="M55 7V11M31 18L35 22M79 18L75 22" stroke="#c8ae91" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  const Icon = [Church, Church, Camera, Wine, Music2][index % 5];
  return <div className={`relative grid h-[110px] w-[110px] place-items-center max-[600px]:h-[84px] max-[600px]:w-[68px] ${["text-[#819274]", "text-[#819274]", "text-[#a28597]", "text-[#b2997b]", "text-[#8d98ad]"][index % 5]}`}>
    <span className="absolute inset-x-2.5 top-5 bottom-[15px] -rotate-[15deg] rounded-[47%_53%_65%_35%] bg-[radial-gradient(ellipse,#d9e1cb90,transparent_72%)]" />
    <Icon size={68} strokeWidth={1} className="relative max-[600px]:h-[49px] max-[600px]:w-[49px]" aria-hidden="true" />
    <svg className="absolute bottom-0 left-5 h-[35px] w-20 max-[600px]:left-[9px] max-[600px]:w-[58px]" viewBox="0 0 90 40" fill="none" aria-hidden="true"><path d="M8 34C27 36 45 26 63 7M24 32C12 28 12 20 14 16C22 18 26 23 24 32ZM36 26C35 15 40 10 45 9C47 17 44 23 36 26ZM48 19C57 22 67 18 70 14C61 11 54 12 48 19Z" stroke="#889779" strokeWidth="1" fill="#b9c7aa" fillOpacity=".65" /></svg>
  </div>;
}

export default function WeddingTimeline({ program }: { program: TimelineEvent[]; }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const markerTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  if (!program.length) return null;
  return <section id="timeline" className="mt-[100px] scroll-mt-[90px] max-[600px]:mt-16" aria-labelledby="wedding-timeline-title">
    <div className="mx-auto max-w-[660px] rounded-3xl border border-[#e3dad0] bg-[#fffdf7] px-[46px] pt-[52px] pb-9 shadow-[0_14px_55px_#62445106] max-[600px]:rounded-[17px] max-[600px]:px-[15px] max-[600px]:pt-[34px] max-[600px]:pb-7">
      <header className="text-center">
        <p className="text-[9px] uppercase tracking-[.25em] text-[#946879]">A day to remember</p>
        <h2 id="wedding-timeline-title" className="mt-[15px] mb-3.5 font-instrumentSerif text-[54px] font-normal leading-[1.08] text-[#624451] max-[600px]:text-[40px]">Wedding <em className="font-meaCulpa font-normal text-[#946879]">timeline</em></h2>
        <span className="block text-[10px] uppercase tracking-[.18em] text-[#756770]">November 21, 2026</span>
        <small className="mt-[15px] block text-[10px] text-[#756770] max-[600px]:text-[9px]">Sample program · Times to be confirmed</small>
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
