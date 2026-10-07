const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getTimeLeft(target: number, now: number) {
  const difference = Math.max(0, target - now);
  return {
    days: Math.floor(difference / DAY),
    hours: Math.floor((difference / HOUR) % 24),
    minutes: Math.floor((difference / MINUTE) % 60),
    seconds: Math.floor((difference / SECOND) % 60),
    finished: difference === 0,
  };
}
