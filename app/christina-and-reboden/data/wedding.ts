export const wedding = {
  couple: "Christina & Reboden",
  bride: "Christina Ligon San Juan",
  groom: "Reboden Adorable Pacquiao",
  date: "January 23, 2027",
  ceremonyISO: "2027-01-23T15:00:00+08:00",
  weekday: "Saturday",
  hashtag: "#DENfoundhisEveryTINg",
  deadline: "December 28, 2026",
  ceremony: {
    name: "Minor Basilica and Cathedral Parish of Immaculate Conception",
    note: "Diocese of Malolos",
    address: "Pariancillo Street corner F. Estrella Street, Poblacion, Malolos City, Bulacan, Philippines",
    time: "3:00 PM",
  },
  reception: {
    name: "Placida Pavilion Events Place",
    note: "Reception to follow",
    address: "Lugam Rd, Malolos, Bulacan, Philippines",
    time: "5:00 PM · Guest registration & cocktails",
  },
  music: { title: "Thinking Out Loud", artist: "Ed Sheeran", src: "/christina-and-reboden/audio/thinking-out-loud-a263bf85.mp3" },
};

export const timeline = [
  { time: "2:30 PM", lines: ["Guest arrival"] },
  { time: "3:00 PM", lines: ["Ceremony"] },
  { time: "4:00 PM", lines: ["Photos"] },
  { time: "5:00 PM", lines: ["Guest registration &", "cocktail hour (Garden)"] },
  { time: "6:45 PM", lines: ["Main hall opens"] },
  { time: "7:00 PM", lines: ["Start of program", "(Main hall)"] },
  { time: "8:00 PM", lines: ["Dinner"] },
  { time: "8:45 PM", lines: ["Mobile bar officially opens", "(Party)"] },
];

export const faqs = [
  { question: "When should I RSVP?", answer: `Please respond by ${wedding.deadline}.` },
  { question: "How can I RSVP?", answer: "The RSVP form will be available here once guest responses open. This draft includes a preview of the form." },
  { question: "Are children invited?", answer: "To allow all guests to relax and enjoy the evening, our celebration is adults-only, with the exception of children in our entourage." },
  { question: "Can I bring a plus one?", answer: "Our numbers are really tight so we’re only able to accommodate the guests listed on the invite. Thank you for understanding." },
  { question: "Can I take photos during the ceremony?", answer: `Yes, please use our hashtag ${wedding.hashtag} so we can share in the memories too!` },
  { question: "Can I wear white?", answer: "Please reserve white for the bride. White, red, orange, green, and yellow are not permitted." },
  { question: "What is the dress code?", answer: "Strictly formal & cocktail, in our motif of dusty blue, blush pink, and champagne cream." },
];
