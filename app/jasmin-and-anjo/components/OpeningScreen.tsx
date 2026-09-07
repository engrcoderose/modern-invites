"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FloralBorder from "../assets/images/designs/floral-designs.png";
import { ArrowRight } from "lucide-react";
import WelcomePhoto from "../assets/images/prenup/pexels-king-caplis-471600979-36396174.jpg";
import { invitationOpenedEvent } from "../lib/events";

interface OpeningScreenProps {
  bride: string;
  groom: string;
  dateDisplay: string;
  onOpen: () => void;
}

export default function OpeningScreen({ bride, groom, dateDisplay, onOpen }: OpeningScreenProps) {
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
    onOpen();
    window.setTimeout(() => setIsOpen(false), 550);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${groom} and ${bride}'s wedding invitation`}
      className={`opening-screen fixed inset-0 z-[100] h-dvh w-full overflow-x-hidden overflow-y-auto bg-[#263d35] text-[#ffe1ee]${introReady ? " opening-screen--ready" : ""}${isClosing ? " opening-screen--closing" : ""}`}
    >
      <div className="opening-photo-frame absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image src={WelcomePhoto} alt="" fill priority quality={90} sizes="100vw" className="opening-photo object-cover" />
      </div>
      <div className="opening-photo-wash absolute inset-0" aria-hidden="true" />
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="opening-floral-cutout" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -3 -3 -3 0 8.7" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="opening-florals pointer-events-none absolute top-0 z-[1] h-full opening-florals--left" aria-hidden="true">
        <div className="opening-floral-bloom relative h-full w-full">
          <Image src={FloralBorder} alt="" fill sizes="(max-width: 600px) 120px, 220px" />
        </div>
      </div>
      <div className="opening-florals pointer-events-none absolute top-0 z-[1] h-full opening-florals--right" aria-hidden="true">
        <div className="opening-floral-bloom relative h-full w-full">
          <Image src={FloralBorder} alt="" fill sizes="(max-width: 600px) 120px, 220px" />
        </div>
      </div>

      <div className="opening-copy relative z-[2] items-center justify-items-center text-center font-libreBaskerville">
        <p className="opening-family flex flex-col gap-0.5 opening-reveal">
          <span className="pl-[.3em] text-[clamp(20px,2.7vw,34px)] uppercase tracking-[.3em]">Together</span>
          <span className="font-imperial text-[clamp(25px,2.9vw,36px)] leading-none">with their families</span>
        </p>
        <h1 className="opening-couple flex w-full items-baseline justify-center m-0 py-[.15em] [font-family:var(--font-mea-culpa),cursive] text-[clamp(76px,12.5vw,185px)] font-normal not-italic leading-[1.05] whitespace-nowrap opening-reveal" aria-label={`${groom} and ${bride}`}>
          <span>{groom}</span><span className="opening-couple-ampersand text-[.8em]">&amp;</span><span>{bride}</span>
        </h1>
        <p className="opening-details font-sans text-[clamp(12px,1.65vw,21px)] leading-[1.8] tracking-[.035em] opening-reveal">
          <span>{dateDisplay}</span><span aria-hidden="true"> · </span><span>San Bartolome Parish · Malabon</span>
        </p>
        <p className="opening-message font-sans text-[clamp(15px,1.65vw,21px)] leading-[1.3] tracking-[.025em] opening-reveal">Invite you to<br />Celebrate their Marriage</p>
        <div className="opening-action opening-reveal">
          <button autoFocus type="button" onClick={openInvitation} disabled={isClosing} className="opening-button flex min-h-[60px] items-center justify-center gap-2.5 border-2 border-[#ffe1ee] bg-[#d8b3ca66] px-[38px] py-[15px] font-sans text-[clamp(13px,1.65vw,20px)] uppercase tracking-[.025em] text-[#fff4f8] disabled:cursor-default">
            Open invitation <ArrowRight size={20} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
