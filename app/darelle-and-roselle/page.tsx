import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "./components/navigation";
import InvitationExperience from "./components/invitation-experience";
import { Cover, FormalInvitation, Venues } from "./sections/introduction";
import Entourage from "./sections/entourage";
import { Schedule, Attire } from "./sections/details";
import Rsvp from "./sections/rsvp";
import Closing from "./sections/closing";
import SaveTheDate from "./sections/save-the-date";
import { wedding } from "./data/wedding";
import styles from "./styles/invitation.module.css";

const anastasia = localFont({ src: "./assets/fonts/anastasia-script.woff2", variable: "--font-dr-anastasia", weight: "400", display: "swap" });
const noto = localFont({
  src: [
    { path: "./assets/fonts/noto-serif.woff2", weight: "400 600", style: "normal" },
    { path: "./assets/fonts/noto-serif-italic.woff2", weight: "300 600", style: "italic" },
  ],
  variable: "--font-dr-noto", display: "swap",
});

export const metadata: Metadata = {
  title: `${wedding.shortTitle} | ${wedding.date}`,
  description: `Celebrate the wedding of ${wedding.title} on ${wedding.date} in Marikina City. View the invitation and RSVP.`,
  alternates: { canonical: `/${wedding.slug}` },
  openGraph: { title: `${wedding.shortTitle} | ${wedding.date}`, description: `The wedding invitation of ${wedding.title}.`, url: `/${wedding.slug}`, type: "website", locale: "en_PH" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${styles.invitation} ${anastasia.variable} ${noto.variable}`}>
      <InvitationExperience cover={<Cover />}>
        <a href="#invitation" className={`${styles.skipLink} fixed -top-20 left-5 z-50 px-5 py-3 focus:top-3`}>Skip to invitation</a>
        <Navigation />
        <main>
        <FormalInvitation />
        <SaveTheDate />
        <Venues />
        <Entourage />
        <Schedule />
        <Attire />
        <Rsvp />
        <Closing />
        </main>
      </InvitationExperience>
    </div>
  );
}
