import type { InvitationPage } from "./types";
import { timeline } from "../data/wedding";
import { Ornament } from "../components/artwork";
export function timelinePages(): InvitationPage[] {
  return [{ id: "timeline", label: "Our Wedding Day", content: (
    <div className="flex flex-col items-center gap-5">
      <h2 className="op-heading">Our Wedding Day</h2>
      <ol className="grid w-full max-w-[500px] gap-5 text-left">
        {timeline.map(item => <li key={item.title} className="grid grid-cols-[105px_1fr] gap-4 border-b border-[var(--op-pink-rule)] pb-4 [@media(max-width:700px)]:grid-cols-[85px_1fr]">
          <p className="text-xs leading-6 tabular-nums text-[#5a6946]">{item.time}</p>
          <div>
            <h3 className="op-timeline-event-title text-[#414636]">{item.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#646650]">{item.detail}</p>
          </div>
        </li>)}
      </ol>
      <Ornament className="h-6 w-28 text-[var(--op-pink)]" />
    </div>
  ) }];
}
