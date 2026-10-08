"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import BackgroundMusic, { type BackgroundMusicHandle } from "./BackgroundMusic";
import EnvelopeIntro from "./EnvelopeIntro";
import InvitationMotion from "./InvitationMotion";
import styles from "../styles/wedding.module.css";

const fallbackStyles = `.${styles.invitation} [data-invitation-content]{display:block}.${styles.invitation} [data-envelope-intro]{display:none}.${styles.invitation} :is(.${styles.heroWrittenName},.${styles.heroDetailsIntro},.${styles.heroMetadataIntro},.${styles.heroScrollIntro}){animation:none}`;

export default function InvitationExperience({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const music = useRef<BackgroundMusicHandle>(null);

  useEffect(() => {
    if (!opened) return;
    history.replaceState(history.state, "", `${location.pathname}${location.search}#top`);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() => document.getElementById("ra-title")?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [opened]);

  return (
    <div data-invitation-open={opened} className={`${styles.invitation} relative min-h-screen`}>
      <noscript><style>{fallbackStyles}</style></noscript>
      <div data-invitation-content hidden={!preparing && !opened} inert={preparing && !opened} aria-hidden={preparing && !opened ? true : undefined}>
        <InvitationMotion enabled={opened} className="relative min-h-screen">{children}</InvitationMotion>
      </div>
      {!opened && <EnvelopeIntro onOpening={() => { void music.current?.play(); setPreparing(true); }} onOpened={() => setOpened(true)} />}
      <BackgroundMusic ref={music} showControl={opened} />
    </div>
  );
}
