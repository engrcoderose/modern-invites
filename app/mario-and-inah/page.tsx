import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import Countdown from "./components/Countdown";
import HeroSection from "./sections/HeroSection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import GallerySection from "./sections/GallerySection";
import ClosingGallerySection from "./sections/ClosingGallerySection";
import CelebrationSection from "./sections/CelebrationSection";
import EntourageSection from "./sections/EntourageSection";
import AttireSection from "./sections/AttireSection";
import RsvpSection from "./sections/RsvpSection";
import GiftRegistrySection from "./sections/GiftRegistrySection";
import FaqSection from "./sections/FaqSection";
import Footer from "./sections/Footer";
import { wedding } from "./data/wedding";
import { photos } from "./data/photos";
import styles from "./styles/invitation.module.css";

const title = `${wedding.couple.display} | ${wedding.date.display}`;
const description = "It's official… we're tying the knot!\n\nMario & Inah are getting married, and YOU are invited!";
const previewImage = {
  url: "/mario-and-inah/sharing/proposal-02d29584.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Mario presenting an open ring box to Inah as she reaches for his hand",
};

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/mario-and-inah" },
  openGraph: { title, description, url: "/mario-and-inah", type: "website", locale: "en_PH", images: [previewImage] },
  twitter: { card: "summary_large_image", title, description, images: [previewImage] },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <InvitationExperience>
      <a href="#celebration" className={`${styles.skipLink} absolute left-5 top-4 z-50 px-5 py-3 text-sm`}>Skip to event details</a>
      <main>
        <HeroSection />
        <Countdown />
        <PhotoBreakSection id="cinematic" photo={photos.cinematic} title="A lifetime, together." cinematic />
        <EntourageSection />
        <GallerySection />
        <CelebrationSection />
        <PhotoBreakSection id="timeline-photo-break" photo={photos.afterTimeline} title={wedding.couple.display} cinematic />
        <AttireSection />
        <GiftRegistrySection />
        <PhotoBreakSection id="photo-break" photo={photos.closing} title="Our next chapter begins with you." />
        <FaqSection />
        <ClosingGallerySection />
        <RsvpSection />
      </main>
      <Footer />
    </InvitationExperience>
  );
}
