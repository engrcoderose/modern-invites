import { Wine } from "lucide-react";
import type { SeatingLandmark } from "../domain/seating-plan";
import { DEFAULT_LABEL_COLOR, VENUE_OBJECTS } from "../domain/venue-objects";
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
  const externalLabel = item.kind === "wall" || item.kind === "pillar" || item.kind === "stairs" || item.kind.startsWith("door") || symbol;
  const defaultFontSize = item.kind === "label" ? 16 : 12;
  const fontSize = item.labelFontSize ?? defaultFontSize;
  const labelY = externalLabel ? height / 2 + 6 + fontSize : 4 + (fontSize - defaultFontSize) / 3;
  const hitWidth = labelVisible ? Math.max(width + 10, text.length * fontSize * 0.65) : width + 10;
  const hitTop = labelVisible ? Math.min(y - 5, labelY - fontSize) : y - 5;
  const hitBottom = labelVisible ? Math.max(-y + 5, labelY + fontSize * 0.3) : -y + 5;
  return <>
    {/* A transparent hit area keeps text labels and thin walls easy to select. */}
    <rect x={-hitWidth / 2} y={hitTop} width={hitWidth} height={hitBottom - hitTop} fill="transparent" stroke="none" />
    {selected && showSelection && <rect x={-hitWidth / 2 - 3} y={hitTop - 3} width={hitWidth + 6} height={hitBottom - hitTop + 6} fill="none" stroke="#173d32" strokeDasharray="5 4" pointerEvents="none" />}
    <g pointerEvents="none">
      {symbol ? <svg x={x} y={y} width={width} height={height} viewBox="-2 -2 28 28" color={stroke} overflow="visible"><VenueSymbol kind={item.kind} /></svg>
      : item.kind === "label" ? null : item.kind === "carpet" ? <g>
        <rect x={x} y={y} width={width} height={height} rx="2" fill="#a84b55" stroke={selected ? stroke : "#803640"} strokeWidth={selected ? 3 : 2} />
        <rect x={x + 4} y={y + 2} width={width - 8} height={height - 4} rx="1" fill="none" stroke="#efd4b0" strokeWidth="1" />
      </g> : item.kind === "door_left" || item.kind === "door_right" ? <g transform={item.kind === "door_right" ? "scale(-1 1)" : undefined} fill="none" stroke={stroke} strokeWidth="2">
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
      {item.kind === "stairs" && <g fill="none" stroke={stroke} strokeWidth="1.5">
        {[1, 2, 3, 4, 5, 6, 7].map(step => <path key={step} d={`M ${x} ${y + height * step / 8} H ${-x}`} />)}
        <path d={`M 0 ${height * 0.35} V ${-height * 0.35} M ${-width * 0.08} ${-height * 0.2} L 0 ${-height * 0.35} L ${width * 0.08} ${-height * 0.2}`} stroke="#173d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>}
      {item.kind === "dance_floor" && <g stroke="#d9d1bd" strokeWidth="1">{[1, 2, 3].map(index => <path key={index} d={`M ${x + width * index / 4} ${y} V ${-y} M ${x} ${y + height * index / 4} H ${-x}`} />)}</g>}
      {item.kind === "bar" && <Wine x={x + 9} y="-10" width="20" height="20" color="#816d50" />}
      {labelVisible && <g transform={`rotate(${item.kind === "label" ? 0 : -(item.rotation ?? 0)})`}><text textAnchor="middle" y={labelY} fontSize={fontSize} fontWeight={item.kind === "label" ? 600 : 500} fill={item.labelColor ?? DEFAULT_LABEL_COLOR}>{text}</text></g>}
    </g>
  </>;
}
