import type { Metadata } from "next";
import { faqData, weddingProgram, weddingTwoData } from "./data/wedding-two-data";
import Navigation from "./components/Navigation";
import OpeningScreen from "./components/OpeningScreen";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./components/HeroSection";
import InvitationSection from "./components/InvitationSection";
import CountdownSection from "./components/CountdownSection";
import StorySection from "./components/StorySection";
import CinematicBreak from "./components/CinematicBreak";
import DetailsSection from "./components/DetailsSection";
import EntourageSection from "./components/EntourageSection";
import GallerySection from "./components/GallerySection";
import AttireSection from "./components/AttireSection";
import GuestGuideSection from "./components/GuestGuideSection";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";
import WalkingCouple from "./assets/walking-couple.jpg";
import InLoveCouple from "./assets/inlove-couple.jpg";
import Portrait from "./assets/pexels-camera-treasure-928922-16841002.jpg";
import "./wedding.css";

export const metadata: Metadata = {
  title: "Isabella & Daniel | 14 March 2027",
  description: "Join Isabella and Daniel for their wedding celebration in Antipolo on March 14, 2027.",
};

export default function HeroScrollInvitation() {
  const wedding = weddingTwoData;

  return (
    <main className="burgundy-invitation overflow-x-clip bg-[#f5efe6]">
      <OpeningScreen bride={wedding.bride} groom={wedding.groom} dateDisplay={wedding.dateDisplay} />
      <ScrollProgress />
      <Navigation initials={`${wedding.bride[0]} / ${wedding.groom[0]}`} />
      <HeroSection bride={wedding.bride} groom={wedding.groom} dateDisplay={wedding.dateDisplay} location={wedding.locationDisplay} />
      <InvitationSection message={wedding.invitationMessage} bride={wedding.bride} groom={wedding.groom} image={WalkingCouple} />
      <CountdownSection date={wedding.weddingDate.toISOString()} brideFullName={wedding.brideFullName} groomFullName={wedding.groomFullName} />
      <StorySection title={wedding.ourStory.title} chapters={wedding.ourStory.content} image={InLoveCouple} />
      <CinematicBreak />
      <DetailsSection dateDisplay={wedding.dateDisplay} venue={wedding.venue} reception={wedding.reception} program={weddingProgram} />
      <EntourageSection brideFullName={wedding.brideFullName} groomFullName={wedding.groomFullName} groups={wedding.entourage} />
      <GallerySection images={wedding.gallery} />
      <AttireSection title={wedding.dressCode.title} description={wedding.dressCode.description} colors={wedding.dressCode.colors} image={Portrait} />
      <GuestGuideSection notes={wedding.guestNotes} faqs={faqData} />
      <RSVPSection deadline={wedding.rsvpDeadline} />
      <Footer bride={wedding.bride} groom={wedding.groom} dateDisplay={wedding.dateDisplay} hashtag={wedding.weddingHashtag} />
    </main>
  );
}
