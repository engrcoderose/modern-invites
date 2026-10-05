import { Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TABLE_SHAPES, type SeatingTable, type SeatingLandmark, type SeatingGuest, type SeatingPlan } from "../domain/seating-plan";
import { TableGuestPicker } from "./table-guest-picker";
import { VenueControls } from "./venue-controls";
import { ObjectSizeControls } from "./object-size-controls";

const colorPresets = [
  { name: "Rose", value: "#d99bad" }, { name: "Peach", value: "#e9a38e" },
  { name: "Apricot", value: "#e8b976" }, { name: "Gold", value: "#dcc96b" },
  { name: "Sky", value: "#91badd" }, { name: "Periwinkle", value: "#a1a9dd" },
  { name: "Lavender", value: "#b79acc" }, { name: "Sage", value: "#88a999" },
];

export function TableInspector({ item, plan, guests, disabled, onChange, onDelete, onDuplicate, onClose, onAssign }: {
  item: SeatingTable | SeatingLandmark;
  disabled: boolean;
  plan: SeatingPlan;
  guests: SeatingGuest[];
  onChange(item: SeatingTable | SeatingLandmark): void;
  onDelete(): void;
  onDuplicate(): void;
  onClose(): void;
  onAssign(guestId: number, tableId: string, seatNumber?: number): void;
}) {
  const table = "capacity" in item;
  const count = plan.assignments.filter(assignment => assignment.tableId === item.id).length;
  return <aside aria-label="Selected floor plan object" className="flex max-h-[70dvh] min-w-0 flex-col overflow-hidden rounded-xl border bg-white lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)]">
    <div className="flex shrink-0 items-center justify-between gap-2 border-b bg-sage-50 p-4">
      <div className="min-w-0"><h2 className="break-words font-elegant text-xl text-forest">{item.name || (table ? "Table details" : "Venue details")}</h2>
        {table && <p className="mt-1 text-xs text-ink-muted">{count}/{item.capacity} guests</p>}</div>
      <div className="flex shrink-0 gap-1">
        <Button type="button" variant="outline" size="icon" disabled={disabled} onClick={onDuplicate} aria-label={`Duplicate ${item.name}`} title="Duplicate"><Copy className="size-4" aria-hidden="true" /></Button>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close table details"><X className="size-4" aria-hidden="true" /></Button>
      </div>
    </div>
    <div key={item.id} role="region" aria-label="Scrollable object details" tabIndex={0} className="min-h-0 overflow-y-auto overscroll-contain space-y-5 p-4 [scrollbar-gutter:stable] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest">
    <fieldset disabled={disabled} className="space-y-4 disabled:opacity-70">
    <legend className="sr-only">Selected {table ? "table" : "venue object"}</legend>
    <div className="space-y-2"><Label htmlFor="seating-item-name">{table ? "Table name" : "Label"}</Label><Input id="seating-item-name" value={item.name} maxLength={60} onChange={event => onChange({ ...item, name: event.target.value })} /></div>
    {table && <>
      <div className="space-y-2"><Label htmlFor="seating-capacity">Seats</Label><Input id="seating-capacity" type="number" min={1} max={30} value={item.capacity} onChange={event => onChange({ ...item, capacity: Math.min(30, Math.max(1, Number(event.target.value))) })} /></div>
      <div className="space-y-2"><p id="seating-shape-label" className="text-sm font-medium">Table shape</p>
        <div role="group" aria-labelledby="seating-shape-label" className="grid grid-cols-4 gap-1 rounded-lg border p-1">
          {TABLE_SHAPES.map(shape => <Button key={shape} type="button" size="sm" variant={item.shape === shape ? "default" : "ghost"} aria-pressed={item.shape === shape} onClick={() => { if (shape !== item.shape) onChange({ ...item, shape, width: undefined, height: undefined }); }} className={`px-1 text-xs capitalize ${item.shape === shape ? "bg-forest text-white" : ""}`}>{shape}</Button>)}
        </div>
      </div>
      <div className="space-y-2"><p id="seating-color-label" className="text-sm font-medium">Table colour</p>
        <div role="group" aria-labelledby="seating-color-label" className="flex flex-wrap gap-2">
          {colorPresets.map(color => <button key={color.value} type="button" onClick={() => onChange({ ...item, color: color.value })} aria-label={`${color.name} table colour`} aria-pressed={item.color.toLowerCase() === color.value} title={color.name} style={{ backgroundColor: color.value }} className={`size-7 rounded-md border-2 shadow-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest ${item.color.toLowerCase() === color.value ? "border-forest ring-2 ring-forest/20" : "border-black/20"}`} />)}
        </div>
      </div>
    </>}
    {!table && <VenueControls item={item} onChange={onChange} />}
    <ObjectSizeControls item={item} onChange={onChange} />
    <details className="rounded-lg border p-3">
      <summary className="cursor-pointer text-sm font-medium text-forest">Position{table ? " & custom colour" : ""}</summary>
      <div className="mt-4 space-y-4">
      {table && <div>
        <div className="space-y-2"><Label htmlFor="seating-color">Custom colour</Label><Input id="seating-color" type="color" value={item.color} onChange={event => onChange({ ...item, color: event.target.value })} /></div>
      </div>}
    <div className="grid grid-cols-2 gap-3">{(["x", "y"] as const).map(axis => <div key={axis} className="space-y-2"><Label htmlFor={`seating-${axis}`}>{axis === "x" ? "Horizontal %" : "Vertical %"}</Label><Input id={`seating-${axis}`} type="number" min={8} max={92} step={0.1} value={item[axis]} onChange={event => onChange({ ...item, [axis]: Math.min(92, Math.max(8, Number(event.target.value))) })} /></div>)}</div>
    <p className="text-xs leading-5 text-ink-muted">Drag on the map, use the position fields, or focus an object and use arrow keys.</p>
      </div>
    </details>
    <Button type="button" variant="outline" onClick={onDelete} className="text-destructive">Remove {table ? "table" : "venue object"}</Button>
    </fieldset>
    {table && <TableGuestPicker key={item.id} table={item} plan={plan} guests={guests} disabled={disabled} onAssign={onAssign} />}
    </div>
  </aside>;
}
