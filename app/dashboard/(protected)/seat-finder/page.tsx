import Link from "next/link";
import { redirect } from "next/navigation";
import { getClientSeatingEvents } from "@/features/seating/infrastructure/client-seating-workspace";

export default async function SeatFinderPage() {
  const { events } = await getClientSeatingEvents();
  if (events.length === 1) redirect(`/dashboard/seat-finder/${events[0].id}`);
  return (
    <div className="space-y-6">
      <h1 className="font-elegant text-4xl text-forest">Seat Finder</h1>
      <p className="text-ink-muted">
        {events.length
          ? "Choose a wedding to arrange its floor plan and seats."
          : "Seat Finder is not included in your assigned events. Contact Modern Invites to add this service."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/dashboard/seat-finder/${event.id}`}
            className="rounded-2xl border bg-white p-6 font-elegant text-2xl text-forest hover:border-forest focus-visible:outline-offset-4"
          >
            {event.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
