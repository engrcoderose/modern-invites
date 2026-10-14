// Confirmed questionnaire content. Keep the existing folder slug; the supplied
// questionnaire spells the groom's name Darell and requests bride-first display.
export const wedding = {
  slug: "darell-and-roselle",
  bride: "Roselle Buenavista",
  groom: "Darell John Salazar",
  title: "Roselle Buenavista & Darell John Salazar",
  shortTitle: "Roselle & Darell",
  date: "16 December 2026",
  dateISO: "2026-12-16",
  ceremonyISO: "2026-12-16T14:00:00+08:00",
  rsvpDeadline: "16 October 2026",
  contactEmail: "salazardarell0314@yahoo.com",
  attire: {
    formality: "Semi-formal",
    restrictions: "Please refrain from wearing shorts, sando, or T-shirts.",
  },
  venues: [
    {
      role: "The Ceremony",
      name: "Immaculate Conception Parish Church",
      time: "2:00 PM",
      address: "Concepcion, Marikina City (Diocese of Antipolo)",
      mapQuery: "Immaculate Conception Parish Church Concepcion Marikina City",
    },
    {
      role: "The Reception",
      name: "Rancho Estate IV West Clubhouse",
      time: "5:30 PM · Reception Dinner",
      address: "J4V9+PH7, Jersey St, Marikina Heights (Concepcion), Marikina, 1800 Metro Manila",
      mapQuery: "Rancho Estate IV West Clubhouse J4V9+PH7 Jersey St Marikina",
    },
  ],
  // The questionnaire's 9 PM after-party text is a prompt example, not an answer.
  timeline: [
    { time: "1:30 PM", title: "Guest Arrival" },
    { time: "2:00 PM", title: "Ceremony" },
    { time: "3:30 PM", title: "Pica-pica Hour" },
    { time: "5:30 PM", title: "Reception Dinner" },
  ],
} as const;

