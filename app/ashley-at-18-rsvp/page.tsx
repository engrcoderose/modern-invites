import type { Metadata } from "next";
import RsvpSection from "./components/RsvpSection";
import HeroSection from "./sections/HeroSection";
import CountdownSection from "./sections/CountdownSection";
import VenueSection from "./sections/VenueSection";
import { celebration } from "./data/event";
import styles from "./styles/invitation.module.css";
import InvitationMotion from "./components/InvitationMotion";
import InvitationNavigation from "./components/InvitationNavigation";

export const metadata: Metadata = {
  title: "Ashley at 18 | RSVP",
  description: "Join Ashley Sanchez for her eighteenth birthday on December 5, 2026 at Casa Dominguez Resort & Events Place. Kindly RSVP.",
  robots: { index: false, follow: false },
};

export default function AshleyRsvpPage() {
  return (
    <main id="ashley-invitation" className={`${styles.invitation} min-h-screen`}>
      <InvitationMotion />
      <a href="#rsvp" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-4">Skip to RSVP</a>
      <InvitationNavigation />
      <HeroSection />
      <CountdownSection />
      <VenueSection />
      <RsvpSection />
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-7 text-center text-xs leading-6 text-[#705379] sm:flex-row sm:px-10">
        <p>A beautiful new chapter, shared with you.</p>
        <a href={`mailto:${celebration.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">Questions? Contact Ashley</a>
      </footer>
    </main>
  );
}
