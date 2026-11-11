import type { ReactNode } from "react";
import { parents, principalSponsors, bridesmaids, groomsmen, bearers, flowerGirls, furbabies } from "./entourage";
import { SaveTheDate, WeddingInvitation, ClosingSlide } from "../sections/CelebrationSlides";
import VenueSlide from "../sections/VenueSlide";
import PhotoSlideshow from "../sections/PhotoSlideshow";
import TimelineSlide from "../sections/TimelineSlide";
import StorySlide from "../sections/StorySlide";
import PhotoBreakSlide from "../sections/PhotoBreakSlide";
import { EntourageSlide, NameColumns, NameGroup, SponsorSlide } from "../sections/EntourageSlide";
import SecondarySponsorsSlide from "../sections/SecondarySponsorsSlide";
import WeddingPartySlide from "../sections/WeddingPartySlide";
import RsvpSlide from "../sections/RsvpSlide";
import AttireSlide from "../sections/AttireSlide";
import FaqSlide from "../sections/FaqSlide";
import HashtagSlide from "../sections/HashtagSlide";
import { faqBreakPhoto, storyBreakPhoto } from "./media";

export type InvitationSlide = { id: string; label: string; tone: "cream" | "blue" | "pink" | "story"; content: ReactNode };

export function createSlides(activeSlideId?: string): InvitationSlide[] {
  return [
    { id: "save-the-date", label: "Save the date", tone: "cream", content: <SaveTheDate active={activeSlideId === "save-the-date"} /> },
    { id: "invitation", label: "The invitation", tone: "cream", content: <WeddingInvitation /> },
    { id: "our-story", label: "Our love story", tone: "story", content: <StorySlide /> },
    { id: "our-love", label: "Our love", tone: "cream", content: <PhotoBreakSlide photo={storyBreakPhoto} title="Our love" /> },
    { id: "ceremony", label: "The ceremony", tone: "cream", content: <VenueSlide kind="ceremony" /> },
    { id: "reception", label: "The reception", tone: "cream", content: <VenueSlide kind="reception" /> },
    { id: "our-moments", label: "Our moments", tone: "cream", content: <PhotoSlideshow visible={activeSlideId === "our-moments"} /> },
    { id: "timeline", label: "Wedding timeline", tone: "blue", content: <TimelineSlide /> },
    { id: "entourage", label: "Our families", tone: "cream", content: <EntourageSlide title="Our Entourage"><NameColumns groups={parents} /></EntourageSlide> },
    { id: "sponsors-1", label: "Principal sponsors", tone: "cream", content: <SponsorSlide pairs={principalSponsors} /> },
    { id: "secondary-sponsors", label: "Secondary sponsors", tone: "cream", content: <SecondarySponsorsSlide /> },
    { id: "bridesmaids", label: "Bridesmaids", tone: "cream", content: <WeddingPartySlide title="Our Bridesmaids" names={bridesmaids} /> },
    { id: "groomsmen", label: "Groomsmen", tone: "cream", content: <WeddingPartySlide title="Our Groomsmen" names={groomsmen} /> },
    { id: "bearers", label: "Our bearers", tone: "cream", content: <EntourageSlide title="Our Bearers"><NameColumns groups={bearers} /></EntourageSlide> },
    { id: "flowers-and-furbabies", label: "Flowers & furbabies", tone: "cream", content: <EntourageSlide title="Our Little Loves"><div className="flex flex-col gap-7"><NameGroup title="Bride’s flower girls" names={flowerGirls} /><NameGroup title="Our beloved furbabies" names={furbabies} /></div></EntourageSlide> },
    { id: "together", label: "Together", tone: "cream", content: <PhotoSlideshow visible={activeSlideId === "together"} fullBleed /> },
    { id: "attire", label: "The dress code", tone: "cream", content: <AttireSlide /> },
    { id: "questions-1", label: "FAQs", tone: "cream", content: <FaqSlide /> },
    { id: "hand-in-hand", label: "You & me", tone: "cream", content: <PhotoBreakSlide photo={faqBreakPhoto} title="You & me" showWholePhoto /> },
    { id: "hashtag", label: "Our hashtag", tone: "cream", content: <HashtagSlide /> },
    { id: "rsvp", label: "Kindly RSVP", tone: "pink", content: <RsvpSlide /> },
    { id: "forever", label: "See you there", tone: "cream", content: <ClosingSlide /> },
  ];
}

export const chapters = [
  ["save-the-date", "Save the date"], ["invitation", "The invitation"], ["our-story", "Our love story"],
  ["ceremony", "Ceremony & reception"], ["our-moments", "Our moments"], ["timeline", "Wedding timeline"], ["entourage", "Our entourage"],
  ["together", "Together"], ["attire", "The dress code"], ["questions-1", "FAQs"], ["hashtag", "Our hashtag"], ["rsvp", "Kindly RSVP"], ["forever", "See you there"],
];
