import type { Metadata } from "next";
import { getPublishedSeating } from "@/features/seating/infrastructure/public-seating-repository";
import { GuestSeatFinder } from "@/features/seating/presentation/guest-seat-finder";
import { ANJO_JASMIN_SEATING_SLUG, AnjoJasminSeatFinder } from "../../anjo-and-jasmin/anjo-jasmin-seat-finder";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Find your seat | Modern Invites",
  robots: { index: false, follow: false },
};
export default async function PublishedSeatFinderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seating =
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 100
      ? await getPublishedSeating(slug)
      : null;
  if (slug === ANJO_JASMIN_SEATING_SLUG) return <AnjoJasminSeatFinder plan={seating?.plan} />;
  if (!seating)
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <div className="max-w-md text-center">
          <h1 className="font-elegant text-4xl text-forest">
            Seating details coming soon
          </h1>
          <p className="mt-4 text-sm leading-6 text-ink-muted">
            Please check back later or ask the welcome team for your table.
          </p>
        </div>
      </main>
    );
  return (
    <GuestSeatFinder name={seating.name} slug={slug} plan={seating.plan} />
  );
}
