import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import OccasionsSection from "@/components/OccasionsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import OurProducts from "@/components/OurProducts";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";

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

