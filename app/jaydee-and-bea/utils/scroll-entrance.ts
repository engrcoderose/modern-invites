export const ENTRANCE_DURATION = 0.85;
export const ENTRANCE_DISTANCE = 24;
export const ENTRANCE_STAGGER = 0.12;
export const ENTRANCE_MAX_DELAY = 0.36;
export const ENTRANCE_EASE = [0.42, 0, 0.58, 1] as const;

const entranceProfiles = ["heading", "text", "countdown-copy", "countdown-value", "portrait", "photo", "gallery", "card"] as const;
export type EntranceProfile = typeof entranceProfiles[number];

export function isEntranceProfile(profile: string): profile is EntranceProfile {
  return entranceProfiles.some((name) => name === profile);
}
