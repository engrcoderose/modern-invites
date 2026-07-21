import type { FAQ, TimelineEvent, WeddingTwoData } from "../types";
import CoupleWithFlowers from "../assets/couple-with-flowers.jpg";
import HappyCouple from "../assets/happy-couple.jpg";
import InLoveCouple from "../assets/inlove-couple.jpg";
import PiggyBackRide from "../assets/piggy-back-ride.jpg";
import RingFocus from "../assets/ring-focus.jpg";
import RomanticCouple from "../assets/romantic-couple.jpg";
import WalkingCouple from "../assets/walking-couple.jpg";
import PortraitOne from "../assets/pexels-camera-treasure-928922-16840837.jpg";
import PortraitTwo from "../assets/pexels-camera-treasure-928922-16840954.jpg";

export const weddingTwoData: WeddingTwoData = {
  bride: "Isabella",
  groom: "Daniel",
  brideFullName: "Isabella Marie Santos",
  groomFullName: "Daniel Miguel Reyes",
  weddingDate: new Date("2027-03-14T15:00:00+08:00"),
  dateDisplay: "14 · 03 · 2027",
  locationDisplay: "Antipolo, Philippines",
  invitationMessage:
    "Together with our families, we invite you to witness the beginning of our forever—a celebration of devotion, joy, and the beautiful life still to come.",
  venue: {
    eyebrow: "The ceremony",
    name: "The Glass Garden",
    address: "Riverside Drive, Antipolo City, Rizal",
    time: "Three o’clock in the afternoon",
    mapUrl: "https://maps.google.com/?q=The+Glass+Garden+Antipolo",
    image: RomanticCouple,
  },
  reception: {
    eyebrow: "The celebration",
    name: "The Grand Conservatory",
    address: "The Glass Garden, Antipolo City, Rizal",
    time: "Dinner and dancing to follow",
    mapUrl: "https://maps.google.com/?q=The+Glass+Garden+Antipolo",
    image: RingFocus,
  },
  ourStory: {
    title: "A love, written slowly",
    content: [
      {
        title: "A chance meeting",
        date: "2016",
        description:
          "A birthday dinner in Manila became an evening neither of us wanted to end—just easy conversation, shared dreams, and one last coffee.",
      },
      {
        title: "The beginning of us",
        date: "2018",
        description:
          "Friendship quietly turned into something more. In the years that followed, love looked like laughter, patience, and choosing each other every day.",
      },
      {
        title: "The easiest yes",
        date: "2026",
        description:
          "At sunset in Tagaytay, surrounded by stillness and mountain air, Daniel asked a question Isabella had already answered in her heart.",
      },
    ],
  },
  dressCode: {
    title: "An evening in romance",
    description:
      "We would love to see you in formal attire. Gentlemen in dark suits; ladies in long dresses inspired by our celebration palette.",
    colors: ["#4A0E1B", "#742438", "#A66965", "#D4B483", "#E9DED0"],
  },
  gallery: [
    { src: WalkingCouple, alt: "Isabella and Daniel walking together" },
    { src: PortraitOne, alt: "A quiet portrait of the couple", position: "center 38%" },
    { src: HappyCouple, alt: "The couple sharing a joyful moment" },
    { src: CoupleWithFlowers, alt: "Isabella and Daniel with flowers" },
    { src: PortraitTwo, alt: "A romantic portrait of the couple", position: "center 30%" },
    { src: PiggyBackRide, alt: "The couple laughing together" },
    { src: InLoveCouple, alt: "The couple embracing" },
  ],
  entourage: [
    { role: "Parents of the bride", names: ["Roberto & Elena Santos"] },
    { role: "Parents of the groom", names: ["Eduardo & Carmela Reyes"] },
    { role: "Maid of honor", names: ["Camille Rivera"] },
    { role: "Best man", names: ["Mark Anthony Reyes"] },
    { role: "Bridesmaids", names: ["Angelica Flores", "Bianca Cruz", "Hazel Domingo"] },
    { role: "Groomsmen", names: ["Luis Mendoza", "Patrick Lim", "Joshua Reyes"] },
    { role: "Veil sponsors", names: ["Jasmine Co & Paolo Ramos"] },
    { role: "Cord sponsors", names: ["Nicole Garcia & Kevin Bautista"] },
    { role: "Candle sponsors", names: ["Rhea Santos & Janine Cruz"] },
    { role: "Little ones", names: ["Ethan Reyes · Ring bearer", "Sofia Reyes · Flower girl"] },
  ],
  guestNotes: [
    { title: "An unplugged ceremony", description: "Please keep phones and cameras away as we exchange our vows. Our photographers will capture every moment for us all." },
    { title: "An intimate celebration", description: "We have reserved seats only for the guests named on your invitation. Thank you for helping us keep the day close and meaningful." },
    { title: "Little guests", description: "Unless named on your invitation, we hope you understand that our reception will be an adults-only evening." },
    { title: "A note on gifts", description: "Your presence is the greatest gift. Should you wish to honor us further, a contribution toward our future home would be deeply appreciated." },
  ],
  rsvpDeadline: "February 14, 2027",
  weddingHashtag: "#IsabellaFoundHerDaniel",
};

export const weddingProgram: TimelineEvent[] = [
  { time: "2:30 PM", title: "Guest arrival", description: "Welcome refreshments and seating." },
  { time: "3:00 PM", title: "Ceremony", description: "The exchange of vows and rings." },
  { time: "4:30 PM", title: "Cocktail hour", description: "Drinks, canapés, and photographs." },
  { time: "6:00 PM", title: "Dinner", description: "Toasts, dinner, and celebration." },
  { time: "8:00 PM", title: "Dancing", description: "Meet us beneath the lights." },
];

export const faqData: FAQ[] = [
  { question: "What is the dress code?", answer: "Formal attire in deep, warm, and neutral tones is warmly encouraged." },
  { question: "Can I bring a plus one?", answer: "Our celebration is intimate; please refer to the names listed on your invitation." },
  { question: "When should I arrive?", answer: "We recommend arriving by 2:30 PM, thirty minutes before the ceremony." },
];
