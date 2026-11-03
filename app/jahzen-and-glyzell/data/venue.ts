import ceremony from "../assets/venue/ceremony.jpg";
import reception from "../assets/venue/reception.jpg";
import { wedding } from "./wedding";

const venuePhotos = [
  { id: "ceremony", title: "The ceremony", src: ceremony, alt: "Garden exterior of La Fina Grand Hall" },
  { id: "reception", title: "The reception", src: reception, alt: "La Fina Grand Hall reception interior with banquet tables" },
];

export const venueEvents = venuePhotos.flatMap(photo => {
  const event = wedding.timeline.find(item => item.title === photo.title);
  return event ? [{ ...photo, ...event }] : [];
});
