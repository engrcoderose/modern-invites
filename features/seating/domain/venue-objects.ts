export const VENUE_KINDS = ["entrance", "dance_floor", "couple", "stage", "bar", "door", "wall", "label", "area"] as const;
export type VenueKind = typeof VENUE_KINDS[number];

export const VENUE_OBJECTS: Record<VenueKind, { name: string; width: number; height: number }> = {
  entrance: { name: "Entrance", width: 130, height: 48 },
  couple: { name: "Couple’s table", width: 130, height: 48 },
  stage: { name: "Stage", width: 150, height: 60 },
  dance_floor: { name: "Dance floor", width: 130, height: 100 },
  bar: { name: "Bar", width: 100, height: 40 },
  door: { name: "Door", width: 50, height: 50 },
  wall: { name: "Wall", width: 160, height: 12 },
  label: { name: "Label", width: 130, height: 32 },
  area: { name: "Area", width: 180, height: 100 },
};
