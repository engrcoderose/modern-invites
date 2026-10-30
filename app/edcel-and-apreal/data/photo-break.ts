import { prenupMedia } from "./photo-media";
const balcony = prenupMedia["ivory-dress-stone-balcony-wide.webp"];
const sofa = prenupMedia["ivory-dress-sofa-portrait-wide-revised.webp"];
const terrace = prenupMedia["burgundy-gown-terrace-linked-arms-full-length.webp"];
const hallway = prenupMedia["burgundy-gown-arched-hallway-facing-each-other.webp"];
const garden = prenupMedia["ivory-dress-garden-sunglasses-playful.webp"];
const staircase = prenupMedia["sequin-dress-spiral-staircase-seated-revised.webp"];

export const storyPhotoBreak = {
  id: "story-photo-break",
  label: "A moment together",
  src: balcony,
  alt: "Edcel and Apreal smiling together on an ornate stone balcony surrounded by greenery.",
  position: "66% 50%",
};

export const entouragePortraitBreak = {
  id: "after-entourage-photo-break",
  label: "Our next chapter together",
  src: terrace,
  alt: "Edcel and Apreal standing arm in arm on a stone terrace, wearing a black suit and burgundy gown.",
  position: "56% 0%",
};

export const entouragePhotoBreak = {
  id: "entourage-photo-break",
  label: "Together, before forever",
  src: sofa,
  alt: "Apreal in an ivory dress seated on a vintage sofa, with Edcel sitting beside her against a painted wall.",
  position: "52% 22%",
};

export const attirePhotoBreak = {
  id: "after-attire-photo-break",
  label: "Together beneath the arch",
  src: hallway,
  alt: "Edcel and Apreal looking at each other beneath a vintage arch, wearing a black suit and burgundy gown.",
  position: "50% 27%",
};

export const remindersPhotoBreak = {
  id: "after-reminders-photo-break",
  label: "A little joy together",
  src: garden,
  alt: "Apreal standing beside Edcel seated in a garden, both wearing sunglasses and ivory outfits.",
  position: "62% 18%",
};

export const seatFinderPhotoBreak = {
  id: "after-seat-finder-photo-break",
  label: "Side by side",
  src: staircase,
  alt: "Edcel standing beside Apreal in her sequin dress, seated at a wooden spiral staircase.",
  position: "76% 23%",
};
