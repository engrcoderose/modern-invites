// Timed entrances stay legible even when a guest swipes quickly.
export const textReveals = {
  heading: { duration: 2.2, y: 20, opacity: 0.45, blur: 1.5, scale: 1 },
  text: { duration: 1.8, y: 12, opacity: 0.55, blur: 0.6, scale: 1 },
  "countdown-copy": { duration: 2, y: 24, opacity: 0.45, blur: 1.5, scale: 0.98 },
  "countdown-value": { duration: 1.8, y: 24, opacity: 0.45, blur: 0, scale: 0.96 },
} as const;

export type TextRevealProfile = keyof typeof textReveals;

export function isTextReveal(profile: string): profile is TextRevealProfile {
  return Object.hasOwn(textReveals, profile);
}
