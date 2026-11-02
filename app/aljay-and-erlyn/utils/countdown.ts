export function getCountdown(target: number, now: number) {
  const seconds = Math.ceil(Math.max(0, target - now) / 1000);
  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
    complete: now >= target,
  };
}

export type CountdownTime = ReturnType<typeof getCountdown>;
