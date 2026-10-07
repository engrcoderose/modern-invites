import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { Church, Clapperboard, Heart, Mail, Music2, UsersRound, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { wedding } from "../data/wedding-data";
import type { TimelineEvent } from "../types/wedding";
import TimelineGardenArch from "../components/TimelineGardenArch";
import { cornerFlowers, floralBorder } from "../data/design-media";

const milestoneIcons = {
  welcome: Mail,
  history: Clapperboard,
  entourage: UsersRound,
  ceremony: Church,
  reception: UtensilsCrossed,
  party: Music2,
} satisfies Record<TimelineEvent["icon"], LucideIcon>;

export default function TimelineSection() {
  return (
    <ScrollScene id="timeline" aria-labelledby="jb-timeline-title" className="jb-timeline relative isolate overflow-hidden px-1 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
        <Image src={cornerFlowers} alt="" sizes="(min-width: 640px) 260px, 55vw" draggable={false} className="absolute -left-10 top-0 h-auto w-[55%] max-w-[260px] -scale-x-100 select-none sm:-left-12" />
        <Image src={cornerFlowers} alt="" sizes="(min-width: 640px) 260px, 55vw" draggable={false} className="absolute -right-10 top-0 h-auto w-[55%] max-w-[260px] select-none sm:-right-12" />
      </div>
      <div className="relative mx-auto max-w-[640px] px-[calc(10%+0.5rem)] pb-24 pt-12 sm:px-[clamp(2.75rem,10vw,6rem)] sm:pb-28 sm:pt-16">
        <TimelineGardenArch />
        <div className="relative z-10">
          <ScrollLayer as="h2" profile="heading" id="jb-timeline-title" className="jb-timeline-title mb-9 text-center sm:mb-12">Wedding<br />Timeline</ScrollLayer>
          <ol className="space-y-6 sm:space-y-8">
            {wedding.timeline.map((event, index) => {
              const Icon = milestoneIcons[event.icon];
              return (
                <li key={event.time} className="grid grid-cols-[2rem_0.75rem_1fr] gap-x-3 sm:grid-cols-[2.75rem_0.875rem_1fr] sm:gap-x-5">
                  <Icon aria-hidden="true" strokeWidth={1.2} className="mt-2 h-8 w-8 text-[#5b6c50] sm:h-10 sm:w-10" />
                  <div aria-hidden="true" className="relative text-[#526445]">
                    {index < wedding.timeline.length - 1 && <span className="absolute -bottom-9 left-1/2 top-3 w-px -translate-x-1/2 bg-[#718664]/65 sm:-bottom-11" />}
                    <Heart className="relative top-1.5 h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" strokeWidth={1} />
                  </div>
                  <ScrollScene as="div" reveal className="text-center"><ScrollLayer profile="text" phase={index * 0.02}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#35412f] sm:text-xs">{event.time}</p>
                    <h3 className="jb-serif mt-1 text-lg leading-tight text-[#293327] sm:text-2xl">{event.title}</h3>
                  </ScrollLayer></ScrollScene>
                </li>
              );
            })}
          </ol>
        </div>
        <Image src={floralBorder} alt="" aria-hidden="true" sizes="(min-width: 640px) 800px, 115vw" draggable={false} className="pointer-events-none absolute -bottom-3 left-1/2 h-auto w-[125%] max-w-none -translate-x-1/2 select-none" />
      </div>
    </ScrollScene>
  );
}
