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
import GuestDetailsSection from "./sections/GuestDetailsSection";
import RsvpSection from "./sections/RsvpSection";
import Footer from "./sections/Footer";
import styles from "./styles/invitation.module.css";

export const metadata: Metadata = {
  title: "Jahzen & Glyzell | May 30, 2027",
  description: "Join Jahzen & Glyzell as they celebrate their wedding on May 30, 2027 at La Fina Grand Hall by Kastelo Verde, Capas, Tarlac.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InvitationExperience>
    <a href="#celebration" className={`${styles.skipLink} fixed left-4 top-4 z-50 px-5 py-3`}>Skip to event details</a>
    <Navigation />
    <main><HeroSection /><InvitationSection /><CountdownSection /><StorySection /><CinematicBreak /><CelebrationSection /><TimelineSection /><EntourageSection /><GallerySection /><GuestDetailsSection /><RsvpSection /></main>
    <Footer />
  </InvitationExperience>;
}
