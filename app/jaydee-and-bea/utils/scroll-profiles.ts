interface ScrollProfile {
  input: number[];
  y: number[];
  x?: number[];
  scale?: number[];
  opacity?: number[];
  rotate?: number[];
  blur?: string[];
  clip?: string[];
}

// Gentle trailing motion responds to scroll speed without taking over native scrolling.
export const SCENE_SPRING = { stiffness: 75, damping: 26, mass: 0.6 };

export const scrollProfiles: Record<
  "floral-left" | "floral-right" |
  "portrait" | "photo" | "gallery" | "card" | "seam" | "photo-stage",
  ScrollProfile
> = {
  "floral-left": { input: [0, 1], x: [0, -16], y: [10, -20], rotate: [0, -1.5], scale: [1, 1.025] },
  "floral-right": { input: [0, 1], x: [0, 16], y: [16, -10], rotate: [0, 1.5], scale: [1, 1.035] },
  portrait: { input: [0, 0.32, 0.75, 1], x: [-24, 0, 4, 8], y: [22, 0, -5, -14], scale: [0.98, 1, 1, 1.015], rotate: [-0.6, 0, 0, 0.3] },
  photo: { input: [0, 0.32, 0.72, 1], x: [-12, 0, 4, 10], y: [12, 0, -8, -18], scale: [1.16, 1.12, 1.12, 1.24], clip: ["inset(12% 6% 12% 6% round 28px)", "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)"] },
  gallery: { input: [0, 0.32, 0.72, 1], x: [-18, 0, 0, 10], y: [24, 0, 0, -16], scale: [0.97, 1, 1, 0.985] },
  card: { input: [0, 0.3, 0.76, 1], y: [24, 0, 0, -8], scale: [0.985, 1, 1, 1] },
  seam: { input: [0, 0.7, 1], y: [0, 0, 0], opacity: [0, 1, 1] },
  "photo-stage": { input: [0, 0.32, 0.72, 1], y: [0, 0, 0, 0], clip: ["inset(10% 5% 10% 5% round 40px)", "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)", "inset(3% 1% 0% 1% round 24px)"] },
};

export type ScrollProfileName = keyof typeof scrollProfiles;

