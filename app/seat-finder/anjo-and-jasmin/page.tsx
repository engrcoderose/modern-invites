import type { Metadata } from "next";
import { getPublishedSeating } from "@/features/seating/infrastructure/public-seating-repository";
import { ANJO_JASMIN_SEATING_SLUG, AnjoJasminSeatFinder } from "./anjo-jasmin-seat-finder";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Your Seat | Anjo & Jasmin",
  description: "Reception seating for Anjo and Jasmin's wedding.",
  alternates: {
    canonical: "https://seatfinder.anjoandjasminwedding.moderninvites.com",
  },
  robots: { index: false, follow: false },
};

export default async function AnjoAndJasminSeatFinderPage() {
  const seating = await getPublishedSeating(ANJO_JASMIN_SEATING_SLUG);
  return <AnjoJasminSeatFinder plan={seating?.plan} />;
}
