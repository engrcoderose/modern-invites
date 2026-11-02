export const textRevealEase = [0.22, 1, 0.36, 1] as const;

export function textRevealTiming(index: number, opening = false, reduced = false) {
  return {
    duration: reduced ? 0 : opening ? 0.5 : 0.85,
    delay: reduced ? 0 : opening
      ? Math.min(index * 0.08, 0.48)
      : 0.4 + Math.min(index * 0.07, 0.42),
  };
}
