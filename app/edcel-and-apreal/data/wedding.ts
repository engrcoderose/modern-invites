export const wedding = {
  couple: { display: "Edcel & Apreal", groom: "Edcel Colon", bride: "Apreal Ann Glory" },
  date: { display: "December 4, 2026", iso: "2026-12-04T15:00:00+08:00", day: "Friday" },
  ceremony: {
    name: "Transfiguration of Christ Parish Church",
    address: "Manuel L. Quezon Ext., Nayong Silangan, Brgy. San Roque, Antipolo City, Rizal",
    arrival: "2:30 PM", time: "3:00 PM",
  },
  reception: {
    name: "The Chandelier Events Place",
    address: "267 San Jose Ext., Brgy. San Isidro, Antipolo, 1870 Rizal",
    time: "5:30 PM", cocktails: "4:00 PM",
  },
  rsvp: { deadline: "November 15, 2026", eventSlug: "edcel-and-apreal" },
  attire: { title: "Formal & semi-formal", note: "Please avoid wearing white and black shirts or dresses." },
  timeline: [
    { time: "2:30 PM", title: "Guest Arrival", detail: "Guest arrival at the church", artwork: "arrival" },
    { time: "3:00 PM", title: "Ceremony", detail: "Wedding ceremony", artwork: "ceremony" },
    { time: "4:00 PM", title: "Cocktails", detail: "Cocktail hour", artwork: "cocktails" },
    { time: "5:30 PM", title: "Program Starts", detail: "Start of the reception program", artwork: "programStarts" },
    { time: "8:30 PM", title: "Program Ends", detail: "End of the program", artwork: "programEnds" },
  ] as const,
};

export function venueMapUrl(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}
