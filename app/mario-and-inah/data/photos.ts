import type { StaticImageData } from "next/image";

const prenupBaseUrl = "https://assets.moderninvites.com/mario-and-inah/images/prenups";

// All uploaded WebP portraits are 1707 × 2560. Retain their dimensions so the
// existing responsive image sizing and slideshow aspect-ratio calculations work.
function prenupImage(filename: string): StaticImageData {
  return { src: `${prenupBaseUrl}/${filename}`, width: 1707, height: 2560 };
}

const bouquet = prenupImage("img_2546.webp");
const proposal = prenupImage("img_2547.webp");
const hands = prenupImage("img_2551.webp");
const pinkies = prenupImage("img_2552.webp");
const ring = prenupImage("img_2561.webp");
const reaching = prenupImage("img_2562.webp");
const together = prenupImage("img_2566.webp");
const kiss = prenupImage("img_2572.webp");
const portrait = prenupImage("img_2578.webp");
const dance = prenupImage("img_2584.webp");
const twirl = prenupImage("img_2587.webp");
const embrace = prenupImage("img_2594.webp");
const nextChapter = prenupImage("img_2598.webp");
const sunglasses = prenupImage("img_2637.webp");

export type InvitationPhoto = {
  id: string;
  src: StaticImageData | string | null;
  alt: string;
  caption: string;
  position?: string;
  preserveFaces?: boolean;
};

// One optimized source per photograph, reused across placements and the viewer.
// Focal points keep faces and hands visible when portrait photos fill wider frames.
const collection = {
  bouquet: { id: "bouquet", src: bouquet, alt: "Mario and Inah holding a white bouquet between their outstretched arms", caption: "For you", position: "50% 56%" },
  proposal: { id: "proposal", src: proposal, alt: "Mario presenting a ring box to Inah", caption: "The beginning of forever", position: "50% 70%" },
  hands: { id: "hands", src: hands, alt: "Mario and Inah holding hands", caption: "Hand in hand", position: "50% 55%" },
  pinkies: { id: "pinkies", src: pinkies, alt: "Mario and Inah linking their little fingers", caption: "A promise", position: "50% 66%" },
  ring: { id: "ring", src: ring, alt: "Mario placing a ring on Inah’s finger", caption: "Forever begins", position: "50% 66%" },
  reaching: { id: "reaching", src: reaching, alt: "Mario and Inah reaching toward each other’s hands", caption: "Always you", position: "50% 58%" },
  together: { id: "together", src: together, alt: "Mario and Inah standing side by side with their backs to the camera", caption: "Together" },
  kiss: { id: "kiss", src: kiss, alt: "Mario and Inah sharing a kiss behind a white bouquet", caption: "A little romance", position: "50% 5%" },
  portrait: { id: "portrait", src: portrait, alt: "Mario and Inah embracing with a white bouquet between them", caption: "Our favorite place", position: "50% 36%" },
  dance: { id: "dance", src: dance, alt: "Mario lifting Inah’s hand for a twirl", caption: "A dance together", position: "50% 0%" },
  twirl: { id: "twirl", src: twirl, alt: "Inah twirling beneath Mario’s raised hand, her veil in motion", caption: "A moment to remember", position: "50% 0%" },
  embrace: { id: "embrace", src: embrace, alt: "Inah showing her ring while Mario kisses her", caption: "Little moments", position: "50% 0%" },
  nextChapter: { id: "next-chapter", src: nextChapter, alt: "Inah embracing Mario with a bouquet behind his back", caption: "Our next chapter", position: "50% 8%" },
  sunglasses: { id: "sunglasses", src: sunglasses, alt: "Mario and Inah posing together in sunglasses with a white bouquet", caption: "Just us", position: "50% 5%" },
} satisfies Record<string, InvitationPhoto>;

export const photos = {
  welcome: collection.sunglasses,
  invitation: collection.portrait,
  rsvp: { ...collection.portrait, position: "50% 0%" },
  story: [collection.together, collection.dance],
  cinematic: collection.twirl,
  afterTimeline: { ...collection.sunglasses, position: "50% 0%", preserveFaces: true },
  gift: collection.proposal,
  closing: collection.nextChapter,
};

export const heroPhotos: InvitationPhoto[] = [photos.closing, { ...photos.welcome, position: "50% 0%", preserveFaces: true }, collection.kiss, collection.embrace];

export const galleryPhotos: InvitationPhoto[] = [collection.hands, collection.bouquet, collection.reaching];

// A portrait centerpiece, four surrounding moments, and two wide detail frames.
export const closingGalleryPhotos: InvitationPhoto[] = [
  collection.portrait,
  collection.pinkies,
  collection.ring,
  collection.dance,
  collection.embrace,
  collection.bouquet,
  collection.proposal,
];
