"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RingFocus from "../assets/ring-focus.jpg";
import { invitationOpenedEvent } from "../lib/events";

interface OpeningScreenProps {
  bride: string;
  groom: string;
  dateDisplay: string;
}

export default function OpeningScreen({ bride, groom, dateDisplay }: OpeningScreenProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(window.history.state, "", cleanUrl);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const revealDelay = window.setTimeout(() => setIntroReady(true), 30);
    return () => window.clearTimeout(revealDelay);
  }, []);

  const openInvitation = () => {
    window.dispatchEvent(new Event(invitationOpenedEvent));
    setIsClosing(true);
    window.setTimeout(() => setIsOpen(false), 550);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${bride} and ${groom}'s wedding invitation`}
      className={`opening-screen fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-[#20050b] text-[#fff8ee]${introReady ? " opening-screen--ready" : ""}${isClosing ? " opening-screen--closing" : ""}`}
    >
      <Image src={RingFocus} alt="" fill priority quality={78} sizes="100vw" className="object-cover" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src="/videos/hero-scroll-optimized.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[#4c0b1b]/45 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,2,6,.6),rgba(43,5,14,.12)_42%,rgba(18,2,6,.78))]" />
      <div className="hero-grain absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-3 border border-white/15 sm:inset-5" />

      <div className="relative flex h-full flex-col items-center justify-between px-6 py-10 text-center sm:py-12">
        <div className="opening-reveal flex items-center gap-4 text-[0.58rem] uppercase tracking-[0.35em] text-[#ead5aa]">
          <span className="h-px w-8 bg-[#d8bd83]/70" />
          The wedding of
          <span className="h-px w-8 bg-[#d8bd83]/70" />
        </div>

        <div>
          <p
            aria-label={`${bride} and ${groom}`}
            className="opening-names font-instrumentSerif text-[clamp(4rem,11vw,9rem)] leading-[0.78] tracking-[-0.055em] drop-shadow-2xl"
          >
            <span aria-hidden="true" className="opening-name-line opening-name-line--bride">
              <span className="opening-name-reveal">{bride}</span>
            </span>
            <span aria-hidden="true" className="opening-ampersand my-1 block font-meaCulpa text-[0.48em] font-normal leading-none text-[#e2c689] sm:my-2">and</span>
            <span aria-hidden="true" className="opening-name-line opening-name-line--groom">
              <span className="opening-name-reveal">{groom}</span>
            </span>
          </p>
          <p className="opening-reveal mt-8 text-[0.62rem] uppercase tracking-[0.32em] text-white/75 [animation-delay:340ms]">
            {dateDisplay} · Antipolo, Philippines
          </p>
        </div>

        <div className="opening-reveal [animation-delay:480ms]">
          <button
            type="button"
            onClick={openInvitation}
            className="group flex min-w-[16rem] items-center justify-between border border-[#e4cc9b]/55 bg-[#2c0711]/45 px-6 py-4 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#fff8ee] backdrop-blur-md transition duration-300 hover:scale-[1.025] hover:bg-[#e6d0a5] hover:text-[#3a0915] active:scale-[0.98]"
          >
            Open invitation
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
