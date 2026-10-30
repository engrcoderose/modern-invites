import { Music2, UsersRound } from "lucide-react";

export default function TimelineIcon({ index }: { index: number }) {
  const shared = { width: 38, height: 38, strokeWidth: 1.1, "aria-hidden": true as const };
  if (index === 0) return <UsersRound {...shared} />;
  if (index === 4) return <Music2 {...shared} />;
  return <svg {...shared} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {index === 1 && <><circle cx="19" cy="29" r="12" /><circle cx="30" cy="29" r="12" /><path d="m23 5 6 2 2 5-7 6-7-6 2-5 4-2Z M17 12h14M19 7l5 11 5-11" /></>}
    {index === 2 && <><path d="m9 8 12 4-4 13c-1 4-6 6-9 3-3-2-3-5-2-8L9 8ZM12 30 8 42M3 41l10 3M9 13l10 3M39 8l-12 4 4 13c1 4 6 6 9 3 3-2 3-5 2-8L39 8ZM36 30l4 12M35 44l10-3M29 16l10-3M23 2v5M16 2l3 5M31 2l-3 5" /></>}
    {index === 3 && <><circle cx="26" cy="25" r="15" /><circle cx="26" cy="25" r="11" /><path d="M4 7v13c0 3 6 3 6 0V7M7 7v36M45 7v36M45 7c-5 6-5 12 0 15" /></>}
  </svg>;
}
