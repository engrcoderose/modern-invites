import {
  Accessibility,
  Armchair,
  ArrowUp,
  Cake,
  Gift,
  Tent,
  TreeDeciduous,
  UsersRound,
} from "lucide-react";
import type { VenueKind } from "../domain/venue-objects";

// Simple vector symbols share the same drawing in the catalogue and floor plan.
export function VenueSymbol({ kind }: { kind: VenueKind }) {
  const icons = {
    accessibility: Accessibility,
    high_chair: Armchair,
    arrow: ArrowUp,
    cake: Cake,
    gifts: Gift,
    tent: Tent,
    tree: TreeDeciduous,
    toilets: UsersRound,
  };
  if (kind in icons) {
    const Icon = icons[kind as keyof typeof icons];
    if (kind === "high_chair")
      return (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="13" cy="4" r="2.5" />
          <path d="M 10 7 L 12 13 H 19 M 7 8 L 10 17 H 20 M 8 12 H 21 M 10 17 L 7 24 M 17 17 L 20 24 M 12 13 V 8" />
        </g>
      );
    if (kind === "tent")
      return (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        >
          <rect x="1" y="1" width="22" height="22" rx="2" />
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M 1 1 L 6 6 M 23 1 L 18 6 M 1 23 L 6 18 M 23 23 L 18 18" />
        </g>
      );
    if (kind === "toilets") return <ToiletSign />;
    return <Icon width={24} height={24} strokeWidth={1.5} />;
  }
  if (kind === "toilet_booth")
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="1" y="1" width="22" height="22" rx="5" />
        <rect x="3" y="3" width="18" height="18" rx="4" strokeDasharray="3 1" />
        <g transform="translate(4 4) scale(.67)">
          <ToiletSign />
        </g>
      </g>
    );
  if (kind === "target")
    return (
      <g stroke="currentColor" fill="none" strokeWidth="1.2">
        <path d="M 1 1 L 9 9 M 23 1 L 15 9 M 1 23 L 9 15 M 23 23 L 15 15" />
        <circle cx="12" cy="12" r="1.5" />
      </g>
    );
  return null;
}

function ToiletSign() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="4" r="2" />
      <circle cx="18" cy="4" r="2" />
      <path d="M 4 8 H 8 L 10 16 H 2 Z M 4 16 V 22 M 8 16 V 22 M 15 14 V 9 Q 18 6 21 9 V 14 M 16 10 V 22 M 20 10 V 22 M 12 1 V 23" />
    </g>
  );
}
