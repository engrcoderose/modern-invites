import type { Metadata } from "next";

import { Attire } from "./components/Attire";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { CinematicBreak } from "./components/CinematicBreak";
import { Countdown } from "./components/Countdown";
import { Entourage } from "./components/Entourage";
import { EventDetails } from "./components/EventDetails";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { GiftGuide } from "./components/GiftGuide";
import { Hashtag } from "./components/Hashtag";
import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { Navigation } from "./components/Navigation";
import { OpeningScreen } from "./components/OpeningScreen";
import { RSVP } from "./components/RSVP";
import { ScrollProgress } from "./components/ScrollProgress";
import { WeddingTimeline } from "./components/WeddingTimeline";
import { WeddingThemeProvider } from "./components/WeddingThemeProvider";
import { weddingData } from "./data/weddingData";

export const metadata: Metadata = {
  title: `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName} | ${weddingData.event.dateDisplay}`,
  description: weddingData.meta.description,
  alternates: {
    canonical: `/${weddingData.meta.slug}`,
  },
  openGraph: {
    type: "website",
    url: `/${weddingData.meta.slug}`,
    title: `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName}`,
    description: weddingData.meta.description,
    siteName: "Modern Invites",
    images: [
      {
        url: `/${weddingData.meta.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${weddingData.couple.groom.firstName} and ${weddingData.couple.bride.firstName}'s wedding invitation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName}`,
    description: weddingData.meta.description,
    images: [`/${weddingData.meta.slug}/opengraph-image`],
  },
};

export default function NylgenAndKerseeInvitation() {
  return (
    <WeddingThemeProvider>
      <OpeningScreen data={weddingData} />
      <BackgroundMusic />
      <ScrollProgress />
      <Navigation data={weddingData} />
      <main>
        <Hero data={weddingData} />
        <Invitation data={weddingData} />
        <Countdown data={weddingData} />
        <CinematicBreak data={weddingData} />
        <EventDetails data={weddingData} />
        <Entourage data={weddingData} />
        <Gallery data={weddingData} />
        <WeddingTimeline data={weddingData} />
        <GiftGuide data={weddingData} />
        <Attire data={weddingData} />
        <Hashtag data={weddingData} />
        <RSVP data={weddingData} />
      </main>
      <Footer data={weddingData} />
    </WeddingThemeProvider>
  );
}
