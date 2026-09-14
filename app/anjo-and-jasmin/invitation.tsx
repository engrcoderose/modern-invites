"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MotionConfig } from "motion/react";
import BackgroundMusic from "./components/BackgroundMusic";
import EnvelopeIntro from "./components/EnvelopeIntro";
import { heroSlides } from "./media";
import "./wedding.css";

const loadContent = () => import("./InvitationContent");
const InvitationContent = dynamic(loadContent, {
  loading: () => (
    <div
      role="status"
      className="grid min-h-svh place-items-center font-imperial text-4xl text-[#946879]"
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
    // Warm the code and first hero photo during the existing envelope animation.
    // A failed speculative import is retried by the dynamic component on opening.
    void loadContent().catch(() => {});
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="classic-garden-invitation min-h-screen overflow-x-clip bg-[#fbf8f1] text-[#624451]">
        <BackgroundMusic visible={opened} />
        {preparing && !opened && (
          <Image
            src={heroSlides[0].src}
            alt=""
            aria-hidden="true"
            priority
            sizes="100vw"
            quality={85}
            className="hidden"
          />
        )}
        {!opened && (
          <EnvelopeIntro
            onOpening={prepareInvitation}
            onOpened={() => setOpened(true)}
          />
        )}
        {opened && <InvitationContent />}
      </div>
    </MotionConfig>
  );
}
