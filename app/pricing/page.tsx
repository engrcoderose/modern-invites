import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing & Packages – Modern Invites",
  description:
    "Beautiful, handcrafted digital invitations for weddings, debuts, baptismals, and more. Transparent pricing with no hidden fees.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <Navigation />
      <div className="pt-16">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
