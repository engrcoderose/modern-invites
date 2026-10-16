import { Wine } from "lucide-react";
import type { SeatingLandmark } from "../domain/seating-plan";
import { VENUE_OBJECTS } from "../domain/venue-objects";
import { VenueSymbol } from "./venue-symbol";

const symbolKinds = new Set(["tent", "accessibility", "high_chair", "toilets", "toilet_booth", "arrow", "target", "cake", "gifts", "tree"]);

export function VenueArtwork({ item, selected, showSelection = true, showLabel = true }: { item: SeatingLandmark; selected: boolean; showSelection?: boolean; showLabel?: boolean }) {
  const width = item.width ?? VENUE_OBJECTS[item.kind].width;
  const height = item.height ?? VENUE_OBJECTS[item.kind].height;
  const x = -width / 2, y = -height / 2;
  const stroke = selected ? "#173d32" : "#a89877";
  const text = item.name.length > 22 ? `${item.name.slice(0, 21)}…` : item.name;
  const symbol = symbolKinds.has(item.kind);
  const labelVisible = showLabel && item.showLabel !== false;
  const externalLabel = item.kind === "wall" || item.kind === "pillar" || item.kind.startsWith("door") || symbol;
  return <>
    {/* A transparent hit area keeps text labels and thin walls easy to select. */}
    <rect x={x - 5} y={y - 5} width={width + 10} height={height + (externalLabel && labelVisible ? 30 : 10)} fill="transparent" stroke="none" />
    {selected && showSelection && <rect x={x - 8} y={y - 8} width={width + 16} height={height + (externalLabel && labelVisible ? 36 : 16)} fill="none" stroke="#173d32" strokeDasharray="5 4" pointerEvents="none" />}
    <g pointerEvents="none">
      {symbol ? <svg x={x} y={y} width={width} height={height} viewBox="-2 -2 28 28" color={stroke} overflow="visible"><VenueSymbol kind={item.kind} /></svg>
      : item.kind === "label" ? null : item.kind === "door_left" || item.kind === "door_right" ? <g transform={item.kind === "door_right" ? "scale(-1 1)" : undefined} fill="none" stroke={stroke} strokeWidth="2">
        <path d={`M ${x} ${y} V ${-y}`} />
        <path d={`M ${x} ${-y} H ${-x} A ${width} ${height} 0 0 0 ${x} ${y}`} strokeDasharray="4 3" />
        <circle cx={x} cy={-y} r="3" fill="white" /><circle cx={-x} cy={-y} r="3" fill="white" />
      </g> : item.kind === "door" ? <>
        <path d={`M ${x} ${y} V ${-y} H ${-x} M ${x} ${y} H ${-x}`} fill="none" stroke={stroke} strokeWidth="3" />
        <path d={`M ${-x} ${y} Q ${-x} ${-y} ${x} ${-y}`} fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 3" />
      </> : item.kind === "buffet_round" || item.kind === "buffet_oval" || item.kind === "dance_floor_round"
      ? <ellipse rx={width / 2} ry={height / 2} fill={item.kind === "dance_floor_round" ? "#edf4eb" : "#f4f0e7"} stroke={stroke} strokeWidth={selected ? 3 : 2} strokeDasharray={item.kind === "dance_floor_round" ? "7 5" : undefined} />
      : item.kind === "stage_half_round" ? <path d={`M ${x} ${-y} A ${width / 2} ${height} 0 0 1 ${-x} ${-y} Z`} fill="#f4f0e7" stroke={stroke} strokeWidth={selected ? 3 : 2} strokeDasharray="7 5" />
      : <rect x={x} y={y} width={width} height={height} rx={item.kind === "wall" || item.kind === "pillar" ? 2 : 5}
        fill={item.kind === "pillar" ? "#66706a" : item.kind === "wall" ? "#a1b4a9" : item.kind === "bar" ? "#ead9c3" : item.kind === "area" ? "#edf4eb" : "#f4f0e7"}
        stroke={stroke} strokeWidth={selected ? 3 : 2} strokeDasharray={item.kind === "area" ? "7 5" : undefined} />}
      {item.kind === "stage" && <path d={`M ${x + 8} ${-y - 8} H ${-x - 8} M ${x + 8} ${-y - 13} H ${-x - 8}`} stroke={stroke} strokeWidth="2" />}
      {item.kind === "dance_floor" && <g stroke="#d9d1bd" strokeWidth="1">{[1, 2, 3].map(index => <path key={index} d={`M ${x + width * index / 4} ${y} V ${-y} M ${x} ${y + height * index / 4} H ${-x}`} />)}</g>}
      {item.kind === "bar" && <Wine x={x + 9} y="-10" width="20" height="20" color="#816d50" />}
      {labelVisible && <g transform={`rotate(${item.kind === "label" ? 0 : -(item.rotation ?? 0)})`}><text textAnchor="middle" y={externalLabel ? height / 2 + 18 : 4} fontSize={item.kind === "label" ? 16 : 12} fontWeight={item.kind === "label" ? 600 : 500} fill="#173d32">{text}</text></g>}
    </g>
  </>;
}
