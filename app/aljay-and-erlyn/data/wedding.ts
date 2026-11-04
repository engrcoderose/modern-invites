const attireColorGuidance = "Feel free to wear any color you love. We kindly ask that you avoid all-yellow or all-green outfits, as well as white, black, and red.";
const rsvpDeadline = "10 November 2026";

export const wedding = {
  title: "Aljay & Erlyn",
  bride: "Erlyn Joy E. Sablay",
  groom: "Alfred John Gorgonio",
  email: "erlandjay08@gmail.com",
  date: "18 December 2026",
  ceremonyISO: "2026-12-18T15:00:00+08:00",
  rsvpDeadline,
  music: { title: "Spring Snow", artist: "10CM", src: "/aljay-and-erlyn/music/spring-snow.mp3" as string | null },
  rsvp: { eventSlug: "aljay-and-erlyn" },
  story: [
    "A love story straight out of the movies? Yes, that’s exactly what happened 12 years ago! One look was all it took for Aljay to notice Erlyn sitting across the Jeepney ride home from school aka Love at first sight!",
    "He was a social butterfly, the kind of person who could effortlessly strike up a conversation and get along with just about anyone. But the moment he laid eyes on her for the very first time, all those words seemed to disappear. For once, he found himself speechless, quietly admiring her from a distance.",
    "She, on the other hand, was reserved and soft-spoken, someone who only revealed her playful, carefree side to those lucky enough to know her closely. And when he finally gathered the courage to make the first move, well, you just have to believe in a little magic. It was as though they had known each other long before that very moment. What began as a simple conversation effortlessly blossomed into shared inside jokes, endless laughter, and hours upon hours of talking, as if neither could ever run out of things to say.",
    "On their first date, Aljay asked Erlyn to watch the Pyromusical in SM Mall of Asia. Little did they know, that a simple invitation would turn into their own little tradition- hands intertwined while gazing up at the night sky as thousands and thousands of lights bloom, sparkle and dance right before their very eyes.",
    "Through every season, they have been each other’s safe haven, greatest joy, and quiet strength. Aljay and Erlyn are a beautiful reminder of what a match made in heaven looks like.",
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
    { question: "When should I RSVP?", answer: `Please reply by ${rsvpDeadline}. We can’t wait to celebrate with you! Find your invitation on the RSVP page to send your reply.` },
    { question: "Are children invited?", answer: "We’ve decided to keep the wedding adults-only except for the entourage. We hope you can still join us for a well-earned night off." },
    { question: "Can I bring a plus-one?", answer: "We’d love to celebrate with everyone, but due to strict venue capacity limits, we have to keep our guest list limited to those named on the invitation." },
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
