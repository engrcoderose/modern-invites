import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import FeaturedInvitations from "@/components/landing/FeaturedInvitations";
import FinalCta from "@/components/landing/FinalCta";
import HeroSection from "@/components/landing/HeroSection";
import PricingPreview from "@/components/landing/PricingPreview";
import ProcessSection from "@/components/landing/ProcessSection";
import ProductExperiences from "@/components/landing/ProductExperiences";
import TrustBar from "@/components/landing/TrustBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-ink">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <FeaturedInvitations />
        <ProductExperiences />
        <FeatureShowcase />
        <ProcessSection />
        <PricingPreview />
        <FrequentlyAskedQuestions />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
