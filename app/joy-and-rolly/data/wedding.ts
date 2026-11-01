import churchPhoto from "../assets/ceremony-san-alfonso-parish.webp";
import receptionPhoto from "../assets/reception-the-club-at-northtown.webp";

export const wedding = {
  slug: "joy-and-rolly",
  couple: { display: "Joy and Rolly", shortDisplay: "Joy & Rolly", bride: "Christine Joy Peña", groom: "Rolly John Peña" },
  date: { iso: "2027-03-12T15:00:00+08:00", display: "March 12, 2027", numeric: "12.03.27", day: "Friday" },
  rsvp: { deadline: "February 15, 2027", deadlineIso: "2027-02-15" },
  venues: [
    {
      label: "The ceremony", name: "San Alfonso Maria De Liguori Parish",
      address: "Barangay Mandug, Davao City, Philippines", time: "3:00 PM",
      mapQuery: "San Alfonso Maria De Liguori Parish Mandug Davao City Philippines",
      image: { src: churchPhoto, alt: "Church exterior for the wedding ceremony at San Alfonso Maria De Liguori Parish" },
    },
    {
      label: "The reception", name: "The Club at Northtown",
      address: "Northtown Subd, Phase 2, Cherry Street, Buhangin-Cabantian-Indangan Rd, Davao City",
      time: "6:00 PM · Reception dinner", mapQuery: "The Club at Northtown Davao City Philippines",
      image: { src: receptionPhoto, alt: "Entrance and venue sign at The Club at Northtown" },
    },
  ],
  timeline: [
    { time: "2:30 PM", title: "Guest Arrival", icon: "arrival" },
    { time: "3:00 PM", title: "Ceremony", icon: "ceremony" },
    { time: "5:00 PM", title: "Cocktail Hour", icon: "cocktails" },
    { time: "6:00 PM", title: "Reception Dinner", icon: "dinner" },
    { time: "8:00 PM", title: "After Party", icon: "party" },
  ],
  attire: [
    { group: "Team Bride", colors: [{ label: "Lilac", hex: "#b7a0c8" }] },
    { group: "Team Groom", colors: [{ label: "Dusty blue", hex: "#8daac4" }] },
    { group: "Neutral", colors: [{ label: "Beige", hex: "#ded0b8" }, { label: "Tan", hex: "#bb9574" }] },
  ],
} as const;

