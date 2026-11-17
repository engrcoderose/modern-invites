import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SeatingLandmark } from "../domain/seating-plan";
import { DEFAULT_LABEL_COLOR, MIN_LABEL_FONT_SIZE, MAX_LABEL_FONT_SIZE } from "../domain/venue-objects";

export function VenueLabelControls({ item, onChange }: { item: SeatingLandmark; onChange(item: SeatingLandmark): void }) {
  const fontSize = item.labelFontSize ?? (item.kind === "label" ? 16 : 12);
  const color = item.labelColor ?? DEFAULT_LABEL_COLOR;
  function changeSize(value: number) {
    if (Number.isFinite(value)) onChange({ ...item, labelFontSize: Math.min(MAX_LABEL_FONT_SIZE, Math.max(MIN_LABEL_FONT_SIZE, value)) });
  }
  return <fieldset disabled={item.showLabel === false} className="space-y-3 disabled:opacity-60">
    <legend className="mb-3 text-sm font-medium text-forest">Label text</legend>
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor="venue-label-size">Text size</Label>
        <Input id="venue-label-size" type="number" min={MIN_LABEL_FONT_SIZE} max={MAX_LABEL_FONT_SIZE} step={1} value={fontSize} onChange={event => changeSize(event.target.valueAsNumber)} className="w-24" />
      </div>
      <input aria-label="Adjust text size" type="range" min={MIN_LABEL_FONT_SIZE} max={MAX_LABEL_FONT_SIZE} step={1} value={fontSize} onChange={event => changeSize(event.target.valueAsNumber)} className="h-6 w-full accent-forest" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="venue-label-color">Text colour</Label>
      <div className="flex items-center gap-3">
        <Input id="venue-label-color" type="color" value={color} onInput={event => onChange({ ...item, labelColor: event.currentTarget.value })} onChange={event => onChange({ ...item, labelColor: event.target.value })} className="h-11 w-16 shrink-0 cursor-pointer p-1" />
        <span className="text-sm text-ink-muted">{color.toUpperCase()}</span>
      </div>
    </div>
    <p className="text-xs leading-5 text-ink-muted">{item.showLabel === false ? "Turn on Show label on map to style this text." : "Text size uses floor plan units and scales with map zoom."}</p>
  </fieldset>;
}
