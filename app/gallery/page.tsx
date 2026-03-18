import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Navigation from "@/components/Navigation";
export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <Navigation />
      <Gallery />
      <Footer />
    </div>
  );
}