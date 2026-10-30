import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import HeroSection from "./sections/HeroSection";
import PrenupFilmSection from "./sections/PrenupFilmSection";
import CountdownSection from "./sections/CountdownSection";
import GallerySection from "./sections/GallerySection";
import StorySection from "./sections/StorySection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import CelebrationSection from "./sections/CelebrationSection";
import TimelineSection from "./sections/TimelineSection";
import TimelineGallerySection from "./sections/TimelineGallerySection";
import EntourageSection from "./sections/EntourageSection";
import AttireSection from "./sections/AttireSection";
import RsvpSection from "./sections/RsvpSection";
import GuestNotesSection from "./sections/GuestNotesSection";
import SeatFinderSection from "./sections/SeatFinderSection";
import FaqSection from "./sections/FaqSection";
import MemoryGallerySection from "./sections/MemoryGallerySection";
import GiftsSection from "./sections/GiftsSection";
import ClosingSection from "./sections/ClosingSection";
import { wedding } from "./data/wedding";
import { attirePhotoBreak, entouragePhotoBreak, entouragePortraitBreak, remindersPhotoBreak, seatFinderPhotoBreak, storyPhotoBreak } from "./data/photo-break";

export const metadata: Metadata = {
  title: `${wedding.couple.display} | ${wedding.date.display}`,
  description: "Join Edcel & Apreal as they celebrate their wedding on December 4, 2026 in Antipolo City, Rizal.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InvitationExperience>
    <main>
      <PrenupFilmSection />
      <HeroSection />
      <CountdownSection />
      <GallerySection />
      <StorySection />
      <PhotoBreakSection {...storyPhotoBreak} />
      <TimelineSection />
      <TimelineGallerySection />
      <EntourageSection />
      <PhotoBreakSection {...entouragePortraitBreak} />
      <CelebrationSection />
      <PhotoBreakSection {...entouragePhotoBreak} />
      <AttireSection />
      <PhotoBreakSection {...attirePhotoBreak} />
      <GiftsSection />
      <GuestNotesSection />
      <PhotoBreakSection {...remindersPhotoBreak} />
      <SeatFinderSection />
      <PhotoBreakSection {...seatFinderPhotoBreak} />
      <FaqSection />
      <MemoryGallerySection />
      <RsvpSection />
    </main>
    <ClosingSection />
  </InvitationExperience>;
}
