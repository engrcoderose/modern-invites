import type { DemoHousehold } from "./lib/demo-rsvp";

// Fictional Signature showcase. Never connect this sample to a client event.
export const wedding = {
  brideFirstName: "Bea",
  groomFirstName: "Joshua",
  city: "Tagaytay",
  heroDate: "19 · 06 · 2027",
  openingDate: "06.19.27",
  rsvpDeadline: "Please reply by May 29, 2027 (Philippine time).",
  receptionTime: "6:00 PM",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Tagaytay+Cavite+Philippines",
  mapEmbedUrl: "https://www.google.com/maps?q=Tagaytay+Cavite+Philippines&output=embed",
  bride: "Bea Monteverde",
  groom: "Joshua Villanueva",
  date: "Saturday, June 19, 2027",
  dateDisplay: "June 19, 2027",
  countdownDate: "2027-06-19T16:00:00+08:00",
  hashtag: "#JoshAndBeaBegin",
  time: "4:00 PM",
  ceremony: "The Garden Chapel",
  reception: "Casa Primavera Gardens",
  location: "Tagaytay, Cavite, Philippines",
  story: [
    { date: "01", title: "An unexpected beginning", description: "Sometimes, the loveliest things begin in the most ordinary ways. A simple hello became a conversation neither of us wanted to end—and, little by little, a friendship became something more." },
    { date: "02", title: "Our favorite everyday", description: "Through coffee dates, spontaneous adventures, and the quiet comfort of being together, we discovered that home could be a person. In every season, we kept choosing each other." },
    { date: "03", title: "A lifetime of yes", description: "One heartfelt question opened the door to our next chapter. Now, surrounded by the people who have loved us along the way, we begin our greatest adventure: forever." },
  ],
  program: [
    { time: "3:30 PM", title: "Welcome, loved ones", description: "Arrive, settle in, and share a little excitement." },
    { time: "4:00 PM", title: "We say “I do”", description: "A celebration of faith, love, and a lifetime together." },
    { time: "5:00 PM", title: "A moment to remember", description: "Photographs with our families and dearest friends." },
    { time: "6:00 PM", title: "To love & laughter", description: "Dinner, heartfelt toasts, and a beautiful evening." },
    { time: "7:30 PM", title: "Under the same stars", description: "Our first dance, sweet moments, and celebrations." },
  ],
  entourage: [
    { role: "Parents of the bride", names: ["Mr. Arturo Monteverde", "Mrs. Beatriz Monteverde"] },
    { role: "Parents of the groom", names: ["Mr. Lorenzo Villanueva", "Mrs. Cecilia Villanueva"] },
    { role: "Maid of honor", names: ["Clara del Rosario"] },
    { role: "Best man", names: ["Enzo Aguilar"] },
    { role: "Bridesmaids", names: ["Lucia Navarro", "Mara Valdez", "Elise Mercado"] },
    { role: "Groomsmen", names: ["Nico Salcedo", "Julian Rivera", "Adrian Laurel"] },
    { role: "Principal sponsors", names: ["Mr. & Mrs. Tomas Alvarado", "Mr. & Mrs. Felipe Rosales"] },
    { role: "Secondary sponsors", names: ["Candle · Ines & Marco", "Veil · Daphne & Luis", "Cord · Celeste & Hugo"] },
    { role: "Little companions", names: ["Ring bearer · Leo", "Coin bearer · Milo", "Flower girl · Amelia"] },
  ],
  palette: [
    { name: "Champagne", color: "#e9dfc3" }, { name: "Peach", color: "#f3bea6" },
    { name: "Blush", color: "#f3c3cf" }, { name: "Powder blue", color: "#bbd4ee" },
    { name: "Lilac", color: "#e8c4ec" }, { name: "Butter", color: "#f8f3ce" },
    { name: "Sage", color: "#d3dfb2" },
  ],
};

export const demoHouseholds: DemoHousehold[] = [
  {
    id: "del-rosario-aguilar", name: "Clara del Rosario & Enzo Aguilar", maxAttendees: 2,
    guests: [{ id: "clara", name: "Clara del Rosario", type: "Adult" }, { id: "enzo", name: "Enzo Aguilar", type: "Adult" }],
  },
  {
    id: "navarro", name: "Lucia Navarro", maxAttendees: 1,
    guests: [{ id: "lucia", name: "Lucia Navarro", type: "Adult" }],
  },
  {
    id: "alvarado", name: "The Alvarado Family", maxAttendees: 3,
    guests: [{ id: "tomas", name: "Tomas Alvarado", type: "Adult" }, { id: "ines", name: "Ines Alvarado", type: "Adult" }, { id: "leo", name: "Leo Alvarado", type: "Child" }],
  },
];
