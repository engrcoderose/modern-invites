import type { Metadata } from "next";
import Invitation from "./invitation";
import Navigation from "./components/Navigation";
import BackgroundMusic from "./components/BackgroundMusic";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./components/HeroSection";
import PolaroidStrip from "./components/PolaroidStrip";
import InvitationSection from "./components/InvitationSection";
import CountdownSection from "./components/CountdownSection";
import StorySection from "./components/StorySection";
import CinematicBreak from "./components/CinematicBreak";
import DetailsSection from "./components/DetailsSection";
import EntourageSection from "./components/EntourageSection";
import GallerySection from "./components/GallerySection";
import PhotoBreak from "./components/PhotoBreak";
import AttireSection from "./components/AttireSection";
import GiftSection from "./components/GiftSection";
import HashtagSection from "./components/HashtagSection";
import StickySlides from "./components/StickySlides";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";
import { wedding } from "./data";
import { gallery, PrenupPoster, StoryWalk, StoryEmbrace, ChurchImage } from "./media";
import "./wedding.css";

export const metadata: Metadata = {
  title: "Jasmin & Anjo | November 21, 2026",
  description:
    "Together with our families, join Jasmin Sopera and Anjo Caluya for a celebration of love in Malabon on November 21, 2026.",
  alternates: { canonical: "/jasmin-and-anjo" },
};

export default function Page() {
  return (
    <Invitation>
      <BackgroundMusic />
      <ScrollProgress />
      <Navigation initials="J / A" />
      <HeroSection
        bride="Jasmin"
        groom="Anjo"
        dateDisplay="21 · 11 · 2026"
        location="Malabon, Philippines"
      />
      <PolaroidStrip />
      <CountdownSection
        date={wedding.countdownDate}
        brideFullName={wedding.bride}
        groomFullName={wedding.groom}
      />
      <InvitationSection
        videoSrc="/videos/jasmin-and-anjo/prenup.mp4"
        poster={PrenupPoster}
        message="Together with our families, we, Jasmin Sopera and Anjo Caluya, request the honor of your presence as we celebrate the sacrament of marriage on Saturday, November 21, 2026, at San Bartolome Parish, Malabon. Join us afterward at St. John XXIII Hall for an evening of love, laughter, and celebration."
      />
      <StorySection
        title="A love in full bloom"
        chapters={wedding.story}
        image={StoryWalk}
        secondImage={StoryEmbrace}
      />
      <CinematicBreak />
      <DetailsSection
        dateDisplay={wedding.dateDisplay}
        venue={{
          eyebrow: "The ceremony",
          name: wedding.ceremony,
          address: "Malabon, Philippines",
          time: wedding.time,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=San+Bartolome+Parish+Malabon",
          mediaType: "image",
          image: ChurchImage,
          imageAlt: "Watercolor illustration of San Bartolome Parish, Malabon",
        }}
        reception={{
          eyebrow: "The reception",
          name: wedding.reception,
          address: wedding.location,
          time: "Reception follows the ceremony",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=St+John+XXIII+Hall+San+Bartolome+Parish+Malabon",
          mediaType: "map",
          mapEmbedUrl:
            "https://www.google.com/maps?q=St+John+XXIII+Hall+San+Bartolome+Parish+Malabon&output=embed",
        }}
        program={wedding.program}
      />
      <EntourageSection
        brideFullName={wedding.bride}
        groomFullName={wedding.groom}
        groups={wedding.entourage}
      />
      <GallerySection images={gallery} />
      <AttireSection
        title="A pastel garden romance"
        description="We kindly invite our guests to wear cocktail or semi-formal attire in our pastel palette: champagne, peach, blush, powder blue, lilac, butter yellow, and sage. Soft colors and floral touches will make our celebration all the more beautiful."
        colors={wedding.palette}
      />
      <StickySlides>
        <PhotoBreak />
        <GiftSection />
        <HashtagSection hashtag={wedding.hashtag} />
      </StickySlides>
      <RSVPSection deadline="Our RSVP deadline and response details will be shared soon." />
      <Footer
        bride="Jasmin"
        groom="Anjo"
        dateDisplay={wedding.dateDisplay}
        hashtag={wedding.hashtag}
      />
    </Invitation>
  );
}
