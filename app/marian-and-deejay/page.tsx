import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import HeroSection from "./sections/HeroSection";
import FilmSection from "./sections/FilmSection";
import CountdownSection from "./sections/CountdownSection";
import TimelineSection from "./sections/TimelineSection";
import CelebrationSection from "./sections/CelebrationSection";
import GallerySection from "./sections/GallerySection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import EntourageSection from "./sections/EntourageSection";
import EntouragePhotoBreakSection from "./sections/EntouragePhotoBreakSection";
import GiftSection from "./sections/GiftSection";
import SocialSection from "./sections/SocialSection";
import GuestRemindersSection from "./sections/GuestRemindersSection";
import FaqSection from "./sections/FaqSection";
import DressCodeSection from "./sections/DressCodeSection";
import RsvpSection from "./sections/RsvpSection";
import MemoryGallerySection from "./sections/MemoryGallerySection";
import Footer from "./sections/Footer";
import wedding from "./data/wedding-details.json";
import { citadel } from "./styles/fonts";

export const metadata: Metadata = {
  title: `${wedding.couple.display} | ${wedding.date.display}`,
  description: `Join ${wedding.couple.display} as they celebrate their wedding in Baguio on ${wedding.date.display}.`,
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <InvitationExperience className={citadel.variable} openingHero={<HeroSection openingPreview />}>
      <main>
        <HeroSection />
        <FilmSection />
        <CountdownSection />
        <TimelineSection />
        <PhotoBreakSection />
        <CelebrationSection />
        <GallerySection />
        <EntourageSection />
        <EntouragePhotoBreakSection />
        <DressCodeSection />
        <GiftSection />
        <SocialSection />
        <GuestRemindersSection />
        <FaqSection />
        <MemoryGallerySection />
        <RsvpSection />
      </main>
      <Footer />
    </InvitationExperience>
  );
}
