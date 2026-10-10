"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { secondaryButtonClass } from "@/components/landing/constants";

export default function CopyInquiryMessage({ message }: { message: string }) {
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "failed">("idle");

  useEffect(() => setIsReady(true), []);

  async function copyMessage() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copyMessage}
        disabled={!isReady || status === "copying"}
        className={`${secondaryButtonClass} w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
      >
        <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
        {status === "copying" ? "Copying message…" : "Copy message"}
      </button>
      <p role="status" className="mt-3 text-sm leading-6 text-marketing-muted">
        {status === "copied" && "Message copied. Open Facebook and paste it into chat."}
        {status === "failed" && "Couldn’t copy automatically. Select and copy the message above."}
      </p>
      <noscript><p className="mt-3 text-sm leading-6 text-marketing-muted">Select and copy the message above, then paste it into Facebook chat.</p></noscript>
    </div>
  );
}
