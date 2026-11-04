"use client";

import { Fragment, useEffect, useState } from "react";
import { wedding } from "../data/wedding-data";
import { getTimeLeft } from "../utils/countdown";
import ScrollLayer from "./ScrollLayer";
import styles from "../styles/countdown.module.css";

export default function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getTimeLeft
  > | null>(null);
  useEffect(() => {
    const target = Date.parse(wedding.date.iso);
    let timer: number | undefined;
    const update = () => {
      const next = getTimeLeft(target, Date.now());
      setRemaining(next);
      if (next.finished && timer !== undefined) window.clearInterval(timer);
      return next.finished;
    };
    if (!update()) timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-7 max-w-4xl sm:mt-9 sm:w-[58vw] lg:mt-12">
      {remaining?.finished && (
        <p className="mb-6 text-sm">
          Our wedding day is here
        </p>
      )}
      <div
        role="timer"
        aria-label="Countdown to the ceremony"
        aria-live="off"
        className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-x-1 sm:gap-x-3 lg:gap-x-5"
      >
        {(["days", "hours", "minutes", "seconds"] as const).map(
          (label, index) => (
            <Fragment key={label}>
              {index > 0 && <span aria-hidden="true" className={styles.numerals}>:</span>}
              <ScrollLayer profile="countdown-value" staggerIndex={2 + index} className="min-w-0">
                <span className={`${styles.numerals} block tabular-nums`}>
                  {remaining ? String(remaining[label]).padStart(2, "0") : "—"}
                </span>
                <span className="mt-2 block text-[0.6875rem] capitalize leading-5 sm:text-sm lg:mt-3 lg:text-base">
                  {label}
                </span>
              </ScrollLayer>
            </Fragment>
          ),
        )}
      </div>
    </div>
  );
}
