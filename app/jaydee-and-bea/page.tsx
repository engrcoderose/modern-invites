import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import InvitationMotion from "./components/InvitationMotion";
import RefreshScrollReset from "./components/RefreshScrollReset";
import HeroSection from "./sections/HeroSection";
import InvitationSection from "./sections/InvitationSection";
import StorySection from "./sections/StorySection";
import DetailsSection from "./sections/DetailsSection";
import TimelineSection from "./sections/TimelineSection";
import EntourageSection from "./sections/EntourageSection";
import AttireSection from "./sections/AttireSection";
import GallerySection from "./sections/GallerySection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import PhotoSlideSection from "./sections/PhotoSlideSection";
import HashtagSection from "./sections/HashtagSection";
import RsvpSection from "./sections/RsvpSection";
import Footer from "./sections/Footer";
import { wedding } from "./data/wedding-data";
import { photoBreaks, placeholderGalleries } from "./data/photo-layout";
import styles from "./styles/wedding.module.css";

const title = `${wedding.couple.display} | ${wedding.date.display}`;
const description = `Together with their families, ${wedding.couple.display} invite you to celebrate their wedding on ${wedding.date.display} in Malolos, Bulacan.`;

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/jaydee-and-bea" },
  openGraph: { title, description, url: "/jaydee-and-bea", type: "website", locale: "en_PH" },
  twitter: { card: "summary", title, description },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <InvitationMotion className={`${styles.invitation} relative min-h-screen bg-[#faf8f0] text-[#36472e]`}>
      <RefreshScrollReset />
      <a href="#invitation" className="jb-skip-link absolute left-4 top-4 z-50 rounded-full bg-[#36472e] px-6 py-3 text-sm text-[#faf8f0]">Skip to invitation</a>
      <Navigation />
      <main>
        <HeroSection />
        <InvitationSection />
        <GallerySection id="gallery" title="Jaydee and Bea photo gallery" photos={wedding.gallery.photos.length ? wedding.gallery.photos : placeholderGalleries[0]} carousel showHeading={false} />
        <StorySection />
        <PhotoBreakSection id="story-photo" photo={photoBreaks.afterStory} />
        <TimelineSection />
        <PhotoSlideSection photos={photoBreaks.timelineSlides} />
        <EntourageSection />
        <PhotoBreakSection id="entourage-photo" photo={photoBreaks.afterEntourage} />
        <DetailsSection />
        <AttireSection />
        <HashtagSection />
        <GallerySection id="gallery-more" title="More little moments." photos={placeholderGalleries[1]} />
        <RsvpSection />
      </main>
      <Footer />
    </InvitationMotion>
  );
}
