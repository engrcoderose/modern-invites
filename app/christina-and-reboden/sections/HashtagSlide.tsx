"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Stationery } from "../components/Stationery";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function HashtagSlide() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyHashtag() {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return <Stationery title="Share the Love">
    <p className="max-w-sm text-sm leading-7">Tag your photos and videos<br />with our wedding hashtag.</p>
    <p className={`${styles.hashtagText} max-w-full select-all text-center`}>{wedding.hashtag}</p>
    <div className="flex flex-col items-center gap-3">
      <button type="button" onClick={() => void copyHashtag()} className="inline-flex min-h-11 items-center justify-center gap-2 px-2 font-sans text-xs transition-colors hover:text-[#9b5d68] motion-reduce:transition-none">
        {status === "copied" ? <Check size={14} strokeWidth={1.5} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.5} aria-hidden="true" />}
        <span className="underline decoration-[var(--cr-line)] underline-offset-4">{status === "copied" ? "Copied" : "Copy hashtag"}</span>
      </button>
      <p role="status" aria-live="polite" className="min-h-5 max-w-xs text-xs leading-5">{status === "copied" ? "Hashtag copied." : status === "failed" ? "Please select and copy the hashtag above." : ""}</p>
    </div>
  </Stationery>;
}
