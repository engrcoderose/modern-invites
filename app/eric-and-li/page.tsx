"use client";

import React, { useEffect, useState } from "react";
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
import GalleryOne from "./components/GalleryOne";
import BackgroundMusic from "./components/BackgroundMusic";
import WeddingHashtag from "./components/WeddingHashtag";
import EnvelopeIntro from "./components/EnvelopeIntro";

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
  const [invitationOpened, setInvitationOpened] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <EnvelopeIntro
        bride={weddingData.bride}
        groom={weddingData.groom}
        onOpened={() => setInvitationOpened(true)}
      />

      {invitationOpened ? (
        <>
          <Navigation />
          <BackgroundMusic />
          <HeroSection
            bride={weddingData.bride}
            groom={weddingData.groom}
            weddingDate={weddingData.weddingDate}
          />
        </>
      ) : null}

      {invitationOpened ? (
        <>
          <CountdownTimer targetDate={weddingData.weddingDate} />
          <GalleryOne />

          {/* <InvitationMessage bride={weddingData.bride} groom={weddingData.groom} /> */}

          <div id="story">
            <OurStory />
          </div>

          <div id="program">
            <WeddingProgram events={weddingProgram} />
          </div>

          <div id="entourage">
            <TheEntourage data={entourage} />
          </div>

          <div id="location">
            <WeddingLocation
              ceremony={weddingData.venue}
              reception={weddingData.reception}
              bride={weddingData.bride}
              groom={weddingData.groom}
            />
          </div>

          <AttireColors
            dresscode={attireInfo.dresscode}
            colors={attireInfo.colors}
            description={attireInfo.description}
          />

          <WeddingHashtag/>

          <div id="faq">
            <FAQ faqs={faqs} />
          </div>

          <UsefulInformation infoItems={usefulInfo} />

          <RSVPForm
            bride={weddingData.bride}
            groom={weddingData.groom}
            rsvpDeadline="May 20, 2026"
          />

          <Footer />
        </>
      ) : null}
    </div>
  );
}
