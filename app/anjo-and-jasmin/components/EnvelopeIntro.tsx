"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import WelcomeFlorals from "./WelcomeFlorals";
import WaxStamp from "../../jasmin-and-anjo/assets/images/designs/wax-stamp.png";
import { invitationOpenedEvent } from "../../jasmin-and-anjo/lib/events";
import { envelopeMessage, wedding } from "../data";

export default function EnvelopeIntro({ onOpening, onOpened }: { onOpening: () => void; onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    const restoration = window.history.scrollRestoration;
    document.body.style.overflow = "hidden";
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    dialog.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      window.history.scrollRestoration = restoration;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function open() {
    if (opening || timer.current) return;
    // Start audio in the actual user gesture, before the envelope animation.
    window.dispatchEvent(new Event(invitationOpenedEvent));
    onOpening();
    setOpening(true);
    timer.current = setTimeout(onOpened, reducedMotion ? 0 : 6800);
  }

  return <motion.div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Anjo and Jasmin's wedding invitation" className="outline-none fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto bg-[#fbf8f1] px-5 py-8" animate={{ opacity: opening ? 0 : 1 }} transition={{ delay: opening && !reducedMotion ? 6 : 0, duration: reducedMotion ? 0 : 0.8 }}>
    <div className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center text-center">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vw,640px)] w-[min(88vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cba4b6]/35 bg-[radial-gradient(ellipse,#f3e3e6,transparent_70%)]" />
      <WelcomeFlorals />
      <motion.div className="relative mb-8" animate={{ opacity: opening ? 0 : 1, y: opening ? -12 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.8 }}>
        <p className="aj-welcome-initials font-imperial text-6xl text-[#946879]" aria-label="Anjo and Jasmin initials">A &amp; J</p>
        <p className="aj-welcome-message mt-5 text-[10px] uppercase tracking-[.35em]">Invite you to<br /><span className="leading-7">Celebrate their Marriage</span></p>
      </motion.div>
      <button type="button" disabled={opening} onClick={open} aria-label="Open Anjo and Jasmin's wedding invitation" className="aj-welcome-envelope group relative my-8 h-[min(53vw,250px)] w-[min(84vw,380px)] rounded-md text-[#624451] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#946879] disabled:cursor-default">
        <div data-opening={opening} className="aj-envelope-float absolute inset-0">
        <motion.div aria-hidden="true" className="absolute inset-0 [perspective:1200px]" animate={{ y: opening ? 24 : 0 }} transition={{ delay: reducedMotion ? 0 : 0.6, duration: reducedMotion ? 0 : 2.2, ease: "easeInOut" }}>
          <div className="aj-envelope-paper absolute inset-0 rounded-[5px] border border-[#bfa2ac] bg-[linear-gradient(155deg,#d9c1c9,#b693a1_65%,#d4b7c2)] shadow-[0_2px_3px_#62445120,0_18px_30px_-8px_#62445140,0_38px_65px_-20px_#62445130,inset_0_2px_6px_#62445135]" />
          <motion.div className="aj-envelope-card aj-envelope-paper absolute inset-x-4 inset-y-3 z-10 overflow-hidden rounded-sm border border-[#e8ded0] bg-[#fffdf8] p-3 shadow-[0_2px_5px_#62445120,0_12px_24px_#62445125]" animate={{ y: opening ? "-72%" : 0 }} transition={{ delay: reducedMotion ? 0 : 2.1, duration: reducedMotion ? 0 : 1.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative z-[1] text-center">
              <p className="font-imperial text-[30px] leading-none text-[#946879] sm:text-[38px]">Anjo &amp; Jasmin</p>
              <p className="mt-2 text-[10px] leading-relaxed tracking-[.04em] sm:text-[11px]">{wedding.dateDisplay} · {wedding.time}</p>
              <div className="mx-auto my-2 h-px w-12 bg-[#cba4b6]/60" />
              <p className="mx-auto max-w-[250px] font-serif text-[11px] leading-[1.6] sm:text-[13px]">{envelopeMessage}</p>
            </div>
          </motion.div>
          <div className="absolute inset-0 z-20 drop-shadow-[1px_-1px_1px_#79576630]">
            <div className="aj-envelope-paper absolute inset-0 rounded-[5px] bg-[linear-gradient(125deg,#f5e7ec,#dcc3ce)] [clip-path:polygon(0_0,54%_54%,0_100%)]" />
            <div className="aj-envelope-paper absolute inset-0 rounded-[5px] bg-[linear-gradient(235deg,#f3e2e8,#d2b4c1)] [clip-path:polygon(100%_0,46%_54%,100%_100%)]" />
          </div>
          <div className="absolute inset-0 z-20 drop-shadow-[0_-2px_2px_#79576630]">
            <div className="aj-envelope-paper absolute inset-0 rounded-[5px] border-b border-[#b995a5]/60 bg-[linear-gradient(175deg,#f9edf1_20%,#ecd6df_75%,#dfc1ce)] [clip-path:polygon(0_100%,0_98%,49%_46%,51%_46%,100%_98%,100%_100%)]" />
          </div>
          {/* The flap turns over at its fold, then moves behind the rising card. */}
          <motion.div data-opening={opening} className="aj-envelope-flap absolute inset-0 z-30 origin-top [transform-style:preserve-3d]" animate={{ rotateX: opening ? -180 : 0 }} transition={{ delay: reducedMotion ? 0 : 0.65, duration: reducedMotion ? 0 : 1.8, ease: [0.45, 0, 0.2, 1] }}>
            <div className="absolute inset-0 [backface-visibility:hidden] drop-shadow-[0_3px_2px_#62445140]">
              <div className="aj-envelope-paper absolute inset-0 rounded-t-[5px] bg-[linear-gradient(165deg,#f8eaf0,#e4c9d5_72%,#cfa8b9)] [clip-path:polygon(0_0,100%_0,52%_59%,50%_60%,48%_59%)]" />
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="aj-envelope-paper absolute inset-0 rounded-t-[5px] bg-[linear-gradient(180deg,#c8a6b5,#eedbe3_65%)] [clip-path:polygon(0_0,100%_0,52%_59%,50%_60%,48%_59%)]" />
            </div>
          </motion.div>
          <motion.div className="absolute left-1/2 top-[57%] z-40 -ml-9 -mt-9 h-[72px] w-[72px] sm:-ml-10 sm:-mt-10 sm:h-20 sm:w-20" animate={{ opacity: opening ? 0 : 1, y: opening ? -18 : 0, scale: opening ? 1.12 : 1, rotate: opening ? -8 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.65, ease: "easeInOut" }}>
            <Image src={WaxStamp} alt="" fill priority sizes="(max-width: 640px) 72px, 80px" className="object-contain drop-shadow-[1px_5px_5px_#53304645]" />
          </motion.div>
        </motion.div>
        </div>
      </button>
      <p role="status" className="sr-only">{opening ? `${wedding.groom} and ${wedding.bride}. ${wedding.date}, ${wedding.time}. ${envelopeMessage}` : ""}</p>
      <div className="relative mt-6">
        <p className="aj-welcome-names font-imperial text-5xl sm:text-6xl">Anjo &amp; Jasmin</p>
        <p className="aj-welcome-date mt-3 text-xs tracking-[.15em]">{wedding.dateDisplay} · {wedding.time}</p>
        <button type="button" onClick={open} disabled={opening} className="aj-welcome-action mt-6 min-h-11 rounded-full border border-[#cba4b6] bg-white/60 px-7 py-3 text-[10px] uppercase tracking-[.25em] transition hover:bg-[#f3e3e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]">Open invitation</button>
      </div>
    </div>
  </motion.div>;
}
