import React from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import FeatureSection from "./FeatureSection";
import OccasionsSection from "./OccasionsSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import OurProducts from "./OurProducts";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-white from-sage-50">
      <Navigation />
      <Hero />
      <OurProducts />
      <FeatureSection />
      <OccasionsSection />
      <CallToAction />
      <FrequentlyAskedQuestions />
      <Footer />
    </div>
  );
}
