import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import Navigation from "./components/Navigation";
import HeroSection from "./sections/HeroSection";
import InvitationSection from "./sections/InvitationSection";
import CountdownSection from "./sections/CountdownSection";
import CinematicBreak from "./sections/CinematicBreak";
import GallerySection from "./sections/GallerySection";
import StorySection from "./sections/StorySection";
import CelebrationSection from "./sections/CelebrationSection";
import TimelineSection from "./sections/TimelineSection";
import EntourageSection from "./sections/EntourageSection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import GuestDetailsSection from "./sections/GuestDetailsSection";
import AttireSection from "./sections/AttireSection";
import HashtagSection from "./sections/HashtagSection";
import GiftSection from "./sections/GiftSection";
import FaqSection from "./sections/FaqSection";
import MemoriesGallerySection from "./sections/MemoriesGallerySection";
import RsvpSection from "./sections/RsvpSection";
import Footer from "./sections/Footer";
import styles from "./styles/invitation.module.css";
import { photoBreaks } from "./data/photos";

export const metadata: Metadata = {
  title: "Jahzen & Glyzell | May 30, 2027",
  description: "Join Jahzen & Glyzell as they celebrate their wedding on May 30, 2027 at La Fina Grand Hall by Kastelo Verde, Capas, Tarlac.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InvitationExperience>
    <a href="#celebration" className={`${styles.skipLink} fixed left-4 top-4 z-50 px-5 py-3`}>Skip to event details</a>
    <Navigation />
    <main>
      <HeroSection />
      <InvitationSection />
      <CountdownSection />
      <GallerySection />
      <StorySection />
      <TimelineSection />
      <CinematicBreak />
      <EntourageSection />
      <PhotoBreakSection {...photoBreaks.entourage} />
      <CelebrationSection />
      <PhotoBreakSection {...photoBreaks.venue} />
      <AttireSection />
      <HashtagSection />
      <PhotoBreakSection {...photoBreaks.hashtag} />
      <GiftSection />
      <GuestDetailsSection />
      <FaqSection />
      <MemoriesGallerySection />
      <RsvpSection />
    </main>
    <Footer />
  </InvitationExperience>;
}
