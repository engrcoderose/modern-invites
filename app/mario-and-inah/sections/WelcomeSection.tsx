"use client";

import { useRef, type MouseEvent, type RefObject } from "react";
import OpeningPhotos from "../components/OpeningPhotos";
import { wedding } from "../data/wedding";
import styles from "../styles/opening.module.css";
import useWelcomeEntrance from "../hooks/useWelcomeEntrance";

type Props = {
  enhanced: boolean;
  requested: boolean;
  closing: boolean;
  reducedMotion: boolean;
  pageVisible: boolean;
  actionRef: RefObject<HTMLAnchorElement | null>;
  onOpen: (event: MouseEvent<HTMLAnchorElement>) => void;
  onOpened: () => void;
};

export default function WelcomeSection({ enhanced, requested, closing, reducedMotion, pageVisible, actionRef, onOpen, onOpened }: Props) {
  const root = useRef<HTMLElement>(null);
  const playing = enhanced && !requested && !reducedMotion && pageVisible;
  useWelcomeEntrance(root, playing);
  const [groomName, brideName] = wedding.couple.display.split(" & ");

  return (
    <section ref={root} aria-labelledby="mi-welcome-title" data-welcome-screen data-closing={closing} data-playing={playing}
      onTransitionEnd={event => {
        if (closing && event.target === event.currentTarget && event.propertyName === "opacity") onOpened();
      }}
      className={`${styles.screen} isolate overflow-hidden ${enhanced ? "fixed inset-0 z-[70] h-dvh" : "relative min-h-dvh"}`}>
      <OpeningPhotos playing={playing} reducedMotion={reducedMotion} />
      <div aria-hidden="true" className={`${styles.shade} pointer-events-none absolute inset-0`} />
      <div aria-hidden="true" className={`${styles.frame} pointer-events-none absolute inset-4 z-10 sm:inset-8`} />
      <a href="#mi-invitation" aria-hidden="true" tabIndex={-1} onClick={onOpen} className="absolute inset-0 z-10" />
      <div className={`${styles.copy} pointer-events-none relative z-30 mx-auto grid min-h-dvh w-full max-w-4xl grid-rows-[1fr_auto] place-items-center gap-5 px-6 py-6 text-center sm:px-10 sm:py-10 [@media(max-height:500px)]:gap-3 [@media(max-height:500px)]:py-3`}>
        <div>
          <p data-welcome-detail className={`${styles.intro} mb-3`}>You’re invited to the wedding of</p>
          <h1 id="mi-welcome-title" aria-label={wedding.couple.display} className={styles.names}>
            <span data-welcome-name className="block">{groomName}</span>
            <span data-welcome-symbol aria-hidden="true" className={`${styles.ampersand} block`}>&amp;</span>
            <span data-welcome-name className="block">{brideName}</span>
          </h1>
        </div>
        <div className="flex w-full flex-col items-center">
          <div aria-hidden="true" className={`${styles.rule} mb-3 h-px w-32`} />
          <p data-welcome-detail className={`${styles.event} mb-4`}>{wedding.date.display}<span aria-hidden="true" className="mx-2">·</span>Tagaytay City, Philippines</p>
          <a ref={actionRef} href="#mi-invitation" onClick={onOpen} aria-disabled={requested || undefined} aria-busy={requested || undefined}
            className={`${styles.openButton} pointer-events-auto relative inline-flex min-h-12 w-full max-w-[300px] items-center justify-center gap-4 overflow-hidden px-6 py-3 uppercase`}>
            <span aria-hidden="true" className="relative text-[8px]">◆</span>
            <span className="relative">{requested ? "Opening invitation" : "Open the invitation"}</span>
            <span aria-hidden="true" className="relative text-[8px]">◆</span>
          </a>
          <p className={`${styles.hint} mt-3`}>Tap anywhere to enter</p>
        </div>
      </div>
    </section>
  );
}
