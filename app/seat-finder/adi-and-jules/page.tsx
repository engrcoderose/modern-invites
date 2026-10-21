import type { Metadata } from "next";
import { getPublishedSeating } from "@/features/seating/infrastructure/public-seating-repository";
import { eventSlug } from "@/app/adi-and-jules/data/event";
import { AdiJulesSeatFinder } from "@/app/adi-and-jules/components/seating/SeatFinder";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Your Seat | Adi & Jules",
  description: "Reception seating for Adi and Jules's wedding.",
  alternates: { canonical: "/seat-finder/adi-and-jules" },
  robots: { index: false, follow: false },
};

export default async function AdiAndJulesSeatFinderPage() {
  const seating = await getPublishedSeating(eventSlug);
  return <AdiJulesSeatFinder plan={seating?.plan} />;
}
