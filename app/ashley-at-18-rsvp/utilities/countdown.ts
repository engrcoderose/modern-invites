const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getTimeRemaining(target: number, now: number) {
  const difference = Math.max(0, target - now);
  return [
    Math.floor(difference / DAY),
    Math.floor((difference % DAY) / HOUR),
    Math.floor((difference % HOUR) / MINUTE),
    Math.floor((difference % MINUTE) / SECOND),
  ];
}
