import type { GalleryPhoto } from "../types/wedding";
import church from "../assets/designs/church-image.jpg";
import reception from "../assets/designs/reception-image.jpg";
import afterParty from "../assets/designs/after-party-image.jpg";

export const venueArtwork: Readonly<Record<string, GalleryPhoto | undefined>> = {
  ceremony: { src: church, alt: "Watercolor illustration of Barasoain Church" },
  reception: { src: reception, alt: "Watercolor illustration of Casa Remedios" },
  "after-party": { src: afterParty, alt: "Watercolor illustration of the pool and gardens at Villa Alejandra Resort" },
};
