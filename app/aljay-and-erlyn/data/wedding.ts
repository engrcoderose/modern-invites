const attireColorGuidance = "Feel free to wear any color you love. We kindly ask that you avoid all-yellow or all-green outfits, as well as white, black, and red.";

export const wedding = {
  title: "Aljay & Erlyn",
  bride: "Erlyn Joy E. Sablay",
  groom: "Alfred John Gorgonio",
  email: "erlandjay08@gmail.com",
  date: "18 December 2026",
  ceremonyISO: "2026-12-18T15:00:00+08:00",
  rsvpDeadline: "8 November 2026",
  music: { title: "Spring Snow", artist: "10CM", src: "/aljay-and-erlyn/music/spring-snow.mp3" as string | null },
  rsvp: { eventSlug: "aljay-and-erlyn" },
  story: [
    "A love story like those in movies? Yes, that’s exactly what happened 12 years ago! One look was all it took for Aljay to notice Erlyn from across the Jeepney ride home from school aka Love at first sight!",
    "He was a social butterfly, someone you could easily talk and get along with but when he saw her for the very first time, he couldn’t even say a word, all he did was look from a distance. She was the reserved and quiet type, showing her playful side to those close to her so when he made the first move, you just got to believe in magic because it was as if it she knew this person all along! They instantly shared inside jokes and could talk for hours and hours.",
    "On their first date, Aljay asked Erlyn to watch the Pyromusical in SM Mall of Asia. From that moment on, a simple invite turned into their own little tradition; hands intertwined while gazing up at the night sky as thousands and thousands of lights bloom, sparkle and dance right before their very eyes.",
    "Together, they have been each other’s comfort, source of both happiness and strength. Aljay and Erlyn is a testament of what a match made in heaven looks like!",
  ],
  venues: [
    { id: "ceremony" as const, name: "Holy Family Parish Church", detail: "Parang, Marikina · Diocese of Antipolo", address: "233 C.M. Recto St, Marikina, 1800 Metro Manila", time: "3:00 in the afternoon", type: "The ceremony", mapQuery: "Holy Family Parish Church Parang 233 C.M. Recto St Marikina" },
    { id: "reception" as const, name: "Teodore Events Place", detail: "Marikina, Metro Manila", address: "61 Katipunan St, Marikina, 1800 Metro Manila", time: "6:00 PM · Reception Dinner", type: "The reception", mapQuery: "Teodore Events Place 61 Katipunan St Marikina" },
  ],
  timeline: [
    { time: "2:30 PM", title: "Guest Arrival", detail: "Settle in at Holy Family Parish Church." },
    { time: "3:00 PM", title: "Ceremony", detail: "The beginning of our forever." },
    { time: "5:00 PM", title: "Cocktail Hour", detail: "" },
    { time: "6:00 PM", title: "Reception Dinner", detail: "At Teodore Events Place." },
    { time: "9:00 PM", title: "After Party", detail: "" },
  ],
  attire: {
    code: "Casual, Semi-Formal, and Formal",
    gentlemen: "Long sleeves with or without a tie, or a polished pullover.",
    ladies: "A long gown, summer or cocktail dress, or knee-length dress.",
    avoid: attireColorGuidance,
    otherGuidance: "Kindly avoid ripped jeans, mini-skirts, Crocs, flip-flops, and slippers.",
  },
  faqs: [
    { question: "When should I RSVP?", answer: "Please reply by 8 November 2026. We can’t wait to celebrate with you! Find your invitation on the RSVP page to send your reply." },
    { question: "Are children invited?", answer: "We’ve decided to keep the wedding adults-only except for the entourage. We hope you can still join us for a well-earned night off." },
    { question: "Can I bring a plus-one?", answer: "Our numbers are really tight, so we’re only able to accommodate the guests who received the RSVP. Thank you for understanding." },
    { question: "What time should I arrive?", answer: "Please arrive at 2:30 PM. Our ceremony starts at 3:00 PM at Holy Family Parish Church in Parang, Marikina." },
    { question: "What is the dress code?", answer: `Casual, Semi-Formal, and Formal. ${attireColorGuidance} See the attire page for outfit inspiration.` },
  ],
};

export type Venue = (typeof wedding.venues)[number];

export const chapters = [
  { id: "invitation", label: "The invitation" },
  { id: "our-story", label: "Our story" },
  { id: "ceremony", label: "The ceremony" },
  { id: "reception", label: "The reception" },
  { id: "us", label: "Us · photos" },
  { id: "the-day", label: "The day" },
  { id: "parents", label: "Our parents" },
  { id: "godparents", label: "Principal sponsors" },
  { id: "wedding-party", label: "The wedding party" },
  { id: "little-ones", label: "Our little ones" },
  { id: "together", label: "Together · photos" },
  { id: "attire", label: "The dress code" },
  { id: "questions", label: "Your questions" },
  { id: "countdown", label: "Wedding countdown" },
  { id: "rsvp", label: "Kindly reply" },
  { id: "with-love", label: "With love" },
] as const;
export type ChapterId = (typeof chapters)[number]["id"];
