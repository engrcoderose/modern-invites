import Footer from "@/components/Footer";
import Gallery, { type GalleryCardItem } from "@/components/Gallery";
import Navigation from "@/components/Navigation";

const weddingSamples: GalleryCardItem[] = [
  {
    title: "Jae-Mar & Shyra",
    description: "Simple, Elegant, Minimal",
  },
  {
    title: "Alex & Jordan",
    description: "Garden ceremony, classic palette",
  },
  {
    title: "Sam & Riley",
    description: "Modern city celebration",
  },
];

const birthdaySamples: GalleryCardItem[] = [
  {
    title: "Adie Turns 7",
    description: "Fairytale Inspired 7th Birthday",
  },
  {
    title: "Milo’s 1st",
    description: "Soft pastels, photo-first layout",
  },
  {
    title: "Teen Glow Party",
    description: "Neon accents, bold typography",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-stone-50 to-white">
      <Navigation />
      <Gallery weddings={weddingSamples} birthdays={birthdaySamples} />
      <Footer />
    </div>
  );
}
