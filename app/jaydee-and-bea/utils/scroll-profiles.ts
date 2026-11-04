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
  "floral-left" | "floral-right" | "photo-stage",
  ScrollProfile
> = {
  "floral-left": { input: [0, 1], x: [0, -16], y: [10, -20], rotate: [0, -1.5], scale: [1, 1.025] },
  "floral-right": { input: [0, 1], x: [0, 16], y: [16, -10], rotate: [0, 1.5], scale: [1, 1.035] },
  "photo-stage": { input: [0, 0.32, 0.72, 1], y: [0, 0, 0, 0], clip: ["inset(10% 5% 10% 5% round 40px)", "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)", "inset(3% 1% 0% 1% round 24px)"] },
};

export type ScrollProfileName = keyof typeof scrollProfiles;

