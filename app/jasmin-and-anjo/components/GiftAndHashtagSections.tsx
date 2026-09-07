"use client";

import { useState } from "react";
import { Camera, Check, Copy, Gift, Heart } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";

const hashtag = "#JasTheOneForAnjo";

export default function GiftAndHashtagSections() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  async function copyHashtag() {
    try {
      await navigator.clipboard.writeText(hashtag);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <>
      <section
        id="gifts"
        aria-labelledby="gift-title"
        className="relative overflow-hidden bg-[#fbf8f1] px-6 py-20 text-[#624451] sm:px-10 sm:py-28"
      >
        <SectionPetals />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#cba4b6]/40 bg-[#f8edf0]">
            <Gift size={26} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <p className="mt-7 text-[10px] uppercase tracking-[.3em] text-[#946879]">
            A little note on giving
          </p>
          <h2
            id="gift-title"
            className="mt-5 font-instrumentSerif text-5xl leading-tight sm:text-6xl"
          >
            Your presence is our
            <br />
            <span className="font-meaCulpa text-[#946879]">greatest gift.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-[#756770]">
            Having you beside us as we begin our married life means more than
            words can say. Your love, laughter, and warm wishes will make our
            celebration truly special.
          </p>
          <div className="mx-auto mt-9 max-w-lg rounded-2xl border border-[#cba4b6]/30 bg-white/50 px-7 py-6">
            <h3 className="font-instrumentSerif text-2xl">
              For those who wish to give
            </h3>
            <p className="mt-3 text-xs leading-7 text-[#756770]">
              Our gift preferences and any registry details will be shared here
              soon. Thank you for thinking of us with so much love.
            </p>
          </div>
          <Heart
            aria-hidden="true"
            size={16}
            strokeWidth={1.2}
            className="mx-auto mt-8 text-[#b98c9d]"
          />
        </Reveal>
      </section>

      <section
        id="hashtag"
        aria-labelledby="hashtag-title"
        className="relative overflow-hidden border-y border-[#cba4b6]/20 bg-[#f8edf0] px-6 py-20 text-center text-[#624451] sm:px-10 sm:py-24"
      >
        <Reveal className="relative mx-auto max-w-4xl">
          <Camera
            aria-hidden="true"
            size={28}
            strokeWidth={1.2}
            className="mx-auto text-[#946879]"
          />
          <p className="mt-6 text-[10px] uppercase tracking-[.3em] text-[#946879]">
            Through your eyes
          </p>
          <h2
            id="hashtag-title"
            className="mt-5 font-instrumentSerif text-5xl sm:text-6xl"
          >
            Capture the{" "}
            <span className="font-meaCulpa text-[#946879]">love.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-[#756770]">
            The happy tears, the little glances, the dance-floor laughter. Share
            your favorite moments so we can relive the day together.
          </p>
          <p className="mt-9 select-text break-words font-instrumentSerif text-[clamp(1.65rem,5.5vw,3.5rem)] leading-tight">
            {hashtag}
          </p>
          <button
            type="button"
            onClick={copyHashtag}
            className="mx-auto mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[#cba4b6] bg-[#fffdf8]/70 px-6 py-3 text-xs transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]"
          >
            {copyStatus === "copied" ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            {copyStatus === "copied" ? "Hashtag copied" : "Copy hashtag"}
          </button>
          <p role="status" className="mt-3 min-h-5 text-xs text-[#756770]">
            {copyStatus === "copied"
              ? "Ready to paste into your photo caption."
              : copyStatus === "error"
                ? "Please select and copy the hashtag above."
                : ""}
          </p>
        </Reveal>
      </section>
    </>
  );
}
