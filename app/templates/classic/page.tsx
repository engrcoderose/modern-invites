"use client";

import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import CountdownTimer from "./components/CountdownTimer";
import InvitationMessage from "./components/InvitationMessage";
import OurStory from "./components/OurStory";
import WeddingProgram from "./components/WeddingProgram";
import TheEntourage from "./components/TheEntourage";
import WeddingLocation from "./components/WeddingLocation";
import AttireColors from "./components/AttireColors";
import FAQ from "./components/FAQ";
import UsefulInformation from "./components/UsefulInformation";
import RSVPForm from "./components/RSVPForm";
import Footer from "./components/Footer";

// Import data
import {
  weddingData,
  ourStory,
  weddingProgram,
  entourage,
  attireInfo,
  faqs,
  usefulInfo,
} from "./data/wedding-data";

export default function ClassicWeddingTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <HeroSection
        bride={weddingData.bride}
        groom={weddingData.groom}
        weddingDate={weddingData.weddingDate}
      />

      <CountdownTimer targetDate={weddingData.weddingDate} />

      <InvitationMessage bride={weddingData.bride} groom={weddingData.groom} />

      <div id="story">
        <OurStory title={ourStory.title} content={ourStory.content} />
      </div>

      <div id="program">
        <WeddingProgram events={weddingProgram} />
      </div>

      <TheEntourage
        bridalParty={entourage.bridalParty}
        groomsmen={entourage.groomsmen}
      />

      <div id="location">
        <WeddingLocation
          ceremony={weddingData.venue}
          reception={weddingData.reception}
        />
      </div>

      <AttireColors
        dresscode={attireInfo.dresscode}
        colors={attireInfo.colors}
        description={attireInfo.description}
      />

      <div id="faq">
        <FAQ faqs={faqs} />
      </div>

      <UsefulInformation infoItems={usefulInfo} />

      <RSVPForm />

      <Footer />
    </div>
  );
}
