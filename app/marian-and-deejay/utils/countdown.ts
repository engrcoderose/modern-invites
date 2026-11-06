export function getTimeRemaining(targetIso: string, now: number = Date.now()) {
  const seconds = Math.max(0, Math.ceil((Date.parse(targetIso) - now) / 1000));
  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor(seconds / 3_600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}
