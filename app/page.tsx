import Navigation from "@/components/Navigation";
import MarketingAnalytics from "@/components/MarketingAnalytics";
import Footer from "@/components/Footer";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import FeaturedInvitations from "@/components/landing/FeaturedInvitations";
import HomeClosing from "@/components/landing/HomeClosing";
import HeroSection from "@/components/landing/HeroSection";
import PricingPreview from "@/components/landing/PricingPreview";
import ProcessSection from "@/components/landing/ProcessSection";
import ProductExperiences from "@/components/landing/ProductExperiences";
import "@/components/landing/home.css";

export default function LandingPage() {
  return (
    <div className="marketing-site modern-home min-h-screen overflow-hidden bg-ivory text-ink">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedInvitations />
        <ProductExperiences />
        <FeatureShowcase />
        <ProcessSection />
        <PricingPreview />
        <FrequentlyAskedQuestions variant="home" />
        <HomeClosing />
      </main>
      <Footer />
      <MarketingAnalytics />
    </div>
  );
}
