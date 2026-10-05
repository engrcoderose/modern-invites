import { notFound } from "next/navigation";
import { getClientSeatingEvents } from "@/features/seating/infrastructure/client-seating-workspace";
import { createSupabaseSeatingRepository } from "@/features/seating/infrastructure/supabase-seating-repository";
import { SeatingWorkspace } from "@/features/seating/presentation/seating-workspace";

export default async function EventSeatFinderPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const id = Number((await params).eventId);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const { events, repository, userId } = await getClientSeatingEvents();
  const event = events.find((item) => item.id === id);
  if (!event) notFound();
  const [saved, allGuests] = await Promise.all([
    (await createSupabaseSeatingRepository()).load(id),
    repository.listAllEventGuests(userId, id),
  ]);
  const guests = allGuests.map(
    ({ id, fullName, householdName, attendanceStatus }) => ({
      id,
      fullName,
      householdName,
      attendanceStatus,
    }),
  );
  return <SeatingWorkspace event={event} initial={saved} guests={guests} />;
}
