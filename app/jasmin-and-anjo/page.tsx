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
import AttireSection from "./components/AttireSection";
import GiftAndHashtagSections from "./components/GiftAndHashtagSections";
import GuestGuideSection from "./components/GuestGuideSection";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";
import { wedding } from "./data";
import WalkingCouple from "../isabella-and-daniel/assets/walking-couple.jpg";
import InLoveCouple from "../isabella-and-daniel/assets/inlove-couple.jpg";
import Portrait from "../isabella-and-daniel/assets/pexels-camera-treasure-928922-16841002.jpg";
import HappyCouple from "../isabella-and-daniel/assets/happy-couple.jpg";
import Flowers from "../isabella-and-daniel/assets/couple-with-flowers.jpg";
import Rings from "../isabella-and-daniel/assets/ring-focus.jpg";
import PiggyBack from "../isabella-and-daniel/assets/piggy-back-ride.jpg";
import PrenupPoster from "./assets/images/prenup/pexels-king-caplis-471600979-36396114.jpg";
import ChurchImage from "./assets/images/prenup/church-image.jpg";
import StoryWalk from "./assets/images/prenup/pexels-king-caplis-471600979-36396110.jpg";
import StoryEmbrace from "./assets/images/prenup/pexels-king-caplis-471600979-36266064.jpg";
import "./wedding.css";

export const metadata: Metadata = {
  title: "Jasmin & Anjo | November 21, 2026",
  description:
    "Together with our families, join Jasmin Sopera and Anjo Caluya for a celebration of love in Malabon on November 21, 2026.",
  alternates: { canonical: "/jasmin-and-anjo" },
};

export default function Page() {
  const gallery = [
    WalkingCouple,
    Portrait,
    HappyCouple,
    Flowers,
    Rings,
    PiggyBack,
    InLoveCouple,
  ].map((src, index) => ({
    src,
    alt: `Placeholder wedding photograph ${index + 1}; Jasmin and Anjo’s photos to follow`,
  }));
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
        date="2026-11-21T00:00:00+08:00"
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
        chapters={wedding.story.map((chapter) => ({
          title: chapter.title,
          date: chapter.chapter,
          description: chapter.text,
        }))}
        image={StoryWalk}
        secondImage={StoryEmbrace}
      />
      <CinematicBreak />
      <DetailsSection
        dateDisplay="November 21, 2026"
        venue={{
          eyebrow: "The ceremony",
          name: wedding.ceremony,
          address: "Malabon, Philippines",
          time: wedding.time,
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=San+Bartolome+Parish+Malabon",
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
          image: Rings,
        }}
        program={wedding.program.map((item) => ({
          time: item.time,
          title: item.title,
          description: item.detail,
        }))}
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
        colors={wedding.palette.map((color) => color.color)}
        image={Portrait}
      />
      {/* <GuestGuideSection
        notes={[
          {
            title: "Our ceremony",
            description:
              "We look forward to sharing our vows with you at San Bartolome Parish. The ceremony time will be announced soon.",
          },
          {
            title: "Our celebration",
            description:
              "Please join us at St. John XXIII Hall, San Bartolome Parish, Malabon, after the ceremony.",
          },
          {
            title: "The finer details",
            description:
              "Guest arrangements and the final program will be shared as our plans come together.",
          },
          {
            title: "Your presence",
            description:
              "Celebrating with the people we love will make our wedding day all the more meaningful.",
          },
        ]}
        faqs={[
          {
            question: "What should I wear?",
            answer:
              "Cocktail or semi-formal attire in our floral pastel palette. See the dress code section for the colors.",
          },
          {
            question: "What time should I arrive?",
            answer:
              "The ceremony time is still to be confirmed. We will update the invitation with the final schedule.",
          },
          {
            question: "How can I confirm my attendance?",
            answer:
              "RSVP details will be shared soon. The form below is currently a preview and does not send responses.",
          },
        ]}
      /> */}
      <GiftAndHashtagSections />
      <RSVPSection deadline="Our RSVP deadline and response details will be shared soon." />
      <Footer
        bride="Jasmin"
        groom="Anjo"
        dateDisplay="November 21, 2026"
        hashtag="Together, in full bloom"
      />
    </Invitation>
  );
}
