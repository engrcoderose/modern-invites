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
import HashtagSection from "./components/HashtagSection";
import StickySlides from "./components/StickySlides";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";
import { wedding } from "./data";
import {
  gallery,
  invitationPreview,
  PrenupPoster,
  StoryWalk,
  StoryEmbrace,
} from "./media";
import "./wedding.css";

const invitationTitle = `${wedding.groomFirstName} & ${wedding.brideFirstName} | ${wedding.dateDisplay}`;
const invitationDescription = `Together with their families, ${wedding.groomFirstName} and ${wedding.brideFirstName} invite you to celebrate their marriage on ${wedding.dateDisplay} at ${wedding.ceremony}, ${wedding.city}.`;

export const metadata: Metadata = {
  title: invitationTitle,
  description: invitationDescription,
  alternates: { canonical: "/joshua-and-bea-wedding" },
  openGraph: {
    title: invitationTitle,
    description: invitationDescription,
    url: "/joshua-and-bea-wedding",
    type: "website",
    images: [invitationPreview],
  },
  twitter: {
    card: "summary_large_image",
    title: invitationTitle,
    description: invitationDescription,
    images: [invitationPreview],
  },
};

export default function Page() {
  return (
    <Invitation>
      <BackgroundMusic />
      <ScrollProgress />
      <Navigation initials="J / B" />
      <HeroSection
        bride={wedding.brideFirstName}
        groom={wedding.groomFirstName}
        dateDisplay={wedding.heroDate}
        location={wedding.location}
      />
      <PolaroidStrip />
      <CountdownSection
        date={wedding.countdownDate}
        brideFullName={wedding.bride}
        groomFullName={wedding.groom}
      />
      <InvitationSection
        poster={PrenupPoster}
        message={`Together with our families, we, ${wedding.groom} and ${wedding.bride}, invite you to celebrate our marriage on ${wedding.date} at ${wedding.time}, at ${wedding.ceremony} in ${wedding.city}. Join us at ${wedding.reception} at ${wedding.receptionTime} for an evening of love, laughter, and celebration.`}
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
          address: wedding.location,
          time: wedding.time,
          mapUrl: wedding.mapUrl,
          mediaType: "map",
          mapEmbedUrl: wedding.mapEmbedUrl,
        }}
        reception={{
          eyebrow: "The reception",
          name: wedding.reception,
          address: wedding.location,
          time: wedding.receptionTime,
          mapUrl: wedding.mapUrl,
          mediaType: "map",
          mapEmbedUrl: wedding.mapEmbedUrl,
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
        <HashtagSection hashtag={wedding.hashtag} />
      </StickySlides>
      <RSVPSection deadline={wedding.rsvpDeadline} />
      <Footer
        bride={wedding.brideFirstName}
        groom={wedding.groomFirstName}
        dateDisplay={wedding.dateDisplay}
        hashtag={wedding.hashtag}
      />
    </Invitation>
  );
}
