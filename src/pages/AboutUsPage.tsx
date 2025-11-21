import React from "react";
import Navigation from "./landing/Navigation";
import AboutUs from "./landing/AboutUs";
import Footer from "./landing/Footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <Navigation />
      <AboutUs />
      <Footer />
    </div>
  );
}

