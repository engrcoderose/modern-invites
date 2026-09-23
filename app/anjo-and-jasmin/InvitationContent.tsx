"use client";

import { useEffect, useRef } from "react";

import HashtagSection from "./components/HashtagSection";
import UsefulInformationSection from "./components/UsefulInformationSection";
import GiftRegistrySection from "./components/GiftRegistrySection";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import PrenupVideo from "./components/PrenupVideo";
import {
  wedding,
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

export default function InvitationContent({ active = true }: { active?: boolean }) {
  const main = useRef<HTMLElement>(null);
  useEffect(() => { if (active) main.current?.focus({ preventScroll: true }); }, [active]);
  return <>
    <Navigation />
    <main ref={main} tabIndex={-1} className="outline-none">
      <PrenupVideo active={active} />
      <HeroSection />
      <Countdown />
      <Gallery />
      <Story />
      <WeddingProgram events={wedding.program} />
      <Entourage />
      <Location />
      <AttireSection colors={wedding.palette} />
      <PhotoSlideshow />
      <HashtagSection hashtag={wedding.hashtag} />
      <GiftRegistrySection />
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
