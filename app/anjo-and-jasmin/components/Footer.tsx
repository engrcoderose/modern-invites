"use client";

import { FooterFlowers as Flowers } from "../design-media";

import { useRef } from "react";
import { useInView } from "motion/react";
import Image from "next/image";
import { ArrowUp, Heart } from "lucide-react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import Reveal from "./motion/Reveal";

interface FooterProps {
  bride: string;
  groom: string;
  dateDisplay: string;
  hashtag: string;
}

export default function Footer({
  bride,
  groom,
  dateDisplay,
  hashtag,
}: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { amount: 0.12 });
  const pageVisible = usePageVisibility();

  return (
    <footer
      ref={footerRef}
      data-playing={inView && pageVisible}
      className="aj-footer relative isolate overflow-hidden bg-[rgb(var(--aj-cream))] px-5 pt-20 text-center text-[rgb(var(--aj-ink))] sm:px-8 sm:pt-28"
    >
      <Reveal className="relative z-10 mx-auto max-w-6xl" y={24}>
        <div
          className="footer-scroll-item flex items-center justify-center gap-5 text-[rgb(var(--aj-accent-dark))]"
          aria-hidden="true"
        >
          <span className="h-px w-14 bg-[rgb(var(--aj-clay))]" />
          <Heart size={18} strokeWidth={1.2} />
          <span className="h-px w-14 bg-[rgb(var(--aj-clay))]" />
        </div>
        <p className="footer-scroll-item mt-7 font-meaCulpa text-[clamp(4rem,10vw,9rem)] leading-[1.3]">
          {groom} <span className="text-[.55em] text-[rgb(var(--aj-accent-dark))]">&amp;</span>{" "}
          {bride}
        </p>
        <p className="footer-scroll-item mt-4 font-instrumentSerif text-2xl text-[rgb(var(--aj-muted))] lg:text-3xl">
          {dateDisplay} <span className="mx-2 text-[rgb(var(--aj-line))]">·</span> Malabon
        </p>
        <p className="footer-scroll-item mt-6 text-sm text-[rgb(var(--aj-accent-dark))] lg:text-lg">
          {hashtag}
        </p>
        <div className="footer-scroll-item mt-12 flex justify-center border-t border-[rgb(var(--aj-line))]/50 pt-7 text-xs text-[rgb(var(--aj-muted))] lg:text-sm">
          <a
            href="#invitation"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-paper))]/80 px-5 py-3 transition-colors hover:bg-[rgb(var(--aj-sand))]"
          >
            Back to top
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
      <div
        className="relative mx-auto mt-9 w-[85%] max-w-4xl overflow-hidden sm:mt-12"
        aria-hidden="true"
      >
        <div className="aj-footer-flower-sway pointer-events-none relative origin-bottom px-2">
          <Image
            src={Flowers}
            alt=""
            sizes="(max-width: 640px) 80vw, (max-width: 1120px) 82vw, 880px"
            className="aj-botanical block h-auto w-full opacity-40"
          />
        </div>
      </div>
      <p className="relative z-10 mt-3 pb-24 text-xs text-[rgb(var(--aj-muted))] sm:pb-8">
        Created by{" "}
        <a
          href="https://www.moderninvites.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center underline decoration-[rgb(var(--aj-line))] underline-offset-4 transition-colors hover:text-[rgb(var(--aj-accent-dark))] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent-dark))]"
        >
          Modern Invites
        </a>
      </p>
    </footer>
  );
}
