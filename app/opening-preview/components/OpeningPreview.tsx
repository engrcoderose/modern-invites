"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import GatefoldPacket from "@/components/invitation-opening/GatefoldPacket";
import styles from "@/components/invitation-opening/styles/opening.module.css";

export default function OpeningPreview() {
  const [opened, setOpened] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);

  const finish = useCallback(() => setOpened(true), []);

  useEffect(() => {
    if (opened) heading.current?.focus({ preventScroll: true });
  }, [opened]);

  function replay() {
    setOpened(false);
    setReplayCount((current) => current + 1);
  }

  return (
    <main className={`${styles.preview} relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-16`}>
      <GatefoldPacket key={replayCount} onOpened={finish} autoFocus={replayCount > 0}>
        <span className={styles.cardScript}>With love</span>
        <h1 ref={heading} tabIndex={-1} className={`${styles.cardTitle} mt-[4cqw] outline-none`}>You&apos;re<br />invited</h1>
        <span aria-hidden="true" className={`${styles.rule} my-[5cqw] block w-[8cqw]`} />
        <p className={styles.cardMessage}>The beginning<br />of something beautiful.</p>
      </GatefoldPacket>
      <div className="absolute inset-x-0 bottom-4 flex min-h-11 items-center justify-center sm:bottom-6">
        {opened ? (
          <button type="button" onClick={replay} className={`${styles.replay} flex min-h-11 items-center justify-center gap-2 px-4 text-xs`}>
            <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" /> Replay opening
          </button>
        ) : (
          <p className={`${styles.previewNote} text-center text-[10px]`}>Opening animation preview</p>
        )}
      </div>
      <span className="sr-only" role="status">{opened ? "Invitation opened. Replay is available below." : ""}</span>
    </main>
  );
}
