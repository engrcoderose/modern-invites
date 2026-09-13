"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import BackgroundMusic from "./components/BackgroundMusic";
import HashtagSection from "./components/HashtagSection";
import UsefulInformationSection from "./components/UsefulInformationSection";
import FAQ from "./components/FAQ";
import Footer from "../jasmin-and-anjo/components/Footer";
import PolaroidStrip from "./components/PolaroidStrip";
import InvitationSection from "./components/InvitationSection";
import { PrenupPoster } from "../jasmin-and-anjo/media";
import {
  wedding,
  attireDescription,
  invitationMessage,
  rsvpDeadline,
} from "./data";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import GalleryBreak from "./components/GalleryBreak";
import Story from "./components/Story";
import WeddingProgram from "./components/WeddingProgram";
import Entourage from "./components/Entourage";
import Location from "./components/Location";
import SeatFinderSection from "./components/SeatFinderSection";
import AttireSection from "./components/AttireSection";
import PhotoSlideshow from "./components/PhotoSlideshow";
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
        {opened && (
          <>
            <Navigation />
            <main ref={main} tabIndex={-1} className="outline-none">
              <HeroSection />
              <Countdown />
              {/* <PolaroidStrip /> */}
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
              <GalleryBreak />
              <AttireSection
                title="A pastel garden romance"
                description={attireDescription}
                colors={wedding.palette}
              />
              <PhotoSlideshow />
              <HashtagSection hashtag={wedding.hashtag} />
              <SeatFinderSection />
              <FAQ />
              <UsefulInformationSection />
              <RSVPSection deadline={rsvpDeadline} />
            </main>
            <Footer
              groom="Anjo"
              bride="Jasmin"
              dateDisplay={wedding.dateDisplay}
              hashtag={wedding.hashtag}
            />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
