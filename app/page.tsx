import Navigation from "@/components/Navigation";
import PageEntrance from "@/components/marketing/PageEntrance";
import MarketingAnalytics from "@/components/MarketingAnalytics";
import Footer from "@/components/Footer";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import FeaturedInvitations from "@/components/landing/FeaturedInvitations";
import HomeClosing from "@/components/landing/HomeClosing";
import HeroSection from "@/components/landing/HeroSection";
import Pricing from "@/components/Pricing";
import AboutUs from "@/components/AboutUs";
import ProcessSection from "@/components/landing/ProcessSection";
import ProductExperiences from "@/components/landing/ProductExperiences";
import WhatWeCreate from "@/components/landing/WhatWeCreate";
import "@/components/landing/home.css";


export default function LandingPage() {
  return (
    <div className="marketing-site modern-home min-h-screen overflow-x-clip bg-marketing-paper text-marketing-ink">
      <Navigation />
      <PageEntrance>
        <HeroSection />
        <WhatWeCreate />
        <FeaturedInvitations />
        <ProductExperiences />
        <FeatureShowcase />
        <ProcessSection />
        <Pricing />
        <AboutUs />
        <FrequentlyAskedQuestions variant="home" />
        <HomeClosing />
      </PageEntrance>
      <Footer />
      <MarketingAnalytics />
    </div>
  );
}
