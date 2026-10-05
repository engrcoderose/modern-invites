import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { objectSize, type FloorObject } from "./object-transform";

export function ObjectSizeControls({ item, onChange }: { item: FloorObject; onChange(item: FloorObject): void }) {
  const table = "capacity" in item;
  const uniform = table && (item.shape === "round" || item.shape === "square");
  const radius = table && item.shape === "round";
  const size = objectSize(item);
  const fields = uniform
    ? [{ axis: "width" as const, label: radius ? "Radius" : "Side length", value: radius ? size.width / 2 : size.width, min: radius ? 30 : 60, max: radius ? 100 : 200 }]
    : [{ axis: "width" as const, label: "Length", value: size.width, min: table ? 60 : 20, max: table ? 240 : 180 },
      { axis: "height" as const, label: "Width", value: size.height, min: table ? 40 : 8, max: table ? 200 : 100 }];
  function change(axis: "width" | "height", value: number, min: number, max: number) {
    if (!Number.isFinite(value)) return;
    const bounded = Math.min(max, Math.max(min, value));
    onChange(uniform ? { ...item, width: bounded * (radius ? 2 : 1), height: bounded * (radius ? 2 : 1) } : { ...item, [axis]: bounded });
  }
  return <div className="space-y-3">
    {fields.map(field => <div key={field.axis} className="space-y-2">
      <div className="flex items-center justify-between gap-3"><Label htmlFor={`object-${field.axis}`}>{field.label}</Label>
        <Input id={`object-${field.axis}`} type="number" min={field.min} max={field.max} step={radius ? 0.5 : 1} value={field.value} className="w-24" onChange={event => change(field.axis, event.target.valueAsNumber, field.min, field.max)} />
      </div>
      <input aria-label={`Adjust ${field.label.toLowerCase()}`} type="range" min={field.min} max={field.max} step={radius ? 0.5 : 1} value={field.value} onChange={event => change(field.axis, event.target.valueAsNumber, field.min, field.max)} className="h-6 w-full accent-forest" />
    </div>)}
    <p className="text-xs leading-5 text-ink-muted">Size uses floor plan units. Drag the handles on the map for a visual adjustment.</p>
  </div>;
}
