"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import styles from "../styles/invitation.module.css";
import useContentReveals from "../hooks/useContentReveals";
import useHeroMusicSync from "../hooks/useHeroMusicSync";
import InvitationWelcome from "./InvitationWelcome";
import BackgroundMusic, { type BackgroundMusicHandle } from "./BackgroundMusic";
import Navigation from "./Navigation";
import FallingPetals from "./FallingPetals";

export default function InvitationExperience({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const root = useRef<HTMLDivElement>(null);
  const music = useRef<BackgroundMusicHandle>(null);
  const [opened, setOpened] = useState(false);
  const handleOpened = useCallback(() => setOpened(true), []);
  const handleOpening = useCallback(() => { void music.current?.play(); }, []);
  useContentReveals(root, opened);
  useHeroMusicSync(root, music, opened);
  return (
    <div ref={root} id="top" data-invitation-open={opened} data-reveal-preset="soft" className={`${styles.invitation} relative min-h-screen`}>
      <InvitationWelcome onOpening={handleOpening} onOpened={handleOpened}>
        {opened && <Navigation />}
        <motion.div aria-hidden="true" className={`${styles.scrollProgress} fixed inset-x-0 top-0 z-50 h-[2px] origin-left`} style={{ scaleX: scrollYProgress }} />
        {children}
      </InvitationWelcome>
      {opened && <FallingPetals />}
      <BackgroundMusic ref={music} visible={opened} />
    </div>
  );
}
