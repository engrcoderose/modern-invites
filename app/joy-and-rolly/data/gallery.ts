// Approved placeholders from Vincent and Gabrielle's existing photo collection.
// Replace these URLs and descriptions when Joy and Rolly's photos are supplied.
const placeholderBase = "https://assets.moderninvites.com/placeholder-images/prenups";

export const photoBreakPhoto = {
  src: `${placeholderBase}/Group1-1.webp`,
  alt: "Walking hand in hand beside a golden wall",
  position: "24% bottom",
};

export const timelinePhotoBreakPhoto = {
  src: `${placeholderBase}/Group1-3.webp`,
  alt: "A sunset kiss beneath an ornate veranda",
  position: "60% center",
};

export const galleryPhotos = [
  { file: "Main1-2.webp", alt: "Holding hands beneath glowing red lanterns", position: "center bottom" },
  { file: "Group1-1.webp", alt: "Walking hand in hand beside a golden wall", position: "24% bottom" },
  { file: "Main1-3.webp", alt: "Looking at each other across an ornate green veranda", position: "center bottom" },
  { file: "Main1-4.webp", alt: "Standing together beside yellow walls and red lanterns", position: "center" },
  { file: "Group1-2.webp", alt: "Looking at each other against a weathered yellow wall", position: "50% bottom" },
  { file: "Group1-4.webp", alt: "Holding hands beside yellow walls and red lanterns", position: "80% center" },
].map(({ file, ...photo }) => ({ ...photo, src: `${placeholderBase}/${file}` }));
