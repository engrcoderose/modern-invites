import { Label } from "@/components/ui/label";
import type { SeatingLandmark } from "../domain/seating-plan";
import { VENUE_KINDS, VENUE_OBJECTS, type VenueKind } from "../domain/venue-objects";

export function VenueControls({ item, onChange }: { item: SeatingLandmark; onChange(item: SeatingLandmark): void }) {
  const defaults = VENUE_OBJECTS[item.kind];
  return <div className="space-y-4">
    <div className="space-y-2"><Label htmlFor="venue-object-type">Object type</Label>
      <select id="venue-object-type" value={item.kind} onChange={event => {
        const kind = event.target.value as VenueKind;
        const next = VENUE_OBJECTS[kind];
        onChange({ ...item, kind, name: item.name === defaults.name ? next.name : item.name, width: next.width, height: next.height });
      }} className="h-10 w-full rounded-md border bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
        {VENUE_KINDS.map(kind => <option key={kind} value={kind}>{VENUE_OBJECTS[kind].name}</option>)}
      </select>
    </div>
  </div>;
}
