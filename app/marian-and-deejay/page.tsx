import type { Metadata } from "next";
import InvitationExperience from "./components/InvitationExperience";
import HeroSection from "./sections/HeroSection";
import CelebrationSection from "./sections/CelebrationSection";
import EntourageSection from "./sections/EntourageSection";
import GuestDetailsSection from "./sections/GuestDetailsSection";
import RsvpSection from "./sections/RsvpSection";
import wedding from "./data/wedding-details.json";

export const metadata: Metadata = {
  title: `${wedding.couple.display} | ${wedding.date.display}`,
  description: `Join ${wedding.couple.display} as they celebrate their wedding in Baguio on ${wedding.date.display}.`,
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <InvitationExperience>
      <main>
        <HeroSection />
        <CelebrationSection />
        <EntourageSection />
        <GuestDetailsSection />
        <RsvpSection />
      </main>
      <footer className="px-6 py-16 text-center">
        <p className="mb-4 text-sm">With love, always</p>
        <p className="mj-script text-5xl">{wedding.couple.display}</p>
        <p className="mt-6 text-xs">{wedding.date.display} · Baguio City</p>
      </footer>
    </InvitationExperience>
  );
}
