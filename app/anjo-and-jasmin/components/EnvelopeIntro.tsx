"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Botanicals from "../../jasmin-and-anjo/components/Botanicals";
import WelcomePhoto from "../../jasmin-and-anjo/assets/images/prenup/pexels-king-caplis-471600979-36396174.jpg";
import { invitationOpenedEvent } from "../../jasmin-and-anjo/lib/events";
import { wedding } from "../data";

export default function EnvelopeIntro({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    const restoration = window.history.scrollRestoration;
    document.body.style.overflow = "hidden";
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = overflow;
      window.history.scrollRestoration = restoration;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function open() {
    if (opening) return;
    // Start audio in the actual user gesture, before the envelope animation.
    window.dispatchEvent(new Event(invitationOpenedEvent));
    setOpening(true);
    timer.current = setTimeout(onOpened, reducedMotion ? 0 : 1600);
  }

  return <motion.div role="dialog" aria-modal="true" aria-label="Anjo and Jasmin's wedding invitation" className="fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto bg-[#fbf8f1] px-5 py-8" animate={{ opacity: opening ? 0 : 1 }} transition={{ delay: opening ? 1.15 : 0, duration: reducedMotion ? 0 : 0.45 }}>
    <div className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center text-center">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vw,640px)] w-[min(88vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cba4b6]/35 bg-[radial-gradient(ellipse,#f3e3e6,transparent_70%)]" />
      <Botanicals className="-left-20 top-0 w-44 opacity-60 sm:left-4 sm:w-64" />
      <Botanicals className="-right-20 bottom-0 w-44 rotate-180 opacity-60 sm:right-4 sm:w-64" />
      <div className="relative mb-8">
        <p className="font-imperial text-6xl text-[#946879]" aria-label="Anjo and Jasmin initials">A &amp; J</p>
        <p className="mt-5 text-[10px] uppercase tracking-[.35em]">Invite you to<br /><span className="leading-7">Celebrate their Marriage</span></p>
      </div>
      <button autoFocus type="button" disabled={opening} onClick={open} aria-label="Open Anjo and Jasmin's wedding invitation" className="group relative my-8 h-[min(53vw,250px)] w-[min(84vw,380px)] rounded-md text-[#624451] shadow-[0_24px_60px_#62445125] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#946879] disabled:cursor-default">
        <div className="absolute inset-0 rounded-md bg-[#d8b9c7]" />
        <motion.div className="absolute inset-x-5 inset-y-2 overflow-hidden rounded border border-[#ead7df] bg-[#fffdf8] p-3 shadow-md" animate={{ y: opening ? "-55%" : 0 }} transition={{ delay: 0.3, duration: reducedMotion ? 0 : 0.8 }}>
          <div className="relative h-3/4 overflow-hidden"><Image src={WelcomePhoto} alt="Anjo and Jasmin together" fill priority sizes="350px" className="object-cover object-[center_52%]" /></div>
          <p className="mt-2 font-imperial text-3xl">Anjo &amp; Jasmin</p>
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 rounded-md bg-[#f0dce3] [clip-path:polygon(0_0,50%_57%,100%_0,100%_100%,0_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 rounded-md bg-[#f5e9ed] [clip-path:polygon(0_100%,50%_45%,100%_100%)]" />
        <motion.div aria-hidden="true" className="absolute inset-0 origin-top rounded-md bg-[#e5c9d5] [clip-path:polygon(0_0,100%_0,50%_58%)]" animate={{ rotateX: opening ? 180 : 0, opacity: opening ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.6 }} />
        <motion.span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#b58c9e] bg-[#946879] whitespace-nowrap font-imperial text-xl text-white shadow-md" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.2 }}>A &amp; J</motion.span>
      </button>
      <div className="relative mt-6">
        <p className="font-imperial text-5xl sm:text-6xl">Anjo &amp; Jasmin</p>
        <p className="mt-3 text-xs tracking-[.15em]">{wedding.dateDisplay} · {wedding.time}</p>
        <button type="button" onClick={open} disabled={opening} className="mt-6 min-h-11 rounded-full border border-[#cba4b6] bg-white/60 px-7 py-3 text-[10px] uppercase tracking-[.25em] transition hover:bg-[#f3e3e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]">Open invitation</button>
      </div>
    </div>
  </motion.div>;
}


