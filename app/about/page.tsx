import Navigation from "@/components/Navigation";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us - Modern Invites",
  description: "Learn about Modern Invites and our mission to create elegant digital invitations.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <Navigation />
      <AboutUs />
      <Footer />
    </div>
  );
}

