import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import InvitationMotion from "./components/InvitationMotion";
import InvitationWelcome from "./components/InvitationWelcome";
import FallingPetals from "./components/FallingPetals";
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
import FaqSection from "./sections/FaqSection";
import Footer from "./sections/Footer";
import { wedding } from "./data/wedding-data";
import { photoBreaks, galleries } from "./data/photo-layout";
import styles from "./styles/wedding.module.css";

const title = `${wedding.couple.display} | ${wedding.date.display}`;
const description = `Together with their families, ${wedding.couple.display} invite you to celebrate their wedding on ${wedding.date.display} in Malolos, Bulacan.`;
const invitationUrl = "https://jaydeeandbeawedding.moderninvites.com/";
const previewImage = {
  url: new URL("jaydee-and-bea/sharing/envelope-8dfe0d26.jpg", invitationUrl).href,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "A cream invitation envelope tied with a silver satin bow, with You're invited written above it",
};

export const metadata: Metadata = {
  metadataBase: new URL(invitationUrl),
  title, description,
  alternates: { canonical: invitationUrl },
  openGraph: { title, description, url: invitationUrl, type: "website", locale: "en_PH", images: [previewImage] },
  twitter: { card: "summary_large_image", title, description, images: [previewImage] },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <InvitationMotion className={`${styles.invitation} relative min-h-screen bg-[rgb(var(--jb-paper))] text-[rgb(var(--jb-ink))]`}>
      <RefreshScrollReset />
      <InvitationWelcome openingHero={<HeroSection openingPreview />}>
        <FallingPetals />
        <a href="#invitation" className="jb-skip-link absolute left-4 top-4 z-50 rounded-full bg-[rgb(var(--jb-ink))] px-6 py-3 text-sm text-[rgb(var(--jb-paper))]">Skip to invitation</a>
        <Navigation />
        <main>
          <HeroSection revealOnEntry={false} />
          <InvitationSection />
          <PhotoSlideSection photos={photoBreaks.timelineSlides} />
          <StorySection />
          <PhotoBreakSection id="story-photo" photo={photoBreaks.afterStory} />
          <TimelineSection />
          <GallerySection id="gallery" title="Jaydee and Bea photo gallery" photos={wedding.gallery.photos} carousel showHeading={false} />
          <EntourageSection />
          <PhotoBreakSection id="entourage-photo" photo={photoBreaks.afterEntourage} />
          <DetailsSection />
          <AttireSection />
          <HashtagSection />
          <GallerySection id="gallery-more" title="More little moments." photos={galleries[1]} />
          <FaqSection />
          <RsvpSection />
        </main>
        <Footer />
      </InvitationWelcome>
    </InvitationMotion>
  );
}
