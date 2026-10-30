"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EnvelopeIntro from "./EnvelopeIntro";
import Navigation from "./Navigation";
import BackgroundMusic from "./BackgroundMusic";
import { InvitationOpenContext } from "./InvitationState";
import { newIconScript } from "../styles/fonts";
import styles from "../styles/invitation.module.css";
import useInvitationTextMotion from "../hooks/useInvitationTextMotion";

const fallbackStyles = `.${styles.invitation} [data-invitation-content]{display:block;position:static;overflow:visible;visibility:visible}.${styles.invitation} [data-envelope-intro]{display:none}`;

export default function InvitationExperience({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const root = useRef<HTMLDivElement>(null);
  const finishOpening = useCallback(() => setPhase("open"), []);
  useInvitationTextMotion(root, phase === "open");

  useEffect(() => {
    if (phase !== "open") return;
    root.current?.querySelector<HTMLElement>("#ea-film-title")?.focus({ preventScroll: true });
  }, [phase]);

  function openInvitation() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase("opening");
  }

  return <InvitationOpenContext.Provider value={phase === "open"}><div ref={root} data-invitation-open={phase === "open"} className={`${styles.invitation} ${newIconScript.variable}`}>
    <noscript><style>{fallbackStyles}</style></noscript>
    {phase !== "open" && <EnvelopeIntro onOpening={openInvitation} onOpened={finishOpening} />}
    <div
      data-invitation-content
      hidden={phase === "closed"}
      className={phase === "open" ? styles.contentOpen : `${styles.contentHidden} fixed inset-0 overflow-hidden`}
      inert={phase === "opening"}
      aria-hidden={phase === "opening" ? true : undefined}
    >
      <a href="#celebration" className={`${styles.skipLink} fixed left-4 top-4 z-[70] px-5 py-3`}>Skip to event details</a>
      <Navigation />
      {children}
      <BackgroundMusic />
    </div>
  </div></InvitationOpenContext.Provider>;
}
