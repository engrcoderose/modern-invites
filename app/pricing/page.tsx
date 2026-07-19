import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing & Packages | Modern Invites",
  description:
    "Compare Modern Invites website invitation packages, included features, revision allowances, and one-time pricing.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-ink">
      <Navigation />
      <main>
        <Pricing />
        <FrequentlyAskedQuestions />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
