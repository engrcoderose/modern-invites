import type { StaticImageData } from "next/image";
import storyPortrait from "../../../public/christina-and-reboden/photos/prenup/dsc06605.jpg";
import rsvpPortrait from "../../../public/christina-and-reboden/photos/prenup/dsc06601.jpg";
import closingCollage from "../../../public/christina-and-reboden/photos/prenup/collage-and-corrections.jpg";
import loveStoryPhoto from "../../../public/christina-and-reboden/photos/prenup/dsc06556.jpg";
import faqPortrait from "../../../public/christina-and-reboden/photos/prenup/dsc06549.jpg";
import ceremonyVenue from "../assets/photos/ceremony-cathedral.jpg";
import receptionVenue from "../assets/photos/reception-placida.jpg";
import venueCrown from "../assets/designs/venue-floral-crown.webp";
import venuePedestal from "../assets/designs/venue-floral-pedestal.webp";
import venueTrim from "../assets/designs/design.webp";
import venueDamask from "../assets/designs/bg-pattern-2.webp";
import garden from "../assets/designs/bg-opening.webp";
import damask from "../assets/designs/bg-pattern.webp";
import ornament from "../assets/designs/design-2.webp";
import lady from "../assets/designs/dresscode-gown-dusty-blue.webp";
import ninang from "../assets/designs/dresscode-gown-gray.webp";
import ninong from "../assets/designs/dresscode-ninong-barong.webp";
import gentleman from "../assets/designs/dresscode-men.webp";
import envelope from "../assets/designs/envelope.webp";
import scroll from "../assets/designs/story-parchment-blush.webp";
import storyFrame from "../assets/designs/story-blush-photo-frame.webp";
import frame from "../assets/designs/save-the-date-frame-wide.webp";
import dateCollage from "../assets/designs/save-the-date-images.webp";
import paper from "../assets/designs/paper-bg.webp";
import waxSeal from "../assets/designs/timeline-wax-seal.webp";

export const artwork = { venueCrown, venuePedestal, venueTrim, venueDamask, garden, damask, ornament, lady, ninang, ninong, gentleman, envelope, scroll, storyFrame, frame, dateCollage, paper, waxSeal };

export type PhotoBreakPhoto = { src: StaticImageData; alt: string; position: string };

export const storyBreakPhoto: PhotoBreakPhoto = {
  src: loveStoryPhoto,
  alt: "Christina smiling warmly at Reboden as they stand together on the beach",
  position: "50% 45%",
};

export const faqBreakPhoto: PhotoBreakPhoto = {
  src: faqPortrait,
  alt: "Reboden smiling at Christina during their beach prenup session",
  position: "18% 50%",
};

export const venueArtworkSizes = {
  crown: "(max-height: 600px) min(calc((100vw - 32px) * .44), calc((100dvh - 142px) * .28), 140px), (max-width: 640px) min(calc((100vw - 32px) * .62), calc((100dvh - 162px) * .32), 280px), min(calc((100vw - 32px) * .62), calc((100dvh - 184px) * .32), 280px)",
  pedestal: "(max-height: 600px) min(calc((100vw - 32px) * .24), 95px), min(calc((100vw - 32px) * .30), 160px)",
  trim: "(max-height: 600px) min(calc((100vw - 32px) * .60), calc((100dvh - 142px) * .35), 232px), (max-width: 640px) min(calc((100vw - 32px) * .65), calc((100dvh - 162px) * .35), 302px), min(calc((100vw - 32px) * .65), calc((100dvh - 184px) * .35), 302px)",
};

export type Photo = { src: StaticImageData | string | null; alt: string; caption: string; sizes: string; position?: string; quality?: 75 | 85; fit?: "cover" | "contain" };
const venuePhotoSizes = "(max-height: 600px) min(calc((100vw - 32px) * .52), calc((100dvh - 142px) * .30), 200px), (max-width: 640px) min(calc((100vw - 32px) * .56), calc((100dvh - 162px) * .30), 260px), min(calc((100vw - 32px) * .56), calc((100dvh - 184px) * .30), 260px)";
export const photos: Record<"story" | "ceremony" | "reception" | "gallery" | "rsvp", Photo> = {
  story: { src: storyPortrait, alt: "Christina and Reboden holding hands and smiling at each other on the beach at sunset", caption: "Our love, our story", sizes: "clamp(180px, 32svh, 250px)", position: "50% 45%", quality: 85 },
  ceremony: { src: ceremonyVenue, alt: "Watercolor illustration of the facade and bell tower of Malolos Cathedral", caption: "The ceremony", sizes: venuePhotoSizes, fit: "contain" },
  reception: { src: receptionVenue, alt: "Watercolor illustration of Placida Pavilion Hall and its landscaped entrance", caption: "The reception", sizes: venuePhotoSizes, fit: "contain" },
  gallery: { src: closingCollage, alt: "A collage of Christina and Reboden in black outfits, with beach umbrella portraits and close-up smiles", caption: "Our favorite memories", sizes: "(max-width: 424px) calc(100vw - 40px), 384px", fit: "contain", quality: 85 },
  rsvp: { src: rsvpPortrait, alt: "Christina and Reboden sharing a smile on the beach", caption: "Celebrate with us", sizes: "(max-height: 600px) and (max-width: 640px) max(100vw, calc((100dvh - 110px) * .75)), (max-width: 640px) max(100vw, calc((100dvh - 130px) * .75)), max(100vw, calc((100dvh - 152px) * 1.78))", position: "50% 30%", quality: 85 },
};
