"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "motion/react";
import BackgroundMusic from "./components/BackgroundMusic";
import EnvelopeIntro from "./components/EnvelopeIntro";
import { prenupPosterSrc } from "./components/PrenupVideo";
import "./wedding.css";

const loadContent = () => import("./InvitationContent");
const InvitationContent = dynamic(loadContent, {
  loading: () => (
    <div
      role="status"
      className="grid min-h-svh place-items-center font-imperial text-4xl text-[rgb(var(--aj-accent))]"
    >
      Opening your invitation…
    </div>
  ),
});

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [preparing, setPreparing] = useState(false);

  function prepareInvitation() {
    setPreparing(true);
    // Warm the code and opening video poster during the envelope animation.
    // A failed speculative import is retried by the dynamic component on opening.
    void loadContent().catch(() => {});
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="classic-garden-invitation min-h-screen overflow-x-clip bg-[rgb(var(--aj-cream))] text-[rgb(var(--aj-ink))]">
        <BackgroundMusic visible={opened} />
        {preparing && !opened && (
          <link rel="preload" as="image" href={prenupPosterSrc} />
        )}
        {!opened && (
          <EnvelopeIntro
            onOpening={prepareInvitation}
            onOpened={() => setOpened(true)}
          />
        )}
        {(preparing || opened) && (
          <div inert={!opened} aria-hidden={!opened}>
            <InvitationContent active={opened} />
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
