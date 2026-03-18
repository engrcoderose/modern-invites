"use client";

import React from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import InvitationDetails from "./components/InvitationDetails";
import ProgramSchedule from "./components/ProgramSchedule";
import OutfitGallery from "./components/OutfitGallery";
import BirthdayProgram from "./components/BirthdayProgram";
import ReceptionAddress from "./components/ReceptionAddress";
import DressCode from "./components/DressCode";
import OtherDetails from "./components/OtherDetails";

// Import data
import {
  debutData,
  programSchedule,
  birthdayProgram,
  attireInfo,
  otherDetails,
  receptionAddress,
} from "./data/debut-data";

export default function SimpleTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <HeroSection data={debutData} />

      <InvitationDetails data={debutData} />

      <ProgramSchedule schedule={programSchedule} />

      <OutfitGallery theme="red" photos={3} />

      <BirthdayProgram program={birthdayProgram} />

      <OutfitGallery theme="yellow" photos={3} />

      <ReceptionAddress
        name={receptionAddress.name}
        address={receptionAddress.address}
        mapUrl={receptionAddress.mapUrl}
      />

      <DressCode attire={attireInfo} />

      <OtherDetails details={otherDetails} />

      <Footer />
    </div>
  );
}
