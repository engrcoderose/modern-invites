"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import BackgroundMusic from "./components/BackgroundMusic";
import HashtagSection from "../jasmin-and-anjo/components/HashtagSection";
import GiftRegistrySection from "./components/GiftRegistrySection";
import FAQ from "./components/FAQ";
import Footer from "../jasmin-and-anjo/components/Footer";
import PolaroidStrip from "../jasmin-and-anjo/components/PolaroidStrip";
import InvitationSection from "../jasmin-and-anjo/components/InvitationSection";
import { PrenupPoster } from "../jasmin-and-anjo/media";
import { wedding, attireDescription, invitationMessage, rsvpDeadline } from "./data";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import Story from "./components/Story";
import WeddingProgram from "./components/WeddingProgram";
import Entourage from "./components/Entourage";
import Location from "./components/Location";
import AttireSection from "./components/AttireSection";
import RSVPSection from "./components/RSVPSection";
import "./wedding.css";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    if (opened) main.current?.focus({ preventScroll: true });
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="classic-garden-invitation min-h-screen overflow-x-clip bg-[#fbf8f1] text-[#624451]">
        <BackgroundMusic visible={opened} />
        {!opened && <EnvelopeIntro onOpened={() => setOpened(true)} />}
        {opened && <>
          <Navigation />
          <main ref={main} tabIndex={-1} className="outline-none">
            <HeroSection />
            <Countdown />
            <PolaroidStrip />
            <InvitationSection
              message={invitationMessage}
              videoSrc="/videos/jasmin-and-anjo/prenup.mp4"
              poster={PrenupPoster}
            />
            <Gallery />
            <Story />
            <WeddingProgram events={wedding.program} />
            <Entourage />
            <Location />
            <AttireSection title="A pastel garden romance" description={attireDescription} colors={wedding.palette} />
            <HashtagSection hashtag={wedding.hashtag} />
            <FAQ />
            <GiftRegistrySection />
            <RSVPSection deadline={rsvpDeadline} />
          </main>
          <Footer groom="Anjo" bride="Jasmin" dateDisplay={wedding.dateDisplay} hashtag={wedding.hashtag} />
        </>}
      </div>
    </MotionConfig>
  );
}
