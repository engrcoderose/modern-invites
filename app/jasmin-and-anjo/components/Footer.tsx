"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import Image from "next/image";
import { ArrowUp, Heart } from "lucide-react";
import Flowers from "../assets/images/designs/down-flowers.png";

interface FooterProps {
  bride: string;
  groom: string;
  dateDisplay: string;
  hashtag: string;
}

export default function Footer({ bride, groom, dateDisplay, hashtag }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, amount: 0.12 });

  return (
    <footer ref={footerRef} data-visible={inView} className="footer-scroll relative isolate overflow-hidden bg-[#fbf8f1] px-5 pt-20 text-center text-[#624451] sm:px-8 sm:pt-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="footer-scroll-item flex items-center justify-center gap-5 text-[#ad8496]" aria-hidden="true"><span className="h-px w-14 bg-[#dac2cd]" /><Heart size={18} strokeWidth={1.2} /><span className="h-px w-14 bg-[#dac2cd]" /></div>
        <p className="footer-scroll-item mt-7 text-[10px] uppercase leading-6 tracking-[.25em] text-[#946879] lg:text-sm">We cannot wait to celebrate with you</p>
        <p className="footer-scroll-item mt-7 font-meaCulpa text-[clamp(4rem,10vw,9rem)] leading-[1.3]">{groom} <span className="text-[.55em] text-[#a77a8d]">&amp;</span> {bride}</p>
        <p className="footer-scroll-item mt-4 font-instrumentSerif text-2xl text-[#876675] lg:text-3xl">{dateDisplay} <span className="mx-2 text-[#cba4b6]">·</span> Malabon</p>
        <p className="footer-scroll-item mt-6 text-sm text-[#946879] lg:text-lg">{hashtag}</p>
        <div className="footer-scroll-item mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#e5d4dc] pt-7 text-xs text-[#876675] sm:flex-row lg:text-sm">
          <span>Together, in full bloom.</span>
          <a href="#top" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#d8beca] bg-[#fffdf8]/80 px-5 py-3 transition-colors hover:bg-[#f8edf0]">Back to the beginning<ArrowUp size={15} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="footer-flower-reveal relative -mx-5 mt-9 h-36 overflow-hidden sm:-mx-8 sm:mt-12 sm:h-52 lg:h-64" aria-hidden="true">
        <div className="footer-flower-sway pointer-events-none absolute -inset-x-4 inset-y-0 origin-bottom">
          <Image src={Flowers} alt="" fill sizes="100vw" className="object-cover object-bottom opacity-70 sm:object-fill" />
        </div>
      </div>
    </footer>
  );
}
