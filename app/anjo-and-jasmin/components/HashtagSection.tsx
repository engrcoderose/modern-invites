"use client";

import { useState } from "react";
import { Camera, Check, Copy } from "lucide-react";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";

export default function HashtagSection({ hashtag }: { hashtag: string }) {
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
    <section
      id="hashtag"
      aria-labelledby="hashtag-title"
      className="relative overflow-hidden border-y border-[#cba4b6]/20 bg-[#f4d1b6]/30 px-6 py-20 text-center text-[#624451] sm:px-10 sm:py-24"
    >
      <Reveal className="relative mx-auto max-w-4xl">
        <Camera
          aria-hidden="true"
          size={28}
          strokeWidth={1.2}
          className="mx-auto text-[#946879]"
        />
        <p className="mt-6 text-[10px] lg:text-sm uppercase tracking-[.3em] text-[#946879]">
          Through your eyes
        </p>
        <h2
          id="hashtag-title"
          className="mt-5 font-instrumentSerif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Capture the{" "}
          <span className="font-meaCulpa text-[#946879]">love.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg lg:max-w-2xl text-sm leading-8 lg:text-xl lg:leading-9 text-[#756770]">
          The happy tears, the little glances, the dance-floor laughter. Share
          your favorite moments so we can relive the day together.
        </p>
        <p className="mt-9 select-text break-words font-instrumentSerif text-[clamp(1.65rem,5.5vw,3.5rem)] lg:text-7xl leading-tight">
          {hashtag}
        </p>
        <button
          type="button"
          onClick={copyHashtag}
          className="mx-auto mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[#cba4b6] bg-[#fffdf8]/70 px-6 py-3 text-xs lg:px-8 lg:py-4 lg:text-base transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]"
        >
          {copyStatus === "copied" ? (
            <Check size={15} aria-hidden="true" />
          ) : (
            <Copy size={15} aria-hidden="true" />
          )}
          {copyStatus === "copied" ? "Hashtag copied" : "Copy hashtag"}
        </button>
        <p
          role="status"
          className="mt-3 min-h-5 text-xs lg:text-base text-[#756770]"
        >
          {copyStatus === "copied"
            ? "Ready to paste into your photo caption."
            : copyStatus === "error"
              ? "Please select and copy the hashtag above."
              : ""}
        </p>
      </Reveal>
    </section>
  );
}
