export const wedding = {
  title: "Aljay & Erlyn",
  bride: "Erlyn Joy E. Sablay",
  groom: "Alfred John Gorgonio",
  email: "erlandjay08@gmail.com",
  date: "18 December 2026",
  ceremonyISO: "2026-12-18T15:00:00+08:00",
  rsvpDeadline: "8 November 2026",
  music: { title: "Spring Snow", artist: "10CM", src: "/aljay-and-erlyn/music/spring-snow.mp3" as string | null },
  // Enable only after the owner creates and approves this event's admin record.
  rsvp: { enabled: false, eventSlug: null as string | null },
  story: [
    "There really is such a thing as love at first sight! One look was all it took for Aljay to notice Erlyn across the Jeepney ride home from school.",
    "He was a social butterfly and could easily get along with everyone while she was reserved and only showed her playful side to those she’s comfortable with.",
    "For more than 12 years, Aljay and Erlyn showed what a match made in heaven looked like.",
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
    avoid: "Please avoid: All yellow, All Green, White, Black, and Red",
    otherGuidance: "Kindly avoid ripped jeans, mini-skirts, Crocs, flip-flops, and slippers.",
  },
  faqs: [
    { question: "When should I RSVP?", answer: "Please reply by 8 November 2026. We can’t wait to celebrate with you! Online replies will open once the invitation is finalized. In the meantime, please contact us directly." },
    { question: "Are children invited?", answer: "We’ve decided to keep the wedding adults-only except for the entourage. We hope you can still join us for a well-earned night off." },
    { question: "Can I bring a plus-one?", answer: "Our numbers are really tight, so we’re only able to accommodate the guests who received the RSVP. Thank you for understanding." },
    { question: "What time should I arrive?", answer: "Please arrive at 2:30 PM. Our ceremony starts at 3:00 PM at Holy Family Parish Church in Parang, Marikina." },
    { question: "What is the dress code?", answer: "Casual, Semi-Formal, and Formal. Please avoid: All yellow, All Green, White, Black, and Red. See the attire page for outfit inspiration." },
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
  { id: "godparents", label: "Our godparents" },
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
