"use client";

import { useEffect, useRef } from "react";

import HashtagSection from "./components/HashtagSection";
import UsefulInformationSection from "./components/UsefulInformationSection";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import InvitationSection from "./components/InvitationSection";
import { PrenupPoster } from "./photo-media";
import {
  wedding,
  attireDescription,
  invitationMessage,
  rsvpDeadline,
} from "./data";

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

export default function InvitationContent() {
  const main = useRef<HTMLElement>(null);
  useEffect(() => { main.current?.focus({ preventScroll: true }); }, []);
  return <>
    <Navigation />
    <main ref={main} tabIndex={-1} className="outline-none">
      <HeroSection />
      <Countdown />

      <InvitationSection
        message={invitationMessage}
        videoSrc="/videos/anjo-and-jasmin/prenup.mp4"
        poster={PrenupPoster}
      />
      <Gallery />
      <Story />
      <WeddingProgram events={wedding.program} />
      <Entourage />
      <Location />
      <AttireSection
        title="A pastel garden romance"
        description={attireDescription}
        colors={wedding.palette}
      />
      <PhotoSlideshow />
      <HashtagSection hashtag={wedding.hashtag} />
      <SeatFinderSection />
      <UsefulInformationSection />
      <FAQ />
      <GalleryBreak />
      <RSVPSection deadline={rsvpDeadline} />
    </main>
    <Footer
      groom="Anjo"
      bride="Jasmin"
      dateDisplay={wedding.dateDisplay}
      hashtag={wedding.hashtag}
    />
  </>;
}
