import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import Navigation from "./components/Navigation";
import FallingPetals from "./components/FallingPetals";
import RefreshScrollReset from "./components/RefreshScrollReset";
import HeroSection from "./sections/HeroSection";
import InvitationSection from "./sections/InvitationSection";
import CountdownSection from "./sections/CountdownSection";
import StorySection from "./sections/StorySection";
import StoryPhotoBreakSection from "./sections/StoryPhotoBreakSection";
import DetailsSection from "./sections/DetailsSection";
import TimelineSection from "./sections/TimelineSection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import EntourageSection from "./sections/EntourageSection";
import AttireSection from "./sections/AttireSection";
import HashtagSection from "./sections/HashtagSection";
import HashtagPhotoBreakSection from "./sections/HashtagPhotoBreakSection";
import GallerySection from "./sections/GallerySection";
import RsvpSection from "./sections/RsvpSection";
import Footer from "./sections/Footer";
import { wedding } from "./data/wedding";
import { entouragePhotoBreak } from "./data/entourage-photo-break";
import styles from "./styles/wedding.module.css";

const title = `${wedding.title} | ${wedding.date}`;
const description = `Celebrate the wedding of ${wedding.title} on ${wedding.date} in Quezon. A love we have built, a family we cherish, and a promise for forever.`;

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/ryan-and-anne" },
  openGraph: { title, description, url: "/ryan-and-anne", type: "website", locale: "en_PH" },
  twitter: { card: "summary", title, description },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <InvitationExperience>
      <RefreshScrollReset />
      <a href="#invitation" className={`${styles.skipLink} absolute left-5 top-5 z-50 bg-[#f5f0e6] px-5 py-3 text-sm text-[#171714]`}>Skip to invitation</a>
      <Navigation />
      <main>
        <HeroSection />
        <InvitationSection />
        <CountdownSection />
        <StorySection />
        <StoryPhotoBreakSection />
        <DetailsSection />
        <TimelineSection />
        <EntourageSection />
        <PhotoBreakSection {...entouragePhotoBreak} />
        <AttireSection />
        <HashtagSection />
        <HashtagPhotoBreakSection />
        <GallerySection />
        <RsvpSection />
      </main>
      <Footer />
      <FallingPetals />
    </InvitationExperience>
  );
}
