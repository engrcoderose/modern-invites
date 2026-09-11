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
      className={`opening-screen fixed inset-0 z-[100] h-dvh w-full overflow-x-hidden overflow-y-auto bg-[#263d35] text-[#ffe1ee]${introReady ? " opening-screen--ready" : ""}${isClosing ? " pointer-events-none opening-screen--closing" : ""}`}
    >
      <div className="opening-photo-frame absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image src={WelcomePhoto} alt="" fill priority quality={90} sizes="100vw" className="opening-photo object-cover object-[center_52%] max-[600px]:object-[54%_center]" />
      </div>
      <div className="absolute inset-0 bg-[#43543f]/[.34] max-[600px]:bg-[#283e2e]/[.43]" aria-hidden="true" />
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="opening-floral-cutout" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -3 -3 -3 0 8.7" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="opening-florals w-[clamp(140px,19vw,260px)] max-[600px]:w-[150px] pointer-events-none absolute top-0 z-[1] h-full -left-[5.7%] -scale-x-100 max-[600px]:-left-[60px]" aria-hidden="true">
        <div className="opening-floral-bloom origin-bottom relative h-full w-full">
          <Image src={FloralBorder} alt="" fill sizes="(max-width: 600px) 150px, 260px" className="object-fill [filter:url(#opening-floral-cutout)]" />
        </div>
      </div>
      <div className="opening-florals w-[clamp(140px,19vw,260px)] max-[600px]:w-[150px] pointer-events-none absolute top-0 z-[1] h-full opening-florals--right -right-[5.7%] max-[600px]:-right-[60px]" aria-hidden="true">
        <div className="opening-floral-bloom origin-bottom relative h-full w-full">
          <Image src={FloralBorder} alt="" fill sizes="(max-width: 600px) 150px, 260px" className="object-fill [filter:url(#opening-floral-cutout)]" />
        </div>
      </div>

      <div className="grid h-full min-h-[620px] grid-rows-[1fr_2.5fr_0.8fr_1fr_1fr] px-[12%] pt-[9vh] pb-[7vh] [text-shadow:0_1px_5px_#263d3538] max-[600px]:min-h-[640px] max-[600px]:grid-rows-[1fr_2.4fr_1fr_1fr_1fr] max-[600px]:px-[35px] max-[600px]:pt-[9svh] max-[600px]:pb-[6svh] [@media(max-height:500px)_and_(min-width:601px)]:min-h-[460px] [@media(max-height:500px)_and_(min-width:601px)]:py-[25px] relative z-[2] items-center justify-items-center text-center font-libreBaskerville">
        <p className="opening-family flex flex-col gap-0.5 opening-reveal">
          <span className="pl-[.3em] text-[clamp(20px,2.7vw,34px)] uppercase tracking-[.3em]">Together</span>
          <span className="font-imperial text-[clamp(25px,2.9vw,36px)] leading-none">with their families</span>
        </p>
        <h1 className="opening-couple gap-[.18em] max-[600px]:flex-wrap max-[600px]:gap-x-[.13em] max-[600px]:gap-y-0 max-[600px]:text-[clamp(70px,19vw,110px)] max-[600px]:leading-[.9] [@media(max-height:500px)_and_(min-width:601px)]:text-[100px] flex w-full items-baseline justify-center m-0 py-[.15em] [font-family:var(--font-mea-culpa),cursive] text-[clamp(76px,12.5vw,185px)] font-normal not-italic leading-[1.05] whitespace-nowrap opening-reveal" aria-label={`${groom} and ${bride}`}>
          <span>{groom}</span><span className="opening-couple-ampersand text-[.8em]">&amp;</span><span className="max-[600px]:basis-full">{bride}</span>
        </h1>
        <p className="opening-details max-[600px]:max-w-[280px] max-[600px]:text-[13px] font-sans text-[clamp(12px,1.65vw,21px)] leading-[1.8] tracking-[.035em] opening-reveal">
          <span className="max-[600px]:block">{dateDisplay}</span><span className="max-[600px]:hidden" aria-hidden="true"> · </span><span>San Bartolome Parish · Malabon</span>
        </p>
        <p className="opening-message font-sans text-[clamp(15px,1.65vw,21px)] leading-[1.3] tracking-[.025em] opening-reveal">Invite you to<br />Celebrate their Marriage</p>
        <div className="opening-action opening-reveal">
          <button autoFocus type="button" onClick={openInvitation} disabled={isClosing} className="transition-[background,transform] duration-200 hover:bg-[#d8b3ca99] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#fff4f8] focus-visible:outline-offset-[5px] max-[600px]:min-h-[54px] max-[600px]:px-[25px] max-[600px]:py-3.5 motion-reduce:transition-none flex min-h-[60px] items-center justify-center gap-2.5 border-2 border-[#ffe1ee] bg-[#d8b3ca66] px-[38px] py-[15px] font-sans text-[clamp(13px,1.65vw,20px)] uppercase tracking-[.025em] text-[#fff4f8] disabled:cursor-default">
            Open invitation <ArrowRight size={20} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
