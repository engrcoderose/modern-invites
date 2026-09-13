import type { Metadata } from "next";
import SeatFinder from "./seat-finder";

export const metadata: Metadata = {
  title: "Find Your Seat | Eric & Li",
  description: "A sample reception seat finder for Eric and Li's wedding.",
  robots: { index: false, follow: false },
};

export default function EricAndLiSeatFinderPage() {
  return <SeatFinder />;
}
