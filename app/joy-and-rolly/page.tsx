import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import Navigation from "./components/Navigation";
import HeroSection from "./sections/HeroSection";
import CountdownSection from "./sections/CountdownSection";
import CelebrationSection from "./sections/CelebrationSection";
import TimelineSection from "./sections/TimelineSection";
import EntourageSection from "./sections/EntourageSection";
import AttireSection from "./sections/AttireSection";
import SeatFinderSection from "./sections/SeatFinderSection";
import RsvpSection from "./sections/RsvpSection";
import Footer from "./sections/Footer";
import { wedding } from "./data/wedding";
import styles from "./styles/invitation.module.css";

export const metadata: Metadata = {
  title: `${wedding.couple.display} | ${wedding.date.display}`,
  description: "Join Joy and Rolly as they celebrate their wedding on March 12, 2027, in Davao City.",
  robots: { index: false, follow: false },
  openGraph: { title: `${wedding.couple.display} | The Wedding`, description: "March 12, 2027 · Davao City, Philippines", type: "website", locale: "en_PH" },
};

export default function JoyAndRollyPage() {
  return <InvitationExperience>
    <a href="#celebration" className={`${styles.skipLink} absolute left-4 top-4 z-40 px-5 py-3 text-sm`}>Skip to event details</a>
    <Navigation />
    <main><HeroSection /><CountdownSection /><CelebrationSection /><TimelineSection /><EntourageSection /><AttireSection /><SeatFinderSection /><RsvpSection /></main>
    <Footer />
  </InvitationExperience>;
}
