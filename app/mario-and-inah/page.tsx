import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import Countdown from "./components/Countdown";
import HeroSection from "./sections/HeroSection";
import PhotoBreakSection from "./sections/PhotoBreakSection";
import GallerySection from "./sections/GallerySection";
import CelebrationSection from "./sections/CelebrationSection";
import EntourageSection from "./sections/EntourageSection";
import AttireSection from "./sections/AttireSection";
import RsvpSection from "./sections/RsvpSection";
import Footer from "./sections/Footer";
import { wedding } from "./data/wedding";
import { photos } from "./data/photos";
import styles from "./styles/invitation.module.css";

const title = `${wedding.couple.display} | ${wedding.date.display}`;
const description = `Join Mario & Inah for their wedding on ${wedding.date.display} at ${wedding.venue.name}.`;

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/mario-and-inah" },
  openGraph: { title, description, url: "/mario-and-inah", type: "website", locale: "en_PH" },
  twitter: { card: "summary", title, description },
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
        <AttireSection />
        <PhotoBreakSection id="photo-break" photo={photos.closing} title="Our next chapter begins with you." />
        <RsvpSection />
      </main>
      <Footer />
    </InvitationExperience>
  );
}
