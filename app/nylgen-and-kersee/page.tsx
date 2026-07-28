import type { Metadata } from "next";

import { Attire } from "./components/Attire";
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
import { RSVP } from "./components/RSVP";
import { WeddingTimeline } from "./components/WeddingTimeline";
import { WeddingThemeProvider } from "./components/WeddingThemeProvider";
import { weddingData } from "./data/weddingData";

export const metadata: Metadata = {
  title: `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName} | ${weddingData.event.dateDisplay}`,
  description: weddingData.meta.description,
};

export default function NylgenAndKerseeInvitation() {
  return (
    <WeddingThemeProvider>
      <Navigation data={weddingData} />
      <main>
        <Hero data={weddingData} />
        <Invitation data={weddingData} />
        <Countdown data={weddingData} />
        <Gallery data={weddingData} />
        <EventDetails data={weddingData} />
        <Entourage data={weddingData} />
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
