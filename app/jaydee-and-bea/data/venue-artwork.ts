import type { GalleryPhoto } from "../types/wedding";
import { churchArtwork as church, receptionArtwork as reception, afterPartyArtwork as afterParty } from "./design-media";

export const venueArtwork: Readonly<Record<string, GalleryPhoto | undefined>> = {
  ceremony: { src: church, alt: "Watercolor illustration of Barasoain Church" },
  reception: { src: reception, alt: "Watercolor illustration of Casa Remedios" },
  "after-party": { src: afterParty, alt: "Watercolor illustration of the pool and gardens at Villa Alejandra Resort" },
};
