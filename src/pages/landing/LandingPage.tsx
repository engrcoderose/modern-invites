import React from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import FeatureSection from "./FeatureSection";
import OccasionsSection from "./OccasionsSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import OurProducts from "./OurProducts";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <Navigation />
      <Hero />
      <OurProducts />
      <FeatureSection />
      <OccasionsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
